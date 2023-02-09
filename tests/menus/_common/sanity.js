/**
 * Reusable tests to make sure menus "just work".
 */

import { describe, test, expect, expectTypeOf } from "vitest";
import { oneLevelMenu, twoLevelMenu, twoLevelTopLinkMenu } from "./test-menus";

/**
 * A set of single-level menu sanity tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview|typeof TopLinkDisclosureMenu)} MenuClass - The menu class to test.
 */
export function singleLevelSanity(MenuClass) {
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
        {
          selector: "menuLinks",
          value: menuType === "TopLinkDisclosureMenu" ? "a,button" : "a",
        },
        { selector: "submenuItems", value: "" },
        {
          selector: "submenuToggles",
          value: menuType === "TopLinkDisclosureMenu" ? "button" : "a",
        },
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
        expect(menu.dom.menuItems).toMatchObject(menuItems);
      });
      test("submenuItems", () => {
        expectTypeOf(menu.dom.submenuItems).toBeArray();
        expect(menu.dom.submenuItems).toHaveLength(0);
      });
      test("submenuToggles", () => {
        expectTypeOf(menu.dom.submenuToggles).toBeArray();
        expect(menu.dom.submenuToggles).toHaveLength(0);
      });
      test("submenus", () => {
        expectTypeOf(menu.dom.submenus).toBeArray();
        expect(menu.dom.submenus).toHaveLength(0);
      });
      test("controller", () => {
        expect(menu.dom.controller).toBeNull();
      });
      test("container", () => {
        expect(menu.dom.container).toBeNull();
      });
    });

    describe("has correct menu elements", () => {
      test("controller", () => {
        expect(menu.elements.controller).toBeNull();
      });
      test("menuItems", () => {
        const isCorrectMenuItemClass = (elements) => {
          return elements.every(
            (element) => element.constructor.name === `${menuType}Item`
          );
        };
        expectTypeOf(menu.elements.menuItems).toBeArray();
        expect(menu.elements.menuItems).toHaveLength(5);
        expect(menu.elements.menuItems).toSatisfy(isCorrectMenuItemClass);
      });
      test("parentMenu", () => {
        expect(menu.elements.parentMenu).toBeNull();
      });
      test("rootMenu", () => {
        expect(menu.elements.rootMenu).toBe(menu);
      });
      test("submenuToggles", () => {
        expectTypeOf(menu.elements.submenuToggles).toBeArray();
        expect(menu.elements.submenuToggles).toHaveLength(0);
      });
    });

    test("has correct open class", () => {
      expect(menu.openClass).toBe("show");
    });

    test("has correct closed class", () => {
      expect(menu.closeClass).toBe("hide");
    });

    test("is top level", () => {
      expect(menu.isTopLevel).toBeTruthy();
    });

    test("has correct current child", () => {
      if (
        menuType === "DisclosureMenu" ||
        menuType === "TopLinkDisclosureMenu"
      ) {
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
      if (
        menuType === "DisclosureMenu" ||
        menuType === "TopLinkDisclosureMenu"
      ) {
        expect(menu.currentMenuItem).toBeUndefined();
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
      expect(menu.shouldFocus).toBeFalsy();
    });
  });
}

/**
 * A set of two-level menu sanity tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview|typeof TopLinkDisclosureMenu)} MenuClass - The menu class to test.
 */
