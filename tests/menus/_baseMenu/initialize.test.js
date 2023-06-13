/**
 * Initialization tests for the BaseMenu class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the BaseMenu class can be initialized.
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
import BaseMenu from "../../../src/_baseMenu.js";

beforeAll(() => {
  // Mock the console.error method.
  console.error = vi.fn((error) => {
    throw new Error(error);
  });
});

afterAll(() => {
  // Restore the console.error method.
  console.error = vi.restoreAllMocks();
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
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
  it("should throw an error if no menuElement is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({});

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the BaseMenu will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
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
  it("should throw an error if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the BaseMenu will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: 1,
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the BaseMenu will throw an error if no containerElement is passed when a controllerElement is.
  it("should throw an error if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the BaseMenu will throw an error if the containerElement is invalid when a controllerElement is.
  it("should throw an error if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: 1,
      controllerElement: document.querySelector("button"),
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the BaseMenu will throw an error if no controllerElement is passed when a containerElement is.
  it("should throw an error if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the BaseMenu will throw an error if the controllerElement is invalid when a containerElement is.
  it("should throw an error if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "number" given.'
    );
  });
});

// Test the BaseMenu initialization with custom arguments.
describe("BaseMenu (custom arguments)", () => {
  // Test that the BaseMenu will initialize if a valid menuItemSelector is passed.
  it("should initialize with a valid menuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuItemSelector: ".menu-item",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid menuItemSelector is passed.
  it("should throw an error if an invalid menuItemSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuItemSelector: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('menuItemSelector must be a valid CSS selector. "1" given.');
  });

  // Test that the BaseMenu will initialize if a valid menuLinkSelector is passed.
  it("should initialize with a valid menuLinkSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuLinkSelector: ".menu-link",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid menuLinkSelector is passed.
  it("should throw an error if an invalid menuLinkSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      menuLinkSelector: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('menuLinkSelector must be a valid CSS selector. "1" given.');
  });

  // Test that the BaseMenu will initialize if a valid submenuItemSelector is passed.
  it("should initialize with a valid submenuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuItemSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenuItemSelector is passed.
  it("should throw an error if an invalid submenuItemSelector is passed", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuItemSelector: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('submenuItemSelector must be a valid CSS selector. "1" given.');
  });

  // Test that the BaseMenu will initialize if a valid submenuToggleSelector is passed when the submenuItemSelector is also passed.
  it("should initialize with a valid submenuToggleSelector and submenuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuToggleSelector: ".dropdown-toggle",
      submenuItemSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenuToggleSelector is passed when the submenuItemSelector is also passed.
  it("should throw an error if an invalid submenuToggleSelector and submenuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuToggleSelector: 1,
      submenuItemSelector: ".menu-item.dropdown",
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'submenuToggleSelector must be a valid CSS selector. "1" given.'
    );
  });

  // Test that the BaseMenu will initialize if a valid submenuSelector is passed when the submenuItemSelector is also passed.
  it("should initialize with a valid submenuSelector and submenuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuSelector: ".dropdown-menu",
      submenuItemSelector: ".menu-item.dropdown",
    });

    // Test that the menu initializes.
    expect(() => {
      menu.initialize();
    }).not.toThrow();
  });

  // Test that the BaseMenu will throw an error if an invalid submenuSelector is passed when the submenuItemSelector is also passed.
  it("should throw an error if an invalid submenuSelector and submenuItemSelector", () => {
    // Create the BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuSelector: 1,
      submenuItemSelector: ".menu-item.dropdown",
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('submenuSelector must be a valid CSS selector. "1" given.');
  });

  // Class list tests.
  const classLists = ["openClass", "closeClass", "transitionClass"];

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
    "should throw an error if an invalid %s class list is passed",
    (classList) => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        [classList]: 1,
      });

      // Test that the menu throws an error.
      expect(() => {
        menu.initialize();
      }).toThrow(
        `${classList} must be a string or an array of strings. "number" given.`
      );
    }
  );

  // Thest that the BaseMenu will initialize if isTopLevel is true.
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
  it("should throw an error if isTopLevel is not a boolean", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('isTopLevel must be a boolean. "number" given.');
  });

  // Test that the BaseMenu will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should throw an error if isTopLevel is false and no parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow("Cannot find root menu.");
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
  it("should throw an error if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: false,
      parentMenu: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
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
  it("should throw an error if an invalid parentMenu is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      parentMenu: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
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
  it("should throw an error if an invalid hoverType is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      hoverType: 1,
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow(
      'hoverType must be one of the following values: off, on, dynamic. "1" given.'
    );
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
  it("should throw an error if an invalid hoverDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      hoverDelay: "1",
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('hoverDelay must be a number. "string" given.');
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
  it("should throw an error if an invalid enterDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      enterDelay: "1",
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('enterDelay must be a number. "string" given.');
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
  it("should throw an error if an invalid leaveDelay is passed", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      leaveDelay: "1",
    });

    // Test that the menu throws an error.
    expect(() => {
      menu.initialize();
    }).toThrow('leaveDelay must be a number. "string" given.');
  });
});
