// @ts-check

import js from "@eslint/js";
// import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS recommended rules
  eslint.configs.recommended,

  // TS strict rules (type-aware)
  ...tseslint.configs.strict,

  // TS stylistic rules
  ...tseslint.configs.stylistic,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    // languageOptions: { globals: globals.browser },
    languageOptions: {
      parserOptions: {
        project: true, // enables type-aware rules
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // custom project rules
  {
    rules: {
      indent: ["error", "tab"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-debugger": "warn",
      "arrow-body-style": "off",
      "require-await": "error",
    },
  },
]);
