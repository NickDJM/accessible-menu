/**
 * Test the BaseMenu class.
 *
 * @jest-environment jsdom
 */

import BaseMenu from "../../src/_baseMenu";
import { oneLevelMenu } from "../test-menus";

/**
 * Initializes a BaseMenu and it's children since the menu will not auto-initialize.
 *
 * @param {BaseMenu} menu - The menu to initialize.
 */
function initializeMenu(menu) {
  menu.initialize();
  menu.elements.menuItems.forEach((menuItem) => menuItem.initialize());
}

describe("BaseMenu single-level menu sanity check", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;
  const menuElement = document.querySelector("#menu-0");

  // Declare the menu.
  const menu = new BaseMenu({
    menuElement,
  });

  test("initializes", () => {
    expect(() => {
      initializeMenu(menu);
    }).not.toThrow(Error);
  });

  describe("has correct dom selectors", () => {
    const defaultSelectors = [
      { selector: "menuItems", value: "li" },
      { selector: "menuLinks", value: "a" },
      { selector: "submenuItems", value: "" },
      { selector: "submenuToggles", value: "a" },
      { selector: "submenus", value: "ul" },
    ];

    test.each(defaultSelectors)("$selector", ({ selector, value }) => {
      expect(menu.selectors[selector]).toBe(value);
    });
  });

  describe("has correct dom elements", () => {
    test("menu", () => {
      expect(menu.dom.menu).toBe(menuElement);
    });
    test("menuItems", () => {
      const menuItems = Array.from(menuElement.querySelectorAll("li"));
      expect(menu.dom.menuItems).toIncludeAllMembers(menuItems);
    });
    test("submenuItems", () => {
      expect(menu.dom.submenuItems).toBeArrayOfSize(0);
    });
    test("submenuToggles", () => {
      expect(menu.dom.submenuToggles).toBeArrayOfSize(0);
    });
    test("submenus", () => {
      expect(menu.dom.submenus).toBeArrayOfSize(0);
    });
    test("controller", () => {
      expect(menu.dom.controller).toBe(null);
    });
    test("container", () => {
      expect(menu.dom.container).toBe(null);
    });
  });

  describe("has correct menu elements", () => {
    test("controller", () => {
      expect(menu.elements.controller).toBe(null);
    });
    test("menuItems", () => {
      expect(menu.elements.menuItems).toBeArrayOfSize(5);
    });
    test("menuItems", () => {
      const isCorrectMenuItemClass = (element) =>
        element.constructor.name === "BaseMenuItem";
      expect(menu.elements.menuItems).toSatisfyAll(isCorrectMenuItemClass);
    });
    test("parentMenu", () => {
      expect(menu.elements.parentMenu).toBe(null);
    });
    test("rootMenu", () => {
      expect(menu.elements.rootMenu).toBe(menu);
    });
    test("submenuToggles", () => {
      expect(menu.elements.submenuToggles).toBeArrayOfSize(0);
    });
  });

  test("has correct open class", () => {
    expect(menu.openClass).toBe("show");
  });

  test("has correct closed class", () => {
    expect(menu.closeClass).toBe("hide");
  });

  test("is top level", () => {
    expect(menu.isTopLevel).toBeTrue();
  });

  test("has correct current child", () => {
    expect(menu.currentChild).toBe(0);
  });

  test("focus state is set to none", () => {
    expect(menu.focusState).toBe("none");
  });

  test("current event is set to none", () => {
    expect(menu.currentEvent).toBe("none");
  });

  test("current menu item is undefined", () => {
    expect(menu.currentMenuItem).toBe(menu.elements.menuItems[0]);
  });

  test("hover type is set to off", () => {
    expect(menu.hoverType).toBe("off");
  });

  test("hover delay is set to 250", () => {
    expect(menu.hoverDelay).toBe(250);
  });

  test("should not focus", () => {
    expect(menu.shouldFocus).toBeFalse();
  });
});

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
      const menu = new BaseMenu();

      initializeMenu(menu);
    }).toThrow("Cannot read property 'menuElement' of undefined");
  });

  test("won't initialize if no menuElement is passed", () => {
    expect(() => {
      const menu = new BaseMenu({});

      initializeMenu(menu);
    }).toThrow(
      "AccessibleMenu: menuElement must be an instance of HTMLElement. undefined given."
    );
  });

  test("won't initialize if menuElement isn't an HTMLElement", () => {
    expect(() => {
      const menu = new BaseMenu({ menuElement: {} });

      initializeMenu(menu);
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
        const menu = new BaseMenu(params);

        initializeMenu(menu);
      }).toThrow(
        `AccessibleMenu: ${selector} must be a valid CSS selector. "123" given.`
      );
    }
  );

  test("won't initialize if submenuItemSelector is provided and submenuToggleSelector isn't a CSS selector", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        submenuItemSelector: "li.dropdown",
        submenuToggleSelector: 123,
      });

      initializeMenu(menu);
    }).toThrow(
      'AccessibleMenu: submenuToggleSelector must be a valid CSS selector. "123" given.'
    );
  });

  test("won't initialize if submenuItemSelector is provided and submenuSelector isn't a CSS selector", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        submenuItemSelector: "li.dropdown",
        submenuSelector: 123,
      });

      initializeMenu(menu);
    }).toThrow(
      'AccessibleMenu: submenuSelector must be a valid CSS selector. "123" given.'
    );
  });

  test("will initialize if controllerElement and containerElement are HTMLELements", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        containerElement,
        controllerElement,
      });

      initializeMenu(menu);
    }).not.toThrow(Error);
  });

  test("won't initialize if controllerElement is provided without containerElement", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        controllerElement,
      });

      initializeMenu(menu);
    }).toThrow(
      "AccessibleMenu: containerElement must be an instance of HTMLElement. object given."
    );
  });

  test("won't initialize if containerElement is provided without containerElement", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        containerElement,
      });

      initializeMenu(menu);
    }).toThrow(
      "AccessibleMenu: controllerElement must be an instance of HTMLElement. object given."
    );
  });

  test("won't initialize if controllerElement is isn't an HTMLElement", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        controllerElement: 123,
        containerElement,
      });

      initializeMenu(menu);
    }).toThrow(
      "AccessibleMenu: controllerElement must be an instance of HTMLElement. number given."
    );
  });

  test("won't initialize if containerElement is isn't an HTMLElement", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        controllerElement,
        containerElement: 123,
      });

      initializeMenu(menu);
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

        const menu = new BaseMenu(params);

        initializeMenu(menu);
      }).toThrow(
        `AccessibleMenu: ${classList} must be a string or an array of strings. number given.`
      );
      expect(() => {
        const params = {
          menuElement,
        };
        params[classList] = [123, "class"];

        const menu = new BaseMenu(params);

        initializeMenu(menu);
      }).toThrow(
        `AccessibleMenu: ${classList} must be a string or an array of strings. An array containing non-strings given.`
      );
    }
  );

  test("won't initialize if isTopLevel isn't a boolean", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        isTopLevel: 123,
      });

      initializeMenu(menu);
    }).toThrow("AccessibleMenu: isTopLevel must be a boolean. number given.");
  });

  test("will initialize if parentMenu a BaseMenu", () => {
    expect(() => {
      const parentMenu = new BaseMenu({ menuElement });
      const menu = new BaseMenu({
        menuElement,
        parentMenu,
      });

      initializeMenu(menu);
    }).not.toThrow(Error);
  });

  test("won't initialize if parentMenu isn't a BaseMenu or null", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        parentMenu: "parent menu",
      });

      initializeMenu(menu);
    }).toThrow(
      "AccessibleMenu: parentMenu must be an instance of BaseMenu. string given."
    );
  });

  test("won't initialize if hoverType is invalid", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        hoverType: "fake",
      });

      initializeMenu(menu);
    }).toThrow(
      'AccessibleMenu: hoverType must be one of the following values: off, on, dynamic. "fake" given.'
    );
  });

  test("won't initialize if hoverDelay is invalid", () => {
    expect(() => {
      const menu = new BaseMenu({
        menuElement,
        hoverDelay: "250",
      });

      initializeMenu(menu);
    }).toThrow("AccessibleMenu: hoverDelay must be a number. string given.");
  });
});
