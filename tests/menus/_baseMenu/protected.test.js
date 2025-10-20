/**
 * Tests for protected methods of BaseMenu class.
 *
 * todo: Add tests for: _validate(), _setDOMElements(), _findRootMenu(),
 * _createChildElements(), _handleFocus(), _handleClick(), _handelHover(),
 * _handleKeydown(), and _handleKeyup().
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

// Test BaseMenu protected methods.
describe("BaseMenu protected methods", () => {
  // Test BaseMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    const allowedTypes = [
      "menuItems",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedTypes = ["menuLinks"];

    // Test that all allowed types can be set.
    it.each(allowedTypes)("should set the %s element type", (elementType) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      expect(() => {
        menu._setDOMElementType(elementType);
      }).not.toThrow();
    });

    // Test that all disallowed types throw an error.
    it.each(disallowedTypes)(
      "should throw an error when setting the %s element type",
      (elementType) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        initializeMenu(menu);

        expect(() => {
          menu._setDOMElementType(elementType);
        }).toThrow(
          `The "${elementType}" element cannot be set through _setDOMElementType`
        );
      }
    );

    // Test that an invalid type throws an error.
    it("should throw an error when setting an invalid element type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      expect(() => {
        menu._setDOMElementType("menu");
      }).toThrow('"menu" is not a valid element type within the menu.');
    });
  });

  // Test BaseMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    const allowedTypes = [
      "menuItems",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedTypes = ["menu", "container", "controller"];

    // Test that all allowed types can be reset.
    it.each(allowedTypes)("should reset the %s element type", (elementType) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      expect(() => {
        menu._resetDOMElementType(elementType);
      }).not.toThrow();
    });

    // Test that all disallowed types throw an error.
    it.each(disallowedTypes)(
      "should throw an error when resetting the %s element type",
      (elementType) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        initializeMenu(menu);

        expect(() => {
          menu._resetDOMElementType(elementType);
        }).toThrow(
          `The "${elementType}" element cannot be reset through _resetDOMElementType`
        );
      }
    );

    // Test that an invalid type throws an error.
    it("should throw an error when resetting an invalid element type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      expect(() => {
        menu._resetDOMElementType("menuLinks");
      }).toThrow('"menuLinks" is not a valid element type within the menu.');
    });
  });

  // Test BaseMenu _clearTimeout().
  describe("_clearTimeout", () => {
    // Test that _clearTimeout clears the timeout.
    it("should clear the timeout", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Set up to check for _clearTimeout.
      const spy = vi.spyOn(window, "clearTimeout");

      menu._clearTimeout();

      expect(spy).toHaveBeenCalledWith(menu._hoverTimeout);
    });
  });

  // Test BaseMenu _setTimeout().
  describe("_setTimeout", () => {
    // Test that _setTimeout sets a timeout.
    it("should set a timeout", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const callback = () => {};
      const delay = 250;

      // Set up to check for _setTimeout.
      const spy = vi.spyOn(window, "setTimeout");

      menu._setTimeout(callback, delay);

      expect(spy).toHaveBeenCalledWith(callback, delay);
    });
  });

  describe("_setIds", () => {
    // Test that _setIds sets the menu's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Get the generated id.
      const generatedId = menu.dom.menu.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-[a-z]{1,10}$/);
    });

    // Test that _setIds does not change the menu's id attribute when it already has an id.
    it("should not change the toggle's id attribute when it already has an id", () => {
      document.querySelector("ul").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Test the menu's id.
      expect(menu.dom.menu.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the menu controller's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu controller's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Get the generated id.
      const generatedId = menu.dom.controller.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-controller-[a-z]{1,10}$/);
    });

    // Test that _setIds does not set the menu controller's id attribute to a generated value when it has an existing id.
    it("should not set the menu controller's id attribute to a generated value when it has an existing id", () => {
      document.querySelector("button").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Test the menu controller's id.
      expect(menu.dom.controller.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the menu container's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu container's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Get the generated id.
      const generatedId = menu.dom.container.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-container-[a-z]{1,10}$/);
    });

    // Test that _setIds does not set the menu container's id attribute to a generated value when it has an existing id.
    it("should not set the menu container's id attribute to a generated value when it has an existing id", () => {
      document.querySelector("nav").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Test the menu container's id.
      expect(menu.dom.container.getAttribute("id")).toBe("test-id");
    });
  });
});
