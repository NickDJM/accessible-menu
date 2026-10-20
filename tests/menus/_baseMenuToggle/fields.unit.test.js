/**
 * Field configuration tests for BaseMenuToggle.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("BaseMenuToggle fields", () => {
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });

  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance._name).toEqual("MenuToggle");
    });
  });

  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });
  });

  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance._storageKey).toEqual("menuToggles");
    });
  });

  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance._rootDOMElement).toEqual("controller");
    });
  });

  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
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
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance._shouldStore).toEqual(false);
    });
  });

  describe("_dom", () => {
    it("should populate the controller slot", () => {
      const toggle = document.querySelector("button");
      const instance = new BaseMenuToggle({
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
        menuToggleElement: toggle,
      });

      expect(instance.dom.controller).toBe(toggle);
    });
  });

  describe("Core DOM slots", () => {
    it("should use the menu element as the Core controlled element", () => {
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });

      expect(instance.dom.controlled).toBe(
        instance.elements.controlledMenu.dom.menu
      );
    });
  });

  describe("_elements", () => {
    it("should preserve the configured menu relationships", () => {
      const controlled = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      const parent = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      const instance = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
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
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
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
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });

        expect(instance.events[action].bubbles).toBe(true);
      }
    );

    it.each(["expand", "collapse"])(
      "should preserve detail.component for the %s event",
      (action) => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });

        expect(instance.events[action].detail.component).toBe(instance);
      }
    );

    it("should keep event registries specific to each toggle", () => {
      const first = new BaseMenuToggle({
        menuToggleElement: document.querySelector("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul"),
        }),
      });
      const second = new BaseMenuToggle({
        menuToggleElement: document.querySelector(".dropdown-toggle"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector("ul ul"),
        }),
      });

      expect(first.events.expand).not.toBe(second.events.expand);
      expect(first.events.expand.detail.component).toBe(first);
      expect(second.events.expand.detail.component).toBe(second);
    });
  });

  describe("_classes", () => {
    describe("uninitialized submenus", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure an uninitialized submenu without reading root-dependent getters", () => {
        const parent = new BaseMenu({
          menuElement: document.querySelector("ul"),
        });
        const submenu = new BaseMenu({
          menuElement: document.querySelector("ul ul"),
          isTopLevel: false,
          parentMenu: parent,
          expandClass: "submenu-open",
        });

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: submenu,
        });

        expect(toggle.expandClass).toBe("submenu-open");
      });
    });
  });
});
