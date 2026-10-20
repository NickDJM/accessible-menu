/**
 * Tests for public methods of the TreeviewToggle class.
 */

import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

// Test TreeviewToggle public methods.
describe("TreeviewToggle public methods", () => {
  // Test TreeviewItem expand().
  describe("expand", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle expand.
    it("should implement the BaseMenuToggle open", () => {
      expect(TreeviewToggle.prototype.expand).toBe(
        BaseMenuToggle.prototype.expand
      );
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
          const toggle = new TreeviewToggle({
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
        const toggle = new TreeviewToggle({
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

        expect(toggle.dom.controller.getAttribute("aria-owns")).toBe(
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
        const toggle = new TreeviewToggle({
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

  // Test TreeviewToggle preview().
  describe("preview", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle preview.
    it("should implement the BaseMenuToggle preview", () => {
      expect(TreeviewToggle.prototype.preview).toBe(
        BaseMenuToggle.prototype.preview
      );
    });
  });

  // Test TreeviewToggle collapse().
  describe("collapse", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapse.
    it("should implement the BaseMenuToggle close", () => {
      expect(TreeviewToggle.prototype.collapse).toBe(
        BaseMenuToggle.prototype.collapse
      );
    });
  });

  // Test TreeviewToggle toggle().
  describe("toggle", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle toggle.
    it("should implement the BaseMenuToggle toggle", () => {
      expect(TreeviewToggle.prototype.toggle).toBe(
        BaseMenuToggle.prototype.toggle
      );
    });
  });

  // Test TreeviewToggle collapseSiblings().
  describe("collapseSiblings", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapseSiblings.
    it("should implement the BaseMenuToggle collapseSiblings", () => {
      expect(TreeviewToggle.prototype.collapseSiblings).toBe(
        BaseMenuToggle.prototype.collapseSiblings
      );
    });
  });

  // Test TreeviewToggle collapseChildren().
  describe("collapseChildren", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle collapseChildren.
    it("should implement the BaseMenuToggle collapseChildren", () => {
      expect(TreeviewToggle.prototype.collapseChildren).toBe(
        BaseMenuToggle.prototype.collapseChildren
      );
    });
  });

  describe("lock", () => {
    it("should implement the BaseMenuToggle lock method", () => {
      expect(TreeviewToggle.prototype.lock).toBe(BaseMenuToggle.prototype.lock);
    });
  });

  describe("unlock", () => {
    it("should implement the BaseMenuToggle unlock method", () => {
      expect(TreeviewToggle.prototype.unlock).toBe(
        BaseMenuToggle.prototype.unlock
      );
    });
  });
});
