import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";

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

describe("Menubar menu item creation", () => {
  it("keeps one submenu item when links and toggles match different elements", () => {
    const menu = new Menubar({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "button",
      transitionClass: "",
    });
    menus.push(menu);
    const toggle = menu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(8);
    expect(menu.elements.menuItems[1].dom.link).toBe(toggle.dom.controller);
    expect(menu.elements.menuItems[1].elements.toggle).toBe(toggle);
  });
});
