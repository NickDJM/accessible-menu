import { afterEach, describe, expect, it, vi } from "vitest";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TopLinkDisclosureMenuItem submenu sibling", () => {
  const createItem = (options = {}) =>
    new TopLinkDisclosureMenuItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("a"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      initialize: false,
      ...options,
    });

  it("accepts a sibling from the shared base class", () => {
    const sibling = new BaseMenuItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("button"),
      parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
    });
    const item = createItem({ submenuSibling: sibling });

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(sibling);
  });

  it("initializes without a separate sibling by default", () => {
    const item = createItem();

    item.initialize();

    expect(item.isInitialized).toBe(true);
    expect(item.elements.sibling).toBe(null);
  });

  it("reports an invalid sibling during validation", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const item = createItem({ submenuSibling: {} });

    item.initialize();

    expect(item.isInitialized).toBe(false);
    expect(
      item.errors.some((error) => error.message.includes("submenuSibling"))
    ).toBe(true);
  });
});
