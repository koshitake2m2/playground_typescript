class UserId {
  private constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  static of(value: string): UserId {
    if (!value) throw new Error("Invalid UserId");
    return new UserId(value);
  }

  get value(): string {
    return this._value;
  }

  // Do not user `===` to compare value objects, because they are different instances.
  equals(other: UserId): boolean {
    return this._value === other.value;
  }
}

class ProductId {
  constructor(private readonly _value: string) {
    Object.freeze(this);
  }

  get value(): string {
    return this._value;
  }
  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}

function sayUserId(userId: UserId) {
  console.log(`UserId: ${userId.value}`);
}

function _main() {
  const a = UserId.of("123"); // Type assertion to create a UserId
  const b = UserId.of("123"); // Type assertion to create a UserId
  console.log("a:", a); // Output: '123'
  console.log("b:", b); // Output: '123'
  console.log("a === b:", a === b); // Output: true, since both are the same string value
  console.log("a.equals(b):", a.equals(b)); // Output: true, since both are the same string value

  const p1 = new ProductId("456");
  // console.log("a === p1:", a === p1); // This comparison appears to be unintentional because the types 'UserId' and 'ProductId' have no overlap
  sayUserId(a);
  // sayUserId(p1); // Argument of type 'ProductId' is not assignable to parameter of type 'UserId'. Types have separate declarations of a private property '_value'
}
_main();
export {};
