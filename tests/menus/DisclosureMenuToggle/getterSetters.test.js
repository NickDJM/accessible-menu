/**
 * Getter/Setter tests for the DisclosureMenuToggle class.
 */

import { describe, it } from "vitest";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the DisclosureMenuToggle class.
describe("DisclosureMenuToggle getter/setters", () => {
  // Test DisclosureMenuToggle dom.
  describe("dom", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle dom setter.
    it("should implement the BaseMenuToggle dom setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });
  });

  // Test DisclosureMenuToggle elements.
  describe("elements", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle elements setter.
    it("should implement the BaseMenuToggle elements setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });
  });

  // Test DisclosureMenuToggle isOpen.
  describe("isOpen", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle isOpen setter.
    it("should implement the BaseMenuToggle isOpen setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });
  });

  // Test DisclosureMenuToggle hasOpened.
  describe("hasOpened", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle hasOpened getter.
    it("should implement the BaseMenuToggle hasOpened", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle hasOpened setter.
    it("should implement the BaseMenuToggle hasOpened setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });
  });
});
