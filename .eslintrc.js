module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:jsdoc/recommended", "prettier"],
  plugins: ["jsdoc"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
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
