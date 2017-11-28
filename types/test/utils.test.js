"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
describe('utils', () => {
    describe('compareSets', () => {
        it('returns false if size of sets is different', () => {
            expect(utils_1.compareSets(new Set(), new Set([2]))).toBeFalsy();
        });
        it('returns false if size of sets is different', () => {
            const set1 = new Set([1, 2]);
            const set2 = new Set([2, 1]);
            expect(utils_1.compareSets(set1, set2)).toBeFalsy();
        });
        it('returns false if size of sets is different', () => {
            const set1 = new Set([1, 2]);
            const set2 = new Set([1, 2]);
            expect(utils_1.compareSets(set1, set2)).toBeTruthy();
        });
    });
});
