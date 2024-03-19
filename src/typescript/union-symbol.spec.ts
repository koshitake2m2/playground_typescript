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

describe("UnionSymbol", () => {
  it("expect", () => {
    expect(animalMap[Animal.Dog]).toBe("犬");
    expect(Animal.Dog === Animal.Dog).toBe(true);
    expect(Animal.Dog === Symbol("DOG")).toBe(false);
  });
});
