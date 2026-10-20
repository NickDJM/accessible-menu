import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

describe("BaseMenuToggle types", () => {
  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevelDisclosureTopLink;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should use CollapsibleComponent as the immediate superclass", () => {
      expect(Object.getPrototypeOf(BaseMenuToggle.prototype)).toBe(
        CollapsibleComponent.prototype
      );
    });

    it("should inherit from Core CollapsibleComponent", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance).toBeInstanceOf(CollapsibleComponent);
    });
  });
});
