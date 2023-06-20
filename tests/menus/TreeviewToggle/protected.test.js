/**
 * Tests for protected methods in the TreeviewToggle class.
 */

import { describe, it, expect } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test TreeviewToggle protected methods.
describe("TreeviewToggle protected methods", () => {
  // Test TreeviewToggle _expand().
  describe("_expand", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(TreeviewToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test TreeviewToggle _collapse().
  describe("_collapse", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(TreeviewToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });
});
