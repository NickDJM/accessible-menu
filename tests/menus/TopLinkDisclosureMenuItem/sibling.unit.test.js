import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TopLinkDisclosureMenuItem submenu sibling", () => {
  it("accepts a sibling from the shared base class", () => {
    const sibling = new BaseMenuItem({
      menuItemElement: document.querySelector(".dropdown"),
      menuLinkElement: document.querySelector(".dropdown-toggle"),
      parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
    });
    const item = new TopLinkDisclosureMenuItem({
      menuItemElement: document.querySelector(".dropdown"),
      menuLinkElement: document.querySelector(".dropdown > a"),
      parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      initialize: false,
      submenuSibling: sibling,
    });

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(sibling);
  });

  it("initializes without a separate sibling by default", () => {
    const item = new TopLinkDisclosureMenuItem({
      menuItemElement: document.querySelector(".dropdown"),
      menuLinkElement: document.querySelector(".dropdown > a"),
      parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      initialize: false,
    });

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(null);
  });

  it("reports an invalid sibling during validation", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const item = new TopLinkDisclosureMenuItem({
      menuItemElement: document.querySelector(".dropdown"),
      menuLinkElement: document.querySelector(".dropdown > a"),
      parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      initialize: false,
      submenuSibling: {},
    });

    item.initialize();

    expect(item.isInitialized).toBe(false);
    expect(
      item.errors.some((error) => error.message.includes("submenuSibling"))
    ).toBe(true);
  });
});
