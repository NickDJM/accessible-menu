/**
 * Click tests for the DisclosureMenu class.
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
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { simulatePointerEvent, PointerEvent } from "../helpers.js";

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

// Test click events on the DisclosureMenu.
describe("DisclosureMenu", () => {
  // Test pointerdown.
  describe("pointerdown", () => {
    // Test that pointerdown should set the current event to mouse.
    it("should set the current event to mouse", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerdown event.
      simulatePointerEvent("pointerdown", menu.elements.menuItems[0].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that pointerdown calls blurChildren on the root menu.
    it("should call blurChildren on the root menu", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on blurChildren.
      const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

      // Simulate a pointerdown event.
      simulatePointerEvent("pointerdown", menu.elements.menuItems[0].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerdown calls focusChild with the index of the clicked item.
    it.each([0, 1, 2, 3, 4, 5, 6])(
      "should call focusChild with the index of the item %s",
      (i) => {
        // Create a new DisclosureMenu instance for testing.
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

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
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that point up calls preventEvent with the current event if triggered on a submenu item.
    it("should call preventEvent with the current event if triggered on a submenu item", async () => {
      // Mock preventEvent.
      const eventHandlers = await import("../../../src/eventHandlers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

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
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

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
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(menu.focusState).toBe("self");
    });

    // Test that pointerup sets the focus state of the controlled menu to none if triggered on a submenu item that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on a submenu item that is open after the event", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.menuItems[1].dom.link);

      expect(
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState
      ).toBe("none");
    });

    // Test that pointerup sets the current event to mouse when triggered on the root menu's controller.
    it("should set the current event to mouse when triggered on the root menu's controller", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that pointerup calls preventEvent with the current event if triggered on the root menu's controller.
    it("should call preventEvent with the current event if triggered on the root menu's controller", async () => {
      // Mock preventEvent.
      const eventHandlers = await import("../../../src/eventHandlers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

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
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup does not set the focus state to self if triggered on the root menu's controller that is open after the event.
    it("should not set the focus state to self if triggered on the root menu's controller that is open after the event", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.focusState).not.toBe("self");
    });

    // Test that pointerup sets the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", menu.elements.controller.dom.toggle);

      expect(menu.focusState).toBe("none");
    });

    // Test that pointerup sets the current event to mouse when triggered on the document and focus state is not none.
    it("should set the current event to mouse when triggered on the document and focus state is not none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that pointerup does not set the current event to mouse when triggered on the document and focus state is none.
    it("should not set the current event to mouse when triggered on the document and focus state is none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(menu.currentEvent).not.toBe("mouse");
    });

    // Test that pointerup calls closeChildren if triggered on the document and focus state is not none.
    it("should call closeChildren if triggered on the document and focus state is not none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on closeChildren.
      const spy = vi.spyOn(menu, "closeChildren");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup does not call closeChildren if triggered on the document and focus state is none.
    it("should not call closeChildren if triggered on the document and focus state is none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on closeChildren.
      const spy = vi.spyOn(menu, "closeChildren");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that pointerup calls blur if triggered on the document and focus state is not none.
    it("should call blur if triggered on the document and focus state is not none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on blur.
      const spy = vi.spyOn(menu, "blur");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup does not call blur if triggered on the document and focus state is none.
    it("should not call blur if triggered on the document and focus state is none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on blur.
      const spy = vi.spyOn(menu, "blur");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that pointerup calls close on the controller if triggered on the document and focus state is not none.
    it("should call close on the controller if triggered on the document and focus state is not none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on close.
      const spy = vi.spyOn(menu.elements.controller, "close");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that pointerup does not call close on the controller if triggered on the document and focus state is none.
    it("should not call close on the controller if triggered on the document and focus state is none", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on close.
      const spy = vi.spyOn(menu.elements.controller, "close");

      // Simulate a pointerup event.
      simulatePointerEvent("pointerup", document);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
