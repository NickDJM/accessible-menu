/**
 * Tests for protected methods of BaseMenu class.
 *
 * todo: Add tests for: _validate(), _setDOMElements(), _findRootMenu(),
 * _createChildElements(), _handleFocus(), _handleClick(), _handelHover(),
 * _handleKeydown(), and _handleKeyup().
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  twoLevel,
  fourLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import Component from "@accessible-ecosystem/core";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import { setupMatchMedia } from "../helpers.js";

let originalMatchMedia;

beforeEach(() => {
  document.body.innerHTML = twoLevel;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test BaseMenu protected methods.
describe("BaseMenu protected methods", () => {
  // Test BaseMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    const allowedTypes = [
      "menuItems",
      "menuLinks",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedTypes = ["menu", "container", "controller"];

    // Test that all allowed types can be set.
    it.each(allowedTypes)("should set the %s element type", (elementType) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      expect(() => {
        menu._setDOMElementType(elementType);
      }).not.toThrow();
    });

    // Test that all disallowed types throw an error.
    it.each(disallowedTypes)(
      "should throw an error when setting the %s element type",
      (elementType) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        menu.initialize();

        menu._selectors["menu"] = "ul";
        menu._selectors["container"] = "nav";
        menu._selectors["controller"] = "button";

        expect(() => {
          menu._setDOMElementType(elementType);
        }).toThrow(
          `AccessibleMenu Menu: "${elementType}" element cannot be set through _setDOMElementType because it is a protected element.`
        );
      }
    );

    // Test that an invalid type throws an error.
    it("should throw an error when setting an invalid element type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      expect(() => {
        menu._setDOMElementType("menu");
      }).toThrow('AccessibleMenu Menu: "menu" is not a valid element type.');
    });
  });

  // Test BaseMenu _resetDOMElementType().

  // Test BaseMenu _handleMediaMatch().

  describe("_setIds", () => {
    // Test that _setIds sets the menu's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Get the generated id.
      const generatedId = menu.dom.menu.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-[a-z]{1,10}$/);
    });

    // Test that _setIds does not change the menu's id attribute when it already has an id.
    it("should not change the toggle's id attribute when it already has an id", () => {
      document.querySelector("ul").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Test the menu's id.
      expect(menu.dom.menu.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the menu controller's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu controller's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Get the generated id.
      const generatedId = menu.dom.controller.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-controller-[a-z]{1,10}$/);
    });

    // Test that _setIds does not set the menu controller's id attribute to a generated value when it has an existing id.
    it("should not set the menu controller's id attribute to a generated value when it has an existing id", () => {
      document.querySelector("button").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Test the menu controller's id.
      expect(menu.dom.controller.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the menu container's id attribute to a generated value when it doesn't have an existing id.
    it("should set the menu container's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Get the generated id.
      const generatedId = menu.dom.container.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-container-[a-z]{1,10}$/);
    });

    // Test that _setIds does not set the menu container's id attribute to a generated value when it has an existing id.
    it("should not set the menu container's id attribute to a generated value when it has an existing id", () => {
      document.querySelector("nav").setAttribute("id", "test-id");

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Test the menu container's id.
      expect(menu.dom.container.getAttribute("id")).toBe("test-id");
    });
  });

  describe("_validate", () => {
    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should inherit shared Core validation", () => {
        expect(BaseMenu.prototype._validate).toBe(
          Component.prototype._validate
        );
      });

      it.each([null, 12, undefined])(
        "should report an invalid menu element (%s) through Core errors",
        (menuElement) => {
          vi.spyOn(console, "error").mockImplementation(() => {});
          const menu = new BaseMenu({ menuElement });

          menu.initialize();

          expect(menu.isValid).toBe(false);
          expect(
            menu.errors.some((error) => error.message.includes("menuElement"))
          ).toBe(true);
        }
      );
    });

    describe("controller options", () => {
      const flags = [
        "expandInsideBreakpoint",
        "expandOutsideBreakpoint",
        "collapseInsideBreakpoint",
        "collapseOutsideBreakpoint",
        "lockInsideBreakpoint",
        "lockOutsideBreakpoint",
        "unlockInsideBreakpoint",
        "unlockOutsideBreakpoint",
      ];
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = "";
      });
      it.each(flags)("should validate %s through Core", (option) => {
        vi.spyOn(console, "error").mockImplementation(() => {});

        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          [option]: "invalid",
        });
        menu.initialize();

        expect(
          menu.errors.some((error) => error.message.includes(option))
        ).toBe(true);
      });
    });

    describe("submenu toggle selectors", () => {
      const menus = [];
      beforeEach(() => {
        document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
      });

      afterEach(() => {
        for (const menu of menus.splice(0)) {
          menu.dispose();
        }

        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });
      it.each([1, "["])("reports an invalid deeper selector %j", (selector) => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: ".menu-link",
          transitionClass: "",
          initialize: false,
          submenuSubtogglesSelector: selector,
        });
        menus.push(menu);

        menu.initialize();

        expect(menu.isInitialized).toBe(false);
        expect(menu.errors.length).toBeGreaterThan(0);
      });
    });
  });

  describe("_createChildElements", () => {
    describe("controller options", () => {
      const flags = [
        "expandInsideBreakpoint",
        "expandOutsideBreakpoint",
        "collapseInsideBreakpoint",
        "collapseOutsideBreakpoint",
        "lockInsideBreakpoint",
        "lockOutsideBreakpoint",
        "unlockInsideBreakpoint",
        "unlockOutsideBreakpoint",
      ];
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = "";
      });

      it("should initialize the controller during child creation", () => {
        const createChildren = vi.spyOn(
          BaseMenu.prototype,
          "_createChildElements"
        );
        const initialize = vi.spyOn(
          CollapsibleComponent.prototype,
          "initialize"
        );
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();
        const controller = menu.elements.controller;
        const callIndex = initialize.mock.contexts.indexOf(controller);

        expect(callIndex).toBeGreaterThanOrEqual(0);
        expect(initialize.mock.invocationCallOrder[callIndex]).toBeGreaterThan(
          createChildren.mock.invocationCallOrder[0]
        );
      });

      it.each(flags)("should keep %s off submenu toggles", (option) => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          [option]: true,
        });
        menu.initialize();

        expect(menu.elements.submenuToggles[0][option]).toBe(false);
      });
    });

    describe("submenu toggle selectors", () => {
      const menus = [];
      beforeEach(() => {
        document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
      });

      afterEach(() => {
        for (const menu of menus.splice(0)) {
          menu.dispose();
        }

        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });

      it("preserves the existing selector when no deeper selector is provided", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: ".menu-link",
          transitionClass: "",
          initialize: false,
        });
        menus.push(menu);

        menu.initialize();

        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const selector = ".menu-link";

        expect(menu.isInitialized).toBe(true);
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(child.selectors.submenuToggles).toBe(selector);
        expect(grandchild.selectors.submenuToggles).toBe(selector);
      });

      it("uses the configured submenu toggle selector when the deeper selector is null", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: ".menu-link",
          transitionClass: "",
          initialize: false,
          submenuSubtogglesSelector: null,
        });
        menus.push(menu);

        menu.initialize();

        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(child.selectors.submenuToggles).toBe(".menu-link");
        expect(grandchild.selectors.submenuToggles).toBe(".menu-link");
      });

      it("uses a different selector for child menus at every deeper level", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          transitionClass: "",
          initialize: false,
          submenuTogglesSelector: ".root-toggle",
          submenuSubtogglesSelector: ".child-toggle",
        });
        menus.push(menu);

        menu.initialize();

        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(menu.selectors.submenuToggles).toBe(".root-toggle");
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(child.selectors.submenuToggles).toBe(".child-toggle");
        expect(grandchild.selectors.submenuToggles).toBe(".child-toggle");
        expect(child.elements.submenuToggles[0].dom.controller).toBe(
          child.dom.menu.querySelector(".child-toggle")
        );
        expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
          grandchild.dom.menu.querySelector(".child-toggle")
        );
      });
    });
  });

  describe("_setAriaAttributes", () => {
    describe("controller options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = "";
      });

      it("should not initialize the controller when setting ARIA attributes", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();
        const initialize = vi.spyOn(menu.elements.controller, "initialize");

        menu._setAriaAttributes();

        expect(initialize).not.toHaveBeenCalled();
      });
    });
  });

  describe("_createController", () => {
    describe("controller options", () => {
      const flags = [
        "expandInsideBreakpoint",
        "expandOutsideBreakpoint",
        "collapseInsideBreakpoint",
        "collapseOutsideBreakpoint",
        "lockInsideBreakpoint",
        "lockOutsideBreakpoint",
        "unlockInsideBreakpoint",
        "unlockOutsideBreakpoint",
      ];
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = "";
      });

      it("should not initialize an initialized controller again", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();
        const initialize = vi.spyOn(menu.elements.controller, "initialize");

        menu._createController();

        expect(initialize).not.toHaveBeenCalled();
      });

      it.each(flags)("should forward %s to the controller", (option) => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          [option]: true,
        });
        menu.initialize();

        expect(menu.elements.controller[option]).toBe(true);
      });

      it.each(flags)("should use Core's false default for %s", (option) => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();

        expect(menu.elements.controller[option]).toBe(false);
      });

      it("should register one media-query listener on the controller", () => {
        const { matchMedia } = setupMatchMedia(false);
        vi.stubGlobal("matchMedia", matchMedia);

        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          breakpoint: "40em",
        });
        menu.initialize();

        expect(matchMedia).toHaveBeenCalledExactlyOnceWith("(width <= 40em)");
      });

      it("should respond to a media-query change using Core", () => {
        const { matchMedia, mql, listeners } = setupMatchMedia(true);
        vi.stubGlobal("matchMedia", matchMedia);
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          breakpoint: "40em",
          lockOutsideBreakpoint: true,
        });
        menu.initialize();
        vi.advanceTimersToNextFrame();

        mql.matches = false;
        listeners.forEach((listener) => listener(mql));

        expect(menu.elements.controller.isLocked).toBe(true);
      });

      it("should inherit BaseMenuToggle's responsive callback on the controller", () => {
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();

        expect(menu.elements.controller._mediaQueryListEventCallback).toBe(
          BaseMenuToggle.prototype._mediaQueryListEventCallback
        );
      });
    });
  });
});

describe("BaseMenu submenu focus", () => {
  let menu;

  afterEach(() => {
    menu.dispose();
    vi.restoreAllMocks();
  });

  describe.each([false, true])("defer set to %s", (defer) => {
    it.each([undefined, 1, 2])("should focus childIndex %s", (childIndex) => {
      menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        transitionClass: "",
      });
      menu.initialize();
      const item = menu.elements.menuItems[1];
      const submenu = item.elements.childMenu;
      const callbacks = [];
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callbacks.push(callback);
          return callbacks.length;
        }
      );
      item.elements.toggle.expand();
      menu.currentEvent = "keyboard";
      menu.currentChild = 1;
      const index = childIndex ?? 0;
      const previousIndex = submenu.currentChild;

      menu._focusSubmenu(item, { childIndex, defer });

      expect(submenu.currentChild).toBe(defer ? previousIndex : index);

      while (callbacks.length > 0) callbacks.shift()(0);

      expect(submenu.currentChild).toBe(index);
      expect(document.activeElement).toBe(
        submenu.elements.menuItems[index].dom.link
      );
    });
  });
});
