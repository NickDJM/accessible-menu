/**
 * Getter/Setter tests for the TopLinkDisclosureMenuItem class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test all getter/setter methods in the TopLinkDisclosureMenuItem class.
describe("TopLinkDisclosureMenuItem getter/setters", () => {
  // Test TopLinkDisclosureMenuItem dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom", () => {
      expect(TopLinkDisclosureMenuItem.prototype.dom).toBe(
        BaseMenuItem.prototype.dom
      );
    });
  });

  // Test TopLinkDisclosureMenuItem elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements", () => {
      expect(TopLinkDisclosureMenuItem.prototype.elements).toBe(
        BaseMenuItem.prototype.elements
      );
    });
  });

  // Test TopLinkDisclosureMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem", () => {
      expect(TopLinkDisclosureMenuItem.prototype.isSubmenuItem).toBe(
        BaseMenuItem.prototype.isSubmenuItem
      );
    });
  });
});
