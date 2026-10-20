/**
 * Field configuration tests for BaseMenuItem.
 */

import { describe, it, expect } from "vitest";
import Component from "@accessible-ecosystem/core";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import BaseMenu from "../../../src/_baseMenu.js";

describe("BaseMenuItem fields", () => {
  describe("Component inheritance", () => {
    it("should inherit from Core Component", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance).toBeInstanceOf(Component);
    });
  });
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });
  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._name).toEqual("MenuItem");
    });
  });
  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });

    it("should register initialization with the accessibleMenu prefix", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance.getEventName("initialize")).toBe(
        "accessibleMenuInitialize"
      );
    });
  });
  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._storageKey).toEqual("menuItems");
    });
  });
  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._rootDOMElement).toEqual("item");
    });
  });
  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._protectedDOMElements).toEqual(["item", "link"]);
    });
  });
  describe("_shouldStore", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance._shouldStore).toEqual(false);
    });
  });
  describe("rootDOMElement", () => {
    it("should resolve the configured DOM slot through the inherited getter", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(instance.rootDOMElement).toBe(
        instance.dom[instance._rootDOMElement]
      );
    });

    it("should remain read-only on the menu instance", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
      });

      expect(() => {
        instance.rootDOMElement = document.createElement("div");
      }).toThrow(TypeError);
    });
  });
  describe("_dom", () => {
    it("should populate the item and link slots", () => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const instance = new BaseMenuItem({
        parentMenu: new BaseMenu({ menuElement: document.createElement("ul") }),
        menuItemElement: item,
        menuLinkElement: link,
      });

      expect(instance.dom).toEqual({ item, link });
    });
  });
  describe("_elements", () => {
    it("should preserve the configured menu relationships", () => {
      const parent = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const child = new BaseMenu({ menuElement: document.createElement("ul") });
      const instance = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu: parent,
        childMenu: child,
      });

      expect(instance.elements).toMatchObject({
        parentMenu: parent,
        childMenu: child,
        toggle: null,
      });
    });
  });
});
