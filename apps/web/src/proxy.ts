import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

const publicPages = [
  // "/",
  "/login",
  // (/secret requires auth)
];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  req => intlMiddleware(req),
  {
    callbacks: {
      // We inject minimal user info into the JWT (token.user) in `auth.ts`'s jwt callback.
      // Check specifically for `token.user` (or `token.role`) instead of any token truthiness.
      authorized: ({ token }) => {
        console.log("🚀 ~ authorized token:", token);
        return Boolean((token as any)?.user);
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  console.log("🚀 ~ middleware ~ req:");
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap(p => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // @ts-expect-error - Doesn't accept correct type
    return authMiddleware(req);
  }
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
