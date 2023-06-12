/**
 * Type tests for the BaseMenu class.
 */

import { describe, it, expect } from "vitest";
import { singleLevel, twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

// Test the BaseMenu default class types.
describe("BaseMenu", () => {
  // Create the test menu.
  document.body.innerHTML = singleLevel;

  // Create a new BaseMenu instance for testing.
  const menu = new BaseMenu({
    menuElement: document.querySelector("ul"),
  });
  menu.initialize();

  // Test that the BaseMenu's _MenuType is BaseMenu.
  it("should have a _MenuType of BaseMenu", () => {
    expect(menu._MenuType).toBe(BaseMenu);
  });

  // Test that the BaseMenu's _MenuItemType is BaseMenuItem.
  it("should have a _MenuItemType of BaseMenuItem", () => {
    expect(menu._MenuItemType).toBe(BaseMenuItem);
  });

  // Test that the BaseMenu's _MenuToggleType is BaseMenuToggle.
  it("should have a _MenuToggleType of BaseMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(BaseMenuToggle);
  });
});

// Test the BaseMenu custom class types for a multi-level menu.
describe("BaseMenu (multi-level)", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new BaseMenu instance for testing.
  const menu = new BaseMenu({
    menuElement: document.querySelector("ul"),
  });
  menu.initialize();

  // Test that the BaseMenu's _MenuType is BaseMenu.
  it("should have a _MenuType of BaseMenu", () => {
    expect(menu._MenuType).toBe(BaseMenu);
  });

  // Test that the BaseMenu's submenu's _MenuType is BaseMenu.
  it("should have all submenu's _MenuType be BaseMenu", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuType).toBe(BaseMenu);
    });
  });

  // Test that the BaseMenu's _MenuItemType is BaseMenuItem.
  it("should have a _MenuItemType of BaseMenuItem", () => {
    expect(menu._MenuItemType).toBe(BaseMenuItem);
  });

  // Test that the BaseMenu's submenu's _MenuItemType is BaseMenuItem.
  it("should have all submenu's _MenuItemType be BaseMenuItem", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuItemType).toBe(BaseMenuItem);
    });
  });

  // Test that the BaseMenu's _MenuToggleType is BaseMenuToggle.
  it("should have a _MenuToggleType of BaseMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(BaseMenuToggle);
  });

  // Test that the BaseMenu's submenu's _MenuToggleType is BaseMenuToggle.
  it("should have all submenu's _MenuToggleType be BaseMenuToggle", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle._MenuToggleType).toBe(BaseMenuToggle);
    });
  });
});
