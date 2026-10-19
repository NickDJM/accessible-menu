/**
 * Getter/Setter tests for the BaseMenuToggle class.
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

  describe("shouldFocus", () => {
    it.each([
      { currentEvent: "none", hoverType: "off", expected: false },
      { currentEvent: "keyboard", hoverType: "off", expected: true },
      { currentEvent: "character", hoverType: "off", expected: true },
      { currentEvent: "mouse", hoverType: "off", expected: false },
      { currentEvent: "mouse", hoverType: "on", expected: false },
      { currentEvent: "mouse", hoverType: "dynamic", expected: false },
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
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
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
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
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
      const components = [
        menu.elements.controller,
        menu.elements.submenuToggles[0],
        child.elements.submenuToggles[0],
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

        menu.hoverType = "dynamic";
        menu.currentEvent = "mouse";
        component.focus();

        expect(document.activeElement).toBe(menu.dom.controller);

        menu.currentEvent = "character";
        component.focus();

        expect(document.activeElement).toBe(component.dom.controller);
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
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
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
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
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
      const components = [
        menu.elements.controller,
        menu.elements.submenuToggles[0],
        child.elements.submenuToggles[0],
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
