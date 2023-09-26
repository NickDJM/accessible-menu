module.exports = {
  "*.{js,mjs}": [
    "eslint --fix",
    "prettier --write --ignore-path .eslintignore",
  ],
};
