/**
 * Accessor inheritance tests across the Accessible Menu and Core prototypes.
 */

import { describe, it } from "vitest";
import Component from "@accessible-ecosystem/core";
import DisclosureMenu from "../../src/disclosureMenu.js";
import DisclosureMenuToggle from "../../src/disclosureMenuToggle.js";
import DisclosureMenuItem from "../../src/disclosureMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "./helpers.js";

describe.each(
  [DisclosureMenu, DisclosureMenuToggle, DisclosureMenuItem].map((Type) => ({
    name: Type.name,
    Type,
  }))
)("$name Core accessors", ({ Type }) => {
  describe.each([
    "rootDOMElement",
    "scope",
    "name",
    "eventPrefix",
    "isInitialized",
  ])("%s", (property) => {
    it("should inherit the Core getter through the menu base class", () => {
      expectInheritedGetter(Type.prototype, Component.prototype, property);
    });

    it("should preserve Core's getter-only descriptor", () => {
      expectInheritedSetter(Type.prototype, Component.prototype, property);
    });
  });
});
