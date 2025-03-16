import en from "./locales/en.json";
import zh from "./locales/zh.json";

// Configuration for i18n
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh"],
} as const;

export const locales = {
  en,
  zh,
};

export type Locales = typeof locales;

export type Lang = (typeof i18n)["locales"][number];

export type LangParams = { lang: Lang };
