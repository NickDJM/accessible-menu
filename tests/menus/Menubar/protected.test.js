/**
 * Tests for protected methods of Menubar class.
 */

import { describe, it, expect } from "vitest";
import Menubar from "../../../src/menubar.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test Menubar protected methods.
describe("Menubar protected methods", () => {
  // Test Menubar _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that Menubar implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(Menubar.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test Menubar _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that Menubar implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(Menubar.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test Menubar _handleFocus().
  describe("_handleFocus", () => {
    // Test that Menubar implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(Menubar.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test Menubar _handleHover().
  describe("_handleHover", () => {
    // Test that Menubar implements the BaseMenu _handleHover() method.
    it("should implement the BaseMenu _handleHover() method", () => {
      expect(Menubar.prototype._handleHover).toBe(
        BaseMenu.prototype._handleHover
      );
    });
  });

  // Test Menubar _setIds().
  describe("_setIds", () => {
    // Test that Menubar implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(Menubar.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });

  // Test Menubar _addEventListner().
  describe("_addEventListner", () => {
    // Test that Menubar implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(Menubar.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test Menubar _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that Menubar implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(Menubar.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test Menubar _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that Menubar implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(Menubar.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that Menubar implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(Menubar.prototype._store).toBe(BaseMenu.prototype._store);
    });
  });

  describe("_unstore", () => {
    // Test that Menubar implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(Menubar.prototype._unstore).toBe(BaseMenu.prototype._unstore);
    });
  });
});
