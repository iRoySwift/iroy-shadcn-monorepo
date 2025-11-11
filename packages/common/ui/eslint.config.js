import eslintConfig from "@iroy/eslint/next";

const config = [
  ...eslintConfig,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;
