export declare class StateKeys {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}
/**
 * Returns mocked Event
 */
export declare function getMockedEvent(key: number, pStateKeys?: StateKeys): KeyboardEvent;
