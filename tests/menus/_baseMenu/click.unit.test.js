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
import * as eventHelpers from "@accessible-ecosystem/core/eventHelpers.js";
import { twoLevel, threeLevelWithTriggers } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
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

// Test click events on the BaseMenu.
describe("BaseMenu", () => {
  // Test click.
  describe("click", () => {
    it("should preserve focus and hasExpanded when the menu element itself is clicked", () => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();
      menu.focusState = "self";
      menu.hasExpanded = true;

      simulatePointerEvent("click", menu.dom.menu);

      expect(menu.focusState).toBe("self");
      expect(menu.hasExpanded).toBe(true);
    });

    // Test that click should set the current event to mouse.
    it("should set the current event to mouse", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[0].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that click should call _clearTimeout.
    it("should call _clearTimeout", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Spy on _clearTimeout.
      const spy = vi.spyOn(menu, "_clearTimeout");

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[0].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click calls blurChildren on the root menu.
    it("should call blurChildren on the root menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        menu.initialize();

        // Spy on focusChild.
        const spy = vi.spyOn(menu, "focusChild");

        // Simulate a click event.
        simulatePointerEvent("click", menu.elements.menuItems[i].dom.link);

        expect(spy).toHaveBeenCalledWith(i);
      }
    );

    // Test that click sets the current event to mouse if triggered on a submenu item.
    it("should set the current event to mouse if triggered on a submenu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(menu.focusState).toBe("self");
    });

    // Test that click sets the focus state of the controlled menu to none if triggered on a submenu item that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on a submenu item that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[1].dom.link);

      expect(
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState
      ).toBe("none");
    });

    // Test that click sets the current event to mouse when triggered on the root menu's controller.
    it("should set the current event to mouse when triggered on the root menu's controller", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

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
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click does not set the focus state to self if triggered on the root menu's controller that is open after the event.
    it("should not set the focus state to self if triggered on the root menu's controller that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(menu.focusState).not.toBe("self");
    });

    // Test that click sets the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on the root menu's controller that is open after the event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.controller.dom.controller);

      expect(menu.focusState).toBe("none");
    });

    // Test that click does not toggle submenu when event.button is not 0.
    it("should not toggle submenu when event.button is not 0", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a click event with button property set to 1.
      simulatePointerEvent("click", menu.elements.controller.dom.controller, {
        button: 1,
      });

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that click toggles submenu when event.button is 0.
    it("should toggle submenu when event.button is 0", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      // Spy on toggle.
      const spy = vi.spyOn(menu.elements.controller, "toggle");

      // Simulate a click event with button property set to 0.
      simulatePointerEvent("click", menu.elements.controller.dom.controller, {
        button: 0,
      });

      expect(spy).toHaveBeenCalled();
    });

    describe("separate triggers", () => {
      let menu;

      beforeEach(async () => {
        const helpers = await vi.importActual(
          "@accessible-ecosystem/core/eventHelpers.js"
        );
        vi.spyOn(eventHelpers, "preventEvent").mockImplementation(
          helpers.preventEvent
        );
        document.body.innerHTML = threeLevelWithTriggers;
        menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuTriggersSelector: ".submenu-trigger",
          transitionClass: "",
        });
        menu.initialize();
      });

      afterEach(() => {
        menu.dispose();
        vi.restoreAllMocks();
      });

      it("should leave controller clicks available without expanding its submenu", () => {
        const toggle = menu.elements.submenuToggles[0];
        const event = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });

        toggle.dom.controller.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
        expect(toggle.isExpanded).toBe(false);
        expect(menu.currentChild).toBe(1);
      });

      it("should expand from a trigger descendant and select its menu item", () => {
        const toggle = menu.elements.submenuToggles[1];
        const event = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });

        toggle.dom.trigger.firstElementChild.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(toggle.isExpanded).toBe(true);
        expect(menu.currentChild).toBe(2);
        expect(menu.focusState).toBe("self");
        expect(toggle.elements.controlledMenu.focusState).toBe("none");
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "true"
        );
        expect(toggle.dom.trigger.hasAttribute("aria-expanded")).toBe(false);

        toggle.dom.trigger.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        );

        expect(toggle.isExpanded).toBe(false);
      });

      it("should select the containing branch when a nested trigger is clicked", () => {
        const parent = menu.elements.submenuToggles[0];
        parent.expand();
        const submenu = parent.elements.controlledMenu;
        const toggle = submenu.elements.submenuToggles[0];

        toggle.dom.trigger.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        );

        expect(toggle.isExpanded).toBe(true);
        expect(submenu.currentChild).toBe(1);
        expect(menu.currentChild).toBe(1);
        expect(submenu.currentEvent).toBe("mouse");
      });

      it("should remove trigger listeners when the menu is disposed", () => {
        const toggle = menu.elements.submenuToggles[0];
        const change = vi.spyOn(toggle, "toggle");

        menu.dispose();
        toggle.dom.trigger.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        );

        expect(change).not.toHaveBeenCalled();
      });
    });
  });
});
