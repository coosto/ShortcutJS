"use strict";
/*
  Copyright 2017 Alex Jover Morales (alexjovermorales@gmail.com)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const key_combo_1 = require("./key-combo");
/**
 * Value object class representing an object from the json array loaded
 * @class JsonActionCombo
 */
class JsonActionCombo {
    constructor(obj) {
        if (!obj || !obj.combo || !obj.action) {
            throw new Error(`
        The json provided must be an array of { combo, action } object. Example
          [
            { action: 'openWindow', combo: 'ctrl a' }
          ]
      `);
        }
        this.combo = obj.combo;
        this.action = obj.action;
    }
}
exports.JsonActionCombo = JsonActionCombo;
/**
 * Parses the json array of combo actions loaded externally
 * @class JsonParser
 */
class JsonParser {
    /**
     * Does the parsing
     *
     * @param {ShortcutJS} shortcutJS
     * @param {any} json
     */
    static parse(shortcutJS, json) {
        if (!Array.isArray(json)) {
            throw new Error('The json provided must be an array');
        }
        json.forEach(obj => {
            const jsonActionCombo = new JsonActionCombo(obj);
            const keyCombo = key_combo_1.KeyCombo.fromString(jsonActionCombo.combo);
            const action = new action_1.Action(jsonActionCombo.action, keyCombo);
            shortcutJS.addAction(action);
        });
    }
}
exports.JsonParser = JsonParser;
