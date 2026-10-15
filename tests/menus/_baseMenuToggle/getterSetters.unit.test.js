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
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.dom).toEqual(menuToggle._dom);
    });

    // Test that dom cannot be set manually.
    it("should not set the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.dom = {};
      }).toThrow(TypeError);
    });
  });

  // Test BaseMenuToggle elements.
  describe("elements", () => {
    // Test that elements gets the elements.
    it("should get the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.elements).toEqual(menuToggle._elements);
    });

    // Test that elements cannot be set manually.
    it("should not set the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.elements = {};
      }).toThrow(TypeError);
    });
  });

  // Test BaseMenuToggle isExpanded.
  describe("isExpanded", () => {
    // Test that isExpanded gets the expanded state.
    it("should get the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.isExpanded).toBe(menuToggle._expanded.value);
    });

    // Test that isExpanded cannot be set manually.
    it("should not be able to set the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.isExpanded = true;
      }).toThrow();
    });
  });

  // Test BaseMenuToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that shouldBeExpanded gets the committed expanded state.
    it("should get the committed open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.shouldBeExpanded).toBe(menuToggle._expanded.committed);
    });

    // Test that shouldBeExpanded cannot be set manually.
    it("should not be able to set shouldBeExpanded", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.shouldBeExpanded = true;
      }).toThrow();
    });
  });
});
