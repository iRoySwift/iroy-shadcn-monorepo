"use client";

import { merge } from "@iroy/utils/lodash-es";
import { LocalesgMap } from "./typing";
import { Lang, locales as defaultLocales, Locales } from "./config";
import { getNestedValue } from "@iroy/utils/common";

/**
 * Generates a translation function for the specified language.
 *
 * @param customLocales Optional custom locales to merge with the default locales.
 * @returns A function that takes a language and returns a translation function.
 */
const createI18nHook =
  <T>(customLocales?: T) =>
  (lang: Lang) => {
    type MergedLocales = Locales | T;
    const mergedLocales: MergedLocales = merge(
      {},
      defaultLocales,
      customLocales ?? {}
    );
    const localeData: LocalesgMap =
      lang in mergedLocales
        ? mergedLocales[lang as keyof Locales]
        : mergedLocales.en;

    /**
     * Translation function to get the translated value for a given key.
     *
     * @param key The key to translate.
     * @returns The translated value.
     */
    const translate = <K extends keyof LocalesgMap>(
      key: K
    ): (typeof localeData)[K] => {
      return getNestedValue(localeData, key);
    };

    return translate;
  };

// Default translation hook using the default locales
const useI18n = createI18nHook();

export { createI18nHook, useI18n };
