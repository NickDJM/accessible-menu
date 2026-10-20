/**
 * Tests for public methods of the BaseMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test BaseMenuToggle public methods.
describe("BaseMenuToggle public methods", () => {
  describe.each([
    ["expand", "accessibleMenuExpand"],
    ["collapse", "accessibleMenuCollapse"],
  ])("%s event", (action, eventName) => {
    it(`should dispatch ${eventName}`, () => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();
      const toggle = menu.elements.controller;
      const listener = vi.fn();
      if (action === "collapse") {
        toggle.expand({ emit: false, transition: false });
      }
      toggle.dom.controller.addEventListener(eventName, listener);

      toggle[action]({ transition: false });

      expect(listener).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ detail: { component: toggle } })
      );

      menu.dispose();
    });
  });

  // Test BaseMenuItem expand().
  describe("expand", () => {
    // Test that expand sets the controlled menu's focus state to self.
    it("should set the controlled menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand();

      expect(menuToggle.elements.controlledMenu.focusState).toEqual("self");
    });

    // Test that expand calls _expand().
    it("should call _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.expand();

      expect(spy).toHaveBeenCalled();
    });

    // Test that expand passes options to _expand().
    it("should pass options to _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.expand({ emit: false, transition: false });

      expect(spy).toHaveBeenCalledWith({
        emit: false,
        transition: false,
      });
    });

    // Test that expand sets the expanded flag to true.
    it("should set the open flag to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand();

      expect(menuToggle.isExpanded).toBe(true);
    });

    // Test that expand preserves committed state when preserveState is true.
    it("should not commit when preserveState is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand({
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(menuToggle.isExpanded).toBe(true);
      expect(menuToggle.shouldBeExpanded).toBe(false);
    });

    describe("expansion state", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should share the current expansion state with the Menu getter", () => {
        const action = "expand";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action](options);

        expect(toggle.isExpanded).toBe(true);
      });

      it("should share the committed expansion state with the Menu getter", () => {
        const action = "expand";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action](options);

        expect(toggle.shouldBeExpanded).toBe(true);
      });

      it("should preserve the shared committed state when requested", () => {
        const action = "expand";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action]({ ...options, preserveState: true });

        expect(toggle.isExpanded).toBe(true);
        expect(toggle.shouldBeExpanded).toBe(false);
        expect(toggle.shouldBeExpanded).toBe(false);
      });
    });

    describe("while locked", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should block a menu state change while locked", () => {
        const action = "expand";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        const initial = toggle.isExpanded;
        toggle.lock();

        toggle[action](options);

        expect(toggle.isExpanded).toBe(initial);
      });

      it("should allow a forced menu state change while locked", () => {
        const action = "expand";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        toggle.lock();

        toggle[action]({ ...options, force: true });

        expect(toggle.isExpanded).toBe(action !== "collapse");
      });
    });

    describe("controlled elements", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.useRealTimers();
        vi.unstubAllGlobals();
      });
      it.each([{}, { containerElement: null }])(
        "defaults to the menu element for %j",
        (options) => {
          const toggle = new BaseMenuToggle({
            menuToggleElement: document.querySelector(".dropdown-toggle"),
            controlledMenu: new BaseMenu({
              menuElement: document.querySelector(".dropdown-menu"),
              expandClass: "open",
              collapseClass: "closed",
              transitionClass: "",
            }),
            initialize: false,
            ...options,
          });

          toggle.expand({ transition: false, emit: false });

          expect(toggle.dom.controlled).toBe(
            toggle.elements.controlledMenu.dom.menu
          );
          expect(
            toggle.elements.controlledMenu.dom.menu.classList.contains("open")
          ).toBe(true);

          toggle.collapse({ transition: false, emit: false });

          expect(toggle.dom.controlled.classList.contains("closed")).toBe(true);
          expect(toggle.dom.controlled.classList.contains("open")).toBe(false);
        }
      );

      it("applies classes to a custom container and keeps ARIA on the menu", () => {
        const containerElement = document.querySelector(".dropdown");
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector(".dropdown-toggle"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector(".dropdown-menu"),
            expandClass: "open",
            collapseClass: "closed",
            transitionClass: "",
          }),
          initialize: false,
          containerElement,
        });
        containerElement.append(
          toggle.dom.controller,
          toggle.elements.controlledMenu.dom.menu
        );

        toggle.initialize();

        expect(toggle.isInitialized).toBe(true);
        expect(toggle.dom.controlled).toBe(containerElement);
        expect(containerElement.classList.contains("closed")).toBe(true);

        toggle.expand({ transition: false, emit: false });

        expect(containerElement.classList.contains("open")).toBe(true);
        expect(containerElement.classList.contains("closed")).toBe(false);
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "true"
        );
        expect(
          toggle.elements.controlledMenu.dom.menu.getAttribute(
            "aria-labelledby"
          )
        ).toBe(toggle.dom.controller.id);
        expect(containerElement.hasAttribute("aria-labelledby")).toBe(false);

        toggle.collapse({ transition: false, emit: false });

        expect(containerElement.classList.contains("closed")).toBe(true);
        expect(containerElement.classList.contains("open")).toBe(false);
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
        expect(
          toggle.elements.controlledMenu.dom.menu.classList.contains("open")
        ).toBe(false);
        expect(
          toggle.elements.controlledMenu.dom.menu.classList.contains("closed")
        ).toBe(false);
      });

      it("applies transition classes to the controlled element", () => {
        vi.useFakeTimers();
        vi.stubGlobal("requestAnimationFrame", (callback) =>
          setTimeout(callback, 16)
        );

        const containerElement = document.querySelector(".dropdown");
        const containerClasses = containerElement.className;
        const menuClasses = document.querySelector(".dropdown-menu").className;
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector(".dropdown-toggle"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector(".dropdown-menu"),
            expandClass: "open",
            collapseClass: "closed",
            transitionClass: "",
          }),
          initialize: false,
          containerElement,
        });
        toggle.transitionClass = "transitioning";

        toggle.collapse({ transition: false, emit: false });

        toggle.expand({ transition: true, emit: false });

        expect(containerElement.classList.contains("transitioning")).toBe(true);

        vi.runAllTimers();

        expect(containerElement.className).toBe(`${containerClasses} open`);

        toggle.collapse({ transition: true, emit: false });

        expect(containerElement.classList.contains("transitioning")).toBe(true);

        vi.runAllTimers();

        expect(containerElement.className).toBe(`${containerClasses} closed`);
        expect(toggle.elements.controlledMenu.dom.menu.className).toBe(
          menuClasses
        );
      });
    });
  });

  // Test BaseMenuToggle preview().
  describe("preview", () => {
    // Test that preview sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menu.focusState).toEqual("self");
    });

    // Test that preview calls _expand().
    it("should call _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });

    // Test that preview passes options to _expand().
    it("should pass options to _expand()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.preview({ emit: false, transition: false });

      expect(spy).toHaveBeenCalledWith({
        emit: false,
        transition: false,
      });
    });

    // Test that preview sets the expanded flag to true.
    it("should set the open flag to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menuToggle.isExpanded).toBe(true);
    });

    describe("expansion state", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should share the current expansion state with the Menu getter", () => {
        const action = "preview";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action](options);

        expect(toggle.isExpanded).toBe(true);
      });

      it("should share the committed expansion state with the Menu getter", () => {
        const action = "preview";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action](options);

        expect(toggle.shouldBeExpanded).toBe(true);
      });

      it("should preserve the shared committed state when requested", () => {
        const action = "preview";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[action]({ ...options, preserveState: true });

        expect(toggle.isExpanded).toBe(true);
        expect(toggle.shouldBeExpanded).toBe(false);
        expect(toggle.shouldBeExpanded).toBe(false);
      });
    });

    describe("while locked", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should block a menu state change while locked", () => {
        const action = "preview";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        const initial = toggle.isExpanded;
        toggle.lock();

        toggle[action](options);

        expect(toggle.isExpanded).toBe(initial);
      });

      it("should allow a forced menu state change while locked", () => {
        const action = "preview";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        toggle.lock();

        toggle[action]({ ...options, force: true });

        expect(toggle.isExpanded).toBe(action !== "collapse");
      });
    });
  });

  // Test BaseMenuToggle collapse().
  describe("collapse", () => {
    // Test that collapse calls blur() on the controlled menu.
    it("should call blur() on the controlled menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();
      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for blur() call.
      const spy = vi.spyOn(menuToggle.elements.controlledMenu, "blur");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(spy).toHaveBeenCalled();
    });

    // Test that collapse sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menu.focusState = "child";
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(menu.focusState).toEqual("self");
    });

    // Test that collapse calls _collapse().
    it("should call _collapse()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _collapse() call.
      const spy = vi.spyOn(menuToggle, "_collapse");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(spy).toHaveBeenCalled();
    });

    // Test that collapse passes options to _collapse().
    it("should pass options to _collapse()", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _collapse() call.
      const spy = vi.spyOn(menuToggle, "_collapse");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse({ emit: false, transition: false });

      expect(spy).toHaveBeenCalledWith({
        emit: false,
        transition: false,
      });
    });

    // Test that collapse sets the expanded flag to false.
    it("should set the open flag to false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(menuToggle.isExpanded).toBe(false);
    });

    // Test that collapse preserves committed state when preserveState is true.
    it("should not commit when preserveState is true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand({ emit: false, transition: false });
      menuToggle.collapse({
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(menuToggle.isExpanded).toBe(false);
      expect(menuToggle.shouldBeExpanded).toBe(true);
    });

    describe("expansion state", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should share the current collapsed state with the Menu getter", () => {
        const action = "collapse";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.expand(options);

        toggle[action](options);

        expect(toggle.isExpanded).toBe(false);
      });

      it("should preserve the shared committed state when requested", () => {
        const action = "collapse";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.expand(options);

        toggle[action]({ ...options, preserveState: true });

        expect(toggle.isExpanded).toBe(false);
        expect(toggle.shouldBeExpanded).toBe(true);
        expect(toggle.shouldBeExpanded).toBe(true);
      });
    });

    describe("while locked", () => {
      const options = { emit: false, transition: false };
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should block a menu state change while locked", () => {
        const action = "collapse";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        const initial = toggle.isExpanded;
        toggle.lock();

        toggle[action](options);

        expect(toggle.isExpanded).toBe(initial);
      });

      it("should allow a forced menu state change while locked", () => {
        const action = "collapse";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        toggle.lock();

        toggle[action]({ ...options, force: true });

        expect(toggle.isExpanded).toBe(action !== "collapse");
      });
    });
  });

  // Test BaseMenuToggle toggle().
  describe("toggle", () => {
    // Test that toggle calls expand() when the menu is closed.
    it("should call expand() when the menu is closed", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for expand() call.
      const spy = vi.spyOn(menuToggle, "expand");

      menuToggle.toggle();

      expect(spy).toHaveBeenCalled();
    });

    // Test that toggle calls collapse() when the menu is expand.
    it("should call collapse() when the menu is open", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapse() call.
      const spy = vi.spyOn(menuToggle, "collapse");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      menuToggle.toggle();

      expect(spy).toHaveBeenCalled();
    });

    // Test that toggle passes options to expand when closed.
    it("should pass options to open when the menu is closed", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for expand() call.
      const spy = vi.spyOn(menuToggle, "expand");

      menuToggle.toggle({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(spy).toHaveBeenCalledWith({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });
    });

    // Test that toggle passes options to collapse when expand.
    it("should pass options to close when the menu is open", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Set up to check for collapse() call.
      const spy = vi.spyOn(menuToggle, "collapse");

      menuToggle.toggle({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(spy).toHaveBeenCalledWith({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });
    });
  });

  // Test BaseMenuToggle collapseSiblings().
  describe("collapseSiblings", () => {
    // Test that collapseSiblings calls collapse() on each sibling toggle.
    it("should call collapse() on each sibling toggle", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapse() call.
      const spy1 = vi.spyOn(menu.elements.submenuToggles[1], "collapse");
      const spy2 = vi.spyOn(menu.elements.submenuToggles[2], "collapse");
      const spy3 = vi.spyOn(menu.elements.submenuToggles[3], "collapse");
      const spy4 = vi.spyOn(menu.elements.submenuToggles[4], "collapse");

      menuToggle.collapseSiblings();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
      expect(spy4).toHaveBeenCalled();
    });

    // Test that collapseSiblings does not call collapse() on itself.
    it("should not call collapse() on itself", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapse() call.
      const spy = vi.spyOn(menuToggle, "collapse");

      menuToggle.collapseSiblings();

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that collapseSiblings passes options to collapse.
    it("should pass options to close", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(menu.elements.submenuToggles[1], "collapse");

      menuToggle.collapseSiblings({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(spy).toHaveBeenCalledWith({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });
    });
  });

  // Test BaseMenuToggle collapseChildren().
  describe("collapseChildren", () => {
    // Test that collapseChildren calls collapse on all toggles inside of the controlled menu.
    it("should call collapse() on all toggles inside of the controlled menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapse() call.
      const spy1 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[0],
        "collapse"
      );
      const spy2 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[1],
        "collapse"
      );
      const spy3 = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[2],
        "collapse"
      );

      menuToggle.collapseChildren();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
      expect(spy3).toHaveBeenCalled();
    });

    // Test that collapseChildren passes options to collapse.
    it("should pass options to close", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(
        menuToggle.elements.controlledMenu.elements.submenuToggles[0],
        "collapse"
      );

      menuToggle.collapseChildren({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });

      expect(spy).toHaveBeenCalledWith({
        force: true,
        preserveState: true,
        emit: false,
        transition: false,
      });
    });
  });

  describe("lock", () => {
    describe("expansion state", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should disable the Menu toggle through the Core controller mapping", () => {
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle.lock();

        expect(toggle.dom.controller.disabled).toBe(true);
      });
    });

    describe("controlled elements", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.useRealTimers();
        vi.unstubAllGlobals();
      });

      it("applies locked and unlocked classes to the custom container", () => {
        const containerElement = document.querySelector(".dropdown");
        const menuClasses = document.querySelector(".dropdown-menu").className;
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector(".dropdown-toggle"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector(".dropdown-menu"),
            expandClass: "open",
            collapseClass: "closed",
            transitionClass: "",
          }),
          initialize: false,
          containerElement,
        });

        toggle.lock({ emit: false });

        expect(containerElement.classList.contains("locked")).toBe(true);
        expect(toggle.dom.controller.disabled).toBe(true);
        expect(toggle.elements.controlledMenu.dom.menu.className).toBe(
          menuClasses
        );

        toggle.unlock({ emit: false });

        expect(containerElement.classList.contains("locked")).toBe(false);
        expect(containerElement.classList.contains("unlocked")).toBe(true);
        expect(toggle.dom.controller.disabled).toBe(false);
        expect(toggle.elements.controlledMenu.dom.menu.className).toBe(
          menuClasses
        );
      });
    });
  });

  describe("unlock", () => {
    describe("expansion state", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should remove disabled from the Menu toggle through the Core controller mapping", () => {
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        toggle.lock();

        toggle.unlock();

        expect(toggle.dom.controller.disabled).toBe(false);
      });
    });
  });

  describe("initialize", () => {
    describe("expansion state", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should mark the toggle initialized", () => {
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle.initialize();

        expect(toggle.isInitialized).toBe(true);
      });

      it("should collapse without emitting action events", () => {
        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const events = [];
        for (const action of ["precollapse", "collapse", "postcollapse"]) {
          toggle.dom.controller.addEventListener(
            toggle.getEventName(action),
            () => events.push(action)
          );
        }

        toggle.initialize();

        expect(events).toEqual([]);
      });
    });
  });
});
