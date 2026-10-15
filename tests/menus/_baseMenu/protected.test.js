/**
 * Tests for protected methods of BaseMenu class.
 *
 * todo: Add tests for: _validate(), _setDOMElements(), _findRootMenu(),
 * _createChildElements(), _handleFocus(), _handleClick(), _handelHover(),
 * _handleKeydown(), and _handleKeyup().
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

let originalMatchMedia;

beforeEach(() => {
  document.body.innerHTML = twoLevel;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test BaseMenu protected methods.
describe("BaseMenu protected methods", () => {
  // Test BaseMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    const allowedTypes = [
      "menuItems",
      "menuLinks",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedTypes = ["menu", "container", "controller"];

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

        menu._selectors["menu"] = "ul";
        menu._selectors["container"] = "nav";
        menu._selectors["controller"] = "button";

        expect(() => {
          menu._setDOMElementType(elementType);
        }).toThrow(
          `AccessibleMenu Menu: "${elementType}" element cannot be set through _setDOMElementType because it is a protected element.`
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
      }).toThrow('AccessibleMenu Menu: "menu" is not a valid element type.');
    });
  });

  // Test BaseMenu _resetDOMElementType().

  // Test BaseMenu _handleMediaMatch().

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
