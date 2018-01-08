"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_combo_1 = require("../src/key-combo");
const key_container_1 = require("../src/key-container");
const utils_1 = require("./utils");
describe('KeyCombo', () => {
    let stateKeys;
    beforeAll(() => {
        key_container_1.keyContainer.init('', '');
        stateKeys = key_container_1.keyContainer.getStateKeys();
    });
    describe('constructor', () => {
        it('throws error if no set is passed as first argument', () => {
            expect(() => { new key_combo_1.KeyCombo('ctrl a'); }).toThrowErrorMatchingSnapshot();
        });
        it('has defaults keys and stateKeys', () => {
            const combo = new key_combo_1.KeyCombo();
            expect(combo.keys).toEqual(new Set());
            expect(combo.stateKeys).toEqual(new key_combo_1.ComboStateKeys());
        });
        it('has 2nd param as default', () => {
            const combo = new key_combo_1.KeyCombo(new Set([2]));
            expect(combo.keys).toEqual(new Set([2]));
            expect(combo.stateKeys).toEqual(new key_combo_1.ComboStateKeys());
        });
        it('gets params from the constructor', () => {
            const stateKeys = new key_combo_1.ComboStateKeys();
            stateKeys.alt = true;
            const combo = new key_combo_1.KeyCombo(new Set([2]), stateKeys);
            expect(combo.keys).toEqual(new Set([2]));
            expect(combo.stateKeys).toEqual(stateKeys);
        });
    });
    describe('isEqual', () => {
        it('return false if the sets are not equal', () => {
            const combo1 = new key_combo_1.KeyCombo(new Set([65, 66]));
            const combo2 = new key_combo_1.KeyCombo(new Set([65]));
            expect(key_combo_1.KeyCombo.isEqual(combo1, combo2)).toBeFalsy();
        });
        it('return false if the stateKeys are not equal', () => {
            const combo1 = key_combo_1.KeyCombo.fromString('ctrl a');
            const combo2 = key_combo_1.KeyCombo.fromString('alt a');
            expect(key_combo_1.KeyCombo.isEqual(combo1, combo2)).toBeFalsy();
        });
        it('return false if the sets are not equal', () => {
            const combo1 = key_combo_1.KeyCombo.fromString('ctrl a f num1');
            const combo2 = key_combo_1.KeyCombo.fromString('ctrl a f num1');
            expect(key_combo_1.KeyCombo.isEqual(combo1, combo2)).toBeTruthy();
        });
    });
    describe('parse', () => {
        it('parses a combo string', () => {
            const combo = key_combo_1.KeyCombo.fromString('ctrl a');
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual({
                shift: false,
                alt: false,
                cmd: false,
                ctrl: true
            });
        });
        it('is case insensitive', () => {
            const combo = key_combo_1.KeyCombo.fromString('CTRL A');
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual({
                shift: false,
                alt: false,
                cmd: false,
                ctrl: true
            });
        });
        it('cleans extra whitespaces', () => {
            const combo = key_combo_1.KeyCombo.fromString('   ctrl  CTRL   A');
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual({
                shift: false,
                alt: false,
                cmd: false,
                ctrl: true
            });
        });
        it('cmd stateKey is true', () => {
            const combo = key_combo_1.KeyCombo.fromString('     CMD   A');
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual({
                shift: false,
                alt: false,
                cmd: true,
                ctrl: false
            });
        });
        it('supports multiple state keys', () => {
            const combo = key_combo_1.KeyCombo.fromString(' ctrl alt  CMD shift  A up');
            expect(combo.keys).toEqual(new Set([65, 38]));
            expect(combo.stateKeys).toEqual({
                shift: true,
                alt: true,
                cmd: true,
                ctrl: true
            });
        });
    });
    describe('splitCombo', () => {
        it('returns a IComboSplit object with the right values', () => {
            expect(key_combo_1.KeyCombo.splitCombo([[91, 93], 65])).toEqual({
                keys: new Set([65]),
                stateKeys: Object.assign(new key_combo_1.ComboStateKeys(), { cmd: true })
            });
        });
        it('returns an empty IComboSplit', () => {
            expect(key_combo_1.KeyCombo.splitCombo([])).toEqual({
                keys: new Set([]),
                stateKeys: new key_combo_1.ComboStateKeys()
            });
        });
    });
    describe('getstateKeys', () => {
        it('returns the stateKeys', () => {
            expect(key_combo_1.KeyCombo.getStateKeys([91, 93, 17, 55], stateKeys)).toEqual([
                { name: 'ctrl', code: 17 },
                { name: 'cmd', code: 91 },
                { name: 'cmd', code: 93 }
            ]);
        });
        it('returns an empty array if no stateKeys are in the array', () => {
            expect(key_combo_1.KeyCombo.getStateKeys([65], stateKeys)).toEqual([]);
        });
    });
    describe('getNonstateKeys', () => {
        it('returns the non stateKeys', () => {
            expect(key_combo_1.KeyCombo.getNonStateKeys([91, 93, 17, 55], stateKeys)).toEqual([55]);
        });
        it('returns an empty array if no stateKeys are in the array', () => {
            expect(key_combo_1.KeyCombo.getNonStateKeys([91, 16], stateKeys)).toEqual([]);
        });
    });
    describe('isStateKey', () => {
        it('returns true if it is a state key', () => {
            expect(key_combo_1.KeyCombo.isStateKey(91, stateKeys)).toBeTruthy();
            expect(key_combo_1.KeyCombo.isStateKey(93, stateKeys)).toBeTruthy();
            expect(key_combo_1.KeyCombo.isStateKey(17, stateKeys)).toBeTruthy();
            expect(key_combo_1.KeyCombo.isStateKey(16, stateKeys)).toBeTruthy();
            expect(key_combo_1.KeyCombo.isStateKey(18, stateKeys)).toBeTruthy();
        });
        it('returns false if not', () => {
            expect(key_combo_1.KeyCombo.isStateKey(66, stateKeys)).toBeFalsy();
        });
    });
    describe('addEvent', () => {
        it('adds the key (once)', () => {
            const combo = new key_combo_1.KeyCombo();
            expect(combo.addEvent(utils_1.getMockedEvent(65))).toBeTruthy();
            expect(combo.addEvent(utils_1.getMockedEvent(65))).toBeFalsy();
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual(new key_combo_1.ComboStateKeys());
        });
        it('doesn\'t add the key if is a stateKey', () => {
            const combo = new key_combo_1.KeyCombo();
            expect(combo.addEvent(utils_1.getMockedEvent(65))).toBeTruthy();
            expect(combo.addEvent(utils_1.getMockedEvent(17, { ctrlKey: true }))).toBeFalsy();
            expect(combo.keys).toEqual(new Set([65]));
            expect(combo.stateKeys).toEqual(Object.assign(new key_combo_1.ComboStateKeys(), { ctrl: true }));
        });
    });
    describe('hasStateKeys', () => {
        it('returns false if no state keys', () => {
            const combo = key_combo_1.KeyCombo.fromString('a');
            expect(combo.hasStateKeys()).toBe(false);
        });
        it('returns true if has any of the state keys', () => {
            let combo = key_combo_1.KeyCombo.fromString('ctrl a');
            expect(combo.hasStateKeys()).toBe(true);
            combo = key_combo_1.KeyCombo.fromString('cmd a');
            expect(combo.hasStateKeys()).toBe(true);
            combo = key_combo_1.KeyCombo.fromString('alt a');
            expect(combo.hasStateKeys()).toBe(true);
            combo = key_combo_1.KeyCombo.fromString('shift a');
            expect(combo.hasStateKeys()).toBe(true);
        });
    });
});
