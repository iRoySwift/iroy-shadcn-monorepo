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
import { usePathname } from "next/navigation";
import { useTranslator } from "@iroy/i18n/client";

const LocaleSwitcher: FC = () => {
  const t = useTranslator();
  const pathname = usePathname();
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
              {t("common.en")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/zh/${pathname.split("/").slice(2).join("/")}`}>
              {t("common.zh")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LocaleSwitcher;
