/**
 * Tests for public methods of the MenubarToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import MenubarToggle from "../../../src/menubarToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test MenubarToggle public methods.
describe("MenubarToggle public methods", () => {
  // Test MenubarItem expand().
  describe("expand", () => {
    // Test that expand sets the controlled menu's focus state to self.
    it("should set the controlled menu's focus state to self", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand();

      expect(menuToggle.elements.controlledMenu.focusState).toEqual("self");
    });

    // Test that expand calls _expand().
    it("should call _expand()", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.expand();

      expect(spy).toHaveBeenCalled();
    });

    // Test that expand sets the expanded flag to true.
    it("should set the open flag to true", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.expand();

      expect(menuToggle.isExpanded).toBe(true);
    });

    // Test that expand calls collapseSiblings().
    it("should call collapseSiblings()", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapseSiblings() call.
      const spy = vi.spyOn(menuToggle, "collapseSiblings");

      menuToggle.expand();

      expect(spy).toHaveBeenCalled();
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
          const toggle = new MenubarToggle({
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
        const toggle = new MenubarToggle({
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
        const toggle = new MenubarToggle({
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

  // Test MenubarToggle preview().
  describe("preview", () => {
    // Test that preview sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menu.focusState).toEqual("self");
    });

    // Test that preview calls _expand().
    it("should call _expand()", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });

    // Test that preview sets the expanded flag to true.
    it("should set the open flag to true", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menuToggle.isExpanded).toBe(true);
    });

    // Test that preview calls collapseSiblings().
    it("should call collapseSiblings()", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapseSiblings() call.
      const spy = vi.spyOn(menuToggle, "collapseSiblings");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test MenubarToggle collapse().
  describe("collapse", () => {
    // Test that collapse calls blur() on the controlled menu.
    it("should call blur() on the controlled menu", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
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
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

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
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _collapse() call.
      const spy = vi.spyOn(menuToggle, "_collapse");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(spy).toHaveBeenCalled();
    });

    // Test that collapse sets the expanded flag to false.
    it("should set the open flag to false", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      // Close the menu.
      menuToggle.collapse();

      expect(menuToggle.isExpanded).toBe(false);
    });

    // Test that collapse calls collapseChildren().
    it("should call collapseChildren()", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapseChildren() call.
      const spy = vi.spyOn(menuToggle, "collapseChildren");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      menuToggle.collapse();

      expect(spy).toHaveBeenCalled();
    });

    // Test that collapse calls the parent menu's focusCurrentChild method.
    it("should call the parent menu's focusCurrentChild method", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for collapseChildren() call.
      const spy = vi.spyOn(menu, "focusCurrentChild");

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      menuToggle.collapse();

      expect(spy).toHaveBeenCalled();
    });

    // Test that close does not call the parent menu's focusCurrentChild method is the parent menu does not exist.
    it("should not call the parent menu's focusCurrentChild method is the parent menu does not exist", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.controller;

      // Set up the menu.
      menuToggle.expand({ force: true, emit: false, transition: false });

      expect(() => {
        menuToggle.collapse();
      }).not.toThrow();
    });
  });

  // Test MenubarToggle toggle().
  describe("toggle", () => {
    // Test that MenubarToggle implements the BaseMenuToggle toggle.
    it("should implement the BaseMenuToggle toggle", () => {
      expect(MenubarToggle.prototype.toggle).toBe(
        BaseMenuToggle.prototype.toggle
      );
    });
  });

  // Test MenubarToggle collapseSiblings().
  describe("collapseSiblings", () => {
    // Test that MenubarToggle implements the BaseMenuToggle collapseSiblings.
    it("should implement the BaseMenuToggle collapseSiblings", () => {
      expect(MenubarToggle.prototype.collapseSiblings).toBe(
        BaseMenuToggle.prototype.collapseSiblings
      );
    });
  });

  // Test MenubarToggle collapseChildren().
  describe("collapseChildren", () => {
    // Test that MenubarToggle implements the BaseMenuToggle collapseChildren.
    it("should implement the BaseMenuToggle collapseChildren", () => {
      expect(MenubarToggle.prototype.collapseChildren).toBe(
        BaseMenuToggle.prototype.collapseChildren
      );
    });
  });

  describe("lock", () => {
    it("should implement the BaseMenuToggle lock method", () => {
      expect(MenubarToggle.prototype.lock).toBe(BaseMenuToggle.prototype.lock);
    });
  });

  describe("unlock", () => {
    it("should implement the BaseMenuToggle unlock method", () => {
      expect(MenubarToggle.prototype.unlock).toBe(
        BaseMenuToggle.prototype.unlock
      );
    });
  });
});
