/**
 * Tests for protected methods in the BaseMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { initializeMenu } from "../helpers.js";

vi.mock("../../../src/domHelpers.js");

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test BaseMenuToggle protected methods.
describe("BaseMenuToggle protected methods", () => {
  // Test BaseMenuToggle _expand().
  // todo: See if we can test the order in which the classes are added and removed.
  describe("_expand", () => {
    // Test that expand sets the aria-expanded attribute on the toggle to true.
    it("should set the aria-expanded attribute on the toggle to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Expand the menu.
      menuToggle._expand();

      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
    });

    // Test that expand emits accessibleMenuExpand event.
    it("should emit accessibleMenuExpand event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for the accessibleMenuExpand event.
      const spy = vi.spyOn(menuToggle.dom.toggle, "dispatchEvent");

      // Expand the menu.
      menuToggle._expand();

      expect(spy).toHaveBeenCalledWith(menuToggle._expandEvent);
    });

    // Test that expand does not emit accessibleMenuExpand event if false is passed as an argument.
    it("should not emit accessibleMenuExpand event if false is passed as an argument", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for the accessibleMenuExpand event.
      const spy = vi.spyOn(menuToggle.dom.toggle, "dispatchEvent");

      // Expand the menu.
      menuToggle._expand(false);

      expect(spy).not.toHaveBeenCalledWith(menuToggle._expandEvent);
    });

    // Test that expand removes the close class from the controlled menu.
    it("should remove the close class from the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "removeClass");

      // Expand the menu.
      menuToggle._expand();

      expect(spy).toHaveBeenCalledWith(
        menu.closeClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that expand adds the open class to the controlled menu.
    it("should add the open class to the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "addClass");

      // Expand the menu.
      menuToggle._expand();

      expect(spy).toHaveBeenCalledWith(
        menu.openClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that expand adds the transition class to the controlled menu.
    it("should add the transition class to the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "addClass");

      // Expand the menu.
      menuToggle._expand();

      expect(spy).toHaveBeenCalledWith(
        menu.transitionClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that expand removes the transition class from the controlled menu.
    it("should remove the transition class from the controlled menu after the transition is complete", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionDuration: 0,
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "removeClass");

      // Expand the menu.
      menuToggle._expand();

      expect(spy).toHaveBeenCalledWith(
        menu.transitionClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });
  });

  // Test BaseMenuToggle _collapse().
  // todo: See if we can test the order in which the classes are added and removed.
  describe("_collapse", () => {
    // Test that collapse sets the aria-expanded attribute on the toggle to false.
    it("should set the aria-expanded attribute on the toggle to false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up the menu.
      menuToggle.dom.toggle.setAttribute("aria-expanded", "true");

      // Collapse the menu.
      menuToggle._collapse();

      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test that collapse emits accessibleMenuCollapse event.
    it("should emit accessibleMenuCollapse event", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for the accessibleMenuCollapse event.
      const spy = vi.spyOn(menuToggle.dom.toggle, "dispatchEvent");

      // Collapse the menu.
      menuToggle._collapse();

      expect(spy).toHaveBeenCalledWith(menuToggle._collapseEvent);
    });

    // Test that collapse does not emit accessibleMenuCollapse event if false is passed as an argument.
    it("should not emit accessibleMenuCollapse event if false is passed as an argument", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      // Set up to check for the accessibleMenuCollapse event.
      const spy = vi.spyOn(menuToggle.dom.toggle, "dispatchEvent");

      // Collapse the menu.
      menuToggle._collapse(false);

      expect(spy).not.toHaveBeenCalledWith(menuToggle._collapseEvent);
    });

    // Test that collapse removes the open class from the controlled menu.
    it("should remove the open class from the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "removeClass");

      // Collapse the menu.
      menuToggle._collapse();

      expect(spy).toHaveBeenCalledWith(
        menu.openClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that collapse adds the close class to the controlled menu.
    it("should add the close class to the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "addClass");

      // Collapse the menu.
      menuToggle._collapse();

      expect(spy).toHaveBeenCalledWith(
        menu.closeClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that collapse adds the transition class to the controlled menu.
    it("should add the transition class to the controlled menu", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "addClass");

      // Collapse the menu.
      menuToggle._collapse();

      expect(spy).toHaveBeenCalledWith(
        menu.transitionClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });

    // Test that collapse removes the transition class from the controlled menu.
    it("should remove the transition class from the controlled menu after the transition is complete", async () => {
      // Mock removeClass.
      const domHelpers = await import("../../../src/domHelpers.js");
      domHelpers.removeClass = vi.fn();

      // Mock requestAnimationFrame.
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback();
        }
      );

      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: "li.dropdown",
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionDuration: 0,
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];

      const spy = vi.spyOn(domHelpers, "removeClass");

      // Collapse the menu.
      menuToggle._collapse();

      expect(spy).toHaveBeenCalledWith(
        menu.transitionClass,
        menuToggle.elements.controlledMenu.dom.menu
      );
    });
  });
});
