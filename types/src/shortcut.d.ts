import { IOptions, Options } from './options';
import { Action } from './action';
import { EventProcessor } from './event-processor';
export interface ShortcutJS {
    actions: Map<string, Action>;
    options: Options;
    eventProcessor: EventProcessor;
    init(options?: IOptions): void;
    reset(): void;
    loadFromJson(json: any, options?: IOptions): void;
    addAction(action: Action): void;
    removeAction(action: Action): void;
    subscribe(actionName: string, cb: Function): void;
    unsubscribe(actionName: string, cb?: Function): void;
    processEvent(ev: KeyboardEvent): void;
    cleanCombo(): void;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
}
export declare const shortcutJS: ShortcutJS;
export * from './action';
export * from './event-processor';
export * from './json-parser';
export * from './key-combo';
export * from './key-container';
export * from './options';
