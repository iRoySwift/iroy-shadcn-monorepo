import { AppSidebar } from "@/components/app-sidebar";
import LocaleSwitcher from "@/components/locale-switcher";
import { NavHeader } from "@/components/nav-header";
import { ModeSwitcher } from "@iroy/theme";
import { Separator } from "@iroy/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@iroy/ui/components/sidebar";
import { Suspense } from "react";
import ClientSidebarHydrator from "@/components/client-sidebar-hydrator";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type AppLayoutProps = LayoutProps<"/[locale]">;

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const defaultOpen = false;

  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <ClientSidebarHydrator />
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-14 w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1.5" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <NavHeader />
              <div className="ml-auto flex items-center gap-2">
                <LocaleSwitcher />
                <ModeSwitcher />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}
