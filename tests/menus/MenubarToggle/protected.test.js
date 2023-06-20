/**
 * Tests for protected methods in the MenubarToggle class.
 */

import { describe, it, expect } from "vitest";
import MenubarToggle from "../../../src/menubarToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test MenubarToggle protected methods.
describe("MenubarToggle protected methods", () => {
  // Test MenubarToggle _expand().
  describe("_expand", () => {
    // Test that MenubarToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(MenubarToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test MenubarToggle _collapse().
  describe("_collapse", () => {
    // Test that MenubarToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(MenubarToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });
});
