/**
 * Reusable functional tests.
 *
 * @jest-environment jsdom
 */
/* eslint-disable no-new */

import { twoLevelMenu } from "./test-menus";
import { click, triggerEvent } from "./helpers";

/**
 * A set of open/close tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function openClose(MenuClass) {
  const menuType = MenuClass.name;

  // Set up the DOM.
  document.body.innerHTML = twoLevelMenu;

  describe(menuType, () => {
    const menu = new MenuClass({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
    });
    const toggle = menu.elements.submenuToggles[0];
    const submenu = toggle.elements.controlledMenu;

    test("will open when the controller's open method is called", () => {
      menu.elements.controller.open();

      expect(menu.elements.controller.isOpen).toBeTrue();
      expect(menu.focusState).toBe("self");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
      expect(menu.dom.menu.classList.contains("show")).toBeTrue();
      expect(menu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("will close when the controller's close method is called", () => {
      menu.elements.controller.close();

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
      expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(menu.dom.menu.classList.contains("show")).toBeFalse();
    });

    test("submenus will open when the controller's open method is called", () => {
      toggle.open();

      expect(toggle.isOpen).toBeTrue();
      expect(submenu.focusState).toBe("self");
      expect(menu.focusState).toBe("child");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will close when the controller's close method is called", () => {
      toggle.close();

      expect(toggle.isOpen).toBeFalse();
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(submenu.focusState).toBe("none");
      expect(menu.focusState).toBe("self");
      expect(submenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("show")).toBeFalse();
    });
  });
}

/**
 * A set of click tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function clickTests(MenuClass) {
  const menuType = MenuClass.name;

  // Set up the DOM.
  document.body.innerHTML = twoLevelMenu;

  describe(menuType, () => {
    const menu = new MenuClass({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
    });
    const toggle = menu.elements.submenuToggles[0];
    const submenu = toggle.elements.controlledMenu;

    test("will open when the controller is clicked when the menu is closed", () => {
      menu.elements.controller.close();
      click(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeTrue();
      expect(menu.focusState).toBe("none");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
      expect(menu.dom.menu.classList.contains("show")).toBeTrue();
      expect(menu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("will close when the controller is clicked when the menu is open", () => {
      menu.elements.controller.open();
      click(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
      expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(menu.dom.menu.classList.contains("show")).toBeFalse();
    });

    if (menuType === "DisclosureMenu" || menuType === "Menubar") {
      test("will close when a click event is registered outside of the menu", () => {
        menu.elements.controller.open();
        click(document.querySelector("main"));

        expect(menu.elements.controller.isOpen).toBeFalse();
        expect(menu.focusState).toBe("none");
        expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
        expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
        expect(menu.dom.menu.classList.contains("show")).toBeFalse();
      });
    }

    test("submenus will open when the controller is clicked when the menu is closed", () => {
      toggle.close();
      click(toggle.dom.toggle);

      expect(toggle.isOpen).toBeTrue();
      expect(submenu.focusState).toBe("none");
      expect(menu.focusState).toBe("self");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will close when the controller is clicked when the menu is open", () => {
      toggle.open();
      click(toggle.dom.toggle);

      expect(toggle.isOpen).toBeFalse();
      expect(submenu.focusState).toBe("none");
      expect(menu.focusState).toBe("self");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(submenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("show")).toBeFalse();
    });
  });
}

/**
 * A set of hover tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function hoverTests(MenuClass) {
  const menuType = MenuClass.name;

  // Set up the DOM.
  document.body.innerHTML = twoLevelMenu;

  describe(`${menuType} with hoverType "on"`, () => {
    const menu = new MenuClass({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
      hoverType: "on",
      hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
    });
    const menuItem = menu.elements.menuItems[1];
    const toggle = menu.elements.submenuToggles[0];
    const submenu = toggle.elements.controlledMenu;

    test("submenus will open when a mouse enters their controller", () => {
      triggerEvent("mouseenter", toggle.dom.toggle);

      expect(toggle.isOpen).toBeTrue();
      expect(toggle.elements.parentMenu.focusState).toBe("self");
      expect(submenu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will close when a mouse leaves the submenu item", () => {
      triggerEvent("mouseleave", menuItem.dom.item);

      expect(toggle.isOpen).toBeFalse();
      expect(toggle.elements.parentMenu.focusState).toBe("self");
      expect(submenu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(submenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("show")).toBeFalse();
    });
  });
}
