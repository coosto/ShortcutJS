export interface IOptions {
    debug?: boolean;
    preventDefault?: boolean;
    onlyStateCombos?: boolean;
}
export declare class Options implements IOptions {
    /**
     * Prints combo states when processing and matching combos
     */
    debug: boolean;
    /**
     * Automatically calls preventDefault when an Action is triggered
     */
    preventDefault: boolean;
    /**
     * Only process combos with State keys (cmd, ctrl, alt, shift)
     */
    onlyStateCombos: boolean;
    constructor(obj?: IOptions);
}
