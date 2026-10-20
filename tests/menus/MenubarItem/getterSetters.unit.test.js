/**
 * Getter/Setter tests for the MenubarItem class.
 */

import { describe, it, afterEach, beforeEach, expect, vi } from "vitest";
import MenubarItem from "../../../src/menubarItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test all getter/setter methods in the MenubarItem class.
describe("MenubarItem getter/setters", () => {
  // Test MenubarItem dom.
  describe("dom", () => {
    // Test that MenubarItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that MenubarItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test MenubarItem elements.
  describe("elements", () => {
    // Test that MenubarItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that MenubarItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "elements"
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

      it("accepts a sibling from the shared base class", () => {
        const sibling = new BaseMenuItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown-toggle"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });
        const item = new MenubarItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
          initialize: false,
          submenuSibling: sibling,
        });

        item.initialize();

        expect(item.isInitialized).toBe(true);
        expect(item.elements.sibling).toBe(sibling);
      });

      it("initializes without a separate sibling by default", () => {
        const item = new MenubarItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
          initialize: false,
        });

        item.initialize();

        expect(item.isInitialized).toBe(true);
        expect(item.elements.sibling).toBe(null);
      });
    });
  });

  // Test MenubarItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that MenubarItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that MenubarItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        MenubarItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });
});
