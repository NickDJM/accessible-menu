module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard",
    "plugin:jsdoc/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "jsdoc"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"]
      }
    ]
  }
};
