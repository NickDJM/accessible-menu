module.exports = {
  source: {
    include: ["src", "README.md"],
    includePattern: ".js$",
    excludePattern: "(node_modules/|docs)",
  },
  plugins: ["plugins/markdown", "node_modules/jsdoc-typeof-plugin"],
  opts: {
    destination: "./docs/dist",
    encoding: "utf8",
    private: true,
    recurse: true,
  },
};
