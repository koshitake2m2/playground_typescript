import assert, { AssertionError } from "assert";

const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  assert(chunkSize > 0);
  return arr.reduce(
    (acc, _, i) =>
      i % chunkSize ? acc : [...acc, arr.slice(i, i + chunkSize)],
    [] as T[][]
  );
};

describe("chunk", () => {
  it("arr=[], returns []", () => {
    const actual = chunk([], 1);
    expect(actual).toEqual([]);
  });
  it("arr=[1, 2, 3] & size=2, returns [[1, 2], [3]]", () => {
    const actual = chunk([1, 2, 3], 2);
    expect(actual).toEqual([[1, 2], [3]]);
  });
  it("size=0, throws AssertionError", () => {
    const actual = () => chunk([1, 2, 3], 0);
    expect(actual).toThrow(AssertionError);
  });
});
