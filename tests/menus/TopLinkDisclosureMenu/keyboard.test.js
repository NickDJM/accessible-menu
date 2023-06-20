/**
 * Hover tests for the TopLinkDisclosureMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevelTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { simulateKeyboardEvent } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevelTopLink;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test keyboard events on the TopLinkDisclosureMenu.
describe("TopLinkDisclosureMenu", () => {
  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keydown event.
      simulateKeyboardEvent("keydown", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test optional keys.
    describe.each([
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "Home",
      "End",
    ])("%s", (key) => {
      // Test that the event is prevented on ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Home, and End keydown events if focus state is self.
      it("should prevent the %s keydown event if focus state is self", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "self";

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that the event is not prevented on ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Home, and End keydown events if focus state is not self.
      it("should not prevent the %s keydown event if focus state is not self", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "none";

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });

      // Test that the event is not prevented if optional key support is disabled.
      it("should not prevent the %s keydown event if optional key support is disabled", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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

    // Test Spacebar and Enter.
    describe.each(["Spacebar", "Enter"])("%s", (key) => {
      // Test that the event is prevented on Spacebar and Enter keydown events if the focus state is self and the current menu item is a submenu item.
      it("should prevent the %s keydown event if the focus state is self and current menu item is a submenu item", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 2;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that the event is not prevented on Spacebar and Enter keydown events if the focus state is not self and the current menu item is a submenu item.
      it("should not prevent the %s keydown event if the focus state is not self and current menu item is a submenu item", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.currentChild = 2;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });

      // Test that the event is not prevented on Spacebar and Enter keydown events if the focus state is self and the current menu item is not a submenu item.
      it("should not prevent the %s keydown event if the focus state is self and current menu item is not a submenu item", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
    });

    // Test Escape.
    describe("Escape", () => {
      // Test that the event is prevented on Escape keydown events if the focus state is self and the menu has a controller.
      it("should prevent the Escape keydown event if the focus state is self and the menu has a controller", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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

      // Test that the event is prevented on Escape keydown events if the focus state is self and the menu has a parent menu.
      it("should prevent the Escape keydown event if the focus state is self and the menu has a parent menu", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
        });

        // Set up the menu.
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState =
          "self";
        menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent(
          "keydown",
          menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
          {
            key: "Escape",
          }
        );

        expect(event.defaultPrevented).toBeTruthy();
      });

      // Test that the event is not prevented on Escape keydown events if the focus state is not self and the menu has a parent menu.
      it("should not prevent the Escape keydown event if the focus state is not self and the menu has a parent menu", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
        });

        // Set up the menu.
        menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

        // Trigger a keydown event.
        const event = simulateKeyboardEvent(
          "keydown",
          menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
          {
            key: "Escape",
          }
        );

        expect(event.defaultPrevented).toBeFalsy();
      });

      // Test that the event is not prevented on Escape keydown events if the focus state is self and the menu does not have a parent menu.
      it("should not prevent the Escape keydown event if the focus state is self and the menu does not have a parent menu", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keyup event on the menu's controller.
      simulateKeyboardEvent("keyup", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Spacebar and Enter.
    describe.each(["Spacebar", "Enter"])("%s", (key) => {
      describe("when the current menu item is a submenu item", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the current menu toggle's close method is called if the current menu item is an open submenu item.
        it("should call the current menu toggle's close method if the current menu item is an open submenu item", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
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
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;

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
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
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
      describe("when the menu has an open submenu", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
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
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's closeChildren method is called.
        it("should call the menu's closeChildren method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Spy on the menu's closeChildren method.
          const spy = vi.spyOn(menu, "closeChildren");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("when the menu does not have an open submenu and has a parent menu", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Escape",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the parent menu's current event is set to keyboard.
        it("should set the parent menu's current event to keyboard", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Escape",
            }
          );

          expect(menu.currentEvent).toBe("keyboard");
        });
        // Test that the parent menu's closeChildren method is called.
        it("should call the parent menu's closeChildren method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the parent menu's closeChildren method.
          const spy = vi.spyOn(menu, "closeChildren");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Escape",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the parent menu's focusCurrentChild method is called.
        it("should call the parent menu's focusCurrentChild method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the parent menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Escape",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      describe("when the menu does not have an open submenu and has an open controller", () => {
        // Test that the controller's close method is called.
        it("should call the controller's close method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.controller.open();
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the controller's close method.
          const spy = vi.spyOn(menu.elements.controller, "close");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the focusController method is called.
        it("should call the focusController method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.controller.open();
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the focusController method.
          const spy = vi.spyOn(menu, "focusController");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test ArrowUp and ArrowRight.
    describe.each(["ArrowDown", "ArrowRight"])("%s", (key) => {
      // Test that the event is prevented if optionalKeySupport is true.
      it("should prevent the event if optionalKeySupport is true", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
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
      // Test that the event is not prevented if optionalKeySupport is false.
      it("should not prevent the event if optionalKeySupport is false", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: false,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      describe("when the current menu item is an open submenu item", () => {
        // Test that the child menu's current event is set to keyboard.
        it("should set the child menu's current event to keyboard", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            optionalKeySupport: true,
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(
            menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
          ).toBe("keyboard");
        });
        // Test that the child menu's focusFirstChild method is called.
        it("should call the child menu's focusFirstChild method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            optionalKeySupport: true,
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 2;
          menu.elements.submenuToggles[0].preview();

          // Spy on the child menu's focusFirstChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusFirstChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(spy).toHaveBeenCalled();
        });
      });
      describe("when the current menu item is not an open submenu item", () => {
        // Test that the menu's focusNextChild method is called.
        it("should call the menu's focusNextChild method", () => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            optionalKeySupport: true,
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusNextChild method.
          const spy = vi.spyOn(menu, "focusNextChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key,
          });

          expect(spy).toHaveBeenCalled();
        });
      });
    });

    // Test ArrowUp and ArrowLeft.
    describe.each(["ArrowUp", "ArrowLeft"])("%s", (key) => {
      // Test that the event is prevented if optionalKeySupport is true.
      it("should prevent the event if optionalKeySupport is true", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
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
      // Test that the even is not prevented if optionalKeySupport is false.
      it("should not prevent the event if optionalKeySupport is false", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: false,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      // Test the menu's focusPreviousChild method is called.
      it("should call the menu's focusPreviousChild method", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the menu's focusPreviousChild method.
        const spy = vi.spyOn(menu, "focusPreviousChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key,
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    // Test Home.
    describe("Home", () => {
      // Test that the event is prevented if optionalKeySupport is true.
      it("should prevent the event if optionalKeySupport is true", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 2;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "Home",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the even is not prevented if optionalKeySupport is false.
      it("should not prevent the event if optionalKeySupport is false", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: false,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 2;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "Home",
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      // Test that the menu's focusFirstChild method is called.
      it("should call the menu's focusFirstChild method", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 2;

        // Spy on the menu's focusFirstChild method.
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
      // Test that the event is prevented if optionalKeySupport is true.
      it("should prevent the event if optionalKeySupport is true", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
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
      // Test that the even is not prevented if optionalKeySupport is false.
      it("should not prevent the event if optionalKeySupport is false", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: false,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "End",
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      // Test that the menu's focusLastChild method is called.
      it("should call the menu's focusLastChild method", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          optionalKeySupport: true,
        });

        // Set up the menu.
        menu.focusState = "self";
        menu.currentChild = 0;

        // Spy on the menu's focusLastChild method.
        const spy = vi.spyOn(menu, "focusLastChild");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "End",
        });

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});

// Test keyboard events on the TopLinkDisclosureMenu's controller.
describe("TopLinkDisclosureMenu Controller", () => {
  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
    it("should set the current event to keyboard", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
