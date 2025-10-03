import { describe, it, expect, beforeEach } from "@jest/globals";
import { Translator } from "./translator";

describe("i18next-icu helper (Translator)", () => {
  let t: Translator;
  beforeEach(async () => {
    t = new Translator("ja");
    await t.initI18n("ja");
    t.setLocale("ja");
  });

  it("translates message in ja", () => {
    const msg = t.translate("hello.world.exception", {
      arg1: "hoge",
      arg2: t.translateEnum("animal", "CAT"),
      arg3: "100",
    });
    expect(msg).toBe("こんにちは、hoge, ねこ, 100");
  });

  it("translates message in en", () => {
    t.setLocale("en");
    const msg = t.translate("hello.world.exception", {
      arg1: "hoge",
      arg2: t.translateEnum("animal", "CAT", "en"),
      arg3: "100",
    });
    expect(msg).toBe("Hello 100, hoge, cat.");
  });

  it("falls back for unknown codes", () => {
    const msg = t.translate("errors.not.exists", { foo: 1 });
    expect(msg).toBe('[errors.not.exists] {"foo":1}');
  });

  it("returns key for unknown enum", () => {
    expect(t.translateEnum("animal", "DOES_NOT_EXIST")).toBe("DOES_NOT_EXIST");
  });

  it("get/set locale works", () => {
    expect(t.getLocale()).toBe("ja");
    t.setLocale("en");
    expect(t.getLocale()).toBe("en");
  });
});
