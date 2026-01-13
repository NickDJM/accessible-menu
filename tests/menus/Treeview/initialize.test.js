/**
 * Initialization tests for the Treeview class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the Treeview class can be initialized.
 */

import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import { singleLevel, twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import { setupMatchMedia } from "../helpers.js";

let originalMatchMedia;

beforeAll(() => {
  // Mock the console.error method.
  console.error = vi.fn((error) => {
    throw new Error(error);
  });
});

afterAll(() => {
  // Restore the mocked method.
  vi.restoreAllMocks();
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
  originalMatchMedia = window.matchMedia;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
  window.matchMedia = originalMatchMedia;
});

// Test the Treeview initialization.
describe("Treeview", () => {
  // Test that the Treeview will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if no menuElement is passed.
  it("should throw an error if no menuElement is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({});
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the Treeview will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: 1,
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
    );
  });
});

// Test the Treeview initialization for a controlled menu.
describe("Treeview (controlled)", () => {
  // Test that the Treeview will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if no menuElement is passed.
  it("should throw an error if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the Treeview will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: 1,
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the Treeview will throw an error if no containerElement is passed when a controllerElement is.
  it("should throw an error if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the Treeview will throw an error if the containerElement is invalid when a controllerElement is.
  it("should throw an error if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: 1,
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the Treeview will throw an error if no controllerElement is passed when a containerElement is.
  it("should throw an error if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
      });
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the Treeview will throw an error if the controllerElement is invalid when a containerElement is.
  it("should throw an error if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: 1,
      });
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "number" given.'
    );
  });
});

