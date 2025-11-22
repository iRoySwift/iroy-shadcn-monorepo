import { NextRequest, NextResponse } from "next/server";
import { getDictionaries } from "@iroy/i18n";
import { Lang } from "@iroy/i18n/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get("locale") || "en") as Lang;
  const translations = await getDictionaries(locale);
  return NextResponse.json(translations);
}
