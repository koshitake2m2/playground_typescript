type Key<Prefix extends string, Suffix extends string> = `${Prefix}_${Suffix}`;
type DynamicStruct<Prefix extends string, Suffix extends string> = {
  [P in Key<Prefix, Suffix>]: string;
};

type MyPrefix = "a" | "b";
type MySuffix = "0" | "1" | "2";
type MyKey = `${MyPrefix}_${MySuffix}`;
type MyDynamicStruct = DynamicStruct<MyPrefix, MySuffix>;

const md: MyDynamicStruct = {
  a_0: "a_0",
  a_1: "a_1",
  a_2: "a_2",
  b_0: "b_0",
  b_1: "b_1",
  b_2: "b_2",
};

const generateKey = <P extends string, S extends string>(
  p: P,
  s: S
): Key<P, S> => {
  return `${p}_${s}`;
};

const generateMyKey = (p: MyPrefix, s: MySuffix): MyKey => {
  return `${p}_${s}`;
};

md[generateKey("a", "0")] = "a_0";
md[generateMyKey("a", "0")] = "a_0";

// 以下だと, コンパイルエラーになる
// md['適当な文字列'] = "a_0";
// md[generateMyKey("c", "0")] = "a_0";
