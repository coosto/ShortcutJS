"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_parser_1 = require("../src/json-parser");
const shortcut_1 = require("../src/shortcut");
describe('JsonParser: parse', () => {
    it('throws an error if json is not array', () => {
        expect(() => json_parser_1.JsonParser.parse(shortcut_1.shortcutJS, {})).toThrowErrorMatchingSnapshot();
    });
    it('throws an error if an object is empty', () => {
        expect(() => json_parser_1.JsonParser.parse(shortcut_1.shortcutJS, [{}])).toThrowErrorMatchingSnapshot();
    });
    it('throws an error if combo property is not in an object', () => {
        expect(() => json_parser_1.JsonParser.parse(shortcut_1.shortcutJS, [{ action: 'open' }]))
            .toThrowErrorMatchingSnapshot();
    });
    it('throws an error if action property is not in an object', () => {
        expect(() => json_parser_1.JsonParser.parse(shortcut_1.shortcutJS, [{ combo: 'open' }]))
            .toThrowErrorMatchingSnapshot();
    });
    it('should be ok if is an array of json objects with both properties', () => {
        expect(() => json_parser_1.JsonParser.parse(shortcut_1.shortcutJS, [{ action: 'open', combo: 'ctrl a' }]))
            .not.toThrowError();
    });
});
