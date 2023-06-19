/**
 * Focus tests for the BaseMenu class.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test focus events on the BaseMenu.
describe("BaseMenu", () => {
  // Test focus.
  describe("focus", () => {
    // Test that focus state gets set to self when a menu item is focused.
    it("should set focus state to self when a menu item is focused", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();

      expect(menu.focusState).toBe("self");
    });

    // Test that the current child index is set to the focused menu item's index.
    it.each([0, 1, 2, 3, 4, 5, 6])(
      "should set the current child index to the menu item %s",
      (i) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuItemSelector: "li.dropdown",
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
        });
        initializeMenu(menu);

        // Focus the first menu item.
        menu.elements.menuItems[i].dom.link.focus();

        expect(menu.currentChild).toBe(i);
      }
    );
  });
});
