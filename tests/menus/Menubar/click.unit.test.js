/**
 * Click tests for the Menubar class.
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
import Menubar from "../../../src/menubar.js";
import { simulatePointerEvent, PointerEvent } from "../helpers.js";

vi.mock("@accessible-ecosystem/core/eventHelpers.js");

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

// Test click events on the Menubar.
describe("Menubar", () => {
  // Test click.
  describe("click", () => {
    it("should keep the menu open when the menu element itself is clicked", () => {
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.elements.controller.expand();
      menu.elements.submenuToggles[0].expand();
      menu.focusState = "self";

      simulatePointerEvent("click", menu.dom.menu);

      expect(menu.focusState).toBe("self");
      expect(menu.elements.controller.isExpanded).toBe(true);
      expect(menu.elements.submenuToggles[0].isExpanded).toBe(true);
      expect(menu.hasExpanded).toBe(true);
    });

    // Test that click should set the current event to mouse.
    it("should set the current event to mouse", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[0].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that click should call _clearTimeout.
    it("should call _clearTimeout", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on _clearTimeout.
      const spy = vi.spyOn(menu, "_clearTimeout");

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[0].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click calls blurChildren on the root menu.
    it("should call blurChildren on the root menu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on blurChildren.
      const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[0].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click calls focusChild with the index of the clicked item.
    it.each([0, 1, 2, 3, 4, 5, 6, 7])(
      "should call focusChild with the index of the item %s",
      (i) => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on focusChild.
        const spy = vi.spyOn(menu, "focusChild");

        // Simulate a click event.
        simulatePointerEvent("click", menu.elements.menuItems[i].dom.link);

        expect(spy).toHaveBeenCalledWith(i);
      }
    );

    // Test that click sets the current event to mouse if triggered on a submenu item.
    it("should set the current event to mouse if triggered on a submenu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that point up calls preventEvent with the current event if triggered on a submenu item.
    it("should call preventEvent with the current event if triggered on a submenu item", async () => {
      // Mock preventEvent.
      const eventHandlers =
        await import("@accessible-ecosystem/core/eventHelpers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on preventEvent.
      const spy = vi.spyOn(eventHandlers, "preventEvent");

      // Simulate a click event.
      const event = simulatePointerEvent(
        "click",
        menu.elements.menuItems[1].dom.link
      );

      expect(spy).toHaveBeenCalledWith(event);
    });

    // Test that click calls toggle on item's toggle if triggered on a submenu item.
    it("should call toggle on item's toggle if triggered on a submenu item", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on toggle.
      const spy = vi.spyOn(
        menu.elements.menuItems[1].elements.toggle,
        "toggle"
      );

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click sets the focus state to self if triggered on a submenu item that is open after the event.
    it("should set the focus state to self if triggered on a submenu item that is open after the event", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(menu.focusState).toBe("self");
    });

    // Test that click sets the focus state of the controlled menu to none if triggered on a submenu item that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on a submenu item that is open after the event", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState
      ).toBe("none");
    });

    // Test that click sets the current event to mouse when triggered on the root menu's controller.
    it("should set the current event to mouse when triggered on the root menu's controller", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that click calls preventEvent with the current event if triggered on the root menu's controller.
    it("should call preventEvent with the current event if triggered on the root menu's controller", async () => {
      // Mock preventEvent.
      const eventHandlers =
        await import("@accessible-ecosystem/core/eventHelpers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on preventEvent.
      const spy = vi.spyOn(eventHandlers, "preventEvent");

      // Simulate a click event.
      const event = simulatePointerEvent(
        "click",
        menu.elements.controller.dom.controller
      );

      expect(spy).toHaveBeenCalledWith(event);
    });

    // Test that click calls toggle on item's toggle if triggered on the root menu's controller.
    it("should call toggle on item's toggle if triggered on the root menu's controller", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click does not set the focus state to self if triggered on the root menu's controller that is open after the event.
    it("should not set the focus state to self if triggered on the root menu's controller that is open after the event", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(menu.focusState).not.toBe("self");
    });

    // Test that click sets the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(menu.focusState).toBe("none");
    });

    // Test that click sets the current event to mouse when triggered on the document and focus state is not none.
    it("should set the current event to mouse when triggered on the document and focus state is not none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that click does not set the current event to mouse when triggered on the document and focus state is none.
    it("should not set the current event to mouse when triggered on the document and focus state is none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(menu.currentEvent).not.toBe("mouse");
    });

    // Test that click calls collapseChildren if triggered on the document and focus state is not none.
    it("should call collapseChildren if triggered on the document and focus state is not none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on collapseChildren.
      const spy = vi.spyOn(menu, "collapseChildren");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click does not call collapseChildren if triggered on the document and focus state is none.
    it("should not call collapseChildren if triggered on the document and focus state is none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on collapseChildren.
      const spy = vi.spyOn(menu, "collapseChildren");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that click calls blur if triggered on the document and focus state is not none.
    it("should call blur if triggered on the document and focus state is not none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on blur.
      const spy = vi.spyOn(menu, "blur");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click does not call blur if triggered on the document and focus state is none.
    it("should not call blur if triggered on the document and focus state is none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on blur.
      const spy = vi.spyOn(menu, "blur");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that click calls collapse on the controller if triggered on the document and focus state is not none.
    it("should call close on the controller if triggered on the document and focus state is not none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.focusState = "self";

      // Spy on collapse.
      const spy = vi.spyOn(menu.elements.controller, "collapse");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click does not call close on the controller if triggered on the document and focus state is none.
    it("should not call close on the controller if triggered on the document and focus state is none", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on collapse.
      const spy = vi.spyOn(menu.elements.controller, "collapse");

      // Simulate a click event.
      simulatePointerEvent("click", document);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
