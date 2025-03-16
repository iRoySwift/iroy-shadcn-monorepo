import { merge } from "@iroy/utils/lodash-es";
import "server-only";

export const dictionaries = {
  en: () => import("./locales/en.json").then(module => module.default),
  zh: () => import("./locales/zh.json").then(module => module.default),
};

export const getDictionary = async (
  locale: "en" | "zh",
  customLocale?: Object
) => {
  const mergeLocales = merge({}, dictionaries, customLocale ?? {});
  return mergeLocales[locale]();
};
