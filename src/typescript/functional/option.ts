// type constructor
interface Option<T> {
  get: T;
  map<U>(f: (value: T) => U): Option<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
}

class Some<T> implements Option<T> {
  constructor(private value: T) {}
  get get(): T {
    return this.value;
  }
  map<U>(f: (value: T) => U): Option<U> {
    return new Some(f(this.value));
  }
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
}

class None<T> implements Option<T> {
  constructor() {}
  get get(): T {
    throw new Error("None has no value");
  }
  map<U>(f: (value: T) => U): Option<U> {
    return new None();
  }
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return new None();
  }
}

(function () {
  const some: Option<number> = new Some(1);
  const none: Option<number> = new None();

  // map
  console.log(some.map((x) => x + 1).get);
  try {
    console.log(none.map((x) => x + 1).get);
  } catch (e) {
    console.log(e);
  }

  // flatMap
  console.log(some.flatMap((x) => new Some(x + 2)).get);
  try {
    console.log(none.flatMap((x) => new Some(x + 2)).get);
  } catch (e) {
    console.log(e);
  }
})();
