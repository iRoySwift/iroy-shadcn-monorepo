// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */

import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("@iroy/eslint/next"),
  {
    ignores: ["apps/**", "packages/**"],
    // extends: ["@iroy/eslint/next"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
  },
];
