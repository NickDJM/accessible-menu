/**
 * Tests for TopLinkDisclosureMenu's aria compliance.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";

// Read the demo markup to list the cases without creating a shared menu.
const markup = new DOMParser().parseFromString(
  twoLevelDisclosureTopLink,
  "text/html"
);
const menuItems = Array.from(markup.querySelector("ul").children);
const submenuItems = menuItems.filter((item) => item.querySelector("ul"));

let menu;

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosureTopLink;

  // Create a new TopLinkDisclosureMenu instance for testing.
  menu = new TopLinkDisclosureMenu({
    menuElement: document.querySelector("ul"),
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("button"),
  });
});

afterEach(() => {
  menu.dispose();
  document.body.innerHTML = "";
});

describe("TopLinkDisclosureMenu", () => {
  // Test the root menu's aria-labelledby attribute.
  it("should set the root menu's aria-labelledby attribute", () => {
    expect(menu.dom.menu.getAttribute("aria-labelledby")).toBe(
      menu.dom.controller.id
    );
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

  // Test each submenu for aria compliance.
  describe.each(submenuItems.map((_, index) => ({ index })))(
    "Submenu $index",
    ({ index }) => {
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

      // Test the submenu toggle's aria-expanded attribute.
      it("should set the submenu toggle's aria-expanded attribute", () => {
        expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe(
          "false"
        );
      });

      // Test the submenu toggle's aria-controls attribute.
      it("should set the submenu toggle's aria-controls attribute", () => {
        expect(toggle.dom.controller.getAttribute("aria-controls")).toBe(
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
    }
  );
});
