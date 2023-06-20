/**
 * Getter/Setter tests for the MenubarItem class.
 */

import { describe, it, expect } from "vitest";
import MenubarItem from "../../../src/menubarItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test all getter/setter methods in the MenubarItem class.
describe("MenubarItem getter/setters", () => {
  // Test MenubarItem dom.
  describe("dom", () => {
    // Test that MenubarItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom", () => {
      expect(MenubarItem.prototype.dom).toBe(BaseMenuItem.prototype.dom);
    });
  });

  // Test MenubarItem elements.
  describe("elements", () => {
    // Test that MenubarItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements", () => {
      expect(MenubarItem.prototype.elements).toBe(
        BaseMenuItem.prototype.elements
      );
    });
  });

  // Test MenubarItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that MenubarItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem", () => {
      expect(MenubarItem.prototype.isSubmenuItem).toBe(
        BaseMenuItem.prototype.isSubmenuItem
      );
    });
  });
});
