export interface Logger extends Console {
    group(title: string, options?: string): any;
    groupCollapsed(title: string, options?: string): any;
}
export declare const logger: Logger;
/**
 * Compares two sets, order sensitive
 */
export declare function compareSets(set1: Set<any>, set2: Set<any>): boolean;
