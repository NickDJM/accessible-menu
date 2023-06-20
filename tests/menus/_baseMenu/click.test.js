/**
 * Click tests for the BaseMenu class.
 */

import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  vi,
} from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import {
  initializeMenu,
  simulatePointerEvent,
  PointerEvent,
} from "../helpers.js";

vi.mock("../../../src/eventHandlers.js");

beforeAll(() => {
  // Extend jsdom MouseEvent class as PointerEvent class.
  window.PointerEvent = PointerEvent;
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test click events on the BaseMenu.
describe("BaseMenu", () => {
  // Test pointerdown.
  describe("pointerdown", () => {
    // Test that pointerdown should set the current event to mouse.
    it("should set the current event to mouse", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerdown event.
      simulatePointerEvent("pointerdown", menu.elements.menuItems[0].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that pointerdown calls blurChildren on the root menu.
    it("should call blurChildren on the root menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on blurChildren.
      const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

      // Simulate a pointerdown event.
      simulatePointerEvent("pointerdown", menu.elements.menuItems[0].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerdown calls focusChild with the index of the clicked item.
    it.each([0, 1, 2, 3, 4, 5, 6, 7])(
      "should call focusChild with the index of the item %s",
      (i) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        initializeMenu(menu);

        // Spy on focusChild.
        const spy = vi.spyOn(menu, "focusChild");

        // Simulate a pointerdown event.
        simulatePointerEvent(
          "pointerdown",
          menu.elements.menuItems[i].dom.link
        );

        expect(spy).toHaveBeenCalledWith(i);
      }
    );
  });

  // Test pointerup.
  describe("pointerup", () => {
    // Test that pointerup sets the current event to mouse if triggered on a submenu item.
    it("should set the current event to mouse if triggered on a submenu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that point up calls preventEvent with the current event if triggered on a submenu item.
    it("should call preventEvent with the current event if triggered on a submenu item", async () => {
      // Mock preventEvent.
      const eventHandlers = await import("../../../src/eventHandlers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on preventEvent.
      const spy = vi.spyOn(eventHandlers, "preventEvent");

      // Simulate a pointerup event.
      const event = simulatePointerEvent(
        "pointerup",
        menu.elements.menuItems[1].dom.link
      );

      expect(spy).toHaveBeenCalledWith(event);
    });

    // Test that pointerup calls toggle on item's toggle if triggered on a submenu item.
    it("should call toggle on item's toggle if triggered on a submenu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on toggle.
      const spy = vi.spyOn(
        menu.elements.menuItems[1].elements.toggle,
        "toggle"
      );

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup sets the focus state to self if triggered on a submenu item that is open after the event.
    it("should set the focus state to self if triggered on a submenu item that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(menu.focusState).toBe("self");
    });

    // Test that pointerup sets the focus state of the controlled menu to none if triggered on a submenu item that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on a submenu item that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState
      ).toBe("none");
    });

    // Test that pointerup sets the current event to mouse when triggered on the root menu's controller.
    it("should set the current event to mouse when triggered on the root menu's controller", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that pointerup calls preventEvent with the current event if triggered on the root menu's controller.
    it("should call preventEvent with the current event if triggered on the root menu's controller", async () => {
      // Mock preventEvent.
      const eventHandlers = await import("../../../src/eventHandlers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on preventEvent.
      const spy = vi.spyOn(eventHandlers, "preventEvent");

      // Simulate a pointerup event.
      const event = simulatePointerEvent(
        "pointerup",
        menu.elements.controller.dom.toggle
      );

      expect(spy).toHaveBeenCalledWith(event);
    });

    // Test that pointerup calls toggle on item's toggle if triggered on the root menu's controller.
    it("should call toggle on item's toggle if triggered on the root menu's controller", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup does not set the focus state to self if triggered on the root menu's controller that is open after the event.
    it("should not set the focus state to self if triggered on the root menu's controller that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.focusState).not.toBe("self");
    });

    // Test that pointerup sets the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.focusState).toBe("none");
    });
  });
});
