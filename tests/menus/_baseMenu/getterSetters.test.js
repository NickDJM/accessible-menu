/**
 * Getter/Setter tests for the BaseMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test all getter methods in the BaseMenu class.
describe("BaseMenu getters", () => {
  // Test BaseMenu's dom getter.
  it("should return the menu's DOM elements", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.dom).toEqual(menu._dom);
  });

  // Test BaseMenu's selectors getter.
  it("should return the menu's selectors", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.selectors).toEqual(menu._selectors);
  });

  // Test BaseMenu's elements getter.
  it("should return the menu's declared accessible-menu elements", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.elements).toEqual(menu._elements);
  });

  // Test BaseMenu's isTopLevel getter.
  it("should return the value of the menu's top-level status", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.isTopLevel).toBe(menu._root);
  });

  // Test BaseMenu's openClass getter.
  // @todo: Test that the open class for submenus defaults to the root menu's open class.
  it("should return the menu's open class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.openClass).toBe(menu._openClass);
  });

  // Test BaseMenu's closeClass getter.
  // @todo: Test that the close class for submenus defaults to the root menu's close class.
  it("should return the menu's close class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.closeClass).toBe(menu._closeClass);
  });

  // Test BaseMenu's transitionClass getter.
  // @todo: Test that the transition class for submenus defaults to the root menu's transition class.
  it("should return the menu's transition class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.transitionClass).toBe(menu._transitionClass);
  });

  // Test BaseMenu's currentChild getter.
  it("should return the menu's current child index", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.currentChild).toBe(menu._currentChild);
  });

  // Test BaseMenu's focusState getter.
  it("should return the menu's focus state", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.focusState).toBe(menu._focusState);
  });

  // Test BaseMenu's currentEvent getter.
  it("should return the menu's current event type", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.currentEvent).toBe(menu._currentEvent);
  });

  // Test BaseMenu's currentMenuItem getter.
  it("should return the menu's current menu item", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.currentMenuItem).toBe(
      menu.elements.menuItems[menu.currentChild]
    );
  });

  // Test BaseMenu's hoverType getter.
  it("should return the menu's hover type", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.hoverType).toBe(menu._hoverType);
  });

  // Test BaseMenu's hoverDelay getter.
  it("should return the menu's hover delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.hoverDelay).toBe(menu._hoverDelay);
  });

  // Test BaseMenu's enterDelay getter.
  it("should return the menu's enter delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.enterDelay).toBe(menu._hoverDelay);
  });

  // Test BaseMenu's leaveDelay getter.
  it("should return the menu's leave delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.leaveDelay).toBe(menu._hoverDelay);
  });

  // Test BaseMenu's shouldFocus getter.
  it("should return the menu's shouldFocus value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.shouldFocus).toBeFalsy();
  });

  // Test BaseMenu's errors getter.
  it("should return the menu's errors array", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    expect(menu.errors).toEqual(menu._errors);
  });
});

// Test all setter methods in the BaseMenu class.
describe("BaseMenu setters", () => {
  // Test BaseMenu's openClass setter.
  it("should set the menu's open class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's open class name.
    menu.openClass = "test-open";

    expect(spy).toHaveBeenCalledWith({ openClass: "test-open" });
    expect(menu._openClass).toBe("test-open");
  });

  // Test BaseMenu's closeClass setter.
  it("should set the menu's close class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's close class name.
    menu.closeClass = "test-close";

    expect(spy).toHaveBeenCalledWith({ closeClass: "test-close" });
    expect(menu._closeClass).toBe("test-close");
  });

  // Test BaseMenu's transitionClass setter.
  it("should set the menu's transition class name", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidClassList");

    // Set the menu's transition class name.
    menu.transitionClass = "test-transition";

    expect(spy).toHaveBeenCalledWith({ transitionClass: "test-transition" });
    expect(menu._transitionClass).toBe("test-transition");
  });

  // Test BaseMenu's currentChild setter.
  // @todo: Test this for scenarios that would envoke setParentChild().
  it("should set the menu's current child index", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's current child index.
    menu.currentChild = 2;

    expect(spy).toHaveBeenCalledWith("number", { value: 2 });
    expect(menu._currentChild).toBe(2);
  });

  // Test BaseMenu's focusState setter.
  it("should set the menu's focus state", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidState");

    // Set the menu's focus state.
    menu.focusState = "child";

    expect(spy).toHaveBeenCalledWith({ value: "child" });
    expect(menu._focusState).toBe("child");
  });

  // Test BaseMenu's currentEvent setter.
  it("should set the menu's current event type", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidEvent");

    // Set the menu's current event type.
    menu.currentEvent = "mouse";

    expect(spy).toHaveBeenCalledWith({ value: "mouse" });
    expect(menu._currentEvent).toBe("mouse");
  });

  // Test BaseMenu's hoverType setter.
  it("should set the menu's hover type", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidHoverType");

    // Set the menu's hover type.
    menu.hoverType = "on";

    expect(spy).toHaveBeenCalledWith({ value: "on" });
    expect(menu._hoverType).toBe("on");
  });

  // Test BaseMenu's hoverDelay setter.
  it("should set the menu's hover delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's hover delay value.
    menu.hoverDelay = 200;

    expect(spy).toHaveBeenCalledWith("number", { value: 200 });
    expect(menu._hoverDelay).toBe(200);
  });

  // Test BaseMenu's enterDelay setter.
  it("should set the menu's enter delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's enter delay value.
    menu.enterDelay = 100;

    expect(spy).toHaveBeenCalledWith("number", { value: 100 });
    expect(menu._enterDelay).toBe(100);
  });

  // Test BaseMenu's leaveDelay setter.
  it("should set the menu's leave delay value", () => {
    // Create a new BaseMenu instance for testing.
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
    });
    initializeMenu(menu);

    // Set up to check for validation.
    const spy = vi.spyOn(validation, "isValidType");

    // Set the menu's leave delay value.
    menu.leaveDelay = 100;

    expect(spy).toHaveBeenCalledWith("number", { value: 100 });
    expect(menu._leaveDelay).toBe(100);
  });
});
