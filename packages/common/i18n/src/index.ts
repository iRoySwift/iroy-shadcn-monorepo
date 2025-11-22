// NOTE: keep this module server-safe (no React client hooks here).
import { Lang } from "./config";
import { getNestedValue } from "@iroy/utils/common";

export type Translator = (key: string) => string;

function createTranslator(dictionary: Record<string, unknown>): Translator {
  return (key: string) => {
    try {
      const v = getNestedValue<string>(dictionary, key);
      return String(v ?? key);
    } catch {
      return String(key);
    }
  };
}

export async function getDictionaries(
  lang: Lang,
  namespaces: string[] = ["common"]
) {
  const messages: Record<string, any> = {};
  for (const ns of namespaces) {
    try {
      // dynamic import of JSON namespace
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // Use import() so bundlers can statically analyze
      // @ts-ignore
      const mod = await import(`./locales/${lang}/${ns}.json`);
      console.log("🚀 ~ getDictionaries ~ mod:", mod);
      // Wrap namespace under its key so consumers can lookup keys like "home.home"
      messages[ns] = { [ns]: mod?.default ?? mod };
    } catch {
      messages[ns] = { [ns]: {} };
    }
  }
  return messages;
}

export async function getI18n(lang: Lang, namespaces: string[] = ["common"]) {
  console.log("🚀 ~ getI18n ~ namespaces:", namespaces);
  if (typeof window === "undefined") {
    const dicts = await getDictionaries(lang, namespaces);
    // merge namespaces shallowly
    const merged = Object.assign({}, ...Object.values(dicts));
    console.log("🚀 ~ getI18n ~ merged:", merged);
    return createTranslator(merged);
  }

  // client: try to use injected data
  const win = window as any;
  const injected = win.__IROY_I18N_DATA as Record<string, unknown> | undefined;
  if (injected) {
    // injected is expected to be a map of namespaces (e.g. { common: {...}, home: {...} })
    // keep namespace nesting instead of flattening so keys like "home.search_the_docs"
    // resolve correctly via getNestedValue.
    const merged = Object.assign({}, injected);
    console.log("🚀 ~ getI18n ~ merged:", merged);
    return createTranslator(merged);
  }

  // fallback identity
  return (k: string) => k;
}

// The client-only `useTranslator` hook lives in `src/client.tsx`.

export { createTranslator };
