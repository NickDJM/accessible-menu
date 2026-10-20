import { describe, afterEach, beforeEach, expect, it, vi } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import TreeviewItem from "../../../src/treeviewItem.js";

describe("TreeviewItem protected methods", () => {
  describe("_validate", () => {
    describe("submenu siblings", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });

      it("reports an invalid sibling during validation", () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const item = new TreeviewItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
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
  });
});
