/**
 * Tests for public methods of the TopLinkDisclosureMenuItem class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test BaseMenuItem public methods.
describe("BaseMenuItem public methods", () => {
  // Test BaseMenuItem focus().
  describe("focus", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem focus() method.
    it("should implement the BaseMenuItem focus() method", () => {
      expect(TopLinkDisclosureMenuItem.prototype.focus).toBe(
        BaseMenuItem.prototype.focus
      );
    });
  });

  // Test BaseMenuItem blur().
  describe("blur", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem blur() method.
    it("should implement the BaseMenuItem blur() method", () => {
      expect(TopLinkDisclosureMenuItem.prototype.blur).toBe(
        BaseMenuItem.prototype.blur
      );
    });
  });
});
