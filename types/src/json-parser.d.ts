import { ShortcutJS } from './shortcut';
/**
 * Value object class representing an object from the json array loaded
 * @class JsonActionCombo
 */
export declare class JsonActionCombo {
    combo: any;
    action: any;
    constructor(obj: any);
}
/**
 * Parses the json array of combo actions loaded externally
 * @class JsonParser
 */
export declare class JsonParser {
    /**
     * Does the parsing
     *
     * @param {ShortcutJS} shortcutJS
     * @param {any} json
     */
    static parse(shortcutJS: ShortcutJS, json: any[]): void;
}
