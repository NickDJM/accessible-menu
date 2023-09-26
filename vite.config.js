import { resolve } from "path";
import { defineConfig } from "vite";
import BrowserSync from "vite-plugin-browser-sync";
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [BrowserSync()],
  build: {
    lib: lib[buildType] || lib.default,
    emptyOutDir: false,
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      pretendToBeVisual: true,
    },
  },
});
