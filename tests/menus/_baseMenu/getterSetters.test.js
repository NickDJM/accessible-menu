/**
 * Getter/Setter tests for the BaseMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test all getter methods in the BaseMenu class.
describe("BaseMenu getter/setters", () => {
  // Test BaseMenu dom.
  describe("dom", () => {
    // Test that dom gets the DOM elements.
    it("should get the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.dom).toEqual(menu._dom);
    });
  });

  // Test BaseMenu selectors.
  describe("selectors", () => {
    // Test that selectors gets the selectors.
    it("should get the selectors", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.selectors).toEqual(menu._selectors);
    });
  });

  // Test BaseMenu elements.
  describe("elements", () => {
    // Test that elements gets the elements.
    it("should get the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.elements).toEqual(menu._elements);
    });
  });

  // Test BaseMenu isTopLevel.
  describe("isTopLevel", () => {
    // Test that isTopLevel gets the top-level status.
    it("should get the top-level status", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.isTopLevel).toBe(menu._root);
    });
  });

  // Test BaseMenu openClass.
  // todo: Test that the open class for submenus defaults to the root menu's open class.
  describe("openClass", () => {
    // Test that openClass gets the open class name.
    it("should get the open class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.openClass).toBe(menu._openClass);
    });

    // Test that openClass sets the open class name.
    it("should set the open class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's open class name.
      menu.openClass = "test-open";

      expect(spy).toHaveBeenCalledWith({ openClass: "test-open" });
      expect(menu._openClass).toBe("test-open");
    });
  });

  // Test BaseMenu closeClass.
  // todo: Test that the close class for submenus defaults to the root menu's close class.
  describe("closeClass", () => {
    // Test that closeClass gets the close class name.
    it("should get the close class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.closeClass).toBe(menu._closeClass);
    });

    // Test that closeClass sets the close class name.
    it("should set the close class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's close class name.
      menu.closeClass = "test-close";

      expect(spy).toHaveBeenCalledWith({ closeClass: "test-close" });
      expect(menu._closeClass).toBe("test-close");
    });
  });

  // Test BaseMenu transitionClass.
  // todo: Test that the transition class for submenus defaults to the root menu's transition class.
  describe("transitionClass", () => {
    // Test that transitionClass gets the transition class name.
    it("should get the transition class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.transitionClass).toBe(menu._transitionClass);
    });

    // Test that transitionClass sets the transition class name.
    it("should set the transition class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's transition class name.
      menu.transitionClass = "test-transition";

      expect(spy).toHaveBeenCalledWith({ transitionClass: "test-transition" });
      expect(menu._transitionClass).toBe("test-transition");
    });
  });

  // Test BaseMenu currentChild.
  // todo: Test this for scenarios that would envoke setParentChild().
  describe("currentChild", () => {
    // Test that currentChild gets the current child index.
    it("should get the current child index", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.currentChild).toBe(menu._currentChild);
    });

    // Test that currentChild sets the current child index.
    it("should set the current child index", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's current child index.
      menu.currentChild = 2;

      expect(spy).toHaveBeenCalledWith("number", { value: 2 });
      expect(menu._currentChild).toBe(2);
    });
  });

  // Test BaseMenu focusState.
  describe("focusState", () => {
    // Test that focusState gets the focus state.
    it("should get the focus state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.focusState).toBe(menu._focusState);
    });

    // Test that focusState sets the focus state.
    it("should set the focus state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidState");

      // Set the menu's focus state.
      menu.focusState = "child";

      expect(spy).toHaveBeenCalledWith({ value: "child" });
      expect(menu._focusState).toBe("child");
    });
  });

  // Test BaseMenu currentEvent.
  describe("currentEvent", () => {
    // Test that currentEvent gets the current event type.
    it("should get the current event type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.currentEvent).toBe(menu._currentEvent);
    });

    // Test that currentEvent sets the current event type.
    it("should set the current event type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidEvent");

      // Set the menu's current event type.
      menu.currentEvent = "mouse";

      expect(spy).toHaveBeenCalledWith({ value: "mouse" });
      expect(menu._currentEvent).toBe("mouse");
    });
  });

  // Test BaseMenu currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that currentMenuItem gets the current menu item.
    it("should get the current menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.currentMenuItem).toBe(
        menu.elements.menuItems[menu.currentChild]
      );
    });
  });

  // Test BaseMenu hoverType.
  describe("hoverType", () => {
    // Test that hoverType gets the hover type.
    it("should get the hover type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.hoverType).toBe(menu._hoverType);
    });

    // Test that hoverType sets the hover type.
    it("should set the hover type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidHoverType");

      // Set the menu's hover type.
      menu.hoverType = "on";

      expect(spy).toHaveBeenCalledWith({ value: "on" });
      expect(menu._hoverType).toBe("on");
    });
  });

  // Test BaseMenu hoverDelay.
  describe("hoverDelay", () => {
    // Test that hoverDelay gets the hover delay value.
    it("should get the hover delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.hoverDelay).toBe(menu._hoverDelay);
    });

    // Test that hoverDelay sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's hover delay value.
      menu.hoverDelay = 200;

      expect(spy).toHaveBeenCalledWith("number", { value: 200 });
      expect(menu._hoverDelay).toBe(200);
    });
  });

  // Test BaseMenu enterDelay.
  describe("enterDelay", () => {
    // Test that enterDelay gets the enter delay value.
    it("should get the enter delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.enterDelay).toBe(menu._hoverDelay);
    });

    // Test that enterDelay sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's enter delay value.
      menu.enterDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._enterDelay).toBe(100);
    });
  });

  // Test BaseMenu leaveDelay.
  describe("leaveDelay", () => {
    // Test that leaveDelay gets the leave delay value.
    it("should get the leave delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.leaveDelay).toBe(menu._hoverDelay);
    });

    // Test that leaveDelay sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's leave delay value.
      menu.leaveDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._leaveDelay).toBe(100);
    });
  });

  // Test BaseMenu shouldFocus.
  describe("shouldFocus", () => {
    // Test that shouldFocus gets the shouldFocus value.
    it("should get the shouldFocus value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.shouldFocus).toBeFalsy();
    });
  });

  // Test BaseMenu errors.
  describe("errors", () => {
    // Test that errors gets the errors array.
    it("should get the errors array", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.errors).toEqual(menu._errors);
    });
  });
});
