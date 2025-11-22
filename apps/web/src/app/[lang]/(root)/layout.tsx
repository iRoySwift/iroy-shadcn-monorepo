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
import { Locale } from "next-intl";
import { cookies } from "next/headers";
import { Suspense } from "react";

type AppLayoutProps = LayoutProps<"/[lang]">;

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  async function changeLocaleAction(locale: Locale) {
    "use server";
    const store = await cookies();
    store.set("locale", locale);
  }

  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <SidebarProvider defaultOpen={defaultOpen}>
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
                <LocaleSwitcher changeLocaleAction={changeLocaleAction} />
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
