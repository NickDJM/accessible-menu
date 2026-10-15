/**
 * Tests for protected methods of DisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test DisclosureMenu protected methods.
describe("DisclosureMenu protected methods", () => {
  // Test DisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test DisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test DisclosureMenu _handleFocus().
  describe("_handleFocus", () => {
    // Test that DisclosureMenu implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(DisclosureMenu.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test DisclosureMenu _handleHover().
  describe("_handleHover", () => {
    // Test that DisclosureMenu implements the BaseMenu _handleHover() method.
    it("should implement the BaseMenu _handleHover() method", () => {
      expect(DisclosureMenu.prototype._handleHover).toBe(
        BaseMenu.prototype._handleHover
      );
    });
  });

  // Test DisclosureMenu _setIds().
  describe("_setIds", () => {
    // Test that DisclosureMenu implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(DisclosureMenu.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });

  // Test DisclosureMenu _addEventListner().
  describe("_addEventListner", () => {
    // Test that DisclosureMenu implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(DisclosureMenu.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test DisclosureMenu _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that DisclosureMenu implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(DisclosureMenu.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test DisclosureMenu _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that DisclosureMenu implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(DisclosureMenu.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that DisclosureMenu implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(DisclosureMenu.prototype._store).toBe(BaseMenu.prototype._store);
    });
  });

  describe("_unstore", () => {
    // Test that DisclosureMenu implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(DisclosureMenu.prototype._unstore).toBe(
        BaseMenu.prototype._unstore
      );
    });
  });
});
