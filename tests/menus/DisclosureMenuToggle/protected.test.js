/**
 * Tests for protected methods in the DisclosureMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosure, twoLevel } from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosure;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test DisclosureMenuToggle protected methods.
describe("DisclosureMenuToggle protected methods", () => {
  // Test DisclosureMenuToggle _expand().
  describe("_expand", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(DisclosureMenuToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test DisclosureMenuToggle _collapse().
  describe("_collapse", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(DisclosureMenuToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });

  // Test DisclosureMenuToggle _setIds().
  describe("_setIds", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle _setIds.
    it("should implement the BaseMenuToggle _setIds", () => {
      expect(DisclosureMenuToggle.prototype._setIds).toBe(
        BaseMenuToggle.prototype._setIds
      );
    });
  });

  // Test DisclosureMenuToggle _setAriaAttributes().
  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false.
    it("should set the toggle's aria-expanded attribute to false", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-expanded");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-expanded attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test that _setAriaAttributes sets the toggle's role attribute to button if the toggle is not a button.
    it("should set the toggle's role attribute to button if the toggle is not a button", () => {
      document.body.innerHTML = twoLevel;

      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuToggleSelector: ".dropdown-toggle",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("role");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's role attribute.
      expect(menuToggle.dom.toggle.getAttribute("role")).toBe("button");
    });

    // Test that _setAriaAttributes does not set the toggle's role attribute to button if the toggle is a button.
    it("should not set the toggle's role attribute to button if the toggle is a button", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Test the toggle's role attribute.
      expect(menuToggle.dom.toggle.getAttribute("role")).not.toBe("button");
    });

    // Test that _setAriaAttributes sets the toggle's aria-controls attribute to the controlled menu's id.
    it("should set the toggle's aria-controls attribute to the controlled menu's id", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-controls");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-controls attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-controls")).toBe(
        menuToggle.elements.controlledMenu.dom.menu.id
      );
    });

    // Test that _setAriaAttributes sets the controlled menu's aria-labelledby attribute to the toggle's id.
    it("should set the controlled menu's aria-labelledby attribute to the toggle's id", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("id");
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
      ).toBe(menuToggle.dom.toggle.id);
    });
  });
});
