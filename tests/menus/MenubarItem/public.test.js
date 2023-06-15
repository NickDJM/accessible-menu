/**
 * Tests for public methods of the MenubarItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test MenubarItem public methods.
describe("MenubarItem public methods", () => {
  // Test MenubarItem focus().
  describe("focus", () => {
    // Test that focus does not call focus() on the link if the parent menu's shouldFoucs is false.
    it("should not call focus() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

    // Test that focus sets the link's tabindex to 0 if the parent menu is also the root menu.
    it("should set the link's tabindex to 0 if the parent menu is also the root menu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      menuItem.focus();

      expect(menuItem.dom.link.getAttribute("tabindex")).toBe("0");
    });

    // Test that focus does not set the link's tabindex to 0 if the parent menu is not the root menu.
    it("should not set the link's tabindex to 0 if the parent menu is not the root menu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const submenuItem =
        menu.elements.submenuToggles[0].elements.controlledMenu.elements
          .menuItems[0];

      submenuItem.focus();

      expect(submenuItem.dom.link.getAttribute("tabindex")).toBe("-1");
    });
  });

  // Test MenubarItem blur().
  describe("blur", () => {
    // Test that blur does not call blur() on the link if the parent menu's shouldFoucs is false.
    it("should not call blur() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

    // Test that blur sets the link's tabindex to -1 if the parent menu is also the root menu.
    it("should set the link's tabindex to -1 if the parent menu is also the root menu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      // Set the link's tabindex to 0.
      menuItem.dom.link.setAttribute("tabindex", "0");

      menuItem.blur();

      expect(menuItem.dom.link.getAttribute("tabindex")).toBe("-1");
    });
  });
});
