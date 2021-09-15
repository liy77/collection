type Classe = {
    new (...args: any[]): any
}

type KeyType = number | string | symbol | bigint
type ValueType = KeyType | object | Record<string | number, any> | Classe | any[]

type func<V = { id: string }> = (value: V) => any & Function

class Collection<K extends KeyType, V extends ValueType> extends Map<K, V> {
  /**
   * @param base Base Object
   * @param limit Max limit of values in collection
   */
  constructor(public base?: Classe, private limit: Number | typeof Infinity = Infinity) {
    super();
  }

  /**
   * @param func Filter function
   */
  filter(func: func<V>) {
    const arr = [];
    for (const val of this.values()) {
      if (func(val)) arr.push(val);
    }
    return arr;
  }

  /**
   * @param func Map function
   */
  map(func: func<V>) {
    const arr = [];
    for (const val of this.values()) {
      arr.push(func(val));
    }
    return arr;
  }

  /**
   * @param func Some function
   */
  some(func: func<V>) {
    for (const val of this.values()) {
      if (func(val)) return true;
    }
    return false;
  }

  /**
   * @param func Every function
   */
  every(func: func<V>) {
    for (const val of this.values()) {
      if (func(val)) return false;
    }
    return true;
  }

  /**
   * Return the fist value to make the function evaluate true
   * @param func Find function
   */
  find(func: func<V>) {
    for (const val of this.values()) {
      if (func(val)) return val;
    }
    return undefined;
  }

  /**
   * Get random value from collection
   */
  random() {
    const index = Math.floor(Math.random() * this.size);
    const values = this.values();

    for (let i = 0; i < index; i++) {
      values.next();
    }
    return values.next().value;
  }

  set(key: K, value: V) {
    if (this.limit && this.size >= this.limit) {
      const keys = this.keys();
      while (this.size > this.limit) {
        this.delete(keys.next().value);
      }
    }

    super.set(key, value);
    return this;
  }

  /**
   * @param obj Data object
   * @param obj.id Data object Id
   * @param extra Extra parameter
   */
  add(obj: V & { id: K }, extra?: Classe, replace: boolean = true) {
    if (this.base) {
      if (this.limit === 0 || !this.limit) {
        return obj instanceof this.base ||
          obj.constructor.name === this.base.constructor.name
          ? obj
          : new this.base(obj, extra);
      }

      if (!obj.id) {
        throw new Error('Missing object id.');
      }

      const exists = this.get(obj.id);

      if (exists && !replace) {
        return exists;
      }

      if (
        !(
          obj instanceof this.base ||
          obj.constructor.name === this.base.constructor.name
        )
      ) {
        obj = new this.base(obj, extra);
        this.set(obj.id, obj);
        return obj;
      }

      this.set(obj.id, obj);

      if ((this.limit !== Infinity) && this.limit > this.size) {
        while (this.limit > this.size) {
          this.delete(this.values().next().value);
        }
      }

      return obj;
    }

    return obj;
  }

  all() {
    const arr = [];

    for (const val of this.values()) {
      arr.push(val);
    }
    return arr;
  }
};

export = Collection