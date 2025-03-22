"use client";
import { useI18n } from "@/locales";
import { Button } from "@iroy/ui/components/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@iroy/ui/components/dropdown-menu";
import { Globe } from "@iroy/ui/icons";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {}
const LocaleSwitcher: React.FC<Props> = () => {
  const t = useI18n();
  const pathname = usePathname();
  console.log("🚀 ~ pathname:", pathname);
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
            <Link href={`/en/${pathname.split("/").slice(2).join("/")}`}>
              {t("en")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/zh/${pathname.split("/").slice(2).join("/")}`}>
              {t("zh")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LocaleSwitcher;
