/**
 * Getter/Setter tests for the DisclosureMenuItem class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test all getter/setter methods in the DisclosureMenuItem class.
describe("DisclosureMenuItem getter/setters", () => {
  // Test DisclosureMenuItem dom.
  describe("dom", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom", () => {
      expect(DisclosureMenuItem.prototype.dom).toBe(BaseMenuItem.prototype.dom);
    });
  });

  // Test DisclosureMenuItem elements.
  describe("elements", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements", () => {
      expect(DisclosureMenuItem.prototype.elements).toBe(
        BaseMenuItem.prototype.elements
      );
    });
  });

  // Test DisclosureMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem", () => {
      expect(DisclosureMenuItem.prototype.isSubmenuItem).toBe(
        BaseMenuItem.prototype.isSubmenuItem
      );
    });
  });
});
