import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import process from "process";

// Get the current directory path.
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// The type of menu to build from the BUILD_TYPE environment variable.
// If BUILD_TYPE is not set, the default build is used
const buildType = process.env.BUILD_TYPE ?? "default";

// Supported build types.
const formats = ["iife", "es", "cjs"];

// The library options for the different menus.
const lib = {
  default: {
    entry: resolve(__dirname, "build.js"),
    name: "AccessibleMenu",
    formats,
    fileName: (format) =>
      format === "cjs" ? "accessible-menu.cjs" : `accessible-menu.${format}.js`,
  },
  DisclosureMenu: {
    entry: resolve(__dirname, "src/disclosureMenu.js"),
    name: "DisclosureMenu",
    formats,
    fileName: (format) =>
      format === "cjs" ? "disclosure-menu.cjs" : `disclosure-menu.${format}.js`,
  },
  Menubar: {
    entry: resolve(__dirname, "src/menubar.js"),
    name: "Menubar",
    formats,
    fileName: (format) =>
      format === "cjs" ? "menubar.cjs" : `menubar.${format}.js`,
  },
  TopLinkDisclosureMenu: {
    entry: resolve(__dirname, "src/topLinkDisclosureMenu.js"),
    name: "TopLinkDisclosureMenu",
    formats,
    fileName: (format) =>
      format === "cjs"
        ? "top-link-disclosure-menu.cjs"
        : `top-link-disclosure-menu.${format}.js`,
  },
  Treeview: {
    entry: resolve(__dirname, "src/treeview.js"),
    name: "Treeview",
    formats,
    fileName: (format) =>
      format === "cjs" ? "treeview.cjs" : `treeview.${format}.js`,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: lib[buildType] || lib.default,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        exports: buildType === "default" || !lib[buildType] ? "named" : "auto",
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          server: {
            deps: {
              // Keep Core imports on the same module instance in source and tests.
              inline: [/@accessible-ecosystem\/core/],
            },
          },
          environment: "jsdom",
          environmentOptions: {
            pretendToBeVisual: true,
          },
          include: ["tests/**/*.unit.{test,spec}.{js,ts,jsx,tsx}"],
        },
      },
    ],
  },
});
