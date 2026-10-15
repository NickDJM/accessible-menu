/**
 * Tests for protected methods of TopLinkDisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test TopLinkDisclosureMenu protected methods.
describe("TopLinkDisclosureMenu protected methods", () => {
  // Test TopLinkDisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _handleFocus().
  describe("_handleFocus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(TopLinkDisclosureMenu.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test TopLinkDisclosureMenu _setIds().
  describe("_setIds", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(TopLinkDisclosureMenu.prototype._setIds).toBe(
        BaseMenu.prototype._setIds
      );
    });
  });

  // Test TopLinkDisclosureMenu _addEventListner().
  describe("_addEventListner", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(TopLinkDisclosureMenu.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test TopLinkDisclosureMenu _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(TopLinkDisclosureMenu.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test TopLinkDisclosureMenu _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(TopLinkDisclosureMenu.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(TopLinkDisclosureMenu.prototype._store).toBe(
        BaseMenu.prototype._store
      );
    });
  });

  describe("_unstore", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(TopLinkDisclosureMenu.prototype._unstore).toBe(
        BaseMenu.prototype._unstore
      );
    });
  });
});
