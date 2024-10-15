import {
  convertObjectKeyToLowerCamelFromSnake,
  convertObjectKeyToSnakeFromLowerCamel,
  toLowerCamelFromSnake,
  toSnakeFromLowerCamel,
} from "./case-converter";

describe("case-converter", () => {
  describe("toLowerCamelFromSnake", () => {
    it("convert string to lower camel from snake", () => {
      const input = "to_lower_camel_from_snake";
      const expceted = "toLowerCamelFromSnake";
      expect(toLowerCamelFromSnake(input)).toBe(expceted);
    });
  });

  describe("convertObjectKeyToLowerCamelFromSnake", () => {
    it("convert object key to lower camel from snake", () => {
      const input: any = { aa_a_a: 0, bb_b_b: { cc_c_c: 0 } };
      const output: any = convertObjectKeyToLowerCamelFromSnake(input);
      const expceted: any = { aaAA: 0, bbBB: { ccCC: 0 } };

      expect(Object.keys(output)).toEqual(Object.keys(expceted));
      expect(output).toHaveProperty("bbBB.ccCC", 0);
    });
  });

  describe("toSnakeFromLowerCamel", () => {
    it("convert string to snake from lower camel", () => {
      const input = "toSnakeFromLowerCamel";
      const expceted = "to_snake_from_lower_camel";
      expect(toSnakeFromLowerCamel(input)).toBe(expceted);
    });
  });

  describe("convertObjectKeyToSnakeFromLowerCamel", () => {
    it("convert object key to snake from lower camel", () => {
      const input: any = { aaAA: 0, bbBB: { ccCC: 0 } };
      const output: any = convertObjectKeyToSnakeFromLowerCamel(input);
      const expceted: any = { aa_a_a: 0, bb_b_b: { cc_c_c: 0 } };

      expect(Object.keys(output)).toEqual(Object.keys(expceted));
      expect(output).toHaveProperty("bb_b_b.cc_c_c", 0);
    });
  });
});
