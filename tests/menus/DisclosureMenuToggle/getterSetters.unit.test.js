/**
 * Getter/Setter tests for the DisclosureMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenuToggle from "../../../src/disclosureMenuToggle.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { expectInheritedGetter, expectInheritedSetter } from "../helpers.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevel } from "../../../demo/menus.js";
import Component from "@accessible-ecosystem/core";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";

// Test all getter/setter methods in the DisclosureMenuToggle class.
describe("DisclosureMenuToggle getter/setters", () => {
  // Test DisclosureMenuToggle dom.
  describe("dom", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle dom getter.
    it("should implement the BaseMenuToggle dom", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle dom setter.
    it("should implement the BaseMenuToggle dom setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "dom"
      );
    });
  });

  // Test DisclosureMenuToggle elements.
  describe("elements", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle elements getter.
    it("should implement the BaseMenuToggle elements", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle elements setter.
    it("should implement the BaseMenuToggle elements setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "elements"
      );
    });
  });

  // Test DisclosureMenuToggle isExpanded.
  describe("isExpanded", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle isExpanded getter.
    it("should implement the BaseMenuToggle isExpanded", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle isExpanded setter.
    it("should implement the BaseMenuToggle isExpanded setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "isExpanded"
      );
    });

    describe("inheritance", () => {
      it("should inherit the isExpanded getter", () => {
        const property = "isExpanded";

        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          CollapsibleComponent.prototype,
          property
        );
      });
    });
  });

  // Test DisclosureMenuToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that DisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded getter.
    it("should implement the BaseMenuToggle shouldBeExpanded", () => {
      expectInheritedGetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    // Test that DisclosureMenuToggle implements the BaseMenuToggle shouldBeExpanded setter.
    it("should implement the BaseMenuToggle shouldBeExpanded setter", () => {
      expectInheritedSetter(
        DisclosureMenuToggle.prototype,
        BaseMenuToggle.prototype,
        "shouldBeExpanded"
      );
    });

    describe("inheritance", () => {
      it("should inherit the shouldBeExpanded getter", () => {
        const property = "shouldBeExpanded";

        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          CollapsibleComponent.prototype,
          property
        );
      });
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

      it("should expose the controller DOM ID through the inherited toggle ID getter", () => {
        const menu = new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        const toggle = menu.elements.submenuToggles[0];

        expect(toggle.id).toBe(toggle.dom.controller.id);
      });
    });
  });

  describe("rootDOMElement", () => {
    describe("inheritance", () => {
      it("should inherit the Core getter through the menu base class", () => {
        const property = "rootDOMElement";

        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "rootDOMElement";

        expectInheritedSetter(
          DisclosureMenuToggle.prototype,
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
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "scope";

        expectInheritedSetter(
          DisclosureMenuToggle.prototype,
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
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "name";

        expectInheritedSetter(
          DisclosureMenuToggle.prototype,
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
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "eventPrefix";

        expectInheritedSetter(
          DisclosureMenuToggle.prototype,
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
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });

      it("should preserve Core's getter-only descriptor", () => {
        const property = "isInitialized";

        expectInheritedSetter(
          DisclosureMenuToggle.prototype,
          Component.prototype,
          property
        );
      });
    });
  });

  describe("isLocked", () => {
    describe("inheritance", () => {
      it("should inherit the isLocked getter", () => {
        const property = "isLocked";

        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          CollapsibleComponent.prototype,
          property
        );
      });
    });
  });

  describe("shouldBeLocked", () => {
    describe("inheritance", () => {
      it("should inherit the shouldBeLocked getter", () => {
        const property = "shouldBeLocked";

        expectInheritedGetter(
          DisclosureMenuToggle.prototype,
          CollapsibleComponent.prototype,
          property
        );
      });
    });
  });
});
