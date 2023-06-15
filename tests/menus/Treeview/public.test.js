/**
 * Tests for public methods of Treeview class.
 *
 * todo: Add tests for: focusChildsLastNode().
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel, threeLevel } from "../../../demo/menus.js";
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
      // Create a new Treeview instance for testing.
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
      // Create a new Treeview instance for testing.
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
      // Create a new Treeview instance for testing.
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

  // Test openChildren().
  describe("openChildren", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Should call preview() on all submenu toggles in the menu.
    it("should call preview() on all submenu toggles in the menu", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on all submenuToggles and preview() methods.
      const spy1 = vi.spyOn(menu.elements.submenuToggles[0], "preview");
      const spy2 = vi.spyOn(menu.elements.submenuToggles[1], "preview");
      const spy3 = vi.spyOn(menu.elements.submenuToggles[2], "preview");
      const spy4 = vi.spyOn(menu.elements.submenuToggles[3], "preview");
      const spy5 = vi.spyOn(menu.elements.submenuToggles[4], "preview");
      const spy6 = vi.spyOn(menu.elements.submenuToggles[5], "preview");

      menu.openChildren();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
      expect(spy4).toHaveBeenCalled();
      expect(spy5).toHaveBeenCalled();
      expect(spy6).toHaveBeenCalled();
    });
  });

  // Test Treeview focusNextNodeWithCharacter().
  describe("focusNextNodeWithCharacter", () => {
    beforeEach(() => {
      document.body.innerHTML = threeLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that focusNextNodeWithCharacter calls focusChild with the index of the item starting with a given character.
    it("should call focusChild with the index of the item starting with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextNodeWithCharacter("B");

      expect(spy).toHaveBeenCalledWith(4);
    });

    // Test that focusNextNodeWithCharacter does not call focusChild if no item starts with a given character.
    it("should not call focusChild if no item starts with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextNodeWithCharacter("Z");

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focusNextNodeWithCharacter does not call focusChild if there _is_ an item starting with a given character, but it is before the currentChild.
    it("should call focusChild if there is an item starting with a given character before the currentChild", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      menu.currentChild = 5;

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextNodeWithCharacter("B");

      expect(spy).toHaveBeenCalledWith(4);
    });

    // Test that focusNextNodeWithCharacter will call focusChild on open submenus if it contains the next item starting with a given character.
    it("should call focusChild on open submenu's if it contains the next item starting with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Set up to check for focus.
      const spy = vi.spyOn(
        menu.elements.submenuToggles[0].elements.controlledMenu,
        "focusChild"
      );

      menu.focusNextNodeWithCharacter("W");

      expect(spy).toHaveBeenCalledWith(1);
    });

    // Test that focusNextNodeWithCharacter will call focusChild on open submenu's submenus if it contains the next item starting with a given character.
    it("should call focusChild on open submenu's submenu's if it contains the next item starting with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Open the first submenu's submenu.
      menu.elements.submenuToggles[0].elements.controlledMenu.elements.submenuToggles[0].open();

      // Set up to check for focus.
      const spy = vi.spyOn(
        menu.elements.submenuToggles[0].elements.controlledMenu.elements
          .submenuToggles[0].elements.controlledMenu,
        "focusChild"
      );

      menu.focusNextNodeWithCharacter("L");

      expect(spy).toHaveBeenCalledWith(1);
    });

    // Test that focusNextNodeWithCharacter will call focusChild on a parent menu if it contains the next item starting with a given character.
    it("should call focusChild on a parent menu if it contains the next item starting with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.elements.submenuToggles[0].elements.controlledMenu.focusNextNodeWithCharacter(
        "R"
      );

      expect(spy).toHaveBeenCalledWith(2);
    });

    // Test that focusNextNodeWithCharacter will call focusChild on a parent menu's parent menu if it contains the next item starting with a given character.
    it("should call focusChild on a parent menu's parent menu if it contains the next item starting with a given character", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Open the first submenu's submenu.
      menu.elements.submenuToggles[0].elements.controlledMenu.elements.submenuToggles[0].open();

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.elements.submenuToggles[0].elements.controlledMenu.elements.submenuToggles[0].elements.controlledMenu.focusNextNodeWithCharacter(
        "R"
      );

      expect(spy).toHaveBeenCalledWith(2);
    });
  });

  // Test Treeview focusParentsNextChild.
  describe("focusParentsNextChild", () => {
    beforeEach(() => {
      document.body.innerHTML = threeLevel;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    // Test that focusParentsNextChild calls focusNextChild on the parent menu.
    it("should call focusNextChild on the parent menu", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set the currentChild to 1.
      menu.currentChild = 1;

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Set up to check for focus.
      const spy1 = vi.spyOn(menu, "focusNextChild");
      const spy2 = vi.spyOn(menu, "focusChild");

      menu.elements.submenuToggles[0].elements.controlledMenu.focusParentsNextChild();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith(2);
    });

    // Test that focusParentsNextChild calls focusParentsNextChild on the parent menu if the parent menu is already focusing the last child.
    it("should call focusParentsNextChild on the parent menu if the parent menu is already focusing the last child", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Set the currentChild to 1.
      menu.currentChild = 1;

      // Open the first submenu.
      menu.elements.submenuToggles[0].open();

      // Set the submenu's currentChild to 4.
      menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 4;

      // Open the third submenu in the first submenu.
      menu.elements.submenuToggles[0].elements.controlledMenu.elements.submenuToggles[2].open();

      // Set up to check for focus.
      const spy1 = vi.spyOn(
        menu.elements.submenuToggles[0].elements.controlledMenu,
        "focusNextChild"
      );
      const spy2 = vi.spyOn(
        menu.elements.submenuToggles[0].elements.controlledMenu,
        "focusParentsNextChild"
      );

      menu.elements.submenuToggles[0].elements.controlledMenu.elements.submenuToggles[2].elements.controlledMenu.focusParentsNextChild();

      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });

    // Test that focusParentsNextChild doesn't call anything if there is no parent menu.
    it("should not call anything if there is no parent menu", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      expect(() => {
        menu.focusParentsNextChild();
      }).not.toThrow();
    });
  });
});
