/**
 * Getter/Setter tests for the MenubarToggle class.
 */

import { describe, it, expect } from "vitest";
import MenubarToggle from "../../../src/menubarToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test all getter/setter methods in the MenubarToggle class.
describe("MenubarToggle getter/setters", () => {
  // Test MenubarToggle dom.
  describe("dom", () => {
    // Test that MenubarToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expect(MenubarToggle.prototype.dom).toBe(BaseMenuToggle.prototype.dom);
    });
  });

  // Test MenubarToggle elements.
  describe("elements", () => {
    // Test that MenubarToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expect(MenubarToggle.prototype.elements).toBe(
        BaseMenuToggle.prototype.elements
      );
    });
  });

  // Test MenubarToggle isOpen.
  describe("isOpen", () => {
    // Test that MenubarToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expect(MenubarToggle.prototype.isOpen).toBe(
        BaseMenuToggle.prototype.isOpen
      );
    });
  });
});
