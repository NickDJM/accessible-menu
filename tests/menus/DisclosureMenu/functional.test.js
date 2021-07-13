/**
 * Test the DisclosureMenu class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import {
  openClose,
  clickTests,
  hoverTests,
  baseKeypressTests,
} from "../_common/functional";
import { fullMenu } from "../_common/test-menus";
import { simulateKeypress } from "../_common/helpers";

openClose(DisclosureMenu);
clickTests(DisclosureMenu);
hoverTests(DisclosureMenu);
baseKeypressTests(DisclosureMenu);

describe("DisclosureMenu", () => {
  test("will close any open child when the 'Escape' key is pressed", () => {
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
    simulateKeypress("Escape", menu.dom.menu);

    expect(toggle.isOpen).toBeFalse();
  });

  test("will close the menu and focus the parent menu's current child if the menu has a parent menu", () => {
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
    simulateKeypress("Escape", submenu.dom.menu);

    expect(toggle.isOpen).toBeFalse();
    expect(submenu.focusState).toBe("none");
    expect(menu.focusState).toBe("self");
    expect(menu.currentChild).toBe(1);
  });

  test("will close if the menu has a controller and no child menus are open", () => {
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

    simulateKeypress("Escape", menu.dom.menu);

    expect(toggle.isOpen).toBeFalse();
    expect(menu.focusState).toBe("none");
  });

  describe("with optionalKeySupport set to 'true'", () => {
    describe.each(["ArrowDown", "ArrowRight"])(
      "when then '%s' key is pressed",
      (key) => {
        test("will focus the next child", () => {
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

        test("will enter a submenu if it is open", () => {
          // Set up the DOM.
          document.body.innerHTML = fullMenu;
          const menu = new DisclosureMenu({
            menuElement: document.querySelector("#menu-0"),
            submenuItemSelector: "li.dropdown",
            optionalKeySupport: true,
          });
          const toggle = menu.elements.submenuToggles[0];
          const submenu = toggle.elements.controlledMenu;

          // Enter the menu.
          menu.elements.menuItems[0].dom.link.focus();

          // Set up the menu for the test.
          menu.focusChild(1);
          toggle.preview();

          // Simluate the keypress.
          simulateKeypress(key, menu.dom.menu);

          expect(menu.focusState).toBe("child");
          expect(submenu.focusState).toBe("self");
          expect(submenu.currentChild).toBe(0);
        });

        test("will focus the next child and not enter a submenu if it is not open", () => {
          // Set up the DOM.
          document.body.innerHTML = fullMenu;
          const menu = new DisclosureMenu({
            menuElement: document.querySelector("#menu-0"),
            submenuItemSelector: "li.dropdown",
            optionalKeySupport: true,
          });
          const toggle = menu.elements.submenuToggles[0];
          const submenu = toggle.elements.controlledMenu;

          // Enter the menu.
          menu.elements.menuItems[0].dom.link.focus();

          // Set up the menu for the test.
          menu.focusChild(1);

          // Simluate the keypress.
          simulateKeypress(key, menu.dom.menu);

          expect(menu.focusState).toBe("self");
          expect(submenu.focusState).toBe("none");
          expect(menu.currentChild).toBe(2);
        });
      }
    );

    test.each(["ArrowUp", "ArrowLeft"])(
      "will focus the previous child when the '%s' key is pressed",
      (key) => {
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
      }
    );

    test("will focus the first child when the 'Home' key is pressed", () => {
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
      simulateKeypress("Home", menu.dom.menu);

      expect(menu.currentChild).toBe(0);
    });

    test("will focus the last child when the 'End' key is pressed", () => {
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
      simulateKeypress("End", menu.dom.menu);

      expect(menu.currentChild).toBe(4);
    });
  });
});
