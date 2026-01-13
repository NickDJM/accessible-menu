/**
 * Getter/Setter tests for the TopLinkDisclosureMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the TopLinkDisclosureMenu class.
describe("TopLinkDisclosureMenu getter/setters", () => {
  // Test TopLinkDisclosureMenu dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "dom"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu dom setter.
    it("should implement the BaseMenu dom setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "dom"
      );
    });
  });

  // Test TopLinkDisclosureMenu selectors.
  describe("selectors", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu selectors setter.
    it("should implement the BaseMenu selectors setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });
  });

  // Test TopLinkDisclosureMenu elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "elements"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu elements setter.
    it("should implement the BaseMenu elements setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "elements"
      );
    });
  });

  // Test TopLinkDisclosureMenu classes.
  describe("classes", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu classes getter.
    it("should implement the BaseMenu classes getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "classes"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu classes setter.
    it("should implement the BaseMenu classes setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "classes"
      );
    });
  });

  // Test TopLinkDisclosureMenu durations.
  describe("durations", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu durations getter.
    it("should implement the BaseMenu durations getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu durations setter.
    it("should implement the BaseMenu durations setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });
  });

  // Test TopLinkDisclosureMenu listeners.
  describe("listeners", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu listeners getter.
    it("should implement the BaseMenu listeners getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu listeners setter.
    it("should implement the BaseMenu listeners setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });
  });

  // Test TopLinkDisclosureMenu isTopLevel.
  describe("isTopLevel", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu isTopLevel setter.
    it("should implement the BaseMenu isTopLevel setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });
  });

  // Test TopLinkDisclosureMenu shouldOpen.
  describe("shouldOpen", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu shouldOpen getter.
    it("should implement the BaseMenu shouldOpen getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldOpen"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu shouldOpen setter.
    it("should implement the BaseMenu shouldOpen setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldOpen"
      );
    });
  });

  // Test TopLinkDisclosureMenu breakpoint.
  describe("breakpoint", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu breakpoint getter.
    it("should implement the BaseMenu breakpoint getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "breakpoint"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu breakpoint setter.
    it("should implement the BaseMenu breakpoint setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "breakpoint"
      );
    });
  });

  // Test TopLinkDisclosureMenu mediaQuery.
  describe("mediaQuery", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu mediaQuery getter.
    it("should implement the BaseMenu mediaQuery getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "mediaQuery"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu mediaQuery setter.
    it("should implement the BaseMenu mediaQuery setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "mediaQuery"
      );
    });
  });

  // Test BaseMenu openClass.
  describe("openClass", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu openClass getter.
    it("should implement the BaseMenu openClass getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "openClass"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu openClass setter.
    it("should implement the BaseMenu openClass setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "openClass"
      );
    });
  });

  // Test TopLinkDisclosureMenu closeClass.
  describe("closeClass", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu closeClass getter.
    it("should implement the BaseMenu closeClass getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "closeClass"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu closeClass setter.
    it("should implement the BaseMenu closeClass setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "closeClass"
      );
    });
  });

  // Test TopLinkDisclosureMenu transitionClass.
  describe("transitionClass", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu transitionClass getter.
    it("should implement the BaseMenu transitionClass getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu transitionClass setter.
    it("should implement the BaseMenu transitionClass setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });
  });

  // Test TopLinkDisclosureMenu transitionDuration.
  describe("transitionDuration", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu transitionDuration getter.
    it("should implement the BaseMenu transitionDuration getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu transitionDuration setter.
    it("should implement the BaseMenu transitionDuration setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });
  });

  // Test TopLinkDisclosureMenu openDuration.
  describe("openDuration", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu openDuration getter.
    it("should implement the BaseMenu openDuration getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "openDuration"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu openDuration setter.
    it("should implement the BaseMenu openDuration setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "openDuration"
      );
    });
  });

  // Test TopLinkDisclosureMenu closeDuration.
  describe("closeDuration", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu closeDuration getter.
    it("should implement the BaseMenu closeDuration getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "closeDuration"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu closeDuration setter.
    it("should implement the BaseMenu closeDuration setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "closeDuration"
      );
    });
  });

  // Test TopLinkDisclosureMenu currentChild.
  describe("currentChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu currentChild setter.
    it("should implement the BaseMenu currentChild setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });
  });

  // Test TopLinkDisclosureMenu focusState.
  describe("focusState", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu focusState setter.
    it("should implement the BaseMenu focusState setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });
  });

  // Test TopLinkDisclosureMenu currentEvent.
  describe("currentEvent", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu currentEvent setter.
    it("should implement the BaseMenu currentEvent setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });
  });

  // Test TopLinkDisclosureMenu currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu currentMenuItem getter.
    it("should implement the BaseMenu currentMenuItem getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu currentMenuItem setter.
    it("should implement the BaseMenu currentMenuItem setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });
  });

  // Test TopLinkDisclosureMenu hoverType.
  describe("hoverType", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu hoverType getter.
    it("should implement the BaseMenu hoverType getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu hoverType setter.
    it("should implement the BaseMenu hoverType setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });
  });

  // Test TopLinkDisclosureMenu hoverDelay.
  describe("hoverDelay", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu hoverDelay getter.
    it("should implement the BaseMenu hoverDelay getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu hoverDelay setter.
    it("should implement the BaseMenu hoverDelay setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });
  });

  // Test TopLinkDisclosureMenu enterDelay.
  describe("enterDelay", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu enterDelay getter.
    it("should implement the BaseMenu enterDelay getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu enterDelay setter.
    it("should implement the BaseMenu enterDelay setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });
  });

  // Test TopLinkDisclosureMenu leaveDelay.
  describe("leaveDelay", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu leaveDelay getter.
    it("should implement the BaseMenu leaveDelay getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu leaveDelay setter.
    it("should implement the BaseMenu leaveDelay setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });
  });

  // Test TopLinkDisclosureMenu prefix.
  describe("prefix", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu prefix getter.
    it("should implement the BaseMenu prefix getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "prefix"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu prefix setter.
    it("should implement the BaseMenu prefix setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "prefix"
      );
    });
  });

  // Test TopLinkDisclosureMenu key.
  describe("key", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu key getter.
    it("should implement the BaseMenu key getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "key"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu key setter.
    it("should implement the BaseMenu key setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "key"
      );
    });
  });

  // Test TopLinkDisclosureMenu id.
  describe("id", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu id getter.
    it("should implement the BaseMenu id getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "id"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu id setter.
    it("should implement the BaseMenu id setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "id"
      );
    });
  });

  // Test TopLinkDisclosureMenu shouldFocus.
  describe("shouldFocus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu shouldFocus setter.
    it("should implement the BaseMenu shouldFocus setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });
  });

  // Test TopLinkDisclosureMenu errors.
  describe("errors", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors getter", () => {
      expectInheritedGetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "errors"
      );
    });

    // Test that TopLinkDisclosureMenu implements the BaseMenu errors setter.
    it("should implement the BaseMenu errors setter", () => {
      expectInheritedSetter(
        TopLinkDisclosureMenu.prototype,
        BaseMenu.prototype,
        "errors"
      );
    });
  });

  // Test TopLinkDisclosureMenu optionalKeySupport.
  describe("optionalKeySupport", () => {
    // Test that optionalKeySupport gets the optional key support value.
    it("should get the optional key support value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.optionalKeySupport).toEqual(menu._optionalSupport);
    });

    // Test that optionalKeySupport sets the optional key support value.
    it("should set the optional key support value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's optional key support value.
      menu.optionalKeySupport = true;

      expect(spy).toHaveBeenCalledWith("boolean", { optionalKeySupport: true });
      expect(menu._optionalSupport).toBeTruthy();
    });

    // Test that optionalKeySupport defaults to the root menu's optionalKeySupport for submenus.
    it("should default to the root menu's optional key support for submenus", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      menu.optionalKeySupport = true;

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      expect(submenu.optionalKeySupport).toBe(menu.optionalKeySupport);
    });
  });
});
