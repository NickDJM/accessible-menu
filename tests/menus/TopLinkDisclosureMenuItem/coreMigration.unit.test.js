import { it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

it("should reject an invalid top-link item sibling", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const parentMenu = new TopLinkDisclosureMenu({
    menuElement: document.querySelector("ul"),
    initialize: false,
  });
  const item = new TopLinkDisclosureMenuItem({
    menuItemElement: document.createElement("li"),
    menuLinkElement: document.createElement("a"),
    parentMenu,
    submenuSibling: {},
    initialize: false,
  });

  item.initialize();

  expect(
    item.errors.some((error) => error.message.includes("submenuSibling"))
  ).toBe(true);
});
