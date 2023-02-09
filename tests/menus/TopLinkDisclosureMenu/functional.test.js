/**
 * Test the TopLinkDisclosureMenu class to make sure it functions correctly.
 */

import { describe, test, expect } from "vitest";
import { TopLinkDisclosureMenu } from "../../../index";
import {
  openClose,
  clickTests,
  hoverTests,
  baseKeypressTests,
} from "../_common/functional";
import { fullTopLinkMenu, twoLevelTopLinkMenu } from "../_common/test-menus";
import {
  simulatePointerEvent,
  simulateKeypress,
  toggleIsClosed,
  toggleIsPreviewed,
} from "../_common/helpers";

openClose(TopLinkDisclosureMenu);
clickTests(TopLinkDisclosureMenu);
hoverTests(TopLinkDisclosureMenu);
baseKeypressTests(TopLinkDisclosureMenu);

describe('TopLinkDisclosureMenu specific with hoverType "on"', () => {
  test("submenus will open when a mouse enters the sibling item of their controller", () => {
    // Set up the DOM.
    document.body.innerHTML = twoLevelTopLinkMenu;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      hoverType: "on",
      hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
    });
    const toggle = menu.elements.submenuToggles[0];
    const siblingItem = menu.elements.menuItems[1];

    // Simulate the mouse.
    simulatePointerEvent("pointerenter", siblingItem.dom.link);

    toggleIsPreviewed(toggle);
  });
});

describe(`TopLinkDisclosureMenu specific with hoverType "dynamic"`, () => {
  test("submenus will not open when a mouse enters the sibling item of their controller and no other submenus are open", () => {
    // Set up the DOM.
    document.body.innerHTML = fullTopLinkMenu;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      hoverType: "dynamic",
      hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
    });
    const toggle = menu.elements.submenuToggles[0];
    const siblingItem = menu.elements.menuItems[1];

    // Enter the menu.
    menu.elements.menuItems[0].dom.link.focus();

    // Simulate the mouse.
    simulatePointerEvent("pointerenter", siblingItem.dom.link);

    toggleIsClosed(toggle);
  });

  test("submenus will open when a mouse enters the sibling item of their controller if another submenu is already open", () => {
    // Set up the DOM.
    document.body.innerHTML = fullTopLinkMenu;
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("#menu-0"),
      submenuItemSelector: "li.dropdown",
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("#toggle-0"),
      hoverType: "dynamic",
      hoverDelay: 0, // Set the hoverDelay to 0 so we don't have to worry about a setTimeout.
    });
    const originalToggle = menu.elements.submenuToggles[0];
    const newToggle = menu.elements.submenuToggles[1];
    const siblingItem = menu.elements.menuItems[3];

    // Enter the menu.
    menu.elements.menuItems[0].dom.link.focus();

    // Set up the menu for the test.
    originalToggle.open();

    // Simulate the mouse.
    simulatePointerEvent("pointerenter", siblingItem.dom.link);

    toggleIsClosed(originalToggle);
    toggleIsPreviewed(newToggle);
  });

  test("submenus that are not direct children of the root menu with open when a mouse enters the sibling item of their controller", () => {
    // Set up the DOM.
    document.body.innerHTML = fullTopLinkMenu;
    const menu = new TopLinkDisclosureMenu({
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
    const siblingItem = controlledMenu.elements.menuItems[1];

    // Enter the menu.
    menu.elements.menuItems[0].dom.link.focus();

    // Set up the menu for the test.
    toggle.open();

    // Simulate the mouse.
    simulatePointerEvent("pointerenter", siblingItem.dom.link);

    toggleIsPreviewed(submenuToggle);
  });
});

describe("TopLinkDisclosureMenu keypress tests", () => {
  describe.each(["Spacebar", "Enter"])("'%s' key", (key) => {
    test("If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(2);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsPreviewed(toggle);
    });
  });

  describe("'Escape' key", () => {
    const key = "Escape";

    test("If a dropdown is open, closes it.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(2);
      toggle.preview();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsClosed(toggle);
    });

    test("Closes the menu if the menu has a controller and no open children.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
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

describe("TopLinkDisclosureMenu optional keypress tests", () => {
  describe.each(["ArrowDown", "ArrowRight"])("'%s' key", (key) => {
    test("If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(2);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(3);
    });

    test("If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(2);
      toggle.preview();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.focusState).toBe("child");
      expect(controlledMenu.focusState).toBe("self");
      expect(controlledMenu.currentChild).toBe(0);
    });

    test("If focus is on a link, and it is not the last link, moves focus to the next link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
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
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
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
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(7);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(0);
    });
  });

  describe("'End' key", () => {
    const key = "End";

    test("If focus is on a button/link, and it is not the last button/link, moves focus to the last button/link.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        optionalKeySupport: true,
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(7);
    });
  });
});

describe("TopLinkDisclosureMenu submenu keypress tests", () => {
  describe("'Escape' key", () => {
    const key = "Escape";

    test("Closes the dropdown and sets focus on the button that controls that dropdown.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullTopLinkMenu;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const submenu = toggle.elements.controlledMenu;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(2);
      toggle.open();
      submenu.focusChild(0);

      // Simluate the keypress.
      simulateKeypress(key, submenu.dom.menu);

      toggleIsClosed(toggle);
      expect(menu.currentChild).toBe(2);
    });
  });
});
