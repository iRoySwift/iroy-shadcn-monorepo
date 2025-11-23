import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { META_THEME_COLORS, ThemeProvider } from "@iroy/theme";
import { siteConfig } from "@/site";
import { Toaster } from "@iroy/ui/components/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import {
  getFormatter,
  getNow,
  getTimeZone,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import "@/styles/index.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ClientSessionProvider from "@/components/client-session-provider";
import { getServerSession } from "next-auth";
import auth from "@/auth";

type RootLayoutProps = LayoutProps<"/[locale]">;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata(
  props: Omit<RootLayoutProps, "children">
): Promise<Metadata> {
  const metadata: Metadata = {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
    ],
    authors: [
      {
        name: "shadcn",
        url: "https://shadcn.com",
      },
    ],
    creator: "shadcn",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
  const params = await props.params;
  const locale = params.locale as Locale;

  const t = await getTranslations({ locale, namespace: "Common" });
  const formatter = await getFormatter({ locale });
  const now = await getNow({ locale });
  const timeZone = await getTimeZone({ locale });

  return {
    ...metadata,
    other: {
      currentYear: formatter.dateTime(now, { year: "numeric" }),
      timeZone,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const session = await getServerSession(auth);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NextIntlClientProvider>
            <ClientSessionProvider session={session}>
              {children}
            </ClientSessionProvider>
          </NextIntlClientProvider>
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
