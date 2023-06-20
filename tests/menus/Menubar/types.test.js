/**
 * Types test for Menubar component.
 */

import { describe, it, expect } from "vitest";
import { singleLevel, twoLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";
import MenubarItem from "../../../src/menubarItem.js";
import MenubarToggle from "../../../src/menubarToggle.js";

// Test the Menubar default class types.
describe("Menubar", () => {
  // Create the test menu.
  document.body.innerHTML = singleLevel;

  // Create a new Menubar instance for testing.
  const menu = new Menubar({
    menuElement: document.querySelector("ul"),
  });

  // Test that the Menubar's _MenuType is Menubar.
  it("should have a _MenuType of Menubar", () => {
    expect(menu._MenuType).toBe(Menubar);
  });

  // Test that the Menubar's _MenuItemType is MenubarItem.
  it("should have a _MenuItemType of MenubarItem", () => {
    expect(menu._MenuItemType).toBe(MenubarItem);
  });

  // Test that the Menubar's _MenuToggleType is MenubarToggle.
  it("should have a _MenuToggleType of MenubarToggle", () => {
    expect(menu._MenuToggleType).toBe(MenubarToggle);
  });
});

// Test the Menubar custom class types for a multi-level menu.
describe("Menubar (multi-level)", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new Menubar instance for testing.
  const menu = new Menubar({
    menuElement: document.querySelector("ul"),
  });

  // Test that the Menubar's _MenuType is Menubar.
  it("should have a _MenuType of Menubar", () => {
    expect(menu._MenuType).toBe(Menubar);
  });

  // Test that the Menubar's submenu's _MenuType is Menubar.
  it("should have all submenu's _MenuType be Menubar", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuType).toBe(Menubar);
    });
  });

  // Test that the Menubar's _MenuItemType is MenubarItem.
  it("should have a _MenuItemType of MenubarItem", () => {
    expect(menu._MenuItemType).toBe(MenubarItem);
  });

  // Test that the Menubar's submenu's _MenuItemType is MenubarItem.
  it("should have all submenu's _MenuItemType be MenubarItem", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      toggle.elements.controlledMenu.elements.menuItems.forEach((item) => {
        expect(item._MenuItemType).toBe(MenubarItem);
      });
    });
  });

  // Test that the Menubar's _MenuToggleType is MenubarToggle.
  it("should have a _MenuToggleType of MenubarToggle", () => {
    expect(menu._MenuToggleType).toBe(MenubarToggle);
  });

  // Test that the Menubar's submenu's _MenuToggleType is MenubarToggle.
  it("should have all submenu's _MenuToggleType be MenubarToggle", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle._MenuToggleType).toBe(MenubarToggle);
    });
  });
});
