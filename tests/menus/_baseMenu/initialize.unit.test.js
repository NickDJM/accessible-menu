/**
 * Initialization tests for the BaseMenu class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the BaseMenu class can be initialized.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  singleLevel,
  twoLevel,
  threeLevelWithTriggers,
} from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { setupMatchMedia } from "../helpers.js";
import Component from "@accessible-ecosystem/core";

let originalMatchMedia;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  // Create the test menu.
  document.body.innerHTML = twoLevel;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  vi.restoreAllMocks();
  // Remove the test menu.
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test the BaseMenu initialization.
describe("BaseMenu", () => {
  // Test that the BaseMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({});

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the menu exists in window.AccessibleMenuStorage storage after initialization.
  it("should exist in window.AccessibleMenuStorage storage after initialization", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });

    // Initialize the menu.
    menu.initialize();

    // Test that the menu exists in window.AccessibleMenuStorage.menus.
    expect(
      window.AccessibleMenuStorage.get({ type: "menus", key: menu.id })
    ).toEqual(menu);
  });

  // Test that the menu does not exist in window.AccessibleMenuStorage storage after failed initialization.
  it("should not exist in window.AccessibleMenuStorage storage after failed initialization", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: 1,
    });

    // Initialize the menu.
    try {
      menu.initialize();
    } catch {
      // Do nothing.
    }

    // Test that the menu does not exist in window.AccessibleMenuStorage.storage.menus.
    expect(
      window.AccessibleMenuStorage.get({ type: "menus", key: menu.id })
    ).not.toEqual(menu);
  });

  describe("inheritance", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = "";
    });

    it("should inherit Core initialization", () => {
      expect(BaseMenu.prototype.initialize).toBe(
        Component.prototype.initialize
      );
    });
  });

  describe("controller media queries", () => {
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
    it.each(flags)(
      "should apply %s on the initial media-query frame",
      (option) => {
        const matches = option.includes("Inside");
        const { matchMedia } = setupMatchMedia(matches);
        vi.stubGlobal("matchMedia", matchMedia);
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          submenuTogglesSelector: "a",
          initialize: false,
          breakpoint: "40em",
          [option]: true,
        });
        menu.initialize();
        const controller = menu.elements.controller;
        if (option.startsWith("collapse"))
          controller.expand({ transition: false, emit: false });
        if (option.startsWith("unlock")) controller.lock({ emit: false });

        vi.advanceTimersToNextFrame();

        if (option.startsWith("expand"))
          expect(controller.isExpanded).toBe(true);
        if (option.startsWith("collapse"))
          expect(controller.isExpanded).toBe(false);
        if (option.startsWith("lock")) expect(controller.isLocked).toBe(true);
        if (option.startsWith("unlock"))
          expect(controller.isLocked).toBe(false);
      }
    );
  });
});

// Test the BaseMenu initialization for a controlled menu.
describe("BaseMenu (controlled)", () => {
  // Test that the BaseMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: 1,
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if no containerElement is passed when a controllerElement is.
  it("should report a validation failure if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if the containerElement is invalid when a controllerElement is.
  it("should report a validation failure if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: 1,
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if no controllerElement is passed when a containerElement is.
  it("should report a validation failure if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error if the controllerElement is invalid when a containerElement is.
  it("should report a validation failure if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });
});

// Test the BaseMenu initialization with custom arguments.
describe("BaseMenu (custom arguments)", () => {
  // Test that the BaseMenu will initialize if a valid menuItemsSelector is passed.
  it("should initialize with a valid menuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuItemsSelector: ".menu-item",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid menuItemsSelector is passed.
  it("should report a validation failure if an invalid menuItemsSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuItemsSelector: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid menuLinksSelector is passed.
  it("should initialize with a valid menuLinksSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuLinksSelector: ".menu-link",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid menuLinksSelector is passed.
  it("should report a validation failure if an invalid menuLinksSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuLinksSelector: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid submenuItemsSelector is passed.
  it("should initialize with a valid submenuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuItemsSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenuItemsSelector is passed.
  it("should report a validation failure if an invalid submenuItemsSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuItemsSelector: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  it("should create controllers and their direct child triggers at the correct menu level", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTriggersSelector: ".submenu-trigger",
    });

    menu.initialize();

    const mammals = menu.elements.submenuToggles[0];
    const submenu = mammals.elements.controlledMenu;
    const cats = submenu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems).toHaveLength(3);
    expect(menu.elements.submenuToggles).toHaveLength(2);
    expect(submenu.isInitialized).toBe(true);
    expect(submenu.elements.menuItems).toHaveLength(2);
    expect(submenu.elements.parentMenu).toBe(menu);
    expect(cats.elements.controlledMenu.elements.parentMenu).toBe(submenu);
    expect(mammals.dom.trigger).toBe(
      mammals.dom.controller.querySelector(".submenu-trigger")
    );
    expect(cats.dom.trigger).toBe(
      cats.dom.controller.querySelector(".submenu-trigger")
    );

    const linkClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    mammals.dom.controller.dispatchEvent(linkClick);

    expect(linkClick.defaultPrevented).toBe(false);
    expect(mammals.isExpanded).toBe(false);

    mammals.dom.trigger.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );

    expect(mammals.isExpanded).toBe(true);
    expect(menu.currentChild).toBe(1);

    menu.dispose();
  });

  it("should match each trigger to its controller at every submenu level", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTriggersSelector: ".submenu-trigger",
    });

    menu.initialize();

    const mammals = menu.elements.submenuToggles[0];
    const reptiles = menu.elements.submenuToggles[1];
    const submenu = mammals.elements.controlledMenu;
    const cats = submenu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(menu.dom.submenuTriggers).toEqual(
      Array.from(
        menu.dom.menu.querySelectorAll(":scope > li > a > .submenu-trigger")
      )
    );
    expect(mammals.dom.trigger).toBe(
      mammals.dom.controller.querySelector(".submenu-trigger")
    );
    expect(reptiles.dom.trigger).toBe(
      reptiles.dom.controller.querySelector(".submenu-trigger")
    );
    expect(cats.dom.trigger).toBe(
      cats.dom.controller.querySelector(".submenu-trigger")
    );
    expect(submenu.selectors.submenuTriggers).toBe(".submenu-trigger");
    expect(submenu.dom.submenuTriggers).toEqual([cats.dom.trigger]);

    menu.dispose();
  });

  it.each([undefined, null, ""])(
    "should use controllers as triggers when submenuTriggersSelector is %s",
    (submenuTriggersSelector) => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuTriggersSelector,
      });

      menu.initialize();

      const toggle = menu.elements.submenuToggles[0];

      expect(menu.isInitialized).toBe(true);
      expect(menu.selectors.submenuTriggers).toBe("");
      expect(menu.dom.submenuTriggers).toEqual([]);
      expect(toggle.dom.trigger).toBe(toggle.dom.controller);

      menu.dispose();
    }
  );

  it.each(["[", 1, true])(
    "should report an invalid submenuTriggersSelector of %s",
    (submenuTriggersSelector) => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuTriggersSelector,
      });

      menu.initialize();

      expect(menu.isInitialized).toBe(false);
      expect(console.error).toHaveBeenCalled();

      menu.dispose();
    }
  );

  it("should fall back to the controller without using another controller's trigger", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    document.querySelector("a[href='#Reptiles'] .submenu-trigger").remove();
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTriggersSelector: ".submenu-trigger",
    });

    menu.initialize();

    const mammals = menu.elements.submenuToggles[0];
    const reptiles = menu.elements.submenuToggles[1];

    expect(menu.isInitialized).toBe(true);
    expect(console.error).not.toHaveBeenCalled();
    expect(menu.errors).toEqual([]);
    expect(mammals.dom.trigger).toBe(
      mammals.dom.controller.querySelector(".submenu-trigger")
    );
    expect(reptiles.dom.trigger).toBe(reptiles.dom.controller);

    const linkClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    mammals.dom.controller.dispatchEvent(linkClick);

    expect(linkClick.defaultPrevented).toBe(false);
    expect(mammals.isExpanded).toBe(false);

    const controllerClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    reptiles.dom.controller.dispatchEvent(controllerClick);

    expect(controllerClick.defaultPrevented).toBe(true);
    expect(reptiles.isExpanded).toBe(true);

    menu.dispose();
  });

  it("should fall back to the controller in a nested menu", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    document.querySelector("a[href='#Cats'] .submenu-trigger").remove();
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTriggersSelector: ".submenu-trigger",
    });

    menu.initialize();

    const parent = menu.elements.submenuToggles[0];
    const submenu = parent.elements.controlledMenu;
    const child = submenu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(submenu.isInitialized).toBe(true);
    expect(console.error).not.toHaveBeenCalled();
    expect(menu.errors).toEqual([]);
    expect(child.dom.trigger).toBe(child.dom.controller);
    expect(parent.dom.trigger).toBe(
      parent.dom.controller.querySelector(".submenu-trigger")
    );

    parent.expand();
    child.dom.controller.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true })
    );

    expect(child.isExpanded).toBe(true);

    menu.dispose();
  });

  it("should use controllers when the trigger selector has no matches", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTriggersSelector: ".missing-trigger",
    });

    menu.initialize();

    const mammals = menu.elements.submenuToggles[0];
    const reptiles = menu.elements.submenuToggles[1];
    const cats = mammals.elements.controlledMenu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(console.error).not.toHaveBeenCalled();
    expect(menu.dom.submenuTriggers).toEqual([]);
    expect(mammals.dom.trigger).toBe(mammals.dom.controller);
    expect(reptiles.dom.trigger).toBe(reptiles.dom.controller);
    expect(cats.dom.trigger).toBe(cats.dom.controller);

    menu.dispose();
  });

  // Test that the BaseMenu will initialize if a valid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenuTogglesSelector and submenuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".dropdown-toggle",
      submenuItemsSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenuTogglesSelector and submenuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenusSelector and submenuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenusSelector: ".dropdown-menu",
      submenuItemsSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenusSelector and submenuItemsSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenusSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Class list tests.
  const classLists = ["expandClass", "collapseClass", "transitionClass"];

  // Test that the BaseMenu will initialize if valid class lists are passed.
  it.each(classLists)(
    "should initialize with a valid %s class list",
    (classList) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        [classList]: "test",
      });

      // Test that the menu initializes.
      expect(() => {
        menu.initialize();
      }).not.toThrow();
    }
  );

  // Test that the BaseMenu will throw an error if an invalid class list is passed.
  it.each(classLists)(
    "should report a validation failure if an invalid %s class list is passed",
    (classList) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        [classList]: 1,
      });

      // Test that the menu throws an error.

      menu.initialize();

      expect(console.error).toHaveBeenCalled();
    }
  );

  // Test that the BaseMenu will initialize if isTopLevel is true.
  it("should initialize if isTopLevel is true", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if isTopLevel not a boolean.
  it("should report a validation failure if isTopLevel is not a boolean", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and no parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if isTopLevel is false and a parentMenu is passed.
  it("should initialize if isTopLevel is false and a parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const parentMenu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
      parentMenu,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if isTopLevel is false and an invalid parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
      parentMenu: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid parentMenu is passed.
  it("should initialize if a valid parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const parentMenu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      parentMenu,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid parentMenu is passed.
  it("should report a validation failure if an invalid parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      parentMenu: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid hoverType is passed.
  const hoverTypes = ["on", "off", "dynamic"];
  it.each(hoverTypes)(
    'should initialize if "%s" is passed as the hoverType',
    () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        hoverType: "on",
      });

      // Test that the menu initializes.
      expect(() => {
        menu.initialize();
      }).not.toThrow();
    }
  );

  // Test that the BaseMenu will throw an error if an invalid hoverType is passed.
  it("should report a validation failure if an invalid hoverType is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      hoverType: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid hoverDelay is passed.
  it("should initialize if a valid hoverDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      hoverDelay: 1,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid hoverDelay is passed.
  it("should report a validation failure if an invalid hoverDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      hoverDelay: "1",
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid enterDelay is passed.
  it("should initialize if a valid enterDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      enterDelay: 1,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid enterDelay is passed.
  it("should report a validation failure if an invalid enterDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      enterDelay: "1",
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid leaveDelay is passed.
  it("should initialize if a valid leaveDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      leaveDelay: 1,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid leaveDelay is passed.
  it("should report a validation failure if an invalid leaveDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      leaveDelay: "1",
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid breakpoint is passed.
  it("should initialize if a valid breakpoint is passed", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      breakpoint: "40em",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid breakpoint is passed.
  it("should report a validation failure if an invalid breakpoint is passed", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      breakpoint: 40,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid mediaQuery is passed.
  it("should initialize if a valid mediaQuery is passed", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      mediaQuery: "(width <= 40em)",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid mediaQuery is passed.
  it("should report a validation failure if an invalid mediaQuery is passed", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      mediaQuery: 40,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid expandOutsideBreakpoint is passed.
  it("should initialize if a valid expandOutsideBreakpoint is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      expandOutsideBreakpoint: false,
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid expandOutsideBreakpoint is passed.
  it("should report a validation failure if an invalid expandOutsideBreakpoint is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      expandOutsideBreakpoint: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid prefix is passed.
  it("should initialize if a valid prefix is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      prefix: "test",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid prefix is passed.
  it("should report a validation failure if an invalid prefix is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      prefix: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the BaseMenu will initialize if a valid key is passed.
  it("should initialize if a valid key is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      key: "test",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid key is passed.
  it("should report a validation failure if an invalid key is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      key: 1,
    });

    // Test that the menu throws an error.

    menu.initialize();

    expect(console.error).toHaveBeenCalled();
  });
});
