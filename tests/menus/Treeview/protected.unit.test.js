/**
 * Tests for protected methods of Treeview class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Treeview from "../../../src/treeview.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import {
  twoLevel,
  twoLevelDisclosureTopLink,
  fourLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import { setupMatchMedia } from "../helpers.js";

// Test Treeview protected methods.
describe("Treeview protected methods", () => {
  // Test Treeview _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(Treeview.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test Treeview _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that Treeview implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(Treeview.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test Treeview _handleFocus().
  describe("_handleFocus", () => {
    // Test that Treeview implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(Treeview.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test Treeview _handleClick().
  describe("_handleClick", () => {
    // Test that Treeview implements the BaseMenu _handleClick() method.
    it("should implement the BaseMenu _handleClick() method", () => {
      expect(Treeview.prototype._handleClick).toBe(
        BaseMenu.prototype._handleClick
      );
    });
  });

  // Test Treeview _setIds().
  describe("_setIds", () => {
    // Test that Treeview implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(Treeview.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });

  // Test Treeview _addEventListner().
  describe("_addEventListner", () => {
    // Test that Treeview implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(Treeview.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test Treeview _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that Treeview implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(Treeview.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test Treeview _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that Treeview implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(Treeview.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that Treeview implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(Treeview.prototype._store).toBe(BaseMenu.prototype._store);
    });
  });

  describe("_unstore", () => {
    // Test that Treeview implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(Treeview.prototype._unstore).toBe(BaseMenu.prototype._unstore);
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
          Treeview.prototype,
          "_createChildElements"
        );
        const initialize = vi.spyOn(
          CollapsibleComponent.prototype,
          "initialize"
        );
        const menu = new Treeview({
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
        const menu = new Treeview({
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

    describe("menu items", () => {
      const menus = [];
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        for (const menu of menus.splice(0)) {
          menu.dispose();
        }

        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });

      it("keeps one submenu item when links and toggles match different elements", () => {
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "button",
          transitionClass: "",
        });
        menus.push(menu);
        const toggle = menu.elements.submenuToggles[0];

        expect(menu.isInitialized).toBe(true);
        expect(menu.elements.menuItems).toHaveLength(8);
        expect(menu.elements.menuItems[1].dom.link).toBe(toggle.dom.controller);
        expect(menu.elements.menuItems[1].elements.toggle).toBe(toggle);
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
        const menu = new Treeview({
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
        const menu = new Treeview({
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
        const menu = new Treeview({
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
        const menu = new Treeview({
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

      it.each(flags)("should forward %s to the controller", (option) => {
        const menu = new Treeview({
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
        const menu = new Treeview({
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

        const menu = new Treeview({
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

      it("should inherit BaseMenuToggle's responsive callback on the controller", () => {
        const menu = new Treeview({
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

    it("should implement the BaseMenu _createController method", () => {
      expect(Treeview.prototype._createController).toBe(
        BaseMenu.prototype._createController
      );
    });
  });

  describe("_validate", () => {
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

        const menu = new Treeview({
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
        const menu = new Treeview({
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

  describe("_setCustomProps", () => {
    it("should implement the BaseMenu _setCustomProps method", () => {
      expect(Treeview.prototype._setCustomProps).toBe(
        BaseMenu.prototype._setCustomProps
      );
    });
  });
});
