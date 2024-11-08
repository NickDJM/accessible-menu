/**
 * Focus tests for the BaseMenu class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
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
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();

      expect(menu.focusState).toBe("self");
    });

    // Test that the current child index is set to the focused menu item's index.
    it.each([0, 1, 2, 3, 4, 5, 6, 7])(
      "should set the current child index to the menu item %s",
      (i) => {
        // Create a new BaseMenu instance for testing.
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
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

  describe("focusout", () => {
    // Test that focus state gets set to none when the menu loses focus.
    it("should set focus state to none when the menu loses focus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Trigger a focusout event on the menu.
      menu.dom.menu.dispatchEvent(new FocusEvent("focusout",
        { relatedTarget: document.body }
      ));

      expect(menu.focusState).toBe("none");
    });

    // Test that the closeChildren method is called when the menu loses focus.
    it("should call the closeChildren method when the menu loses focus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Spy on the closeChildren method.
      const spy = vi.spyOn(menu, "closeChildren");

      // Trigger a focusout event on the menu.
      menu.dom.menu.dispatchEvent(new FocusEvent("focusout",
        { relatedTarget: document.body }
      ));

      expect(spy).toHaveBeenCalled();
    });

    // Test that the focus state does not get set to none when the menu loses focus but the current event is not keyboard.
    it("should not set focus state to none when the menu loses focus but the current event is not keyboard", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "mouse";

      // Trigger a focusout event on the menu.
      menu.dom.menu.dispatchEvent(new FocusEvent("focusout"));

      expect(menu.focusState).not.toBe("none");
    });

    // Test that the closeChildren method is not called when the menu loses focus but the current event is not keyboard.
    it("should not call the closeChildren method when the menu loses focus but the current event is not keyboard", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "mouse";

      // Spy on the closeChildren method.
      const spy = vi.spyOn(menu, "closeChildren");

      // Trigger a focusout event on the menu.
      menu.dom.menu.dispatchEvent(new FocusEvent("focusout"));

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that the focus state does not get set to none when the menu loses focus, but the relatedTarget is contained within the menu.
    it("should not set focus state to none when the menu loses focus but the relatedTarget is contained within the menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Trigger a focusout event on the menu with a relatedTarget that is contained within the menu.
      menu.dom.menu.dispatchEvent(
        new FocusEvent("focusout", {
          relatedTarget: menu.elements.menuItems[1].dom.link,
        })
      );

      expect(menu.focusState).not.toBe("none");
    });

    // Test that the closeChildren method is not called when the menu loses focus but the relatedTarget is contained within the menu.
    it("should not call the closeChildren method when the menu loses focus but the relatedTarget is contained within the menu", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Spy on the closeChildren method.
      const spy = vi.spyOn(menu, "closeChildren");

      // Trigger a focusout event on the menu with a relatedTarget that is contained within the menu.
      menu.dom.menu.dispatchEvent(
        new FocusEvent("focusout", {
          relatedTarget: menu.elements.menuItems[1].dom.link,
        })
      );

      expect(spy).not.toHaveBeenCalled();
    });

    // Test that the focus state does not get set to none when the menu loses focus, but the relatedTarget is null.
    it("should not set focus state to none when the menu loses focus but the relatedTarget is null", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Trigger a focusout event on the menu with a relatedTarget that is null.
      menu.dom.menu.dispatchEvent(
        new FocusEvent("focusout", {
          relatedTarget: null,
        })
      );

      expect(menu.focusState).not.toBe("none");
    });

    // Test that the closeChildren method is not called when the menu loses focus but the relatedTarget is null.
    it("should not call the closeChildren method when the menu loses focus but the relatedTarget is null", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      // Focus the first menu item.
      menu.elements.menuItems[0].dom.link.focus();
      menu.currentEvent = "keyboard";

      // Spy on the closeChildren method.
      const spy = vi.spyOn(menu, "closeChildren");

      // Trigger a focusout event on the menu with a relatedTarget that is null.
      menu.dom.menu.dispatchEvent(
        new FocusEvent("focusout", {
          relatedTarget: null,
        })
      );

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
