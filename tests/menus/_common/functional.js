/**
 * Reusable functional tests.
 *
 * @jest-environment jsdom
 */
/* eslint-disable no-new */

import { twoLevelMenu } from "./test-menus";
import { click } from "./helpers";

/**
 * A set of open/close click tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function openClose(MenuClass) {
  const menuType = MenuClass.name;

  // Set up the DOM.
  document.body.innerHTML = twoLevelMenu;
  const menu = new MenuClass({
    menuElement: document.querySelector("#menu-0"),
    submenuItemSelector: "li.dropdown",
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("#toggle-0"),
  });

  describe(menuType, () => {
    /**
     * Test to see if a menu has opened.
     *
     * @param {(DisclosureMenu|Menubar|Treeview)} openMenu - The menu to test
     */
    function hasOpened(openMenu) {
      expect(openMenu.elements.controller.isOpen).toBeTrue();
      expect(openMenu.focusState).toBe("self");
      expect(openMenu.dom.controller.getAttribute("aria-expanded")).toBe(
        "true"
      );
      expect(openMenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(openMenu.dom.menu.classList.contains("hide")).toBeFalse();
    }

    /**
     * Test to see if a menu has closed.
     *
     * @param {(DisclosureMenu|Menubar|Treeview)} closedMenu - The menu to test
     */
    function hasClosed(closedMenu) {
      expect(closedMenu.elements.controller.isOpen).toBeFalse();
      expect(closedMenu.focusState).toBe("none");
      expect(closedMenu.dom.controller.getAttribute("aria-expanded")).toBe(
        "false"
      );
      expect(closedMenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(closedMenu.dom.menu.classList.contains("show")).toBeFalse();
    }

    test("will open when the controller's open method is called", () => {
      menu.elements.controller.open();

      hasOpened(menu);
    });

    test("will close when the controller's close method is called", () => {
      menu.elements.controller.close();

      hasClosed(menu);
    });

    test("will open when the controller is clicked when the menu is closed", () => {
      menu.elements.controller.close();
      click(menu.dom.controller);

      hasOpened(menu);
    });

    test("will close when the controller is clicked when the menu is open", () => {
      menu.elements.controller.open();
      click(menu.dom.controller);

      hasClosed(menu);
    });

    if (menuType === "DisclosureMenu" || menuType === "Menubar") {
      test("will close when a click event is registered outside of the menu", () => {
        menu.elements.controller.open();
        click(document.querySelector("main"));

        hasClosed(menu);
      });
    }
  });

  describe(`${menuType} submenus`, () => {
    const toggle = menu.elements.submenuToggles[0];
    const submenu = toggle.elements.controlledMenu;

    /**
     * Test to see if a submenu has opened.
     *
     * @param {(DisclosureMenuToggle|MenubarToggle|TreeviewToggle)} openToggle - The toggle to test.
     * @param {(DisclosureMenu|Menubar|Treeview)}                   openMenu   - The menu to test.
     */
    function hasOpened(openToggle, openMenu) {
      expect(openToggle.isOpen).toBeTrue();
      expect(openToggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(openMenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(openMenu.dom.menu.classList.contains("hide")).toBeFalse();
    }

    /**
     * Test to see if a submenu has closed.
     *
     * @param {(DisclosureMenuToggle|MenubarToggle|TreeviewToggle)} openToggle - The toggle to test.
     * @param {(DisclosureMenu|Menubar|Treeview)}                   openMenu   - The menu to test.
     */
    function hasClosed(openToggle, openMenu) {
      expect(openToggle.isOpen).toBeFalse();
      expect(openToggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(openMenu.focusState).toBe("none");
      expect(openToggle.elements.parentMenu.focusState).toBe("self");
      expect(openMenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(openMenu.dom.menu.classList.contains("show")).toBeFalse();
    }

    test("will open when the controller's open method is called", () => {
      toggle.open();

      hasOpened(toggle, submenu);
      expect(submenu.focusState).toBe("self");
      expect(menu.focusState).toBe("child");
    });

    test("will close when the controller's close method is called", () => {
      toggle.close();

      hasClosed(toggle, submenu);
    });

    test("will open when the controller is clicked when the menu is closed", () => {
      toggle.close();
      click(toggle.dom.toggle);

      hasOpened(toggle, submenu);
      expect(submenu.focusState).toBe("none");
      expect(menu.focusState).toBe("self");
    });

    test("will close when the controller is clicked when the menu is open", () => {
      toggle.open();
      click(toggle.dom.toggle);

      hasClosed(toggle, submenu);
    });
  });
}
