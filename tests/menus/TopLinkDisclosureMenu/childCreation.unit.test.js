import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  twoLevelDisclosureTopLink,
  threeLevelDisclosureTopLink,
  threeLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";

const menus = [];

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  for (const menu of menus.splice(0)) {
    menu.dispose();
  }

  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TopLinkDisclosureMenu menu item creation", () => {
  it("keeps separate link and toggle items in Top Link Disclosure", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
    });
    menus.push(menu);
    const linkItem = menu.elements.menuItems[1];
    const toggleItem = menu.elements.menuItems[2];

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(14);
    expect(linkItem.dom.link).toBe(document.querySelector(".dropdown > a"));
    expect(linkItem.isSubmenuItem).toBe(false);
    expect(linkItem.elements.sibling).toBe(toggleItem);
    expect(toggleItem.dom.link).toBe(
      document.querySelector(".dropdown-toggle")
    );
    expect(toggleItem.isSubmenuItem).toBe(true);
    expect(toggleItem.elements.toggle).toBe(menu.elements.submenuToggles[0]);
  });

  it("creates only one item when the link and toggle are the same", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
      submenuTogglesSelector: "a",
    });
    menus.push(menu);

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(8);
    expect(menu.elements.menuItems[1].dom.link).toBe(
      document.querySelector(".dropdown > a")
    );
    expect(menu.elements.menuItems[1].isSubmenuItem).toBe(true);
  });

  it("keeps Top Link Disclosure's separate root toggles and combined submenu links", () => {
    document.body.innerHTML = threeLevelDisclosureTopLink;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
    });
    menus.push(menu);
    const childMenu = menu.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(14);
    expect(childMenu.isInitialized).toBe(true);
    expect(childMenu.elements.menuItems).toHaveLength(5);
    expect(childMenu.elements.menuItems[1].elements.toggle.dom.controller).toBe(
      childMenu.elements.menuItems[1].dom.link
    );
    expect(childMenu.selectors.submenuToggles).toBe("a");
  });

  it("reads the current child toggle selector when children are created", () => {
    document.body.innerHTML = threeLevelDisclosureTopLinkSplit;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);

    menu._selectors.submenuSubtoggles = "button";
    menu.initialize();

    const childMenu = menu.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(childMenu.isInitialized).toBe(true);
    expect(childMenu.elements.menuItems).toHaveLength(8);
    expect(childMenu.elements.submenuToggles[0].dom.controller).toBe(
      childMenu.dom.menu.querySelector("button")
    );
  });

  it.each(["a", "a,button"])(
    "finds the navigation link after its toggle with selector %s",
    (selector) => {
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "button",
        transitionClass: "",
        menuLinksSelector: selector,
        initialize: false,
      });
      menus.push(menu);
      const item = menu.dom.menu.querySelector(".dropdown");
      const button = item.querySelector("button");
      const link = item.querySelector("a");
      item.prepend(button);

      menu.initialize();

      const linkItem = menu.elements.menuItems[1];
      const toggleItem = menu.elements.menuItems[2];

      expect(menu.isInitialized).toBe(true);
      expect(menu.elements.menuItems).toHaveLength(14);
      expect(linkItem.dom.link).toBe(link);
      expect(linkItem.elements.sibling).toBe(toggleItem);
      expect(toggleItem.dom.link).toBe(button);
    }
  );

  it("uses the toggle when the only navigation link is inside its child menu", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);
    const item = menu.dom.menu.querySelector(".dropdown");
    const button = item.querySelector("button");
    item.querySelector("a").remove();

    menu.initialize();

    const toggleItem = menu.elements.menuItems[1];
    const child = toggleItem.elements.childMenu;

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(13);
    expect(toggleItem.dom.link).toBe(button);
    expect(toggleItem.isSubmenuItem).toBe(true);
    expect(child.elements.menuItems[0].dom.link).toBe(
      item.querySelector("ul a")
    );
  });

  it("keeps standalone buttons as menu items", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);
    const lastItem = menu.dom.menu.lastElementChild;
    const button = document.querySelector(".menu-toggle");
    lastItem.replaceChildren(button);

    menu.initialize();

    const item = menu.elements.menuItems.at(-1);

    expect(menu.isInitialized).toBe(true);
    expect(item.dom.link).toBe(lastItem.querySelector("button"));
    expect(item.isSubmenuItem).toBe(false);
  });
});
