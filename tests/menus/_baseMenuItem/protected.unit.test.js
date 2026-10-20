import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Component from "@accessible-ecosystem/core";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { twoLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";

describe("BaseMenuItem protected methods", () => {
  describe("_validate", () => {
    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should inherit shared Core validation", () => {
        expect(BaseMenuItem.prototype._validate).toBe(
          Component.prototype._validate
        );
      });

      it.each([
        ["parentMenu", {}, "parentMenu"],
        ["isSubmenuItem", "invalid", "isSubmenuItem"],
        ["childMenu", {}, "childMenu"],
        ["toggle", {}, "toggle"],
        ["menuItemElement", null, "itemElement"],
        ["menuLinkElement", null, "linkElement"],
      ])(
        "should reject invalid item %s through validation listeners",
        (property, value, errorField) => {
          vi.spyOn(console, "error").mockImplementation(() => {});
          const parentMenu = new BaseMenu({
            menuElement: document.querySelector("ul"),
          });
          const item = new BaseMenuItem({
            menuItemElement: document.querySelector(".dropdown"),
            menuLinkElement: document.querySelector(".dropdown > a"),
            parentMenu,
            [property]: value,
          });

          item.initialize();

          expect(
            item.errors.some((error) => error.message.includes(errorField))
          ).toBe(true);
        }
      );

      it.each(["childMenu", "toggle"])(
        "should require a submenu item's %s",
        (relationship) => {
          vi.spyOn(console, "error").mockImplementation(() => {});
          const parentMenu = new BaseMenu({
            menuElement: document.querySelector("ul"),
          });
          const item = new BaseMenuItem({
            menuItemElement: document.querySelector(".dropdown"),
            menuLinkElement: document.querySelector(".dropdown > a"),
            parentMenu,
            isSubmenuItem: true,
          });

          item.initialize();

          expect(
            item.errors.some((error) => error.message.includes(relationship))
          ).toBe(true);
        }
      );
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
        const item = new BaseMenuItem({
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
