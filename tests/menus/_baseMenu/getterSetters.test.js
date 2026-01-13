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

    // Test that dom cannot set the DOM elements.
    it("should not set the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.dom = {};
      }).toThrowError(
        "Cannot set property dom of #<BaseMenu> which has only a getter"
      );
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

    // Test that selectors cannot set the selectors.
    it("should not set the selectors", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.selectors = {};
      }).toThrowError(
        "Cannot set property selectors of #<BaseMenu> which has only a getter"
      );
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

    // Test that elements cannot set the elements.
    it("should not set the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.elements = {};
      }).toThrowError(
        "Cannot set property elements of #<BaseMenu> which has only a getter"
      );
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

    // Test that isTopLevel cannot be set manually.
    it("should not set the top-level status", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.isTopLevel = false;
      }).toThrowError(
        "Cannot set property isTopLevel of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test BaseMenu openClass.
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

    // Test that openClass defaults to the root menu's openClass for submenus.
    it("should default to the root menu's open class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.openClass = "custom-open";

      expect(submenu.openClass).toBe(menu.openClass);
    });
  });

  // Test BaseMenu closeClass.
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

    // Test that closeClass defaults to the root menu's closeClass for submenus.
    it("should default to the root menu's close class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.closeClass = "custom-close";

      expect(submenu.closeClass).toBe(menu.closeClass);
    });
  });

  // Test BaseMenu transitionClass.
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

    // Test that transitionClass defaults to the root menu's transitionClass for submenus.
    it("should default to the root menu's transition class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.transitionClass = "custom-transition";

      expect(submenu.transitionClass).toBe(menu.transitionClass);
    });
  });

  // Test BaseMenu transitionDuration.
  describe("transitionDuration", () => {
    // Test that transitionDuration gets the transition duration value.
    it("should get the transition duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.transitionDuration).toBe(menu._transitionDuration);
    });

    // Test that transitionDuration sets the transition duration value.
    it("should set the transition duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's transition duration value.
      menu.transitionDuration = 200;

      expect(spy).toHaveBeenCalledWith("number", { transitionDuration: 200 });
      expect(menu._transitionDuration).toBe(200);
    });

    // Test that transitionDuration defaults to the root menu's transitionDuration for submenus.
    it("should default to the root menu's transition duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.transitionDuration = 200;

      expect(submenu.transitionDuration).toBe(menu.transitionDuration);
    });
  });

  // Test BaseMenu openDuration.
  describe("openDuration", () => {
    // Test that openDuration gets the open duration value.
    it("should get the open duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the open duration,
      // it should be the same as the transition duration.
      expect(menu.openDuration).toBe(menu._transitionDuration);
    });

    // Test that openDuration sets the open duration value.
    it("should set the open duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's open duration value.
      menu.openDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { openDuration: 100 });
      expect(menu._openDuration).toBe(100);
    });

    // Test that openDuration defaults to the root menu's openDuration for submenus.
    it("should default to the root menu's open duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.openDuration = 100;

      expect(submenu.openDuration).toBe(menu.openDuration);
    });
  });

  // Test BaseMenu closeDuration.
  describe("closeDuration", () => {
    // Test that closeDuration gets the close duration value.
    it("should get the close duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // In this case, because we have not set the close duration,
      // it should be the same as the transition duration.
      expect(menu.closeDuration).toBe(menu._transitionDuration);
    });

    // Test that closeDuration sets the close duration value.
    it("should set the close duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's close duration value.
      menu.closeDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { closeDuration: 100 });
      expect(menu._closeDuration).toBe(100);
    });

    // Test that closeDuration defaults to the root menu's closeDuration for submenus.
    it("should default to the root menu's close duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.closeDuration = 100;

      expect(submenu.closeDuration).toBe(menu.closeDuration);
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

      expect(spy).toHaveBeenCalledWith("number", { currentChild: 2 });
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

      expect(spy).toHaveBeenCalledWith({ focusState: "child" });
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

      expect(spy).toHaveBeenCalledWith({ currentEvent: "mouse" });
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

    // Test that currentMenuItem cannot be set manually.
    it("should not set the current menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.currentMenuItem = menu.elements.menuItems[0];
      }).toThrowError(
        "Cannot set property currentMenuItem of #<BaseMenu> which has only a getter"
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

      expect(spy).toHaveBeenCalledWith({ hoverType: "on" });
      expect(menu._hoverType).toBe("on");
    });

    // Test that hoverType defaults to the root menu's hoverType for submenus.
    it("should default to the root menu's hover type for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hoverType = "on";

      expect(submenu.hoverType).toBe(menu.hoverType);
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

      expect(spy).toHaveBeenCalledWith("number", { hoverDelay: 200 });
      expect(menu._hoverDelay).toBe(200);
    });

    // Test that hoverDelay defaults to the root menu's hoverDelay for submenus.
    it("should default to the root menu's hover delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hoverDelay = 200;

      expect(submenu.hoverDelay).toBe(menu.hoverDelay);
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

      expect(spy).toHaveBeenCalledWith("number", { enterDelay: 100 });
      expect(menu._enterDelay).toBe(100);
    });

    // Test that enterDelay defaults to the root menu's enterDelay for submenus.
    it("should default to the root menu's enter delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.enterDelay = 100;

      expect(submenu.enterDelay).toBe(menu.enterDelay);
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

      expect(spy).toHaveBeenCalledWith("number", { leaveDelay: 100 });
      expect(menu._leaveDelay).toBe(100);
    });

    // Test that leaveDelay defaults to the root menu's leaveDelay for submenus.
    it("should default to the root menu's leave delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.leaveDelay = 100;

      expect(submenu.leaveDelay).toBe(menu.leaveDelay);
    });
  });

  // Test BaseMenu prefix.
  describe("prefix", () => {
    // Test that prefix gets the prefix value.
    it("should get the prefix value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.prefix).toBe(menu._prefix);
    });

    // Test that prefix sets the prefix value.
    it("should set the prefix value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      menu.prefix = "test-";

      expect(menu.prefix).toBe("test-");
    });

    // Test that prefix defaults to the root menu's prefix for submenus.
    it("should default to the root menu's prefix for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.prefix = "test-";

      expect(submenu.prefix).toBe(menu.prefix);
    });
  });

  // Test BaseMenu key.
  describe("key", () => {
    // Test that key gets the key value.
    it("should get the key value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.key).toBe(menu._key);
    });

    // Test that key cannot set the key value.
    it("should not set the key value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.key = "test";
      }).toThrowError(
        "Cannot set property key of #<BaseMenu> which has only a getter"
      );
    });

    // Test that key defaults to the root menu's key suffixed by the submenu's index for submenus.
    it("should default to the root menu's key with submenu's index for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu._key = "test";

      expect(submenu.key).toBe(`${menu.key}-0`);
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

    // Test that shouldFocus cannot be set manually.
    it("should not set the shouldFocus value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.shouldFocus = true;
      }).toThrowError(
        "Cannot set property shouldFocus of #<BaseMenu> which has only a getter"
      );
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

    // Test that errors cannot be set manually.
    it("should not set the errors array", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(() => {
        menu.errors = [];
      }).toThrowError(
        "Cannot set property errors of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test BaseMenu hasOpened.
  describe("hasOpened", () => {
    // Test that hasOpened gets the hasOpened value.
    it("should get the hasOpened value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      expect(menu.hasOpened).toEqual(menu._hasOpened);
    });

    // Test that hasOpened sets the hasOpened value.
    it("should set the hasOpened value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      menu.hasOpened = true;

      expect(menu.hasOpened).toBe(true);
    });

    // Test that hasOpened defaults to the root menu's hasOpened for submenus.
    it("should default to the root menu's hasOpened for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      initializeMenu(menu);

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hasOpened = true;

      expect(submenu.hasOpened).toBe(menu.hasOpened);
    });
  });
});
