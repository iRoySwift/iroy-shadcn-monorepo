import { createI18nHook } from "@iroy/i18n";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LangParams } from "@iroy/i18n/config";

export function useI18n() {
  const [t, setT] = useState(() => (key: string) => key); // 默认函数，避免报错
  const { lang } = useParams() as LangParams;

  useEffect(() => {
    function fetchTranslations() {
      fetch(`/api/i18n?locale=${lang}&folder=${"locales"}`)
        .then(res => res.json())
        .then(data => {
          setT(() => createI18nHook(data)(lang));
        });
    }
    fetchTranslations();
  }, [lang]);

  return t;
}
