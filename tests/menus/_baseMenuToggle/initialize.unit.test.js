import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { twoLevel } from "../../../demo/menus.js";

describe("BaseMenuToggle initialization", () => {
  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = "";
    });

    it.each([
      [{}, false, "false", "hide"],
      [{ expanded: true }, true, "true", "show"],
      [{ expanded: false }, false, "false", "hide"],
    ])(
      "should initialize from the expanded option %j",
      (options, expanded, aria, stateClass) => {
        const menu = new BaseMenu({
          menuElement: document.querySelector(".dropdown-menu"),
        });
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector(".dropdown-toggle"),
          controlledMenu: menu,
          ...options,
        });

        toggle.initialize();

        expect(toggle.isInitialized).toBe(true);
        expect(toggle.isExpanded).toBe(expanded);
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(aria);
        expect(toggle.dom.controlled.classList.contains(stateClass)).toBe(true);

        toggle.dispose();
      }
    );

    it("should inherit Core initialization", () => {
      expect(BaseMenuToggle.prototype.initialize).toBe(
        CollapsibleComponent.prototype.initialize
      );
    });
  });
});
