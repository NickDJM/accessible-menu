/**
 * Reusable internal menu function tests.
 */

import { describe, test, expect } from "vitest";
import { twoLevelMenu, twoLevelTopLinkMenu } from "./test-menus";

/**
 * A set of tests for the _setDOMElementType method.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview|typeof TopLinkDisclosureMenu)} MenuClass - The menu class to test.
 */
export function setDOMElements(MenuClass) {
  const menuType = MenuClass.name;

  describe(menuType, () => {
    const allowedSets = [
      "menuItems",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedSets = ["menuLinks"];

    test.each(allowedSets)("can set '%s' elements", (type) => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._setDOMElementType(type);
      }).not.toThrow();
    });

    test.each(disallowedSets)("cannot set '%s' elements", (type) => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._setDOMElementType(type);
      }).toThrow(
        `The "${type}" element cannot be set through _setDOMElementType.`
      );
    });

    test("will fail if trying to set an element that doesn't have a selector", () => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._setDOMElementType("menu");
      }).toThrow('"menu" is not a valid element type within the menu.');
    });
  });
}

/**
 * A set of tests for the _resetDOMElementType method.
 *
 * @param {(typeof DisclosureMenu|typeof Menubar|typeof Treeview|typeof TopLinkDisclosureMenu)} MenuClass - The menu class to test.
 */
export function resetDOMElements(MenuClass) {
  const menuType = MenuClass.name;

  describe(menuType, () => {
    const allowedSets = [
      "menuItems",
      "submenuItems",
      "submenuToggles",
      "submenus",
    ];
    const disallowedSets = ["menu", "container", "controller"];

    test.each(allowedSets)("can reset '%s' elements", (type) => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._resetDOMElementType(type);
      }).not.toThrow();
    });

    test.each(disallowedSets)("cannot reset '%s' elements", (type) => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._resetDOMElementType(type);
      }).toThrow(
        `The "${type}" element cannot be reset through _resetDOMElementType.`
      );
    });

    test("will fail if trying to reset an element that doesn't exist", () => {
      // Set up the DOM.
      document.body.innerHTML =
        menuType === "TopLinkDisclosureMenu"
          ? twoLevelTopLinkMenu
          : twoLevelMenu;
      const menu = new MenuClass({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("#toggle-0"),
      });

      expect(() => {
        menu._resetDOMElementType("otherMenu");
      }).toThrow('"otherMenu" is not a valid element type within the menu.');
    });
  });
}
