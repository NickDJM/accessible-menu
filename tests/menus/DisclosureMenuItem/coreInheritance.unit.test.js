import { describe, it } from "vitest";
import Component from "@accessible-ecosystem/core";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

describe("DisclosureMenuItem Core accessors", () => {
  describe.each([
    "rootDOMElement",
    "scope",
    "name",
    "eventPrefix",
    "isInitialized",
  ])("%s", (property) => {
    it("should inherit the Core getter through the menu base class", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        Component.prototype,
        property
      );
    });

    it("should preserve Core's getter-only descriptor", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        Component.prototype,
        property
      );
    });
  });
});
