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
const key_combo_1 = require("./key-combo");
/**
 * Action class to use for the ShortcutJS
 * @export
 * @class Action
 */
class Action {
    /**
     * Creates an instance of Action.
     * @param {sring} name
     * @param {KeyCombo} keyCombo
     */
    constructor(name, keyCombo) {
        if (!(keyCombo instanceof key_combo_1.KeyCombo)) {
            throw new Error('The second parameter (keyCombo) must be an instance of KeyCombo');
        }
        this.name = name;
        this.keyCombo = keyCombo;
        this.callbacks = new Set();
    }
    addCallback(cb) {
        this.callbacks.add(cb);
    }
    removeCallback(cb = null) {
        if (cb) {
            this.callbacks.delete(cb);
        }
        else {
            this.callbacks = new Set();
        }
    }
}
exports.Action = Action;
