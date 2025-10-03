import { Translator } from "./translator";

async function main() {
  const t = new Translator("ja");
  await t.initI18n("ja");
  t.setLocale("ja");

  const res = {
    error_code: "hello.world.exception",
    params: { arg1: "hoge", arg2: "CAT", arg3: "100" },
  } as const;

  const msgJa = t.translate(res.error_code, {
    ...res.params,
    arg2: t.translateEnum("animal", res.params.arg2),
  });
  console.log(msgJa);

  t.setLocale("en");
  const msgEn = t.translate(res.error_code, {
    ...res.params,
    arg2: t.translateEnum("animal", res.params.arg2, "en"),
  });
  console.log(msgEn);
}

void main();
