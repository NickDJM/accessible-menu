/**
 * Tests for protected methods in the DisclosureMenuToggle class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test DisclosureMenuToggle protected methods.
describe("DisclosureMenuToggle protected methods", () => {
  // Test DisclosureMenuToggle _expand().
  describe("_expand", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(DisclosureMenuToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test DisclosureMenuToggle _collapse().
  describe("_collapse", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(DisclosureMenuToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });
});
