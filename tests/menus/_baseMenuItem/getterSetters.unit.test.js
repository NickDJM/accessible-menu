/**
 * Getter/Setter tests for the BaseMenuItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel, threeLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// Test all getter/setter methods in the BaseMenuItem class.
describe("BaseMenuItem getter/setters", () => {
  // Test BaseMenuItem dom.
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

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.dom).toEqual(menuItem._dom);
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

      const menuItem = menu.elements.menuItems[0];

      expect(() => {
        menuItem.dom = {};
      }).toThrowError();
    });
  });

  // Test BaseMenuItem elements.
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

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.elements).toEqual(menuItem._elements);
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

      const menuItem = menu.elements.menuItems[0];

      expect(() => {
        menuItem.elements = {};
      }).toThrowError();
    });
  });

  // Test BaseMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that isSubmenuItem gets the submenu flag.
    it("should get the submenu flag", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      expect(menuItem.isSubmenuItem).toEqual(menuItem._submenu);
    });

    // Test that isSubmenuItem cannot be set manually.
    it("should not set the submenu flag", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuItem = menu.elements.menuItems[0];

      expect(() => {
        menuItem.isSubmenuItem = true;
      }).toThrowError();
    });
  });

  describe("shouldFocus", () => {
    it.each([
      { currentEvent: "none", hoverType: "off", expected: false },
      { currentEvent: "keyboard", hoverType: "off", expected: true },
      { currentEvent: "character", hoverType: "off", expected: true },
      { currentEvent: "mouse", hoverType: "off", expected: false },
      { currentEvent: "mouse", hoverType: "on", expected: false },
      { currentEvent: "mouse", hoverType: "dynamic", expected: true },
    ])(
      "should inherit the root menu's value for $currentEvent with hover $hoverType",
      ({ currentEvent, hoverType, expected }) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        initializeMenu(menu);
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.menuItems[0],
          child.elements.menuItems[0],
          grandchild.elements.menuItems[0],
        ];
        menu.hoverType = hoverType;

        menu.currentEvent = currentEvent;

        expect(menu.shouldFocus).toBe(expected);
        for (const component of components) {
          expect(component.shouldFocus).toBe(expected);
        }
      }
    );

    it.each([true, false])(
      "should inherit the root menu's custom value of %s",
      (shouldFocus) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        initializeMenu(menu);
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.menuItems[0],
          child.elements.menuItems[0],
          grandchild.elements.menuItems[0],
        ];
        vi.spyOn(menu, "shouldFocus", "get").mockReturnValue(shouldFocus);

        for (const component of components) {
          expect(component.shouldFocus).toBe(shouldFocus);
        }
      }
    );

    it("should use the root menu's value when moving DOM focus", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionClass: "",
      });

      initializeMenu(menu);
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const grandchild =
        child.elements.submenuToggles[0].elements.controlledMenu;
      const components = [
        menu.elements.menuItems[0],
        child.elements.menuItems[0],
        grandchild.elements.menuItems[0],
      ];
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback(0);
          return 0;
        }
      );

      for (const component of components) {
        menu.dom.controller.focus();
        menu.currentEvent = "none";

        component.focus();

        expect(document.activeElement).toBe(menu.dom.controller);

        menu.currentEvent = "character";
        component.focus();

        expect(document.activeElement).toBe(component.dom.link);
      }
    });
  });

  describe("currentEvent", () => {
    it.each(["none", "mouse", "keyboard", "character"])(
      "should inherit the root menu's value for %s events",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        initializeMenu(menu);
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.menuItems[0],
          child.elements.menuItems[0],
          grandchild.elements.menuItems[0],
        ];

        menu.currentEvent = currentEvent;

        for (const component of components) {
          expect(component.currentEvent).toBe(currentEvent);
        }
      }
    );

    it.each(["keyboard", "mouse", "character"])(
      "should update the root menu's value to %s",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        initializeMenu(menu);
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.menuItems[0],
          child.elements.menuItems[0],
          grandchild.elements.menuItems[0],
        ];

        for (const component of components) {
          menu.currentEvent = "none";

          component.currentEvent = currentEvent;

          expect(menu.currentEvent).toBe(currentEvent);
          for (const sibling of components) {
            expect(sibling.currentEvent).toBe(currentEvent);
          }
        }
      }
    );

    it("should reject an invalid event without changing the root menu's value", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionClass: "",
      });

      initializeMenu(menu);
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const grandchild =
        child.elements.submenuToggles[0].elements.controlledMenu;
      const components = [
        menu.elements.menuItems[0],
        child.elements.menuItems[0],
        grandchild.elements.menuItems[0],
      ];
      menu.currentEvent = "keyboard";

      for (const component of components) {
        expect(() => {
          component.currentEvent = "invalid";
        }).toThrow();

        expect(menu.currentEvent).toBe("keyboard");
        expect(component.currentEvent).toBe("keyboard");
      }
    });
  });
});
