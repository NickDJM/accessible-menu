/**
 * Getter/Setter tests for the MenubarItem class.
 */

import { describe, it } from "vitest";
import MenubarItem from "../../../src/menubarItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

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
