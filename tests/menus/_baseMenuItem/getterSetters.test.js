/**
 * Getter/Setter tests for the BaseMenuItem class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the BaseMenuItem class.
describe("BaseMenuItem getter/setters", () => {
  // Test BaseMenuItem dom.
  describe("dom", () => {
    // Test that dom gets the DOM elements.
    it("should get the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.dom).toEqual(menuItem._dom);
    });
  });

  // Test BaseMenuItem elements.
  describe("elements", () => {
    // Test that elements gets the elements.
    it("should get the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.elements).toEqual(menuItem._elements);
    });
  });

  // Test BaseMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that isSubmenuItem gets the submenu flag.
    it("should get the submenu flag", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.isSubmenuItem).toEqual(menuItem._submenu);
    });
  });
});
