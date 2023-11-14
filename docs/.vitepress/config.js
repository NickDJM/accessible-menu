import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Accessible Menu",
  description:
    "A JavaScript library to help you generate WCAG accessible menus in the DOM.",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Quick Start", link: "/quick-start" },
        ],
      },
      {
        text: "Other Topics",
        items: [{ text: "Browser support", link: "/browser-support" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nickdjm/accessible-menu" },
    ],
  },
});
