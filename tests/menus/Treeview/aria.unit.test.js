/**
 * Tests for Treeview's aria compliance.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Treeview from "../../../src/treeview.js";

// Read the demo markup to list the cases without creating a shared menu.
const markup = new DOMParser().parseFromString(twoLevel, "text/html");
const menuItems = Array.from(markup.querySelector("ul").children);
const submenuItems = menuItems.filter((item) => item.querySelector("ul"));

let menu;

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new Treeview instance for testing.
  menu = new Treeview({
    menuElement: document.querySelector("ul"),
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("button"),
  });
});

afterEach(() => {
  menu.dispose();
  document.body.innerHTML = "";
});

describe("Treeview", () => {
  // Test the root menu's aria-labelledby attribute.
  it("should set the root menu's aria-labelledby attribute", () => {
    expect(menu.dom.menu.getAttribute("aria-labelledby")).toBe(
      menu.dom.controller.id
    );
  });

  // Test the root menu's role attribute.
  it("should set the root menu's role attribute", () => {
    expect(menu.dom.menu.getAttribute("role")).toBe("tree");
  });

  // Test the root menu's controller's aria-expanded attribute.
  it("should set the root menu's controller's aria-expanded attribute", () => {
    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
  });

  // Test the root menu's controller's aria-controls attribute.
  it("should set the root menu's controller's aria-controls attribute", () => {
    expect(menu.dom.controller.getAttribute("aria-controls")).toBe(
      menu.dom.menu.id
    );
  });

  // Test the root menu's controller's aria-expanded attribute when the menu is expand.
  it("should set the root menu's controller's aria-expanded attribute when the menu is open", () => {
    menu.elements.controller.expand();

    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
  });

  // Test the root menu's controller's aria-expanded attribute when the menu is closed.
  it("should set the root menu's controller's aria-expanded attribute when the menu is closed", () => {
    menu.elements.controller.expand();

    menu.elements.controller.collapse();

    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
  });

  // Test each menu item for aria compliance.
  describe.each(menuItems.map((_, index) => ({ index })))(
    "Menu item $index",
    ({ index }) => {
      let item;

      beforeEach(() => {
        item = menu.elements.menuItems[index];
      });

      // Test the menu item's role attribute.
      it("should set the menu item's role attribute", () => {
        expect(item.dom.item.getAttribute("role")).toBe("none");
      });

      // Test the menu item's link's role attribute.
      it("should set the menu item's link's role attribute", () => {
        expect(item.dom.link.getAttribute("role")).toBe("treeitem");
      });

      // Test the menu item's link's tabindex attribute.
      const tabIndex = index === 0 ? "0" : "-1";
      it("should set the menu item's link's tabindex attribute", () => {
        expect(item.dom.link.getAttribute("tabindex")).toBe(tabIndex);
      });
    }
  );

  // Test each submenu for aria compliance.
  describe.each(submenuItems.map((element, index) => ({ index, element })))(
    "Submenu $index",
    ({ index, element }) => {
      let toggle;

      beforeEach(() => {
        toggle = menu.elements.submenuToggles[index];
      });

      // Test the submenu's aria-labelledby attribute.
      it("should set the submenu's aria-labelledby attribute", () => {
        expect(
          toggle.elements.controlledMenu.dom.menu.getAttribute(
            "aria-labelledby"
          )
        ).toBe(toggle.dom.controller.id);
      });

      // Test the submenu's role attribute.
      it("should set the submenu's role attribute", () => {
        expect(
          toggle.elements.controlledMenu.dom.menu.getAttribute("role")
        ).toBe("group");
      });

      // Test the submenu toggle's aria-expanded attribute.
      it("should set the submenu toggle's aria-expanded attribute", () => {
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
      });

      // Test the submenu toggle's aria-owns attribute.
      it("should set the submenu toggle's aria-owns attribute", () => {
        expect(toggle.dom.controller.getAttribute("aria-owns")).toBe(
          toggle.elements.controlledMenu.dom.menu.id
        );
      });

      // Test the submenu toggle's aria-expanded attribute when the menu is expand.
      it("should set the submenu toggle's aria-expanded attribute when the menu is open", () => {
        toggle.expand();

        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "true"
        );
      });

      // Test the submenu toggle's aria-expanded attribute when the menu is closed.
      it("should set the submenu toggle's aria-expanded attribute when the menu is closed", () => {
        toggle.expand();

        toggle.collapse();

        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
      });

      // Test each submenu item for aria compliance.
      describe.each(
        Array.from(element.querySelector("ul").children).map((_, index) => ({
          index,
        }))
      )("Submenu item $index", ({ index }) => {
        let item;

        beforeEach(() => {
          item = toggle.elements.controlledMenu.elements.menuItems[index];
        });

        // Test the submenu item's role attribute.
        it("should set the submenu item's role attribute", () => {
          expect(item.dom.item.getAttribute("role")).toBe("none");
        });

        // Test the submenu item's link's role attribute.
        it("should set the submenu item's link's role attribute", () => {
          expect(item.dom.link.getAttribute("role")).toBe("treeitem");
        });

        // Test the submenu item's link's tabindex attribute.
        it("should set the submenu item's link's tabindex attribute", () => {
          expect(item.dom.link.getAttribute("tabindex")).toBe("-1");
        });
      });
    }
  );
});
