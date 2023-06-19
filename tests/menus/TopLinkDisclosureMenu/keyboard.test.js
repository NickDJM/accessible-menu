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
    it("should set the current event to keyboard on keyup events", () => {
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
    // todo: Write tests.
    // describe.each(["Spacebar", "Enter"])("%s", (key) => {});

    // Test Escape.
    // todo: Write tests.
    // describe("Escape", () => {});

    // Test ArrowDown and ArrowRight.
    // todo: Write tests.
    // describe.each(["ArrowDown", "ArrowRight"])("%s", (key) => {});

    // Test ArrowUp and ArrowLeft.
    // todo: Write tests.
    // describe.each(["ArrowUp", "ArrowLeft"])("%s", (key) => {});

    // Test Home.
    // todo: Write tests.
    // describe("Home", () => {});

    // Test End.
    // todo: Write tests.
    // describe("End", () => {});
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
    it("should set the current event to keyboard on keyup events", () => {
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
      it("should prevent the event on %s keyup events", () => {
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
      it("should call open on the controller on %s keyup events", () => {
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
      it("should call focusFirstChild on the menu on %s keyup events", () => {
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
