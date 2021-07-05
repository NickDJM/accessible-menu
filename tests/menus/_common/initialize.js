/**
 * Reusable initialization tests.
 *
 * @jest-environment jsdom
 */
/* eslint-disable no-new */

import { oneLevelMenu } from "../../test-menus";

/**
 * A set of default initialization tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function defaultInitialization(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} default initialization`, () => {
    // Mock console.error.
    console.error = jest.fn((error) => {
      throw new Error(error.message);
    });

    // Set up the DOM.
    document.body.innerHTML = oneLevelMenu;
    const options = {
      menuElement: document.querySelector("#menu-0"),
    };

    test("will pass if menuElement is an HTMLElement", () => {
      expect(() => {
        new MenuClass(options);
      }).not.toThrow();
    });

    test("will fail if menuElement is not an HTMLElement", () => {
      expect(() => {
        new MenuClass({ menuElement: null });
      }).toThrow(
        "AccessibleMenu: menuElement must be an instance of HTMLElement. object given."
      );
    });
    test("will fail if menuElement is not passed", () => {
      expect(() => {
        new MenuClass({});
      }).toThrow(
        "AccessibleMenu: menuElement must be an instance of HTMLElement. undefined given."
      );
    });
  });
}

/**
 * A set of controlled menu initialization tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function controlledMenu(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} controlled menu initialization`, () => {
    // Mock console.error.
    console.error = jest.fn((error) => {
      throw new Error(error.message);
    });

    // Set up the DOM.
    document.body.innerHTML = oneLevelMenu;
    const menuElement = document.querySelector("#menu-0");
    const containerElement = document.querySelector("nav");
    const controllerElement = document.querySelector("#toggle-0");

    test("will pass if controllerElement and containerElement are HTMLELements", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          containerElement,
          controllerElement,
        });
      }).not.toThrow(Error);
    });

    test("will fail if controllerElement is provided without containerElement", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          controllerElement,
        });
      }).toThrow(
        "AccessibleMenu: containerElement must be an instance of HTMLElement. object given."
      );
    });

    test("will fail if containerElement is provided without controllerElement", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          containerElement,
        });
      }).toThrow(
        "AccessibleMenu: controllerElement must be an instance of HTMLElement. object given."
      );
    });

    test("will fail if controllerElement is isn't an HTMLElement", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          controllerElement: 123,
          containerElement,
        });
      }).toThrow(
        "AccessibleMenu: controllerElement must be an instance of HTMLElement. number given."
      );
    });

    test("will fail if containerElement is isn't an HTMLElement", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          controllerElement,
          containerElement: 123,
        });
      }).toThrow(
        "AccessibleMenu: containerElement must be an instance of HTMLElement. number given."
      );
    });
  });
}

/**
 * A set of customized menu initialization tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function customizedMenu(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} custom initialization`, () => {
    // Mock console.error.
    console.error = jest.fn((error) => {
      throw new Error(error.message);
    });

    // Set up the DOM.
    document.body.innerHTML = oneLevelMenu;
    const menuElement = document.querySelector("#menu-0");

    // CSS selectors for testing.
    const basicCSSSelectors = [
      "menuItemSelector",
      "menuLinkSelector",
      "submenuItemSelector",
    ];

    // Class lists for testing.
    const classLists = ["openClass", "closeClass"];

    test.each(basicCSSSelectors)(
      "will fail if %s isn't a CSS selector",
      (selector) => {
        expect(() => {
          const params = {
            menuElement,
          };
          params[selector] = 123;

          new MenuClass(params);
        }).toThrow(
          `AccessibleMenu: ${selector} must be a valid CSS selector. "123" given.`
        );
      }
    );

    test("will fail if submenuItemSelector is provided and submenuToggleSelector isn't a CSS selector", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          submenuItemSelector: "li.dropdown",
          submenuToggleSelector: 123,
        });
      }).toThrow(
        'AccessibleMenu: submenuToggleSelector must be a valid CSS selector. "123" given.'
      );
    });

    test("will fail if submenuItemSelector is provided and submenuSelector isn't a CSS selector", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          submenuItemSelector: "li.dropdown",
          submenuSelector: 123,
        });
      }).toThrow(
        'AccessibleMenu: submenuSelector must be a valid CSS selector. "123" given.'
      );
    });

    test.each(classLists)(
      "will fail if %s is not a valid class list",
      (classList) => {
        expect(() => {
          const params = {
            menuElement,
          };
          params[classList] = 123;

          new MenuClass(params);
        }).toThrow(
          `AccessibleMenu: ${classList} must be a string or an array of strings. number given.`
        );
        expect(() => {
          const params = {
            menuElement,
          };
          params[classList] = [123, "class"];

          new MenuClass(params);
        }).toThrow(
          `AccessibleMenu: ${classList} must be a string or an array of strings. An array containing non-strings given.`
        );
      }
    );

    test("will fail if isTopLevel isn't a boolean", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          isTopLevel: 123,
        });
      }).toThrow("AccessibleMenu: isTopLevel must be a boolean. number given.");
    });

    test(`will pass if parentMenu a ${menuType}`, () => {
      expect(() => {
        const parentMenu = new MenuClass({ menuElement });
        new MenuClass({
          menuElement,
          parentMenu,
        });
      }).not.toThrow(Error);
    });

    test(`will fail if parentMenu isn't a ${menuType} or null`, () => {
      expect(() => {
        new MenuClass({
          menuElement,
          parentMenu: "parent menu",
        });
      }).toThrow(
        "AccessibleMenu: parentMenu must be an instance of BaseMenu. string given."
      );
    });

    test("will fail if hoverType is invalid", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          hoverType: "fake",
        });
      }).toThrow(
        'AccessibleMenu: hoverType must be one of the following values: off, on, dynamic. "fake" given.'
      );
    });

    test("will fail if hoverDelay is invalid", () => {
      expect(() => {
        new MenuClass({
          menuElement,
          hoverDelay: "250",
        });
      }).toThrow("AccessibleMenu: hoverDelay must be a number. string given.");
    });
  });
}
