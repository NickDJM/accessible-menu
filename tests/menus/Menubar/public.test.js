/**
 * Tests for public methods of Menubar class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test Menubar public methods.
describe("Menubar public methods", () => {
  // Test Menubar focus().
  describe("focus", () => {
    // Test that Menubar implements the BaseMenu focus() method.
    it("should implement the BaseMenu focus() method", () => {
      expect(Menubar.prototype.focus).toBe(BaseMenu.prototype.focus);
    });
  });

  // Test Menubar blur().
  describe("blur", () => {
    // Test that Menubar implements the BaseMenu blur() method.
    it("should implement the BaseMenu blur() method", () => {
      expect(Menubar.prototype.blur).toBe(BaseMenu.prototype.blur);
    });
  });

  // Test Menubar focusCurrentChild().
  describe("focusCurrentChild", () => {
    // Test that Menubar implements the BaseMenu focusCurrentChild() method.
    it("should implement the BaseMenu focusCurrentChild() method", () => {
      expect(Menubar.prototype.focusCurrentChild).toBe(
        BaseMenu.prototype.focusCurrentChild
      );
    });
  });

  // Test Menubar blurCurrentChild().
  describe("blurCurrentChild", () => {
    // Test that Menubar implements the BaseMenu blurCurrentChild() method.
    it("should implement the BaseMenu blurCurrentChild() method", () => {
      expect(Menubar.prototype.blurCurrentChild).toBe(
        BaseMenu.prototype.blurCurrentChild
      );
    });
  });

  // Test Menubar focusChild().
  describe("focusChild", () => {
    // Test that Menubar implements the BaseMenu focusChild() method.
    it("should implement the BaseMenu focusChild() method", () => {
      expect(Menubar.prototype.focusChild).toBe(BaseMenu.prototype.focusChild);
    });
  });

  // Test Menubar focusFirstChild().
  describe("focusFirstChild", () => {
    // Test that Menubar implements the BaseMenu focusFirstChild() method.
    it("should implement the BaseMenu focusFirstChild() method", () => {
      expect(Menubar.prototype.focusFirstChild).toBe(
        BaseMenu.prototype.focusFirstChild
      );
    });
  });

  // Test Menubar focusLastChild().
  describe("focusLastChild", () => {
    // Test that Menubar implements the BaseMenu focusLastChild() method.
    it("should implement the BaseMenu focusLastChild() method", () => {
      expect(Menubar.prototype.focusLastChild).toBe(
        BaseMenu.prototype.focusLastChild
      );
    });
  });

  // Test Menubar focusNextChild().
  describe("focusNextChild", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that Menubar does not implement the BaseMenu focusNextChild() method.
    it("should not implement the BaseMenu focusNextChild() method", () => {
      expect(Menubar.prototype.focusNextChild).not.toBe(
        BaseMenu.prototype.focusNextChild
      );
    });

    // Test that focusNextChild calls focusChild() with the index of the next menu item.
    it("should call focusChild() with the index of the next menu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextChild();

      expect(spy).toHaveBeenCalledWith(1);
    });

    // Test that focusNextChild calls focusFirstChild() if the currentChild index is the last menu item.
    it("should call focusFirstChild() if the currentChild index is the last menu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set the current child to the last menu item.
      menu.currentChild = 7;

      // Set up to check for focus.
      const spy1 = vi.spyOn(menu, "focusFirstChild");
      const spy2 = vi.spyOn(menu, "focusChild");

      menu.focusNextChild();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalledWith(8);
    });
  });

  // Test Menubar focusPreviousChild().
  describe("focusPreviousChild", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that Menubar does not implement the BaseMenu focusPreviousChild() method.
    it("should not implement the BaseMenu focusPreviousChild() method", () => {
      expect(Menubar.prototype.focusPreviousChild).not.toBe(
        BaseMenu.prototype.focusPreviousChild
      );
    });

    // Test that focusPreviousChild calls focusChild() with the index of the previous menu item.
    it("should call focusChild() with the index of the previous menu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set the current child to the last menu item.
      menu.currentChild = 6;

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusPreviousChild();

      expect(spy).toHaveBeenCalledWith(5);
    });

    // Test that focusPreviousChild calls focusLastChild() if the currentChild index is the first menu item.
    it("should call focusLastChild() if the currentChild index is the first menu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusLastChild");
      const spy2 = vi.spyOn(menu, "focusChild");

      menu.focusPreviousChild();

      expect(spy).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalledWith(-2);
    });
  });

  // Test Menubar focusController().
  describe("focusController", () => {
    // Test that Menubar implements the BaseMenu focusController() method.
    it("should implement the BaseMenu focusController() method", () => {
      expect(Menubar.prototype.focusController).toBe(
        BaseMenu.prototype.focusController
      );
    });
  });

  // Test Menubar focusContainer().
  describe("focusContainer", () => {
    // Test that Menubar implements the BaseMenu focusContainer() method.
    it("should implement the BaseMenu focusContainer() method", () => {
      expect(Menubar.prototype.focusContainer).toBe(
        BaseMenu.prototype.focusContainer
      );
    });
  });

  // Test Menubar closeChildren().
  describe("closeChildren", () => {
    // Test that Menubar implements the BaseMenu closeChildren() method.
    it("should implement the BaseMenu closeChildren() method", () => {
      expect(Menubar.prototype.closeChildren).toBe(
        BaseMenu.prototype.closeChildren
      );
    });
  });

  // Test Menubar BlurChildren().
  describe("blurChildren", () => {
    // Test that Menubar implements the BaseMenu blurChildren() method.
    it("should implement the BaseMenu blurChildren() method", () => {
      expect(Menubar.prototype.blurChildren).toBe(
        BaseMenu.prototype.blurChildren
      );
    });
  });

  // Test Menubar focusNextChildWithCharacter().
  describe("focusNextChildWithCharacter", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that focusNextChildWithCharacter calls focusChild with the index of the item starting with a given character.
    it("should call focusChild with the index of the item starting with a given character", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextChildWithCharacter("B");

      expect(spy).toHaveBeenCalledWith(4);
    });

    // Test that focusNextChildWithCharacter does not call focusChild if no item starts with a given character.
    it("should not call focusChild if no item starts with a given character", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextChildWithCharacter("Z");

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focusNextChildWithCharacter does not call focusChild if there _is_ an item starting with a given character, but it is before the currentChild.
    it("should not call focusChild if there is an item starting with a given character, but it is before the currentChild", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      menu.currentChild = 5;

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextChildWithCharacter("B");

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
