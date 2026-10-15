/**
 * Getter/Setter tests for the TreeviewItem class.
 */

import { describe, it } from "vitest";
import TreeviewItem from "../../../src/treeviewItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the TreeviewItem class.
describe("TreeviewItem getter/setters", () => {
  // Test TreeviewItem dom.
  describe("dom", () => {
    // Test that TreeviewItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test TreeviewItem elements.
  describe("elements", () => {
    // Test that TreeviewItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });
  });

  // Test TreeviewItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that TreeviewItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that TreeviewItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        TreeviewItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });
});
