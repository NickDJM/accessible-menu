/**
 * Field configuration tests for BaseMenu.
 */

import { describe, it, expect } from "vitest";
import Component from "@accessible-ecosystem/core";
import BaseMenu from "../../../src/_baseMenu.js";

const createInstance = (options = {}) => {
  return new BaseMenu({
    menuElement: document.createElement("ul"),
    ...options,
  });
};

describe("BaseMenu fields", () => {
  describe("Component inheritance", () => {
    it("should inherit from Core Component", () => {
      const instance = createInstance();

      expect(instance).toBeInstanceOf(Component);
    });
  });
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = createInstance();

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });
  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = createInstance();

      expect(instance._name).toEqual("Menu");
    });
  });
  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = createInstance();

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });

    it("should register initialization with the accessibleMenu prefix", () => {
      const instance = createInstance();

      expect(instance.getEventName("initialize")).toBe(
        "accessibleMenuInitialize"
      );
    });
  });
  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = createInstance();

      expect(instance._storageKey).toEqual("menus");
    });
  });
  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = createInstance();

      expect(instance._rootDOMElement).toEqual("menu");
    });
  });
  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = createInstance();

      expect(instance._protectedDOMElements).toEqual([
        "menu",
        "controller",
        "container",
      ]);
    });
  });

  describe("rootDOMElement", () => {
    it("should resolve the configured DOM slot through the inherited getter", () => {
      const instance = createInstance();

      expect(instance.rootDOMElement).toBe(
        instance.dom[instance._rootDOMElement]
      );
    });

    it("should remain read-only on the menu instance", () => {
      const instance = createInstance();

      expect(() => {
        instance.rootDOMElement = document.createElement("div");
      }).toThrow(TypeError);
    });
  });
  describe("_dom", () => {
    it("should configure all menu DOM slots", () => {
      const instance = createInstance();

      expect(Object.keys(instance.dom)).toEqual([
        "menu",
        "menuItems",
        "menuLinks",
        "submenuItems",
        "submenuToggles",
        "submenus",
        "controller",
        "container",
      ]);
    });
  });
  describe("_prefix", () => {
    it("should retain a custom prefix from the Core constructor", () => {
      const instance = createInstance({ prefix: "custom-" });

      expect(instance.prefix).toBe("custom-");
    });
  });
  describe("_key", () => {
    it("should retain a custom key from the Core constructor", () => {
      const instance = createInstance({ key: "custom-key" });

      expect(instance.key).toBe("custom-key");
    });
  });
  describe("_classes", () => {
    it("should retain the initialization class from Core", () => {
      const instance = createInstance({ initializeClass: ["one", "two"] });

      expect(instance.classes.initialize).toEqual(["one", "two"]);
    });
  });
  describe("_events", () => {
    it("should bootstrap the Core lifecycle events", () => {
      const instance = createInstance();

      expect(Object.keys(instance.events)).toEqual([
        "initialize",
        "preinitialize",
        "postinitialize",
        "validate",
        "prevalidate",
        "postvalidate",
      ]);
    });
  });
});
