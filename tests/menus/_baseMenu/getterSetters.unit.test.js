/**
 * Getter/Setter tests for the BaseMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  twoLevel,
  threeLevel,
  twoLevelDisclosureTopLink,
} from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// Test all getter methods in the BaseMenu class.
describe("BaseMenu getter/setters", () => {
  // Test BaseMenu setter validation.
  describe.each([
    ["expandClass", "custom-expand", "invalid class"],
    ["collapseClass", "custom-collapse", "invalid class"],
    ["transitionClass", "custom-transition", "invalid class"],
    ["transitionDuration", 100, "invalid"],
    ["expandDuration", 150, "invalid"],
    ["collapseDuration", 175, "invalid"],
    ["currentChild", 1, "invalid"],
    ["focusState", "self", "invalid"],
    ["currentEvent", "keyboard", "invalid"],
    ["hoverType", "on", "invalid"],
    ["hoverDelay", 100, "invalid"],
    ["enterDelay", 100, "invalid"],
    ["leaveDelay", 100, "invalid"],
  ])("%s validation", (property, value, invalid) => {
    // Test that the setter rejects invalid values.
    it("should throw when an invalid value is assigned", () => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        transitionClass: "",
      });
      menu.initialize();
      menu[property] = value;

      expect(() => {
        menu[property] = invalid;
      }).toThrow(TypeError);
    });

    // Test that an invalid assignment leaves the existing value unchanged.
    it("should keep the existing value after an invalid assignment", () => {
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        transitionClass: "",
      });
      menu.initialize();
      menu[property] = value;

      try {
        menu[property] = invalid;
      } catch {
        // Ignore the expected validation error.
      }

      expect(menu[property]).toBe(value);
    });
  });

  // Test BaseMenu dom.
  describe("dom", () => {
    // Test that dom gets the DOM elements.
    it("should get the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.dom).toEqual(menu._dom);
    });

    // Test that dom cannot set the DOM elements.
    it("should not set the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.dom = {};
      }).toThrowError();
    });
  });

  // Test BaseMenu selectors.
  describe("selectors", () => {
    // Test that selectors gets the selectors.
    it("should get the selectors", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.selectors).toEqual(menu._selectors);
    });

    // Test that selectors cannot set the selectors.
    it("should not set the selectors", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.selectors = {};
      }).toThrowError();
    });
  });

  // Test BaseMenu elements.
  describe("elements", () => {
    // Test that elements gets the elements.
    it("should get the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.elements).toEqual(menu._elements);
    });

    // Test that elements cannot set the elements.
    it("should not set the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.elements = {};
      }).toThrowError();
    });
  });

  // Test BaseMenu classes.
  describe("classes", () => {
    // Test that classes gets the classes.
    it("should get the classes", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.classes).toEqual(menu._classes);
    });

    // Test that classes cannot set the classes.
    it("should not set the classes", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.classes = {};
      }).toThrowError();
    });
  });

  // Test BaseMenu durations.
  describe("durations", () => {
    // Test that durations gets the durations.
    it("should get the durations", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.durations).toEqual(menu._durations);
    });

    // Test that durations cannot set the durations.
    it("should not set the durations", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.durations = {};
      }).toThrowError();
    });

    describe("root menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });
      it.each(["expandDuration", "collapseDuration"])(
        "should inherit a changed root %s after initialization",
        (property) => {
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuTogglesSelector: "a",
          });
          menu.initialize();
          const child = menu.elements.submenuToggles[0].elements.controlledMenu;

          menu[property] = 431;

          expect(child[property]).toBe(431);
        }
      );

      it.each([
        ["transitionDuration", "--am-transition-duration"],
        ["expandDuration", "--am-expand-transition-duration"],
        ["collapseDuration", "--am-collapse-transition-duration"],
      ])(
        "should update descendant CSS when root %s changes",
        (property, cssProperty) => {
          const menu = new BaseMenu({
            menuElement: document.querySelector("ul"),
            submenuTogglesSelector: "a",
          });
          menu.initialize();
          const child = menu.elements.submenuToggles[0].elements.controlledMenu;

          menu[property] = 431;

          expect(child.dom.menu.style.getPropertyValue(cssProperty)).toBe(
            "431ms"
          );
        }
      );
    });
  });

  // Test BaseMenu listeners.
  describe("listeners", () => {
    // Test that listeners gets the listeners.
    it("should get the listeners", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.listeners).toEqual(menu._listeners);
    });

    // Test that listeners cannot set the listeners.
    it("should not set the listeners", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.listeners = {};
      }).toThrowError();
    });
  });

  // Test BaseMenu isTopLevel.
  describe("isTopLevel", () => {
    // Test that isTopLevel gets the top-level status.
    it("should get the top-level status", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.isTopLevel).toBe(menu._root);
    });

    // Test that isTopLevel cannot be set manually.
    it("should not set the top-level status", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.isTopLevel = false;
      }).toThrowError();
    });
  });

  // Test BaseMenu expandClass.
  describe("expandClass", () => {
    // Test that expandClass gets the expand class name.
    it("should get the open class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.expandClass).toBe(menu._classes.expand);
    });

    // Test that expandClass sets the expand class name.
    it("should set the open class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's expand class name.
      menu.expandClass = "test-open";

      expect(menu._classes.expand).toBe("test-open");
    });

    // Test that expandClass defaults to the root menu's expandClass for submenus.
    it("should default to the root menu's open class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.expandClass = "custom-open";

      expect(submenu.expandClass).toBe(menu.expandClass);
    });
  });

  // Test BaseMenu collapseClass.
  describe("collapseClass", () => {
    // Test that collapseClass gets the collapse class name.
    it("should get the close class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.collapseClass).toBe(menu._classes.collapse);
    });

    // Test that collapseClass sets the collapse class name.
    it("should set the close class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's collapse class name.
      menu.collapseClass = "test-close";

      expect(menu._classes.collapse).toBe("test-close");
    });

    // Test that collapseClass defaults to the root menu's collapseClass for submenus.
    it("should default to the root menu's close class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.collapseClass = "custom-close";

      expect(submenu.collapseClass).toBe(menu.collapseClass);
    });
  });

  // Test BaseMenu transitionClass.
  describe("transitionClass", () => {
    // Test that transitionClass gets the transition class name.
    it("should get the transition class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.transitionClass).toBe(menu._classes.transition);
    });

    // Test that transitionClass sets the transition class name.
    it("should set the transition class name", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's transition class name.
      menu.transitionClass = "test-transition";

      expect(menu._classes.transition).toBe("test-transition");
    });

    // Test that transitionClass defaults to the root menu's transitionClass for submenus.
    it("should default to the root menu's transition class for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.transitionClass = "custom-transition";

      expect(submenu.transitionClass).toBe(menu.transitionClass);
    });
  });

  // Test BaseMenu transitionDuration.
  describe("transitionDuration", () => {
    // Test that transitionDuration gets the transition duration value.
    it("should get the transition duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.transitionDuration).toBe(menu._durations.transition);
    });

    // Test that transitionDuration sets the transition duration value.
    it("should set the transition duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's transition duration value.
      menu.transitionDuration = 200;

      expect(menu._durations.transition).toBe(200);
    });

    // Test that transitionDuration defaults to the root menu's transitionDuration for submenus.
    it("should default to the root menu's transition duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.transitionDuration = 200;

      expect(submenu.transitionDuration).toBe(menu.transitionDuration);
    });
  });

  // Test BaseMenu expandDuration.
  describe("expandDuration", () => {
    // Test that expandDuration gets the expand duration value.
    it("should get the open duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // In this case, because we have not set the expand duration,
      // it should be the same as the transition duration.
      expect(menu.expandDuration).toBe(menu._durations.transition);
    });

    // Test that expandDuration sets the expand duration value.
    it("should set the open duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's expand duration value.
      menu.expandDuration = 100;

      expect(menu._durations.expand).toBe(100);
    });

    // Test that expandDuration defaults to the root menu's expandDuration for submenus.
    it("should default to the root menu's open duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.expandDuration = 100;

      expect(submenu.expandDuration).toBe(menu.expandDuration);
    });
  });

  // Test BaseMenu collapseDuration.
  describe("collapseDuration", () => {
    // Test that collapseDuration gets the collapse duration value.
    it("should get the close duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // In this case, because we have not set the collapse duration,
      // it should be the same as the transition duration.
      expect(menu.collapseDuration).toBe(menu._durations.transition);
    });

    // Test that collapseDuration sets the collapse duration value.
    it("should set the close duration value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's collapse duration value.
      menu.collapseDuration = 100;

      expect(menu._durations.collapse).toBe(100);
    });

    // Test that collapseDuration defaults to the root menu's collapseDuration for submenus.
    it("should default to the root menu's close duration for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.collapseDuration = 100;

      expect(submenu.collapseDuration).toBe(menu.collapseDuration);
    });
  });

  // Test BaseMenu currentChild.
  // todo: Test this for scenarios that would envoke setParentChild().
  describe("currentChild", () => {
    // Test that currentChild gets the current child index.
    it("should get the current child index", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.currentChild).toBe(menu._currentChild);
    });

    // Test that currentChild sets the current child index.
    it("should set the current child index", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's current child index.
      menu.currentChild = 2;

      expect(menu._currentChild).toBe(2);
    });
  });

  // Test BaseMenu focusState.
  describe("focusState", () => {
    // Test that focusState gets the focus state.
    it("should get the focus state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.focusState).toBe(menu._focusState);
    });

    // Test that focusState sets the focus state.
    it("should set the focus state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's focus state.
      menu.focusState = "child";

      expect(menu._focusState).toBe("child");
    });
  });

  // Test BaseMenu currentEvent.
  describe("currentEvent", () => {
    it.each(["none", "mouse", "keyboard", "character"])(
      "should inherit the root menu's value for %s events",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [child, grandchild];

        menu.currentEvent = currentEvent;

        for (const component of components) {
          expect(component.currentEvent).toBe(currentEvent);
        }
      }
    );

    it.each(["keyboard", "mouse", "character"])(
      "should update the root menu's value to %s",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [child, grandchild];

        for (const component of components) {
          menu.currentEvent = "none";

          component.currentEvent = currentEvent;

          expect(menu.currentEvent).toBe(currentEvent);
          for (const sibling of components) {
            expect(sibling.currentEvent).toBe(currentEvent);
          }
        }
      }
    );

    it("should reject an invalid event without changing the root menu's value", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionClass: "",
      });

      menu.initialize();
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const grandchild =
        child.elements.submenuToggles[0].elements.controlledMenu;
      const components = [child, grandchild];
      menu.currentEvent = "keyboard";

      for (const component of components) {
        expect(() => {
          component.currentEvent = "invalid";
        }).toThrow();

        expect(menu.currentEvent).toBe("keyboard");
        expect(component.currentEvent).toBe("keyboard");
      }
    });

    // Test that currentEvent gets the current event type.
    it("should get the current event type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.currentEvent).toBe(menu._currentEvent);
    });

    // Test that currentEvent sets the current event type.
    it("should set the current event type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's current event type.
      menu.currentEvent = "mouse";

      expect(menu._currentEvent).toBe("mouse");
    });

    it("should inherit the root menu's value when submenus are created", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        submenuItemsSelector: ".dropdown",
        submenuTogglesSelector: ".dropdown-toggle",
        submenusSelector: ".dropdown-menu",
      });
      menu.currentEvent = "keyboard";

      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;
      const nestedSubmenu =
        submenu.elements.submenuToggles[0].elements.controlledMenu;

      expect(submenu.currentEvent).toBe("keyboard");
      expect(nestedSubmenu.currentEvent).toBe("keyboard");
      expect(submenu.shouldFocus).toBe(menu.shouldFocus);
      expect(nestedSubmenu.shouldFocus).toBe(menu.shouldFocus);
    });
  });

  // Test BaseMenu currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that currentMenuItem gets the current menu item.
    it("should get the current menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.currentMenuItem).toBe(
        menu.elements.menuItems[menu.currentChild]
      );
    });

    // Test that currentMenuItem cannot be set manually.
    it("should not set the current menu item", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.currentMenuItem = menu.elements.menuItems[0];
      }).toThrowError();
    });
  });

  // Test BaseMenu hoverType.
  describe("hoverType", () => {
    // Test that hoverType gets the hover type.
    it("should get the hover type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.hoverType).toBe(menu._hoverType);
    });

    // Test that hoverType sets the hover type.
    it("should set the hover type", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's hover type.
      menu.hoverType = "on";

      expect(menu._hoverType).toBe("on");
    });

    // Test that hoverType defaults to the root menu's hoverType for submenus.
    it("should default to the root menu's hover type for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hoverType = "on";

      expect(submenu.hoverType).toBe(menu.hoverType);
    });
  });

  // Test BaseMenu hoverDelay.
  describe("hoverDelay", () => {
    // Test that hoverDelay gets the hover delay value.
    it("should get the hover delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.hoverDelay).toBe(menu._delays.hover);
    });

    // Test that hoverDelay sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's hover delay value.
      menu.hoverDelay = 200;

      expect(menu._delays.hover).toBe(200);
    });

    // Test that hoverDelay defaults to the root menu's hoverDelay for submenus.
    it("should default to the root menu's hover delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hoverDelay = 200;

      expect(submenu.hoverDelay).toBe(menu.hoverDelay);
    });
  });

  // Test BaseMenu enterDelay.
  describe("enterDelay", () => {
    // Test that enterDelay gets the enter delay value.
    it("should get the enter delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.enterDelay).toBe(menu._delays.hover);
    });

    // Test that enterDelay sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's enter delay value.
      menu.enterDelay = 100;

      expect(menu._delays.enter).toBe(100);
    });

    // Test that enterDelay defaults to the root menu's enterDelay for submenus.
    it("should default to the root menu's enter delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.enterDelay = 100;

      expect(submenu.enterDelay).toBe(menu.enterDelay);
    });
  });

  // Test BaseMenu leaveDelay.
  describe("leaveDelay", () => {
    // Test that leaveDelay gets the leave delay value.
    it("should get the leave delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.leaveDelay).toBe(menu._delays.hover);
    });

    // Test that leaveDelay sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      // Set up to check for validation.

      // Set the menu's leave delay value.
      menu.leaveDelay = 100;

      expect(menu._delays.leave).toBe(100);
    });

    // Test that leaveDelay defaults to the root menu's leaveDelay for submenus.
    it("should default to the root menu's leave delay for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.leaveDelay = 100;

      expect(submenu.leaveDelay).toBe(menu.leaveDelay);
    });
  });

  // Test BaseMenu breakpoint.

  // Test BaseMenu mediaQuery.

  // Test BaseMenu prefix.
  describe("prefix", () => {
    // Test that prefix gets the prefix value.
    it("should get the prefix value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.prefix).toBe(menu._prefix);
    });

    // Test that prefix sets the prefix value.
    it("should set the prefix value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      menu.prefix = "test-";

      expect(menu.prefix).toBe("test-");
    });

    // Test that prefix defaults to the root menu's prefix for submenus.
    it("should default to the root menu's prefix for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.prefix = "test-";

      expect(submenu.prefix).toBe(menu.prefix);
    });
  });

  // Test BaseMenu key.
  describe("key", () => {
    // Test that key gets the key value.
    it("should get the key value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.key).toBe(menu._key);
    });

    // Test that key cannot set the key value.
    it("should not set the key value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.key = "test";
      }).toThrowError();
    });

    // Test that key defaults to the root menu's key suffixed by the submenu's index for submenus.
    it("should default to the root menu's key with submenu's index for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu._key = "test";

      expect(submenu.key).toBe(`${menu.key}-0`);
    });
  });

  // Test BaseMenu id.
  describe("id", () => {
    // Test that id gets the id value.
    it("should get the id value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.id).toBe(menu._id);
    });

    // Test that id cannot set the id value.
    it("should not set the id value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.id = "test-menu";
      }).toThrowError();
    });
  });

  // Test BaseMenu shouldFocus.
  describe("shouldFocus", () => {
    it.each([
      { currentEvent: "none", hoverType: "off", expected: false },
      { currentEvent: "keyboard", hoverType: "off", expected: true },
      { currentEvent: "character", hoverType: "off", expected: true },
      { currentEvent: "mouse", hoverType: "off", expected: false },
      { currentEvent: "mouse", hoverType: "on", expected: false },
      { currentEvent: "mouse", hoverType: "dynamic", expected: false },
    ])(
      "should inherit the root menu's value for $currentEvent with hover $hoverType",
      ({ currentEvent, hoverType, expected }) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });
        menu.initialize();

        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [child, grandchild];
        menu.hoverType = hoverType;
        menu.currentEvent = currentEvent;

        expect(menu.shouldFocus).toBe(expected);
        for (const component of components) {
          expect(component.shouldFocus).toBe(expected);
        }
      }
    );

    it.each([true, false])(
      "should inherit the root menu's custom value of %s",
      (shouldFocus) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const grandchild =
          child.elements.submenuToggles[0].elements.controlledMenu;
        const components = [child, grandchild];
        vi.spyOn(menu, "shouldFocus", "get").mockReturnValue(shouldFocus);

        for (const component of components) {
          expect(component.shouldFocus).toBe(shouldFocus);
        }
      }
    );

    // Test that shouldFocus gets the shouldFocus value.
    it("should get the shouldFocus value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.shouldFocus).toBeFalsy();
    });

    // Test that shouldFocus cannot be set manually.
    it("should not set the shouldFocus value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.shouldFocus = true;
      }).toThrowError();
    });
  });

  // Test BaseMenu errors.
  describe("errors", () => {
    // Test that errors gets the errors array.
    it("should get the errors array", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.errors).toEqual(menu._errors);
    });

    // Test that errors cannot be set manually.
    it("should not set the errors array", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(() => {
        menu.errors = [];
      }).toThrowError();
    });
  });

  // Test BaseMenu hasExpanded.
  describe("hasExpanded", () => {
    // Test that hasExpanded gets the hasExpanded value.
    it("should get the hasExpanded value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      expect(menu.hasExpanded).toEqual(menu._hasExpanded);
    });

    // Test that hasExpanded sets the hasExpanded value.
    it("should set the hasExpanded value", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      menu.hasExpanded = true;

      expect(menu.hasExpanded).toBe(true);
    });

    // Test that hasExpanded defaults to the root menu's hasExpanded for submenus.
    it("should default to the root menu's hasExpanded for submenus", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      menu.initialize();

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.hasExpanded = true;

      expect(submenu.hasExpanded).toBe(menu.hasExpanded);
    });
  });

  describe("rootDOMElement", () => {
    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should resolve the configured DOM slot through the inherited getter", () => {
        const instance = new BaseMenu({
          menuElement: document.querySelector("ul"),
        });

        expect(instance.rootDOMElement).toBe(
          instance.dom[instance._rootDOMElement]
        );
      });

      it("should remain read-only on the menu instance", () => {
        const instance = new BaseMenu({
          menuElement: document.querySelector("ul"),
        });

        expect(() => {
          instance.rootDOMElement = document.querySelector("nav");
        }).toThrow(TypeError);
      });
    });
  });
});

describe("BaseMenu currentChild validation", () => {
  let menu;

  beforeEach(() => {
    menu = new BaseMenu({ menuElement: document.querySelector("ul") });
    menu.initialize();
  });

  afterEach(() => {
    menu.dispose();
  });

  it.each([0.5, -1.5, NaN, Infinity, -Infinity, "1", null, undefined])(
    "should reject %s without changing selection or the parent menu",
    (value) => {
      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;
      const previousChild = submenu.currentChild;
      submenu.currentEvent = "mouse";
      menu.currentChild = 0;

      const errorType = typeof value === "number" ? RangeError : TypeError;

      expect(() => {
        submenu.currentChild = value;
      }).toThrow(errorType);

      expect(submenu.currentChild).toBe(previousChild);
      expect(menu.currentChild).toBe(0);
    }
  );

  it.each([-100, -1, 0, 2, 100])(
    "should preserve integer clamping for %s",
    (value) => {
      const expected = Math.max(
        -1,
        Math.min(value, menu.elements.menuItems.length - 1)
      );

      menu.currentChild = value;

      expect(menu.currentChild).toBe(expected);
    }
  );

  it.each(["mouse", "character"])(
    "should synchronize the parent for %s even when the submenu index stays the same",
    (currentEvent) => {
      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;
      const previousChild = submenu.currentChild;
      submenu.currentEvent = currentEvent;
      menu.currentChild = 0;

      submenu.currentChild = previousChild;

      expect(submenu.currentChild).toBe(previousChild);
      expect(menu.currentChild).toBe(1);
    }
  );
});
