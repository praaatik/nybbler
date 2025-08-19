// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { globalIgnores } from "eslint/config";
// import stylistic from "@stylistic/eslint-plugin";
//
// export default tseslint.config([
//     globalIgnores(["dist"]),
//
//     stylistic.configs.customize({
//         quotes: "double",
//         semi: true,
//         indent: 4,
//         jsx: true,
//     }),
//
//     {
//         files: ["**/*.{ts}"],
//         extends: [
//             js.configs.recommended,
//             tseslint.configs.recommended,
//         ],
//         languageOptions: {
//             ecmaVersion: 2020,
//             globals: globals.browser,
//         },
//     },
// ]);

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config([
    {
        ignores: ["dist"],
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
