// import "server-only";
import { merge } from "@iroy/utils/lodash-es";
import { Lang } from "./config";
import { getNestedValue } from "@iroy/utils/common";
import { ReturnFnJsonType } from "./typing";
import { PathsToString } from "@iroy/utils/typing";

export const dictionaries = {
  en: () => import("./locales/en.json").then(module => module.default),
  zh: () => import("./locales/zh.json").then(module => module.default),
};

export type DictionariesKey = PathsToString<
  ReturnFnJsonType<typeof dictionaries>
>;

export const getCommonDictionary = async <T = DictionariesKey>(
  lang: Lang,
  customLocale?: Object
) => {
  const mergeLocales = merge(
    {},
    await dictionaries[lang](),
    customLocale ?? {}
  );
  /**
   * Translation function to get the translated value for a given key.
   *
   * @param key The key to translate.
   * @returns The translated value.
   */
  type Key = DictionariesKey | T;
  const translate = (key: Key) => {
    return getNestedValue<Key>(mergeLocales, key);
  };

  return translate;
};
