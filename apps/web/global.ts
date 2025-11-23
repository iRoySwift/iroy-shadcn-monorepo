import { routing } from "@/i18n/routing";
import messages from "./messages/en.json";
import commonEn from "@iroy/i18n/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages & typeof commonEn;
  }
}
