import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

export default [
  {
    input: "./rollup.js",
    plugins: [babel({ babelHelpers: "inline" }), cleanup()],
    output: [
      {
        name: "AccessibleMenu",
        format: "iife",
        sourcemap: true,
        file: "dist/accessible-menu.js",
      },
      {
        name: "AccessibleMenu",
        format: "iife",
        sourcemap: true,
        file: "dist/accessible-menu.min.js",
        plugins: [terser()],
      },
    ],
  },
  {
    input: "./src/disclosureMenu.js",
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: [
      {
        name: "DisclosureMenu",
        format: "iife",
        sourcemap: true,
        file: "dist/disclosure-menu.js",
      },
      {
        name: "DisclosureMenu",
        format: "iife",
        sourcemap: true,
        file: "dist/disclosure-menu.min.js",
        plugins: [terser()],
      },
      {
        name: "DisclosureMenu",
        format: "esm",
        sourcemap: true,
        file: "dist/disclosure-menu.esm.js",
      },
      {
        name: "DisclosureMenu",
        format: "esm",
        sourcemap: true,
        file: "dist/disclosure-menu.esm.min.js",
        plugins: [terser()],
      },
    ],
  },
  {
    input: "./src/menubar.js",
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: [
      {
        name: "Menubar",
        format: "iife",
        sourcemap: true,
        file: "dist/menubar.js",
      },
      {
        name: "Menubar",
        format: "iife",
        sourcemap: true,
        file: "dist/menubar.min.js",
        plugins: [terser()],
      },
      {
        name: "Menubar",
        format: "esm",
        sourcemap: true,
        file: "dist/menubar.esm.js",
      },
      {
        name: "Menubar",
        format: "esm",
        sourcemap: true,
        file: "dist/menubar.esm.min.js",
        plugins: [terser()],
      },
    ],
  },
  {
    input: "./src/treeview.js",
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: [
      {
        name: "Treeview",
        format: "iife",
        sourcemap: true,
        file: "dist/treeview.js",
      },
      {
        name: "Treeview",
        format: "iife",
        sourcemap: true,
        file: "dist/treeview.min.js",
        plugins: [terser()],
      },
      {
        name: "Treeview",
        format: "esm",
        sourcemap: true,
        file: "dist/treeview.esm.js",
      },
      {
        name: "Treeview",
        format: "esm",
        sourcemap: true,
        file: "dist/treeview.esm.min.js",
        plugins: [terser()],
      },
    ],
  },
];
