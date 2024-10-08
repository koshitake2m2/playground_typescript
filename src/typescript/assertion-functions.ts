// You should write function instead of arrow function.
function assert(checked: unknown, message?: string | Error): asserts checked {
  if (checked) {
    return;
  }
  throw new Error("Assertion failed: " + message);
}

const numOrUndef: () => number | undefined = () => 123;
const n = numOrUndef();
assert(n, "n is undefined");
console.log(n); // n is number

try {
  assert(false, "This should not be printed");
} catch (e) {
  console.log(e);
}
