"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_container_1 = require("../src/key-container");
describe('keyContainer', () => {
    describe('init', () => {
        it('sets cmdKey to 91', () => {
            key_container_1.keyContainer.init('', '');
            expect(key_container_1.keyContainer.getKeys()['cmd']).toEqual([91, 93]);
            expect(key_container_1.keyContainer.getStateKeys()).toMatchSnapshot();
        });
        it('sets cmdKey to 91 when Mac but not Opera or Firefox', () => {
            key_container_1.keyContainer.init('Mac', '');
            expect(key_container_1.keyContainer.getKeys()['cmd']).toEqual([91, 93]);
            expect(key_container_1.keyContainer.getStateKeys()).toMatchSnapshot();
        });
        it('sets cmdKey to 17 when is Mac - Opera', () => {
            key_container_1.keyContainer.init('Mac', 'Opera');
            expect(key_container_1.keyContainer.getKeys()['cmd']).toEqual([17]);
            expect(key_container_1.keyContainer.getStateKeys()).toMatchSnapshot();
        });
        it('sets cmdKey to 224 when is Mac - Firefox', () => {
            key_container_1.keyContainer.init('Mac', 'Firefox');
            expect(key_container_1.keyContainer.getKeys()['cmd']).toEqual([224]);
            expect(key_container_1.keyContainer.getStateKeys()).toMatchSnapshot();
        });
        it('initializes getKeysReversed', () => {
            key_container_1.keyContainer.init('', '');
            expect(key_container_1.keyContainer.getKeysReversed()[65]).toBe('a');
            expect(key_container_1.keyContainer.getKeysReversed()[91]).toBe('cmd');
            expect(key_container_1.keyContainer.getKeysReversed()[93]).toBe('cmd');
        });
    });
    describe('getValue', () => {
        it('throws error if the key is not supported', () => {
            key_container_1.keyContainer.init('', '');
            expect(() => key_container_1.keyContainer.getValue('klsdlkjd')).toThrowErrorMatchingSnapshot();
        });
        it('returns the right value given a key', () => {
            key_container_1.keyContainer.init('', '');
            expect(key_container_1.keyContainer.getValue('ctrl')).toBe(17);
        });
    });
});
