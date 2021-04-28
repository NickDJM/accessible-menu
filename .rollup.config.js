import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "./src/rollup.js",
  output: [
    {
      name: "AccessibleMenu",
      file: "dist/accessibleMenu.js",
      format: "iife",
      plugins: [resolve(), babel()],
    },
    {
      name: "AccessibleMenu",
      file: "dist/accessibleMenu.min.js",
      format: "iife",
      plugins: [resolve(), babel(), terser()],
    },
  ],
};
