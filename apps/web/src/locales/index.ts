"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Lang } from "@iroy/i18n/config";
import { getNestedValue } from "@iroy/utils/common";

type Translator = (key: string) => string;

const defaultTranslator: Translator = key => key;

export function useI18n() {
  const [translate, setTranslate] = useState<Translator>(defaultTranslator);
  const { lang } = useParams() as { lang: Lang };

  useEffect(() => {
    let cancelled = false;

    async function fetchTranslations() {
      try {
        const response = await fetch(
          `/api/i18n?locale=${lang}&folder=${"src/locales"}`
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const dictionary = (await response.json()) as Record<string, unknown>;

        if (!cancelled) {
          setTranslate(() => (key: string) => {
            const value = getNestedValue(dictionary, key);
            return typeof value === "string" ? value : key;
          });
        }
      } catch (error) {
        console.error("Failed to load translations", error);
        if (!cancelled) {
          setTranslate(defaultTranslator);
        }
      }
    }

    fetchTranslations();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return translate;
}
