type ValueObject<T, VO extends string> = T & { readonly __brand: VO };
type UserId = ValueObject<string, "UserId">;
function UserId(value: string): UserId {
  return value as UserId;
}

type ProductId = ValueObject<string, "ProductId">;
function ProductId(value: string): ProductId {
  return value as ProductId;
}
type ProductId2 = ValueObject<string, "ProductId">;
function ProductId2(value: string): ProductId2 {
  return value as ProductId;
}

function _main() {
  const a = UserId("123"); // Type assertion to create a UserId
  const b = "123" as UserId; // Type assertion to create a UserId
  console.log("a:", a); // Output: '123'
  console.log("b:", b); // Output: '123'
  console.log("a === b:", a === b); // Output: true, since both are the same string value
  console.log("a.__brand:", a.__brand); // Output: undefined

  const p1 = ProductId("456");
  const p2 = ProductId2("456");
  // console.log("a === p1:", a === p1); // This comparison appears to be unintentional because the types 'UserId' and 'ProductId' have no overlap
  console.log("p1 === p2:", p1 === p2); // Output: true... This is unsafe...
}
_main();
export {};
