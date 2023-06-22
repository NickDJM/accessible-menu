module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:jsdoc/recommended", "prettier"],
  plugins: ["jsdoc"],
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
