// unionでSymbolを使うと型安全でなくなるので注意
const Animal = {
  Dog: Symbol("DOG"),
  Cat: Symbol("CAT"),
  // コメントを外すとanimalMapでエラーが発生する
  // Bird: "BIRD"
} as const;

type Animal = (typeof Animal)[keyof typeof Animal];

type AnimalMap = {
  [key in Animal]: string;
};

export const animalMap: AnimalMap = {
  [Animal.Dog]: "犬",
  [Animal.Cat]: "猫",
};

// 代入できちゃうので危険
const dog: Animal = Symbol("dog");
console.log(dog); // Symbol(dog)

console.log(animalMap[Animal.Dog]); // "犬"
console.log(Animal.Dog === Animal.Dog); // true
console.log(Animal.Dog === Symbol("DOG")); // false
