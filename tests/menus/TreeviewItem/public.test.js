/**
 * Tests for public methods of the TreeviewItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test TreeviewItem public methods.
describe("TreeviewItem public methods", () => {
  // Test TreeviewItem focus().
  describe("focus", () => {
    // Test that focus does not call focus() on the link if the parent menu's shouldFoucs is false.
    it("should not call focus() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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

    // Test that focus sets the link's tabindex to 0.
    it("should set the link's tabindex to 0", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
  });

  // Test TreeviewItem blur().
  describe("blur", () => {
    // Test that blur does not call blur() on the link if the parent menu's shouldFoucs is false.
    it("should not call blur() on the link if the parent menu's shouldFoucs is false", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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

    // Test that blur sets the link's tabindex to -1.
    it("should set the link's tabindex to -1", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
