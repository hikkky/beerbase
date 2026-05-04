import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  configPrettier,

  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
