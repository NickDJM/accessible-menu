/**
 * Tests for protected methods in the MenubarToggle class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import MenubarToggle from "../../../src/menubarToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test MenubarToggle protected methods.
describe("MenubarToggle protected methods", () => {
  // Test MenubarToggle _expand().
  describe("_expand", () => {
    // Test that MenubarToggle implements the BaseMenuToggle _expand.
    it("should implement the BaseMenuToggle _expand", () => {
      expect(MenubarToggle.prototype._expand).toBe(
        BaseMenuToggle.prototype._expand
      );
    });
  });

  // Test MenubarToggle _collapse().
  describe("_collapse", () => {
    // Test that MenubarToggle implements the BaseMenuToggle _collapse.
    it("should implement the BaseMenuToggle _collapse", () => {
      expect(MenubarToggle.prototype._collapse).toBe(
        BaseMenuToggle.prototype._collapse
      );
    });
  });

  // Test MenubarToggle _setIds().
  describe("_setIds", () => {
    // Test that MenubarToggle implements the BaseMenuToggle _setIds.
    it("should implement the BaseMenuToggle _setIds", () => {
      expect(MenubarToggle.prototype._setIds).toBe(
        BaseMenuToggle.prototype._setIds
      );
    });
  });

  // Test MenubarToggle _setAriaAttributes().
  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-haspopup attribute to true.
    it("should set the toggle's aria-haspopup attribute to true", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false.
    it("should set the toggle's aria-expanded attribute to false", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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

    // Test that _setAriaAttributes sets the controlled menu's aria-labelledby attribute to the toggle's id.
    it("should set the controlled menu's aria-labelledby attribute to the toggle's id", () => {
      // Create a new Menubar instance for testing.
      const menu = new Menubar({
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
