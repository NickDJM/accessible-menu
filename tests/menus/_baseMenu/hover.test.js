/**
 * Hover tests for the BaseMenu class.
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
import BaseMenu from "../../../src/_baseMenu.js";
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
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test hover events on the BaseMenu.
describe("BaseMenu", () => {
  // Test hover type on.
  describe("with hover type on", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the menu's current event is set to mouse when a menu item is hovered.
      it("should set the menu's current event to mouse when a menu item is hovered", () => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
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
      // Test that the room menu's blurChildren method is called when a menu item is hovered.
      it("should call the root menu's blurChildren method when a menu item is hovered", () => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });
        initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });
          initializeMenu(menu);

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
      // Test that preview is called after a delay when a submenu item is hovered.
      it("should call preview after a delay when a submenu item is hovered", async () => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
        });
        initializeMenu(menu);

        // Spy on the menu's preview method.
        const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

        // Simulate the pointerenter event.
        simulatePointerEvent(
          "pointerenter",
          menu.elements.menuItems[1].dom.link
        );

        // Wait for the preview delay to pass.
        await wait(menu.enterDelay);

        expect(spy).toHaveBeenCalled();
      });
      // Test that preview is called immediately when a submenu item is hovered and enterDelay is set to 0.
      it("should call preview immediately when a submenu item is hovered and enterDelay is set to 0", () => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          hoverType: "on",
          enterDelay: 0,
        });
        initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });
          initializeMenu(menu);

          // Spy on clearTimeout.
          const spy = vi.spyOn(window, "clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          expect(spy).toHaveBeenCalledWith(menu._hoverTimeout);
        });
        // Test that clearTimeout is not called when a menu item is unhovered and leaveDelay is set to 0.
        it("should not call clearTimeout when a menu item is unhovered and leaveDelay is set to 0", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });
          initializeMenu(menu);

          // Spy on clearTimeout.
          const spy = vi.spyOn(window, "clearTimeout");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          expect(spy).not.toHaveBeenCalled();
        });
        // Test that the menu's current event is set to mouse after a delay when a menu item is unhovered.
        it("should set the menu's current event to mouse after a delay when a menu item is unhovered", async () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });
          initializeMenu(menu);

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          // Wait for the enter delay to pass.
          await wait(menu.enterDelay);

          expect(menu.currentEvent).toBe("mouse");
        });
        // Test that the menu's current menu toggle's close method is called after a delay when a menu item is unhovered.
        it("should call the menu's current menu toggle's close method after a delay when a menu item is unhovered", async () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
          });
          initializeMenu(menu);

          // Spy on the menu's current menu toggle's close method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "close");

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          // Wait for the enter delay to pass.
          await wait(menu.enterDelay);

          expect(spy).toHaveBeenCalled();
        });
        // Test that the menu's current event is set to mouse immediately when a menu item is unhovered and leaveDelay is set to 0.
        it("should set the menu's current event to mouse immediately when a menu item is unhovered and leaveDelay is set to 0", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });
          initializeMenu(menu);

          // Simulate the pointerleave event.
          simulatePointerEvent(
            "pointerleave",
            menu.elements.menuItems[1].dom.link
          );

          expect(menu.currentEvent).toBe("mouse");
        });
        // Test that the menu's current menu toggle's close method is called immediately when a menu item is unhovered and leaveDelay is set to 0.
        it("should call the menu's current menu toggle's close method immediately when a menu item is unhovered and leaveDelay is set to 0", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "on",
            leaveDelay: 0,
          });
          initializeMenu(menu);

          // Spy on the menu's current menu toggle's close method.
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
  });
  // Test hover type dynamic.
  describe("with hover type dynamic", () => {
    // Test pointerenter.
    describe("pointerenter", () => {
      // Test that the menu's current child is set to the hovered menu item's index.
      describe("if the menu is not the root menu", () => {
        // Test that the menu's current event is set to mouse when a menu item is hovered.
        it("should set the menu's current event to mouse when a menu item is hovered", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
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
        // Test that the root menu's blurChildren method is called when a menu item is hovered.
        it("should call the root menu's blurChildren method when a menu item is hovered", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
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

          expect(menu.currentEvent).toBe("none");
        });
        // Test that the root menu's blurChildren method not is called when a menu item is hovered.
        it("should not call the root menu's blurChildren method when a menu item is hovered", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
        // Test that preview is called after a delay.
        it("should call preview after a delay", async () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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

          await wait(menu.enterDelay);

          expect(spy).toHaveBeenCalled();
        });
        // Test that preview is called immediately when enterDelay is set to 0.
        it("should call preview immediately when enterDelay is set to 0", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
            enterDelay: 0,
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

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
        // Test that preview is called after a delay.
        it("should call preview after a delay", async () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
          });
          initializeMenu(menu);

          menu.currentChild = 1;
          menu.elements.submenuToggles[0].open();

          // Spy on the menu's preview method.
          const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

          // Simulate the pointerenter event.
          simulatePointerEvent(
            "pointerenter",
            menu.elements.menuItems[2].dom.link
          );

          await wait(menu.enterDelay);

          expect(spy).toHaveBeenCalled();
        });
        // Test that preview is called immediately when enterDelay is set to 0.
        it("should call preview immediately when enterDelay is set to 0", () => {
          // Create a new BaseMenu instance for testing.
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuItemSelector: "li.dropdown",
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
            hoverType: "dynamic",
            enterDelay: 0,
          });
          initializeMenu(menu);

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
          it("should call clearTimeout when a menu item is unhovered", async () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the window's clearTimeout method.
            const spy = vi.spyOn(window, "clearTimeout");

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            await wait(menu.leaveDelay);

            expect(spy).toHaveBeenCalledWith(
              menu.elements.submenuToggles[0].elements.controlledMenu
                ._hoverTimeout
            );
          });
          // Test that clearTimeout is not called when a menu item is unhovered and leaveDelay is set to 0.
          it("should not call clearTimeout when a menu item is unhovered and leaveDelay is set to 0", () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
              leaveDelay: 0,
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the window's clearTimeout method.
            const spy = vi.spyOn(window, "clearTimeout");

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            expect(spy).not.toHaveBeenCalled();
          });
          // Test that the menu's current event is set to mouse after a delay when a menu item is unhovered.
          it("should set the menu's current event to mouse after a delay when a menu item is unhovered", async () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            await wait(menu.leaveDelay);

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("mouse");
          });
          // Test that the menu's current menu toggle's close method is called after a delay when a menu item is unhovered.
          it("should call the menu's current menu toggle's close method after a delay when a menu item is unhovered", async () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's current menu toggle's close method.
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

            await wait(menu.leaveDelay);

            expect(spy).toHaveBeenCalled();
          });
          // Test that the menu's focusCurrentChild method is called after a delay when a menu item is unhovered.
          it("should call the menu's focusCurrentChild method after a delay when a menu item is unhovered", async () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's focusCurrentChild method.
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

            await wait(menu.leaveDelay);

            expect(spy).toHaveBeenCalled();
          });
          // Test that the menu's current event is set to mouse immediately when a menu item is unhovered and leaveDelay is set to 0.
          it("should set the menu's current event to mouse immediately when a menu item is unhovered and leaveDelay is set to 0", () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
              leaveDelay: 0,
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Simulate the pointerleave event.
            simulatePointerEvent(
              "pointerleave",
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[1].dom.link
            );

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("mouse");
          });
          // Test that the menu's current menu toggle's close method is called immediately when a menu item is unhovered and leaveDelay is set to 0.
          it("should call the menu's current menu toggle's close method immediately when a menu item is unhovered and leaveDelay is set to 0", () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
              leaveDelay: 0,
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's current menu toggle's close method.
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
          // Test that the menu's focusCurrentChild method is called immediately when a menu item is unhovered and leaveDelay is set to 0.
          it("should call the menu's focusCurrentChild method immediately when a menu item is unhovered and leaveDelay is set to 0", () => {
            // Create a new BaseMenu instance for testing.
            const menu = new BaseMenu({
              menuElement: document.querySelector("ul"),
              submenuItemSelector: "li.dropdown",
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
              hoverType: "dynamic",
              leaveDelay: 0,
            });
            initializeMenu(menu);

            menu.currentChild = 1;
            menu.elements.submenuToggles[0].open();

            // Spy on the menu's focusCurrentChild method.
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
  });
});
