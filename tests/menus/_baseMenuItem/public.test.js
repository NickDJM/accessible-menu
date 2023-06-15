/**
 * Tests for public methods of the BaseMenuItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
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

// Test BaseMenuItem public methods.
describe("BaseMenuItem public methods", () => {
  // Test BaseMenuItem focus().
  describe("focus", () => {
    // Test that focus does not call focus() on the link if the parent menu's shouldFoucs is false.
    it("should not call focus() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      // Set up to check for focus.
      const spy = vi.spyOn(menuItem.dom.link, "focus");

      menuItem.focus();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that focus calls focus() on the link if the parent menu's shouldFoucs is true.
    it("should call focus() on the link if the parent menu's shouldFoucs is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      // Set up to check for focus.
      const spy = vi.spyOn(menuItem.dom.link, "focus");

      menu.currentEvent = "keyboard";
      menuItem.focus();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test BaseMenuItem blur().
  describe("blur", () => {
    // Test that blur does not call blur() on the link if the parent menu's shouldFoucs is false.
    it("should not call blur() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      // Set up to check for blur.
      const spy = vi.spyOn(menuItem.dom.link, "blur");

      menuItem.blur();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that blur calls blur() on the link if the parent menu's shouldFoucs is true.
    it("should call blur() on the link if the parent menu's shouldFoucs is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      // Set up to check for blur.
      const spy = vi.spyOn(menuItem.dom.link, "blur");

      menu.currentEvent = "keyboard";
      menuItem.blur();

      expect(spy).toHaveBeenCalled();
    });
  });
});
