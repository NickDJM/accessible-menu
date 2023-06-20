/**
 * Getter/Setter tests for the DisclosureMenuToggle class.
 */

import { describe, it, expect } from "vitest";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test all getter/setter methods in the DisclosureMenuToggle class.
describe("DisclosureMenuToggle getter/setters", () => {
  // Test DisclosureMenuToggle dom.
  describe("dom", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expect(DisclosureMenuToggle.prototype.dom).toBe(
        BaseMenuToggle.prototype.dom
      );
    });
  });

  // Test DisclosureMenuToggle elements.
  describe("elements", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expect(DisclosureMenuToggle.prototype.elements).toBe(
        BaseMenuToggle.prototype.elements
      );
    });
  });

  // Test DisclosureMenuToggle isOpen.
  describe("isOpen", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expect(DisclosureMenuToggle.prototype.isOpen).toBe(
        BaseMenuToggle.prototype.isOpen
      );
    });
  });
});
