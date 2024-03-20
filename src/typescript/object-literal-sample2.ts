const AnimalType = {
  Dog: "DOG",
  Cat: "CAT",
  // コメントを外すと無名クラスでエラーが発生する
  // Bird: "BIRD",
} as const satisfies Record<string, string>;
type AnimalTypeKey = keyof typeof AnimalType;
type AnimalType = (typeof AnimalType)[AnimalTypeKey];

type AnimalEnumValue = {
  code: AnimalType;
  name: string;
};

// satisfiesを使うことでAnimalTypeが増えたときにエラーが発生する
// ただし, AnimalTypeが減ったときにはエラーが発生しない
const AnimalEnum = new (class {
  readonly Dog = {
    code: AnimalType.Dog,
    name: "Dog",
    // satisfiesでRecord<string, string>を追加することでエラーが発生しない
    hello: "Hello",
  } as const satisfies Record<string, string> & AnimalEnumValue;
  readonly Cat = {
    code: AnimalType.Cat,
    name: "Cat",
  } as const satisfies AnimalEnumValue;

  findByCode(code: AnimalType) {
    return this.values.find((x) => x.code === code);
  }
  findByName(name: string): AnimalEnumValue | undefined {
    return this.values.find((x) => x.name === name);
  }
  get values(): AnimalEnumValue[] {
    return [this.Dog, this.Cat];
  }
})() satisfies Record<keyof typeof AnimalType, AnimalEnumValue>;

console.log(AnimalEnum.Dog.hello);
const dog = AnimalEnum.findByCode(AnimalType.Dog);
if (dog?.code === AnimalType.Dog) {
  // dog.helloにはアクセスできない
  // console.log(dog.hello)
  console.log(dog.name, AnimalEnum.Dog.hello);
}

export {};
