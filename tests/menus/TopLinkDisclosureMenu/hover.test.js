/**
 * Hover tests for the TopLinkDisclosureMenu class.
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
import { threeLevelTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import {
  initializeMenu,
  simulatePointerEvent,
  PointerEvent,
  wait,
} from "../helpers.js";

beforeAll(() => {
  // Extend jsdom MouseEvent class as PointerEvent class.
  window.PointerEvent = PointerEvent;
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevelTopLink;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test hover events on the TopLinkDisclosureMenu.
describe("TopLinkDisclosureMenu", () => {
  // Test hover type on.
  describe("hover type on", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the current event is set to mouse when a menu item is hovered.
      it("should set the current event to mouse when a menu item is hovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });
        initializeMenu(menu);

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(menu.currentEvent).toBe("mouse");
      });

      // Test that the current child index is set to the hovered menu item's index.
      it.each([0, 1, 2, 3, 4, 5, 6])(
        "should set the current child index to the menu item %s",
        (i) => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });
          initializeMenu(menu);

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[i].dom.link
          );

          expect(menu.currentChild).toBe(i);
        }
      );

      // Test that preview is called after a delay when a menu item that is also a submenu item is hovered.
      it("should call preview after a delay when a menu item that is also a submenu item is hovered", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay,
        });
        initializeMenu(menu);

        // Set up to watch for preview calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that preview is called immediately when a menu item that is also a submenu item is hovered and hoverDelay is set to 0.
      it("should call preview immediately when a menu item that is also a submenu item is hovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up to watch for preview calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
    });

    // Test pointerleave.
    describe("pointerleave", () => {
      // Test that clearTimeout is called when a menu item is unhovered.
      it("should call clearTimeout when a menu item is unhovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });
        initializeMenu(menu);

        // Set up to watch for clearTimeout calls.
        const spy = vi.spyOn(window, "clearTimeout");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalledWith(menu._hoverTimeout);
      });

      // Test that the current event is set to mouse after a delay when a menu item is unhovered.
      it("should set the current event to mouse after a delay when a menu item is unhovered", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay,
        });
        initializeMenu(menu);

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(menu.currentEvent).toBe("mouse");
      });

      // Test that the current event is set to mouse immediately when a menu item is unhovered and hoverDelay is set to 0.
      it("should set the current event to mouse immediately when a menu item is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(menu.currentEvent).toBe("mouse");
      });

      // Test that close is called after a delay on the submenu toggle of the menu item that is unhovered.
      it("should call close after a delay on the submenu toggle of the menu item that is unhovered", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay,
        });
        initializeMenu(menu);

        // Set up to watch for close calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that close is called immediately on the submenu toggle of the menu item that is unhovered and hoverDelay is set to 0.
      it("should call close immediately on the submenu toggle of the menu item that is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up to watch for close calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
    });
  });

  // Test hover type dynamic.
  describe("hover type dynamic", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the current child is set to the menu item that is hovered.
      it.each([0, 1, 2, 3, 4, 5, 6])(
        "should set the current child to menu item %s",
        (i) => {
          // Create a new TopLinkDisclosureMenu instance for testing.
          const menu = new TopLinkDisclosureMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[i].dom.link
          );

          expect(menu.currentChild).toBe(i);
        }
      );

      // Test that the current event is set to mouse if the menu's focus state is not none.
      it("should set the current event to mouse if the menu's focus state is not none", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.focusState = "self";

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(menu.currentEvent).toBe("mouse");
      });

      // Test that the current event is not set to mouse if the menu's focus state is none.
      it("should not set the current event to mouse if the menu's focus state is none", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(menu.currentEvent).not.toBe("mouse");
      });

      // Test that the current event of a submenu is set to mouse when a menu item is hovered.
      it("should set the current event of a submenu to mouse when a menu item is hovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[0].dom.link
        );

        expect(
          menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
        ).toBe("mouse");
      });

      // Test that focusCurrentChild is called on the menu item that is hovered when focus state is not none.
      it("should call focusCurrentChild on the menu item that is hovered when focus state is not none", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.focusState = "self";

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(menu, "focusCurrentChild");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });

      // Test that focusCurrentChild is not called on the menu item that is hovered when focus state is none.
      it("should not call focusCurrentChild on the menu item that is hovered when focus state is none", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(menu, "focusCurrentChild");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(spy).not.toHaveBeenCalled();
      });

      // Test that focusCurrentChild is called on submenus when a menu item is hovered.
      it("should call focusCurrentChild on submenus when a menu item is hovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu,
          "focusCurrentChild"
        );

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[0].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });

      // Test that the current event is set to mouse if a submenu is already opened and a new summenu item is hovered.
      it("should set the current event to mouse if a submenu is already opened and a new summenu item is hovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[2].dom.link
        );

        expect(menu.currentEvent).toBe("mouse");
      });

      // Test that the current event is not set to mouse if a submenu is not already opened and a summenu item is hovered.
      it("should not set the current event to mouse if a submenu is not already opened and a summenu item is hovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        expect(menu.currentEvent).not.toBe("mouse");
      });

      // Test that the current event is set to mouse if a submenu item is hovered in a submenu.
      it("should set the current event to mouse if a submenu item is hovered in a submenu", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(
          menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
        ).toBe("mouse");
      });

      // Test that preview is called after a delay when a submenu is already opened and a new summenu item is hovered and hoverDelay is not set to 0.
      it("should call preview after a delay when a submenu is already opened and a new summenu item is hovered and hoverDelay is not set to 0", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay,
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Set up to watch for preview calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[2].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that preview is called immediately when a submenu is already opened and a new summenu item is hovered and hoverDelay is set to 0.
      it("should call preview immediately when a submenu is already opened and a new summenu item is hovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Set up to watch for preview calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[2].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });

      // Test that preview is called after a delay when a submenu item is hovered in a submenu and hoverDelay is not set to 0.
      it("should call preview after a delay when a submenu item is hovered in a submenu and hoverDelay is not set to 0", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay,
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Set up to watch for preview calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .submenuToggles[0],
          "preview"
        );

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that preview is called immediately when a submenu item is hovered in a submenu and hoverDelay is set to 0.
      it("should call preview immediately when a submenu item is hovered in a submenu and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        menu.elements.submenuToggles[0].open();

        // Set up to watch for preview calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .submenuToggles[0],
          "preview"
        );

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
    });

    // Test pointerleave.
    describe("pointerleave", () => {
      // Test that clearTimeout is not called on the root menu when a submenu item is unhovered.
      it("should not call clearTimeout on the root menu when a submenu item is unhovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up to watch for clearTimeout calls.
        const spy = vi.spyOn(window, "clearTimeout");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).not.toHaveBeenCalled();
      });

      // Test that clearTimeout is called on submenus when a submenu item is unhovered.
      it("should call clearTimeout on submenus when a submenu item is unhovered", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for clearTimeout calls.
        const spy = vi.spyOn(window, "clearTimeout");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalledWith(
          menu.elements.submenuToggles[0].elements.controlledMenu._hoverTimeout
        );
      });

      // Test that the setTimout is not called on the root menu when a submenu item is unhovered and hoverDelay is not set to 0.
      it("should not call setTimeout on the root menu when a submenu item is unhovered and hoverDelay is not set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
        });
        initializeMenu(menu);

        // Set up to watch for setTimeout calls.
        const spy = vi.spyOn(window, "setTimeout");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).not.toHaveBeenCalled();
      });

      // Test that current event is not immediately set to mouse on the root menu when a submenu item is unhovered and hoverDelay is set to 0.
      it("should not set the current event to mouse on the root menu when a submenu item is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(menu._currentEvent).not.toBe("mouse");
      });

      // Test that close is not called on the root menu's submenu items when a submenu is unhovered and hoverDelay is set to 0.
      it("should not call close on the root menu's submenu items when a submenu is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for close calls.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).not.toHaveBeenCalled();
      });

      // Test that focusCurrentChild is not called on the root menu's submenu items when a submenu is unhovered and hoverDelay is set to 0.
      it("should not call focusCurrentChild on the root menu's submenu items when a submenu is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(menu, "focusCurrentChild");

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).not.toHaveBeenCalled();
      });

      // Test that the current event is set to mouse after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0.
      it("should set the current event to mouse after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(
          menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
        ).toBe("mouse");
      });

      // Test that the current event is set to mouse immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0.
      it("should set the current event to mouse immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(
          menu.elements.submenuToggles[0].elements.controlledMenu.currentEvent
        ).toBe("mouse");
      });

      // Test that close is called after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0.
      it("should call close after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for close calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .submenuToggles[0],
          "close"
        );

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that close is called immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0.
      it("should call close immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for close calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .submenuToggles[0],
          "close"
        );

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });

      // Test that focusCurrentChild is called after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0.
      it("should call focusCurrentChild after a delay on submenus when a submenu item is unhovered and hoverDelay is not set to 0", async () => {
        const hoverDelay = 250;

        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu,
          "focusCurrentChild"
        );

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        await wait(hoverDelay);

        expect(spy).toHaveBeenCalled();
      });

      // Test that focusCurrentChild is called immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0.
      it("should call focusCurrentChild immediately on submenus when a submenu item is unhovered and hoverDelay is set to 0", () => {
        // Create a new TopLinkDisclosureMenu instance for testing.
        const menu = new TopLinkDisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "dynamic",
          hoverDelay: 0,
        });
        initializeMenu(menu);

        // Set up the menu.
        menu.elements.submenuToggles[0].open();

        // Set up to watch for focusCurrentChild calls.
        const spy = vi.spyOn(
          menu.elements.submenuToggles[0].elements.controlledMenu,
          "focusCurrentChild"
        );

        // Simulate the pointerleave event.
        simulatePointerEvent(
          "pointerleave",
          menu.elements.submenuToggles[0].elements.controlledMenu.elements
            .menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
