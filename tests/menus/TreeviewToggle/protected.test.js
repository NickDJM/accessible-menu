/**
 * Tests for protected methods in the TreeviewToggle class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import TreeviewToggle from "../../../src/treeviewToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test TreeviewToggle protected methods.
describe("TreeviewToggle protected methods", () => {
  // Test TreeviewToggle _expand().
  describe("_expand", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(TreeviewToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test TreeviewToggle _collapse().
  describe("_collapse", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(TreeviewToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });

  // Test TreeviewToggle _setIds().
  describe("_setIds", () => {
    // Test that TreeviewToggle implements the BaseMenuToggle _setIds.
    it("should implement the BaseMenuToggle _setIds", () => {
      expect(TreeviewToggle.prototype._setIds).toBe(
        BaseMenuToggle.prototype._setIds
      );
    });
  });

  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-haspopup attribute to true.
    it("should set the toggle's aria-haspopup attribute to true", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-haspopup");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-haspopup attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-haspopup")).toBe("true");
    });

    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false if it is not set.
    it("should set the toggle's aria-expanded attribute to false if it is not set", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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

    // Test that _setAriaAttributes does not change the toggle's aria-expanded attribute if it is already set to true.
    it("should not change the toggle's aria-expanded attribute if it is already set to true", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.setAttribute("aria-expanded", "true");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-expanded attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
    });

    // Test that _setAriaAttributes sets the toggle's aria-expanded role to false if it is set to anything other than true.
    it("should set the toggle's aria-expanded role to false if it is set to anything other than true", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.setAttribute("aria-expanded", "invalid");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-expanded attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test that _setAriaAttributes sets the toggle's role attribute to button if the toggle is not a button.
    // @todo Make a test for when the toggle _is_ a button. This will require a new menu template.
    it("should set the toggle's role attribute to button if the toggle is not a button", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
        menuElement: document.querySelector("ul"),
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

    // Test that _setAriaAttributes sets the toggle's aria-controls attribute to the controlled menu's id.
    it("should set the toggle's aria-controls attribute to the controlled menu's id", () => {
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
      // Create a new Treeview instance for testing.
      const menu = new Treeview({
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
