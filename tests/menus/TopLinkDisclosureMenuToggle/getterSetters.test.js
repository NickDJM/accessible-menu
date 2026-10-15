/**
 * Getter/Setter tests for the TopLinkDisclosureMenuToggle class.
 */

import { describe, it } from "vitest";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the TopLinkDisclosureMenuToggle class.
describe("TopLinkDisclosureMenuToggle getter/setters", () => {
  // Test TopLinkDisclosureMenuToggle dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle dom setter.
    it("should implement the BaseMenuToggle dom setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle elements setter.
    it("should implement the BaseMenuToggle elements setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle isExpanded.
  describe("isExpanded", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle isExpanded getter.
    it("should implement the BaseMenuToggle isExpanded", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle isExpanded setter.
    it("should implement the BaseMenuToggle isExpanded setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded getter.
    it("should implement the BaseMenuToggle shouldBeExpanded", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded setter.
    it("should implement the BaseMenuToggle shouldBeExpanded setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });
  });
});
