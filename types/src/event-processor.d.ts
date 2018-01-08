import { Action } from './action';
import { KeyCombo } from './key-combo';
import { IOptions } from './options';
/**
 * Process events, mantaining a temporal combo. Then compares combos to find matches.
 */
export declare class EventProcessor {
    /**
     * Combo composed by the Keyboard Events keys. It is cleaned on keyup.
     */
    currentCombo: KeyCombo;
    constructor();
    /**
     * Resets the current Combo
     */
    reset(): void;
    /**
     * Process a keyboardEvent
     */
    processEvent(ev: KeyboardEvent, actions: Map<string, Action>, options: IOptions): boolean;
    /**
     * Resets the combo and prints debug output
     */
    cleanCombo(options: IOptions): void;
    /**
     * Search for matching actions, given a keyCombo, and execute its callbacks
     */
    processActionCombos(ev: KeyboardEvent, actions: Map<string, Action>, options: IOptions): boolean;
    /**
     * Checks whether the currentCombo matches a particular action
     */
    private matchesComboAction(action);
    /**
     * Prints keydown events
     */
    private printDebugKeyPressed(ev);
    /**
     * Prints when action matches
     */
    private printDebugActionFound(action);
}
