/**
 * Tests for public methods of DisclosureMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { twoLevel } from "../../../demo/menus.js";
import { setupMatchMedia } from "../helpers.js";

// Test DisclosureMenu public methods.
describe("DisclosureMenu public methods", () => {
  // Test DisclosureMenu focus().
  describe("focus", () => {
    // Test that DisclosureMenu implements the BaseMenu focus() method.
    it("should implement the BaseMenu focus() method", () => {
      expect(DisclosureMenu.prototype.focus).toBe(BaseMenu.prototype.focus);
    });
  });

  // Test DisclosureMenu blur().
  describe("blur", () => {
    // Test that DisclosureMenu implements the BaseMenu blur() method.
    it("should implement the BaseMenu blur() method", () => {
      expect(DisclosureMenu.prototype.blur).toBe(BaseMenu.prototype.blur);
    });
  });

  // Test DisclosureMenu focusCurrentChild().
  describe("focusCurrentChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusCurrentChild() method.
    it("should implement the BaseMenu focusCurrentChild() method", () => {
      expect(DisclosureMenu.prototype.focusCurrentChild).toBe(
        BaseMenu.prototype.focusCurrentChild
      );
    });
  });

  // Test DisclosureMenu blurCurrentChild().
  describe("blurCurrentChild", () => {
    // Test that DisclosureMenu implements the BaseMenu blurCurrentChild() method.
    it("should implement the BaseMenu blurCurrentChild() method", () => {
      expect(DisclosureMenu.prototype.blurCurrentChild).toBe(
        BaseMenu.prototype.blurCurrentChild
      );
    });
  });

  // Test DisclosureMenu focusChild().
  describe("focusChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusChild() method.
    it("should implement the BaseMenu focusChild() method", () => {
      expect(DisclosureMenu.prototype.focusChild).toBe(
        BaseMenu.prototype.focusChild
      );
    });
  });

  // Test DisclosureMenu focusFirstChild().
  describe("focusFirstChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusFirstChild() method.
    it("should implement the BaseMenu focusFirstChild() method", () => {
      expect(DisclosureMenu.prototype.focusFirstChild).toBe(
        BaseMenu.prototype.focusFirstChild
      );
    });
  });

  // Test DisclosureMenu focusLastChild().
  describe("focusLastChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusLastChild() method.
    it("should implement the BaseMenu focusLastChild() method", () => {
      expect(DisclosureMenu.prototype.focusLastChild).toBe(
        BaseMenu.prototype.focusLastChild
      );
    });
  });

  // Test DisclosureMenu focusNextChild().
  describe("focusNextChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusNextChild() method.
    it("should implement the BaseMenu focusNextChild() method", () => {
      expect(DisclosureMenu.prototype.focusNextChild).toBe(
        BaseMenu.prototype.focusNextChild
      );
    });
  });

  // Test DisclosureMenu focusPreviousChild().
  describe("focusPreviousChild", () => {
    // Test that DisclosureMenu implements the BaseMenu focusPreviousChild() method.
    it("should implement the BaseMenu focusPreviousChild() method", () => {
      expect(DisclosureMenu.prototype.focusPreviousChild).toBe(
        BaseMenu.prototype.focusPreviousChild
      );
    });
  });

  // Test DisclosureMenu focusController().
  describe("focusController", () => {
    // Test that DisclosureMenu implements the BaseMenu focusController() method.
    it("should implement the BaseMenu focusController() method", () => {
      expect(DisclosureMenu.prototype.focusController).toBe(
        BaseMenu.prototype.focusController
      );
    });
  });

  // Test DisclosureMenu focusContainer().
  describe("focusContainer", () => {
    // Test that DisclosureMenu implements the BaseMenu focusContainer() method.
    it("should implement the BaseMenu focusContainer() method", () => {
      expect(DisclosureMenu.prototype.focusContainer).toBe(
        BaseMenu.prototype.focusContainer
      );
    });
  });

  // Test DisclosureMenu collapseChildren().
  describe("collapseChildren", () => {
    // Test that DisclosureMenu implements the BaseMenu collapseChildren() method.
    it("should implement the BaseMenu collapseChildren() method", () => {
      expect(DisclosureMenu.prototype.collapseChildren).toBe(
        BaseMenu.prototype.collapseChildren
      );
    });
  });

  // Test DisclosureMenu BlurChildren().
  describe("blurChildren", () => {
    // Test that DisclosureMenu implements the BaseMenu blurChildren() method.
    it("should implement the BaseMenu blurChildren() method", () => {
      expect(DisclosureMenu.prototype.blurChildren).toBe(
        BaseMenu.prototype.blurChildren
      );
    });
  });

  describe("dispose", () => {
    describe("descendant listeners", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should remove descendant document listeners when the root is disposed", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const listener = vi.fn();
        child._addEventListener("audit-dispose", document, listener);

        menu.dispose();
        document.dispatchEvent(new Event("audit-dispose"));

        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe("controller media queries", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = "";
      });

      it("should stop responding to query changes when disposed", () => {
        const { matchMedia, mql, listeners } = setupMatchMedia(true);
        vi.stubGlobal("matchMedia", matchMedia);
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          breakpoint: "40em",
          lockOutsideBreakpoint: true,
        });
        menu.initialize();
        const controller = menu.elements.controller;
        vi.advanceTimersToNextFrame();

        menu.dispose();
        mql.matches = false;
        listeners.forEach((listener) => listener(mql));

        expect(controller.isLocked).toBe(false);
      });
    });
  });
});
