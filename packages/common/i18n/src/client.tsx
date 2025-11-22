"use client";

import { useEffect, useState } from "react";
import { createTranslator, Translator } from "./index";

export function useTranslator() {
  const [t, setT] = useState<Translator>(() => {
    try {
      const win = window as any;
      const injected = win.__IROY_I18N_DATA as
        | Record<string, unknown>
        | undefined;
      if (injected) {
        const merged = Object.assign({}, ...Object.values(injected));
        return createTranslator(merged);
      }
    } catch {
      /* ignore */
    }
    return (k: string) => k;
  });

  useEffect(() => {
    const onLoaded = () => {
      try {
        const win = window as any;
        const injected = win.__IROY_I18N_DATA as
          | Record<string, unknown>
          | undefined;
        console.log("🚀 ~ onLoaded ~ injected:", injected);
        if (injected) {
          // preserve namespace nesting (e.g. { common: {...}, home: {...} }) so
          // `getNestedValue(dictionary, "home.search_the_docs")` works.
          const merged = Object.assign({}, injected);
          setT(() => createTranslator(merged));
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("__IROY_I18N_LOADED", onLoaded);
    // run once in case data is already present
    onLoaded();
    return () => window.removeEventListener("__IROY_I18N_LOADED", onLoaded);
  }, []);

  return t;
}

export default useTranslator;
