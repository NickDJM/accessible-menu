/**
 * Type tests for the TopLinkDisclosureMenu class.
 */

import { describe, it, expect } from "vitest";
import { singleLevel, twoLevelTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuItem from "../../../src/topLinkDisclosureMenuItem.js";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";

// Test the TopLinkDisclosureMenu default class types.
describe("TopLinkDisclosureMenu", () => {
  // Create the test menu.
  document.body.innerHTML = singleLevel;

  // Create a new TopLinkDisclosureMenu instance for testing.
  const menu = new TopLinkDisclosureMenu({
    menuElement: document.querySelector("ul"),
  });

  // Test that the TopLinkDisclosureMenu's _MenuType is TopLinkDisclosureMenu.
  it("should have a _MenuType of TopLinkDisclosureMenu", () => {
    expect(menu._MenuType).toBe(TopLinkDisclosureMenu);
  });

  // Test that the TopLinkDisclosureMenu's _MenuItemType is TopLinkDisclosureMenuItem.
  it("should have a _MenuItemType of TopLinkDisclosureMenuItem", () => {
    expect(menu._MenuItemType).toBe(TopLinkDisclosureMenuItem);
  });

  // Test that the TopLinkDisclosureMenu's _MenuToggleType is TopLinkDisclosureMenuToggle.
  it("should have a _MenuToggleType of TopLinkDisclosureMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(TopLinkDisclosureMenuToggle);
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});

// Test the TopLinkDisclosureMenu custom class types for a multi-level menu.
describe("TopLinkDisclosureMenu (multi-level)", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevelTopLink;

  // Create a new TopLinkDisclosureMenu instance for testing.
  const menu = new TopLinkDisclosureMenu({
    menuElement: document.querySelector("ul"),
    submenuItemSelector: ".dropdown",
  });

  // Test that the TopLinkDisclosureMenu's _MenuType is TopLinkDisclosureMenu.
  it("should have a _MenuType of TopLinkDisclosureMenu", () => {
    expect(menu._MenuType).toBe(TopLinkDisclosureMenu);
  });

  // Test that the TopLinkDisclosureMenu's submenu's _MenuType is TopLinkDisclosureMenu.
  it("should have all submenu's _MenuType be TopLinkDisclosureMenu", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuType).toBe(
        TopLinkDisclosureMenu
      );
    });
  });

  // Test that the TopLinkDisclosureMenu's _MenuItemType is TopLinkDisclosureMenuItem.
  it("should have a _MenuItemType of TopLinkDisclosureMenuItem", () => {
    expect(menu._MenuItemType).toBe(TopLinkDisclosureMenuItem);
  });

  // Test that the TopLinkDisclosureMenu's submenu's _MenuItemType is TopLinkDisclosureMenuItem.
  it("should have all submenu's _MenuItemType be TopLinkDisclosureMenuItem", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuItemType).toBe(
        TopLinkDisclosureMenuItem
      );
    });
  });

  // Test that the TopLinkDisclosureMenu's _MenuToggleType is TopLinkDisclosureMenuToggle.
  it("should have a _MenuToggleType of TopLinkDisclosureMenuToggle", () => {
    expect(menu._MenuToggleType).toBe(TopLinkDisclosureMenuToggle);
  });

  // Test that the TopLinkDisclosureMenu's submenu's _MenuToggleType is TopLinkDisclosureMenuToggle.
  it("should have all submenu's _MenuToggleType be TopLinkDisclosureMenuToggle", () => {
    menu.elements.submenuToggles.forEach((toggle) => {
      expect(toggle.elements.controlledMenu._MenuToggleType).toBe(
        TopLinkDisclosureMenuToggle
      );
    });
  });

  // Clean up the test menu.
  document.body.innerHTML = "";
});
