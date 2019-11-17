const tasks = list => list.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
      "echo committing as $(git config user.name)"
    ]),
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
};
