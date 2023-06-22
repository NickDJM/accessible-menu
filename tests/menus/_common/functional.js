/**
 * Reusable functional tests.
 */
/* eslint-disable no-new */

import { twoLevelMenu, fullMenu } from "./test-menus";
import {
  simulatePointer,
  simulatePointerEvent,
  simulateKeypress,
  toggleIsOpen,
  toggleIsClosed,
  toggleIsPreviewed,
} from "./helpers";

/**
 * A set of open/close tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview)} MenuClass - The menu class to test.
 */
export function openClose(MenuClass) {
  const menuType = MenuClass.name;

  describe(menuType, () => {
    test("will open when the controller's open method is called", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const { controller } = menu.elements;

      // Call the method.
      controller.open();

      toggleIsOpen(controller);
    });

    test("will close when the controller's close method is called", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const { controller } = menu.elements;

      // Call the method.
      controller.close();

      toggleIsClosed(controller);
    });

    test("submenus will open when the controller's open method is called", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Call the method.
      toggle.open();

      toggleIsOpen(toggle);
    });

    test("submenus will close when the controller's close method is called", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Set up the menu for the test.
      toggle.open();

      // Call the method.
      toggle.close();

      toggleIsClosed(toggle);
    });
  });
}

/**
 * A set of click tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview)} MenuClass - The menu class to test.
 */
export function clickTests(MenuClass) {
  const menuType = MenuClass.name;

  describe(menuType, () => {
    test("will open when the controller is clicked when the menu is closed", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const { controller } = menu.elements;

      // Set up the menu for the test.
      controller.close();

      // Simulate the click.
      simulatePointer(controller.dom.toggle);

      // Toggle expectations.
      expect(controller.isOpen).toBeTrue();
      expect(controller.dom.toggle.getAttribute("aria-expanded")).toBe("true");

      // Child menu expectations.
      expect(menu.focusState).toBe("none");
      expect(menu.dom.menu.classList.contains("show")).toBeTrue();
      expect(menu.dom.menu.classList.contains("hide")).toBeFalse();
    });

    test("will close when the controller is clicked when the menu is open", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const { controller } = menu.elements;

      // Set up the menu for the test.
      controller.open();

      // Simulate the click.
      simulatePointer(controller.dom.toggle);

      toggleIsClosed(controller);
    });

    if (menuType === "DisclosureMenu" || menuType === "Menubar") {
      test("will close when a click event is registered outside of the menu", () => {
        // Set up the DOM.
        document.body.innerHTML = twoLevelMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("#toggle-0"),
        });
        const { controller } = menu.elements;

        // Set up the menu for the test.
        controller.open();

        // Simulate the click.
        simulatePointer(document.querySelector("main"));

        toggleIsClosed(controller);
      });
    }

    test("submenus will open when the controller is clicked when the submenu is closed", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Simulate the click.
      simulatePointer(toggle.dom.toggle);

      toggleIsPreviewed(toggle);
    });

    test("submenus will close when the controller is clicked when the menu is open", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Set up the menu for the test.
      toggle.open();

      // Simulate the click.
      simulatePointer(toggle.dom.toggle);

      toggleIsClosed(toggle);
    });
  });
}

/**
 * A set of hover tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview)} MenuClass - The menu class to test.
 */
