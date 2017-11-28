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
const key_container_1 = require("./key-container");
const utils_1 = require("./utils");
class ComboStateKeys {
    constructor(alt = false, cmd = false, ctrl = false, shift = false) {
        this.alt = alt;
        this.cmd = cmd;
        this.ctrl = ctrl;
        this.shift = shift;
    }
}
exports.ComboStateKeys = ComboStateKeys;
/**
 * Defines a Combo of keys
 */
class KeyCombo {
    constructor(keys = new Set(), stateKeys = new ComboStateKeys()) {
        this.keys = keys;
        this.stateKeys = stateKeys;
        if (keys && !(keys instanceof Set)) {
            throw new Error('Pass a set as a keys param');
        }
    }
    /**
     * Creates an instance of KeyCombo, given an string.
     */
    static fromString(comboStr) {
        const { keys, stateKeys } = KeyCombo.parse(comboStr);
        return new KeyCombo(keys, stateKeys);
    }
    static isEqual(currentCombo, targetCombo) {
        return (utils_1.compareSets(currentCombo.keys, targetCombo.keys) &&
            JSON.stringify(currentCombo.stateKeys) === JSON.stringify(targetCombo.stateKeys));
    }
    /**
     * Parses the string and gets the code or codes of it
     */
    static parse(comboStr) {
        let comboArr = comboStr.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');
        // Convert to keyCodes
        let comboArrParsed = comboArr.map(combo => key_container_1.keyContainer.getValue(combo));
        // Split into keys and stateKeys
        return KeyCombo.splitCombo(comboArrParsed);
    }
    /**
     * Return a split combo with keys and stateKeys
     */
    static splitCombo(combo) {
        const initialValue = {
            keys: new Set([]),
            stateKeys: new ComboStateKeys()
        };
        const allStateKeys = key_container_1.keyContainer.getStateKeys();
        const comboSplit = combo.reduce((acum, key) => {
            const keyArr = Array.isArray(key) ? key : [key];
            const stateKeys = KeyCombo.getStateKeys(keyArr, allStateKeys);
            // Add the non-state keys
            acum.keys = new Set([...acum.keys, ...KeyCombo.getNonStateKeys(keyArr, stateKeys)]);
            // Mark the state keys
            stateKeys.forEach(key => acum.stateKeys[key.name] = true);
            return acum;
        }, initialValue);
        return comboSplit;
    }
    /**
     * Returns all state keys, given an array of keyCodes
     */
    static getStateKeys(keyArr, stateKeys) {
        return stateKeys.filter(stateKey => keyArr.includes(stateKey.code));
    }
    /**
     * Returns all non-state keys, given an array of keyCodes
     */
    static getNonStateKeys(keyArr, stateKeys) {
        return keyArr.filter(key => !KeyCombo.isStateKey(key, stateKeys));
    }
    /**
     * Returns whether a keyCode is a state key
     */
    static isStateKey(key, stateKeys) {
        return stateKeys.some(stateKey => stateKey.code === key);
    }
    /**
     * Creates an instance of KeyCombo, given an string.
     */
    addEvent(ev) {
        const stateKeys = new ComboStateKeys(ev.altKey, ev.metaKey, ev.ctrlKey, ev.shiftKey);
        Object.assign(this.stateKeys, stateKeys);
        const isStateKey = KeyCombo.isStateKey(ev.keyCode, key_container_1.keyContainer.getStateKeys());
        if (!this.keys.has(ev.keyCode) && !isStateKey) {
            this.keys.add(ev.keyCode);
            return true;
        }
        return false;
    }
    /**
     * Return if the combo has enabled any state key
     */
    hasStateKeys() {
        const { alt, cmd, ctrl, shift } = this.stateKeys;
        return alt || cmd || ctrl || shift;
    }
}
exports.KeyCombo = KeyCombo;
