/**
 * Test the Treeview class to make sure it "just works".
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import { oneLevelMenu, twoLevelMenu } from "../../test-menus";

describe("Treeview single-level menu sanity check", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;
  const menuElement = document.querySelector("#menu-0");

  test("initializes", () => {
    expect(() => {
      /* eslint-disable no-new */
      new Treeview({
        menuElement,
      });
    }).not.toThrow(Error);
  });

  // Declare the menu.
  const menu = new Treeview({
    menuElement,
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
      const isCorrectMenuItemClass = (element) =>
        element.constructor.name === "TreeviewItem";
      expect(menu.elements.menuItems).toBeArrayOfSize(5);
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

  test("current menu item is correct", () => {
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
