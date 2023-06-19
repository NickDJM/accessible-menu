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

  // Test Treeview _handleFocus().
  describe("_handleFocus", () => {
    // Test that Treeview implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(Treeview.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test Treeview _handleClick().
  describe("_handleClick", () => {
    // Test that Treeview implements the BaseMenu _handleClick() method.
    it("should implement the BaseMenu _handleClick() method", () => {
      expect(Treeview.prototype._handleClick).toBe(
        BaseMenu.prototype._handleClick
      );
    });
  });

  // Test Treeview _handleHover().
  describe("_handleHover", () => {
    // Test that Treeview implements the BaseMenu _handleHover() method.
    it("should implement the BaseMenu _handleHover() method", () => {
      expect(Treeview.prototype._handleHover).toBe(
        BaseMenu.prototype._handleHover
      );
    });
  });
});
