"use server";
import { CardsDemo } from "@/components/cards";
import ThemeCustomizer from "@/components/theme-customizer";
import ThemeWrapper from "@/components/theme-customizer/theme-wrapper";
import { cn } from "@iroy/ui/lib/utils";
import React from "react";
import { getTranslations } from "next-intl/server";

const PageHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("border-grid border-b", className)} {...props}>
    <div className="container-wrapper">
      <div className="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
        {children}
      </div>
    </div>
  </section>
);

const PageHeaderHeading = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
      className
    )}
    {...props}>
    {children}
  </div>
);

const PageHeaderDescription = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-foreground max-w-2xl text-lg font-light", className)}
    {...props}>
    {children}
  </div>
);

const PageActions = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

const Home: React.FC = async () => {
  const t = await getTranslations("HomePage");
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{t("home")}</PageHeaderHeading>
        <PageHeaderDescription>{t("description")}</PageHeaderDescription>
        <PageActions>
          <ThemeCustomizer />
        </PageActions>
      </PageHeader>
      <div className="container-wrapper py-6">
        <section id="themes" className="container scroll-mt-20">
          <ThemeWrapper>
            <CardsDemo />
          </ThemeWrapper>
        </section>
      </div>
    </>
  );
};
export default Home;
