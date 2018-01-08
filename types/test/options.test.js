"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../src/options");
describe('Options', () => {
    it('has expected defaults if no params are passed', () => {
        expect(new options_1.Options()).toEqual({ debug: false, preventDefault: false, onlyStateCombos: false });
    });
    it('merges options when valid options are passed', () => {
        const options = new options_1.Options();
        options.debug = true;
        expect(new options_1.Options({ debug: true })).toEqual(options);
    });
    it('throws error if a non-expected property is passed', () => {
        expect(() => new options_1.Options({ ppe: 3 })).toThrowErrorMatchingSnapshot();
    });
});