export function twoLevelSanity(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} two-level menu sanity check`, () => {
    // Set up the DOM.
    document.body.innerHTML =
      menuType === "TopLinkDisclosureMenu" ? twoLevelTopLinkMenu : twoLevelMenu;
    const menuElement = document.querySelector("#menu-0");
    const submenuItemSelector = "li.dropdown";
    const containerElement = document.querySelector("nav");
    const controllerElement = document.querySelector("#toggle-0");
    const menuItems = Array.from(menuElement.querySelectorAll("li"));
    const submenuItems = Array.from(
      menuElement.querySelectorAll("li.dropdown")
    );
    const menuLinks =
      menuType === "TopLinkDisclosureMenu"
        ? Array.from(menuElement.querySelectorAll("li a, li button"))
        : Array.from(menuElement.querySelectorAll("li a"));
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
        {
          selector: "menuLinks",
          value: menuType === "TopLinkDisclosureMenu" ? "a,button" : "a",
        },
        { selector: "submenuItems", value: "li.dropdown" },
        {
          selector: "submenuToggles",
          value: menuType === "TopLinkDisclosureMenu" ? "button" : "a",
        },
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
        expect(menu.dom.menuItems).toMatchObject(
          menuItems.filter((item) => expectedIDs.includes(item.id))
        );
      });
      test("submenuItems", () => {
        expect(menu.dom.submenuItems).toMatchObject(submenuItems);
      });
      test("submenuToggles", () => {
        const toggleIDBase =
          menuType === "TopLinkDisclosureMenu" ? "toggle" : "link";
        const expectedIDs = [
          `${toggleIDBase}-2-0-0`,
          `${toggleIDBase}-3-0-0`,
          `${toggleIDBase}-5-0-0`,
        ];
        console.log(expectedIDs);
        console.log(menuLinks);
        expect(menu.dom.submenuToggles).toMatchObject(
          menuLinks.filter((item) => expectedIDs.includes(item.id))
        );
      });
      test("submenus", () => {
        expect(menu.dom.submenus).toMatchObject(submenuElements);
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
        const isCorrectMenuItemClass = (elements) => {
          return elements.every(
            (element) => element.constructor.name === `${menuType}Item`
          );
        };
        const menuItemCount = menuType === "TopLinkDisclosureMenu" ? 8 : 5;
        expectTypeOf(menu.elements.menuItems).toBeArray();
        expect(menu.elements.menuItems).toHaveLength(menuItemCount);
        expect(menu.elements.menuItems).toSatisfy(isCorrectMenuItemClass);
      });
      test("parentMenu", () => {
        expect(menu.elements.parentMenu).toBeNull();
      });
      test("rootMenu", () => {
        expect(menu.elements.rootMenu).toBe(menu);
      });
      test("submenuToggles", () => {
        const isCorrectMenuToggleClass = (elements) => {
          return elements.every(
            (element) => element.constructor.name === `${menuType}Toggle`
          );
        };
        expectTypeOf(menu.elements.submenuToggles).toBeArray();
        expect(menu.elements.submenuToggles).toHaveLength(3);
        expect(menu.elements.submenuToggles).toSatisfy(
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
      expect(menu.isTopLevel).toBeTruthy();
    });

    test("has correct current child", () => {
      if (
        menuType === "DisclosureMenu" ||
        menuType === "TopLinkDisclosureMenu"
      ) {
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
      if (
        menuType === "DisclosureMenu" ||
        menuType === "TopLinkDisclosureMenu"
      ) {
        expect(menu.currentMenuItem).toBeUndefined();
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
      expect(menu.shouldFocus).toBeFalsy();
    });

    menu.elements.submenuToggles.forEach((toggle, index) => {
      const submenu = toggle.elements.controlledMenu;
      const submenuElement = submenuElements[index];

      describe(`submenu ${index}`, () => {
        describe("has correct dom selectors", () => {
          const defaultSelectors = [
            { selector: "menuItems", value: "li" },
            {
              selector: "menuLinks",
              value: menuType === "TopLinkDisclosureMenu" ? "a,button" : "a",
            },
            { selector: "submenuItems", value: "li.dropdown" },
            {
              selector: "submenuToggles",
              value: menuType === "TopLinkDisclosureMenu" ? "button" : "a",
            },
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
          expect(submenu.dom.menuItems).toMatchObject(submenuItems);
        });
        test("submenuItems", () => {
          expectTypeOf(submenu.dom.submenuItems).toBeArray();
          expect(submenu.dom.submenuItems).toHaveLength(0);
        });
        test("submenuToggles", () => {
          expectTypeOf(submenu.dom.submenuToggles).toBeArray();
          expect(submenu.dom.submenuToggles).toHaveLength(0);
        });
        test("submenus", () => {
          expectTypeOf(submenu.dom.submenus).toBeArray();
          expect(submenu.dom.submenus).toHaveLength(0);
        });
        test("controller", () => {
          expect(submenu.dom.controller).toBeNull();
        });
        test("container", () => {
          expect(submenu.dom.container).toBeNull();
        });
      });

      describe("has correct menu elements", () => {
        test("controller", () => {
          expect(submenu.elements.controller).toBeNull();
        });
        test("menuItems", () => {
          const isCorrectMenuItemClass = (elements) => {
            return elements.every(
              (element) => element.constructor.name === `${menuType}Item`
            );
          };
          expectTypeOf(submenu.elements.menuItems).toBeArray();
          expect(submenu.elements.menuItems).toHaveLength(3);
          expect(submenu.elements.menuItems).toSatisfy(isCorrectMenuItemClass);
        });
        test("parentMenu", () => {
          expect(submenu.elements.parentMenu).toBe(menu);
        });
        test("rootMenu", () => {
          expect(submenu.elements.rootMenu).toBe(menu);
        });
        test("submenuToggles", () => {
          expectTypeOf(submenu.elements.submenuToggles).toBeArray();
          expect(submenu.elements.submenuToggles).toHaveLength(0);
        });
      });

      test("has correct open class", () => {
        expect(submenu.openClass).toBe("show");
      });

      test("has correct closed class", () => {
        expect(submenu.closeClass).toBe("hide");
      });

      test("is _not_ top level", () => {
        expect(submenu.isTopLevel).toBeFalsy();
      });

      test("has correct current child", () => {
        if (
          menuType === "DisclosureMenu" ||
          menuType === "TopLinkDisclosureMenu"
        ) {
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
        if (
          menuType === "DisclosureMenu" ||
          menuType === "TopLinkDisclosureMenu"
        ) {
          expect(submenu.currentMenuItem).toBeUndefined();
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
        expect(submenu.shouldFocus).toBeFalsy();
      });
    });
  });
}
