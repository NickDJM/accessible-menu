/**
 * Initialization tests for the TopLinkDisclosureMenu class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the TopLinkDisclosureMenu class can be initialized.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { singleLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { setupMatchMedia } from "../helpers.js";

let originalMatchMedia;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosureTopLink;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  vi.restoreAllMocks();
  // Remove the test menu.
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test the TopLinkDisclosureMenu initialization.
describe("TopLinkDisclosureMenu", () => {
  // Test that the TopLinkDisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({});

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });
});

// Test the TopLinkDisclosureMenu initialization for a controlled menu.
describe("TopLinkDisclosureMenu (controlled)", () => {
  // Test that the TopLinkDisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if no menuElement is passed.
  it("should report a validation failure if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if the menuElement is invalid.
  it("should report a validation failure if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: 1,
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if no containerElement is passed when a controllerElement is.
  it("should report a validation failure if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if the containerElement is invalid when a controllerElement is.
  it("should report a validation failure if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: 1,
      controllerElement: document.querySelector("button"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if no controllerElement is passed when a containerElement is.
  it("should report a validation failure if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if the controllerElement is invalid when a containerElement is.
  it("should report a validation failure if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });
});

// Test the TopLinkDisclosureMenu media query handling.
describe("TopLinkDisclosureMenu (media queries)", async () => {
  it("should not call matchMedia when no breakpoint or mediaQuery is set", () => {
    const matchMedia = vi.fn();
    window.matchMedia = matchMedia;

    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("should auto open when the breakpoint media query does not match", async () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new TopLinkDisclosureMenu({
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

    const menu = new TopLinkDisclosureMenu({
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

    const menu = new TopLinkDisclosureMenu({
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

// Test the TopLinkDisclosureMenu initialization with custom arguments.
describe("TopLinkDisclosureMenu (custom arguments)", () => {
  // Test that the TopLinkDisclosureMenu will initialize if a valid menuItemsSelector is passed.
  it("should initialize with a valid menuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuItemsSelector: ".menu-item",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid menuItemsSelector is passed.
  it("should report a validation failure if an invalid menuItemsSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      menuItemsSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid menuLinksSelector is passed.
  it("should initialize with a valid menuLinksSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuLinksSelector: ".menu-link",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid menuLinksSelector is passed.
  it("should report a validation failure if an invalid menuLinksSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      menuLinksSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid submenuItemsSelector is passed.
  it("should initialize with a valid submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid submenuItemsSelector is passed.
  it("should report a validation failure if an invalid submenuItemsSelector is passed", () => {
    // Test that the menu throws an error.

    // Create the TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuItemsSelector: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: ".dropdown-toggle",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.

    // Create the TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenusSelector: ".dropdown-menu",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should report a validation failure if an invalid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.

    // Create the TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenusSelector: 1,
      submenuItemsSelector: ".menu-item.dropdown",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Class list tests.
  const classLists = ["expandClass", "collapseClass", "transitionClass"];

  // Test that the TopLinkDisclosureMenu will initialize if valid class lists are passed.
  it.each(classLists)(
    "should initialize with a valid %s class list",
    (classList) => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          [classList]: "test",
        });
      }).not.toThrow();
    }
  );

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid class list is passed.
  it.each(classLists)(
    "should report a validation failure if an invalid %s class list is passed",
    (classList) => {
      // Test that the menu throws an error.

      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        [classList]: 1,
      });

      expect(console.error).toHaveBeenCalled();
    }
  );

  // Test that the TopLinkDisclosureMenu will initialize if isTopLevel is true.
  it("should initialize if isTopLevel is true", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: true,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if isTopLevel not a boolean.
  it("should report a validation failure if isTopLevel is not a boolean", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and no parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if isTopLevel is false and a parentMenu is passed.
  it("should initialize if isTopLevel is false and a parentMenu is passed", () => {
    // Create a new TopLinkDisclosureMenu instance for testing.
    const parentMenu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if isTopLevel is false and an invalid parentMenu is passed.
  it("should report a validation failure if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
      parentMenu: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid parentMenu is passed.
  it("should initialize if a valid parentMenu is passed", () => {
    // Create a new TopLinkDisclosureMenu instance for testing.
    const parentMenu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid parentMenu is passed.
  it("should report a validation failure if an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      parentMenu: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid hoverType is passed.
  const hoverTypes = ["on", "off", "dynamic"];
  it.each(hoverTypes)(
    'should initialize if "%s" is passed as the hoverType',
    () => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          hoverType: "on",
        });
      }).not.toThrow();
    }
  );

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid hoverType is passed.
  it("should report a validation failure if an invalid hoverType is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      hoverType: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid hoverDelay is passed.
  it("should initialize if a valid hoverDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        hoverDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid hoverDelay is passed.
  it("should report a validation failure if an invalid hoverDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      hoverDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid enterDelay is passed.
  it("should initialize if a valid enterDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        enterDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid enterDelay is passed.
  it("should report a validation failure if an invalid enterDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      enterDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid leaveDelay is passed.
  it("should initialize if a valid leaveDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        leaveDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid leaveDelay is passed.
  it("should report a validation failure if an invalid leaveDelay is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      leaveDelay: "1",
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid prefix is passed.
  it("should initialize if a valid prefix is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        prefix: "test",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid prefix is passed.
  it("should report a validation failure if an invalid prefix is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      prefix: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid key is passed.
  it("should initialize if a valid key is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        key: "test",
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid key is passed.
  it("should report a validation failure if an invalid key is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      key: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });

  // Test that the TopLinkDisclosureMenu will initialize if a valid optionalKeySupport is passed.
  it("should initialize if a valid optionalKeySupport is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        optionalKeySupport: true,
      });
    }).not.toThrow();
  });

  // Test that the TopLinkDisclosureMenu will throw an error if an invalid optionalKeySupport is passed.
  it("should report a validation failure if an invalid optionalKeySupport is passed", () => {
    // Test that the menu throws an error.

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      optionalKeySupport: 1,
    });

    expect(console.error).toHaveBeenCalled();
  });
});

// TopLinkDisclosureMenu controlled initialization tests.
describe("TopLinkDisclosureMenu (controlled initialization)", () => {
  // Test that the menu will initialize if initialize is set to true.
  it("should initialize if initialize is set to true", () => {
    // Mock the initialize method.
    TopLinkDisclosureMenu.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(TopLinkDisclosureMenu.prototype, "initialize");

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    // Test that the initialize method was called.
    expect(TopLinkDisclosureMenu.prototype.initialize).toHaveBeenCalled();
  });

  // Test that the menu will not initialize if initialize is set to false.
  it("should not initialize if initialize is set to false", () => {
    // Mock the initialize method.
    TopLinkDisclosureMenu.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(TopLinkDisclosureMenu.prototype, "initialize");

    // Create a new TopLinkDisclosureMenu instance for testing.
    new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: false,
    });

    // Test that the initialize method was not called.
    expect(TopLinkDisclosureMenu.prototype.initialize).not.toHaveBeenCalled();
  });
});
