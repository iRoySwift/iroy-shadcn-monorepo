import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const messagesCache = new Map<string, Record<string, string>>();

async function getMessages(locale: string) {
  const key = locale;
  if (messagesCache.has(key)) return messagesCache.get(key);
  const appMessages = await import(`../../messages/${locale}.json`);
  const common = await import(
    `../../../../packages/common/i18n/src/messages/${locale}.json`
  );
  const merged = {
    ...(common.default ?? common),
    ...(appMessages.default ?? appMessages),
  };
  messagesCache.set(key, merged);
  return merged;
}

export default getRequestConfig(async (params: { locale?: string }) => {
  const store = await cookies();
  const locale = params.locale || store.get("locale")?.value || "en";
  const messages = await getMessages(locale);
  return {
    locale,
    messages,
  };
});
