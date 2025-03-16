"use server";
import path from "path";
import * as fs from "node:fs";

export async function loadLocale(locale: string, url: string) {
  const localeDir = path.join(process.cwd(), url, locale);
  const messages: Record<string, any> = {};

  if (fs.existsSync(localeDir)) {
    const files = fs
      .readdirSync(localeDir)
      .filter(file => file.endsWith(".json"));
    let moduleJson: Record<string, any> = {};
    files.forEach(file => {
      const filePath = path.join(localeDir, file);
      const fileKey = path.basename(file, ".json"); // 获取文件名 (例如: "home", "about")
      moduleJson[fileKey] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
    messages[locale] = moduleJson;
  } else {
    console.warn(`Locale directory for ${locale} not found.`);
  }

  return messages;
}
