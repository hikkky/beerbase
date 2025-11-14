// eslint.config.mjs
import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  // Next.js推奨（core-web-vitals＋TS対応込み）
  ...next(),
  // 競合するESLint整形ルールを無効化（Prettier優先）
  configPrettier,
  // 追加ルール
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "warn", // 気になるなら "error" に
    },
  },
  // ignore
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
