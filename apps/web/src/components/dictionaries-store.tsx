"use client";

import { useEffect } from "react";
import { getDictionaries } from "@iroy/i18n";
import { Lang } from "@iroy/i18n/config";

interface SetDictionariesProps {
  lang: Lang;
}

const DictionariesStore: React.FC<SetDictionariesProps> = ({ lang }) => {
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const dicts = await getDictionaries(lang, ["common"]);
        // also try to load app-local namespace `home`
        let homeNs: Record<string, unknown> = {};
        try {
          const mod = await import(`@/locales/${lang}/home.json`);
          homeNs = mod?.default ?? mod;
        } catch {
          homeNs = {};
        }

        const mergedDicts = Object.assign({}, ...Object.values(dicts), {
          home: homeNs,
        });

        if (!mounted) return;
        const win = window as Window & {
          __IROY_I18N_DATA?: Record<string, unknown>;
        };
        win.__IROY_I18N_DATA = mergedDicts as Record<string, unknown>;
        try {
          // notify any listeners (useTranslator) that dictionaries are ready
          window.dispatchEvent(new CustomEvent("__IROY_I18N_LOADED"));
        } catch {
          /* ignore */
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      mounted = false;
    };
  }, [lang]);

  return null;
};

export default DictionariesStore;
