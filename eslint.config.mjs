import globals from "globals";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "prefer-const": "warn",
    },
    ignores: ["dist/"],
  },
];
