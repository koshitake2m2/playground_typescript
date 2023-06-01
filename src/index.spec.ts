import { sum } from "./calc";

describe("hello", () => {
  it("world", () => {
    expect(2 * 3).toEqual(6);
    expect(sum(1, 2)).toEqual(3);
  });
});
