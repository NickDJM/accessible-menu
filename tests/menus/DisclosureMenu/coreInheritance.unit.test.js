import { describe, it } from "vitest";
import Component from "@accessible-ecosystem/core";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

describe("DisclosureMenu Core accessors", () => {
  describe.each([
    "rootDOMElement",
    "scope",
    "name",
    "eventPrefix",
    "isInitialized",
  ])("%s", (property) => {
    it("should inherit the Core getter through the menu base class", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        Component.prototype,
        property
      );
    });

    it("should preserve Core's getter-only descriptor", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        Component.prototype,
        property
      );
    });
  });
});
