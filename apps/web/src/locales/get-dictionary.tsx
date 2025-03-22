// import "server-only";
import { merge } from "@iroy/utils/lodash-es";
import { getCommonDictionary } from "@iroy/i18n/dictionaries";
import { Lang } from "@iroy/i18n/config";
import { PathsToString } from "@iroy/utils/typing";
import { ReturnFnJsonType } from "@iroy/i18n/typing";
import { loadLocale } from "@iroy/i18n/loadLocale";

// export const customLocale = {
//   en: () => import("./en/home.json").then(module => ({ home: module.default })),
//   zh: () => import("./zh/home.json").then(module => ({ home: module.default })),
// };
// export type CustomDictKey = PathsToString<
//   ReturnFnJsonType<typeof customLocale>
// >;

export const getDictionary = async (lang: Lang) => {
  if (!lang) return () => "lang 不存在";
  let dictionary = await loadLocale("zh", "src/locales");
  // let dictionary = merge({}, customLocale[lang]);
  return await getCommonDictionary<any>(lang, dictionary);
};
