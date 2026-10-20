/**
 * Field configuration tests for BaseMenuItem.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import BaseMenu from "../../../src/_baseMenu.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("BaseMenuItem fields", () => {
  describe("_scope", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._scope).toEqual("AccessibleMenu");
    });
  });

  describe("_name", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._name).toEqual("MenuItem");
    });
  });

  describe("_eventPrefix", () => {
    it("should use the accessibleMenu event prefix", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance.eventPrefix).toBe("accessibleMenu");
    });

    it("should register initialization with the accessibleMenu prefix", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance.getEventName("initialize")).toBe(
        "accessibleMenuInitialize"
      );
    });
  });

  describe("_storageKey", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._storageKey).toEqual("menuItems");
    });
  });

  describe("_rootDOMElement", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._rootDOMElement).toEqual("item");
    });
  });

  describe("_protectedDOMElements", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._protectedDOMElements).toEqual(["item", "link"]);
    });
  });

  describe("_shouldStore", () => {
    it("should use the menu-specific configuration", () => {
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
      });

      expect(instance._shouldStore).toEqual(false);
    });
  });

  describe("_dom", () => {
    it("should populate the item and link slots", () => {
      const item = document.querySelector(".dropdown");
      const link = document.querySelector(".dropdown > a");
      const instance = new BaseMenuItem({
        parentMenu: new BaseMenu({ menuElement: document.querySelector("ul") }),
        menuItemElement: item,
        menuLinkElement: link,
      });

      expect(instance.dom).toEqual({ item, link });
    });
  });

  describe("_elements", () => {
    it("should preserve the configured menu relationships", () => {
      const parent = new BaseMenu({
        menuElement: document.querySelector("ul"),
      });
      const child = new BaseMenu({
        menuElement: document.querySelector("ul ul"),
      });
      const instance = new BaseMenuItem({
        menuItemElement: document.querySelector(".dropdown"),
        menuLinkElement: document.querySelector(".dropdown > a"),
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
