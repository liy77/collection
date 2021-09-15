declare type Classe = {
    new (...args: any[]): any;
};
declare type KeyType = number | string | symbol | bigint;
declare type ValueType = KeyType | object | Record<string | number, any> | Classe | any[];
declare type func<V = {
    id: string;
}> = (value: V) => any & Function;
declare class Collection<K extends KeyType, V extends ValueType> extends Map<K, V> {
    base?: Classe | undefined;
    private limit;
    /**
     * @param base Base Object
     * @param limit Max limit of values in collection
     */
    constructor(base?: Classe | undefined, limit?: Number | typeof Infinity);
    /**
     * @param func Filter function
     */
    filter(func: func<V>): (string | number | bigint | symbol | object)[];
    /**
     * @param func Map function
     */
    map(func: func<V>): any[];
    /**
     * @param func Some function
     */
    some(func: func<V>): boolean;
    /**
     * @param func Every function
     */
    every(func: func<V>): boolean;
    /**
     * Return the fist value to make the function evaluate true
     * @param func Find function
     */
    find(func: func<V>): V | undefined;
    /**
     * Get random value from collection
     */
    random(): any;
    set(key: K, value: V): this;
    /**
     * @param obj Data object
     * @param obj.id Data object Id
     * @param extra Extra parameter
     */
    add(obj: V & {
        id: K;
    }, extra?: Classe, replace?: boolean): any;
    all(): (string | number | bigint | symbol | object)[];
}
export = Collection;
//# sourceMappingURL=index.d.ts.map