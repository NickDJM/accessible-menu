import { describe, it, expect } from "vitest";
import Component from "@accessible-ecosystem/core";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";

describe("DisclosureMenuToggle Core accessors", () => {
  describe.each([
    "rootDOMElement",
    "scope",
    "name",
    "eventPrefix",
    "isInitialized",
  ])("%s", (property) => {
    it("should inherit the Core getter through the menu base class", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        Component.prototype,
        property
      );
    });

    it("should preserve Core's getter-only descriptor", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        Component.prototype,
        property
      );
    });
  });
});

describe("DisclosureMenuToggle collapsible inheritance", () => {
  it("should preserve the superclass on derived toggles", () => {
    expect(
      Object.prototype.isPrototypeOf.call(
        CollapsibleComponent.prototype,
        DisclosureMenuToggle.prototype
      )
    ).toBe(true);
  });
  it.each(["isExpanded", "shouldBeExpanded", "isLocked", "shouldBeLocked"])(
    "should inherit the %s getter",
    (property) => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        CollapsibleComponent.prototype,
        property
      );
    }
  );
});
