/**
 * Tests for the integration between menu toggles and Core collapsible state.
 */

import { describe, it, expect } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import { expectInheritedGetter } from "../helpers.js";

const createToggle = () => {
  const menu = new BaseMenu({
    menuElement: document.createElement("ul"),
    transitionClass: "",
  });

  return new BaseMenuToggle({
    menuToggleElement: document.createElement("button"),
    parentElement: document.createElement("li"),
    controlledMenu: menu,
  });
};

const options = { emit: false, transition: false };

describe("BaseMenuToggle Core integration", () => {
  describe("CollapsibleComponent inheritance", () => {
    it("should use CollapsibleComponent as the immediate superclass", () => {
      expect(Object.getPrototypeOf(BaseMenuToggle.prototype)).toBe(
        CollapsibleComponent.prototype
      );
    });

    it("should preserve the superclass on derived toggles", () => {
      expect(
        Object.prototype.isPrototypeOf.call(
          CollapsibleComponent.prototype,
          DisclosureMenuToggle.prototype
        )
      ).toBe(true);
    });

    it.each(["isExpanded", "shouldBeExpanded", "isLocked", "shouldBeLocked"])(
      "should inherit the %s getter",
      (property) => {
        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          CollapsibleComponent.prototype,
          property
        );
      }
    );
  });

  describe.each(["expand", "preview"])("%s", (action) => {
    it("should share the current expansion state with the Menu getter", () => {
      const toggle = createToggle();

      toggle[action](options);

      expect(toggle.isExpanded).toBe(true);
    });

    it("should share the committed expansion state with the Menu getter", () => {
      const toggle = createToggle();

      toggle[action](options);

      expect(toggle.shouldBeExpanded).toBe(true);
    });

    it("should preserve the shared committed state when requested", () => {
      const toggle = createToggle();

      toggle[action]({ ...options, preserveState: true });

      expect(toggle.isExpanded).toBe(true);
      expect(toggle.shouldBeExpanded).toBe(false);
      expect(toggle.shouldBeExpanded).toBe(false);
    });
  });

  describe.each(["collapse"])("%s", (action) => {
    it("should share the current collapsed state with the Menu getter", () => {
      const toggle = createToggle();
      toggle.expand(options);

      toggle[action](options);

      expect(toggle.isExpanded).toBe(false);
    });

    it("should preserve the shared committed state when requested", () => {
      const toggle = createToggle();
      toggle.expand(options);

      toggle[action]({ ...options, preserveState: true });

      expect(toggle.isExpanded).toBe(false);
      expect(toggle.shouldBeExpanded).toBe(true);
      expect(toggle.shouldBeExpanded).toBe(true);
    });
  });

  describe.each(["expand", "preview", "collapse"])(
    "%s while locked",
    (action) => {
      it("should block a menu state change while locked", () => {
        const toggle = createToggle();
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        const initial = toggle.isExpanded;
        toggle.lock();

        toggle[action](options);

        expect(toggle.isExpanded).toBe(initial);
      });

      it("should allow a forced menu state change while locked", () => {
        const toggle = createToggle();
        toggle.initialize();
        if (action === "collapse") toggle.expand(options);
        toggle.lock();

        toggle[action]({ ...options, force: true });

        expect(toggle.isExpanded).toBe(action !== "collapse");
      });
    }
  );

  describe("lock", () => {
    it("should disable the Menu toggle through the Core controller mapping", () => {
      const toggle = createToggle();

      toggle.lock();

      expect(toggle.dom.controller.disabled).toBe(true);
    });
  });

  describe("unlock", () => {
    it("should remove disabled from the Menu toggle through the Core controller mapping", () => {
      const toggle = createToggle();
      toggle.lock();

      toggle.unlock();

      expect(toggle.dom.controller.disabled).toBe(false);
    });
  });

  describe("constructor", () => {
    it("should configure an uninitialized submenu without reading root-dependent getters", () => {
      const parent = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const submenu = new BaseMenu({
        menuElement: document.createElement("ul"),
        isTopLevel: false,
        parentMenu: parent,
        expandClass: "submenu-open",
      });

      const toggle = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        parentElement: document.createElement("li"),
        controlledMenu: submenu,
      });

      expect(toggle.expandClass).toBe("submenu-open");
    });
  });
  describe("initialize", () => {
    it("should mark the toggle initialized", () => {
      const toggle = createToggle();

      toggle.initialize();

      expect(toggle.isInitialized).toBe(true);
    });

    it("should collapse without emitting action events", () => {
      const toggle = createToggle();
      const events = [];
      for (const action of ["precollapse", "collapse", "postcollapse"]) {
        toggle.dom.controller.addEventListener(
          toggle.getEventName(action),
          () => events.push(action)
        );
      }

      toggle.initialize();

      expect(events).toEqual([]);
    });
  });

  describe("live menu configuration", () => {
    it.each([
      ["expandClass", "expandClass", "changed-open"],
      ["collapseClass", "collapseClass", "changed-close"],
      ["transitionClass", "transitionClass", "changed-transition"],
      ["transitionDuration", "transitionDuration", 300],
      ["expandDuration", "expandDuration", 400],
      ["collapseDuration", "collapseDuration", 500],
    ])(
      "should read updated %s settings from the menu",
      (property, menuProperty, value) => {
        const toggle = createToggle();
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      }
    );

    it.each([
      ["expandClass", "expandClass", "changed-open"],
      ["collapseClass", "collapseClass", "changed-close"],
      ["transitionClass", "transitionClass", "changed-transition"],
      ["transitionDuration", "transitionDuration", 300],
      ["expandDuration", "expandDuration", 400],
      ["collapseDuration", "collapseDuration", 500],
    ])(
      "should update the menu through the %s setter",
      (property, menuProperty, value) => {
        const toggle = createToggle();

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      }
    );
  });
});
