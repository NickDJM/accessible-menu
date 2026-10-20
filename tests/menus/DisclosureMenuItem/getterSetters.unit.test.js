/**
 * Getter/Setter tests for the DisclosureMenuItem class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenuItem from "../../../src/disclosureMenuItem.js";
import BaseMenuItem from "../../../src/_baseMenuItem.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevel, twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import Component from "@accessible-ecosystem/core";
import BaseMenu from "../../../src/_baseMenu.js";

// Test all getter/setter methods in the DisclosureMenuItem class.
describe("DisclosureMenuItem getter/setters", () => {
  // Test DisclosureMenuItem dom.
  describe("dom", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem dom getter.
    it("should implement the BaseMenuItem dom getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem dom setter.
    it("should implement the BaseMenuItem dom setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "dom"
      );
    });
  });

  // Test DisclosureMenuItem elements.
  describe("elements", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem elements getter.
    it("should implement the BaseMenuItem elements getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem elements setter.
    it("should implement the BaseMenuItem elements setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "elements"
      );
    });

    describe("submenu siblings", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
      });

      it("accepts a sibling from the shared base class", () => {
        const sibling = new BaseMenuItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown-toggle"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });
        const item = new DisclosureMenuItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
          initialize: false,
          submenuSibling: sibling,
        });

        item.initialize();

        expect(item.isInitialized).toBe(true);
        expect(item.elements.sibling).toBe(sibling);
      });

      it("initializes without a separate sibling by default", () => {
        const item = new DisclosureMenuItem({
          menuItemElement: document.querySelector(".dropdown"),
          menuLinkElement: document.querySelector(".dropdown > a"),
          parentMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
          initialize: false,
        });

        item.initialize();

        expect(item.isInitialized).toBe(true);
        expect(item.elements.sibling).toBe(null);
      });
    });
  });

  // Test DisclosureMenuItem isSubmenuItem.
  describe("isSubmenuItem", () => {
    // Test that DisclosureMenuItem implements the BaseMenuItem isSubmenuItem getter.
    it("should implement the BaseMenuItem isSubmenuItem getter", () => {
      expectInheritedGetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });

    // Test that DisclosureMenuItem implements the BaseMenuItem isSubmenuItem setter.
    it("should implement the BaseMenuItem isSubmenuItem setter", () => {
      expectInheritedSetter(
        DisclosureMenuItem.prototype,
        BaseMenuItem.prototype,
        "isSubmenuItem"
      );
    });
  });

  describe("id", () => {
    describe("DOM attributes", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should expose an existing menu-item DOM ID through Core", () => {
        document.querySelector("li").id = "existing-menu-item";
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });

        expect(menu.elements.menuItems[0].id).toBe("existing-menu-item");
      });
    });
  });

  describe("shouldFocus", () => {
    describe("parent menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevel;
      });

      afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = "";
      });

      it("should use the parent menu's focus permission", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        const item = menu.elements.menuItems[0];

        menu.currentEvent = "keyboard";

        expect(item.shouldFocus).toBe(true);
      });
    });
  });

  describe("rootDOMElement", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "rootDOMElement";

        expectInheritedGetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "rootDOMElement";

        expectInheritedSetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });
    });
  });

  describe("scope", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "scope";

        expectInheritedGetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "scope";

        expectInheritedSetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });
    });
  });

  describe("name", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "name";

        expectInheritedGetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "name";

        expectInheritedSetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });
    });
  });

  describe("eventPrefix", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "eventPrefix";

        expectInheritedGetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "eventPrefix";

        expectInheritedSetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });
    });
  });

  describe("isInitialized", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "isInitialized";

        expectInheritedGetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "isInitialized";

        expectInheritedSetter(
          DisclosureMenuItem.prototype,
          Component.prototype,
          property
        );
      });
    });
  });
});
