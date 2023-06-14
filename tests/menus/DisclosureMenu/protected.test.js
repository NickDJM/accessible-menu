/**
 * Tests for protected methods of DisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test DisclosureMenu protected methods.
describe("DisclosureMenu protected methods", () => {
  // Test DisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test DisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });
});
