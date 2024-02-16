import { defineConfig } from "vitepress";

// Get the current version from the package.json file.
import pkg from "../../package.json";
const version = pkg.version;

export default defineConfig({
  lang: "en-US",
  title: "Accessible Menu",
  // base: "/accessible-menu/",
  description:
    "A JavaScript library to help you generate WCAG accessible menus in the DOM.",
  themeConfig: {
    nav: [
      {
        text: "Docs",
        link: "/introduction",
      },
      {
        text: "API",
        activeMatch: "^/api/",
        link: "/api/",
      },
      {
        text: version,
        items: [
          {
            text: "Current release",
            link: `https://github.com/NickDJM/accessible-menu/releases/tag/v${version}`,
          },
          {
            text: "Changelog",
            link: "https://github.com/nickdjm/accessible-menu/blob/4.x/CHANGELOG.md",
          },
          {
            text: "Contributing",
            link: "https://github.com/nickdjm/accessible-menu/blob/4.x/.github/CONTRIBUTING.md",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nickdjm/accessible-menu" },
    ],

    sidebar: {
      "/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Quick Start", link: "/quick-start" },
            { text: "Supported Menus", link: "/supported-menus" },
          ],
        },
        {
          text: "Menus",
          items: [
            { text: "Disclosure Menus", link: "/disclosure-menus" },
            { text: "Menubars", link: "/menubars" },
            {
              text: "Top Link Disclosure Menus",
              link: "/top-link-disclosure-menus",
            },
            { text: "Treeviews", link: "/treeviews" },
          ],
        },
        {
          text: "Menu Options",
          items: [
            {
              text: "Opening and Closing the Menu",
              link: "/opening-and-closing",
            },
            { text: "Hover Types", link: "/hover-types" },
            { text: "Hover Delay", link: "/hover-delay" },
            {
              text: "Optional Keyboard Support",
              link: "/optional-keyboard-support",
            },
          ],
        },
        {
          text: "Other Topics",
          items: [
            { text: "Bootstrap support", link: "/bootstrap-support" },
            { text: "Browser support", link: "/browser-support" },
            { text: "Release information", link: "/releases" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Base Menu Classes",
          items: [
            {
              text: "BaseMenu",
              link: "/api/base-menu",
            },
            {
              text: "BaseMenuItem",
              link: "/api/base-menu-item",
            },
            {
              text: "BaseMenuToggle",
              link: "/api/base-menu-toggle",
            },
          ],
        },
        {
          text: "Disclosure Menu Classes",
          items: [
            {
              text: "DisclosureMenu",
              link: "/api/disclosure-menu",
            },
            {
              text: "DisclosureMenuItem",
              link: "/api/disclosure-menu-item",
            },
            {
              text: "DisclosureMenuToggle",
              link: "/api/disclosure-menu-toggle",
            },
          ],
        },
        {
          text: "Menubar Classes",
          items: [
            {
              text: "Menubar",
              link: "/api/menubar",
            },
            {
              text: "MenubarItem",
              link: "/api/menubar-item",
            },
            {
              text: "MenubarToggle",
              link: "/api/menubar-toggle",
            },
          ],
        },
        {
          text: "Top Link Disclosure Menu Classes",
          items: [
            {
              text: "TopLinkDisclosureMenu",
              link: "/api/top-link-disclosure-menu",
            },
            {
              text: "TopLinkDisclosureMenuItem",
              link: "/api/top-link-disclosure-menu-item",
            },
            {
              text: "TopLinkDisclosureMenuToggle",
              link: "/api/top-link-disclosure-menu-toggle",
            },
          ],
        },
        {
          text: "Treeview Classes",
          items: [
            {
              text: "Treeview",
              link: "/api/treeview",
            },
            {
              text: "TreeviewItem",
              link: "/api/treeview-item",
            },
            {
              text: "TreeviewToggle",
              link: "/api/treeview-toggle",
            },
          ],
        },
        {
          text: "DOM Helpers",
          items: [
            {
              text: "addClass",
              link: "/api/dom-helpers#addclass",
            },
            {
              text: "removeClass",
              link: "/api/dom-helpers#removeclass",
            },
          ],
        },
        {
          text: "Event Handlers",
          items: [
            {
              text: "keyPress",
              link: "/api/event-handlers#keypress",
            },
            {
              text: "preventEvent",
              link: "/api/event-handlers#preventevent",
            },
          ],
        },
        {
          text: "Validation",
          items: [
            {
              text: "Overview",
              link: "/api/validation",
            },
            {
              text: "isValidInstance",
              link: "/api/validation#isvalidinstance",
            },
            {
              text: "isValidType",
              link: "/api/validation#isvalidtype",
            },
            {
              text: "isQuerySelector",
              link: "/api/validation#isQuerySelector",
            },
            {
              text: "isValidClassList",
              link: "/api/validation#isvalidclasslist",
            },
            {
              text: "isValidState",
              link: "/api/validation#isvalidstate",
            },
            {
              text: "isValidEvent",
              link: "/api/validation#isvalidevent",
            },
            {
              text: "isValidHoverType",
              link: "/api/validation#isvalidhovertype",
            },
            {
              text: "isTag",
              link: "/api/validation#istag",
            },
          ],
        },
      ],
    },
    search: {
      provider: "local",
    },
  },
});
