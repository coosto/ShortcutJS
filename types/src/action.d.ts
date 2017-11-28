import { KeyCombo } from './key-combo';
/**
 * Action class to use for the ShortcutJS
 * @export
 * @class Action
 */
export declare class Action {
    name: string;
    keyCombo: KeyCombo;
    callbacks: Set<Function>;
    /**
     * Creates an instance of Action.
     * @param {sring} name
     * @param {KeyCombo} keyCombo
     */
    constructor(name: string, keyCombo: KeyCombo);
    addCallback(cb: Function): void;
    removeCallback(cb?: Function): void;
}
