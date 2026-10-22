/**
 * Field configuration tests for BaseMenu.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("BaseMenu fields", () => {
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });

  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance._name).toEqual("Menu");
    });
  });

  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });

    it("should register initialization with the accessibleMenu prefix", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance.getEventName("initialize")).toBe(
        "accessibleMenuInitialize"
      );
    });
  });

  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance._storageKey).toEqual("menus");
    });
  });

  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance._rootDOMElement).toEqual("menu");
    });
  });

  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(instance._protectedDOMElements).toEqual([
        "menu",
        "controller",
        "container",
      ]);
    });
  });

  describe("_dom", () => {
    it("should configure all menu DOM slots", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(Object.keys(instance.dom)).toEqual([
        "menu",
        "menuItems",
        "menuLinks",
        "submenuItems",
        "submenuToggles",
        "submenuTriggers",
        "submenus",
        "controller",
        "container",
      ]);
    });
  });

  describe("_prefix", () => {
    it("should retain a custom prefix from the Core constructor", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
        prefix: "custom-",
      });

      expect(instance.prefix).toBe("custom-");
    });
  });

  describe("_key", () => {
    it("should retain a custom key from the Core constructor", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
        key: "custom-key",
      });

      expect(instance.key).toBe("custom-key");
    });
  });

  describe("_classes", () => {
    it("should retain the initialization class from Core", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
        initializeClass: ["one", "two"],
      });

      expect(instance.classes.initialize).toEqual(["one", "two"]);
    });
  });

  describe("_events", () => {
    it("should bootstrap the Core lifecycle events", () => {
      const instance = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });

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
