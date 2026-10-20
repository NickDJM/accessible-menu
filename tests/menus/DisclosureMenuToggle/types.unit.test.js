import { describe, it, expect } from "vitest";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";

describe("DisclosureMenuToggle types", () => {
  describe("inheritance", () => {
    it("should preserve the superclass on derived toggles", () => {
      expect(
        Object.prototype.isPrototypeOf.call(
          CollapsibleComponent.prototype,
          DisclosureMenuToggle.prototype
        )
      ).toBe(true);
    });
  });
});
