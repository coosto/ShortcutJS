export interface IStateKey {
    name: string;
    code: number;
}
/**
 * Contains the logic for the keyMapping
 *
 * @class KeyContainer
 */
export declare class KeyContainer {
    /**
     * Map of allowed keys
     */
    private keyMap;
    private stateKeys;
    /**
     * Reversed map (value: key) for easy mapping code -> word
     */
    private keyMapReversed;
    /**
     * Initializes the keyMaps
     *
     * @param {any} platform
     * @param {any} userAgent
     */
    init(platform: any, userAgent: any): void;
    getKeys(): {
        [a: string]: number | number[];
    };
    getKeysReversed(): {
        [keyCode: number]: string;
    };
    getStateKeys(): IStateKey[];
    getValue(key: string): number | number[];
    private addCmdToSkipKeys(skipKeys, cmd);
    private buildReversedKeymap(keymap);
}
export declare const keyContainer: KeyContainer;
