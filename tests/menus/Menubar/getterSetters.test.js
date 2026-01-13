/**
 * Getter/Setter tests for the Menubar class
 */

import { describe, it, beforeEach, afterEach } from "vitest";
import Menubar from "../../../src/menubar.js";
import { twoLevel } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the Menubar class.
describe("Menubar getter/setters", () => {
  // Test Menubar dom.
  describe("dom", () => {
    // Test that Menubar implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "dom");
    });

    // Test that Menubar implements the BaseMenu dom setter.
    it("should implement the BaseMenu dom setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "dom");
    });
  });

  // Test Menubar selectors.
  describe("selectors", () => {
    // Test that Menubar implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "selectors");
    });

    // Test that Menubar implements the BaseMenu selectors setter.
    it("should implement the BaseMenu selectors setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "selectors");
    });
  });

  // Test Menubar elements.
  describe("elements", () => {
    // Test that Menubar implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "elements");
    });

    // Test that Menubar implements the BaseMenu elements setter.
    it("should implement the BaseMenu elements setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "elements");
    });
  });

  // Test Menubar classes.
  describe("classes", () => {
    // Test that Menubar implements the BaseMenu classes getter.
    it("should implement the BaseMenu classes getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "classes");
    });

    // Test that Menubar implements the BaseMenu classes setter.
    it("should implement the BaseMenu classes setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "classes");
    });
  });

  // Test Menubar durations.
  describe("durations", () => {
    // Test that Menubar implements the BaseMenu durations getter.
    it("should implement the BaseMenu durations getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "durations");
    });

    // Test that Menubar implements the BaseMenu durations setter.
    it("should implement the BaseMenu durations setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "durations");
    });
  });

  // Test Menubar listeners.
  describe("listeners", () => {
    // Test that Menubar implements the BaseMenu listeners getter.
    it("should implement the BaseMenu listeners getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "listeners");
    });

    // Test that Menubar implements the BaseMenu listeners setter.
    it("should implement the BaseMenu listeners setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "listeners");
    });
  });

  // Test Menubar isTopLevel.
  describe("isTopLevel", () => {
    // Test that Menubar implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });

    // Test that Menubar implements the BaseMenu isTopLevel setter.
    it("should implement the BaseMenu isTopLevel setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "isTopLevel"
      );
    });
  });

  // Test BaseMenu openClass.
  describe("openClass", () => {
    // Test that Menubar implements the BaseMenu openClass getter.
    it("should implement the BaseMenu openClass getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "openClass");
    });

    // Test that Menubar implements the BaseMenu openClass setter.
    it("should implement the BaseMenu openClass setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "openClass");
    });
  });

  // Test Menubar closeClass.
  describe("closeClass", () => {
    // Test that Menubar implements the BaseMenu closeClass getter.
    it("should implement the BaseMenu closeClass getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "closeClass"
      );
    });

    // Test that Menubar implements the BaseMenu closeClass setter.
    it("should implement the BaseMenu closeClass setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "closeClass"
      );
    });
  });

  // Test Menubar transitionClass.
  describe("transitionClass", () => {
    // Test that Menubar implements the BaseMenu transitionClass getter.
    it("should implement the BaseMenu transitionClass getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });

    // Test that Menubar implements the BaseMenu transitionClass setter.
    it("should implement the BaseMenu transitionClass setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "transitionClass"
      );
    });
  });

  // Test Menubar transitionDuration.
  describe("transitionDuration", () => {
    // Test that Menubar implements the BaseMenu transitionDuration getter.
    it("should implement the BaseMenu transitionDuration getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });

    // Test that Menubar implements the BaseMenu transitionDuration setter.
    it("should implement the BaseMenu transitionDuration setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "transitionDuration"
      );
    });
  });

  // Test Menubar openDuration.
  describe("openDuration", () => {
    // Test that Menubar implements the BaseMenu openDuration getter.
    it("should implement the BaseMenu openDuration getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "openDuration"
      );
    });

    // Test that Menubar implements the BaseMenu openDuration setter.
    it("should implement the BaseMenu openDuration setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "openDuration"
      );
    });
  });

  // Test Menubar closeDuration.
  describe("closeDuration", () => {
    // Test that Menubar implements the BaseMenu closeDuration getter.
    it("should implement the BaseMenu closeDuration getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "closeDuration"
      );
    });

    // Test that Menubar implements the BaseMenu closeDuration setter.
    it("should implement the BaseMenu closeDuration setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "closeDuration"
      );
    });
  });

  // Test Menubar currentChild.
  describe("currentChild", () => {
    // Test that Menubar implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });

    // Test that Menubar implements the BaseMenu currentChild setter.
    it("should implement the BaseMenu currentChild setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentChild"
      );
    });
  });

  // Test Menubar focusState.
  describe("focusState", () => {
    // Test that Menubar implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });

    // Test that Menubar implements the BaseMenu focusState setter.
    it("should implement the BaseMenu focusState setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "focusState"
      );
    });
  });

  // Test Menubar currentEvent.
  describe("currentEvent", () => {
    // Test that Menubar implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });

    // Test that Menubar implements the BaseMenu currentEvent setter.
    it("should implement the BaseMenu currentEvent setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentEvent"
      );
    });
  });

  // Test Menubar currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that Menubar implements the BaseMenu currentMenuItem getter.
    it("should implement the BaseMenu currentMenuItem getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });

    // Test that Menubar implements the BaseMenu currentMenuItem setter.
    it("should implement the BaseMenu currentMenuItem setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "currentMenuItem"
      );
    });
  });

  // Test Menubar hoverType.
  describe("hoverType", () => {
    // Test that Menubar implements the BaseMenu hoverType getter.
    it("should implement the BaseMenu hoverType getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "hoverType");
    });

    // Test that Menubar implements the BaseMenu hoverType setter.
    it("should implement the BaseMenu hoverType setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "hoverType");
    });
  });

  // Test Menubar hoverDelay.
  describe("hoverDelay", () => {
    // Test that Menubar implements the BaseMenu hoverDelay getter.
    it("should implement the BaseMenu hoverDelay getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });

    // Test that Menubar implements the BaseMenu hoverDelay setter.
    it("should implement the BaseMenu hoverDelay setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "hoverDelay"
      );
    });
  });

  // Test Menubar enterDelay.
  describe("enterDelay", () => {
    // Test that Menubar implements the BaseMenu enterDelay getter.
    it("should implement the BaseMenu enterDelay getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });

    // Test that Menubar implements the BaseMenu enterDelay setter.
    it("should implement the BaseMenu enterDelay setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "enterDelay"
      );
    });
  });

  // Test Menubar leaveDelay.
  describe("leaveDelay", () => {
    // Test that Menubar implements the BaseMenu leaveDelay getter.
    it("should implement the BaseMenu leaveDelay getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });

    // Test that Menubar implements the BaseMenu leaveDelay setter.
    it("should implement the BaseMenu leaveDelay setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "leaveDelay"
      );
    });
  });

  // Test Menubar prefix.
  describe("prefix", () => {
    // Test that Menubar implements the BaseMenu prefix getter.
    it("should implement the BaseMenu prefix getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "prefix");
    });

    // Test that Menubar implements the BaseMenu prefix setter.
    it("should implement the BaseMenu prefix setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "prefix");
    });
  });

  // Test Menubar key.
  describe("key", () => {
    // Test that Menubar implements the BaseMenu key getter.
    it("should implement the BaseMenu key getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "key");
    });

    // Test that Menubar implements the BaseMenu key setter.
    it("should implement the BaseMenu key setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "key");
    });
  });

  // Test Menubar id.
  describe("id", () => {
    // Test that Menubar implements the BaseMenu id getter.
    it("should implement the BaseMenu id getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "id");
    });

    // Test that Menubar implements the BaseMenu id setter.
    it("should implement the BaseMenu id setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "id");
    });
  });

  // Test Menubar shouldFocus.
  describe("shouldFocus", () => {
    // Test that Menubar implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus getter", () => {
      expectInheritedGetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });

    // Test that Menubar implements the BaseMenu shouldFocus setter.
    it("should implement the BaseMenu shouldFocus setter", () => {
      expectInheritedSetter(
        Menubar.prototype,
        BaseMenu.prototype,
        "shouldFocus"
      );
    });
  });

  // Test Menubar errors.
  describe("errors", () => {
    // Test that Menubar implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors getter", () => {
      expectInheritedGetter(Menubar.prototype, BaseMenu.prototype, "errors");
    });

    // Test that Menubar implements the BaseMenu errors setter.
    it("should implement the BaseMenu errors setter", () => {
      expectInheritedSetter(Menubar.prototype, BaseMenu.prototype, "errors");
    });
  });
});
