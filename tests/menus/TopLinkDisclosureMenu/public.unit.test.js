/**
 * Tests for public methods of TopLinkDisclosureMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { twoLevel } from "../../../demo/menus.js";
import { setupMatchMedia } from "../helpers.js";

// Test TopLinkDisclosureMenu public methods.
describe("TopLinkDisclosureMenu public methods", () => {
  // Test TopLinkDisclosureMenu focus().
  describe("focus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focus() method.
    it("should implement the BaseMenu focus() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focus).toBe(
        BaseMenu.prototype.focus
      );
    });
  });

  // Test TopLinkDisclosureMenu blur().
  describe("blur", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu blur() method.
    it("should implement the BaseMenu blur() method", () => {
      expect(TopLinkDisclosureMenu.prototype.blur).toBe(
        BaseMenu.prototype.blur
      );
    });
  });

  // Test TopLinkDisclosureMenu focusCurrentChild().
  describe("focusCurrentChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusCurrentChild() method.
    it("should implement the BaseMenu focusCurrentChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusCurrentChild).toBe(
        BaseMenu.prototype.focusCurrentChild
      );
    });
  });

  // Test TopLinkDisclosureMenu blurCurrentChild().
  describe("blurCurrentChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu blurCurrentChild() method.
    it("should implement the BaseMenu blurCurrentChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.blurCurrentChild).toBe(
        BaseMenu.prototype.blurCurrentChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusChild().
  describe("focusChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusChild() method.
    it("should implement the BaseMenu focusChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusChild).toBe(
        BaseMenu.prototype.focusChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusFirstChild().
  describe("focusFirstChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusFirstChild() method.
    it("should implement the BaseMenu focusFirstChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusFirstChild).toBe(
        BaseMenu.prototype.focusFirstChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusLastChild().
  describe("focusLastChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusLastChild() method.
    it("should implement the BaseMenu focusLastChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusLastChild).toBe(
        BaseMenu.prototype.focusLastChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusNextChild().
  describe("focusNextChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusNextChild() method.
    it("should implement the BaseMenu focusNextChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusNextChild).toBe(
        BaseMenu.prototype.focusNextChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusPreviousChild().
  describe("focusPreviousChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusPreviousChild() method.
    it("should implement the BaseMenu focusPreviousChild() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusPreviousChild).toBe(
        BaseMenu.prototype.focusPreviousChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusController().
  describe("focusController", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusController() method.
    it("should implement the BaseMenu focusController() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusController).toBe(
        BaseMenu.prototype.focusController
      );
    });
  });

  // Test TopLinkDisclosureMenu focusContainer().
  describe("focusContainer", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusContainer() method.
    it("should implement the BaseMenu focusContainer() method", () => {
      expect(TopLinkDisclosureMenu.prototype.focusContainer).toBe(
        BaseMenu.prototype.focusContainer
      );
    });
  });

  // Test TopLinkDisclosureMenu collapseChildren().
  describe("collapseChildren", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu collapseChildren() method.
    it("should implement the BaseMenu collapseChildren() method", () => {
      expect(TopLinkDisclosureMenu.prototype.collapseChildren).toBe(
        BaseMenu.prototype.collapseChildren
      );
    });
  });

  // Test TopLinkDisclosureMenu BlurChildren().
  describe("blurChildren", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu blurChildren() method.
    it("should implement the BaseMenu blurChildren() method", () => {
      expect(TopLinkDisclosureMenu.prototype.blurChildren).toBe(
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
        const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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
