/**
 * Hover tests for the Menubar class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import { simulateKeyboardEvent } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test keyboard events on the Menubar.
describe("Menubar", () => {
  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
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
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
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

      // Test that closeChildren is called on the menu on Tab keydown events if focus state is not none.
      it("should call closeChildren on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's closeChildren method.
        vi.spyOn(menu, "closeChildren");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.closeChildren).toHaveBeenCalled();
      });

      // Test that closeChildren is not called on the menu on Tab keydown events if focus state is none.
      it("should not call closeChildren on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's closeChildren method.
        vi.spyOn(menu, "closeChildren");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.closeChildren).not.toHaveBeenCalled();
      });

      // Test that focus is called on the menu on Tab keydown events if focus state is none.
      it("should call focus on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
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
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
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

    // Test character keys.
    describe("Character keys", () => {
      // Test that the event is prevented on character keydown events.
      it("should prevent the event on character keydown events", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "a",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
    });

    // Test top-level menus.
    describe("Top-level menus", () => {
      // Test ArrowRight, ArrowLeft, Home, and End.
      describe.each(["ArrowRight", "ArrowLeft", "Home", "End"])("%s", (key) => {
        // Test that the event is prevented on keydown events if focus state is self.
        it("should prevent the event on %s keydown events if focus state is self", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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

        // Test that the event is not prevented on keydown events if focus state is not self.
        it("should not prevent the event on %s keydown events if focus state is not self", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Trigger a keydown event.
          const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
            key,
          });

          expect(event.defaultPrevented).toBeFalsy();
        });
      });

      // Test Space, Enter, ArrowDown, and ArrowUp.
      describe.each([" ", "Enter", "ArrowDown", "ArrowUp"])("%s", (key) => {
        // Should prevent the event on keydown events if focus state is self and the current menu item is a submenu item.
        it("should prevent the event on %s keydown events if focus state is self and the current menu item is a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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

        // Should not prevent the event on keydown events if focus state is self and the current menu item is not a submenu item.
        it("should not prevent the event on %s keydown events if focus state is self and the current menu item is not a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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

        // Should not prevent the event on keydown events if focus state is not self and the current menu item is a submenu item.
        it("should not prevent the event on %s keydown events if focus state is not self and the current menu item is a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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

    // Test submenus.
    describe("submenus", () => {
      // Test Escape, ArrowRight, ArrowLeft, ArrowDown, ArrowUp, Home, and End.
      describe.each([
        "Escape",
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
      ])("%s", (key) => {
        // Test that the event is prevented on keydown events.
        it("should prevent the event on %s keydown events", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keydown event.
          const event = simulateKeyboardEvent(
            "keydown",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key,
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
      });

      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        // Test that the event is prevented on keydown events if the current menu item is a submenu item.
        it("should prevent the event on %s keydown events if the current menu item is a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

          // Trigger a keydown event.
          const event = simulateKeyboardEvent(
            "keydown",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key,
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });

        // Test that the event is not prevented on keydown events if the current menu item is not a submenu item.
        it("should not prevent the event on %s keydown events if the current menu item is not a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keydown event.
          const event = simulateKeyboardEvent(
            "keydown",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key,
            }
          );

          expect(event.defaultPrevented).toBeFalsy();
        });
      });
    });
  });

  // Test keyup.
  describe("keyup", () => {
    // Test that keyup events set the current event to keyboard.
    it("should set the current event to keyboard", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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
    // todo: Write tests.
    describe("Character keys", () => {
      // Test that the event is prevented if no modifier is pressed.
      // Test that the event is not prevented if a modifier is pressed.
      // Test that the root menu's current event is set to character.
      // Test that thet menu's focusNextChildWithCharacter method is called with the key that was pressed.
    });

    // Test top-level menus.
    // todo: Write tests.
    describe("top-level menus", () => {
      // Test Spacebar and Enter.
      // todo: Write tests.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's open method is called.
          // Test that the current menu's focusFirstChild method is called.
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
          // Test that the current menu link's click method is called.
        });
      });

      // Test ArrowRight.
      // todo: Write tests.
      describe("ArrowRight", () => {
        // Test that the event is prevented.
        // Test that the menu's focusNextChild method is called.

        describe("when the previous menu item was an open submenu item", () => {
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's preview method is called.
        });
        describe("when the previous menu item was not an open submenu item", () => {
          // Test that the menu's closeChildren method is called.
        });
      });

      // Test ArrowLeft.
      // todo: Write tests.
      describe("ArrowLeft", () => {
        // Test that the event is prevented.
        // Test that the menu's focusPreviousChild method is called.

        describe("when the previous menu item was an open submenu item", () => {
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's preview method is called.
        });
        describe("when the previous menu item was not an open submenu item", () => {
          // Test that the menu's closeChildren method is called.
        });
      });

      // Test ArrowDown.
      // todo: Write tests.
      describe("ArrowDown", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's open method is called.
          // Test that the current menu's focusFirstChild method is called.
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
        });
      });

      // Test ArrowUp.
      // todo: Write tests.
      describe("ArrowUp", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's open method is called.
          // Test that the current menu's focusLastChild method is called.
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
        });
      });

      // Test Home.
      // todo: Write tests.
      describe("Home", () => {
        // Test that the event is prevented.
        // Test that the menu's focusFirstChild method is called.
      });

      // Test End.
      // todo: Write tests.
      describe("End", () => {
        // Test that the event is prevented.
        // Test that the menu's focusLastChild method is called.
      });

      // Test Escape.
      // todo: Write tests.
      describe("Escape", () => {
        describe("when the menu has open submenu items", () => {
          // Test that the event is prevented.
          // Test that the menu's closeChildren method is called.
        });
        describe("when the menu does not have open submenu items and has a controller", () => {
          // Test that the event is prevented.
          // Test that the controller's close method is called.
          // Test that the menu's focusController method is called.
        });
        describe("when the menu does not have open submenu items and does not have a controller", () => {
          // Test that the event is not prevented.
        });
      });
    });

    // Test submenus.
    // todo: Write tests.
    describe("submenus", () => {
      // Test Spacebar and Enter.
      // todo: Write tests.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's open method is called.
          // Test that the current menu's focusFirstChild method is called.
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
          // Test that the current menu link's click method is called.
        });
      });

      // Test Escape.
      // todo: Write tests.
      describe("Escape", () => {
        // Test that the event is prevented.
        // Test that the root menu's closeChildren method is called.
        // Test that the root menu's focusCurrentChild method is called.
      });

      // Test ArrowRight.
      // todo: Write tests.
      describe("ArrowRight", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the child menu's current event is set to keyboard.
          // Test that the current menu toggle's open method is called.
          // Test that the child menu's focusFirstChild method is called.
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is prevented.
          // Test that the menu's closeChildren method is called.
          // Test that the menu's focusNextChild method is called.
          // Test that the root menu's current menu item's preview method is called if the root menu's current menu item is a submenu item.
        });
      });

      // Test ArrowLeft.
      // todo: Write tests.
      describe("ArrowLeft", () => {
        describe("when the parent menu's current menu item is a submenu item", () => {
          // Test that the event is prevented.
          // Test that the parent menu's current menu toggle's close method is called.
          // Test that the parent menu's focusCurrentChild method is called.

          describe("when the parent menu is also the root menu", () => {
            // Test that the parent menu's closeChildren method is called.
            // Test that the parent menu's focusPreviousChild method is called.

            describe("when the root menu's current menu item is a submenu item", () => {
              // Test that the root menu's child menu's current event is set to keyboard.
              // Test that the root menu's current menu toggle's preview method is called.
            });
          });
        });

        // Test ArrowDown.
        // todo: Write tests.
        describe("ArrowDown", () => {
          // Test that the event is prevented.
          // Test that the menu's focusNextChild method is called.
        });

        // Test ArrowUp.
        // todo: Write tests.
        describe("ArrowUp", () => {
          // Test that the event is prevented.
          // Test that the menu's focusPreviousChild method is called.
        });

        // Test Home.
        // todo: Write tests.
        describe("Home", () => {
          // Test that the event is prevented.
          // Test that the menu's focusFirstChild method is called.
        });

        // Test End.
        // todo: Write tests.
        describe("End", () => {
          // Test that the event is prevented.
          // Test that the menu's focusLastChild method is called.
        });
      });
    });
  });

  // Test keyboard events on the Menubar's controller.
  describe("Menubar Controller", () => {
    // Test keydown.
    describe("keydown", () => {
      // Test that keydown events set the current event to keyboard.
      it("should set the current event to keyboard on keydown events", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.elements.controller.dom.toggle);

        expect(menu.currentEvent).toBe("keyboard");
      });

      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        // Test that the event is prevented on Spacebar and Enter keydown events.
        it("should prevent the event on %s keydown events", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Trigger a keydown event.
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
      it("should set the current event to keyboard ", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
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
});
