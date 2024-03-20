type AnimalBase = {
  name: string;
  value: string;
};

// シンプルな object literal
type AnimalEnumKey = "Dog" | "Cat";
const AnimalEnum = {
  Dog: {
    name: "Dog",
    value: "dog",
  },
  Cat: {
    name: "Cat",
    value: "cat",
  },
} as const satisfies Record<AnimalEnumKey, AnimalBase>;
console.log(AnimalEnum.Dog.name === AnimalEnum.Dog.name);

// メソッドを持たせられる object literal
const AnimalEnumInstance = new (class {
  constructor() {}
  readonly Dog = {
    name: "Dog",
    value: "dog",
    hello: "Hello",
  } as const satisfies Record<string, string> & AnimalBase;
  readonly Cat = {
    name: "Cat",
    value: "cat",
  } as const satisfies AnimalBase;

  findByName(name: string): AnimalBase | undefined {
    return this.values.find((x) => x.name === name);
  }
  get values(): AnimalBase[] {
    return [this.Dog, this.Cat];
  }
})();
console.log(AnimalEnumInstance.Dog.name === AnimalEnumInstance.Dog.name);
