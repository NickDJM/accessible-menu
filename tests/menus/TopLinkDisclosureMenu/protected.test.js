/**
 * Tests for protected methods of TopLinkDisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test TopLinkDisclosureMenu protected methods.
describe("TopLinkDisclosureMenu protected methods", () => {
  // Test TopLinkDisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _handleFocus().
  describe("_handleFocus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(TopLinkDisclosureMenu.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });
});
