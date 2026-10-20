/**
 * Click tests for the TopLinkDisclosureMenu class.
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
import {
  twoLevelDisclosureTopLink,
  threeLevelDisclosureTopLinkSplit,
} from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { simulatePointerEvent, PointerEvent } from "../helpers.js";

vi.mock("@accessible-ecosystem/core/eventHelpers.js");

beforeAll(() => {
  // Extend jsdom MouseEvent class as PointerEvent class.
  window.PointerEvent = PointerEvent;
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test click events on the TopLinkDisclosureMenu.
describe("TopLinkDisclosureMenu", () => {
  // Test click.
  describe("click", () => {
    it("should use the selected links instead of buttons as submenu toggles", () => {
      document.body.innerHTML = threeLevelDisclosureTopLinkSplit;
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: ".menu-link",
        submenuSubtogglesSelector: ".menu-link",
      });
      const rootToggle = menu.elements.submenuToggles[0];
      const child = rootToggle.elements.controlledMenu;
      const childToggle = child.elements.submenuToggles[0];
      const rootButton = menu.dom.menu.querySelector(".root-toggle");
      const childButton = child.dom.menu.querySelector(".child-toggle");

      simulatePointerEvent("click", rootButton);

      expect(rootToggle.isExpanded).toBe(false);
      expect(rootToggle.dom.controller.tagName).toBe("A");

      simulatePointerEvent("click", rootToggle.dom.controller);

      expect(rootToggle.isExpanded).toBe(true);

      simulatePointerEvent("click", childButton);

      expect(childToggle.isExpanded).toBe(false);
      expect(childToggle.dom.controller.tagName).toBe("A");

      simulatePointerEvent("click", childToggle.dom.controller);

      expect(childToggle.isExpanded).toBe(true);
    });

    it.each([
      ["button", "button"],
      [".root-toggle", ".child-toggle"],
      [".dropdown-toggle", null],
    ])(
      "should toggle submenus separately from links with selectors %s and %s",
      (submenuTogglesSelector, submenuSubtogglesSelector) => {
        document.body.innerHTML = threeLevelDisclosureTopLinkSplit;
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector,
          submenuSubtogglesSelector,
        });
        const rootToggle = menu.elements.submenuToggles[0];
        const child = rootToggle.elements.controlledMenu;
        const childToggle = child.elements.submenuToggles[0];
        const rootLink = menu.elements.menuItems[1].dom.link;
        const childLink = child.elements.menuItems[1].dom.link;

        simulatePointerEvent("click", rootLink);

        expect(rootToggle.isExpanded).toBe(false);
        expect(rootLink.hasAttribute("aria-expanded")).toBe(false);

        simulatePointerEvent("click", rootToggle.dom.controller);

        expect(rootToggle.isExpanded).toBe(true);
        expect(rootToggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "true"
        );
        expect(rootToggle.dom.controller.getAttribute("aria-controls")).toBe(
          child.dom.menu.id
        );

        simulatePointerEvent("click", childLink);

        expect(rootToggle.isExpanded).toBe(true);
        expect(childToggle.isExpanded).toBe(false);
        expect(childLink.hasAttribute("aria-expanded")).toBe(false);

        simulatePointerEvent("click", childToggle.dom.controller);

        expect(rootToggle.isExpanded).toBe(true);
        expect(childToggle.isExpanded).toBe(true);
        expect(childToggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "true"
        );
        expect(childToggle.dom.controller.getAttribute("aria-controls")).toBe(
          childToggle.elements.controlledMenu.dom.menu.id
        );
        expect(childToggle.dom.controller.getAttribute("aria-label")).toBe(
          "Wild submenu"
        );
        expect(childToggle.dom.controller.textContent).toBe("");

        simulatePointerEvent("click", childToggle.dom.controller);

        expect(childToggle.isExpanded).toBe(false);
        expect(childToggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
        expect(rootToggle.isExpanded).toBe(true);

        simulatePointerEvent("click", rootToggle.dom.controller);

        expect(rootToggle.isExpanded).toBe(false);
        expect(rootToggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
      }
    );

    it("should keep the menu open when the menu element itself is clicked", () => {
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[2].dom.link);

      expect(menu.currentEvent).toBe("mouse");
    });

    // Test that point up calls preventEvent with the current event if triggered on a submenu item.
    it("should call preventEvent with the current event if triggered on a submenu item", async () => {
      // Mock preventEvent.
      const eventHandlers =
        await import("@accessible-ecosystem/core/eventHelpers.js");
      eventHandlers.preventEvent = vi.fn();

      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on preventEvent.
      const spy = vi.spyOn(eventHandlers, "preventEvent");

      // Simulate a click event.
      const event = simulatePointerEvent(
        "click",
        menu.elements.menuItems[2].dom.link
      );

      expect(spy).toHaveBeenCalledWith(event);
    });

    // Test that click calls toggle on item's toggle if triggered on a submenu item.
    it("should call toggle on item's toggle if triggered on a submenu item", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Spy on toggle.
      const spy = vi.spyOn(
        menu.elements.menuItems[2].elements.toggle,
        "toggle"
      );

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[2].dom.link);

      expect(spy).toHaveBeenCalled();
    });

    // Test that click sets the focus state to self if triggered on a submenu item that is open after the event.
    it("should set the focus state to self if triggered on a submenu item that is open after the event", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[2].dom.link);

      expect(menu.focusState).toBe("self");
    });

    // Test that click sets the focus state of the controlled menu to none if triggered on a submenu item that is open after the event.
    it("should set the focus state of the controlled menu to none if triggered on a submenu item that is open after the event", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Simulate a click event.
      simulatePointerEvent("click", menu.elements.menuItems[2].dom.link);

      expect(
        menu.elements.submenuToggles[0].elements.controlledMenu.focusState
      ).toBe("none");
    });

    // Test that click sets the current event to mouse when triggered on the root menu's controller.
    it("should set the current event to mouse when triggered on the root menu's controller", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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

      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
