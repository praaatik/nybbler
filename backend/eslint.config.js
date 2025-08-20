import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config([
    {
        ignores: ["dist", "generated"],
    },

    stylistic.configs.customize({
        quotes: "double",
        semi: true,
        indent: 4,
        jsx: false,
    }),

    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.es2020,
            },
        },
        rules: {},
    },
]);
