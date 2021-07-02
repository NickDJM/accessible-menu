module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ["standard", "plugin:jsdoc/recommended", "prettier"],
  plugins: ["jsdoc"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
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
