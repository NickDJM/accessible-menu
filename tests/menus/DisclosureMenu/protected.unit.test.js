/**
 * Tests for protected methods of DisclosureMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";
import {
  twoLevel,
  twoLevelDisclosureTopLink,
  threeLevelDisclosureTopLinkSplit,
  fourLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import { setupMatchMedia } from "../helpers.js";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";

// Test DisclosureMenu protected methods.
describe("DisclosureMenu protected methods", () => {
  // Test DisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test DisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that DisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(DisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test DisclosureMenu _handleFocus().
  describe("_handleFocus", () => {
    // Test that DisclosureMenu implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(DisclosureMenu.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test DisclosureMenu _handleHover().
  describe("_handleHover", () => {
    // Test that DisclosureMenu implements the BaseMenu _handleHover() method.
    it("should implement the BaseMenu _handleHover() method", () => {
      expect(DisclosureMenu.prototype._handleHover).toBe(
        BaseMenu.prototype._handleHover
      );
    });
  });

  // Test DisclosureMenu _setIds().
  describe("_setIds", () => {
    // Test that DisclosureMenu implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(DisclosureMenu.prototype._setIds).toBe(BaseMenu.prototype._setIds);
    });
  });

  // Test DisclosureMenu _addEventListner().
  describe("_addEventListner", () => {
    // Test that DisclosureMenu implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(DisclosureMenu.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test DisclosureMenu _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that DisclosureMenu implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(DisclosureMenu.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test DisclosureMenu _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that DisclosureMenu implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(DisclosureMenu.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that DisclosureMenu implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(DisclosureMenu.prototype._store).toBe(BaseMenu.prototype._store);
    });
  });

  describe("_unstore", () => {
    // Test that DisclosureMenu implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(DisclosureMenu.prototype._unstore).toBe(
        BaseMenu.prototype._unstore
      );
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

      it("should report menu-specific optional-key validation through Core", () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
          optionalKeySupport: "invalid",
          initialize: false,
        });

        menu.initialize();

        expect(menu.isValid).toBe(false);
        expect(
          menu.errors.some((error) =>
            error.message.includes("optionalKeySupport")
          )
        ).toBe(true);
      });
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

        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
          DisclosureMenu.prototype,
          "_createChildElements"
        );
        const initialize = vi.spyOn(
          CollapsibleComponent.prototype,
          "initialize"
        );
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
      class SeparateLinkMenu extends DisclosureMenu {
        _MenuType = SeparateLinkMenu;
        _splitMenuLinks = true;

        constructor({ initialize = true, ...options }) {
          super({ ...options, initialize: false });

          if (initialize) {
            this.initialize();
          }
        }
      }

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
        const menu = new DisclosureMenu({
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

      it("creates only one item when the link and toggle are the same", () => {
        const menu = new SeparateLinkMenu({
          menuElement: document.querySelector("ul"),
          transitionClass: "",
          submenuTogglesSelector: "a",
        });
        menus.push(menu);

        expect(menu.isInitialized).toBe(true);
        expect(menu.elements.menuItems).toHaveLength(8);
        expect(menu.elements.menuItems[1].dom.link).toBe(
          document.querySelector(".dropdown > a")
        );
        expect(menu.elements.menuItems[1].isSubmenuItem).toBe(true);
      });

      it("uses the subclass's item and menu types at deeper levels", () => {
        document.body.innerHTML = threeLevelDisclosureTopLinkSplit;
        const menu = new SeparateLinkMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "button",
          transitionClass: "",
        });
        menus.push(menu);
        const childMenu =
          menu.elements.submenuToggles[0].elements.controlledMenu;
        const linkItem = childMenu.elements.menuItems[1];
        const toggleItem = childMenu.elements.menuItems[2];

        expect(childMenu).toBeInstanceOf(SeparateLinkMenu);
        expect(linkItem).toBeInstanceOf(DisclosureMenuItem);
        expect(toggleItem).toBeInstanceOf(DisclosureMenuItem);
        expect(linkItem.elements.sibling).toBe(toggleItem);
        expect(toggleItem.elements.childMenu.isInitialized).toBe(true);
      });

      it.each(["a", "a,button"])(
        "finds the navigation link after its toggle with selector %s",
        (selector) => {
          const menu = new SeparateLinkMenu({
            menuElement: document.querySelector("ul"),
            submenuTogglesSelector: "button",
            transitionClass: "",
            menuLinksSelector: selector,
            initialize: false,
          });
          menus.push(menu);
          const item = menu.dom.menu.querySelector(".dropdown");
          const button = item.querySelector("button");
          const link = item.querySelector("a");
          item.prepend(button);

          menu.initialize();

          const linkItem = menu.elements.menuItems[1];
          const toggleItem = menu.elements.menuItems[2];

          expect(menu.isInitialized).toBe(true);
          expect(menu.elements.menuItems).toHaveLength(14);
          expect(linkItem.dom.link).toBe(link);
          expect(linkItem.elements.sibling).toBe(toggleItem);
          expect(toggleItem.dom.link).toBe(button);
        }
      );

      it("uses the toggle when the only navigation link is inside its child menu", () => {
        const menu = new SeparateLinkMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "button",
          transitionClass: "",
          initialize: false,
        });
        menus.push(menu);
        const item = menu.dom.menu.querySelector(".dropdown");
        const button = item.querySelector("button");
        item.querySelector("a").remove();

        menu.initialize();

        const toggleItem = menu.elements.menuItems[1];
        const child = toggleItem.elements.childMenu;

        expect(menu.isInitialized).toBe(true);
        expect(menu.elements.menuItems).toHaveLength(13);
        expect(toggleItem.dom.link).toBe(button);
        expect(toggleItem.isSubmenuItem).toBe(true);
        expect(child.elements.menuItems[0].dom.link).toBe(
          item.querySelector("ul a")
        );
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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

        const menu = new DisclosureMenu({
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
        const menu = new DisclosureMenu({
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

      it("should inherit Core's responsive callback on the controller", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
        });
        menu.initialize();

        expect(menu.elements.controller._mediaQueryListEventCallback).toBe(
          CollapsibleComponent.prototype._mediaQueryListEventCallback
        );
      });
    });
  });
});
