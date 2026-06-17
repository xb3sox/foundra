import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    // The two classic, high-value hooks rules. (react-hooks v7 also bundles the
    // stricter React Compiler diagnostics; we keep just these two to avoid
    // false positives on intentional patterns like test probes.)
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // Build/test config files run in Node and may use Node + Vitest globals.
  {
    files: ["*.config.{ts,js}", "src/test/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
    },
  }
);
