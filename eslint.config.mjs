import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    {
        extends: ["prettier"],
        plugins: ["unused-imports"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            blankLine: "warn",
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
]
