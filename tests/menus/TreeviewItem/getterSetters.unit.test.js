/**
 * Getter/Setter tests for the TreeviewItem class.
 */

import { describe, it, afterEach, beforeEach, expect, vi } from "vitest";
import TreeviewItem from "../../../src/treeviewItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test all getter/setter methods in the TreeviewItem class.
describe("TreeviewItem getter/setters", () => {
  // Test TreeviewItem dom.
  describe("dom", () => {
    // Test that TreeviewItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test TreeviewItem elements.
  describe("elements", () => {
    // Test that TreeviewItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
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
        const item = new TreeviewItem({
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
        const item = new TreeviewItem({
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

  // Test TreeviewItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that TreeviewItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });

  describe("id", () => {
    it("should implement the BaseMenuItem id getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "id"
      );
    });
  });

  describe("shouldFocus", () => {
    it("should implement the BaseMenuItem shouldFocus getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "shouldFocus"
      );
    });
  });

  describe("currentEvent", () => {
    it("should implement the BaseMenuItem currentEvent getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "currentEvent"
      );
    });

    it("should implement the BaseMenuItem currentEvent setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "currentEvent"
      );
    });
  });
});
