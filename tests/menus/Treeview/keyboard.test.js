/**
 * Hover tests for the Treeview class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import { simulateKeyboardEvent } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test keyboard events on the Treeview.
describe("Treeview", () => {
  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keydown event.
      simulateKeyboardEvent("keydown", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Tab.
    describe("Tab", () => {
      // Test that blur is called on the menu on Tab keydown events if focus state is not none.
      it("should call blur on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's blur method.
        vi.spyOn(menu, "blur");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.blur).toHaveBeenCalled();
      });

      // Test that blur is not called on the menu on Tab keydown events if focus state is none.
      it("should not call blur on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's blur method.
        vi.spyOn(menu, "blur");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.blur).not.toHaveBeenCalled();
      });

      // Test that focus is called on the menu on Tab keydown events if focus state is none.
      it("should call focus on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's focus method.
        vi.spyOn(menu, "focus");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.focus).toHaveBeenCalled();
      });

      // Test that focus is not called on the menu on Tab keydown events if focus state is not none.
      it("should not call focus on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's focus method.
        vi.spyOn(menu, "focus");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.focus).not.toHaveBeenCalled();
      });
    });

    // Test Spacebar, ArrowUp, ArrowDown, ArrowLeft, Asterisk, Home, and End.
    describe.each([
      "Spacebar",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "*",
      "Home",
      "End",
    ])("%s", (key) => {
      // Test that the event is prevented on keydown events if focus state is self.
      it("should prevent the event on %s keydown events if focus state is self", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
    });

    // Test Enter and ArrowRight.
    describe.each(["Enter", "ArrowRight"])("%s", (key) => {
      // Test that the event is prevented on keydown events if focus state is self and the current menu item is a submenu item.
      it("should prevent the event on %s keydown events if focus state is self and the current menu item is a submenu item", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 1;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that the event is not prevented on keydown events if focus state is self and the current menu item is not a submenu item.
      it("should not prevent the event on %s keydown events if focus state is self and the current menu item is not a submenu item", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });

      // Test that the event is not prevented on keydown events if focus state is not self and the current menu item is a submenu item.
      it("should not prevent the event on %s keydown events if focus state is not self and the current menu item is a submenu item", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "none";
        menu.currentChild = 1;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
    });

    // Test Escape.
    describe("Escape", () => {
      // Test that the event is prevented on Escape keydown events if the focus state is self and the menu has a controller.
      it("should prevent the Escape keydown event if the focus state is self and the menu has a controller", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Escape",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that the event is not prevented on Escape keydown events if the focus state is not self and the menu has a controller.
      it("should not prevent the Escape keydown event if the focus state is not self and the menu has a controller", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Escape",
        });

        expect(event.defaultPrevented).toBeFalsy();
      });

      // Test that the event is not prevented on Escape keydown events if the focus state is self and the menu does not have a controller.
      it("should not prevent the Escape keydown event if the focus state is self and the menu does not have a controller", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Escape",
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
    });
  });

  // Test keyup.
  describe("keyup", () => {
    // Test that keyup events set the current event to keyboard.
    it("should set the current event to keyboard", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keyup event on the menu's controller.
      simulateKeyboardEvent("keyup", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Character keys.
    describe("Character keys", () => {
      // Test that the event is prevented if no modifier is pressed.
      it("should prevent the event if no modifier is pressed", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the event is not prevented if a modifier is pressed.
      it("should not prevent the event if a modifier is pressed", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
          metaKey: true,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      // Test that the root menu's current event is set to character.
      it("should set the root menu's current event to character", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(menu.currentEvent).toBe("character");
      });
      // Test that thet menu's focusNextNodeWithCharacter method is called with the key that was pressed.
      it("should call the menu's focusNextNodeWithCharacter method with the key that was pressed", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.currentChild = 0;

        // Spy on the menu's focusNextNodeWithCharacter method.
        const spy = vi.spyOn(menu, "focusNextNodeWithCharacter");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(spy).toHaveBeenCalledWith("a");
      });
    });

    // Test Spacebar and Enter.
    describe.each(["Spacebar", "Enter"])("%s", (key) => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      describe("when the current menu item is a submenu item", () => {
        // Test that the current menu toggle's close method is called if the current menu item is an open submenu item.
        it("should call the current menu toggle's close method if the current menu item is an open submenu item", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the current menu toggle's close method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the current menu toggle's preview method is called if the current menu item is a closed submenu item.
        it("should call the current menu toggle's preview method if the current menu item is a closed submenu item", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;

          // Spy on the current menu toggle's preview method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(spy).toHaveBeenCalled();
        });
      });
      describe("when the current menu item is not a submenu item", () => {
        // Test that the current menu link's click method is called.
        it("should call the current menu link's click method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the current menu link's click method.
          const spy = vi.spyOn(menu.elements.menuItems[0].dom.link, "click");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test Escape.
    describe("Escape", () => {
      describe("if the menu has an open controller", () => {
        // Test that the controller's close method is called.
        it("should call the controller's close method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;
          menu.elements.controller.open();

          // Spy on the controller's close method.
          const spy = vi.spyOn(menu.elements.controller, "close");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's focusController method is called.
        it("should call the menu's focusController method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;
          menu.elements.controller.open();

          // Spy on the menu's focusController method.
          const spy = vi.spyOn(menu, "focusController");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test ArrowDown.
    describe("ArrowDown", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "ArrowDown",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      describe("if the current menu item is an open submenu item", () => {
        // Test that the menu's blurCurrentChild method is called.
        it("should call the menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the menu's blurCurrentChild method.
          const spy = vi.spyOn(menu, "blurCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowDown",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the child menu's current event is set to keyboard.
        it("should set the child menu's current event to keyboard", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowDown",
          });

          expect(
            menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
          ).toBe("keyboard");
        });
        // Test that the child menu's focusFirstChild method is called.
        it("should call the child menu's focusFirstChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the child menu's focusFirstChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusFirstChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowDown",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu not the root menu and the current menu item is the last menu item", () => {
        // Test that the menu's focusParentsNextChild method is called.
        it("should call the menu's focusParentsNextChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 5;

          // Spy on the menu's focusParentsNextChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusParentsNextChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowDown",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is the root menu and the current menu item is not an open submenu item", () => {
        // Test that the menu's focusNextChild method is called.
        it("should call the menu's focusNextChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusNextChild method.
          const spy = vi.spyOn(menu, "focusNextChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowDown",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is not the root menu and the current menu item is not the last menu item", () => {
        // Test that the menu's focusNextChild method is called.
        it("should call the menu's focusNextChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusNextChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusNextChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowDown",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test ArrowUp.
    describe("ArrowUp", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "ArrowUp",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      describe("if the current menu item is not the first item in the menu and the item before the current item is an open submenu item", () => {
        // Test that the menu's blurCurrentChild method is called.
        it("should call the menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Spy on the menu's blurCurrentChild method.
          const spy = vi.spyOn(menu, "blurCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowUp",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the current child is set to the item before the current item.
        it("should set the current child to the item before the current item", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowUp",
          });

          expect(menu.currentChild).toBe(1);
        });
        // Test that the child menu's current event is set to keyboard.
        it("should set the child menu's current event to keyboard", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowUp",
          });

          expect(
            menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
          ).toBe("keyboard");
        });
        // Test that the menu's focusChildsLastNode method is called.
        it("should call the menu's focusChildsLastNode method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Spy on the menu's focusChildsLastNode method.
          const spy = vi.spyOn(menu, "focusChildsLastNode");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowUp",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is not the root menu and then current menu item is the first item in the menu", () => {
        // Test the the menu's blurCurrentChild method is called.
        it("should call the menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's blurCurrentChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "blurCurrentChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the parent menu's current event is set to keyboard.
        it("should set the parent menu's current event to keyboard", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(menu.currentEvent).toBe("keyboard");
        });
        // Test that the parent menu's focusCurrentChild method is called.
        it("should call the parent menu's focusCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is the root menu and the item before the current menu item is not an open submenu item", () => {
        // Test that the menu's focusPreviousChild method is called.
        it("should call the menu's focusPreviousChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;

          // Spy on the menu's focusPreviousChild method.
          const spy = vi.spyOn(menu, "focusPreviousChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowUp",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is not the root menu and the current menu item is not the first item in the menu", () => {
        // Test that the menu's focusPreviousChild method is called.
        it("should call the menu's focusPreviousChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

          // Spy on the menu's focusPreviousChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusPreviousChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test ArrowRight.
    describe("ArrowRight", () => {
      describe("if the current menu item is a submenu item", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
      });

      describe("if the current menu item is an open submenu item", () => {
        // Test that the menu's blurCurrentChild method is called.
        it("should call the menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the menu's blurCurrentChild method.
          const spy = vi.spyOn(menu, "blurCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the child menu's current event is set to keyboard.
        it("should set the child menu's current event to keyboard", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });
          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(
            menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
          ).toBe("keyboard");
        });
        // Test that the child menu's focusFirstChild method is called.
        it("should call the child menu's focusFirstChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });
          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the child menu's focusFirstChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusFirstChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu item is a closed submenu item", () => {
        // Test that the current menu toggle's preview method is called.
        it("should call the current menu toggle's preview method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;

          // Spy on the current menu toggle's preview method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu item is not a submenu item", () => {
        // Test that the event is not prevented.
        it("should not prevent the event", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(event.defaultPrevented).toBeFalsy();
        });
      });
    });

    // Test ArrowLeft.
    describe("ArrowLeft", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "ArrowLeft",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      describe("if the current menu item is an open submenu item", () => {
        // Test that the child menu's blurCurrentChild method is called.
        it("should call the child menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the child menu's blurCurrentChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "blurCurrentChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowLeft",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the current menu toggle's close method is called.
        it("should call the current menu toggle's close method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].preview();

          // Spy on the current menu toggle's close method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowLeft",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("if the current menu is not the root menu", () => {
        // Test that the menu's blurCurrentChild method is called.
        it("should call the menu's blurCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's blurCurrentChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "blurCurrentChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowLeft",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the parent menu's current event is set to keyboard.
        it("should set the parent menu's current event to keyboard", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowLeft",
            }
          );

          expect(menu.currentEvent).toBe("keyboard");
        });
        // Test that the parent menu's focusCurrentChild method is called.
        it("should call the parent menu's focusCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the parent menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowLeft",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test Home.
    describe("Home", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "Home",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the menu's blurCurrentChild method is called.
      it("should call the menu's blurCurrentChild method", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the menu's blurCurrentChild method.
        const spy = vi.spyOn(menu, "blurCurrentChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "Home",
        });

        expect(spy).toHaveBeenCalled();
      });
      // Test that the root menu's focusFirstChild method is called.
      it("should call the root menu's focusFirstChild method", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the root menu's focusFirstChild method.
        const spy = vi.spyOn(menu, "focusFirstChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "Home",
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    // Test End.
    describe("End", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "End",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the menu's blurCurrentChild method is called.
      it("should call the menu's blurCurrentChild method", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the menu's blurCurrentChild method.
        const spy = vi.spyOn(menu, "blurCurrentChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "End",
        });

        expect(spy).toHaveBeenCalled();
      });
      // Test that the root menu's focusLastChild method is called.
      it("should call the root menu's focusLastChild method", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the root menu's focusLastChild method.
        const spy = vi.spyOn(menu, "focusLastChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "End",
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    // Test Asterisk.
    describe("*", () => {
      // Test that the event is prevented.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "*",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the menu's openChildren method is called.
      it("should call the menu's openChildren method", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the menu's openChildren method.
        const spy = vi.spyOn(menu, "openChildren");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "*",
        });

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});

// Test keyboard events on the Treeview's controller.
describe("Treeview Controller", () => {
  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keydown event on the menu's controller.
      simulateKeyboardEvent("keydown", menu.elements.controller.dom.toggle);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Spacebar and Enter.
    describe.each(["Spacebar", "Enter"])("%s", (key) => {
      // Test that the event is prevented on Spacebar and Enter keydown events.
      it("should prevent the event on %s keydown events", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keydown event on the menu's controller.
        const event = simulateKeyboardEvent(
          "keydown",
          menu.elements.controller.dom.toggle,
          {
            key,
          }
        );

        expect(event.defaultPrevented).toBeTruthy();
      });
    });
  });

  // Test keyup.
  describe("keyup", () => {
    // Test that keyup events set the current event to keyboard.
    it("should set the current event to keyboard", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keyup event on the menu's controller.
      simulateKeyboardEvent("keyup", menu.elements.controller.dom.toggle);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Spacebar and Enter.
    describe.each(["Spacebar", "Enter"])("%s", (key) => {
      // Test that the event is prevented on Spacebar and Enter keyup events.
      it("should prevent the event", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event on the menu's controller.
        const event = simulateKeyboardEvent(
          "keyup",
          menu.elements.controller.dom.toggle,
          {
            key,
          }
        );

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that open is called on the controller on Spacebar and Enter keyup events.
      it("should call open on the controller", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the controller's open method.
        vi.spyOn(menu.elements.controller, "open");

        // Trigger a keyup event on the menu's controller.
        simulateKeyboardEvent("keyup", menu.elements.controller.dom.toggle, {
          key,
        });

        expect(menu.elements.controller.open).toHaveBeenCalled();
      });

      // Test that focusFirstChild is called on the menu on Spacebar and Enter keyup events.
      it("should call focusFirstChild on the menu", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's focusFirstChild method.
        vi.spyOn(menu, "focusFirstChild");

        // Trigger a keyup event on the menu's controller.
        simulateKeyboardEvent("keyup", menu.elements.controller.dom.toggle, {
          key,
        });

        expect(menu.focusFirstChild).toHaveBeenCalled();
      });
    });
  });
});
