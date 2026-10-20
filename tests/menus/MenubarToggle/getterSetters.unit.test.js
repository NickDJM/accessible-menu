/**
 * Getter/Setter tests for the MenubarToggle class.
 */

import { describe, it } from "vitest";
import MenubarToggle from "../../../src/menubarToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the MenubarToggle class.
describe("MenubarToggle getter/setters", () => {
  // Test MenubarToggle dom.
  describe("dom", () => {
    // Test that MenubarToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle dom setter.
    it("should implement the BaseMenuToggle dom setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });
  });

  // Test MenubarToggle elements.
  describe("elements", () => {
    // Test that MenubarToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle elements setter.
    it("should implement the BaseMenuToggle elements setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });
  });

  // Test MenubarToggle isExpanded.
  describe("isExpanded", () => {
    // Test that MenubarToggle implements the BaseMenuToggle isExpanded getter.
    it("should implement the BaseMenuToggle isExpanded", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle isExpanded setter.
    it("should implement the BaseMenuToggle isExpanded setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });
  });

  // Test MenubarToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that MenubarToggle implements the BaseMenuToggle shouldBeExpanded getter.
    it("should implement the BaseMenuToggle shouldBeExpanded", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle shouldBeExpanded setter.
    it("should implement the BaseMenuToggle shouldBeExpanded setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });
  });

  describe("id", () => {
    it("should implement the BaseMenuToggle id getter", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "id"
      );
    });
  });

  describe("shouldFocus", () => {
    it("should implement the BaseMenuToggle shouldFocus getter", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldFocus"
      );
    });
  });

  describe("currentEvent", () => {
    it("should implement the BaseMenuToggle currentEvent getter", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "currentEvent"
      );
    });

    it("should implement the BaseMenuToggle currentEvent setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "currentEvent"
      );
    });
  });
});