export function hoverTests(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} with hoverType "on"`, () => {
    test("submenus will open when a mouse enters their controller", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        hoverType: "on",
        hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
      });
      const toggle = menu.elements.submenuToggles[0];

      // Simulate the mouse.
      simulatePointerEvent("pointerenter", toggle.dom.toggle);

      toggleIsPreviewed(toggle);
    });

    test("submenus will close when a mouse leaves the submenu item", () => {
      // Set up the DOM.
      document.body.innerHTML = twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        hoverType: "on",
        hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
      });
      const menuItem = menu.elements.menuItems[1];
      const toggle = menu.elements.submenuToggles[0];

      // Set up the menu for the test.
      toggle.open();

      // Simulate the mouse.
      simulatePointerEvent("pointerleave", menuItem.dom.item);

      toggleIsClosed(toggle);
    });
  });

  describe(`${menuType} with hoverType "dynamic"`, () => {
    test("submenus will not open when a mouse enters their controller and no other submenus are open", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        hoverType: "dynamic",
        hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simulate the mouse.
      simulatePointerEvent("pointerenter", toggle.dom.toggle);

      toggleIsClosed(toggle);
    });

    test("submenus will not close when a mouse leaves the submenu item if no other submenus are opened", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        hoverType: "dynamic",
        hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
      });
      const menuItem = menu.elements.menuItems[1];
      const toggle = menu.elements.submenuToggles[0];

      // Set up the menu for the test.
      toggle.open();

      // Simulate the mouse.
      simulatePointerEvent("pointerleave", menuItem.dom.item);

      toggleIsOpen(toggle);
    });

    test("submenus will open when a mouse enters their controller if another submenu is already open", () => {
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
      const originalToggle = menu.elements.submenuToggles[0];
      const newToggle = menu.elements.submenuToggles[1];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      originalToggle.open();

      // Simulate the mouse.
      simulatePointerEvent("pointerenter", newToggle.dom.toggle);

      if (menuType === "DisclosureMenu" || menuType === "Menubar") {
        toggleIsClosed(originalToggle);
      }
      toggleIsPreviewed(newToggle);
    });

    test("submenus that are not direct children of the root menu with open when a mouse enters their controller", () => {
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
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;
      const submenuToggle = controlledMenu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      toggle.open();

      // Simulate the mouse.
      simulatePointerEvent("pointerenter", submenuToggle.dom.toggle);

      toggleIsPreviewed(submenuToggle);
    });

    test("submenus that are not direct children of the root menu will close when a mouse leaves the submenu item", () => {
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
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;
      const submenuItem = controlledMenu.elements.menuItems[1];
      const submenuToggle = controlledMenu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      toggle.open();
      submenuToggle.open();

      // Simulate the mouse.
      simulatePointerEvent("pointerleave", submenuItem.dom.item);

      toggleIsClosed(submenuToggle);
    });
  });
}

/**
 * A set of base keypress tests.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview)} MenuClass - The menu class to test.
 */
export function baseKeypressTests(MenuClass) {
  const menuType = MenuClass.name;

  describe(`${menuType} keypress tests`, () => {
    describe.each(["Enter", "Spacebar"])("'%s' key", (key) => {
      test("Opens the menu when triggered on the controller.", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("#toggle-0"),
        });
        const toggle = menu.elements.controller;

        // Simluate the keypress.
        simulateKeypress(key, toggle.dom.toggle);

        toggleIsOpen(toggle);
        expect(menu.currentChild).toBe(0);
      });

      test("Closes the menu when triggered on the open controller.", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("#toggle-0"),
        });
        const toggle = menu.elements.controller;

        toggle.open();

        // Simluate the keypress.
        simulateKeypress(key, toggle.dom.toggle);

        toggleIsClosed(toggle);
      });

      test("Activates 'clicks' root level menu item's link when not a submenu toggle", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const menuItem = menu.elements.menuItems[0];

        // Set up the spy.
        const spy = jest.spyOn(menuItem.dom.link, "click");

        // Enter the menu.
        menuItem.dom.link.focus();

        // Simluate the keypress.
        simulateKeypress(key, menuItem.dom.link);

        expect(spy).toHaveBeenCalled();
      });

      test("Activates 'clicks' child level menu item's link when not a submenu toggle", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const menuItem = controlledMenu.elements.menuItems[0];

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(0);

        // Set up the spy.
        const spy = jest.spyOn(menuItem.dom.link, "click");

        // Enter the menu.
        menuItem.dom.link.focus();

        // Simluate the keypress.
        simulateKeypress(key, menuItem.dom.link);

        expect(spy).toHaveBeenCalled();
      });

      test("Activates 'clicks' grandchild level menu item's link when not a submenu toggle", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new MenuClass({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const submenuToggle = controlledMenu.elements.submenuToggles[1];
        const subControlledMenu = submenuToggle.elements.controlledMenu;
        const menuItem = subControlledMenu.elements.menuItems[0];

        // Set up the spy.
        const spy = jest.spyOn(menuItem.dom.link, "click");

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(2);
        submenuToggle.open();
        subControlledMenu.focusChild(0);

        // Simluate the keypress.
        simulateKeypress(key, menuItem.dom.link);

        expect(spy).toHaveBeenCalled();
      });
    });
  });
}
