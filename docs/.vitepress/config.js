import { defineConfig } from "vitepress";
import rootConfig from "../../vite.config.js";

// Get the current version from the package.json file.
import pkg from "../../package.json";
const version = pkg.version;

export default defineConfig({
  lang: "en-US",
  title: "Accessible Menu",
  description:
    "A JavaScript library to help you generate WCAG accessible menus in the DOM.",
  vite: {
    // Use the server config from the root Vite config.
    server: rootConfig.server,
  },
  markdown: {
    config(md) {
      // Included repository documents keep their GitHub-relative links.
      // Resolve those links to the matching docs pages when rendering the site.
      const policyLinks = {
        "CONTRIBUTING.md": "/community/contributing",
        "AI_CONTRIBUTIONS.md": "/community/ai-contributions",
        "ACCESSIBILITY.md": "/community/accessibility",
        "../AGENTS.md":
          "https://github.com/NickDJM/accessible-menu/blob/4.x/AGENTS.md",
        ".github/CONTRIBUTING.md": "/community/contributing",
        ".github/AI_CONTRIBUTIONS.md": "/community/ai-contributions",
        ".github/ACCESSIBILITY.md": "/community/accessibility",
        "../docs/browser-support.md": "/browser-support",
        "../LICENSE":
          "https://github.com/NickDJM/accessible-menu/blob/4.x/LICENSE",
      };
      const renderLink = md.renderer.rules.link_open;

      md.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const token = tokens[index];
        const destination = policyLinks[token.attrGet("href")];

        if (destination) {
          token.attrSet("href", destination);
        }

        return renderLink
          ? renderLink(tokens, index, options, env, self)
          : self.renderToken(tokens, index, options);
      };
    },
  },
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
        text: "Upgrade Guide",
        link: "/upgrade-guide",
      },
      {
        text: "Demo",
        link: "/demo/",
        // Load the standalone demo instead of using VitePress's page router.
        target: "_self",
      },
      {
        text: "Community",
        link: "/community/",
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
            link: "/community/contributing",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nickdjm/accessible-menu" },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113c-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1 0 18.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.22.22 0 0 1-.016.325c-.61.625-3.204 3.227-3.527 4.126c-.066.186-.164.18-.222.177M12 21.677a3.16 3.16 0 0 1-3.158-3.159a3.3 3.3 0 0 1 .787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.1 3.1 0 0 1 .792 2.093A3.16 3.16 0 0 1 12 21.677m6.046-5.123c-.068.15-.223.398-.431.405c-.371.014-.411-.177-.686-.583c-.604-.892-5.864-6.39-6.848-7.455c-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016s1.029 4.556.71 5.253"/></svg>',
        },
        link: "https://www.drupal.org/project/accessible_menu",
        ariaLabel: "Accessible Menu Drupal module",
      },
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
            { text: "Global Menu Storage", link: "/global-menu-storage" },
            { text: "Bootstrap support", link: "/bootstrap-support" },
            { text: "Drupal support", link: "/drupal-support" },
            { text: "Browser support", link: "/browser-support" },
            { text: "Release information", link: "/releases" },
            { text: "Testimonials", link: "/testimonials" },
          ],
        },
      ],
      "/community/": [
        {
          text: "Community",
          items: [
            { text: "Overview", link: "/community/" },
            { text: "Contributing", link: "/community/contributing" },
            {
              text: "AI contribution policy",
              link: "/community/ai-contributions",
            },
            { text: "Accessibility policy", link: "/community/accessibility" },
            { text: "Code of conduct", link: "/community/code-of-conduct" },
            { text: "Security policy", link: "/community/security" },
            { text: "Commit guidelines", link: "/community/commit-guidelines" },
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
