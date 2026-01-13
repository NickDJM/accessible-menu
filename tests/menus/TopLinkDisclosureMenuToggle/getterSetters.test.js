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

  // Test TopLinkDisclosureMenuToggle isOpen.
  describe("isOpen", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle isOpen setter.
    it("should implement the BaseMenuToggle isOpen setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle hasOpened.
  describe("hasOpened", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle hasOpened getter.
    it("should implement the BaseMenuToggle hasOpened", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });

    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle hasOpened setter.
    it("should implement the BaseMenuToggle hasOpened setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });
  });
});
