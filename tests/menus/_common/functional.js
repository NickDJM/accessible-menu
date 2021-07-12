/**
 * Reusable functional tests.
 *
 * @jest-environment jsdom
 */
/* eslint-disable no-new */

import { twoLevelMenu, fullMenu } from "./test-menus";
import { simulateClick, simulateMouseEvent, simulateKeypress } from "./helpers";

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

  describe(menuType, () => {
    // Set up the DOM.
    document.body.innerHTML = twoLevelMenu;
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
      simulateClick(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeTrue();
      expect(menu.focusState).toBe("none");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
      expect(menu.dom.menu.classList.contains("show")).toBeTrue();
      expect(menu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("will close when the controller is clicked when the menu is open", () => {
      menu.elements.controller.open();
      simulateClick(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
      expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
      expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(menu.dom.menu.classList.contains("show")).toBeFalse();
    });

    if (menuType === "DisclosureMenu" || menuType === "Menubar") {
      test("will close when a click event is registered outside of the menu", () => {
        menu.elements.controller.open();
        simulateClick(document.querySelector("main"));

        expect(menu.elements.controller.isOpen).toBeFalse();
        expect(menu.focusState).toBe("none");
        expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
        expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
        expect(menu.dom.menu.classList.contains("show")).toBeFalse();
      });
    }

    test("submenus will open when the controller is clicked when the menu is closed", () => {
      toggle.close();
      simulateClick(toggle.dom.toggle);

      expect(toggle.isOpen).toBeTrue();
      expect(submenu.focusState).toBe("none");
      expect(menu.focusState).toBe("self");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will close when the controller is clicked when the menu is open", () => {
      toggle.open();
      simulateClick(toggle.dom.toggle);

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

  describe(`${menuType} with hoverType "on"`, () => {
    // Set up the DOM.
    document.body.innerHTML = twoLevelMenu;
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
      simulateMouseEvent("mouseenter", toggle.dom.toggle);

      expect(toggle.isOpen).toBeTrue();
      expect(toggle.elements.parentMenu.focusState).toBe("self");
      expect(submenu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will close when a mouse leaves the submenu item", () => {
      simulateMouseEvent("mouseleave", menuItem.dom.item);

      expect(toggle.isOpen).toBeFalse();
      expect(toggle.elements.parentMenu.focusState).toBe("self");
      expect(submenu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(submenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("show")).toBeFalse();
    });
  });

  describe(`${menuType} with hoverType "dynamic"`, () => {
    // Set up the DOM.
    document.body.innerHTML = fullMenu;
    const menu = new MenuClass({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
      hoverType: "dynamic",
      hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
    });
    const menuItem = menu.elements.menuItems[1];
    const toggle = menu.elements.submenuToggles[0];
    const toggle2 = menu.elements.submenuToggles[1];
    const submenu = toggle.elements.controlledMenu;
    const submenu2 = toggle2.elements.controlledMenu;
    const nonRootMenuItem = submenu.elements.menuItems[1];
    const nonRootToggle = submenu.elements.submenuToggles[0];
    const nonRootSubmenu = nonRootToggle.elements.controlledMenu;

    test("submenus will not open when a mouse enters their controller and no other submenus are open", () => {
      simulateMouseEvent("mouseenter", toggle.dom.toggle);

      expect(toggle.isOpen).toBeFalse();
      expect(submenu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(submenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("show")).toBeFalse();
    });

    test("submenus will not close when a mouse leaves the submenu item if no other submenus are opened", () => {
      toggle.open();
      simulateMouseEvent("mouseleave", menuItem.dom.item);

      expect(toggle.isOpen).toBeTrue();
      expect(toggle.elements.parentMenu.focusState).toBe("child");
      expect(submenu.focusState).toBe("self");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus will open when a mouse enters their controller if another submenu is already open", () => {
      toggle.open();
      simulateMouseEvent("mouseenter", toggle2.dom.toggle);

      expect(toggle2.isOpen).toBeTrue();
      expect(toggle2.elements.parentMenu.focusState).toBe("self");
      expect(submenu2.focusState).toBe("none");
      expect(toggle2.dom.toggle.getAttribute("aria-expanded")).toBe("true");
      expect(submenu2.dom.menu.classList.contains("show")).toBeTrue();
      expect(submenu2.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus that are not direct children of the root menu with open when a mouse enters their controller", () => {
      toggle.open();
      simulateMouseEvent("mouseenter", nonRootToggle.dom.toggle);

      expect(nonRootToggle.isOpen).toBeTrue();
      expect(nonRootToggle.elements.parentMenu.focusState).toBe("self");
      expect(nonRootSubmenu.focusState).toBe("none");
      expect(nonRootToggle.dom.toggle.getAttribute("aria-expanded")).toBe(
        "true"
      );
      expect(nonRootSubmenu.dom.menu.classList.contains("show")).toBeTrue();
      expect(nonRootSubmenu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("submenus that are not direct children of the root menu with close when a mouse leaves the submenu item", () => {
      toggle.open();
      nonRootToggle.open();
      simulateMouseEvent("mouseleave", nonRootMenuItem.dom.item);

      expect(nonRootToggle.isOpen).toBeFalse();
      expect(nonRootToggle.elements.parentMenu.focusState).toBe("self");
      expect(nonRootSubmenu.focusState).toBe("none");
      expect(nonRootToggle.dom.toggle.getAttribute("aria-expanded")).toBe(
        "false"
      );
      expect(nonRootSubmenu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(nonRootSubmenu.dom.menu.classList.contains("show")).toBeFalse();
    });
  });
}

/**
 * A set of base keypress tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function baseKeypressTests(MenuClass) {
  const menuType = MenuClass.name;

  describe(menuType, () => {
    test.each(["Enter", "Spacebar"])(
      "will open when then '%s' key is pressed on the controller",
      (key) => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("#toggle-0"),
        });
        const toggle = menu.elements.controller;

        simulateKeypress(key, toggle.dom.toggle);

        expect(toggle.isOpen).toBeTrue();
        expect(menu.focusState).toBe("self");
        expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
        expect(menu.dom.menu.classList.contains("show")).toBeTrue();
        expect(menu.dom.menu.classList.contains("hide")).toBeFalse();
        expect(menu.currentChild).toBe(0);
      }
    );

    test("will close when the 'Escape' key is pressed when inside the menu", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const toggle = menu.elements.controller;

      simulateKeypress("Enter", toggle.dom.toggle);
      simulateKeypress("Escape", menu.dom.menu);

      expect(toggle.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
      expect(menu.dom.menu.classList.contains("hide")).toBeTrue();
      expect(menu.dom.menu.classList.contains("show")).toBeFalse();
      expect(menu.currentChild).toBe(0);
    });
  });
}
