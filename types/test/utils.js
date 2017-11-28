"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateKeys {
    constructor() {
        this.altKey = false;
        this.ctrlKey = false;
        this.metaKey = false;
        this.shiftKey = false;
    }
}
exports.StateKeys = StateKeys;
/**
 * Returns mocked Event
 */
function getMockedEvent(key, pStateKeys = new StateKeys()) {
    const stateKeys = Object.assign(new StateKeys(), pStateKeys);
    const functions = { preventDefault: jest.fn() };
    return Object.assign({ keyCode: key }, stateKeys, functions);
}
exports.getMockedEvent = getMockedEvent;
