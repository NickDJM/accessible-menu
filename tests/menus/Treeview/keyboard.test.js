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
    it("should set the current event to keyboard on keyup events", () => {
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
      it("should prevent the event on %s keyup events", () => {
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
      it("should call open on the controller on %s keyup events", () => {
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
      it("should call focusFirstChild on the menu on %s keyup events", () => {
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
