/**
 * Getter/Setter tests for the Treeview class
 */

import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import Treeview from "../../../src/treeview.js";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the Treeview class.
describe("Treeview getter/setters", () => {
  // Test Treeview dom.
  describe("dom", () => {
    // Test that Treeview implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "dom");
    });

    // Test that Treeview implements the BaseMenu dom setter.
    it("should implement the BaseMenu dom setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "dom");
    });
  });

  // Test Treeview selectors.
  describe("selectors", () => {
    // Test that Treeview implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });

    // Test that Treeview implements the BaseMenu selectors setter.
    it("should implement the BaseMenu selectors setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "selectors"
      );
    });
  });

  // Test Treeview elements.
  describe("elements", () => {
    // Test that Treeview implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "elements");
    });

    // Test that Treeview implements the BaseMenu elements setter.
    it("should implement the BaseMenu elements setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "elements");
    });
  });

  // Test Treeview classes.
  describe("classes", () => {
    // Test that Treeview implements the BaseMenu classes getter.
    it("should implement the BaseMenu classes getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "classes");
    });

    // Test that Treeview implements the BaseMenu classes setter.
    it("should implement the BaseMenu classes setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "classes");
    });
  });

  // Test Treeview durations.
  describe("durations", () => {
    // Test that Treeview implements the BaseMenu durations getter.
    it("should implement the BaseMenu durations getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });

    // Test that Treeview implements the BaseMenu durations setter.
    it("should implement the BaseMenu durations setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "durations"
      );
    });
  });

  // Test Treeview listeners.
  describe("listeners", () => {
    // Test that Treeview implements the BaseMenu listeners getter.
    it("should implement the BaseMenu listeners getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });

    // Test that Treeview implements the BaseMenu listeners setter.
    it("should implement the BaseMenu listeners setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "listeners"
      );
    });
  });

  // Test Treeview isTopLevel.
  describe("isTopLevel", () => {
    // Test that Treeview implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });

    // Test that Treeview implements the BaseMenu isTopLevel setter.
    it("should implement the BaseMenu isTopLevel setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });
  });

  // Test Treeview breakpoint.

  // Test Treeview mediaQuery.

  // Test BaseMenu expandClass.
  describe("expandClass", () => {
    // Test that Treeview implements the BaseMenu expandClass getter.
    it("should implement the BaseMenu expandClass getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "expandClass"
      );
    });

    // Test that Treeview implements the BaseMenu expandClass setter.
    it("should implement the BaseMenu expandClass setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "expandClass"
      );
    });
  });

  // Test Treeview collapseClass.
  describe("collapseClass", () => {
    // Test that Treeview implements the BaseMenu collapseClass getter.
    it("should implement the BaseMenu collapseClass getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "collapseClass"
      );
    });

    // Test that Treeview implements the BaseMenu collapseClass setter.
    it("should implement the BaseMenu collapseClass setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "collapseClass"
      );
    });
  });

  // Test Treeview transitionClass.
  describe("transitionClass", () => {
    // Test that Treeview implements the BaseMenu transitionClass getter.
    it("should implement the BaseMenu transitionClass getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });

    // Test that Treeview implements the BaseMenu transitionClass setter.
    it("should implement the BaseMenu transitionClass setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });
  });

  // Test Treeview transitionDuration.
  describe("transitionDuration", () => {
    // Test that Treeview implements the BaseMenu transitionDuration getter.
    it("should implement the BaseMenu transitionDuration getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });

    // Test that Treeview implements the BaseMenu transitionDuration setter.
    it("should implement the BaseMenu transitionDuration setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });
  });

  // Test Treeview expandDuration.
  describe("expandDuration", () => {
    // Test that Treeview implements the BaseMenu expandDuration getter.
    it("should implement the BaseMenu expandDuration getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "expandDuration"
      );
    });

    // Test that Treeview implements the BaseMenu expandDuration setter.
    it("should implement the BaseMenu expandDuration setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "expandDuration"
      );
    });
  });

  // Test Treeview collapseDuration.
  describe("collapseDuration", () => {
    // Test that Treeview implements the BaseMenu collapseDuration getter.
    it("should implement the BaseMenu collapseDuration getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "collapseDuration"
      );
    });

    // Test that Treeview implements the BaseMenu collapseDuration setter.
    it("should implement the BaseMenu collapseDuration setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "collapseDuration"
      );
    });
  });

  // Test Treeview currentChild.
  describe("currentChild", () => {
    // Test that Treeview implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });

    // Test that Treeview implements the BaseMenu currentChild setter.
    it("should implement the BaseMenu currentChild setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });
  });

  // Test Treeview focusState.
  describe("focusState", () => {
    // Test that Treeview implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });

    // Test that Treeview implements the BaseMenu focusState setter.
    it("should implement the BaseMenu focusState setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });
  });

  // Test Treeview currentEvent.
  describe("currentEvent", () => {
    // Test that Treeview implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });

    // Test that Treeview implements the BaseMenu currentEvent setter.
    it("should implement the BaseMenu currentEvent setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });
  });

  // Test Treeview currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that Treeview implements the BaseMenu currentMenuItem getter.
    it("should implement the BaseMenu currentMenuItem getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });

    // Test that Treeview implements the BaseMenu currentMenuItem setter.
    it("should implement the BaseMenu currentMenuItem setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });
  });

  // Test Treeview hoverType.
  describe("hoverType", () => {
    // Test that Treeview implements the BaseMenu hoverType getter.
    it("should implement the BaseMenu hoverType getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });

    // Test that Treeview implements the BaseMenu hoverType setter.
    it("should implement the BaseMenu hoverType setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "hoverType"
      );
    });
  });

  // Test Treeview hoverDelay.
  describe("hoverDelay", () => {
    // Test that Treeview implements the BaseMenu hoverDelay getter.
    it("should implement the BaseMenu hoverDelay getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });

    // Test that Treeview implements the BaseMenu hoverDelay setter.
    it("should implement the BaseMenu hoverDelay setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });
  });

  // Test Treeview enterDelay.
  describe("enterDelay", () => {
    // Test that Treeview implements the BaseMenu enterDelay getter.
    it("should implement the BaseMenu enterDelay getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });

    // Test that Treeview implements the BaseMenu enterDelay setter.
    it("should implement the BaseMenu enterDelay setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });
  });

  // Test Treeview leaveDelay.
  describe("leaveDelay", () => {
    // Test that Treeview implements the BaseMenu leaveDelay getter.
    it("should implement the BaseMenu leaveDelay getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });

    // Test that Treeview implements the BaseMenu leaveDelay setter.
    it("should implement the BaseMenu leaveDelay setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });
  });

  // Test Treeview prefix.
  describe("prefix", () => {
    // Test that Treeview implements the BaseMenu prefix getter.
    it("should implement the BaseMenu prefix getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "prefix");
    });

    // Test that Treeview implements the BaseMenu prefix setter.
    it("should implement the BaseMenu prefix setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "prefix");
    });
  });

  // Test Treeview key.
  describe("key", () => {
    // Test that Treeview implements the BaseMenu key getter.
    it("should implement the BaseMenu key getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "key");
    });

    // Test that Treeview implements the BaseMenu key setter.
    it("should implement the BaseMenu key setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "key");
    });
  });

  // Test Treeview id.
  describe("id", () => {
    // Test that Treeview implements the BaseMenu id getter.
    it("should implement the BaseMenu id getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "id");
    });

    // Test that Treeview implements the BaseMenu id setter.
    it("should implement the BaseMenu id setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "id");
    });
  });

  // Test Treeview shouldFocus.
  describe("shouldFocus", () => {
    // Test that Treeview implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus getter", () => {
      expectInheritedGetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });

    // Test that Treeview implements the BaseMenu shouldFocus setter.
    it("should implement the BaseMenu shouldFocus setter", () => {
      expectInheritedSetter(
        Treeview.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });
  });

  // Test Treeview errors.
  describe("errors", () => {
    // Test that Treeview implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors getter", () => {
      expectInheritedGetter(Treeview.prototype, BaseMenu.prototype, "errors");
    });

    // Test that Treeview implements the BaseMenu errors setter.
    it("should implement the BaseMenu errors setter", () => {
      expectInheritedSetter(Treeview.prototype, BaseMenu.prototype, "errors");
    });
  });

  describe("initializeClass", () => {
    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should forward the initialization class to Core", () => {
        const menu = new Treeview({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
          initializeClass: "audit-initializing",
          initialize: false,
        });

        expect(menu.initializeClass).toBe("audit-initializing");
      });
    });
  });
});
