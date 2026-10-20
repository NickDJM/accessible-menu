/**
 * Field configuration tests for BaseMenuToggle.
 */

import { describe, it, expect } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import BaseMenu from "../../../src/_baseMenu.js";

describe("BaseMenuToggle fields", () => {
  describe("CollapsibleComponent inheritance", () => {
    it("should inherit from Core CollapsibleComponent", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance).toBeInstanceOf(CollapsibleComponent);
    });
  });
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });
  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._name).toEqual("MenuToggle");
    });
  });
  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });
  });
  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._storageKey).toEqual("menuToggles");
    });
  });
  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._rootDOMElement).toEqual("controller");
    });
  });
  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._protectedDOMElements).toEqual([
        "controller",
        "controlled",
      ]);
    });
  });
  describe("_shouldStore", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance._shouldStore).toEqual(false);
    });
  });
  describe("rootDOMElement", () => {
    it("should resolve the configured DOM slot through the inherited getter", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance.rootDOMElement).toBe(
        instance.dom[instance._rootDOMElement]
      );
    });

    it("should remain read-only on the menu instance", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(() => {
        instance.rootDOMElement = document.createElement("div");
      }).toThrow(TypeError);
    });
  });
  describe("_dom", () => {
    it("should populate the controller slot", () => {
      const toggle = document.createElement("button");
      const instance = new BaseMenuToggle({
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
        menuToggleElement: toggle,
      });

      expect(instance.dom.controller).toBe(toggle);
    });
  });
  describe("Core DOM slots", () => {
    it("should use the menu element as the Core controlled element", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(instance.dom.controlled).toBe(
        instance.elements.controlledMenu.dom.menu
      );
    });
  });

  describe("Core transition configuration", () => {
    it.each([
      ["expandClass", "expandClass", "custom-open"],
      ["collapseClass", "collapseClass", "custom-close"],
      ["transitionClass", "transitionClass", "custom-transition"],
      ["transitionDuration", "transitionDuration", 300],
      ["expandDuration", "expandDuration", 400],
      ["collapseDuration", "collapseDuration", 500],
    ])(
      "should configure %s from the controlled menu",
      (property, option, value) => {
        const controlledMenu = new BaseMenu({
          menuElement: document.createElement("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.createElement("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      }
    );
  });

  describe("_elements", () => {
    it("should preserve the configured menu relationships", () => {
      const controlled = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const parent = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const instance = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: controlled,
        parentMenu: parent,
      });

      expect(instance.elements).toEqual({
        controlledMenu: controlled,
        parentMenu: parent,
      });
    });
  });
  describe("_events", () => {
    it.each(["expand", "collapse"])(
      "should preserve the accessibleMenu %s event name",
      (action) => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.createElement("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.createElement("ul"),
          }),
        });

        expect(instance.events[action].type).toBe(
          instance.getEventName(action)
        );
      }
    );

    it.each(["expand", "collapse"])(
      "should preserve bubbling for the %s event",
      (action) => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.createElement("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.createElement("ul"),
          }),
        });

        expect(instance.events[action].bubbles).toBe(true);
      }
    );

    it.each(["expand", "collapse"])(
      "should preserve detail.component for the %s event",
      (action) => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.createElement("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.createElement("ul"),
          }),
        });

        expect(instance.events[action].detail.component).toBe(instance);
      }
    );

    it("should keep event registries specific to each toggle", () => {
      const first = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });
      const second = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
        }),
      });

      expect(first.events.expand).not.toBe(second.events.expand);
      expect(first.events.expand.detail.component).toBe(first);
      expect(second.events.expand.detail.component).toBe(second);
    });
  });
});
