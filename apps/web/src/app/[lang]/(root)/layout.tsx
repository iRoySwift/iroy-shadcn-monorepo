import { AppSidebar } from "@/components/app-sidebar";
import LocaleSwitcher from "@/components/locale-switcher";
import { NavHeader } from "@/components/nav-header";
import { Lang } from "@iroy/i18n/config";
import { ModeSwitcher } from "@iroy/theme";
import { Separator } from "@iroy/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@iroy/ui/components/sidebar";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  params: {
    lang: Lang;
  };
}
const AppLayout: React.FC<Props> = async ({ children, params }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

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
                <LocaleSwitcher />
                <ModeSwitcher lang={params.lang} />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
};
export default AppLayout;
