"use client";
import { Button } from "@iroy/ui/components/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@iroy/ui/components/dropdown-menu";
import { Globe } from "@iroy/ui/icons";
import type { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, useTranslations } from "next-intl";
import { Label } from "@iroy/ui/components/label";
import React from "react";

type Props = {
  changeLocaleAction: (locale: Locale) => Promise<void>;
};

const LocaleSwitcher: FC<Props> = ({ changeLocaleAction }) => {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();


  const toLocalePage = async (locale: Locale) => {
    console.log("🚀 ~ toLocalePage ~ locale:", locale);
    const newPath = `/${locale}/${pathname.split("/").slice(2).join("/")}`;
    router.push(newPath);
    await changeLocaleAction(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="group/toggle h-8 w-8 px-0">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Label onClick={() => toLocalePage("en")}>{t("en")}</Label>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Label onClick={() => toLocalePage("zh")}>{t("zh")}</Label>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LocaleSwitcher;
