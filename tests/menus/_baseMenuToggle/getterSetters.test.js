/**
 * Getter/Setter tests for the BaseMenuToggle class.
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

// Test all getter/setter methods in the BaseMenuToggle class.
describe("BaseMenuToggle getter/setters", () => {
  // Test BaseMenuToggle dom.
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

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.dom).toEqual(menuToggle._dom);
    });
  });

  // Test BaseMenuToggle elements.
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

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.elements).toEqual(menuToggle._elements);
    });
  });

  // Test BaseMenuToggle isOpen.
  describe("isOpen", () => {
    // Test that isOpen gets the open state.
    it("should get the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.isOpen).toBe(menuToggle._open);
    });

    // Test that isOpen sets the open state.
    it("should set the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.isOpen = true;

      expect(menuToggle._open).toBe(true);
    });
  });
});
