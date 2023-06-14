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
});
