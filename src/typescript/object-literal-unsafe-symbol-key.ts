// unionでSymbolを使うと型安全でなくなるので注意
const AnimalKey = {
  Dog: Symbol("DOG"),
  Cat: Symbol("CAT"),
} as const;
type AnimalKey = (typeof AnimalKey)[keyof typeof AnimalKey];

// symbolがkeyになっている
const Animal = {
  [AnimalKey.Dog]: "DOG",
  [AnimalKey.Cat]: "CAT",
} as const satisfies Record<AnimalKey, string>;
type Animal = (typeof Animal)[keyof typeof Animal];

console.log(Animal[AnimalKey.Dog]); // "DOG"
console.log(Animal[Symbol("ww")]); // undefined

export {};
