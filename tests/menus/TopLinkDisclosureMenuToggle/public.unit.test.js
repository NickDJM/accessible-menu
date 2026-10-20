/**
 * Tests for public methods of the TopLinkDisclosureMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  threeLevelDisclosureTopLink,
  twoLevelDisclosureTopLink,
} from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevelDisclosureTopLink;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test TopLinkDisclosureMenuToggle public methods.
describe("TopLinkDisclosureMenuToggle public methods", () => {
  // Test TopLinkDisclosureMenuItem expand().
  describe("expand", () => {
    // Test that expand sets the controlled menu's focus state to self.
    it("should set the controlled menu's focus state to self", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
          const toggle = new TopLinkDisclosureMenuToggle({
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
        const toggle = new TopLinkDisclosureMenuToggle({
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

        expect(toggle.dom.controller.getAttribute("aria-controls")).toBe(
          toggle.elements.controlledMenu.dom.menu.id
        );

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
        const toggle = new TopLinkDisclosureMenuToggle({
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

  // Test TopLinkDisclosureMenuToggle preview().
  describe("preview", () => {
    // Test that preview sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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

  // Test TopLinkDisclosureMenuToggle collapse().
  describe("collapse", () => {
    // Test that collapse calls blur() on the controlled menu.
    it("should call blur() on the controlled menu", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
  });

  // Test TopLinkDisclosureMenuToggle toggle().
  describe("toggle", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle toggle.
    it("should implement the BaseMenuToggle toggle", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.toggle).toBe(
        BaseMenuToggle.prototype.toggle
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle collapseSiblings().
  describe("collapseSiblings", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle collapseSiblings.
    it("should implement the BaseMenuToggle collapseSiblings", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.collapseSiblings).toBe(
        BaseMenuToggle.prototype.collapseSiblings
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle collapseChildren().
  describe("collapseChildren", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle collapseChildren.
    it("should implement the BaseMenuToggle collapseChildren", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.collapseChildren).toBe(
        BaseMenuToggle.prototype.collapseChildren
      );
    });
  });

  describe("lock", () => {
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
        const toggle = new TopLinkDisclosureMenuToggle({
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
});
