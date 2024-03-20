// satisfiesを使えば, 型を指定できる & object literalにできる
const AnimalEnum = {
  Dog: "DOG",
  Cat: "CAT",
} as const satisfies Record<string, string>;

type AnimalEnumType = typeof AnimalEnum; // { Dog: "DOG", Cat: "CAT" }
type AnimalEnumKey = keyof AnimalEnumType; // "Dog" | "Cat"
type AnimalEnumValue = (typeof AnimalEnum)[AnimalEnumKey]; // "DOG" | "CAT"

export {};
