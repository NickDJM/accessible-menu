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
    it("should set the current event to keyboard on keyup events", () => {
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
    // describe("Character keys", () => {});

    // Test top-level menus.
    // todo: Write tests.
    // describe("top-level menus", () => {
    // Test Spacebar and Enter.
    // todo: Write tests.
    // describe.each(["Spacebar", "Enter"])("%s", (key) => {});

    // Test ArrowRight.
    // todo: Write tests.
    // describe("ArrowRight", () => {});

    // Test ArrowLeft.
    // todo: Write tests.
    // describe("ArrowLeft", () => {});

    // Test ArrowDown.
    // todo: Write tests.
    // describe("ArrowDown", () => {});

    // Test ArrowUp.
    // todo: Write tests.
    // describe("ArrowUp", () => {});

    // Test Home.
    // todo: Write tests.
    // describe("Home", () => {});

    // Test End.
    // todo: Write tests.
    // describe("End", () => {});

    // Test Escape.
    // todo: Write tests.
    // describe("Escape", () => {});
    // });

    // Test submenus.
    // todo: Write tests.
    // describe("submenus", () => {
    // Test Spacebar and Enter.
    // todo: Write tests.
    // describe.each(["Spacebar", "Enter"])("%s", (key) => {});

    // Test Escape.
    // todo: Write tests.
    // describe("Escape", () => {});

    // Test ArrowRight.
    // todo: Write tests.
    // describe("ArrowRight", () => {});

    // Test ArrowLeft.
    // todo: Write tests.
    // describe("ArrowLeft", () => {});

    // Test ArrowDown.
    // todo: Write tests.
    // describe("ArrowDown", () => {});

    // Test ArrowUp.
    // todo: Write tests.
    // describe("ArrowUp", () => {});

    // Test Home.
    // todo: Write tests.
    // describe("Home", () => {});

    // Test End.
    // todo: Write tests.
    // describe("End", () => {});
    // });
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
    it("should set the current event to keyboard on keyup events", () => {
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
      it("should prevent the event on %s keyup events", () => {
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
      it("should call open on the controller on %s keyup events", () => {
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
      it("should call focusFirstChild on the menu on %s keyup events", () => {
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
