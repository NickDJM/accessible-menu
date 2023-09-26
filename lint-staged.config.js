export default {
  "*.{js,cjs}": [
    "eslint --fix",
    "prettier --write --ignore-path .eslintignore",
  ],
};
