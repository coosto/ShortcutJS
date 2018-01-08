"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../src/action");
const key_combo_1 = require("../src/key-combo");
const mockA = jest.fn();
const mockB = jest.fn();
describe('Action', () => {
    it('throws an error if second parameter is not a combo', () => {
        expect(() => new action_1.Action('', {})).toThrowErrorMatchingSnapshot();
    });
    it('should be ok if parameters are correct', () => {
        const action = new action_1.Action('open', key_combo_1.KeyCombo.fromString('ctrl a'));
        expect(action.name).toBe('open');
        expect(action.keyCombo).toBeInstanceOf(key_combo_1.KeyCombo);
        expect(action.callbacks).toEqual(new Set());
    });
    it('addCallback: should add a callback', () => {
        const action = new action_1.Action('open', key_combo_1.KeyCombo.fromString('ctrl a'));
        action.addCallback(mockA);
        expect(action.callbacks.size).toBe(1);
    });
    describe('deleteCallback', () => {
        it('should remove one callback if a cb param is passed', () => {
            const action = new action_1.Action('open', key_combo_1.KeyCombo.fromString('ctrl a'));
            action.addCallback(mockA);
            action.addCallback(mockB);
            expect(action.callbacks.size).toBe(2);
            action.removeCallback(mockA);
            expect(action.callbacks.size).toBe(1);
        });
        it('should remove all callbacks if no params are passed', () => {
            const action = new action_1.Action('open', key_combo_1.KeyCombo.fromString('ctrl a'));
            action.addCallback(mockA);
            action.addCallback(mockB);
            expect(action.callbacks.size).toBe(2);
            action.removeCallback();
            expect(action.callbacks.size).toBe(0);
        });
    });
});
