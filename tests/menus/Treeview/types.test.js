/**
 * Type tests for the Treeview class.
 */

import { describe, it, expect } from "vitest";
import { singleLevel, twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";
import TreeviewItem from "../../../src/treeviewItem.js";
import TreeviewToggle from "../../../src/treeviewToggle.js";

// Test the Treeview default class types.
describe("Treeview", () => {
  // Create the test menu.
  document.body.innerHTML = singleLevel;

  // Create a new Treeview instance for testing.
  const menu = new Treeview({
    menuElement: document.querySelector("ul"),
  });

  // Test that the Treeview's _MenuType is Treeview.
  it("should have a _MenuType of Treeview", () => {
    expect(menu._MenuType).toBe(Treeview);
  });

  // Test that the Treeview's _MenuItemType is TreeviewItem.
  it("should have a _MenuItemType of TreeviewItem", () => {
    expect(menu._MenuItemType).toBe(TreeviewItem);
  });

  // Test that the Treeview's _MenuToggleType is TreeviewToggle.
  it("should have a _MenuToggleType of TreeviewToggle", () => {
    expect(menu._MenuToggleType).toBe(TreeviewToggle);
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});

// Test the Treeview custom class types for a multi-level menu.
describe("Treeview (multi-level)", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new Treeview instance for testing.
  const menu = new Treeview({
    menuElement: document.querySelector("ul"),
    submenuItemSelector: ".dropdown",
  });

  // Test that the Treeview's _MenuType is Treeview.
  it("should have a _MenuType of Treeview", () => {
    expect(menu._MenuType).toBe(Treeview);
  });

  // Test that the Treeview's submenu's _MenuType is Treeview.
  it("should have all submenu's _MenuType be Treeview", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuType).toBe(Treeview);
    });
  });

  // Test that the Treeview's _MenuItemType is TreeviewItem.
  it("should have a _MenuItemType of TreeviewItem", () => {
    expect(menu._MenuItemType).toBe(TreeviewItem);
  });

  // Test that the Treeview's submenu's _MenuItemType is TreeviewItem.
  it("should have all submenu's _MenuItemType be TreeviewItem", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuItemType).toBe(TreeviewItem);
    });
  });

  // Test that the Treeview's _MenuToggleType is TreeviewToggle.
  it("should have a _MenuToggleType of TreeviewToggle", () => {
    expect(menu._MenuToggleType).toBe(TreeviewToggle);
  });

  // Test that the Treeview's submenu's _MenuToggleType is TreeviewToggle.
  it("should have all submenu's _MenuToggleType be TreeviewToggle", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuToggleType).toBe(
        TreeviewToggle
      );
    });
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});
