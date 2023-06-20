/**
 * Tests for public methods of the BaseMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test BaseMenuToggle public methods.
describe("BaseMenuToggle public methods", () => {
  // Test BaseMenuItem open().
  describe("open", () => {
    // Test that open sets the controlled menu's focus state to self.
    it("should set the controlled menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.open();

      expect(menuToggle.elements.controlledMenu.focusState).toEqual("self");
    });

    // Test that open calls _expand().
    it("should call _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.open();

      expect(spy).toHaveBeenCalled();
    });

    // Test that open sets the open flag to true.
    it("should set the open flag to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.open();

      expect(menuToggle.isOpen).toBe(true);
    });
  });

  // Test BaseMenuToggle preview().
  describe("preview", () => {
    // Test that preview sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menu.focusState).toEqual("self");
    });

    // Test that preview calls _expand().
    it("should call _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });

    // Test that preview sets the open flag to true.
    it("should set the open flag to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menuToggle.isOpen).toBe(true);
    });
  });

  // Test BaseMenuToggle close().
  describe("close", () => {
    // Test that close sets the controlled menu's current child to 0.
    it("should set the controlled menu's current child to 0", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.isOpen = true;
      menuToggle.elements.controlledMenu.currentChild = 1;

      // Close the menu.
      menuToggle.close();

      expect(menuToggle.elements.controlledMenu.currentChild).toEqual(0);
    });

    // Test that close calls blur() on the controlled menu.
    it("should call blur() on the controlled menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);
      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for blur() call.
      const spy = vi.spyOn(menuToggle.elements.controlledMenu, "blur");

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(spy).toHaveBeenCalled();
    });

    // Test that close sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menu.focusState = "child";
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(menu.focusState).toEqual("self");
    });

    // Test that close calls _collapse().
    it("should call _collapse()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _collapse() call.
      const spy = vi.spyOn(menuToggle, "_collapse");

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(spy).toHaveBeenCalled();
    });

    // Test that close sets the open flag to false.
    it("should set the open flag to false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(menuToggle.isOpen).toBe(false);
    });
  });

  // Test BaseMenuToggle toggle().
  describe("toggle", () => {
    // Test that toggle calls open() when the menu is closed.
    it("should call open() when the menu is closed", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for open() call.
      const spy = vi.spyOn(menuToggle, "open");

      menuToggle.toggle();

      expect(spy).toHaveBeenCalled();
    });

    // Test that toggle calls close() when the menu is open.
    it("should call close() when the menu is open", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for close() call.
      const spy = vi.spyOn(menuToggle, "close");

      // Set up the menu.
      menuToggle.isOpen = true;

      menuToggle.toggle();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test BaseMenuToggle closeSiblins().
  describe("closeSiblings", () => {
    // Test that closeSiblings calls close() on each sibling toggle.
    it("should call close() on each sibling toggle", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for close() call.
      const spy1 = vi.spyOn(menu.elements.submenuToggles[1], "close");
      const spy2 = vi.spyOn(menu.elements.submenuToggles[2], "close");
      const spy3 = vi.spyOn(menu.elements.submenuToggles[3], "close");
      const spy4 = vi.spyOn(menu.elements.submenuToggles[4], "close");

      menuToggle.closeSiblings();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
      expect(spy4).toHaveBeenCalled();
    });

    // Test that closeSiblings does not call close() on itself.
    it("should not call close() on itself", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for close() call.
      const spy = vi.spyOn(menuToggle, "close");

      menuToggle.closeSiblings();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  // Test BaseMenuToggle closeChildren().
  describe("closeChildren", () => {
    // Test that closeChildren calls close on all toggles inside of the controlled menu.
    it("should call close() on all toggles inside of the controlled menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for close() call.
      const spy1 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[0],
        "close"
      );
      const spy2 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[1],
        "close"
      );
      const spy3 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[2],
        "close"
      );

      menuToggle.closeChildren();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
    });
  });
});
