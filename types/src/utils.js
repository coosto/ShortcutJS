"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = console;
/**
 * Compares two sets, order sensitive
 */
function compareSets(set1, set2) {
    if (set1.size !== set2.size) {
        return false;
    }
    const set1arr = Array.from(set1);
    const set2arr = Array.from(set2);
    for (let i = 0; i < set1arr.length; i++) {
        if (set1arr[i] !== set2arr[i]) {
            return false;
        }
    }
    return true;
}
exports.compareSets = compareSets;
