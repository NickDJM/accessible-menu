/**
 * Getter/Setter tests for the TreeviewToggle class.
 */

import { describe, it } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

// Test all getter/setter methods in the TreeviewToggle class.
describe("TreeviewToggle getter/setters", () => {
  // Test TreeviewToggle dom.
  describe("dom", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expectInheritedGetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });

    // Test that TreeviewToggle implements the BaseMenuToggle dom setter.
    it("should implement the BaseMenuToggle dom setter", () => {
      expectInheritedSetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });
  });

  // Test TreeviewToggle elements.
  describe("elements", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expectInheritedGetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });

    // Test that TreeviewToggle implements the BaseMenuToggle elements setter.
    it("should implement the BaseMenuToggle elements setter", () => {
      expectInheritedSetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });
  });

  // Test TreeviewToggle isExpanded.
  describe("isExpanded", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle isExpanded getter.
    it("should implement the BaseMenuToggle isExpanded", () => {
      expectInheritedGetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    // Test that TreeviewToggle implements the BaseMenuToggle isExpanded setter.
    it("should implement the BaseMenuToggle isExpanded setter", () => {
      expectInheritedSetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });
  });

  // Test TreeviewToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle shouldBeExpanded getter.
    it("should implement the BaseMenuToggle shouldBeExpanded", () => {
      expectInheritedGetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    // Test that TreeviewToggle implements the BaseMenuToggle shouldBeExpanded setter.
    it("should implement the BaseMenuToggle shouldBeExpanded setter", () => {
      expectInheritedSetter(
        TreeviewToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });
  });
});
