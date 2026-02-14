declare const __userId: unique symbol;
type UserId = string & { readonly [__userId]: never };
function UserId(value: string): UserId {
  return value as UserId;
}

declare const __productId: unique symbol;
type ProductId = string & { readonly [__productId]: never };
function ProductId(value: string): ProductId {
  return value as ProductId;
}

function _main() {
  const a = UserId("123"); // Type assertion to create a UserId
  const b = "123" as UserId; // Type assertion to create a UserId
  console.log("a:", a); // Output: '123'
  console.log("b:", b); // Output: '123'
  console.log("a === b:", a === b); // Output: true, since both are the same string value

  const p1 = ProductId("456");
  // console.log("a === p1:", a === p1); // This comparison appears to be unintentional because the types 'UserId' and 'ProductId' have no overlap
}
_main();
export {};
