import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Accessible Menu",
  description:
    "A JavaScript library to help you generate WCAG accessible menus in the DOM.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting started", link: "/getting-started" },
          { text: "Browser support", link: "/browser-support" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nickdjm/accessible-menu" },
    ],
  },
});
