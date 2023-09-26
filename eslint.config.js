import jsdoc from "eslint-plugin-jsdoc";
import babelParser from "@babel/eslint-parser";
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";


const config = {
  files: ["./*.js", "./src/*.js", "./tests/**/*.js"],
  ignores: ["./dist/*.js", "!./.*.js"],
  plugins: {
    jsdoc
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    parser: babelParser,
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
  // settings: {
  //   jsdoc: {
  //     mode: "permissive",
  //     tagNamePreference: {
  //       augments: {
  //         message:
  //           "@extends is to be used over @augments as it is more evocative of classes than @augments",
  //         replacement: "extends",
  //       },
  //     },
  //   },
  // },
};

export default [
  js.configs.recommended,
  prettier,
  config,
];
