import { sum } from "@/calc";

describe("index", () => {
  it("sum", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
