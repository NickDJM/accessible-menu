import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

it("should expose an existing menu-item DOM ID through Core", () => {
  document.querySelector("li").id = "existing-menu-item";
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("ul"),
    submenuTogglesSelector: "a",
  });

  expect(menu.elements.menuItems[0].id).toBe("existing-menu-item");
});

describe("Menu item Core focus", () => {
  it("should use the parent menu's focus permission", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];

    menu.currentEvent = "keyboard";

    expect(item.shouldFocus).toBe(true);
  });

  it("should track logical focus through Core", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];

    item.focus();

    expect(item.focusState).toBe("self");
  });

  it("should clear logical focus through Core", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];
    item.focus();

    item.blur();

    expect(item.focusState).toBe("none");
  });
});
