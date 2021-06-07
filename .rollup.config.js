import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "./rollup.js",
  plugins: [babel({ babelHelpers: "inline" }), resolve()],
  output: [
    {
      name: "AccessibleMenu",
      format: "iife",
      sourcemap: true,
      file: "dist/accessibleMenu.js",
    },
    {
      name: "AccessibleMenu",
      format: "iife",
      sourcemap: true,
      file: "dist/accessibleMenu.min.js",
      plugins: [terser()],
    },
  ],
};
