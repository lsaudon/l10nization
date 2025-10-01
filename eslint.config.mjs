import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/out", "**/dist", "**/*.d.ts"],
}, ...compat.extends(
    // "eslint:all",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    rules: {
        "array-element-newline": "off",
        "consistent-return": "off",
        "class-methods-use-this": "off",
        "capitalized-comments": "off",
        "function-call-argument-newline": "off",
        "padded-blocks": "off",
        "one-var": "off",
        "func-style": "off",
        "max-classes-per-file": "off",
        "max-len": "off",
        "max-lines": "off",
        "max-lines-per-function": "off",
        "max-statements": "off",
        "multiline-comment-style": "off",
        "no-console": "warn",
        "no-empty-function": "off",
        "no-magic-numbers": "off",
        "no-ternary": "off",
        "lines-between-class-members": "off",
        "id-length": "off",
        "object-curly-spacing": "off",
        "space-before-function-paren": "off",
        "prefer-named-capture-group": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",

        "prefer-destructuring": ["error", {
            array: false,
            object: true,
        }, {
            enforceForRenamedProperties: false,
        }],

        "max-params": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
    },
}];