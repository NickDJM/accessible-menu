const config = {
  types: [
    {
      type: "feat",
      section: "Features",
      hidden: false,
    },
    {
      type: "fix",
      section: "Bug Fixes",
      hidden: false,
    },
    {
      type: "perf",
      section: "Performance Improvements",
      hidden: false,
    },
    {
      type: "revert",
      section: "Reverts",
      hidden: false,
    },
    {
      type: "docs",
      section: "Documentation",
      hidden: false,
    },
    {
      type: "style",
      section: "Styles",
      hidden: true,
    },
    {
      type: "chore",
      section: "Miscellaneous Chores",
      hidden: true,
    },
    {
      type: "refactor",
      section: "Code Refactoring",
      hidden: false,
    },
    {
      type: "test",
      section: "Tests",
      hidden: true,
    },
    {
      type: "build",
      section: "Build System",
      hidden: false,
    },
    {
      type: "ci",
      section: "Continuous Integration",
      hidden: false,
    },
  ],
  scripts: {
    prerelease: "npm run lint && npm run build && npm run test:run",
    prechangelog: "rm -f CURRENT_RELEASE.md",
    postchangelog: "node scripts/current-release.js",
    precommit: "git add dist/. CURRENT_RELEASE.md",
  },
};

module.exports = config;
