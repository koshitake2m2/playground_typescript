enum Animal {
  Dog = "DOG",
  Cat = "CAT",
  // コメントを外すとprintAnimal関数でエラーが発生する
  // Bird = "BIRD",
}

// unionでも同様です
//
// const Animal = {
//   Dog: "DOG",
//   Cat: "CAT",
//   // コメントを外すとprintAnimal関数でエラーが発生する
//   // Bird: "BIRD"
// } as const;
// type Animal = (typeof Animal)[keyof typeof Animal];

const printAnimal = (animal: Animal) => {
  switch (animal) {
    case Animal.Dog:
      console.log("犬");
      break;
    case Animal.Cat:
      console.log("猫");
      break;
    default:
      // Animalの列挙子が増えた時にコンパイルエラーで修正漏れ検知を防ぐためにnever型を使う
      const unreachable: never = animal;
      console.error(`この値は想定されていません: ${unreachable}`);
      break;
  }
};

printAnimal(Animal.Dog);

export {};
