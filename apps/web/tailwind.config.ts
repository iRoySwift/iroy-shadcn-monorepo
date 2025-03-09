import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
