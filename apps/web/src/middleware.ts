import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import AppConfig from "./config";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages();
  return match(
    languages,
    AppConfig.supported_locales,
    AppConfig.default_locale
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, static, next internals and assets
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/avatars/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/")
  ) {
    return NextResponse.next();
  }

  // If the pathname already begins with a supported locale, continue
  const pathnameHasLocale = AppConfig.supported_locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to the best-matching locale (or default)
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
