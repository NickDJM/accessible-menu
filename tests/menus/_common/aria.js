/**
 * Reusable ARIA tests.
 */
/* eslint-disable no-new */

import { describe, test, expect } from "vitest";
import { twoLevelMenu, twoLevelTopLinkMenu } from "./test-menus";

/**
 * A set of ARIA tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview|typeof TopLinkDisclosureMenu)} MenuClass - The menu class to test.
 */
export function aria(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType}`, () => {
    // Set up the DOM.
    document.body.innerHTML =
      menuType === "TopLinkDisclosureMenu" ? twoLevelTopLinkMenu : twoLevelMenu;
    const menu = new MenuClass({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
    });
    const expectedItemRole = menuType === "Menubar" ? "menuitem" : "treeitem";
    const submenus = [
      { index: 0, id: 2 },
      { index: 1, id: 3 },
      { index: 2, id: 5 },
    ];

    test("has proper ARIA attributes on the root menu", () => {
      expect(menu.dom.menu.getAttribute("aria-labelledby")).toBe("toggle-0");

      if (menuType === "Menubar") {
        expect(menu.dom.menu.getAttribute("role")).toBe("menubar");
      } else if (menuType === "Treeview") {
        expect(menu.dom.menu.getAttribute("role")).toBe("tree");
      }
    });

    test("has proper ARIA attributes on the controller", () => {
      expect(menu.dom.controller.getAttribute("aria-haspopup")).toBe("true");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
      expect(menu.dom.controller.getAttribute("aria-controls")).toBe("menu-0");
    });

    test("properly updates ARIA attributes when opened", () => {
      menu.elements.controller.open();
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
    });

    test("properly updates ARIA attributes when closed", () => {
      menu.elements.controller.close();
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
    });

    if (menuType === "Menubar" || menuType === "Treeview") {
      menu.elements.menuItems.forEach((menuItem, index) => {
        const expectedIndex = index === 0 ? 0 : -1;

        test(`has proper ARIA attributes on menu item ${index}`, () => {
          expect(menuItem.dom.item.getAttribute("role")).toBe("none");
          expect(menuItem.dom.link.getAttribute("role")).toBe(expectedItemRole);
          expect(menuItem.dom.link.tabIndex).toBe(expectedIndex);
        });
      });
    }

    describe.each(submenus)("submenu $index", ({ index, id }) => {
      test("has proper ARIA attributes", () => {
        const submenuElement =
          menu.elements.submenuToggles[index].elements.controlledMenu.dom.menu;
        const labelledByItem =
          menuType === "TopLinkDisclosureMenu" ? "toggle" : "link";

        expect(submenuElement.getAttribute("aria-labelledby")).toBe(
          `${labelledByItem}-${id}-0-0`
        );

        if (menuType === "Menubar") {
          expect(submenuElement.getAttribute("role")).toBe("menubar");
        } else if (menuType === "Treeview") {
          expect(submenuElement.getAttribute("role")).toBe("group");
        }
      });

      test("has proper ARIA attributes on toggle", () => {
        const submenuToggle = menu.elements.submenuToggles[index].dom.toggle;

        expect(submenuToggle.getAttribute("aria-haspopup")).toBe("true");
        expect(submenuToggle.getAttribute("aria-expanded")).toBe("false");
        expect(submenuToggle.getAttribute("aria-controls")).toBe(`menu-${id}`);
      });

      test("properly updates ARIA attributes when opened", () => {
        const submenuToggle = menu.elements.submenuToggles[index];
        submenuToggle.open();
        expect(submenuToggle.dom.toggle.getAttribute("aria-expanded")).toBe(
          "true"
        );
      });

      test("properly updates ARIA attributes when closed", () => {
        const submenuToggle = menu.elements.submenuToggles[index];
        submenuToggle.close();
        expect(submenuToggle.dom.toggle.getAttribute("aria-expanded")).toBe(
          "false"
        );
      });

      if (menuType === "Menubar" || menuType === "Treeview") {
        menu.elements.submenuToggles[
          index
        ].elements.controlledMenu.elements.menuItems.forEach(
          (menuItem, itemIndex) => {
            test(`has proper ARIA attributes on menu item ${itemIndex}`, () => {
              expect(menuItem.dom.item.getAttribute("role")).toBe("none");
              expect(menuItem.dom.link.getAttribute("role")).toBe(
                expectedItemRole
              );
              expect(menuItem.dom.link.tabIndex).toBe(-1);
            });
          }
        );
      }
    });
  });
}
