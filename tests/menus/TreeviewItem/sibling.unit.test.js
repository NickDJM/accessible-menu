import { afterEach, describe, expect, it, vi } from "vitest";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import TreeviewItem from "../../../src/treeviewItem.js";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TreeviewItem submenu sibling", () => {
  it("accepts a sibling from the shared base class", () => {
    const sibling = new BaseMenuItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("button"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
    });
    const item = new TreeviewItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("a"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      initialize: false,
      submenuSibling: sibling,
    });

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(sibling);
  });

  it("initializes without a separate sibling by default", () => {
    const item = new TreeviewItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("a"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      initialize: false,
    });

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(null);
  });

  it("reports an invalid sibling during validation", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const item = new TreeviewItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("a"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
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