// Test the Treeview media query handling.
describe("Treeview (media queries)", () => {
  it("should not call matchMedia when no breakpoint or mediaQuery is set", () => {
    const matchMedia = vi.fn();
    window.matchMedia = matchMedia;

    new Treeview({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("should auto open when the breakpoint media query does not match", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new Treeview({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      breakpoint: "40em",
      initialize: true,
    });

    expect(matchMedia).toHaveBeenCalledWith("(width <= 40em)");
    expect(menu.elements.controller.isOpen).toBe(true);
  });

  it("should not auto open when autoOpen is false", () => {
    const { matchMedia } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new Treeview({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      breakpoint: "40em",
      autoOpen: false,
      initialize: true,
    });

    expect(matchMedia).toHaveBeenCalledWith("(width <= 40em)");
    expect(menu.elements.controller.isOpen).toBe(false);
  });

  it("should close when the media query matches and the menu is open", () => {
    const { matchMedia, mql, listeners } = setupMatchMedia(false);
    window.matchMedia = matchMedia;

    const menu = new Treeview({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      mediaQuery: "(width <= 40em)",
      initialize: true,
    });

    expect(menu.elements.controller.isOpen).toBe(true);

    mql.matches = true;
    listeners.forEach((listener) => listener(mql));

    expect(menu.elements.controller.isOpen).toBe(false);
  });
});

// Test the Treeview initialization with custom arguments.
describe("Treeview (custom arguments)", () => {
  // Test that the Treeview will initialize if a valid menuItemsSelector is passed.
  it("should initialize with a valid menuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        menuItemsSelector: ".menu-item",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid menuItemsSelector is passed.
  it("should throw an error if an invalid menuItemsSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        menuItemsSelector: 1,
      });
    }).toThrow('menuItemsSelector must be a valid query selector. "1" given.');
  });

  // Test that the Treeview will initialize if a valid menuLinksSelector is passed.
  it("should initialize with a valid menuLinksSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        menuLinksSelector: ".menu-link",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid menuLinksSelector is passed.
  it("should throw an error if an invalid menuLinksSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        menuLinksSelector: 1,
      });
    }).toThrow('menuLinksSelector must be a valid query selector. "1" given.');
  });

  // Test that the Treeview will initialize if a valid submenuItemsSelector is passed.
  it("should initialize with a valid submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid submenuItemsSelector is passed.
  it("should throw an error if an invalid submenuItemsSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemsSelector: 1,
      });
    }).toThrow(
      'submenuItemsSelector must be a valid query selector. "1" given.'
    );
  });

  // Test that the Treeview will initialize if a valid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: ".dropdown-toggle",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid submenuTogglesSelector is passed when the submenuItemsSelector is also passed.
  it("should throw an error if an invalid submenuTogglesSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: 1,
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).toThrow(
      'submenuTogglesSelector must be a valid query selector. "1" given.'
    );
  });

  // Test that the Treeview will initialize if a valid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should initialize with a valid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenusSelector: ".dropdown-menu",
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid submenusSelector is passed when the submenuItemsSelector is also passed.
  it("should throw an error if an invalid submenusSelector and submenuItemsSelector", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        submenusSelector: 1,
        submenuItemsSelector: ".menu-item.dropdown",
      });
    }).toThrow('submenusSelector must be a valid query selector. "1" given.');
  });

  // Class list tests.
  const classLists = ["openClass", "closeClass", "transitionClass"];

  // Test that the Treeview will initialize if valid class lists are passed.
  it.each(classLists)(
    "should initialize with a valid %s class list",
    (classList) => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new Treeview instance for testing.
        new Treeview({
          menuElement: document.querySelector("ul"),
          [classList]: "test",
        });
      }).not.toThrow();
    }
  );

  // Test that the Treeview will throw an error if an invalid class list is passed.
  it.each(classLists)(
    "should throw an error if an invalid %s class list is passed",
    (classList) => {
      // Test that the menu throws an error.
      expect(() => {
        // Create a new Treeview instance for testing.
        new Treeview({
          menuElement: document.querySelector("ul"),
          [classList]: 1,
        });
      }).toThrow(
        `${classList} must be a string or an array of strings. "number" given.`
      );
    }
  );

  // Test that the Treeview will initialize if isTopLevel is true.
  it("should initialize if isTopLevel is true", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        isTopLevel: true,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if isTopLevel not a boolean.
  it("should throw an error if isTopLevel is not a boolean", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        isTopLevel: 1,
      });
    }).toThrow('isTopLevel must be a boolean. "number" given.');
  });

  // Test that the Treeview will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should throw an error if isTopLevel is false and no parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
      });
    }).toThrow("Cannot find root menu.");
  });

  // Test that the Treeview will initialize if isTopLevel is false and a parentMenu is passed.
  it("should initialize if isTopLevel is false and a parentMenu is passed", () => {
    // Create a new Treeview instance for testing.
    const parentMenu = new Treeview({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new Treeview({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if isTopLevel is false and an invalid parentMenu is passed.
  it("should throw an error if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu: 1,
      });
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
  });

  // Test that the Treeview will initialize if a valid parentMenu is passed.
  it("should initialize if a valid parentMenu is passed", () => {
    // Create a new Treeview instance for testing.
    const parentMenu = new Treeview({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new Treeview({
        menuElement: document.querySelector("ul"),
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid parentMenu is passed.
  it("should throw an error if an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        parentMenu: 1,
      });
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
  });

  // Test that the Treeview will initialize if a valid hoverType is passed.
  const hoverTypes = ["on", "off", "dynamic"];
  it.each(hoverTypes)(
    'should initialize if "%s" is passed as the hoverType',
    () => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new Treeview instance for testing.
        new Treeview({
          menuElement: document.querySelector("ul"),
          hoverType: "on",
        });
      }).not.toThrow();
    }
  );

  // Test that the Treeview will throw an error if an invalid hoverType is passed.
  it("should throw an error if an invalid hoverType is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        hoverType: 1,
      });
    }).toThrow(
      'hoverType must be one of the following values: off, on, dynamic. "1" given.'
    );
  });

  // Test that the Treeview will initialize if a valid hoverDelay is passed.
  it("should initialize if a valid hoverDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        hoverDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid hoverDelay is passed.
  it("should throw an error if an invalid hoverDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        hoverDelay: "1",
      });
    }).toThrow('hoverDelay must be a number. "string" given.');
  });

  // Test that the Treeview will initialize if a valid enterDelay is passed.
  it("should initialize if a valid enterDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        enterDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid enterDelay is passed.
  it("should throw an error if an invalid enterDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        enterDelay: "1",
      });
    }).toThrow('enterDelay must be a number. "string" given.');
  });

  // Test that the Treeview will initialize if a valid leaveDelay is passed.
  it("should initialize if a valid leaveDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        leaveDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid leaveDelay is passed.
  it("should throw an error if an invalid leaveDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        leaveDelay: "1",
      });
    }).toThrow('leaveDelay must be a number. "string" given.');
  });

  // Test that the Treeview will initialize if a valid prefix is passed.
  it("should initialize if a valid prefix is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        prefix: "test",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid prefix is passed.
  it("should throw an error if an invalid prefix is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        prefix: 1,
      });
    }).toThrow('TypeError: prefix must be a string. "number" given.');
  });

  // Test that the Treeview will initialize if a valid key is passed.
  it("should initialize if a valid key is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        key: "test",
      });
    }).not.toThrow();
  });

  // Test that the Treeview will throw an error if an invalid key is passed.
  it("should throw an error if an invalid key is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new Treeview instance for testing.
      new Treeview({
        menuElement: document.querySelector("ul"),
        key: 1,
      });
    }).toThrow('TypeError: key must be a string. "number" given.');
  });
});

// Treeview controlled initialization tests.
describe("Treeview (controlled initialization)", () => {
  // Test that the menu will initialize if initialize is set to true.
  it("should initialize if initialize is set to true", () => {
    // Mock the initialize method.
    Treeview.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(Treeview.prototype, "initialize");

    // Create a new Treeview instance for testing.
    new Treeview({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    // Test that the initialize method was called.
    expect(Treeview.prototype.initialize).toHaveBeenCalled();
  });

  // Test that the menu will not initialize if initialize is set to false.
  it("should not initialize if initialize is set to false", () => {
    // Mock the initialize method.
    Treeview.prototype.initialize = vi.fn();

    // Spy on the initialize method.
    vi.spyOn(Treeview.prototype, "initialize");

    // Create a new Treeview instance for testing.
    new Treeview({
      menuElement: document.querySelector("ul"),
      initialize: false,
    });

    // Test that the initialize method was not called.
    expect(Treeview.prototype.initialize).not.toHaveBeenCalled();
  });
});
