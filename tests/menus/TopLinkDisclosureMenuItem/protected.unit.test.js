import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import { twoLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

describe("TopLinkDisclosureMenuItem protected methods", () => {
  describe("_validate", () => {
    describe("constructor options", () => {
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
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu,
          submenuSibling: {},
          initialize: false,
        });

        item.initialize();

        expect(
          item.errors.some((error) => error.message.includes("submenuSibling"))
        ).toBe(true);
      });
    });

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
        const item = new TopLinkDisclosureMenuItem({
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
