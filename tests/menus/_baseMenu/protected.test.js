/**
 * Tests for protected methods of BaseMenu class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test BaseMenu _setDOMElementType.
describe("BaseMenu._setDOMElementType", () => {
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
      submenuItemSelector: "li.dropdown",
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
        submenuItemSelector: "li.dropdown",
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
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });
    initializeMenu(menu);

    expect(() => {
      menu._setDOMElementType("menu");
    }).toThrow('"menu" is not a valid element type within the menu.');
  });
});

// Test BaseMenu _resetDOMElementType.
describe("BaseMenu._resetDOMElementType", () => {
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
      submenuItemSelector: "li.dropdown",
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
        submenuItemSelector: "li.dropdown",
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
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });
    initializeMenu(menu);

    expect(() => {
      menu._resetDOMElementType("menuLinks");
    }).toThrow('"menuLinks" is not a valid element type within the menu.');
  });
});
