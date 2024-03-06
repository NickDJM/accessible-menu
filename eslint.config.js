import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

const files = ["*.js", "*.cjs"];
const ignores = [
  "dist/",
  "docs/.vitepress/cache/",
  "docs/.vitepress/dist/",
  "!.*.js",
  "!.*.mjs",
  "!.*.cjs",
];

const config = {
  plugins: {
    jsdoc,
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
  },
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "jsdoc/no-defaults": 0,
    "jsdoc/tag-lines": [
      "warn",
      "always",
      {
        applyToEndTag: false,
        startLines: 1,
        endLines: 0,
        tags: {
          property: { lines: "never" },
          param: { lines: "never" },
        },
      },
    ],
  },
  settings: {
    jsdoc: {
      mode: "permissive",
      tagNamePreference: {
        augments: {
          message:
            "@extends is to be used over @augments as it is more evocative of classes than @augments",
          replacement: "extends",
        },
      },
    },
  },
};

export default [
  js.configs.recommended,
  prettier,
  jsdoc.configs["flat/recommended"],
  config,
  {
    files,
  },
  {
    ignores,
  },
];
