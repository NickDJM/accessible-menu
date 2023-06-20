/**
 * Getter/Setter tests for the TopLinkDisclosureMenuToggle class.
 */

import { describe, it, expect } from "vitest";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test all getter/setter methods in the TopLinkDisclosureMenuToggle class.
describe("TopLinkDisclosureMenuToggle getter/setters", () => {
  // Test TopLinkDisclosureMenuToggle dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.dom).toBe(
        BaseMenuToggle.prototype.dom
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.elements).toBe(
        BaseMenuToggle.prototype.elements
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle isOpen.
  describe("isOpen", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.isOpen).toBe(
        BaseMenuToggle.prototype.isOpen
      );
    });
  });
});
