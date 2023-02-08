/**
 * Test the DisclosureMenu class to make sure it functions correctly.
 */

import { describe, test, expect } from "vitest";
import { DisclosureMenu } from "../../../index";
import {
  openClose,
  clickTests,
  hoverTests,
  baseKeypressTests,
} from "../_common/functional";
import { fullMenu } from "../_common/test-menus";
import {
  simulateKeypress,
  toggleIsClosed,
  toggleIsPreviewed,
} from "../_common/helpers";

openClose(DisclosureMenu);
clickTests(DisclosureMenu);
hoverTests(DisclosureMenu);
baseKeypressTests(DisclosureMenu);

describe("DisclosureMenu keypress tests", () => {
  describe.each(["Spacebar", "Enter"])("'%s' key", (key) => {
    test("If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsPreviewed(toggle);
    });
  });

  describe("'Escape' key", () => {
    const key = "Escape";

    test("If a dropdown is open, closes it.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.preview();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsClosed(toggle);
    });

    test("Closes the menu if the menu has a controller and no open children.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });
      const toggle = menu.elements.controller;

      // Set up the menu for the test.
      toggle.dom.toggle.focus();
      toggle.open();
      menu.focusChild(0);

      simulateKeypress(key, menu.dom.menu);

      toggleIsClosed(toggle);
    });
  });
});

describe("DisclosureMenu optional keypress tests", () => {
  describe.each(["ArrowDown", "ArrowRight"])("'%s' key", (key) => {
    test("If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(2);
    });

    test("If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.preview();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.focusState).toBe("child");
      expect(controlledMenu.focusState).toBe("self");
      expect(controlledMenu.currentChild).toBe(0);
    });

    test("If focus is on a link, and it is not the last link, moves focus to the next link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(1);
    });
  });

  describe.each(["ArrowUp", "ArrowLeft"])("'%s' key", (key) => {
    test("If focus is on a button/link, and it is not the first button/link, moves focus to the previous button/link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(0);
    });
  });

  describe("'Home' key", () => {
    const key = "Home";

    test("If focus is on a button/link, and it is not the first button/link, moves focus to the first button/link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(4);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(0);
    });
  });

  describe("'End' key", () => {
    const key = "End";

    test("If focus is on a button/link, and it is not the last button/link, moves focus to the last button/link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(4);
    });
  });
});

describe("DisclosureMenu submenu keypress tests", () => {
  describe("'Escape' key", () => {
    const key = "Escape";

    test("Closes the dropdown and sets focus on the button that controls that dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const submenu = toggle.elements.controlledMenu;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.open();
      submenu.focusChild(0);

      // Simluate the keypress.
      simulateKeypress(key, submenu.dom.menu);

      toggleIsClosed(toggle);
      expect(menu.currentChild).toBe(1);
    });
  });
});
