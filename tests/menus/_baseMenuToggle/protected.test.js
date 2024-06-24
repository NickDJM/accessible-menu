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

  describe("_setIds", () => {
    // Test that _setIds sets the toggle's id attribute to a generated value when it doesn't have an existing id.
    it("should set the toggle's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("id");

      // Call _setIds.
      menuToggle._setIds();

      // Get the generated id.
      const generatedId = menuToggle.dom.toggle.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu-button{- optional menu toggle's inner text}-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu-button(-.*)?-[a-z]{1,10}$/);
    });

    // Test that _setIds does not change the toggle's id attribute when it already has an id.
    it("should not change the toggle's id attribute when it already has an id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.setAttribute("id", "test-id");

      // Call _setIds.
      menuToggle._setIds();

      // Test the toggle's id.
      expect(menuToggle.dom.toggle.getAttribute("id")).toBe("test-id");
    });

    // Test that _setIds sets the toggle's parent's id attribute to a generated value when it doesn't have an existing id.
    it("should set the toggle's parent's id attribute to a generated value when it doesn't have an existing id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.elements.controlledMenu.dom.menu.removeAttribute("id");

      // Call _setIds.
      menuToggle._setIds();

      // Get the generated id.
      const generatedId =
        menuToggle.elements.controlledMenu.dom.menu.getAttribute("id");

      // Test the generated id.
      // The pattern for the generated id is "menu{- optional menu toggle's inner text}-{a string 1-10 characters long}".
      expect(generatedId).toMatch(/^menu(-.*)?-[a-z]{1,10}$/);
    });

    // Test that _setIds does not change the toggle's parent's id attribute when it already has an id.
    it("should not change the toggle's parent's id attribute when it already has an id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.elements.controlledMenu.dom.menu.setAttribute("id", "test-id");

      // Call _setIds.
      menuToggle._setIds();

      // Test the toggle's parent's id.
      expect(
        menuToggle.elements.controlledMenu.dom.menu.getAttribute("id")
      ).toBe("test-id");
    });
  });

  describe("_setAriaAttributes", () => {
    // Test that _setAriaAttributes sets the toggle's aria-haspopup attribute to true.
    it("should set the toggle's aria-haspopup attribute to true", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-haspopup");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-haspopup attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-haspopup")).toBe("true");
    });

    // Test that _setAriaAttributes sets the toggle's aria-expanded attribute to false.
    it("should set the toggle's aria-expanded attribute to false", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-expanded");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-expanded attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test that _setAriaAttributes sets the toggle's role attribute to button if the toggle is not a button.
    // @todo Make a test for when the toggle _is_ a button. This will require a new menu template.
    it("should set the toggle's role attribute to button if the toggle is not a button", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("role");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's role attribute.
      expect(menuToggle.dom.toggle.getAttribute("role")).toBe("button");
    });

    // Test that _setAriaAttributes sets the toggle's aria-controls attribute to the controlled menu's id.
    it("should set the toggle's aria-controls attribute to the controlled menu's id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("aria-controls");

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the toggle's aria-controls attribute.
      expect(menuToggle.dom.toggle.getAttribute("aria-controls")).toBe(
        menuToggle.elements.controlledMenu.dom.menu.id
      );
    });

    // Test that _setAriaAttributes sets the controlled menu's aria-labelledby attribute to the toggle's id.
    it("should set the controlled menu's aria-labelledby attribute to the toggle's id", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      initializeMenu(menu);

      const menuToggle = menu.elements.submenuToggles[0];
      menuToggle.dom.toggle.removeAttribute("id");
      menuToggle.elements.controlledMenu.dom.menu.removeAttribute(
        "aria-labelledby"
      );

      // Call _setAriaAttributes.
      menuToggle._setAriaAttributes();

      // Test the controlled menu's aria-labelledby attribute.
      expect(
        menuToggle.elements.controlledMenu.dom.menu.getAttribute(
          "aria-labelledby"
        )
      ).toBe(menuToggle.dom.toggle.id);
    });
  });
});
