export const enumCatalogs = {
  ja: {
    animal: {
      CAT: "ねこ",
      DOG: "いぬ",
    },
  },
  en: {
    animal: {
      CAT: "cat",
      DOG: "dog",
    },
  },
} as const satisfies Record<string, Record<string, Record<string, string>>>;

export const messageCatalogs = {
  ja: {
    "hello.world.exception": "こんにちは、{arg1}, {arg2}, {arg3}",
    __fallback__: "[{code}] {json}",
  },
  en: {
    "hello.world.exception": "Hello {arg3}, {arg1}, {arg2}.",
    __fallback__: "[{code}] {json}",
  },
} as const satisfies Record<string, Record<string, string>>;
