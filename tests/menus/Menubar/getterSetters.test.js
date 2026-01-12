/**
 * Getter/Setter tests for the Menubar class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Menubar from "../../../src/menubar.js";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the Menubar class.
describe("Menubar getter/setters", () => {
  // Test Menubar dom.
  describe("dom", () => {
    // Test that Menubar implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom", () => {
      expect(Menubar.prototype.dom).toBe(BaseMenu.prototype.dom);
    });

    // Test that dom cannot set the DOM elements.
    it("should not set the DOM elements", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.dom = {};
      }).toThrowError(
        "Cannot set property dom of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar selectors.
  describe("selectors", () => {
    // Test that Menubar implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors", () => {
      expect(Menubar.prototype.selectors).toBe(BaseMenu.prototype.selectors);
    });

    // Test that selectors cannot set the selectors.
    it("should not set the selectors", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.selectors = {};
      }).toThrowError(
        "Cannot set property selectors of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar elements.
  describe("elements", () => {
    // Test that Menubar implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements", () => {
      expect(Menubar.prototype.elements).toBe(BaseMenu.prototype.elements);
    });

    // Test that elements cannot set the elements.
    it("should not set the elements", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.elements = {};
      }).toThrowError(
        "Cannot set property elements of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar classes.
  describe("classes", () => {
    // Test that Menubar implements the BaseMenu classes getter.
    it("should implement the BaseMenu classes", () => {
      expect(Menubar.prototype.classes).toBe(BaseMenu.prototype.classes);
    });

    // Test that classes cannot set the classes.
    it("should not set the classes", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.classes = {};
      }).toThrowError(
        "Cannot set property classes of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar durations.
  describe("durations", () => {
    // Test that Menubar implements the BaseMenu durations getter.
    it("should implement the BaseMenu durations", () => {
      expect(Menubar.prototype.durations).toBe(BaseMenu.prototype.durations);
    });

    // Test that durations cannot set the durations.
    it("should not set the durations", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.durations = {};
      }).toThrowError(
        "Cannot set property durations of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar listeners.
  describe("listeners", () => {
    // Test that Menubar implements the BaseMenu listeners getter.
    it("should implement the BaseMenu listeners", () => {
      expect(Menubar.prototype.listeners).toBe(BaseMenu.prototype.listeners);
    });

    // Test that listeners cannot set the listeners.
    it("should not set the listeners", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.listeners = {};
      }).toThrowError(
        "Cannot set property listeners of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar isTopLevel.
  describe("isTopLevel", () => {
    // Test that Menubar implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel", () => {
      expect(Menubar.prototype.isTopLevel).toBe(BaseMenu.prototype.isTopLevel);
    });
  });

  // Test Menubar shouldOpen.
  describe("shouldOpen", () => {
    // Test that Menubar implements the BaseMenu shouldOpen getter.
    it("should implement the BaseMenu shouldOpen", () => {
      expect(Menubar.prototype.shouldOpen).toBe(BaseMenu.prototype.shouldOpen);
    });
  });

  // Test Menubar breakpoint.
  describe("breakpoint", () => {
    // Test that Menubar implements the BaseMenu breakpoint getter.
    it("should implement the BaseMenu breakpoint", () => {
      expect(Menubar.prototype.breakpoint).toBe(BaseMenu.prototype.breakpoint);
    });
  });

  // Test Menubar mediaQuery.
  describe("mediaQuery", () => {
    // Test that Menubar implements the BaseMenu mediaQuery getter.
    it("should implement the BaseMenu mediaQuery", () => {
      expect(Menubar.prototype.mediaQuery).toBe(BaseMenu.prototype.mediaQuery);
    });
  });

  // Test BaseMenu openClass.
  // todo: Test that the open class for submenus defaults to the root menu's open class.
  describe("openClass", () => {
    // Test that openClass gets the open class name.
    it("should get the open class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.openClass).toBe(menu._classes.open);
    });

    // Test that openClass sets the open class name.
    it("should set the open class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's open class name.
      menu.openClass = "test-open";

      expect(spy).toHaveBeenCalledWith({ openClass: "test-open" });
      expect(menu._classes.open).toBe("test-open");
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

      expect(menu.closeClass).toBe(menu._classes.close);
    });

    // Test that closeClass sets the close class name.
    it("should set the close class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's close class name.
      menu.closeClass = "test-close";

      expect(spy).toHaveBeenCalledWith({ closeClass: "test-close" });
      expect(menu._classes.close).toBe("test-close");
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

      expect(menu.transitionClass).toBe(menu._classes.transition);
    });

    // Test that transitionClass sets the transition class name.
    it("should set the transition class name", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's transition class name.
      menu.transitionClass = "test-transition";

      expect(spy).toHaveBeenCalledWith({ transitionClass: "test-transition" });
      expect(menu._classes.transition).toBe("test-transition");
    });
  });

  // Test Menubar transitionDuration.
  describe("transitionDuration", () => {
    // Test that transitionDuration gets the transition duration value.
    it("should get the transition duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.transitionDuration).toBe(menu._durations.transition);
    });

    // Test that transitionDuration sets the transition duration value.
    it("should set the transition duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's transition duration value.
      menu.transitionDuration = 200;

      expect(spy).toHaveBeenCalledWith("number", { transitionDuration: 200 });
      expect(menu._durations.transition).toBe(200);
    });
  });

  // Test Menubar openDuration.
  describe("openDuration", () => {
    // Test that openDuration gets the open duration value.
    it("should get the open duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the open duration,
      // it should be the same as the transition duration.
      expect(menu.openDuration).toBe(menu._durations.transition);
    });

    // Test that openDuration sets the open duration value.
    it("should set the open duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's open duration value.
      menu.openDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { openDuration: 100 });
      expect(menu._durations.open).toBe(100);
    });
  });

  // Test Menubar closeDuration.
  describe("closeDuration", () => {
    // Test that closeDuration gets the close duration value.
    it("should get the close duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the close duration,
      // it should be the same as the transition duration.
      expect(menu.closeDuration).toBe(menu._durations.transition);
    });

    // Test that closeDuration sets the close duration value.
    it("should set the close duration value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's close duration value.
      menu.closeDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { closeDuration: 100 });
      expect(menu._durations.close).toBe(100);
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

      expect(menu.hoverType).toBe(menu._hoverType);
    });

    // Test that hoverType sets the hover type.
    it("should set the hover type", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidHoverType");

      // Set the menu's hover type.
      menu.hoverType = "on";

      expect(spy).toHaveBeenCalledWith({ hoverType: "on" });
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

      expect(menu.hoverDelay).toBe(menu._delays.hover);
    });

    // Test that hoverDelay sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's hover delay value.
      menu.hoverDelay = 200;

      expect(spy).toHaveBeenCalledWith("number", { hoverDelay: 200 });
      expect(menu._delays.hover).toBe(200);
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

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.enterDelay).toBe(menu._delays.hover);
    });

    // Test that enterDelay sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's enter delay value.
      menu.enterDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { enterDelay: 100 });
      expect(menu._delays.enter).toBe(100);
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

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.leaveDelay).toBe(menu._delays.hover);
    });

    // Test that leaveDelay sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's leave delay value.
      menu.leaveDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { leaveDelay: 100 });
      expect(menu._delays.leave).toBe(100);
    });
  });

  // Test Menubar prefix.
  describe("prefix", () => {
    // Test that prefix gets the prefix value.
    it("should get the prefix value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.prefix).toBe(menu._prefix);
    });

    // Test that prefix sets the prefix value.
    it("should set the prefix value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      menu.prefix = "test-";

      expect(menu.prefix).toBe("test-");
    });
  });

  // Test Menubar key.
  describe("key", () => {
    // Test that key gets the key value.
    it("should get the key value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.key).toBe(menu._key);
    });

    // Test that key cannot set the key value.
    it("should not set the key value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.key = "test-";
      }).toThrowError(
        "Cannot set property key of #<BaseMenu> which has only a getter"
      );
    });
  });

  // Test Menubar id.
  describe("id", () => {
    // Test that id gets the id value.
    it("should get the id value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.id).toBe(menu._id);
    });

    // Test that id cannot set the id value.
    it("should not set the id value", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
      });

      expect(() => {
        menu.id = "test-menu";
      }).toThrowError(
        "Cannot set property id of #<BaseMenu> which has only a getter"
      );
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
