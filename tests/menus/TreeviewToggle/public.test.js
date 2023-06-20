/**
 * Tests for public methods of the TreeviewToggle class.
 */

import { describe, it, expect } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test TreeviewToggle public methods.
describe("TreeviewToggle public methods", () => {
  // Test TreeviewItem open().
  describe("open", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle open.
    it("should implement the BaseMenuToggle open", () => {
      expect(TreeviewToggle.prototype.open).toBe(BaseMenuToggle.prototype.open);
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

  // Test TreeviewToggle close().
  describe("close", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle close.
    it("should implement the BaseMenuToggle close", () => {
      expect(TreeviewToggle.prototype.close).toBe(
        BaseMenuToggle.prototype.close
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

  // Test TreeviewToggle closeSiblins().
  describe("closeSiblings", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle closeSiblings.
    it("should implement the BaseMenuToggle closeSiblings", () => {
      expect(TreeviewToggle.prototype.closeSiblings).toBe(
        BaseMenuToggle.prototype.closeSiblings
      );
    });
  });

  // Test TreeviewToggle closeChildren().
  describe("closeChildren", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle closeChildren.
    it("should implement the BaseMenuToggle closeChildren", () => {
      expect(TreeviewToggle.prototype.closeChildren).toBe(
        BaseMenuToggle.prototype.closeChildren
      );
    });
  });
});
