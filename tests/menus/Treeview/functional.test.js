/**
 * Test the Treeview class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
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
  toggleIsOpen,
  toggleIsPreviewed,
} from "../_common/helpers";

openClose(Treeview);
clickTests(Treeview);
hoverTests(Treeview);
baseKeypressTests(Treeview);

describe("Treeview keypress tests", () => {
  describe.each(["Spacebar", "Enter"])("'%s' key", (key) => {
    test("Opens the current submenu if closed.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
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

    test("Closes the current submenu if open.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
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
  });

  describe("'ArrowDown' key", () => {
    const key = "ArrowDown";

    describe("Moves focus to the next node that is focusable without opening or closing a node.", () => {
      test("Node to sibling node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        expect(menu.currentChild).toBe(1);
      });

      test("Node to child node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.preview();

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        toggleIsOpen(toggle);
        expect(controlledMenu.currentChild).toBe(0);
      });

      test("Node to parent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(2);

        // Simulate the keypress.
        simulateKeypress(key, controlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(2);
      });

      test("Node to grandparent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const submenuToggle = controlledMenu.elements.submenuToggles[1];
        const subControlledMenu = submenuToggle.elements.controlledMenu;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(2);
        submenuToggle.open();
        subControlledMenu.focusChild(2);

        // Simulate the keypress.
        simulateKeypress(key, subControlledMenu.dom.menu);

        // Toggle expectations.
        expect(submenuToggle.isOpen).toBeTrue();
        expect(submenuToggle.dom.toggle.getAttribute("aria-expanded")).toBe(
          "true"
        );

        // Controlled menu expectations.
        expect(subControlledMenu.focusState).toBe("none");
        expect(
          subControlledMenu.dom.menu.classList.contains("show")
        ).toBeTrue();
        expect(
          subControlledMenu.dom.menu.classList.contains("hide")
        ).toBeFalse();

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(2);
      });
    });

    test("If focus is on the last node, does nothing.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(4);

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(4);
    });
  });

  describe("'ArrowUp' key", () => {
    const key = "ArrowUp";

    describe("Moves focus to the previous node that is focusable without opening or closing a node.", () => {
      test("Node to sibling node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        expect(menu.currentChild).toBe(0);
      });

      test("Node to parent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(0);

        // Simulate the keypress.
        simulateKeypress(key, controlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(1);
      });

      test("Node to child node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(2);
        toggle.preview();

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        toggleIsOpen(toggle);
        expect(menu.currentChild).toBe(1);
        expect(controlledMenu.currentChild).toBe(2);
      });

      test("Node to grandchild node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const submenuToggle = controlledMenu.elements.submenuToggles[1];
        const subControlledMenu = submenuToggle.elements.controlledMenu;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(2);
        toggle.preview();
        submenuToggle.preview();
        menu.focusState = "self";

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        toggleIsOpen(submenuToggle);
        expect(menu.currentChild).toBe(1);
        expect(controlledMenu.currentChild).toBe(2);
        expect(subControlledMenu.currentChild).toBe(2);
      });
    });

    test("If focus is on the first node, does nothing.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(0);
    });
  });

  describe("'ArrowRight' key", () => {
    const key = "ArrowRight";

    test("When focus is on a closed node, opens the node; focus does not move.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsPreviewed(toggle);
    });

    test("When focus is on a open node, moves focus to the first child node.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.preview();

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsOpen(toggle);
      expect(controlledMenu.currentChild).toBe(0);
    });
  });

  describe("'ArrowLeft' key", () => {
    const key = "ArrowLeft";

    test("When focus is on an open node, closes the node.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.preview();

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsClosed(toggle);
    });

    test("When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.open();
      controlledMenu.focusChild(1);

      // Simulate the keypress.
      simulateKeypress(key, controlledMenu.dom.menu);

      toggleIsPreviewed(toggle);
      expect(menu.currentChild).toBe(1);
    });
  });

  describe("'Home' key", () => {
    const key = "Home";

    describe("Moves focus to first node without opening or closing a node.", () => {
      test("Node to sibling node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        expect(menu.currentChild).toBe(0);
      });

      test("Node to parent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(1);

        // Simulate the keypress.
        simulateKeypress(key, controlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(0);
      });

      test("Node to grandparent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const submenuToggle = controlledMenu.elements.submenuToggles[1];
        const subControlledMenu = submenuToggle.elements.controlledMenu;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(2);
        submenuToggle.open();
        subControlledMenu.focusChild(1);

        // Simulate the keypress.
        simulateKeypress(key, subControlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(0);
      });
    });
  });

  describe("'End' key", () => {
    const key = "End";

    describe("Moves focus to the last node that can be focused without expanding any nodes that are closed.", () => {
      test("Node to sibling node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        expect(menu.currentChild).toBe(4);
      });

      test("Node to child node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[2];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        toggle.preview();

        // Simulate the keypress.
        simulateKeypress(key, menu.dom.menu);

        toggleIsOpen(toggle);
        expect(menu.currentChild).toBe(4);
        expect(controlledMenu.currentChild).toBe(2);
      });

      test("Node to parent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(0);

        // Simulate the keypress.
        simulateKeypress(key, controlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(4);
      });

      test("Node to grandparent node", () => {
        // Set up the DOM.
        document.body.innerHTML = fullMenu;
        const menu = new Treeview({
          menuElement: document.querySelector("#menu-0"),
          submenuItemSelector: "li.dropdown",
        });
        const toggle = menu.elements.submenuToggles[0];
        const { controlledMenu } = toggle.elements;
        const submenuToggle = controlledMenu.elements.submenuToggles[0];
        const subControlledMenu = submenuToggle.elements.controlledMenu;

        // Enter the menu.
        menu.elements.menuItems[0].dom.link.focus();

        // Set up the menu for the test.
        menu.focusChild(1);
        toggle.open();
        controlledMenu.focusChild(1);
        submenuToggle.open();
        subControlledMenu.focusChild(0);

        // Simulate the keypress.
        simulateKeypress(key, subControlledMenu.dom.menu);

        toggleIsPreviewed(toggle);
        expect(menu.currentChild).toBe(4);
      });
    });
  });

  describe("'Character' keys", () => {
    const key = "s";

    test("Focus moves to the next node with a name that starts with the typed character.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;
      const submenuToggle = controlledMenu.elements.submenuToggles[0];
      const subControlledMenu = submenuToggle.elements.controlledMenu;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      toggle.preview();
      submenuToggle.preview();

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      expect(menu.currentChild).toBe(1);
      expect(controlledMenu.currentChild).toBe(0);
      expect(subControlledMenu.currentChild).toBe(0);

      // Simulate the keypress again.
      simulateKeypress(key, controlledMenu.dom.menu);

      expect(menu.currentChild).toBe(1);
      toggleIsOpen(toggle);
      expect(controlledMenu.currentChild).toBe(1);
      expect(subControlledMenu.currentChild).toBe(0);

      // Simulate the keypress again.
      simulateKeypress(key, subControlledMenu.dom.menu);

      expect(menu.currentChild).toBe(1);
      expect(controlledMenu.currentChild).toBe(1);
      toggleIsOpen(submenuToggle);
      expect(subControlledMenu.currentChild).toBe(1);
    });

    test("Search wraps to first node if a matching name is not found among the nodes that follow the focused node.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];
      const { controlledMenu } = toggle.elements;

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      toggle.open();
      controlledMenu.focusChild(1);

      // Simulate the keypress.
      simulateKeypress(key, controlledMenu.dom.menu);

      expect(menu.currentChild).toBe(1);
      toggleIsPreviewed(toggle);
    });
  });

  describe("'*' (asterisk) key", () => {
    const key = "*";

    test("Expands all closed sibling nodes that are at the same level as the focused node.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Simulate the keypress.
      simulateKeypress(key, menu.dom.menu);

      menu.elements.submenuToggles.forEach((toggle) => {
        toggleIsPreviewed(toggle);
      });
    });
  });
});
