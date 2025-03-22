"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@iroy/ui/components/button";
import { SunIcon, MoonIcon } from "@iroy/ui/icons";
import { useMetaColor } from "./hooks/use-meta-color";
import { META_THEME_COLORS } from "./constants";
import { Lang } from "@iroy/i18n/config";
import { useCommonI18n } from "@iroy/i18n/useCommonI18n";

export function ModeSwitcher({ lang }: { lang: Lang }) {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [resolvedTheme, setTheme, setMetaColor]);
  const t = useCommonI18n(lang);

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 px-0"
      onClick={toggleTheme}>
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">{t("toggle_theme")}</span>
    </Button>
  );
}
