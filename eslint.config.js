import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      "simple-import-sort": pluginSimpleImportSort,
      import: pluginImport,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",

      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      // react hook rules
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn",

      // Import sorting rules
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],

      // Base rules
      "no-undef": "error",
    },
  },
]);
