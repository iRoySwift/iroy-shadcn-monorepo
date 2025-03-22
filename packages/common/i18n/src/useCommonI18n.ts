import { useEffect, useState } from "react";
import { Lang } from "./config";
import { DictionariesKey, getCommonDictionary } from "./dictionaries";

export const useCommonI18n = (lang: Lang, customLocale?: Object) => {
  const [translate, setTranslate] = useState<(key: DictionariesKey) => string>(
    () => (key: DictionariesKey) => ""
  );

  useEffect(() => {
    const getTranslate = async () => {
      const translateFn = await getCommonDictionary(lang, customLocale);
      setTranslate(() => translateFn);
    };
    getTranslate();
  }, [lang]);
  return translate;
};
