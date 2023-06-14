/**
 * Getter/Setter tests for the Menubar class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Menubar from "../../../src/menubar.js";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter methods in the Menubar class.
describe("Menubar getter/setters", () => {
  // Test Menubar dom.
  describe("dom", () => {
    // Test that Menubar implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom", () => {
      expect(Menubar.prototype.dom).toBe(BaseMenu.prototype.dom);
    });
  });

  // Test Menubar selectors.
  describe("selectors", () => {
    // Test that Menubar implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors", () => {
      expect(Menubar.prototype.selectors).toBe(BaseMenu.prototype.selectors);
    });
  });

  // Test Menubar elements.
  describe("elements", () => {
    // Test that Menubar implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements", () => {
      expect(Menubar.prototype.elements).toBe(BaseMenu.prototype.elements);
    });
  });

  // Test Menubar isTopLevel.
  describe("isTopLevel", () => {
    // Test that Menubar implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel", () => {
      expect(Menubar.prototype.isTopLevel).toBe(BaseMenu.prototype.isTopLevel);
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

  // Test Menubar closeClass.
  // todo: Test that the close class for submenus defaults to the root menu's close class.
  describe("closeClass", () => {
    // Test that closeClass gets the close class name.
    it("should get the close class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.closeClass).toBe(menu._closeClass);
    });

    // Test that closeClass sets the close class name.
    it("should set the close class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar transitionClass.
  // todo: Test that the transition class for submenus defaults to the root menu's transition class.
  describe("transitionClass", () => {
    // Test that transitionClass gets the transition class name.
    it("should get the transition class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.transitionClass).toBe(menu._transitionClass);
    });

    // Test that transitionClass sets the transition class name.
    it("should set the transition class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar currentChild.
  describe("currentChild", () => {
    // Test that Menubar implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild", () => {
      expect(Menubar.prototype.currentChild).toBe(
        BaseMenu.prototype.currentChild
      );
    });
  });

  // Test Menubar focusState.
  describe("focusState", () => {
    // Test that Menubar implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState", () => {
      expect(Menubar.prototype.focusState).toBe(BaseMenu.prototype.focusState);
    });
  });

  // Test Menubar currentEvent.
  describe("currentEvent", () => {
    // Test that Menubar implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent", () => {
      expect(Menubar.prototype.currentEvent).toBe(
        BaseMenu.prototype.currentEvent
      );
    });
  });

  // Test Menubar currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that currentMenuItem gets the current menu item.
    it("should get the current menu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.currentMenuItem).toBe(
        menu.elements.menuItems[menu.currentChild]
      );
    });
  });

  // Test Menubar hoverType.
  describe("hoverType", () => {
    // Test that hoverType gets the hover type.
    it("should get the hover type", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.hoverType).toBe(menu._hoverType);
    });

    // Test that hoverType sets the hover type.
    it("should set the hover type", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar hoverDelay.
  describe("hoverDelay", () => {
    // Test that hoverDelay gets the hover delay value.
    it("should get the hover delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.hoverDelay).toBe(menu._hoverDelay);
    });

    // Test that hoverDelay sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar enterDelay.
  describe("enterDelay", () => {
    // Test that enterDelay gets the enter delay value.
    it("should get the enter delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.enterDelay).toBe(menu._hoverDelay);
    });

    // Test that enterDelay sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar leaveDelay.
  describe("leaveDelay", () => {
    // Test that leaveDelay gets the leave delay value.
    it("should get the leave delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.leaveDelay).toBe(menu._hoverDelay);
    });

    // Test that leaveDelay sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

  // Test Menubar shouldFocus.
  describe("shouldFocus", () => {
    // Test that Menubar implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus", () => {
      expect(Menubar.prototype.shouldFocus).toBe(
        BaseMenu.prototype.shouldFocus
      );
    });
  });

  // Test Menubar errors.
  describe("errors", () => {
    // Test that Menubar implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors", () => {
      expect(Menubar.prototype.errors).toBe(BaseMenu.prototype.errors);
    });
  });
});
