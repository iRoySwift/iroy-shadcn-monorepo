// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import { config } from "@iroy/eslint/base";

export default defineConfig([
  config,
  {
    ignores: ["apps/**", "packages/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
  },
]);
