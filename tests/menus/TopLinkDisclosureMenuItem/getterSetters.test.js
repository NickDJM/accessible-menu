/**
 * Getter/Setter tests for the TopLinkDisclosureMenuItem class.
 */

import { describe, it } from "vitest";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the TopLinkDisclosureMenuItem class.
describe("TopLinkDisclosureMenuItem getter/setters", () => {
  // Test TopLinkDisclosureMenuItem dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test TopLinkDisclosureMenuItem elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });
  });

  // Test TopLinkDisclosureMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that TopLinkDisclosureMenuItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });
});
