/**
 * Tests for protected methods in the TopLinkDisclosureMenuToggle class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test TopLinkDisclosureMenuToggle protected methods.
describe("TopLinkDisclosureMenuToggle protected methods", () => {
  // Test TopLinkDisclosureMenuToggle _expand().
  describe("_expand", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(TopLinkDisclosureMenuToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle _collapse().
  describe("_collapse", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(TopLinkDisclosureMenuToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });
});
