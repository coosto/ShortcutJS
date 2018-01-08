"use strict";
const shortcut_1 = require("../src/shortcut");
const utils_1 = require("./utils");
function getMockWindow() {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    return window;
}
let mockWindow = getMockWindow();
/**
 * Actual test suite
 */
describe('shortcutJS', () => {
    beforeEach(() => {
        shortcut_1.shortcutJS.reset();
        mockWindow.addEventListener.mockClear();
        mockWindow.removeEventListener.mockClear();
    });
    describe('init', () => {
        it('sets keydown and keyup event listeners', () => {
            shortcut_1.shortcutJS.init();
            expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2);
        });
        it('initializes with a debug options', () => {
            shortcut_1.shortcutJS.init({ debug: true });
            expect(shortcut_1.shortcutJS.options.debug).toBeTruthy();
        });
        it('sets keydown and keyup event listeners only once', () => {
            shortcut_1.shortcutJS.init();
            shortcut_1.shortcutJS.init({ debug: true });
            shortcut_1.shortcutJS.init();
            expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2);
        });
    });
    describe('reset', () => {
        it('removes keydown and keyup event listeners only once', () => {
            shortcut_1.shortcutJS.reset();
            expect(mockWindow.removeEventListener).toHaveBeenCalledTimes(2);
        });
        it('clears keyMap and actions', () => {
            shortcut_1.shortcutJS.init();
            shortcut_1.shortcutJS.processEvent(utils_1.getMockedEvent(55));
            expect(shortcut_1.shortcutJS.eventProcessor.currentCombo.keys.size).toBe(1);
            shortcut_1.shortcutJS.addAction(new shortcut_1.Action('open', shortcut_1.KeyCombo.fromString('ctrl a')));
            expect(shortcut_1.shortcutJS.actions.size).toBe(1);
            shortcut_1.shortcutJS.reset();
            expect(shortcut_1.shortcutJS.eventProcessor.currentCombo.keys.size).toBe(0);
            expect(shortcut_1.shortcutJS.actions.size).toBe(0);
        });
    });
    describe('loadFromJson', () => {
        it('calls init and parses json', () => {
            shortcut_1.shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }]);
            expect(mockWindow.addEventListener).toHaveBeenCalledTimes(2);
            expect(shortcut_1.shortcutJS.actions.size).toBeGreaterThan(0);
        });
        it('calls init and parses json with debug true', () => {
            shortcut_1.shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }], { debug: true });
            expect(shortcut_1.shortcutJS.options.debug).toBeTruthy();
        });
    });
    describe('addAction', () => {
        it('adds an action', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            shortcut_1.shortcutJS.addAction(action);
            expect(shortcut_1.shortcutJS.actions.size).toEqual(1);
        });
        it('throws an error if an action is not passed', () => {
            expect(() => shortcut_1.shortcutJS.addAction(null)).toThrowError();
        });
    });
    describe('removeAction', () => {
        it('removes an action', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            shortcut_1.shortcutJS.addAction(action);
            expect(shortcut_1.shortcutJS.actions.size).toEqual(1);
            shortcut_1.shortcutJS.removeAction(action);
            expect(shortcut_1.shortcutJS.actions.size).toEqual(0);
        });
        it('throws an error if an action is not passed', () => {
            expect(() => shortcut_1.shortcutJS.removeAction(null)).toThrowError();
        });
        it('throws an error if an unregistered action is passed', () => {
            const action = new shortcut_1.Action('newaction', shortcut_1.KeyCombo.fromString('ctrl b'));
            expect(() => shortcut_1.shortcutJS.removeAction(action)).toThrowError();
        });
    });
    describe('subscribe', () => {
        it('adds a new callback', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            shortcut_1.shortcutJS.addAction(action);
            shortcut_1.shortcutJS.subscribe(action.name, () => ({}));
            expect(shortcut_1.shortcutJS.actions.get(action.name).callbacks.size).toEqual(1);
        });
        it('throws an error if the action name is not correct', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            shortcut_1.shortcutJS.addAction(action);
            expect(() => shortcut_1.shortcutJS.subscribe('papa', jest.fn())).toThrowError();
        });
    });
    describe('unsubscribe', () => {
        it('removes a callback', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            const func = () => ({});
            shortcut_1.shortcutJS.addAction(action);
            shortcut_1.shortcutJS.subscribe(action.name, func);
            shortcut_1.shortcutJS.unsubscribe(action.name, func);
            expect(shortcut_1.shortcutJS.actions.get(action.name).callbacks.size).toEqual(0);
        });
        it('removes a all callbacks', () => {
            shortcut_1.shortcutJS.loadFromJson([{ action: 'open', combo: 'ctrl a' }]);
            shortcut_1.shortcutJS.subscribe('open', jest.fn());
            shortcut_1.shortcutJS.subscribe('open', jest.fn());
            shortcut_1.shortcutJS.unsubscribe('open');
            expect(shortcut_1.shortcutJS.actions.get('open').callbacks.size).toEqual(0);
        });
        it('throws an error if the action name is not correct', () => {
            const combo = shortcut_1.KeyCombo.fromString('ctrl a');
            const action = new shortcut_1.Action('action', combo);
            shortcut_1.shortcutJS.addAction(action);
            expect(() => shortcut_1.shortcutJS.unsubscribe('papa')).toThrowError();
        });
    });
    describe('processEvent', () => {
        it('processEvent of eventProcessor', () => {
            shortcut_1.shortcutJS.init();
            shortcut_1.shortcutJS.processEvent({});
            // @todo Use spies
            expect(shortcut_1.shortcutJS.processEvent).toBeTruthy();
        });
        it('not to be called if is paused', () => {
            shortcut_1.shortcutJS.init();
            shortcut_1.shortcutJS.pause();
            shortcut_1.shortcutJS.processEvent({});
            // @todo Use spies
            expect(shortcut_1.shortcutJS.processEvent).toBeTruthy();
        });
    });
    it('pause/resume the execution flow', () => {
        expect(shortcut_1.shortcutJS.isPaused()).toBeFalsy();
        shortcut_1.shortcutJS.pause();
        expect(shortcut_1.shortcutJS.isPaused()).toBeTruthy();
        shortcut_1.shortcutJS.resume();
        expect(shortcut_1.shortcutJS.isPaused()).toBeFalsy();
    });
    it('cleanCombo: to call cleanCombo of eventProcessor', () => {
        shortcut_1.shortcutJS.init();
        shortcut_1.shortcutJS.cleanCombo();
        // @todo Use spies
        expect(shortcut_1.shortcutJS.cleanCombo).toBeTruthy();
    });
});
