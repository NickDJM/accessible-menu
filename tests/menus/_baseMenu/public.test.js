/**
 * Tests for public methods of BaseMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test BaseMenu public methods.
describe("BaseMenu public methods", () => {
  // Test BaseMenu focus().
  describe("focus", () => {
    // Test that focus sets the focusState to self.
    it("should set the focusState to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.focus();

      expect(menu.focusState).toBe("self");
    });

    // Test that focus does not call focus() on the menu element if shouldFocus is false.
    it("should not call focus() on the menu element if shouldFocus is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.menu, "focus");

      menu.focus();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focus calls focus() on the menu element if shouldFocus is true.
    it("should call focus() on the menu element if shouldFocus is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.menu, "focus");

      menu.currentEvent = "keyboard";
      menu.focus();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test BaseMenu blur().
  describe("blur", () => {
    // Test that blur sets the focusState to none.
    it("should set the focusState to none", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.blur();

      expect(menu.focusState).toBe("none");
    });

    // Test that blur does not call blur() on the menu element if shouldFocus is false.
    it("should not call blur() on the menu element if shouldFocus is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for blur.
      const spy = vi.spyOn(menu.dom.menu, "blur");

      menu.blur();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that blur calls blur() on the menu element if shouldFocus is true.
    it("should call blur() on the menu element if shouldFocus is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for blur.
      const spy = vi.spyOn(menu.dom.menu, "blur");

      menu.currentEvent = "keyboard";
      menu.blur();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test BaseMenu focusCurrentChild().
  describe("focusCurrentChild", () => {
    // Test that focusCurrentChild sets the focusState to self.
    it("should set the focusState to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.focusCurrentChild();

      expect(menu.focusState).toBe("self");
    });

    // Test that focusCurrentChild calls focus() on the current child for all menu items in the menu.
    it.each([0, 1, 2, 3, 4, 5, 6])("should call focus() on child %s", (i) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child.
      menu.currentChild = i;

      // Set up to check for focus.
      const spy = vi.spyOn(menu.currentMenuItem, "focus");

      menu.focusCurrentChild();

      expect(spy).toHaveBeenCalled();
    });

    // Test that focusCurrentChild does not call focus() on the current child it the currentChild index is -1.
    it("should not call focus() on the current child it the currentChild index is -1", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child to -1.
      menu.currentChild = -1;

      // Set up to check for focus.
      const spy = vi.spyOn(menu.elements.menuItems[0], "focus");

      menu.focusCurrentChild();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  // Test BaseMenu blurCurrentChild().
  describe("blurCurrentChild", () => {
    // Test that blurCurrentChild sets the focusState to none.
    it("should set the focusState to none", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.blurCurrentChild();

      expect(menu.focusState).toBe("none");
    });

    // Test that blurCurrentChild calls blur() on the current child for all menu items in the menu.
    it.each([0, 1, 2, 3, 4, 5, 6])("should call blur() on child %s", (i) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child.
      menu.currentChild = i;

      // Set up to check for blur.
      const spy = vi.spyOn(menu.currentMenuItem, "blur");

      menu.blurCurrentChild();

      expect(spy).toHaveBeenCalled();
    });

    // Test that blurCurrentChild does not call blur() on the current child it the currentChild index is -1.
    it("should not call blur() on the current child it the currentChild index is -1", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child to -1.
      menu.currentChild = -1;

      // Set up to check for blur.
      const spy = vi.spyOn(menu.elements.menuItems[0], "blur");

      menu.blurCurrentChild();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  // Test BaseMenu focusChild().
  describe("focusChild", () => {
    // Test that focusChild calls blurCurrentChild().
    it("should call blurCurrentChild()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for blur.
      const spy = vi.spyOn(menu, "blurCurrentChild");

      menu.focusChild(1);

      expect(spy).toHaveBeenCalled();
    });

    // Test that focusChild sets the currentChild index to the passed index.
    it("should set the currentChild index to the passed index", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.focusChild(1);

      expect(menu.currentChild).toBe(1);
    });

    // Test that focusChild calls focusCurrentChild().
    it("should call focusCurrentChild()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusCurrentChild");

      menu.focusChild(1);

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test BaseMenu focusFirstChild().
  describe("focusFirstChild", () => {
    // Test that focusFirstChild calls focusChild() with the index of the first menu item.
    it("should call focusChild() with the index of the first menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusFirstChild();

      expect(spy).toHaveBeenCalledWith(0);
    });
  });

  // Test BaseMenu focusLastChild().
  describe("focusLastChild", () => {
    // Test that focusLastChild calls focusChild() with the index of the last menu item.
    it("should call focusChild() with the index of the last menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusLastChild();

      expect(spy).toHaveBeenCalledWith(6);
    });
  });

  // Test BaseMenu focusNextChild().
  describe("focusNextChild", () => {
    // Test that focusNextChild calls focusChild() with the index of the next menu item.
    it("should call focusChild() with the index of the next menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusNextChild();

      expect(spy).toHaveBeenCalledWith(1);
    });

    // Test that focusNextChild calls focusCurrentChild() if the currentChild index is the last menu item.
    it("should call focusCurrentChild() if the currentChild index is the last menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child to the last menu item.
      menu.currentChild = 6;

      // Set up to check for focus.
      const spy1 = vi.spyOn(menu, "focusCurrentChild");
      const spy2 = vi.spyOn(menu, "focusChild");

      menu.focusNextChild();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
    });
  });

  // Test BaseMenu focusPreviousChild().
  describe("focusPreviousChild", () => {
    // Test that focusPreviousChild calls focusChild() with the index of the previous menu item.
    it("should call focusChild() with the index of the previous menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set the current child to the last menu item.
      menu.currentChild = 6;

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusChild");

      menu.focusPreviousChild();

      expect(spy).toHaveBeenCalledWith(5);
    });

    // Test that focusPreviousChild calls focusCurrentChild() if the currentChild index is the first menu item.
    it("should call focusCurrentChild() if the currentChild index is the first menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu, "focusCurrentChild");
      const spy2 = vi.spyOn(menu, "focusChild");

      menu.focusPreviousChild();

      expect(spy).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
    });
  });

  // Test BaseMenu focusController().
  describe("focusController", () => {
    // Test that focusController sets the focusState to none.
    it("should set focusState to none", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.focusController();

      expect(menu.focusState).toBe("none");
    });

    // Test that focusController does not call focus() on the controller element if shouldFocus is false.
    it("should not call focus() on the controller element if shouldFocus is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.controller, "focus");

      menu.focusController();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focusController calls focus() on the controller element if shouldFocus is true.
    it("should call focus() on the controller element if shouldFocus is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.controller, "focus");

      menu.currentEvent = "keyboard";
      menu.focusController();

      expect(spy).toHaveBeenCalled();
    });

    // Test that focusController does nothing if the controller element is not defined.
    it("should do nothing if the controller element is not defined", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
      });
      initializeMenu(menu);

      expect(() => {
        menu.focusController();
      }).not.toThrow();
    });
  });

  // Test BaseMenu focusContainer().
  describe("focusContainer", () => {
    // Test that focusContainer sets the focusState to none.
    it("should set focusState to none", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      menu.focusContainer();

      expect(menu.focusState).toBe("none");
    });

    // Test that focusContainer does not call focus() on the container element if shouldFocus is false.
    it("should not call focus() on the container element if shouldFocus is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.container, "focus");

      menu.focusContainer();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focusContainer calls focus() on the container element if shouldFocus is true.
    it("should call focus() on the container element if shouldFocus is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for focus.
      const spy = vi.spyOn(menu.dom.container, "focus");

      menu.currentEvent = "keyboard";
      menu.focusContainer();

      expect(spy).toHaveBeenCalled();
    });

    // Test that focusContainer does nothing if the container element is not defined.
    it("should do nothing if the container element is not defined", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
      });
      initializeMenu(menu);

      expect(() => {
        menu.focusContainer();
      }).not.toThrow();
    });
  });

  // Test BaseMenu closeChildren().
  describe("closeChildren", () => {
    // Test that closeChildren calls close() and all submenuToggles.
    it("should call close() and all submenuToggles", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on all submenuToggles and close() methods.
      const spy1 = vi.spyOn(menu.elements.submenuToggles[0], "close");
      const spy2 = vi.spyOn(menu.elements.submenuToggles[1], "close");
      const spy3 = vi.spyOn(menu.elements.submenuToggles[2], "close");
      const spy4 = vi.spyOn(menu.elements.submenuToggles[3], "close");
      const spy5 = vi.spyOn(menu.elements.submenuToggles[4], "close");
      const spy6 = vi.spyOn(menu.elements.submenuToggles[5], "close");

      menu.closeChildren();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
      expect(spy4).toHaveBeenCalled();
      expect(spy5).toHaveBeenCalled();
      expect(spy6).toHaveBeenCalled();
    });
  });

  // Test BaseMenu BlurChildren().
  describe("blurChildren", () => {
    // Test that blurChildren calls blur() on all menu items.
    it("should call blur() on all menu items", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on all menu items.
      const spy1 = vi.spyOn(menu.elements.menuItems[0], "blur");
      const spy2 = vi.spyOn(menu.elements.menuItems[1], "blur");
      const spy3 = vi.spyOn(menu.elements.menuItems[2], "blur");
      const spy4 = vi.spyOn(menu.elements.menuItems[3], "blur");
      const spy5 = vi.spyOn(menu.elements.menuItems[4], "blur");
      const spy6 = vi.spyOn(menu.elements.menuItems[5], "blur");

      menu.blurChildren();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
      expect(spy4).toHaveBeenCalled();
      expect(spy5).toHaveBeenCalled();
      expect(spy6).toHaveBeenCalled();
    });

    // Test that blurChildren calls blur() on all submenu menu items.
    it.each([0, 1, 2, 3, 4])(
      "should call blur() on all menu items is submenu %s",
      (i) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        initializeMenu(menu);

        // Spy on all submenu menu items.
        const spy1 = vi.spyOn(
          menu.elements.submenuToggles[i].elements.controlledMenu.elements
            .menuItems[0],
          "blur"
        );
        const spy2 = vi.spyOn(
          menu.elements.submenuToggles[i].elements.controlledMenu.elements
            .menuItems[1],
          "blur"
        );
        const spy3 = vi.spyOn(
          menu.elements.submenuToggles[i].elements.controlledMenu.elements
            .menuItems[2],
          "blur"
        );
        const spy4 = vi.spyOn(
          menu.elements.submenuToggles[i].elements.controlledMenu.elements
            .menuItems[3],
          "blur"
        );
        const spy5 = vi.spyOn(
          menu.elements.submenuToggles[i].elements.controlledMenu.elements
            .menuItems[4],
          "blur"
        );

        menu.blurChildren();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).toHaveBeenCalled();
        expect(spy4).toHaveBeenCalled();
        expect(spy5).toHaveBeenCalled();
      }
    );
  });
});
