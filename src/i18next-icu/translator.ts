import { createInstance, type InitOptions, type i18n as I18n } from "i18next";
import ICU from "i18next-icu";

import { enumCatalogs, messageCatalogs } from "./catalog";

export type Locale = "ja" | "en";

const resources = {
  ja: { translation: messageCatalogs.ja },
  en: { translation: messageCatalogs.en },
} as const;

export class Translator {
  private i18n: I18n;
  private currentLocale: Locale;
  private initialized = false;

  constructor(defaultLng: Locale = "en") {
    this.i18n = createInstance();
    this.i18n.use(new ICU());
    this.currentLocale = defaultLng;
  }

  async initI18n(defaultLng: Locale = this.currentLocale): Promise<void> {
    if (!this.initialized) {
      const options: InitOptions = {
        lng: defaultLng,
        fallbackLng: "en",
        resources,
        interpolation: { escapeValue: false },
        returnNull: false,
        returnEmptyString: true,
        ns: ["translation"],
        defaultNS: "translation",
      };
      await this.i18n.init(options);
      this.initialized = true;
    }
    this.currentLocale = defaultLng;
    await this.i18n.changeLanguage(defaultLng);
  }

  setLocale(lng: Locale): void {
    this.currentLocale = lng;
    void this.i18n.changeLanguage(lng);
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  translateEnum(enumType: string, enumValue: string, locale?: Locale): string {
    const lng = locale ?? this.currentLocale;
    const catalog =
      (enumCatalogs as Record<string, Record<string, Record<string, string>>>)[
        lng
      ] ?? {};
    return catalog[enumType][enumValue] ?? enumValue;
  }

  translate(
    code: string,
    params: Record<string, unknown>,
    locale?: Locale
  ): string {
    const lng = locale ?? this.currentLocale;

    const exists = this.i18n.exists(code, { lng });
    if (exists) {
      return this.i18n.t(code, { lng, ...params });
    }

    const payload = { code: code, json: JSON.stringify(params), ...params };
    return this.i18n.t("__fallback__", { lng, ...payload });
  }
}
