const tasks = list => list.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
      "echo committing as $(git config user.name)",
      "npm run lint",
    ]),
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
