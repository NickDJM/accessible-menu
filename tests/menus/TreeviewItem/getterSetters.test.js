/**
 * Getter/Setter tests for the TreeviewItem class.
 */

import { describe, it, expect } from "vitest";
import TreeviewItem from "../../../src/treeviewItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test all getter/setter methods in the TreeviewItem class.
describe("TreeviewItem getter/setters", () => {
  // Test TreeviewItem dom.
  describe("dom", () => {
    // Test that TreeviewItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom", () => {
      expect(TreeviewItem.prototype.dom).toBe(BaseMenuItem.prototype.dom);
    });
  });

  // Test TreeviewItem elements.
  describe("elements", () => {
    // Test that TreeviewItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements", () => {
      expect(TreeviewItem.prototype.elements).toBe(
        BaseMenuItem.prototype.elements
      );
    });
  });

  // Test TreeviewItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that TreeviewItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem", () => {
      expect(TreeviewItem.prototype.isSubmenuItem).toBe(
        BaseMenuItem.prototype.isSubmenuItem
      );
    });
  });
});
