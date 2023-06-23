describe("Object", () => {
  describe("特定のkeyでfilterする", () => {
    it("keyがstringの場合, fromEntries, entries, filter を利用", () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      };
      const keys = ["a", "c"];
      const actual = Object.fromEntries(
        Object.entries(obj).filter(([key, _]) => keys.includes(key))
      );
      expect(actual).toEqual({ a: 1, c: 3 });
    });
    it("keyがnumberの場合, entries, reduce を利用", () => {
      const obj = {
        1: "a",
        2: "b",
        3: "c",
        4: "d",
      };
      const keys = [1, 3];
      const actual = Object.entries(obj).reduce(
        (acc: { [k: number]: string }, [k, v]) => {
          if (keys.includes(Number(k))) {
            acc[Number(k)] = v;
          }
          return acc;
        },
        {}
      );
      expect(actual).toEqual({ 1: "a", 3: "c" });
    });
  });
});
