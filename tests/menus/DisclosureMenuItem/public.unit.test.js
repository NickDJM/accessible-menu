/**
 * Tests for public methods of the DisclosureMenuItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevel } from "../../../demo/menus.js";

// Test BaseMenuItem public methods.
describe("BaseMenuItem public methods", () => {
  // Test BaseMenuItem focus().
  describe("focus", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem focus() method.
    it("should implement the BaseMenuItem focus() method", () => {
      expect(DisclosureMenuItem.prototype.focus).toBe(
        BaseMenuItem.prototype.focus
      );
    });

    describe("logical focus", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should track logical focus through Core", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        const item = menu.elements.menuItems[0];

        item.focus();

        expect(item.focusState).toBe("self");
      });
    });
  });

  // Test BaseMenuItem blur().
  describe("blur", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem blur() method.
    it("should implement the BaseMenuItem blur() method", () => {
      expect(DisclosureMenuItem.prototype.blur).toBe(
        BaseMenuItem.prototype.blur
      );
    });

    describe("logical focus", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should clear logical focus through Core", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        const item = menu.elements.menuItems[0];
        item.focus();

        item.blur();

        expect(item.focusState).toBe("none");
      });
    });
  });
});
