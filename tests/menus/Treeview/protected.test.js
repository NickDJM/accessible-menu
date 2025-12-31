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

  // Test Treeview _setIds().
  describe("_setIds", () => {
    // Test that Treeview implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(Treeview.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });

  // Test Treeview _addEventListner().
  describe("_addEventListner", () => {
    // Test that Treeview implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(Treeview.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test Treeview _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that Treeview implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(Treeview.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test Treeview _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that Treeview implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(Treeview.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });
});
