"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_combo_1 = require("./key-combo");
const utils_1 = require("./utils");
/**
 * Process events, mantaining a temporal combo. Then compares combos to find matches.
 */
class EventProcessor {
    constructor() {
        this.reset();
    }
    /**
     * Resets the current Combo
     */
    reset() {
        this.currentCombo = new key_combo_1.KeyCombo();
    }
    /**
     * Process a keyboardEvent
     */
    processEvent(ev, actions, options) {
        const wasAppended = this.currentCombo.addEvent(ev);
        // Avoid repeated events
        if (!wasAppended) {
            return false;
        }
        const shouldProcess = !options.onlyStateCombos ||
            options.onlyStateCombos && this.currentCombo.hasStateKeys();
        if (shouldProcess) {
            if (options.debug) {
                this.printDebugKeyPressed(ev);
            }
            this.processActionCombos(ev, actions, options);
        }
    }
    /**
     * Resets the combo and prints debug output
     */
    cleanCombo(options) {
        this.reset();
        if (options.debug) {
            utils_1.logger.log('ShortcutJS: Cleaned keyMap');
        }
    }
    /**
     * Search for matching actions, given a keyCombo, and execute its callbacks
     */
    processActionCombos(ev, actions, options) {
        for (let action of actions.values()) {
            if (this.matchesComboAction(action)) {
                if (options.debug) {
                    this.printDebugActionFound(action);
                }
                if (options.preventDefault) {
                    ev.preventDefault();
                }
                for (let cb of action.callbacks) {
                    cb(ev);
                }
                // Don't continue after finding it
                return false;
            }
        }
    }
    /**
     * Checks whether the currentCombo matches a particular action
     */
    matchesComboAction(action) {
        return key_combo_1.KeyCombo.isEqual(this.currentCombo, action.keyCombo);
    }
    /**
     * Prints keydown events
     */
    printDebugKeyPressed(ev) {
        utils_1.logger.group('ShortcutJS: KeyPressed');
        utils_1.logger.log('Key: ', ev.keyCode);
        utils_1.logger.group('Current combo:');
        utils_1.logger.log('Keys: ', [...this.currentCombo.keys]);
        utils_1.logger.log('State keys: ', this.currentCombo.stateKeys);
        utils_1.logger.groupEnd();
        utils_1.logger.groupEnd();
    }
    /**
     * Prints when action matches
     */
    printDebugActionFound(action) {
        utils_1.logger.group('%cShortcutJS: Action Matched', 'color: green');
        utils_1.logger.log('Action: ', action.name);
        utils_1.logger.group('Current combo:');
        utils_1.logger.log('Keys: ', [...this.currentCombo.keys]);
        utils_1.logger.log('State keys: ', this.currentCombo.stateKeys);
        utils_1.logger.groupEnd();
        utils_1.logger.log(`${action.callbacks.size} callbacks found`);
        utils_1.logger.groupEnd();
    }
}
exports.EventProcessor = EventProcessor;
