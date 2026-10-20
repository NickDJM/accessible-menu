/**
 * Tests for public methods of the DisclosureMenuItem class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";

// Test BaseMenuItem public methods.
describe("BaseMenuItem public methods", () => {
  // Test BaseMenuItem focus().
  describe("focus", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem focus() method.
    it("should implement the BaseMenuItem focus() method", () => {
      expect(DisclosureMenuItem.prototype.focus).toBe(
        BaseMenuItem.prototype.focus
      );
    });
  });

  // Test BaseMenuItem blur().
  describe("blur", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem blur() method.
    it("should implement the BaseMenuItem blur() method", () => {
      expect(DisclosureMenuItem.prototype.blur).toBe(
        BaseMenuItem.prototype.blur
      );
    });
  });
});
