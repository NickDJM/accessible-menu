/**
 * Keyboard tests for the Menubar class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import { simulateKeyboardEvent, simulatePointerEvent } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test keyboard events on the Menubar.
describe("Menubar", () => {
  // https://github.com/NickDJM/accessible-menu/issues/569
  it("should keep keyboard focus when a submenu opens beneath a stationary pointer", () => {
    vi.useFakeTimers();
    const menu = new Menubar({
      menuElement: document.querySelector("ul"),
      hoverType: "dynamic",
      enterDelay: 0,
      transitionClass: "",
    });
    const controller = menu.elements.menuItems[1].dom.link;
    const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;
    const hoveredLink = submenu.elements.menuItems[3].dom.link;
    controller.focus();

    simulateKeyboardEvent("keydown", controller, { key: "Enter" });
    simulateKeyboardEvent("keyup", controller, { key: "Enter" });
    simulatePointerEvent("pointerenter", hoveredLink);
    vi.runAllTimers();

    expect(document.activeElement).toBe(submenu.elements.menuItems[0].dom.link);

    simulatePointerEvent("pointermove", hoveredLink);
    vi.runAllTimers();

    expect(document.activeElement).toBe(hoveredLink);
    menu.dispose();
    vi.useRealTimers();
  });

  // Test keydown.
  describe("keydown", () => {
    // Test that keydown events set the current event to keyboard.
    it("should set the current event to keyboard on keydown events", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keydown event.
      simulateKeyboardEvent("keydown", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Tab.
    describe("Tab", () => {
      // Test that blur is called on the menu on Tab keydown events if focus state is not none.
      it("should call blur on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's blur method.
        vi.spyOn(menu, "blur");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.blur).toHaveBeenCalled();
      });

      // Test that blur is not called on the menu on Tab keydown events if focus state is none.
      it("should not call blur on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's blur method.
        vi.spyOn(menu, "blur");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.blur).not.toHaveBeenCalled();
      });

      // Test that collapseChildren is called on the menu on Tab keydown events if focus state is not none.
      it("should call collapseChildren on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's collapseChildren method.
        vi.spyOn(menu, "collapseChildren");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.collapseChildren).toHaveBeenCalled();
      });

      // Test that collapseChildren is not called on the menu on Tab keydown events if focus state is none.
      it("should not call collapseChildren on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's collapseChildren method.
        vi.spyOn(menu, "collapseChildren");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.collapseChildren).not.toHaveBeenCalled();
      });

      // Test that focus is called on the menu on Tab keydown events if focus state is none.
      it("should call focus on the menu on Tab keydown events if focus state is none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Spy on the menu's focus method.
        vi.spyOn(menu, "focus");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.focus).toHaveBeenCalled();
      });

      // Test that focus is not called on the menu on Tab keydown events if focus state is not none.
      it("should not call focus on the menu on Tab keydown events if focus state is not none", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.focusState = "self";

        // Spy on the menu's focus method.
        vi.spyOn(menu, "focus");

        // Trigger a keydown event.
        simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "Tab",
        });

        expect(menu.focus).not.toHaveBeenCalled();
      });
    });

    // Test character keys.
    describe("Character keys", () => {
      // Test that the event is prevented on character keydown events.
      it("should prevent the event on character keydown events", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keydown event.
        const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
          key: "a",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
    });

    // Test top-level menus.
    describe("Top-level menus", () => {
      // Test ArrowRight, ArrowLeft, Home, and End.
      describe.each(["ArrowRight", "ArrowLeft", "Home", "End"])("%s", (key) => {
        // Test that the event is prevented on keydown events if focus state is self.
        it("should prevent the event on %s keydown events if focus state is self", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";

          // Trigger a keydown event.
          const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
            key,
          });

          expect(event.defaultPrevented).toBeTruthy();
        });

        // Test that the event is not prevented on keydown events if focus state is not self.
        it("should not prevent the event on %s keydown events if focus state is not self", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
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

      // Test ArrowDown, and ArrowUp.
      describe.each(["ArrowDown", "ArrowUp"])("%s", (key) => {
        // Should prevent the event on keydown events if focus state is self and the current menu item is a submenu item.
        it("should prevent the event on %s keydown events if focus state is self and the current menu item is a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 1;

          // Trigger a keydown event.
          const event = simulateKeyboardEvent("keydown", menu.dom.menu, {
            key,
          });

          expect(event.defaultPrevented).toBeTruthy();
        });

        // Should not prevent the event on keydown events if focus state is self and the current menu item is not a submenu item.
        it("should not prevent the event on %s keydown events if focus state is self and the current menu item is not a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
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

        // Should not prevent the event on keydown events if focus state is not self and the current menu item is a submenu item.
        it("should not prevent the event on %s keydown events if focus state is not self and the current menu item is a submenu item", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;

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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
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
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
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

    // Test submenus.
    describe("submenus", () => {
      // Test Spacebar, Enter, Escape, ArrowRight, ArrowLeft, ArrowDown, ArrowUp, Home, and End.
      describe.each([
        "Spacebar",
        "Enter",
        "Escape",
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
      ])("%s", (key) => {
        // Test that the event is prevented on keydown events.
        it("should prevent the event on %s keydown events", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keydown event.
          const event = simulateKeyboardEvent(
            "keydown",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key,
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
      });
    });
  });

  // Test keyup.
  describe("keyup", () => {
    describe("submenu leaf activation", () => {
      let menu;

      afterEach(() => {
        menu?.dispose();
      });

      // https://github.com/NickDJM/accessible-menu/issues/554
      it.each(["Enter", " "])(
        "should activate a nested link once and restore its root tab stop on %s",
        async (key) => {
          menu = new Menubar({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          });
          const parent = menu.elements.menuItems[1];
          const submenu = parent.elements.childMenu;
          const nestedParent = submenu.elements.menuItems[1];
          const nestedMenu = nestedParent.elements.childMenu;
          const link = nestedMenu.elements.menuItems[0].dom.link;
          menu.currentEvent = "keyboard";
          menu.focusChild(1);
          parent.elements.toggle.preview();
          submenu.currentChild = 1;
          nestedParent.elements.toggle.preview();
          nestedMenu.focusFirstChild();
          await new Promise(requestAnimationFrame);
          expect(document.activeElement).toBe(link);

          const click = vi.fn();
          const collapse = vi.spyOn(menu, "collapseChildren");
          link.addEventListener("click", click);

          simulateKeyboardEvent("keydown", link, { key });
          simulateKeyboardEvent("keyup", link, { key });
          await new Promise(requestAnimationFrame);

          expect(click).toHaveBeenCalledTimes(1);
          expect(click.mock.calls[0][0].defaultPrevented).toBe(false);
          expect(collapse).toHaveBeenCalledTimes(1);
          expect(menu.currentChild).toBe(1);
          expect(
            Array.from(menu.dom.menu.querySelectorAll('[tabindex="0"]'))
          ).toEqual([parent.dom.link]);
          collapse.mockRestore();
        }
      );
    });

    // Test that keyup events set the current event to keyboard.
    it("should set the current event to keyboard", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      // Trigger a keyup event on the menu's controller.
      simulateKeyboardEvent("keyup", menu.dom.menu);

      expect(menu.currentEvent).toBe("keyboard");
    });

    // Test Character keys.
    describe("Character keys", () => {
      // Test that the event is prevented if no modifier is pressed.
      it("should prevent the event if no modifier is pressed", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(event.defaultPrevented).toBeTruthy();
      });
      // Test that the event is not prevented if a modifier is pressed.
      it("should not prevent the event if a modifier is pressed", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
          metaKey: true,
        });

        expect(event.defaultPrevented).toBeFalsy();
      });
      // Test that the root menu's current event is set to character.
      it("should set the root menu's current event to character", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(menu.currentEvent).toBe("character");
      });
      // Test that the menu's focusNextChildWithCharacter method is called with the key that was pressed.
      it("should call the menu's focusNextChildWithCharacter method with the key that was pressed", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Set up the menu.
        menu.currentChild = 0;

        // Spy on the menu's focusNextChildWithCharacter method.
        const spy = vi.spyOn(menu, "focusNextChildWithCharacter");

        // Trigger a keyup event.
        simulateKeyboardEvent("keyup", menu.dom.menu, {
          key: "a",
        });

        expect(spy).toHaveBeenCalledWith("a");
      });
    });

    // Test top-level menus.
    describe("top-level menus", () => {
      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the child menu's current event is set to keyboard.
          it("should set the child menu's current event to keyboard", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's open method is called.
          it("should call the current menu toggle's open method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the menu toggle's open method.
            const spy = vi.spyOn(menu.elements.submenuToggles[0], "expand");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the first item in the child menu is focused.
          it("should focus the first item in the child menu", () => {
            // Mock requestAnimationFrame.
            vi.spyOn(window, "requestAnimationFrame").mockImplementation(
              (callback) => {
                callback();
              }
            );

            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the menu's focusChild method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu,
              "focusChild"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(spy).toHaveBeenCalledWith(0);
          });
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the current menu link's click method is called.
          it("should call the current menu link's click method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;

            // Spy on the menu link's click method.
            const spy = vi.spyOn(menu.elements.menuItems[0].dom.link, "click");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(spy).toHaveBeenCalled();
          });
        });
      });

      // Test ArrowRight.
      describe("ArrowRight", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusNextChild method is called.
        it("should call the menu's focusNextChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusNextChild method.
          const spy = vi.spyOn(menu, "focusNextChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowRight",
          });

          expect(spy).toHaveBeenCalled();
        });

        describe("when the previous menu item was an open submenu item", () => {
          // Test that the child menu's current event is set to keyboard if the current menu item is a submenu item.
          it("should set the child menu's current event to keyboard if the current menu item is a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].preview();

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowRight",
            });

            expect(
              menu.elements.submenuToggles[1].elements.controlledMenu
                .currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's preview method is called if the current menu item is a submenu item.
          it("should call the current menu toggle's preview method if the current menu item is a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].preview();

            // Spy on the current menu toggle's preview method.
            const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowRight",
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the menu's collapseChildren method is called if the current menu item is not a submenu item.
          it("should call the menu's collapseChildren method if the current menu item is not a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 5;
            menu.elements.submenuToggles[4].preview();

            // Spy on the menu's collapseChildren method.
            const spy = vi.spyOn(menu, "collapseChildren");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowRight",
            });

            expect(spy).toHaveBeenCalled();
          });
        });
      });

      // Test ArrowLeft.
      describe("ArrowLeft", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowLeft",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusPreviousChild method is called.
        it("should call the menu's focusPreviousChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusPreviousChild method.
          const spy = vi.spyOn(menu, "focusPreviousChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "ArrowLeft",
          });

          expect(spy).toHaveBeenCalled();
        });

        describe("when the previous menu item was an open submenu item", () => {
          // Test that the child menu's current event is set to keyboard if the current menu item is a submenu item.
          it("should set the child menu's current event to keyboard if the current menu item is a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 2;
            menu.elements.submenuToggles[1].preview();

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowLeft",
            });

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's preview method is called if the current menu item is a submenu item.
          it("should call the current menu toggle's preview method if the current menu item is a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 2;
            menu.elements.submenuToggles[1].preview();

            // Spy on the current menu toggle's preview method.
            const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowLeft",
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the menu's collapseChildren method is called if the current menu item is not a submenu item.
          it("should call the menu's collapseChildren method if the current menu item is not a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].preview();

            // Spy on the menu's collapseChildren method.
            const spy = vi.spyOn(menu, "collapseChildren");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowLeft",
            });

            expect(spy).toHaveBeenCalled();
          });
        });
      });

      // Test ArrowDown.
      describe("ArrowDown", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowDown",
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the child menu's current event is set to keyboard.
          it("should set the child menu's current event to keyboard", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowDown",
            });

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's open method is called.
          it("should call the current menu toggle's open method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the current menu toggle's open method.
            const spy = vi.spyOn(menu.elements.submenuToggles[0], "expand");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowDown",
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the first item in the child menu is focused.
          it("should focus the first item in the child menu", () => {
            // Mock requestAnimationFrame.
            vi.spyOn(window, "requestAnimationFrame").mockImplementation(
              (callback) => {
                callback();
              }
            );

            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the child menu's focusChild method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu,
              "focusChild"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowDown",
            });

            expect(spy).toHaveBeenCalledWith(0);
          });
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
          it("should not prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowDown",
            });

            expect(event.defaultPrevented).toBeFalsy();
          });
        });
      });

      // Test ArrowUp.
      describe("ArrowUp", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowUp",
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the child menu's current event is set to keyboard.
          it("should set the child menu's current event to keyboard", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowUp",
            });

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu
                .currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's open method is called.
          it("should call the current menu toggle's open method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the current menu toggle's open method.
            const spy = vi.spyOn(menu.elements.submenuToggles[0], "expand");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowUp",
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the last item in the child menu is focused.
          it("should focus the last item in the child menu", () => {
            // Mock requestAnimationFrame.
            vi.spyOn(window, "requestAnimationFrame").mockImplementation(
              (callback) => {
                callback();
              }
            );

            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 1;

            // Spy on the child menu's focusChild method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu,
              "focusChild"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowUp",
            });

            expect(spy).toHaveBeenCalledWith(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems.length - 1
            );
          });
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
          it("should not prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "ArrowUp",
            });

            expect(event.defaultPrevented).toBeFalsy();
          });
        });
      });

      // Test Home.
      describe("Home", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Home",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusFirstChild method is called.
        it("should call the menu's focusFirstChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusFirstChild method.
          const spy = vi.spyOn(menu, "focusFirstChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "Home",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test End.
      describe("End", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "End",
          });

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusLastChild method is called.
        it("should call the menu's focusLastChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.focusState = "self";
          menu.currentChild = 0;

          // Spy on the menu's focusLastChild method.
          const spy = vi.spyOn(menu, "focusLastChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", menu.dom.menu, {
            key: "End",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test Escape.
      describe("Escape", () => {
        describe("when the menu has open submenu items", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;
            menu.elements.submenuToggles[0].preview();

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "Escape",
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the menu's collapseChildren method is called.
          it("should call the menu's collapseChildren method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;
            menu.elements.submenuToggles[0].preview();

            // Spy on the menu's collapseChildren method.
            const spy = vi.spyOn(menu, "collapseChildren");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "Escape",
            });

            expect(spy).toHaveBeenCalled();
          });
        });

        describe("when the menu does not have open submenu items and has an open controller", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;
            menu.elements.controller.expand();

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "Escape",
            });

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the controller's close method is called.
          it("should call the controller's close method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;
            menu.elements.controller.expand();

            // Spy on the controller's close method.
            const spy = vi.spyOn(menu.elements.controller, "collapse");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "Escape",
            });

            expect(spy).toHaveBeenCalled();
          });
          // Test that the menu's focusController method is called.
          it("should call the menu's focusController method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.focusState = "self";
            menu.currentChild = 0;
            menu.elements.controller.expand();

            // Spy on the menu's focusController method.
            const spy = vi.spyOn(menu, "focusController");

            // Trigger a keyup event.
            simulateKeyboardEvent("keyup", menu.dom.menu, {
              key: "Escape",
            });

            expect(spy).toHaveBeenCalled();
          });
        });
      });
    });

    // Test submenus.
    describe("submenus", () => {
      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key,
              }
            );

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the child menu's current event is set to keyboard.
          it("should set the child menu's current event to keyboard", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key,
              }
            );

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0].elements.controlledMenu.currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's open method is called.
          it("should call the current menu toggle's open method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Spy on the current menu toggle's open method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0],
              "expand"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key,
              }
            );

            expect(spy).toHaveBeenCalled();
          });
          // Test that the first item in the child menu is focused.
          // Timing dependency found while verifying https://github.com/NickDJM/accessible-menu/issues/554
          it("should focus the first item in the child menu", async () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Spy on the current menu's focusChild method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0].elements.controlledMenu,
              "focusChild"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key,
              }
            );
            await new Promise(requestAnimationFrame);

            expect(spy).toHaveBeenCalledWith(0);

            menu.dispose();
            spy.mockRestore();
          });
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is not prevented.
          it("should not prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 0;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent("keyup", menu.dom.menu, {
              key,
            });

            expect(event.defaultPrevented).toBeFalsy();
          });
          // Test that the current menu link's click method is called.
          it("should call the current menu link's click method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 0;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the current menu link's click method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .menuItems[0].dom.link,
              "click"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key,
              }
            );

            expect(spy).toHaveBeenCalled();
          });
        });
      });

      // Test Escape.
      describe("Escape", () => {
        // Test that the event is prevented.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });
          const submenu =
            menu.elements.submenuToggles[0].elements.controlledMenu;
          const thirdLevelMenu =
            submenu.elements.submenuToggles[0].elements.controlledMenu;

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          submenu.currentChild = 1;
          submenu.elements.submenuToggles[0].expand();
          thirdLevelMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            thirdLevelMenu.dom.menu,
            {
              key: "Escape",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the parent menu's collapseChildren method is called.
        it("should call the parent menu's collapseChildren method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });
          const submenu =
            menu.elements.submenuToggles[0].elements.controlledMenu;
          const thirdLevelMenu =
            submenu.elements.submenuToggles[0].elements.controlledMenu;

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          submenu.currentChild = 1;
          submenu.elements.submenuToggles[0].expand();
          thirdLevelMenu.currentChild = 0;

          // Spy on the parent menu's collapseChildren method.
          const spy = vi.spyOn(submenu, "collapseChildren");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", thirdLevelMenu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
        // Test that the parent menu's focusCurrentChild method is called.
        it("should call the parent menu's focusCurrentChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });
          const submenu =
            menu.elements.submenuToggles[0].elements.controlledMenu;
          const thirdLevelMenu =
            submenu.elements.submenuToggles[0].elements.controlledMenu;

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          submenu.currentChild = 1;
          submenu.elements.submenuToggles[0].expand();
          thirdLevelMenu.currentChild = 0;

          // Spy on the parent menu's focusCurrentChild method.
          const spy = vi.spyOn(submenu, "focusCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent("keyup", thirdLevelMenu.dom.menu, {
            key: "Escape",
          });

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test ArrowRight.
      describe("ArrowRight", () => {
        describe("when the current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the child menu's current event is set to keyboard.
          it("should set the child menu's current event to keyboard", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0].elements.controlledMenu.currentEvent
            ).toBe("keyboard");
          });
          // Test that the current menu toggle's open method is called.
          it("should call the current menu toggle's open method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Spy on the current menu toggle's open method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0],
              "expand"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(spy).toHaveBeenCalled();
          });
          // Test that the first item in the child menu is focused.
          // Timing dependency found while verifying https://github.com/NickDJM/accessible-menu/issues/554
          it("should focus the first item in the child menu", async () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 1;

            // Spy on the child menu's focusChild method.
            const spy = vi.spyOn(
              menu.elements.submenuToggles[0].elements.controlledMenu.elements
                .submenuToggles[0].elements.controlledMenu,
              "focusChild"
            );

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );
            await new Promise(requestAnimationFrame);

            expect(spy).toHaveBeenCalledWith(0);

            menu.dispose();
            spy.mockRestore();
          });
        });
        describe("when the current menu item is not a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(event.defaultPrevented).toBeTruthy();
          });
          // Test that the root menu's collapseChildren method is called.
          it("should call the root menu's collapseChildren method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the menu's collapseChildren method.
            const spy = vi.spyOn(menu, "collapseChildren");

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(spy).toHaveBeenCalled();
          });
          // Test that the root menu's focusNextChild method is called.
          it("should call the root menu's focusNextChild method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the menu's focusNextChild method.
            const spy = vi.spyOn(menu, "focusNextChild");

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(spy).toHaveBeenCalled();
          });
          // Test that the root menu's current menu item's preview method is called if the root menu's current menu item is a submenu item.
          it("should call the root menu's current menu item's preview method if the root menu's current menu item is a submenu item", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the menu item's preview method.
            const spy = vi.spyOn(menu.elements.submenuToggles[1], "preview");

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowRight",
              }
            );

            expect(spy).toHaveBeenCalled();
          });
        });
      });

      // Test ArrowLeft.
      describe("ArrowLeft", () => {
        describe("when the parent menu's current menu item is a submenu item", () => {
          // Test that the event is prevented.
          it("should prevent the event", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Trigger a keyup event.
            const event = simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowLeft",
              }
            );

            expect(event.defaultPrevented).toBeTruthy();
          });
        });
        // Test that the parent menu's current menu toggle's collapse method is called.
        it("should call the parent menu's current menu toggle's collapse method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu toggle's collapse method.
          const spy = vi.spyOn(menu.elements.submenuToggles[0], "collapse");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowLeft",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
        // Test that the parent menu's focusCurrentChild method is called.
        it("should call the parent menu's focusCurrentChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu toggle's focusCurrentChild method.
          const spy = vi.spyOn(menu, "focusCurrentChild");

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowLeft",
            }
          );

          expect(spy).toHaveBeenCalled();
        });

        describe("when the parent menu is also the root menu", () => {
          // Test that the parent menu's collapseChildren method is called.
          it("should call the parent menu's collapseChildren method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the menu's collapseChildren method.
            const spy = vi.spyOn(menu, "collapseChildren");

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowLeft",
              }
            );

            expect(spy).toHaveBeenCalled();
          });
          // Test that the parent menu's focusPreviousChild method is called.
          it("should call the parent menu's focusPreviousChild method", () => {
            // Create a new Menubar instance for testing.
            const menu = new Menubar({
              menuElement: document.querySelector("ul"),
              containerElement: document.querySelector("nav"),
              controllerElement: document.querySelector("button"),
            });

            // Set up the menu.
            menu.currentChild = 1;
            menu.elements.submenuToggles[0].expand();
            menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

            // Spy on the menu's focusPreviousChild method.
            const spy = vi.spyOn(menu, "focusPreviousChild");

            // Trigger a keyup event.
            simulateKeyboardEvent(
              "keyup",
              menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
              {
                key: "ArrowLeft",
              }
            );

            expect(spy).toHaveBeenCalled();
          });

          describe("when the root menu's current menu item is a submenu item", () => {
            // Test that the root menu's child menu's current event is set to keyboard.
            it("should set the root menu's child menu's current event to keyboard", () => {
              // Create a new Menubar instance for testing.
              const menu = new Menubar({
                menuElement: document.querySelector("ul"),
                containerElement: document.querySelector("nav"),
                controllerElement: document.querySelector("button"),
              });

              // Set up the menu.
              menu.currentChild = 2;
              menu.elements.submenuToggles[1].expand();
              menu.elements.submenuToggles[1].elements.controlledMenu.currentChild = 0;

              // Trigger a keyup event.
              simulateKeyboardEvent(
                "keyup",
                menu.elements.submenuToggles[1].elements.controlledMenu.dom
                  .menu,
                {
                  key: "ArrowLeft",
                }
              );

              expect(
                menu.elements.submenuToggles[0].elements.controlledMenu
                  .currentEvent
              ).toBe("keyboard");
            });
            // Test that the root menu's current menu toggle's preview method is called.
            it("should call the root menu's current menu toggle's preview method", () => {
              // Create a new Menubar instance for testing.
              const menu = new Menubar({
                menuElement: document.querySelector("ul"),
                containerElement: document.querySelector("nav"),
                controllerElement: document.querySelector("button"),
              });

              // Set up the menu.
              menu.currentChild = 2;
              menu.elements.submenuToggles[1].expand();
              menu.elements.submenuToggles[1].elements.controlledMenu.currentChild = 0;

              // Spy on the menu toggle's preview method.
              const spy = vi.spyOn(menu.elements.submenuToggles[0], "preview");

              // Trigger a keyup event.
              simulateKeyboardEvent(
                "keyup",
                menu.elements.submenuToggles[1].elements.controlledMenu.dom
                  .menu,
                {
                  key: "ArrowLeft",
                }
              );

              expect(spy).toHaveBeenCalled();
            });
          });
        });
      });

      // Test ArrowDown.
      describe("ArrowDown", () => {
        // Test that the event is prevented.
        it("should prevent the default event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowDown",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusNextChild method is called.
        it("should call the menu's focusNextChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusNextChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusNextChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowDown",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test ArrowUp.
      describe("ArrowUp", () => {
        // Test that the event is prevented.
        it("should prevent the default event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusPreviousChild method is called.
        it("should call the menu's focusPreviousChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusPreviousChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusPreviousChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "ArrowUp",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test Home.
      describe("Home", () => {
        // Test that the event is prevented.
        it("should prevent the default event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Home",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusFirstChild method is called.
        it("should call the menu's focusFirstChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusFirstChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusFirstChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "Home",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });

      // Test End.
      describe("End", () => {
        // Test that the event is prevented.
        it("should prevent the default event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Trigger a keyup event.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "End",
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });
        // Test that the menu's focusLastChild method is called.
        it("should call the menu's focusLastChild method", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Set up the menu.
          menu.currentChild = 1;
          menu.elements.submenuToggles[0].expand();
          menu.elements.submenuToggles[0].elements.controlledMenu.currentChild = 0;

          // Spy on the menu's focusLastChild method.
          const spy = vi.spyOn(
            menu.elements.submenuToggles[0].elements.controlledMenu,
            "focusLastChild"
          );

          // Trigger a keyup event.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.submenuToggles[0].elements.controlledMenu.dom.menu,
            {
              key: "End",
            }
          );

          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });

  // Test keyboard events on the Menubar's controller.
  describe("Menubar Controller", () => {
    // Test keydown.
    describe("keydown", () => {
      // Test that keydown events set the current event to keyboard.
      it("should set the current event to keyboard on keydown events", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keydown event.
        simulateKeyboardEvent(
          "keydown",
          menu.elements.controller.dom.controller
        );

        expect(menu.currentEvent).toBe("keyboard");
      });

      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        // Test that the event is prevented on Spacebar and Enter keydown events.
        it("should prevent the event on %s keydown events", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Trigger a keydown event.
          const event = simulateKeyboardEvent(
            "keydown",
            menu.elements.controller.dom.controller,
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
      it("should set the current event to keyboard ", () => {
        // Create a new Menubar instance for testing.
        const menu = new Menubar({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });

        // Trigger a keyup event on the menu's controller.
        simulateKeyboardEvent("keyup", menu.elements.controller.dom.controller);

        expect(menu.currentEvent).toBe("keyboard");
      });

      // Test Spacebar and Enter.
      describe.each(["Spacebar", "Enter"])("%s", (key) => {
        // Test that the event is prevented on Spacebar and Enter keyup events.
        it("should prevent the event", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Trigger a keyup event on the menu's controller.
          const event = simulateKeyboardEvent(
            "keyup",
            menu.elements.controller.dom.controller,
            {
              key,
            }
          );

          expect(event.defaultPrevented).toBeTruthy();
        });

        // Test that open is called on the controller on Spacebar and Enter keyup events.
        it("should call open on the controller", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Spy on the controller's open method.
          vi.spyOn(menu.elements.controller, "expand");

          // Trigger a keyup event on the menu's controller.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.controller.dom.controller,
            {
              key,
            }
          );

          expect(menu.elements.controller.expand).toHaveBeenCalled();
        });

        // Test that focusFirstChild is called on the menu on Spacebar and Enter keyup events.
        it("should call focusFirstChild on the menu", () => {
          // Create a new Menubar instance for testing.
          const menu = new Menubar({
            menuElement: document.querySelector("ul"),
            containerElement: document.querySelector("nav"),
            controllerElement: document.querySelector("button"),
          });

          // Spy on the menu's focusFirstChild method.
          vi.spyOn(menu, "focusFirstChild");

          // Trigger a keyup event on the menu's controller.
          simulateKeyboardEvent(
            "keyup",
            menu.elements.controller.dom.controller,
            {
              key,
            }
          );

          expect(menu.focusFirstChild).toHaveBeenCalled();
        });
      });
    });
  });
});

describe("Menubar modified keyboard shortcuts", () => {
  let menu;

  beforeEach(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 0;
    });
    menu = new Menubar({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
    });
  });

  afterEach(() => {
    menu.dispose();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  describe.each(["ctrlKey", "altKey", "metaKey"])("%s", (modifier) => {
    it.each([
      "f",
      "ArrowDown",
      "ArrowRight",
      "Home",
      "Enter",
      " ",
      "Tab",
      "Escape",
      "*",
    ])("should leave %s unchanged in root menus and submenus", (key) => {
      const toggle = menu.elements.submenuToggles[0];
      const submenu = toggle.elements.controlledMenu;
      const click = vi.fn((event) => event.preventDefault());
      menu.dom.menu.addEventListener("click", click);

      for (const targetMenu of [menu, submenu]) {
        toggle.expand();
        targetMenu.currentEvent = "keyboard";
        targetMenu.focusChild(0);
        const focusedLink = document.activeElement;
        const currentChild = targetMenu.currentChild;
        const focusState = targetMenu.focusState;
        const currentEvent = targetMenu.currentEvent;
        const expanded = toggle.isExpanded;
        const onKey = vi.fn();
        document.addEventListener("keydown", onKey);
        document.addEventListener("keyup", onKey);

        try {
          for (const type of ["keydown", "keyup"]) {
            const event = new KeyboardEvent(type, {
              key,
              [modifier]: true,
              bubbles: true,
              cancelable: true,
            });

            focusedLink.dispatchEvent(event);

            expect(event.defaultPrevented).toBe(false);
            expect(document.activeElement).toBe(focusedLink);
            expect(targetMenu.currentChild).toBe(currentChild);
            expect(targetMenu.focusState).toBe(focusState);
            expect(targetMenu.currentEvent).toBe(currentEvent);
            expect(toggle.isExpanded).toBe(expanded);
          }

          expect(onKey).toHaveBeenCalledTimes(2);
          expect(click).not.toHaveBeenCalled();
        } finally {
          document.removeEventListener("keydown", onKey);
          document.removeEventListener("keyup", onKey);
        }
      }
    });
  });

  it.each([false, true])(
    "should keep character navigation working with Shift set to %s",
    (shiftKey) => {
      const fish = menu.elements.menuItems.find(
        (item) => item.dom.link.textContent === "Fish"
      );
      menu.currentEvent = "keyboard";
      menu.focusChild(0);
      const event = new KeyboardEvent("keyup", {
        key: shiftKey ? "F" : "f",
        shiftKey,
        bubbles: true,
        cancelable: true,
      });

      menu.elements.menuItems[0].dom.link.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(menu.currentMenuItem).toBe(fish);
      expect(document.activeElement).toBe(fish.dom.link);
    }
  );
  describe.each(["ctrlKey", "altKey", "metaKey"])(
    "root controller with %s",
    (modifier) => {
      it.each(["Enter", " "])("should leave %s unchanged", (key) => {
        menu.dispose();
        menu = new Menubar({
          menuElement: document.querySelector("ul"),
          controllerElement: document.querySelector("button"),
          containerElement: document.querySelector("nav"),
          transitionClass: "",
        });
        const controller = menu.elements.controller;

        for (const expanded of [false, true]) {
          if (expanded) controller.expand();
          controller.dom.controller.focus();

          for (const type of ["keydown", "keyup"]) {
            const event = new KeyboardEvent(type, {
              key,
              [modifier]: true,
              bubbles: true,
              cancelable: true,
            });

            controller.dom.controller.dispatchEvent(event);

            expect(event.defaultPrevented).toBe(false);
            expect(controller.isExpanded).toBe(expanded);
            expect(document.activeElement).toBe(controller.dom.controller);
          }
        }
      });
    }
  );
});

describe("Menubar deferred submenu focus", () => {
  let menu;
  let frames;
  let nextFrame;

  /**
   * Runs pending animation frames, including frames added by their callbacks.
   */
  function flushFrames() {
    while (frames.size > 0) {
      const pendingFrames = Array.from(frames.entries());

      for (const [id, callback] of pendingFrames) {
        if (frames.delete(id)) callback(0);
      }
    }
  }

  beforeEach(() => {
    frames = new Map();
    nextFrame = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      frames.delete(id);
    });
    menu = new Menubar({
      menuElement: document.querySelector("ul"),
      containerElement: document.querySelector("nav"),
      controllerElement: document.querySelector("button"),
      transitionClass: "",
    });
  });

  afterEach(() => {
    menu.dispose();
    vi.restoreAllMocks();
  });

  describe.each([
    { key: "Enter", nested: false, lastChild: false },
    { key: " ", nested: false, lastChild: false },
    { key: "ArrowDown", nested: false, lastChild: false },
    { key: "ArrowUp", nested: false, lastChild: true },
    { key: "Enter", nested: true, lastChild: false },
    { key: " ", nested: true, lastChild: false },
    { key: "ArrowRight", nested: true, lastChild: false },
  ])("$key with nested set to $nested", ({ key, nested, lastChild }) => {
    let parentMenu;
    let item;
    let submenu;
    let focusChild;

    beforeEach(() => {
      parentMenu = menu;

      if (nested) {
        menu.elements.submenuToggles[0].expand();
        parentMenu = menu.elements.submenuToggles[0].elements.controlledMenu;
      }

      parentMenu.currentEvent = "keyboard";
      parentMenu.focusChild(1);
      flushFrames();
      item = parentMenu.currentMenuItem;
      submenu = item.elements.childMenu;
      focusChild = vi.spyOn(submenu, "focusChild");
    });

    it("should focus the intended submenu after it opens", () => {
      const index = lastChild ? submenu.elements.menuItems.length - 1 : 0;

      item.dom.link.dispatchEvent(
        new KeyboardEvent("keyup", { key, bubbles: true, cancelable: true })
      );

      expect(item.elements.toggle.isExpanded).toBe(true);
      expect(focusChild).not.toHaveBeenCalled();

      flushFrames();

      expect(focusChild).toHaveBeenCalledOnce();
      expect(document.activeElement).toBe(
        submenu.elements.menuItems[index].dom.link
      );
    });

    it.each(["click", "focus", "collapse", "dispose", "keyboard"])(
      "should leave focus alone after an intervening %s action",
      (action) => {
        item.dom.link.dispatchEvent(
          new KeyboardEvent("keyup", { key, bubbles: true, cancelable: true })
        );

        if (action === "click") {
          menu.elements.menuItems[0].dom.link.click();
        } else if (action === "focus") {
          menu.dom.controller.focus();
        } else if (action === "collapse") {
          item.elements.toggle.collapse();
        } else if (action === "dispose") {
          menu.dispose();
        } else {
          item.dom.link.dispatchEvent(
            new KeyboardEvent("keyup", {
              key: "Escape",
              bubbles: true,
              cancelable: true,
            })
          );
        }

        expect(() => flushFrames()).not.toThrow();
        expect(focusChild).not.toHaveBeenCalled();
        expect(submenu.dom.menu.contains(document.activeElement)).toBe(false);
      }
    );
  });
});
