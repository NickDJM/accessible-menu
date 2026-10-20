import { defineConfig } from "rolldown";

// Build for these browser versions and newer.
const transform = {
  target: ["chrome111", "edge111", "firefox114", "safari16.4"],
};

// Keep ESM annotations so projects using the library can remove unused code.
const moduleMinify = {
  compress: true,
  mangle: true,
  codegen: false,
};

export default defineConfig([
  {
    input: "./build.js",
    output: ["iife", "es", "cjs"].map((format) => ({
      dir: "dist",
      entryFileNames:
        format === "cjs"
          ? "accessible-menu.cjs"
          : `accessible-menu.${format}.js`,
      format,
      name: "AccessibleMenu",
      exports: "named",
      minify: format === "es" ? moduleMinify : true,
      comments: { annotation: format === "es", jsdoc: false, legal: false },
    })),
    platform: "browser",
    transform,
  },
  {
    input: "./src/disclosureMenu.js",
    output: ["iife", "es", "cjs"].map((format) => ({
      dir: "dist",
      entryFileNames:
        format === "cjs"
          ? "disclosure-menu.cjs"
          : `disclosure-menu.${format}.js`,
      format,
      name: "DisclosureMenu",
      minify: format === "es" ? moduleMinify : true,
      comments: { annotation: format === "es", jsdoc: false, legal: false },
    })),
    platform: "browser",
    transform,
  },
  {
    input: "./src/menubar.js",
    output: ["iife", "es", "cjs"].map((format) => ({
      dir: "dist",
      entryFileNames: format === "cjs" ? "menubar.cjs" : `menubar.${format}.js`,
      format,
      name: "Menubar",
      minify: format === "es" ? moduleMinify : true,
      comments: { annotation: format === "es", jsdoc: false, legal: false },
    })),
    platform: "browser",
    transform,
  },
  {
    input: "./src/topLinkDisclosureMenu.js",
    output: ["iife", "es", "cjs"].map((format) => ({
      dir: "dist",
      entryFileNames:
        format === "cjs"
          ? "top-link-disclosure-menu.cjs"
          : `top-link-disclosure-menu.${format}.js`,
      format,
      name: "TopLinkDisclosureMenu",
      minify: format === "es" ? moduleMinify : true,
      comments: { annotation: format === "es", jsdoc: false, legal: false },
    })),
    platform: "browser",
    transform,
  },
  {
    input: "./src/treeview.js",
    output: ["iife", "es", "cjs"].map((format) => ({
      dir: "dist",
      entryFileNames:
        format === "cjs" ? "treeview.cjs" : `treeview.${format}.js`,
      format,
      name: "Treeview",
      minify: format === "es" ? moduleMinify : true,
      comments: { annotation: format === "es", jsdoc: false, legal: false },
    })),
    platform: "browser",
    transform,
  },
]);
