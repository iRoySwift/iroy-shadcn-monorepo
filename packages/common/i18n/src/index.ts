"use client";
import { merge } from "@iroy/utils/lodash-es";
import { LocalesgMap } from "./typing";
import { Lang, locales, Locales } from "./config";
import { getNestedValue } from "@iroy/utils/common";

/**
 *
 * @param customLocale 传入其他自定义语言
 * @returns
 */
const generateUseI18n =
  <T>(customLocale?: T) =>
  (lang: Lang) => {
    type MerLocales = Locales | T;
    const mergeLocales: MerLocales = merge({}, locales, customLocale ?? {});
    const local: LocalesgMap =
      lang in mergeLocales
        ? mergeLocales[lang as keyof Locales]
        : mergeLocales.en;

    const t = <K extends keyof LocalesgMap>(key: K): (typeof local)[K] => {
      return getNestedValue(local, key);
    };

    return t;
  };

const useI18n = generateUseI18n();

export { generateUseI18n, useI18n };
