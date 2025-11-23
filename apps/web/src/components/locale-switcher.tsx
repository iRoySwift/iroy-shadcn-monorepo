"use client";
import { Button } from "@iroy/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@iroy/ui/components/dropdown-menu";
import { Globe } from "@iroy/ui/icons";
import type { FC } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale, useTranslations } from "next-intl";
import { Label } from "@iroy/ui/components/label";
import React, { useTransition } from "react";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import clsx from "clsx";

const LocaleSwitcher: FC = () => {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(locale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale }
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={isPending}
          className={clsx(
            "group/toggle h-8 w-8 px-0",
            isPending && "transition-opacity [&:disabled]:opacity-30"
          )}>
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {routing.locales.map(locale => (
            <DropdownMenuItem key={locale}>
              <Label onClick={() => onSelectChange(locale)}>
                {t(`locale`, { locale })}
              </Label>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LocaleSwitcher;
