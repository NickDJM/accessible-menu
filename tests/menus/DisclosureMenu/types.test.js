/**
 * Type tests for the DisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import { singleLevel, twoLevelDisclosure } from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";

// Test the DisclosureMenu default class types.
describe("DisclosureMenu", () => {
  // Create the test menu.
  document.body.innerHTML = singleLevel;

  // Create a new DisclosureMenu instance for testing.
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("ul"),
  });

  // Test that the DisclosureMenu's _MenuType is DisclosureMenu.
  it("should have a _MenuType of DisclosureMenu", () => {
    expect(menu._MenuType).toBe(DisclosureMenu);
  });

  // Test that the DisclosureMenu's _MenuItemType is DisclosureMenuItem.
  it("should have a _MenuItemType of DisclosureMenuItem", () => {
    expect(menu._MenuItemType).toBe(DisclosureMenuItem);
  });

  // Test that the DisclosureMenu's _MenuToggleType is DisclosureMenuToggle.
  it("should have a _MenuToggleType of DisclosureMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(DisclosureMenuToggle);
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});

// Test the DisclosureMenu custom class types for a multi-level menu.
describe("DisclosureMenu (multi-level)", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosure;

  // Create a new DisclosureMenu instance for testing.
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("ul"),
    submenuItemSelector: ".dropdown",
  });

  // Test that the DisclosureMenu's _MenuType is DisclosureMenu.
  it("should have a _MenuType of DisclosureMenu", () => {
    expect(menu._MenuType).toBe(DisclosureMenu);
  });

  // Test that the DisclosureMenu's submenu's _MenuType is DisclosureMenu.
  it("should have all submenu's _MenuType be DisclosureMenu", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuType).toBe(DisclosureMenu);
    });
  });

  // Test that the DisclosureMenu's _MenuItemType is DisclosureMenuItem.
  it("should have a _MenuItemType of DisclosureMenuItem", () => {
    expect(menu._MenuItemType).toBe(DisclosureMenuItem);
  });

  // Test that the DisclosureMenu's submenu's _MenuItemType is DisclosureMenuItem.
  it("should have all submenu's _MenuItemType be DisclosureMenuItem", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuItemType).toBe(
        DisclosureMenuItem
      );
    });
  });

  // Test that the DisclosureMenu's _MenuToggleType is DisclosureMenuToggle.
  it("should have a _MenuToggleType of DisclosureMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(DisclosureMenuToggle);
  });

  // Test that the DisclosureMenu's submenu's _MenuToggleType is DisclosureMenuToggle.
  it("should have all submenu's _MenuToggleType be DisclosureMenuToggle", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuToggleType).toBe(
        DisclosureMenuToggle
      );
    });
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});
