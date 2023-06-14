/**
 * Tests for public methods of Treeview class.
 *
 * todo: Add tests for: openChildren(), focusNextNodeWithCharacter(),
 * focusParentsNextChild(), and focusChildsLastNode().
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test Treeview public methods.
describe("Treeview public methods", () => {
  // Test Treeview focus().
  describe("focus", () => {
    // Test that Treeview implements the BaseMenu focus() method.
    it("should implement the BaseMenu focus() method", () => {
      expect(Treeview.prototype.focus).toBe(BaseMenu.prototype.focus);
    });
  });

  // Test Treeview blur().
  describe("blur", () => {
    // Test that Treeview implements the BaseMenu blur() method.
    it("should implement the BaseMenu blur() method", () => {
      expect(Treeview.prototype.blur).toBe(BaseMenu.prototype.blur);
    });
  });

  // Test Treeview focusCurrentChild().
  describe("focusCurrentChild", () => {
    // Test that Treeview implements the BaseMenu focusCurrentChild() method.
    it("should implement the BaseMenu focusCurrentChild() method", () => {
      expect(Treeview.prototype.focusCurrentChild).toBe(
        BaseMenu.prototype.focusCurrentChild
      );
    });
  });

  // Test Treeview blurCurrentChild().
  describe("blurCurrentChild", () => {
    // Test that Treeview implements the BaseMenu blurCurrentChild() method.
    it("should implement the BaseMenu blurCurrentChild() method", () => {
      expect(Treeview.prototype.blurCurrentChild).toBe(
        BaseMenu.prototype.blurCurrentChild
      );
    });
  });

  // Test Treeview focusChild().
  describe("focusChild", () => {
    // Test that Treeview implements the BaseMenu focusChild() method.
    it("should implement the BaseMenu focusChild() method", () => {
      expect(Treeview.prototype.focusChild).toBe(BaseMenu.prototype.focusChild);
    });
  });

  // Test Treeview focusFirstChild().
  describe("focusFirstChild", () => {
    // Test that Treeview implements the BaseMenu focusFirstChild() method.
    it("should implement the BaseMenu focusFirstChild() method", () => {
      expect(Treeview.prototype.focusFirstChild).toBe(
        BaseMenu.prototype.focusFirstChild
      );
    });
  });

  // Test Treeview focusLastChild().
  describe("focusLastChild", () => {
    // Test that Treeview implements the BaseMenu focusLastChild() method.
    it("should implement the BaseMenu focusLastChild() method", () => {
      expect(Treeview.prototype.focusLastChild).toBe(
        BaseMenu.prototype.focusLastChild
      );
    });
  });

  // Test Treeview focusNextChild().
  describe("focusNextChild", () => {
    // Test that Treeview implements the BaseMenu focusNextChild() method.
    it("should implement the BaseMenu focusNextChild() method", () => {
      expect(Treeview.prototype.focusNextChild).toBe(
        BaseMenu.prototype.focusNextChild
      );
    });
  });

  // Test Treeview focusPreviousChild().
  describe("focusPreviousChild", () => {
    // Test that Treeview implements the BaseMenu focusPreviousChild() method.
    it("should implement the BaseMenu focusPreviousChild() method", () => {
      expect(Treeview.prototype.focusPreviousChild).toBe(
        BaseMenu.prototype.focusPreviousChild
      );
    });
  });

  // Test Treeview focusController().
  describe("focusController", () => {
    // Test that Treeview implements the BaseMenu focusController() method.
    it("should implement the BaseMenu focusController() method", () => {
      expect(Treeview.prototype.focusController).toBe(
        BaseMenu.prototype.focusController
      );
    });
  });

  // Test Treeview focusContainer().
  describe("focusContainer", () => {
    // Test that Treeview implements the BaseMenu focusContainer() method.
    it("should implement the BaseMenu focusContainer() method", () => {
      expect(Treeview.prototype.focusContainer).toBe(
        BaseMenu.prototype.focusContainer
      );
    });
  });

  // Test Treeview closeChildren().
  describe("closeChildren", () => {
    // Test that Treeview implements the BaseMenu closeChildren() method.
    it("should implement the BaseMenu closeChildren() method", () => {
      expect(Treeview.prototype.closeChildren).toBe(
        BaseMenu.prototype.closeChildren
      );
    });
  });

  // Test Treeview BlurChildren().
  describe("blurChildren", () => {
    // Test that Treeview implements the BaseMenu blurChildren() method.
    it("should implement the BaseMenu blurChildren() method", () => {
      expect(Treeview.prototype.blurChildren).toBe(
        BaseMenu.prototype.blurChildren
      );
    });
  });

  // Test Treeview focusLastNode().
  describe("focusLastNode", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that focusLastNode calls focusLastChild() when the last child is not open.
    it("should call focusLastChild() when the last child is not open", () => {
      // Create a new Menubar instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusLastChild");

      menu.focusLastNode();

      expect(spy).toHaveBeenCalled();
    });

    // Test that focusLastNode does not call focusLastChild() when the last child is open.
    it("should not call focusLastChild() when the last child is open", () => {
      // Create a new Menubar instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the last child.
      menu.elements.submenuToggles[
        menu.elements.submenuToggles.length - 1
      ].open();

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusLastChild");

      menu.focusLastNode();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focusLastNode calls focusLastChild() on the last open child's submenu.
    it("should call focusLastChild() on the last open child's submenu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the last child.
      menu.elements.submenuToggles[
        menu.elements.submenuToggles.length - 1
      ].open();

      // Set up to check for focus.
      const spy = vi.spyOn(
        menu.elements.submenuToggles[menu.elements.submenuToggles.length - 1]
          .elements.controlledMenu,
        "focusLastChild"
      );

      menu.focusLastNode();

      expect(spy).toHaveBeenCalled();
    });
  });
});
