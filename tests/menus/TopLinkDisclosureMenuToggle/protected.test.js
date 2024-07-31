/**
 * Tests for protected methods in the TopLinkDisclosureMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  twoLevelDisclosureTopLink,
  twoLevelDisclosureTopLinkNoButtons,
} from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test TopLinkDisclosureMenuToggle protected methods.
describe("TopLinkDisclosureMenuToggle protected methods", () => {
  // Test TopLinkDisclosureMenuToggle _expand().
  describe("_expand", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(TopLinkDisclosureMenuToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle _collapse().
  describe("_collapse", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(TopLinkDisclosureMenuToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle _setIds().
  describe("_setIds", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle _setIds.
    it("should implement the BaseMenuToggle _setIds", () => {
      expect(TopLinkDisclosureMenuToggle.prototype._setIds).toBe(
        BaseMenuToggle.prototype._setIds
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle _setAriaAttributes().
  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false.
    it("should set the toggle's aria-expanded attribute to false", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      document.body.innerHTML = twoLevelDisclosureTopLinkNoButtons;

      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
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
