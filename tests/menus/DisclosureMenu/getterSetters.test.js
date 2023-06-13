/**
 * Getter/Setter tests for the DisclosureMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import * as validation from "../../../src/validate.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test all getter methods in the DisclosureMenu class.
describe("DisclosureMenu getters", () => {
  // Test DisclosureMenu's dom getter.
  it("should return the menu's DOM elements", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.dom).toEqual(menu._dom);
  });

  // Test DisclosureMenu's selectors getter.
  it("should return the menu's selectors", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.selectors).toEqual(menu._selectors);
  });

  // Test DisclosureMenu's elements getter.
  it("should return the menu's declared accessible-menu elements", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.elements).toEqual(menu._elements);
  });

  // Test DisclosureMenu's isTopLevel getter.
  it("should return the value of the menu's top-level status", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.isTopLevel).toBe(menu._root);
  });

  // Test DisclosureMenu's openClass getter.
  // @todo: Test that the open class for submenus defaults to the root menu's open class.
  it("should return the menu's open class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.openClass).toBe(menu._openClass);
  });

  // Test DisclosureMenu's closeClass getter.
  // @todo: Test that the close class for submenus defaults to the root menu's close class.
  it("should return the menu's close class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.closeClass).toBe(menu._closeClass);
  });

  // Test DisclosureMenu's transitionClass getter.
  // @todo: Test that the transition class for submenus defaults to the root menu's transition class.
  it("should return the menu's transition class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.transitionClass).toBe(menu._transitionClass);
  });

  // Test DisclosureMenu's currentChild getter.
  it("should return the menu's current child index", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.currentChild).toBe(menu._currentChild);
  });

  // Test DisclosureMenu's focusState getter.
  it("should return the menu's focus state", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.focusState).toBe(menu._focusState);
  });

  // Test DisclosureMenu's currentEvent getter.
  it("should return the menu's current event type", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.currentEvent).toBe(menu._currentEvent);
  });

  // Test DisclosureMenu's currentMenuItem getter.
  it("should return the menu's current menu item", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.currentMenuItem).toBe(
      menu.elements.menuItems[menu.currentChild]
    );
  });

  // Test DisclosureMenu's hoverType getter.
  it("should return the menu's hover type", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.hoverType).toBe(menu._hoverType);
  });

  // Test DisclosureMenu's hoverDelay getter.
  it("should return the menu's hover delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.hoverDelay).toBe(menu._hoverDelay);
  });

  // Test DisclosureMenu's enterDelay getter.
  it("should return the menu's enter delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.enterDelay).toBe(menu._hoverDelay);
  });

  // Test DisclosureMenu's leaveDelay getter.
  it("should return the menu's leave delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.leaveDelay).toBe(menu._hoverDelay);
  });

  // Test DisclosureMenu's shouldFocus getter.
  it("should return the menu's shouldFocus value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.shouldFocus).toBeFalsy();
  });

  // Test DisclosureMenu's errors getter.
  it("should return the menu's errors array", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.errors).toEqual(menu._errors);
  });

  // Test DisclosureMenu's optionalKeySupport getter.
  // @todo: Test that the optional key support for submenus defaults to the root menu's optional key support.
  it("should return the menu's optional key support value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.optionalKeySupport).toEqual(menu._optionalSupport);
  });
});

// Test all setter methods in the DisclosureMenu class.
describe("DisclosureMenu setters", () => {
  // Test DisclosureMenu's openClass setter.
  it("should set the menu's open class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's open class name.
    menu.openClass = "test-open";

    expect(spy).toHaveBeenCalledWith({ openClass: "test-open" });
    expect(menu._openClass).toBe("test-open");
  });

  // Test DisclosureMenu's closeClass setter.
  it("should set the menu's close class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's close class name.
    menu.closeClass = "test-close";

    expect(spy).toHaveBeenCalledWith({ closeClass: "test-close" });
    expect(menu._closeClass).toBe("test-close");
  });

  // Test DisclosureMenu's transitionClass setter.
  it("should set the menu's transition class name", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's transition class name.
    menu.transitionClass = "test-transition";

    expect(spy).toHaveBeenCalledWith({ transitionClass: "test-transition" });
    expect(menu._transitionClass).toBe("test-transition");
  });

  // Test DisclosureMenu's currentChild setter.
  // @todo: Test this for scenarios that would envoke setParentChild().
  it("should set the menu's current child index", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's current child index.
    menu.currentChild = 2;

    expect(spy).toHaveBeenCalledWith("number", { value: 2 });
    expect(menu._currentChild).toBe(2);
  });

  // Test DisclosureMenu's focusState setter.
  it("should set the menu's focus state", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidState");

    // Set the menu's focus state.
    menu.focusState = "child";

    expect(spy).toHaveBeenCalledWith({ value: "child" });
    expect(menu._focusState).toBe("child");
  });

  // Test DisclosureMenu's currentEvent setter.
  it("should set the menu's current event type", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidEvent");

    // Set the menu's current event type.
    menu.currentEvent = "mouse";

    expect(spy).toHaveBeenCalledWith({ value: "mouse" });
    expect(menu._currentEvent).toBe("mouse");
  });

  // Test DisclosureMenu's hoverType setter.
  it("should set the menu's hover type", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidHoverType");

    // Set the menu's hover type.
    menu.hoverType = "on";

    expect(spy).toHaveBeenCalledWith({ value: "on" });
    expect(menu._hoverType).toBe("on");
  });

  // Test DisclosureMenu's hoverDelay setter.
  it("should set the menu's hover delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's hover delay value.
    menu.hoverDelay = 200;

    expect(spy).toHaveBeenCalledWith("number", { value: 200 });
    expect(menu._hoverDelay).toBe(200);
  });

  // Test DisclosureMenu's enterDelay setter.
  it("should set the menu's enter delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's enter delay value.
    menu.enterDelay = 100;

    expect(spy).toHaveBeenCalledWith("number", { value: 100 });
    expect(menu._enterDelay).toBe(100);
  });

  // Test DisclosureMenu's leaveDelay setter.
  it("should set the menu's leave delay value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's leave delay value.
    menu.leaveDelay = 100;

    expect(spy).toHaveBeenCalledWith("number", { value: 100 });
    expect(menu._leaveDelay).toBe(100);
  });

  // Test DisclosureMenu's optionalKeySupport setter.
  it("should set the menu's optional key support value", () => {
    // Create a new DisclosureMenu instance for testing.
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
    });

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's optional key support value.
    menu.optionalKeySupport = true;

    expect(spy).toHaveBeenCalledWith("boolean", { optionalKeySupport: true });
    expect(menu._optionalSupport).toBeTruthy();
  });
});
