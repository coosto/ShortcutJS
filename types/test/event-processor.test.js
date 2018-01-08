"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_processor_1 = require("../src/event-processor");
const options_1 = require("../src/options");
const action_1 = require("../src/action");
const key_combo_1 = require("../src/key-combo");
const utils_1 = require("./utils");
function getMockConsole() {
    console.log = jest.fn();
    console.group = jest.fn();
    console.groupEnd = jest.fn();
    return console;
}
let mockConsole = getMockConsole();
/**
 * EventProcessor test
 */
describe('EventProcessor', () => {
    let eventProcessor;
    let actions;
    let cb = jest.fn();
    let cb2 = jest.fn();
    beforeEach(() => {
        eventProcessor = new event_processor_1.EventProcessor();
        actions = new Map();
        const action = new action_1.Action('action', key_combo_1.KeyCombo.fromString('ctrl a'));
        action.addCallback(cb);
        action.addCallback(cb2);
        actions.set('action', action);
    });
    afterEach(() => {
        cb.mockClear();
        mockConsole.log.mockClear();
        mockConsole.group.mockClear();
        mockConsole.groupEnd.mockClear();
    });
    describe('cleanCombo', () => {
        it('clears the keyMap', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, false);
            expect(eventProcessor.currentCombo.keys.size).toBe(1);
            eventProcessor.cleanCombo(false);
            expect(eventProcessor.currentCombo.keys.size).toBe(0);
        });
        it('prints if called with debug', () => {
            eventProcessor.cleanCombo(new options_1.Options({ debug: true }));
            expect(mockConsole.log).toHaveBeenCalledTimes(1);
        });
    });
    describe('processEvent', () => {
        it('calls addEventToMap and processActionCombos', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, false);
            expect(eventProcessor.currentCombo.keys).toEqual(new Set([55]));
        });
        it('calls addEvenToMap but only processActionCombos once', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, new options_1.Options({ debug: true }));
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, new options_1.Options({ debug: true }));
            eventProcessor.processEvent(utils_1.getMockedEvent(45), actions, new options_1.Options());
            expect(eventProcessor.currentCombo.keys.size).toBe(2);
        });
        it('if debug it also logs the event', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, new options_1.Options({ debug: true }));
            expect(mockConsole.group).toHaveBeenCalledTimes(2);
            expect(mockConsole.log).toHaveBeenCalledTimes(3);
            expect(mockConsole.groupEnd).toHaveBeenCalledTimes(2);
        });
        it('doesn\'t process if onlyStateCombos is enabled, and there are not state combos', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55), actions, new options_1.Options({ debug: true, onlyStateCombos: true }));
            expect(mockConsole.log).not.toHaveBeenCalled();
        });
        it('process if onlyStateCombos is enabled, and there are state combos', () => {
            eventProcessor.processEvent(utils_1.getMockedEvent(55, { ctrlKey: true }), actions, new options_1.Options({ debug: true, onlyStateCombos: true }));
            expect(mockConsole.log).toHaveBeenCalled();
        });
    });
    describe('processActionCombos', () => {
        beforeEach(() => cb.mockClear());
        it('iterates over the actions and calls matchesComboAction, matching and calling the callback', () => {
            const opt = new options_1.Options();
            eventProcessor.processEvent(utils_1.getMockedEvent(17, { ctrlKey: true }), actions, opt); // ctrl
            eventProcessor.processEvent(utils_1.getMockedEvent(65, { ctrlKey: true }), actions, opt); // a
            expect(cb).toBeCalled();
        });
        it('iterates over the actions and calls matchesComboAction, NOT matching anything', () => {
            const opt = new options_1.Options();
            eventProcessor.processEvent(utils_1.getMockedEvent(65), actions, opt); // a
            expect(cb).not.toBeCalled();
        });
        it('calls printDebugActionFound if debug is active', () => {
            const opt = new options_1.Options({ debug: true });
            eventProcessor.processEvent(utils_1.getMockedEvent(17), actions, opt); // ctrl
            eventProcessor.processEvent(utils_1.getMockedEvent(65, { ctrlKey: true }), actions, opt); // a
            expect(mockConsole.group).toHaveBeenCalledTimes(4);
            expect(mockConsole.log).toHaveBeenCalledTimes(7);
            expect(mockConsole.groupEnd).toHaveBeenCalledTimes(4);
        });
        it('calls once preventDefault for that event if the option is passed', () => {
            const opt = new options_1.Options({ preventDefault: true });
            const ev = utils_1.getMockedEvent(65, { ctrlKey: true });
            eventProcessor.processEvent(ev, actions, opt); // a
            expect(ev.preventDefault).toHaveBeenCalledTimes(1);
        });
    });
});
