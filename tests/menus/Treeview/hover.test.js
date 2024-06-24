/**
 * Hover tests for the Treeview class.
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
import { threeLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import { simulatePointerEvent, PointerEvent } from "../helpers.js";

beforeAll(() => {
  // Extend jsdom MouseEvent class as PointerEvent class.
  window.PointerEvent = PointerEvent;
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;

  // Make sure to use fake timers.
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";

  // Restore the timers.
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

// Test hover events on the Treeview.
describe("Treeview", () => {
  // Test hover type on.
  describe("with hover type on", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the menu's current event is set to mouse when a menu item is hovered.
      it("should set the menu's current event to mouse when a menu item is hovered", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(menu.currentEvent).toBe("mouse");
      });
      // Test that the room menu's blurChildren method is called when a menu item is hovered.
      it("should call the root menu's blurChildren method when a menu item is hovered", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });

        // Spy on the root menu's blurChildren method.
        const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[0].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
      // Test that the menu's focusChild method is called with the hovered menu item's index.
      it.each([1, 2, 3, 4, 5, 6, 7])(
        "should call the menu's focusChild method with menu item %s's index",
        (i) => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });

          // Spy on the menu's focusChild method.
          const spy = vi.spyOn(menu, "focusChild");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[i].dom.link
          );

          expect(spy).toHaveBeenCalledWith(i);
        }
      );
      // Test that clearTimeout is called when a submenu item is hovered.
      it("should call clearTimeout when a submenu item is hovered", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });

        // Spy on the menu's clearTimeout method.
        const spy = vi.spyOn(menu, "_clearTimeout");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        expect(spy).toHaveBeenCalled();
      });
      // Test that preview is called after a delay when a submenu item is hovered.
      it("should call preview after a delay when a submenu item is hovered", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });

        // Spy on the menu's preview method.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        // Advance the timers by the menu's enter delay.
        vi.advanceTimersByTime(menu.enterDelay);

        vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
          timeout: 10000,
          interval: 10,
        });
      });
      // Test that preview is called immediately when a submenu item is hovered and enterDelay is set to 0.
      it("should call preview immediately when a submenu item is hovered and enterDelay is set to 0", () => {
        // Create a new Treeview instance for testing.
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          enterDelay: 0,
        });

        // Spy on the menu's preview method.
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
      describe("when a menu item is a submenu item", () => {
        // Test that clearTimeout is called when a menu item is unhovered.
        it("should call clearTimeout when a menu item is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on clearTimeout.
          const spy = vi.spyOn(menu, "_clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that clearTimeout is not called when a menu item is unhovered and leaveDelay is set to 0.
        it("should not call clearTimeout when a menu item is unhovered and leaveDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on clearTimeout.
          const spy = vi.spyOn(menu, "_clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          expect(spy).not.toHaveBeenCalled();
        });
      });
      describe("when a menu is the root menu", () => {
        // Test that clearTimeout is called when a menu is unhovered.
        it("should call clearTimeout when a menu is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on clearTimeout.
          const spy = vi.spyOn(menu, "_clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          expect(spy).toHaveBeenCalled();
        });
        // Test that clearTimeout is not called when a menu is unhovered and leaveDelay is set to 0.
        it("should not call clearTimeout when a menu is unhovered and leaveDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on clearTimeout.
          const spy = vi.spyOn(menu, "_clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          expect(spy).not.toHaveBeenCalled();
        });
        // Test that closeChildren is called after a delay when a menu is unhovered.
        it("should call closeChildren after a delay when a menu is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on closeChildren.
          const spy = vi.spyOn(menu, "closeChildren");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          // Advance the timers by the menu's leave delay.
          vi.advanceTimersByTime(menu.leaveDelay);

          vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
            timeout: 10000,
            interval: 10,
          });
        });
        // Test that closeChildren is called immediately when a menu is unhovered and leaveDelay is set to 0.
        it("should call closeChildren immediately when a menu is unhovered and leaveDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on closeChildren.
          const spy = vi.spyOn(menu, "closeChildren");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          expect(spy).toHaveBeenCalled();
        });
        // Test that blur is called after a delay when a menu is unhovered.
        it("should call blur after a delay when a menu is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on blur.
          const spy = vi.spyOn(menu, "blur");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          // Advance the timers by the menu's leave delay.
          vi.advanceTimersByTime(menu.leaveDelay);

          vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
            timeout: 10000,
            interval: 10,
          });
        });
        // Test that blur is called immediately when a menu is unhovered and leaveDelay is set to 0.
        it("should call blur immediately when a menu is unhovered and leaveDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on blur.
          const spy = vi.spyOn(menu, "blur");

          // Simulate the pointerleave event.
          simulatePointerEvent("pointerleave", menu.dom.menu);

          expect(spy).toHaveBeenCalled();
        });
      });
      describe("when a menu is not the root menu", () => {
        // Test that closeChildren is not called when a menu is unhovered.
        it("should not call closeChildren when a menu is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

          // Spy on closeChildren.
          const spy = vi.spyOn(menu, "closeChildren");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.submenuToggles[0].elements.controlledMenu
          );

          expect(spy).not.toHaveBeenCalled();
        });
        // Test that blur is not called when a menu is unhovered.
        it("should not call blur when a menu is unhovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

          // Spy on blur.
          const spy = vi.spyOn(menu, "blur");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.submenuToggles[0].elements.controlledMenu
          );

          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });
  // Test hover type dynamic.
  describe("with hover type dynamic", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the menu's current child is set to the hovered menu item's index.
      describe("if the menu is not the root menu", () => {
        // Test that the menu's current event is set to mouse when a menu item is hovered.
        it("should set the menu's current event to mouse when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
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
        // Test that the root menu's blurChildren method is called when a menu item is hovered.
        it("should call the root menu's blurChildren method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Spy on the root menu's blurChildren method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .rootMenu,
            "blurChildren"
          );

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's focusCurrentChild method is called when a menu item is hovered.
        it("should call the menu's focusCurrentChild method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusCurrentChild"
          );

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
      });
      describe("if the menu is the root menu and the focus state is not none", () => {
        // Test that the menu's current event is set to mouse when a menu item is hovered.
        it("should set the menu's current event to mouse when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Set up the menu.
          menu.focusState = "self";

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(menu.currentEvent).toBe("mouse");
        });
        // Test that the root menu's blurChildren method is called when a menu item is hovered.
        it("should call the root menu's blurChildren method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Set up the menu.
          menu.focusState = "self";

          // Spy on the root menu's blurChildren method.
          const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's focusCurrentChild method is called when a menu item is hovered.
        it("should call the menu's focusCurrentChild method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Set up the menu.
          menu.focusState = "self";

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
      });
      describe("if the menu is the root menu and the focus state is none", () => {
        // Test that the menu's current event is not set to mouse when a menu item is hovered.
        it("should not set the menu's current event to mouse when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(menu.currentEvent).toBe("none");
        });
        // Test that the root menu's blurChildren method not is called when a menu item is hovered.
        it("should not call the root menu's blurChildren method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Spy on the root menu's blurChildren method.
          const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(spy).not.toHaveBeenCalled();
        });
        // Test that the menu's focusCurrentChild method is not called when a menu item is hovered.
        it("should not call the menu's focusCurrentChild method when a menu item is hovered", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[0].dom.link
          );

          expect(spy).not.toHaveBeenCalled();
        });
      });
      describe("if the menu item is a submenu item and the menu is not the root menu", () => {
        // Test that the menu's current event is set to mouse.
        it("should set the menu's current event to mouse", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
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
        // Test that the root menu's blurChildren method is called.
        it("should call the root menu's blurChildren method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the root menu's blurChildren method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .rootMenu,
            "blurChildren"
          );

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's focusCurrentChild method is called.
        it("should call the menu's focusCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusCurrentChild"
          );

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that clearTimeout is called.
        it("should call clearTimeout", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu item's clearTimeout method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "_clearTimeout"
          );

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.submenuToggles[0].elements.controlledMenu.elements
              .menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that preview is called after a delay.
        it("should call preview after a delay", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's preview method.
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

          // Advance the timers by the menu's enter delay.
          vi.advanceTimersByTime(menu.enterDelay);

          vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
            timeout: 10000,
            interval: 10,
          });
        });
        // Test that preview is called immediately when enterDelay is set to 0.
        it("should call preview immediately when enterDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
            enterDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's preview method.
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
      describe("if the menu item is a submenu item and the menu is the root menu with an open submenu", () => {
        // Test that the menu's current event is set to mouse.
        it("should set the menu's current event to mouse", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          expect(menu.currentEvent).toBe("mouse");
        });
        // Test that the root menu's blurChildren method is called.
        it("should call the root menu's blurChildren method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the root menu's blurChildren method.
          const spy = vi.spyOn(menu.elements.rootMenu, "blurChildren");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's focusCurrentChild method is called.
        it("should call the menu's focusCurrentChild method", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that clearTimeout is called.
        it("should call clearTimeout", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's clearTimeout method.
          const spy = vi.spyOn(menu, "_clearTimeout");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          // Advance the timers by the menu's enter delay.
          vi.advanceTimersByTime(menu.enterDelay);

          expect(spy).toHaveBeenCalled();
        });
        // Test that preview is called after a delay.
        it("should call preview after a delay", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's preview method.
          const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          // Advance the timers by the menu's enter delay.
          vi.advanceTimersByTime(menu.enterDelay);

          vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
            timeout: 10000,
            interval: 10,
          });
        });
        // Test that preview is called immediately when enterDelay is set to 0.
        it("should call preview immediately when enterDelay is set to 0", () => {
          // Create a new Treeview instance for testing.
          const menu = new Treeview({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
            enterDelay: 0,
          });

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's preview method.
          const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          expect(spy).toHaveBeenCalled();
        });
      });
    });
    // Test pointerleave.
    describe("pointerleave", () => {
      describe("if the menu is not the root menu", () => {
        describe("when a menu item is a submenu item", () => {
          // Test that clearTimeout is called when a menu item is unhovered.
          it("should call clearTimeout when a menu item is unhovered", () => {
            // Create a new Treeview instance for testing.
            const menu = new Treeview({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
            });

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's clearTimeout method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu,
              "_clearTimeout"
            );

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            // Advance the timers by the menu's leave delay.
            vi.advanceTimersByTime(menu.leaveDelay);

            vi.waitFor(() => expect(spy).toHaveBeenCalled(), {
              timeout: 10000,
              interval: 10,
            });
          });
          // Test that clearTimeout is not called when a menu item is unhovered and leaveDelay is set to 0.
          it("should not call clearTimeout when a menu item is unhovered and leaveDelay is set to 0", () => {
            // Create a new Treeview instance for testing.
            const menu = new Treeview({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
              leaveDelay: 0,
            });

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's clearTimeout method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu,
              "_clearTimeout"
            );

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            expect(spy).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
