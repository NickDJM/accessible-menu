/**
 * Getter/Setter tests for the DisclosureMenu class
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevelDisclosure } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosure;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the DisclosureMenu class.
describe("DisclosureMenu getter/setters", () => {
  // Test DisclosureMenu dom.
  describe("dom", () => {
    // Test that DisclosureMenu implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "dom"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu dom setter.
    it("should implement the BaseMenu dom setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "dom"
      );
    });
  });

  // Test DisclosureMenu selectors.
  describe("selectors", () => {
    // Test that DisclosureMenu implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu selectors setter.
    it("should implement the BaseMenu selectors setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });
  });

  // Test DisclosureMenu elements.
  describe("elements", () => {
    // Test that DisclosureMenu implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "elements"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu elements setter.
    it("should implement the BaseMenu elements setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "elements"
      );
    });
  });

  // Test DisclosureMenu classes.
  describe("classes", () => {
    // Test that DisclosureMenu implements the BaseMenu classes getter.
    it("should implement the BaseMenu classes getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "classes"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu classes setter.
    it("should implement the BaseMenu classes setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "classes"
      );
    });
  });

  // Test DisclosureMenu durations.
  describe("durations", () => {
    // Test that DisclosureMenu implements the BaseMenu durations getter.
    it("should implement the BaseMenu durations getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu durations setter.
    it("should implement the BaseMenu durations setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });
  });

  // Test DisclosureMenu listeners.
  describe("listeners", () => {
    // Test that DisclosureMenu implements the BaseMenu listeners getter.
    it("should implement the BaseMenu listeners getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu listeners setter.
    it("should implement the BaseMenu listeners setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });
  });

  // Test DisclosureMenu isTopLevel.
  describe("isTopLevel", () => {
    // Test that DisclosureMenu implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu isTopLevel setter.
    it("should implement the BaseMenu isTopLevel setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });
  });

  // Test DisclosureMenu breakpoint.

  // Test DisclosureMenu mediaQuery.

  // Test BaseMenu expandClass.
  describe("expandClass", () => {
    // Test that DisclosureMenu implements the BaseMenu expandClass getter.
    it("should implement the BaseMenu expandClass getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "expandClass"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu expandClass setter.
    it("should implement the BaseMenu expandClass setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "expandClass"
      );
    });
  });

  // Test DisclosureMenu collapseClass.
  describe("collapseClass", () => {
    // Test that DisclosureMenu implements the BaseMenu collapseClass getter.
    it("should implement the BaseMenu collapseClass getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "collapseClass"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu collapseClass setter.
    it("should implement the BaseMenu collapseClass setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "collapseClass"
      );
    });
  });

  // Test DisclosureMenu transitionClass.
  describe("transitionClass", () => {
    // Test that DisclosureMenu implements the BaseMenu transitionClass getter.
    it("should implement the BaseMenu transitionClass getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu transitionClass setter.
    it("should implement the BaseMenu transitionClass setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });
  });

  // Test DisclosureMenu transitionDuration.
  describe("transitionDuration", () => {
    // Test that DisclosureMenu implements the BaseMenu transitionDuration getter.
    it("should implement the BaseMenu transitionDuration getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu transitionDuration setter.
    it("should implement the BaseMenu transitionDuration setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });
  });

  // Test DisclosureMenu expandDuration.
  describe("expandDuration", () => {
    // Test that DisclosureMenu implements the BaseMenu expandDuration getter.
    it("should implement the BaseMenu expandDuration getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "expandDuration"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu expandDuration setter.
    it("should implement the BaseMenu expandDuration setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "expandDuration"
      );
    });
  });

  // Test DisclosureMenu collapseDuration.
  describe("collapseDuration", () => {
    // Test that DisclosureMenu implements the BaseMenu collapseDuration getter.
    it("should implement the BaseMenu collapseDuration getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "collapseDuration"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu collapseDuration setter.
    it("should implement the BaseMenu collapseDuration setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "collapseDuration"
      );
    });
  });

  // Test DisclosureMenu currentChild.
  describe("currentChild", () => {
    // Test that DisclosureMenu implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu currentChild setter.
    it("should implement the BaseMenu currentChild setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });
  });

  // Test DisclosureMenu focusState.
  describe("focusState", () => {
    // Test that DisclosureMenu implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu focusState setter.
    it("should implement the BaseMenu focusState setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });
  });

  // Test DisclosureMenu currentEvent.
  describe("currentEvent", () => {
    // Test that DisclosureMenu implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu currentEvent setter.
    it("should implement the BaseMenu currentEvent setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });
  });

  // Test DisclosureMenu currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that DisclosureMenu implements the BaseMenu currentMenuItem getter.
    it("should implement the BaseMenu currentMenuItem getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu currentMenuItem setter.
    it("should implement the BaseMenu currentMenuItem setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });
  });

  // Test DisclosureMenu hoverType.
  describe("hoverType", () => {
    // Test that DisclosureMenu implements the BaseMenu hoverType getter.
    it("should implement the BaseMenu hoverType getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu hoverType setter.
    it("should implement the BaseMenu hoverType setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });
  });

  // Test DisclosureMenu hoverDelay.
  describe("hoverDelay", () => {
    // Test that DisclosureMenu implements the BaseMenu hoverDelay getter.
    it("should implement the BaseMenu hoverDelay getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu hoverDelay setter.
    it("should implement the BaseMenu hoverDelay setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });
  });

  // Test DisclosureMenu enterDelay.
  describe("enterDelay", () => {
    // Test that DisclosureMenu implements the BaseMenu enterDelay getter.
    it("should implement the BaseMenu enterDelay getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu enterDelay setter.
    it("should implement the BaseMenu enterDelay setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });
  });

  // Test DisclosureMenu leaveDelay.
  describe("leaveDelay", () => {
    // Test that DisclosureMenu implements the BaseMenu leaveDelay getter.
    it("should implement the BaseMenu leaveDelay getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu leaveDelay setter.
    it("should implement the BaseMenu leaveDelay setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });
  });

  // Test DisclosureMenu prefix.
  describe("prefix", () => {
    // Test that DisclosureMenu implements the BaseMenu prefix getter.
    it("should implement the BaseMenu prefix getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "prefix"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu prefix setter.
    it("should implement the BaseMenu prefix setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "prefix"
      );
    });
  });

  // Test DisclosureMenu key.
  describe("key", () => {
    // Test that DisclosureMenu implements the BaseMenu key getter.
    it("should implement the BaseMenu key getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "key"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu key setter.
    it("should implement the BaseMenu key setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "key"
      );
    });
  });

  // Test DisclosureMenu id.
  describe("id", () => {
    // Test that DisclosureMenu implements the BaseMenu id getter.
    it("should implement the BaseMenu id getter", () => {
      expectInheritedGetter(DisclosureMenu.prototype, BaseMenu.prototype, "id");
    });

    // Test that DisclosureMenu implements the BaseMenu id setter.
    it("should implement the BaseMenu id setter", () => {
      expectInheritedSetter(DisclosureMenu.prototype, BaseMenu.prototype, "id");
    });
  });

  // Test DisclosureMenu shouldFocus.
  describe("shouldFocus", () => {
    // Test that DisclosureMenu implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu shouldFocus setter.
    it("should implement the BaseMenu shouldFocus setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });
  });

  // Test DisclosureMenu errors.
  describe("errors", () => {
    // Test that DisclosureMenu implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors getter", () => {
      expectInheritedGetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "errors"
      );
    });

    // Test that DisclosureMenu implements the BaseMenu errors setter.
    it("should implement the BaseMenu errors setter", () => {
      expectInheritedSetter(
        DisclosureMenu.prototype,
        BaseMenu.prototype,
        "errors"
      );
    });
  });

  // Test DisclosureMenu optionalKeySupport.
  describe("optionalKeySupport", () => {
    // Test that optionalKeySupport gets the optional key support value.
    it("should get the optional key support value", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.optionalKeySupport).toEqual(menu._optionalSupport);
    });

    // Test that optionalKeySupport sets the optional key support value.
    it("should set the optional key support value", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.

      // Set the menu's optional key support value.
      menu.optionalKeySupport = true;

      expect(menu._optionalSupport).toBeTruthy();
    });

    // Test that optionalKeySupport defaults to the root menu's optionalKeySupport for submenus.
    it("should default to the root menu's optional key support for submenus", () => {
      // Create a new DisclosureMenu instance for testing.
      const menu = new DisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu.optionalKeySupport = true;

      expect(submenu.optionalKeySupport).toBe(menu.optionalKeySupport);
    });
  });
});
