/**
 * Getter/Setter tests for the TreeviewToggle class.
 */

import { describe, it, expect } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test all getter/setter methods in the TreeviewToggle class.
describe("TreeviewToggle getter/setters", () => {
  // Test TreeviewToggle dom.
  describe("dom", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expect(TreeviewToggle.prototype.dom).toBe(BaseMenuToggle.prototype.dom);
    });
  });

  // Test TreeviewToggle elements.
  describe("elements", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expect(TreeviewToggle.prototype.elements).toBe(
        BaseMenuToggle.prototype.elements
      );
    });
  });

  // Test TreeviewToggle isOpen.
  describe("isOpen", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expect(TreeviewToggle.prototype.isOpen).toBe(
        BaseMenuToggle.prototype.isOpen
      );
    });
  });
});
