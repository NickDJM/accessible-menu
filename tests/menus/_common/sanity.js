/**
 * Reusable tests to make sure menus "just work".
 *
 * @jest-environment jsdom
 */

import { oneLevelMenu, twoLevelMenu } from "../../test-menus";

/**
 * A set of sanity tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass        - The menu class to test.
 */
export function sanity(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} single-level menu sanity check`, () => {
    // Set up the DOM.
    document.body.innerHTML = oneLevelMenu;
    const menuElement = document.querySelector("#menu-0");

    // Declare the menu.
    const menu = new MenuClass({
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
          element.constructor.name === `${menuType}Item`;
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
      if (menuType === "DisclosureMenu") {
        expect(menu.currentChild).toBe(-1);
      } else {
        expect(menu.currentChild).toBe(0);
      }
    });

    test("focus state is set to none", () => {
      expect(menu.focusState).toBe("none");
    });

    test("current event is set to none", () => {
      expect(menu.currentEvent).toBe("none");
    });

    test("current menu item is correct", () => {
      if (menuType === "DisclosureMenu") {
        expect(menu.currentMenuItem).toBeNil();
      } else {
        expect(menu.currentMenuItem).toBe(menu.elements.menuItems[0]);
      }
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

  describe(`${menuType} two-level menu sanity check`, () => {
    // Set up the DOM.
    document.body.innerHTML = twoLevelMenu;
    const menuElement = document.querySelector("#menu-0");
    const submenuItemSelector = "li.dropdown";
    const containerElement = document.querySelector("nav");
    const controllerElement = document.querySelector("#toggle-0");
    const menuItems = Array.from(menuElement.querySelectorAll("li"));
    const submenuItems = Array.from(
      menuElement.querySelectorAll("li.dropdown")
    );
    const menuLinks = Array.from(menuElement.querySelectorAll("li a"));
    const submenuElements = Array.from(
      menuElement.querySelectorAll("li.dropdown ul")
    );

    // Declare the menu.
    const menu = new MenuClass({
      menuElement,
      submenuItemSelector,
      containerElement,
      controllerElement,
    });

    describe("has correct dom selectors", () => {
      const defaultSelectors = [
        { selector: "menuItems", value: "li" },
        { selector: "menuLinks", value: "a" },
        { selector: "submenuItems", value: "li.dropdown" },
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
        const expectedIDs = [
          "item-1-0-0",
          "item-2-0-0",
          "item-3-0-0",
          "item-4-0-0",
          "item-5-0-0",
        ];
        expect(menu.dom.menuItems).toIncludeAllMembers(
          menuItems.filter((item) => expectedIDs.includes(item.id))
        );
      });
      test("submenuItems", () => {
        expect(menu.dom.submenuItems).toIncludeAllMembers(submenuItems);
      });
      test("submenuToggles", () => {
        const expectedIDs = ["link-2-0-0", "link-3-0-0", "link-5-0-0"];
        expect(menu.dom.submenuToggles).toIncludeAllMembers(
          menuLinks.filter((item) => expectedIDs.includes(item.id))
        );
      });
      test("submenus", () => {
        expect(menu.dom.submenus).toIncludeAllMembers(submenuElements);
      });
      test("controller", () => {
        expect(menu.dom.controller).toBe(controllerElement);
      });
      test("container", () => {
        expect(menu.dom.container).toBe(containerElement);
      });
    });

    describe("has correct menu elements", () => {
      test("controller", () => {
        expect(menu.elements.controller.constructor.name).toBe(
          `${menuType}Toggle`
        );
      });
      test("menuItems", () => {
        const isCorrectMenuItemClass = (element) =>
          element.constructor.name === `${menuType}Item`;
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
        const isCorrectMenuToggleClass = (element) =>
          element.constructor.name === `${menuType}Toggle`;
        expect(menu.elements.submenuToggles).toBeArrayOfSize(3);
        expect(menu.elements.submenuToggles).toSatisfyAll(
          isCorrectMenuToggleClass
        );
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
      if (menuType === "DisclosureMenu") {
        expect(menu.currentChild).toBe(-1);
      } else {
        expect(menu.currentChild).toBe(0);
      }
    });

    test("focus state is set to none", () => {
      expect(menu.focusState).toBe("none");
    });

    test("current event is set to none", () => {
      expect(menu.currentEvent).toBe("none");
    });

    test("current menu item is correct", () => {
      if (menuType === "DisclosureMenu") {
        expect(menu.currentMenuItem).toBeNil();
      } else {
        expect(menu.currentMenuItem).toBe(menu.elements.menuItems[0]);
      }
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

    menu.elements.submenuToggles.forEach((toggle, index) => {
      const submenu = toggle.elements.controlledMenu;
      const submenuElement = submenuElements[index];

      describe(`submenu ${index}`, () => {
        describe("has correct dom selectors", () => {
          const defaultSelectors = [
            { selector: "menuItems", value: "li" },
            { selector: "menuLinks", value: "a" },
            { selector: "submenuItems", value: "li.dropdown" },
            { selector: "submenuToggles", value: "a" },
            { selector: "submenus", value: "ul" },
          ];

          test.each(defaultSelectors)("$selector", ({ selector, value }) => {
            expect(menu.selectors[selector]).toBe(value);
          });
        });
      });

      describe("has correct dom elements", () => {
        test("menu", () => {
          expect(submenu.dom.menu).toBe(submenuElement);
        });
        test("menuItems", () => {
          const submenuItems = Array.from(
            submenuElement.querySelectorAll("li")
          );
          expect(submenu.dom.menuItems).toIncludeAllMembers(submenuItems);
        });
        test("submenuItems", () => {
          expect(submenu.dom.submenuItems).toBeArrayOfSize(0);
        });
        test("submenuToggles", () => {
          expect(submenu.dom.submenuToggles).toBeArrayOfSize(0);
        });
        test("submenus", () => {
          expect(submenu.dom.submenus).toBeArrayOfSize(0);
        });
        test("controller", () => {
          expect(submenu.dom.controller).toBe(null);
        });
        test("container", () => {
          expect(submenu.dom.container).toBe(null);
        });
      });

      describe("has correct menu elements", () => {
        test("controller", () => {
          expect(submenu.elements.controller).toBe(null);
        });
        test("menuItems", () => {
          const isCorrectMenuItemClass = (element) =>
            element.constructor.name === `${menuType}Item`;
          expect(submenu.elements.menuItems).toBeArrayOfSize(3);
          expect(submenu.elements.menuItems).toSatisfyAll(
            isCorrectMenuItemClass
          );
        });
        test("parentMenu", () => {
          expect(submenu.elements.parentMenu).toBe(menu);
        });
        test("rootMenu", () => {
          expect(submenu.elements.rootMenu).toBe(menu);
        });
        test("submenuToggles", () => {
          expect(submenu.elements.submenuToggles).toBeArrayOfSize(0);
        });
      });

      test("has correct open class", () => {
        expect(submenu.openClass).toBe("show");
      });

      test("has correct closed class", () => {
        expect(submenu.closeClass).toBe("hide");
      });

      test("is _not_ top level", () => {
        expect(submenu.isTopLevel).toBeFalse();
      });

      test("has correct current child", () => {
        if (menuType === "DisclosureMenu") {
          expect(submenu.currentChild).toBe(-1);
        } else {
          expect(submenu.currentChild).toBe(0);
        }
      });

      test("focus state is set to none", () => {
        expect(submenu.focusState).toBe("none");
      });

      test("current event is set to none", () => {
        expect(submenu.currentEvent).toBe("none");
      });

      test("current menu item is correct", () => {
        if (menuType === "DisclosureMenu") {
          expect(submenu.currentMenuItem).toBeNil();
        } else {
          expect(submenu.currentMenuItem).toBe(submenu.elements.menuItems[0]);
        }
      });

      test("hover type is set to off", () => {
        expect(submenu.hoverType).toBe("off");
      });

      test("hover delay is set to 250", () => {
        expect(submenu.hoverDelay).toBe(250);
      });

      test("should not focus", () => {
        expect(submenu.shouldFocus).toBeFalse();
      });
    });
  });
}
