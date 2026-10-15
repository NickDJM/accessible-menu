/**
 * Tests for public methods of the TreeviewToggle class.
 */

import { describe, it, expect } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test TreeviewToggle public methods.
describe("TreeviewToggle public methods", () => {
  // Test TreeviewItem expand().
  describe("expand", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle expand.
    it("should implement the BaseMenuToggle open", () => {
      expect(TreeviewToggle.prototype.expand).toBe(
        BaseMenuToggle.prototype.expand
      );
    });
  });

  // Test TreeviewToggle preview().
  describe("preview", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle preview.
    it("should implement the BaseMenuToggle preview", () => {
      expect(TreeviewToggle.prototype.preview).toBe(
        BaseMenuToggle.prototype.preview
      );
    });
  });

  // Test TreeviewToggle collapse().
  describe("collapse", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapse.
    it("should implement the BaseMenuToggle close", () => {
      expect(TreeviewToggle.prototype.collapse).toBe(
        BaseMenuToggle.prototype.collapse
      );
    });
  });

  // Test TreeviewToggle toggle().
  describe("toggle", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle toggle.
    it("should implement the BaseMenuToggle toggle", () => {
      expect(TreeviewToggle.prototype.toggle).toBe(
        BaseMenuToggle.prototype.toggle
      );
    });
  });

  // Test TreeviewToggle collapseSiblings().
  describe("collapseSiblings", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapseSiblings.
    it("should implement the BaseMenuToggle collapseSiblings", () => {
      expect(TreeviewToggle.prototype.collapseSiblings).toBe(
        BaseMenuToggle.prototype.collapseSiblings
      );
    });
  });

  // Test TreeviewToggle collapseChildren().
  describe("collapseChildren", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapseChildren.
    it("should implement the BaseMenuToggle collapseChildren", () => {
      expect(TreeviewToggle.prototype.collapseChildren).toBe(
        BaseMenuToggle.prototype.collapseChildren
      );
    });
  });
});
