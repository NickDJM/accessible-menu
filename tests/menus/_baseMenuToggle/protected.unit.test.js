/**
 * Tests for Menu-specific protected behavior and Core method inheritance.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Component from "@accessible-ecosystem/core";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
  delete window.AccessibleMenuStorage;
  vi.restoreAllMocks();
});

const createToggle = () => {
  const menu = new BaseMenu({
    menuElement: document.querySelector("ul"),
    transitionClass: "",
  });
  initializeMenu(menu);

  return { menu, toggle: menu.elements.submenuToggles[0] };
};

describe("BaseMenuToggle protected methods", () => {
  describe("_dispatchEvent", () => {
    it("should inherit Core event dispatch", () => {
      expect(BaseMenuToggle.prototype._dispatchEvent).toBe(
        Component.prototype._dispatchEvent
      );
    });
  });

  describe("_collapse", () => {
    it("should inherit Core collapse behavior", () => {
      expect(BaseMenuToggle.prototype._collapse).toBe(
        CollapsibleComponent.prototype._collapse
      );
    });
  });

  describe("_expand", () => {
    it("should mark the root menu as having opened", () => {
      const { menu, toggle } = createToggle();

      toggle._expand({ emit: false, transition: false });

      expect(menu.hasExpanded).toBe(true);
    });

    it("should delegate expansion to Core", () => {
      const { toggle } = createToggle();
      const expand = vi
        .spyOn(CollapsibleComponent.prototype, "_expand")
        .mockImplementation(() => {});
      const options = { emit: false, transition: false };

      toggle._expand(options);

      expect(expand).toHaveBeenCalledExactlyOnceWith(options);
    });
  });

  describe("_setIds", () => {
    // Test that _setIds sets the toggle's id attribute to a generated value when it doesn't have an existing id.
    it("should set the toggle's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.controller.removeAttribute("id");

      // Call _setIds.
      menuToggle._setIds();

      // Get the generated id.
      const generatedId = menuToggle.dom.controller.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-button{- optional menu toggle's inner text}-{a string 1-10 characters long}-{the level the menu is compared to the root}".
      expect(generatedId).toMatch(/^menu-button(-.*)?-[a-z]{1,10}-\d+$/);
    });

    // Test that _setIds does not change the toggle's id attribute when it already has an id.
    it("should not change the toggle's id attribute when it already has an id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.controller.setAttribute("id", "test-id");

      // Call _setIds.
      menuToggle._setIds();

      // Test the toggle's id.
      expect(menuToggle.dom.controller.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the toggle's parent's id attribute to a generated value when it doesn't have an existing id.
    it("should set the toggle's parent's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.elements.controlledMenu.dom.menu.removeAttribute("id");

      // Call _setIds.
      menuToggle._setIds();

      // Get the generated id.
      const generatedId =
        menuToggle.elements.controlledMenu.dom.menu.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu{- optional menu toggle's inner text}-{a string 1-10 characters long}-{the level the menu is compared to the root}".
      expect(generatedId).toMatch(/^menu(-.*)?-[a-z]{1,10}-\d+$/);
    });

    // Test that _setIds does not change the toggle's parent's id attribute when it already has an id.
    it("should not change the toggle's parent's id attribute when it already has an id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.elements.controlledMenu.dom.menu.setAttribute("id", "test-id");

      // Call _setIds.
      menuToggle._setIds();

      // Test the toggle's parent's id.
      expect(
        menuToggle.elements.controlledMenu.dom.menu.getAttribute("id")
      ).toBe("test-id");
    });
  });

  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false.
    it("should set the toggle's aria-expanded attribute to false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.controller.removeAttribute("aria-expanded");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-expanded attribute.
      expect(menuToggle.dom.controller.getAttribute("aria-expanded")).toBe(
        "false"
      );
    });

    // Test that _setAriaAttributes sets the controlled menu's aria-labelledby attribute to the toggle's id.
    it("should set the controlled menu's aria-labelledby attribute to the toggle's id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.controller.removeAttribute("id");
      menuToggle.elements.controlledMenu.dom.menu.removeAttribute(
        "aria-labelledby"
      );

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the controlled menu's aria-labelledby attribute.
      expect(
        menuToggle.elements.controlledMenu.dom.menu.getAttribute(
          "aria-labelledby"
        )
      ).toBe(menuToggle.dom.controller.id);
    });
  });
});
