"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Lang } from "@iroy/i18n/config";
import { DictionariesKey, getCommonDictionary } from "@iroy/i18n/dictionaries";
import { getDictionary } from "./get-dictionary";
// import { CustomDictKey } from "./get-dictionary";

export function useI18n() {
  const [t, setT] = useState<(key: any) => string>(() => (key: any) => "");
  const { lang } = useParams() as { lang: Lang };

  useEffect(() => {
    function fetchTranslations() {
      fetch(`/api/i18n?locale=${lang}&folder=${"src/locales"}`)
        .then(res => res.json())
        .then(async data => {
          let translateFn = await getCommonDictionary(lang, data);
          setT(() => translateFn);
        });
    }
    fetchTranslations();
  }, [lang]);

  // useEffect(() => {
  //   function fetchTranslations() {
  //     getDictionary(lang).then(async translateFn => {
  //       setT(() => translateFn);
  //     });
  //   }
  //   fetchTranslations();
  // }, [lang]);

  return t;
}
