/**
 * Initialization tests for the DisclosureMenu class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the Disclosure class can be initialized.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  threeLevelWithTriggers,
  singleLevel,
  twoLevelDisclosure,
  twoLevel,
} from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { setupMatchMedia } from "../helpers.js";

let originalMatchMedia;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosure;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.restoreAllMocks();
  // Remove the test menu.
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test the DisclosureMenu initialization.
describe("DisclosureMenu", () => {
  it("should pass submenuTriggersSelector to nested toggles", () => {
    document.body.innerHTML = threeLevelWithTriggers;
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
      submenuSubtogglesSelector: "a",
      submenuTriggersSelector: ".submenu-trigger",
    });
    const toggle = menu.elements.submenuToggles[0];
    const childToggle =
      toggle.elements.controlledMenu.elements.submenuToggles[0];

    expect(menu.isInitialized).toBe(true);
    expect(toggle.dom.trigger).toBe(
      toggle.dom.controller.querySelector(".submenu-trigger")
    );
    expect(childToggle.dom.trigger).toBe(
      childToggle.dom.controller.querySelector(".submenu-trigger")
    );

    menu.dispose();
  });

  // Test that the DisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({});

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  describe("nested menus", () => {
    beforeEach(() => {
      document.body.innerHTML = twoLevel;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      document.body.innerHTML = "";
    });

    it("should register root interaction handlers once", () => {
      const click = vi.spyOn(DisclosureMenu.prototype, "_handleClick");
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      const rootCalls = click.mock.contexts.filter(
        (context) => context === menu
      );

      expect(rootCalls).toHaveLength(1);
    });

    it("should not rerun root setup for a child's bubbling initialization", () => {
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });
      const listenerCount = menu.listeners.length;
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;

      child._dispatchEvent("initialize");

      expect(menu.listeners).toHaveLength(listenerCount);
    });

    it("should initialize every submenu", () => {
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      expect(
        menu.elements.submenuToggles.every(
          (toggle) =>
            toggle.isInitialized && toggle.elements.controlledMenu.isInitialized
        )
      ).toBe(true);
    });

    it("should preserve an unfocused root during initialization", () => {
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      expect(menu.focusState).toBe("none");
    });

    it.each([
      ["root", "transition", 250],
      ["root", "expand", 321],
      ["root", "collapse", 654],
      ["submenu", "transition", 250],
      ["submenu", "expand", 321],
      ["submenu", "collapse", 654],
    ])(
      "should initialize %s %s CSS duration using the configured prefix",
      (level, action, value) => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
          prefix: "audit-",
          expandDuration: 321,
          collapseDuration: 654,
        });
        const target =
          level === "root"
            ? menu
            : menu.elements.submenuToggles[0].elements.controlledMenu;
        const property =
          action === "transition"
            ? "--audit-transition-duration"
            : `--audit-${action}-transition-duration`;

        expect(target.dom.menu.style.getPropertyValue(property)).toBe(
          `${value}ms`
        );
      }
    );
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
        const menu = new DisclosureMenu({
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

// Test the DisclosureMenu initialization for a controlled menu.
describe("DisclosureMenu (controlled)", () => {
  // Test that the DisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: 1,
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if no containerElement is passed when a controllerElement is.
  it("should report a validation failure if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if the containerElement is invalid when a controllerElement is.
  it("should report a validation failure if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: 1,
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if no controllerElement is passed when a containerElement is.
  it("should report a validation failure if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error if the controllerElement is invalid when a containerElement is.
  it("should report a validation failure if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });
});

// Test the DisclosureMenu media query handling.
describe("DisclosureMenu (media queries)", async () => {
  it("should not call matchMedia when no breakpoint or mediaQuery is set", () => {
    const matchMedia = vi.fn();
    window.matchMedia = matchMedia;

    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("should auto open when the breakpoint media query does not match", async () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      breakpoint: "40em",
      expandOutsideBreakpoint: true,
      collapseInsideBreakpoint: true,
      initialize: true,
    });

    expect(matchMedia).toHaveBeenCalledWith("(width <= 40em)");
    await new Promise(requestAnimationFrame);

    expect(menu.elements.controller.isExpanded).toBe(true);
  });

  it("should not auto open when expandOutsideBreakpoint is false", async () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      breakpoint: "40em",
      expandOutsideBreakpoint: false,
      initialize: true,
    });

    expect(matchMedia).toHaveBeenCalledWith("(width <= 40em)");
    await new Promise(requestAnimationFrame);

    expect(menu.elements.controller.isExpanded).toBe(false);
  });

  it("should close when the media query matches and the menu is open", async () => {
    const { matchMedia, mql, listeners } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      mediaQuery: "(width <= 40em)",
      expandOutsideBreakpoint: true,
      collapseInsideBreakpoint: true,
      initialize: true,
    });

    await new Promise(requestAnimationFrame);

    expect(menu.elements.controller.isExpanded).toBe(true);

    mql.matches = true;
    listeners.forEach((listener) => listener(mql));

    await new Promise(requestAnimationFrame);

    expect(menu.elements.controller.isExpanded).toBe(false);
  });
});

// Test the DisclosureMenu initialization with custom arguments.
describe("DisclosureMenu (custom arguments)", () => {
  // Test that the DisclosureMenu will initialize if a valid menuItemsSelector is passed.
  it("should initialize with a valid menuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuItemsSelector: ".menu-item",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid menuItemsSelector is passed.
  it("should report a validation failure if an invalid menuItemsSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      menuItemsSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid menuLinksSelector is passed.
  it("should initialize with a valid menuLinksSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuLinksSelector: ".menu-link",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid menuLinksSelector is passed.
  it("should report a validation failure if an invalid menuLinksSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      menuLinksSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid submenuItemsSelector is passed.
  it("should initialize with a valid submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenuItemsSelector is passed.
  it("should report a validation failure if an invalid submenuItemsSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuItemsSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: ".dropdown-toggle",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.

    // Create the DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenusSelector: ".dropdown-menu",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.

    // Create the DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenusSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Class list tests.
  const classLists = ["expandClass", "collapseClass", "transitionClass"];

  // Test that the DisclosureMenu will initialize if valid class lists are passed.
  it.each(classLists)(
    "should initialize with a valid %s class list",
    (classList) => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new DisclosureMenu instance for testing.
        new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          [classList]: "test",
        });
      }).not.toThrow();
    }
  );

  // Test that the DisclosureMenu will throw an error if an invalid class list is passed.
  it.each(classLists)(
    "should report a validation failure if an invalid %s class list is passed",
    (classList) => {
      // Test that the menu throws an error.

      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        [classList]: 1,
      });

      expect(console.error).toHaveBeenCalled();
    }
  );

  // Test that the DisclosureMenu will initialize if isTopLevel is true.
  it("should initialize if isTopLevel is true", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: true,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if isTopLevel not a boolean.
  it("should report a validation failure if isTopLevel is not a boolean", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and no parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if isTopLevel is false and a parentMenu is passed.
  it("should initialize if isTopLevel is false and a parentMenu is passed", () => {
    // Create a new DisclosureMenu instance for testing.
    const parentMenu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if isTopLevel is false and an invalid parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
      parentMenu: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid parentMenu is passed.
  it("should initialize if a valid parentMenu is passed", () => {
    // Create a new DisclosureMenu instance for testing.
    const parentMenu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid parentMenu is passed.
  it("should report a validation failure if an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      parentMenu: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid hoverType is passed.
  const hoverTypes = ["on", "off", "dynamic"];
  it.each(hoverTypes)(
    'should initialize if "%s" is passed as the hoverType',
    () => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new DisclosureMenu instance for testing.
        new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          hoverType: "on",
        });
      }).not.toThrow();
    }
  );

  // Test that the DisclosureMenu will throw an error if an invalid hoverType is passed.
  it("should report a validation failure if an invalid hoverType is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      hoverType: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid hoverDelay is passed.
  it("should initialize if a valid hoverDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        hoverDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid hoverDelay is passed.
  it("should report a validation failure if an invalid hoverDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      hoverDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid enterDelay is passed.
  it("should initialize if a valid enterDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        enterDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid enterDelay is passed.
  it("should report a validation failure if an invalid enterDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      enterDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid leaveDelay is passed.
  it("should initialize if a valid leaveDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        leaveDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid leaveDelay is passed.
  it("should report a validation failure if an invalid leaveDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      leaveDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid prefix is passed.
  it("should initialize if a valid prefix is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        prefix: "test",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid prefix is passed.
  it("should report a validation failure if an invalid prefix is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      prefix: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid key is passed.
  it("should initialize if a valid key is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        key: "test",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid key is passed.
  it("should report a validation failure if an invalid key is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      key: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the DisclosureMenu will initialize if a valid optionalKeySupport is passed.
  it("should initialize if a valid optionalKeySupport is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        optionalKeySupport: true,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid optionalKeySupport is passed.
  it("should report a validation failure if an invalid optionalKeySupport is passed", () => {
    // Test that the menu throws an error.

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      optionalKeySupport: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });
});

// DisclosureMenu controlled initialization tests.
describe("DisclosureMenu (controlled initialization)", () => {
  // Test that the menu will initialize if initialize is set to true.
  it("should initialize if initialize is set to true", () => {
    // Mock the initialize method.
    DisclosureMenu.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(DisclosureMenu.prototype, "initialize");

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    // Test that the initialize method was called.
    expect(DisclosureMenu.prototype.initialize).toHaveBeenCalled();
  });

  // Test that the menu will not initialize if initialize is set to false.
  it("should not initialize if initialize is set to false", () => {
    // Mock the initialize method.
    DisclosureMenu.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(DisclosureMenu.prototype, "initialize");

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: false,
    });

    // Test that the initialize method was not called.
    expect(DisclosureMenu.prototype.initialize).not.toHaveBeenCalled();
  });
});
