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

  // Test DisclosureMenuToggle isExpanded.
  describe("isExpanded", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle isExpanded getter.
    it("should implement the BaseMenuToggle isExpanded", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle isExpanded setter.
    it("should implement the BaseMenuToggle isExpanded setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });
  });

  // Test DisclosureMenuToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded getter.
    it("should implement the BaseMenuToggle shouldBeExpanded", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded setter.
    it("should implement the BaseMenuToggle shouldBeExpanded setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });
  });
});
