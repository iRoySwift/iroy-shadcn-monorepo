import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Formats, hasLocale, IntlErrorCode } from "next-intl";

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

export const formats = {
  dateTime: {
    medium: {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: false,
    },
    long: {
      dateStyle: "full",
      timeStyle: "long",
      hour12: false,
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Avoid calling `cookies()` or other request-only APIs here.
  // Accessing request-scoped APIs (cookies/headers/uncached fetch) will
  // bail out static generation and force the route to be server-rendered.
  // Use `requestLocale` (and route params) for SSG-friendly locale selection.
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await getMessages(locale);
  return {
    locale,
    messages,
    formats,
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === "production"
          ? IntlErrorCode.MISSING_MESSAGE
          : "MISSING_MESSAGE: Could not resolve `missing` in `Index`.")
      ) {
        // Do nothing, this error is triggered on purpose
      } else {
        console.error(JSON.stringify(error.message));
      }
    },
    getMessageFallback({ key, namespace }) {
      return (
        "`getMessageFallback` called for " +
        [namespace, key].filter(part => part != null).join(".")
      );
    },
  };
});
