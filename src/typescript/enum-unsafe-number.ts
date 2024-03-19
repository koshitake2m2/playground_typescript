////////////////////////////////////////
// enum
////////////////////////////////////////

// 列挙子を数値で初期化するのはやめよう, unionを使おう
enum EnumAnimal {
  Dog = 0,
  Cat = 1,
  Bird = "BIRD",
}

// 数値だと代入できちゃう
const a: EnumAnimal = 0;
console.log(a);
// 文字列だと代入できない
// const b: Animal = "BIRD";

// ありえない数値も代入できちゃう
const c: EnumAnimal = 3 + 3;
console.log(c);

////////////////////////////////////////
// union
////////////////////////////////////////

const UnionAnimal = {
  Dog: 0,
  Cat: 1,
} as const;

type UnionAnimal = (typeof UnionAnimal)[keyof typeof UnionAnimal];

const x: UnionAnimal = 0;

// コンパイルエラー
// const y: UnionAnimal = 3 + 3;
