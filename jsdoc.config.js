export default {
  source: {
    include: ["src", "README.md"],
    includePattern: ".js$",
    excludePattern: "(node_modules/|docs)",
  },
  plugins: ["node_modules/jsdoc-typeof-plugin"],
};
