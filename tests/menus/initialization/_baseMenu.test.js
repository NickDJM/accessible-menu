/**
 * Test the TestBaseMenu class to make sure it can initialize under various scenarios.
 *
 * @jest-environment jsdom
 */

/* eslint-disable no-new */

import { TestBaseMenu } from "../../_testBaseMenu";
import { oneLevelMenu } from "../../test-menus";

describe("BaseMenu initialization tests", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;
  const menuElement = document.querySelector("#menu-0");
  const containerElement = document.querySelector("nav");
  const controllerElement = document.querySelector("#toggle-0");

  // CSS selectors for testing.
  const basicCSSSelectors = [
    "menuItemSelector",
    "menuLinkSelector",
    "submenuItemSelector",
  ];

  // Class lists for testing.
  const classLists = ["openClass", "closeClass"];

  test("won't initialize if nothing is passed", () => {
    expect(() => {
      new TestBaseMenu();
    }).toThrow("Cannot read property 'menuElement' of undefined");
  });

  test("won't initialize if no menuElement is passed", () => {
    expect(() => {
      new TestBaseMenu({});
    }).toThrow(
      "AccessibleMenu: menuElement must be an instance of HTMLElement. undefined given."
    );
  });

  test("won't initialize if menuElement isn't an HTMLElement", () => {
    expect(() => {
      new TestBaseMenu({ menuElement: {} });
    }).toThrow(
      "AccessibleMenu: menuElement must be an instance of HTMLElement. object given."
    );
  });

  test.each(basicCSSSelectors)(
    "won't initialize if %s isn't a CSS selector",
    (selector) => {
      expect(() => {
        const params = {
          menuElement,
        };
        params[selector] = 123;

        new TestBaseMenu(params);
      }).toThrow(
        `AccessibleMenu: ${selector} must be a valid CSS selector. "123" given.`
      );
    }
  );

  test("won't initialize if submenuItemSelector is provided and submenuToggleSelector isn't a CSS selector", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        submenuItemSelector: "li.dropdown",
        submenuToggleSelector: 123,
      });
    }).toThrow(
      'AccessibleMenu: submenuToggleSelector must be a valid CSS selector. "123" given.'
    );
  });

  test("won't initialize if submenuItemSelector is provided and submenuSelector isn't a CSS selector", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        submenuItemSelector: "li.dropdown",
        submenuSelector: 123,
      });
    }).toThrow(
      'AccessibleMenu: submenuSelector must be a valid CSS selector. "123" given.'
    );
  });

  test("will initialize if controllerElement and containerElement are HTMLELements", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        containerElement,
        controllerElement,
      });
    }).not.toThrow(Error);
  });

  test("won't initialize if controllerElement is provided without containerElement", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        controllerElement,
      });
    }).toThrow(
      "AccessibleMenu: containerElement must be an instance of HTMLElement. object given."
    );
  });

  test("won't initialize if containerElement is provided without containerElement", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        containerElement,
      });
    }).toThrow(
      "AccessibleMenu: controllerElement must be an instance of HTMLElement. object given."
    );
  });

  test("won't initialize if controllerElement is isn't an HTMLElement", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        controllerElement: 123,
        containerElement,
      });
    }).toThrow(
      "AccessibleMenu: controllerElement must be an instance of HTMLElement. number given."
    );
  });

  test("won't initialize if containerElement is isn't an HTMLElement", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        controllerElement,
        containerElement: 123,
      });
    }).toThrow(
      "AccessibleMenu: containerElement must be an instance of HTMLElement. number given."
    );
  });

  test.each(classLists)(
    "won't initialize if %s is not a valid class list",
    (classList) => {
      expect(() => {
        const params = {
          menuElement,
        };
        params[classList] = 123;

        new TestBaseMenu(params);
      }).toThrow(
        `AccessibleMenu: ${classList} must be a string or an array of strings. number given.`
      );
      expect(() => {
        const params = {
          menuElement,
        };
        params[classList] = [123, "class"];

        new TestBaseMenu(params);
      }).toThrow(
        `AccessibleMenu: ${classList} must be a string or an array of strings. An array containing non-strings given.`
      );
    }
  );

  test("won't initialize if isTopLevel isn't a boolean", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        isTopLevel: 123,
      });
    }).toThrow("AccessibleMenu: isTopLevel must be a boolean. number given.");
  });

  test("will initialize if parentMenu a TestBaseMenu", () => {
    expect(() => {
      const parentMenu = new TestBaseMenu({ menuElement });
      new TestBaseMenu({
        menuElement,
        parentMenu,
      });
    }).not.toThrow(Error);
  });

  test("won't initialize if parentMenu isn't a TestBaseMenu or null", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        parentMenu: "parent menu",
      });
    }).toThrow(
      "AccessibleMenu: parentMenu must be an instance of BaseMenu. string given."
    );
  });

  test("won't initialize if hoverType is invalid", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        hoverType: "fake",
      });
    }).toThrow(
      'AccessibleMenu: hoverType must be one of the following values: off, on, dynamic. "fake" given.'
    );
  });

  test("won't initialize if hoverDelay is invalid", () => {
    expect(() => {
      new TestBaseMenu({
        menuElement,
        hoverDelay: "250",
      });
    }).toThrow("AccessibleMenu: hoverDelay must be a number. string given.");
  });
});
