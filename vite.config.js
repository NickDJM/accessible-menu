import { resolve } from "path";
import { defineConfig } from "vite";
import BrowserSync from "vite-plugin-browser-sync";

// The type of menu to build.
const buildType = process.env.BUILD_TYPE ?? "default";

// Supported build types.
const formats = ["iife", "es"];

// The library options for the different menus.
const lib = {
  default: {
    entry: resolve(__dirname, "build.js"),
    name: "AccessibleMenu",
    formats,
    fileName: (format) => `accessible-menu.${format}.js`,
  },
  DisclosureMenu: {
    entry: resolve(__dirname, "/src/disclosureMenu.js"),
    name: "DisclosureMenu",
    formats,
    fileName: (format) => `disclosure-menu.${format}.js`,
  },
  Menubar: {
    entry: resolve(__dirname, "/src/menubar.js"),
    name: "Menubar",
    formats,
    fileName: (format) => `menubar.${format}.js`,
  },
  TopLinkDisclosureMenu: {
    entry: resolve(__dirname, "/src/topLinkDisclosureMenu.js"),
    name: "TopLinkDisclosureMenu",
    formats,
    fileName: (format) => `top-link-disclosure-menu.${format}.js`,
  },
  Treeview: {
    entry: resolve(__dirname, "/src/treeview.js"),
    name: "Treeview",
    formats,
    fileName: (format) => `treeview.${format}.js`,
  },
};

export default defineConfig({
  plugins: [BrowserSync()],
  build: {
    lib: lib[buildType] || lib.default,
    emptyOutDir: false,
  },
});
