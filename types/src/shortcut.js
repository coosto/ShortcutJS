"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Copyright 2017 Alex Jover Morales (alexjovermorales@gmail.com)

  Licensed under the Apache License, Version 2.0 (the "License")
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
const options_1 = require("./options");
const action_1 = require("./action");
const event_processor_1 = require("./event-processor");
const json_parser_1 = require("./json-parser");
/**
 * Shortcut is the class for creating the singleton public instance shortcutJS.
 * It makes use and coordinates other classes in order to process events and checking matching.
 */
class Shortcut {
    constructor() {
        this.resetState();
    }
    /**
     * Sets up events and options, if not initialized
     */
    init(options = null) {
        if (!this.initialized) {
            this.options = new options_1.Options(options);
            window.addEventListener('keydown', this.processEvent.bind(this));
            window.addEventListener('keyup', this.cleanCombo.bind(this));
            this.initialized = true;
        }
    }
    /**
     * Tears down event handlers and resets internal variables
     */
    reset() {
        this.resetState();
        window.removeEventListener('keydown', this.processEvent);
        window.removeEventListener('keyup', this.cleanCombo);
    }
    /**
     * Initializes shortcutJS from a JSON array
     */
    loadFromJson(json, options = null) {
        this.init(options);
        json_parser_1.JsonParser.parse(this, json);
    }
    addAction(action) {
        if (!(action instanceof action_1.Action)) {
            throw new Error('You must pass an Action instance object');
        }
        this.actions.set(action.name, action);
    }
    removeAction(action) {
        if (!(action instanceof action_1.Action)) {
            throw new Error('You must pass an Action instance object');
        }
        if (!this.actions.has(action.name)) {
            throw new Error(`Action ${action.name} does not exist`);
        }
        this.actions.delete(action.name);
    }
    subscribe(actionName, cb) {
        if (this.actions.has(actionName)) {
            const action = this.actions.get(actionName);
            action.addCallback(cb);
        }
        else {
            throw new Error(`Action ${actionName} does not exists`);
        }
    }
    unsubscribe(actionName, cb = null) {
        if (this.actions.has(actionName)) {
            const action = this.actions.get(actionName);
            action.removeCallback(cb);
        }
        else {
            throw new Error(`Action ${actionName} does not exists`);
        }
    }
    processEvent(ev) {
        if (!this.paused) {
            this.eventProcessor.processEvent(ev, this.actions, this.options);
        }
    }
    cleanCombo() {
        this.eventProcessor.cleanCombo(this.options);
    }
    /**
     * Returns whether shortcutJS is running
     */
    isPaused() {
        return this.paused;
    }
    /**
     * Pauses execution of shortcutJS
     */
    pause() {
        this.paused = true;
    }
    /**
     * Resumes execution of shortcutJS
     */
    resume() {
        this.paused = false;
    }
    /**
     * Resets state and vars
     */
    resetState() {
        this.actions = new Map();
        this.initialized = false;
        this.eventProcessor = new event_processor_1.EventProcessor();
        this.paused = false;
    }
}
exports.shortcutJS = new Shortcut(); // Enforce singleton
__export(require("./action"));
__export(require("./event-processor"));
__export(require("./json-parser"));
__export(require("./key-combo"));
__export(require("./key-container"));
__export(require("./options"));
