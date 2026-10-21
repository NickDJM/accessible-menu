/**
 * Tests for protected methods of TopLinkDisclosureMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import {
  twoLevel,
  twoLevelDisclosureTopLink,
  threeLevelDisclosureTopLink,
  threeLevelDisclosureTopLinkSplit,
  fourLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import { setupMatchMedia } from "../helpers.js";

// Test TopLinkDisclosureMenu protected methods.
describe("TopLinkDisclosureMenu protected methods", () => {
  // Test TopLinkDisclosureMenu _setDOMElementType().
  describe("_setDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _setDOMElementType() method.
    it("should implement the BaseMenu _setDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._setDOMElementType).toBe(
        BaseMenu.prototype._setDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _resetDOMElementType().
  describe("_resetDOMElementType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _resetDOMElementType() method.
    it("should implement the BaseMenu _resetDOMElementType() method", () => {
      expect(TopLinkDisclosureMenu.prototype._resetDOMElementType).toBe(
        BaseMenu.prototype._resetDOMElementType
      );
    });
  });

  // Test TopLinkDisclosureMenu _handleFocus().
  describe("_handleFocus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _handleFocus() method.
    it("should implement the BaseMenu _handleFocus() method", () => {
      expect(TopLinkDisclosureMenu.prototype._handleFocus).toBe(
        BaseMenu.prototype._handleFocus
      );
    });
  });

  // Test TopLinkDisclosureMenu _setIds().
  describe("_setIds", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _setIds() method.
    it("should implement the BaseMenu _setIds() method", () => {
      expect(TopLinkDisclosureMenu.prototype._setIds).toBe(
        BaseMenu.prototype._setIds
      );
    });
  });

  // Test TopLinkDisclosureMenu _addEventListner().
  describe("_addEventListner", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _addEventListner() method.
    it("should implement the BaseMenu _addEventListner() method", () => {
      expect(TopLinkDisclosureMenu.prototype._addEventListner).toBe(
        BaseMenu.prototype._addEventListner
      );
    });
  });

  // Test TopLinkDisclosureMenu _removeEventListner().
  describe("_removeEventListner", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _removeEventListner() method.
    it("should implement the BaseMenu _removeEventListner() method", () => {
      expect(TopLinkDisclosureMenu.prototype._removeEventListner).toBe(
        BaseMenu.prototype._removeEventListner
      );
    });
  });

  // Test TopLinkDisclosureMenu _removeEventListners().
  describe("_removeEventListners", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _removeEventListners() method.
    it("should implement the BaseMenu _removeEventListners() method", () => {
      expect(TopLinkDisclosureMenu.prototype._removeEventListners).toBe(
        BaseMenu.prototype._removeEventListners
      );
    });
  });

  describe("_store", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _store() method.
    it("should implement the BaseMenu _store() method", () => {
      expect(TopLinkDisclosureMenu.prototype._store).toBe(
        BaseMenu.prototype._store
      );
    });
  });

  describe("_unstore", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu _unstore() method.
    it("should implement the BaseMenu _unstore() method", () => {
      expect(TopLinkDisclosureMenu.prototype._unstore).toBe(
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
        const menu = new TopLinkDisclosureMenu({
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

        const menu = new TopLinkDisclosureMenu({
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
      beforeEach(() => {
        document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });
      it.each([1, "["])("reports an invalid deeper selector %j", (selector) => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuSubtogglesSelector: selector,
        });

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
          TopLinkDisclosureMenu.prototype,
          "_createChildElements"
        );
        const initialize = vi.spyOn(
          CollapsibleComponent.prototype,
          "initialize"
        );
        const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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

      it("keeps separate link and toggle items in Top Link Disclosure", () => {
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "button",
          transitionClass: "",
        });
        menus.push(menu);
        const linkItem = menu.elements.menuItems[1];
        const toggleItem = menu.elements.menuItems[2];

        expect(menu.isInitialized).toBe(true);
        expect(menu.elements.menuItems).toHaveLength(14);
        expect(linkItem.dom.link).toBe(document.querySelector(".dropdown > a"));
        expect(linkItem.isSubmenuItem).toBe(false);
        expect(linkItem.elements.sibling).toBe(toggleItem);
        expect(toggleItem.dom.link).toBe(
          document.querySelector(".dropdown-toggle")
        );
        expect(toggleItem.isSubmenuItem).toBe(true);
        expect(toggleItem.elements.toggle).toBe(
          menu.elements.submenuToggles[0]
        );
      });

      it("creates only one item when the link and toggle are the same", () => {
        const menu = new TopLinkDisclosureMenu({
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

      it("keeps Top Link Disclosure's separate root toggles and combined submenu links", () => {
        document.body.innerHTML = threeLevelDisclosureTopLink;
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          transitionClass: "",
        });
        menus.push(menu);
        const childMenu =
          menu.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(menu.elements.menuItems).toHaveLength(14);
        expect(childMenu.isInitialized).toBe(true);
        expect(childMenu.elements.menuItems).toHaveLength(5);
        expect(
          childMenu.elements.menuItems[1].elements.toggle.dom.controller
        ).toBe(childMenu.elements.menuItems[1].dom.link);
        expect(childMenu.selectors.submenuToggles).toBe("a");
      });

      it("reads the current child toggle selector when children are created", () => {
        document.body.innerHTML = threeLevelDisclosureTopLinkSplit;
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          transitionClass: "",
          initialize: false,
        });
        menus.push(menu);

        menu._selectors.submenuSubtoggles = "button";
        menu.initialize();

        const childMenu =
          menu.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(childMenu.isInitialized).toBe(true);
        expect(childMenu.elements.menuItems).toHaveLength(8);
        expect(childMenu.elements.submenuToggles[0].dom.controller).toBe(
          childMenu.dom.menu.querySelector("button")
        );
      });

      it.each(["a", "a,button"])(
        "finds the navigation link after its toggle with selector %s",
        (selector) => {
          const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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

      it("keeps standalone buttons as menu items", () => {
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "button",
          transitionClass: "",
          initialize: false,
        });
        menus.push(menu);
        const lastItem = menu.dom.menu.lastElementChild;
        const button = document.querySelector(".menu-toggle");
        lastItem.replaceChildren(button);

        menu.initialize();

        const item = menu.elements.menuItems.at(-1);

        expect(menu.isInitialized).toBe(true);
        expect(item.dom.link).toBe(lastItem.querySelector("button"));
        expect(item.isSubmenuItem).toBe(false);
      });
    });

    describe("submenu toggle selectors", () => {
      beforeEach(() => {
        document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });

      it("preserves the default link toggles below the top level", () => {
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
        });
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(menu.elements.submenuToggles[0].dom.controller.tagName).toBe(
          "BUTTON"
        );
        expect(child.selectors.submenuToggles).toBe("a");
        expect(grandchild.selectors.submenuToggles).toBe("a");
        expect(child.elements.submenuToggles[0].dom.controller.tagName).toBe(
          "A"
        );
        expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
          grandchild.dom.menu.querySelector("a")
        );
      });

      it.each(["button", null])(
        "creates separate buttons below the top level with a deeper selector of %s",
        (submenuSubtogglesSelector) => {
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuSubtogglesSelector,
          });
          const child = menu.elements.submenuToggles[0].elements.controlledMenu;
          const grandchild =
            child.elements.submenuToggles[0].elements.controlledMenu;
          const link = child.elements.menuItems[1];
          const toggle = child.elements.menuItems[2];

          expect(menu.isInitialized).toBe(true);
          expect(child.isInitialized).toBe(true);
          expect(grandchild.isInitialized).toBe(true);
          expect(child.selectors.submenuToggles).toBe("button");
          expect(grandchild.selectors.submenuToggles).toBe("button");
          expect(link.dom.link.tagName).toBe("A");
          expect(link.elements.sibling).toBe(toggle);
          expect(toggle.dom.link).toBe(child.dom.menu.querySelector("button"));
          expect(toggle.elements.toggle).toBe(child.elements.submenuToggles[0]);
          expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
            grandchild.dom.menu.querySelector("button")
          );
          expect(grandchild.elements.menuItems[0].elements.sibling).toBe(
            grandchild.elements.menuItems[1]
          );
        }
      );

      it("uses custom selectors for root and child toggle buttons", () => {
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: ".root-toggle",
          submenuSubtogglesSelector: ".child-toggle",
        });
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(menu.elements.submenuToggles[0].dom.controller).toBe(
          document.querySelector(".root-toggle")
        );
        expect(child.elements.submenuToggles[0].dom.controller).toBe(
          child.dom.menu.querySelector(".child-toggle")
        );
        expect(child.selectors.submenuToggles).toBe(".child-toggle");
        expect(grandchild.selectors.submenuToggles).toBe(".child-toggle");
        expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
          grandchild.dom.menu.querySelector(".child-toggle")
        );
      });

      it("uses the custom root selector below the top level when the deeper selector is null", () => {
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: ".dropdown-toggle",
          submenuSubtogglesSelector: null,
        });
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;

        expect(menu.isInitialized).toBe(true);
        expect(child.isInitialized).toBe(true);
        expect(grandchild.isInitialized).toBe(true);
        expect(menu.selectors.submenuToggles).toBe(".dropdown-toggle");
        expect(child.selectors.submenuToggles).toBe(".dropdown-toggle");
        expect(grandchild.selectors.submenuToggles).toBe(".dropdown-toggle");
        expect(child.elements.submenuToggles[0].dom.controller).toBe(
          child.dom.menu.querySelector("button")
        );
        expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
          grandchild.dom.menu.querySelector(".dropdown-toggle")
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
        const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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

        const menu = new TopLinkDisclosureMenu({
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
        const menu = new TopLinkDisclosureMenu({
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
      expect(TopLinkDisclosureMenu.prototype._createController).toBe(
        BaseMenu.prototype._createController
      );
    });
  });

  describe("_setCustomProps", () => {
    it("should implement the BaseMenu _setCustomProps method", () => {
      expect(TopLinkDisclosureMenu.prototype._setCustomProps).toBe(
        BaseMenu.prototype._setCustomProps
      );
    });
  });
});
