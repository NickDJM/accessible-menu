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

  // Test MenubarToggle isOpen.
  describe("isOpen", () => {
    // Test that MenubarToggle implements the BaseMenuToggle isOpen getter.
    it("should implement the BaseMenuToggle isOpen", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle isOpen setter.
    it("should implement the BaseMenuToggle isOpen setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "isOpen"
      );
    });
  });

  // Test MenubarToggle hasOpened.
  describe("hasOpened", () => {
    // Test that MenubarToggle implements the BaseMenuToggle hasOpened getter.
    it("should implement the BaseMenuToggle hasOpened", () => {
      expectInheritedGetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });

    // Test that MenubarToggle implements the BaseMenuToggle hasOpened setter.
    it("should implement the BaseMenuToggle hasOpened setter", () => {
      expectInheritedSetter(
        MenubarToggle.prototype,
        BaseMenuToggle.prototype,
        "hasOpened"
      );
    });
  });
});
