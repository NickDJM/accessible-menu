/**
 * Getter/Setter tests for the DisclosureMenuItem class.
 */

import { describe, it } from "vitest";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the DisclosureMenuItem class.
describe("DisclosureMenuItem getter/setters", () => {
  // Test DisclosureMenuItem dom.
  describe("dom", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test DisclosureMenuItem elements.
  describe("elements", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });
  });

  // Test DisclosureMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });
});
