/**
 * Tests for protected methods of Treeview class.
 */

import { describe, it, expect } from "vitest";
import Treeview from "../../../src/treeview.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test Treeview protected methods.
describe("Treeview protected methods", () => {
  // Test Treeview _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(Treeview.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test Treeview _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(Treeview.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });
});
