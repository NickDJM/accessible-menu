/**
 * Tests for public methods of the TopLinkDisclosureMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { threeLevelTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = threeLevelTopLink;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test TopLinkDisclosureMenuToggle public methods.
describe("TopLinkDisclosureMenuToggle public methods", () => {
  // Test TopLinkDisclosureMenuItem open().
  describe("open", () => {
    // Test that open sets the controlled menu's focus state to self.
    it("should set the controlled menu's focus state to self", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.open();

      expect(menuToggle.elements.controlledMenu.focusState).toEqual("self");
    });

    // Test that open calls _expand().
    it("should call _expand()", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.open();

      expect(spy).toHaveBeenCalled();
    });

    // Test that open sets the open flag to true.
    it("should set the open flag to true", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.open();

      expect(menuToggle.isOpen).toBe(true);
    });

    // Test that open calls closeSiblings().
    it("should call closeSiblings()", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for closeSiblings() call.
      const spy = vi.spyOn(menuToggle, "closeSiblings");

      menuToggle.open();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test TopLinkDisclosureMenuToggle preview().
  describe("preview", () => {
    // Test that preview sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
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
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _expand() call.
      const spy = vi.spyOn(menuToggle, "_expand");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });

    // Test that preview sets the open flag to true.
    it("should set the open flag to true", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      menuToggle.preview();

      expect(menuToggle.isOpen).toBe(true);
    });

    // Test that preview calls closeSiblings().
    it("should call closeSiblings()", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for closeSiblings() call.
      const spy = vi.spyOn(menuToggle, "closeSiblings");

      menuToggle.preview();

      expect(spy).toHaveBeenCalled();
    });
  });

  // Test TopLinkDisclosureMenuToggle close().
  describe("close", () => {
    // Test that close sets the controlled menu's current child to 0.
    it("should set the controlled menu's current child to 0", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.isOpen = true;
      menuToggle.elements.controlledMenu.currentChild = 1;

      // Close the menu.
      menuToggle.close();

      expect(menuToggle.elements.controlledMenu.currentChild).toEqual(0);
    });

    // Test that close calls blur() on the controlled menu.
    it("should call blur() on the controlled menu", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for blur() call.
      const spy = vi.spyOn(menuToggle.elements.controlledMenu, "blur");

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(spy).toHaveBeenCalled();
    });

    // Test that close sets the parent menu's focus state to self.
    it("should set the parent menu's focus state to self", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menu.focusState = "child";
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(menu.focusState).toEqual("self");
    });

    // Test that close calls _collapse().
    it("should call _collapse()", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for _collapse() call.
      const spy = vi.spyOn(menuToggle, "_collapse");

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(spy).toHaveBeenCalled();
    });

    // Test that close sets the open flag to false.
    it("should set the open flag to false", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.body,
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.isOpen = true;

      // Close the menu.
      menuToggle.close();

      expect(menuToggle.isOpen).toBe(false);
    });

    // Test that close calls closeChildren().
    it("should call closeChildren()", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for closeChildren() call.
      const spy = vi.spyOn(menuToggle, "closeChildren");

      // Set up the menu.
      menuToggle.isOpen = true;

      menuToggle.close();

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

  // Test TopLinkDisclosureMenuToggle closeSiblins().
  describe("closeSiblings", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle closeSiblings.
    it("should implement the BaseMenuToggle closeSiblings", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.closeSiblings).toBe(
        BaseMenuToggle.prototype.closeSiblings
      );
    });
  });

  // Test TopLinkDisclosureMenuToggle closeChildren().
  describe("closeChildren", () => {
    // Test that TopLinkDisclosureMenuToggle implements the BaseMenuToggle closeChildren.
    it("should implement the BaseMenuToggle closeChildren", () => {
      expect(TopLinkDisclosureMenuToggle.prototype.closeChildren).toBe(
        BaseMenuToggle.prototype.closeChildren
      );
    });
  });
});
