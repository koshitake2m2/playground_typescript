enum Animal {
  Dog = "DOG",
  Cat = "CAT",
  // コメントを外すとanimalMapでエラーが発生する
  // Bird = "BIRD",
}

// unionでも同様です
//
// const Animal = {
//   Dog: "DOG",
//   Cat: "CAT",
//   // コメントを外すとanimalMapでエラーが発生する
//   // Bird: "BIRD"
// } as const;
// type Animal = (typeof Animal)[keyof typeof Animal];

type AnimalMap = {
  [key in Animal]: string;
};

export const animalMap: AnimalMap = {
  [Animal.Dog]: "犬",
  [Animal.Cat]: "猫",
};

console.log(animalMap[Animal.Dog]);

export {};
