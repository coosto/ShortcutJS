import { IStateKey } from './key-container';
export declare class ComboStateKeys {
    alt: boolean;
    cmd: boolean;
    ctrl: boolean;
    shift: boolean;
    constructor(alt?: boolean, cmd?: boolean, ctrl?: boolean, shift?: boolean);
}
export declare type TComboSanitized = (number | number[])[];
export interface IComboSplit {
    keys: Set<number>;
    stateKeys: ComboStateKeys;
}
/**
 * Defines a Combo of keys
 */
export declare class KeyCombo {
    keys: Set<number>;
    stateKeys: ComboStateKeys;
    constructor(keys?: Set<number>, stateKeys?: ComboStateKeys);
    /**
     * Creates an instance of KeyCombo, given an string.
     */
    static fromString(comboStr: string): KeyCombo;
    static isEqual(currentCombo: KeyCombo, targetCombo: KeyCombo): boolean;
    /**
     * Parses the string and gets the code or codes of it
     */
    static parse(comboStr: string): IComboSplit;
    /**
     * Return a split combo with keys and stateKeys
     */
    static splitCombo(combo: TComboSanitized): IComboSplit;
    /**
     * Returns all state keys, given an array of keyCodes
     */
    static getStateKeys(keyArr: number[], stateKeys: IStateKey[]): IStateKey[];
    /**
     * Returns all non-state keys, given an array of keyCodes
     */
    static getNonStateKeys(keyArr: number[], stateKeys: IStateKey[]): number[];
    /**
     * Returns whether a keyCode is a state key
     */
    static isStateKey(key: number, stateKeys: IStateKey[]): boolean;
    /**
     * Creates an instance of KeyCombo, given an string.
     */
    addEvent(ev: KeyboardEvent): boolean;
    /**
     * Return if the combo has enabled any state key
     */
    hasStateKeys(): boolean;
}
