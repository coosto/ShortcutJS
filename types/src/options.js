"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Options class
class Options {
    constructor(obj) {
        /**
         * Prints combo states when processing and matching combos
         */
        this.debug = false;
        /**
         * Automatically calls preventDefault when an Action is triggered
         */
        this.preventDefault = false;
        /**
         * Only process combos with State keys (cmd, ctrl, alt, shift)
         */
        this.onlyStateCombos = false;
        if (obj && Object.keys(obj).some(key => typeof this[key] === 'undefined')) {
            throw new Error('Some of the options are not correct. Checkout the docs at https://github.com/coosto/ShortcutJS for more info');
        }
        else if (obj) {
            Object.assign(this, obj);
        }
    }
}
exports.Options = Options;
