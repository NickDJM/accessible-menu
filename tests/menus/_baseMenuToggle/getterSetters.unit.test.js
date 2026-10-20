/**
 * Getter/Setter tests for the BaseMenuToggle class.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  twoLevel,
  threeLevel,
  twoLevelDisclosureTopLink,
} from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// Test all getter/setter methods in the BaseMenuToggle class.
describe("BaseMenuToggle getter/setters", () => {
  // Test BaseMenuToggle dom.
  describe("dom", () => {
    // Test that dom gets the DOM elements.
    it("should get the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.dom).toEqual(menuToggle._dom);
    });

    // Test that dom cannot be set manually.
    it("should not set the DOM elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.dom = {};
      }).toThrow(TypeError);
    });
  });

  // Test BaseMenuToggle elements.
  describe("elements", () => {
    // Test that elements gets the elements.
    it("should get the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.elements).toEqual(menuToggle._elements);
    });

    // Test that elements cannot be set manually.
    it("should not set the elements", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.elements = {};
      }).toThrow(TypeError);
    });
  });

  // Test BaseMenuToggle isExpanded.
  describe("isExpanded", () => {
    // Test that isExpanded gets the expanded state.
    it("should get the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.isExpanded).toBe(menuToggle._expanded.value);
    });

    // Test that isExpanded cannot be set manually.
    it("should not be able to set the open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.isExpanded = true;
      }).toThrow();
    });
  });

  // Test BaseMenuToggle shouldBeExpanded.
  describe("shouldBeExpanded", () => {
    // Test that shouldBeExpanded gets the committed expanded state.
    it("should get the committed open state", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(menuToggle.shouldBeExpanded).toBe(menuToggle._expanded.committed);
    });

    // Test that shouldBeExpanded cannot be set manually.
    it("should not be able to set shouldBeExpanded", () => {
      // Create a new BaseMenu instance for testing.
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
      menu.initialize();

      const menuToggle = menu.elements.submenuToggles[0];

      expect(() => {
        menuToggle.shouldBeExpanded = true;
      }).toThrow();
    });
  });

  describe("shouldFocus", () => {
    it.each([
      { currentEvent: "none", hoverType: "off", expected: false },
      { currentEvent: "keyboard", hoverType: "off", expected: true },
      { currentEvent: "character", hoverType: "off", expected: true },
      { currentEvent: "mouse", hoverType: "off", expected: false },
      { currentEvent: "mouse", hoverType: "on", expected: false },
      { currentEvent: "mouse", hoverType: "dynamic", expected: false },
    ])(
      "should inherit the root menu's value for $currentEvent with hover $hoverType",
      ({ currentEvent, hoverType, expected }) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
        ];
        menu.hoverType = hoverType;

        menu.currentEvent = currentEvent;

        expect(menu.shouldFocus).toBe(expected);
        for (const component of components) {
          expect(component.shouldFocus).toBe(expected);
        }
      }
    );

    it.each([true, false])(
      "should inherit the root menu's custom value of %s",
      (shouldFocus) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
        ];
        vi.spyOn(menu, "shouldFocus", "get").mockReturnValue(shouldFocus);

        for (const component of components) {
          expect(component.shouldFocus).toBe(shouldFocus);
        }
      }
    );

    it("should use the root menu's value when moving DOM focus", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionClass: "",
      });

      menu.initialize();
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const components = [
        menu.elements.controller,
        menu.elements.submenuToggles[0],
        child.elements.submenuToggles[0],
      ];
      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          callback(0);
          return 0;
        }
      );

      for (const component of components) {
        menu.dom.controller.focus();
        menu.currentEvent = "none";

        component.focus();

        expect(document.activeElement).toBe(menu.dom.controller);

        menu.hoverType = "dynamic";
        menu.currentEvent = "mouse";
        component.focus();

        expect(document.activeElement).toBe(menu.dom.controller);

        menu.currentEvent = "character";
        component.focus();

        expect(document.activeElement).toBe(component.dom.controller);
      }
    });
  });

  describe("currentEvent", () => {
    it.each(["none", "mouse", "keyboard", "character"])(
      "should inherit the root menu's value for %s events",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
        ];

        menu.currentEvent = currentEvent;

        for (const component of components) {
          expect(component.currentEvent).toBe(currentEvent);
        }
      }
    );

    it.each(["keyboard", "mouse", "character"])(
      "should update the root menu's value to %s",
      (currentEvent) => {
        document.body.innerHTML = threeLevel;
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          containerElement: document.querySelector("nav"),
          controllerElement: document.querySelector("button"),
          transitionClass: "",
        });

        menu.initialize();
        const child = menu.elements.submenuToggles[0].elements.controlledMenu;
        const components = [
          menu.elements.controller,
          menu.elements.submenuToggles[0],
          child.elements.submenuToggles[0],
        ];

        for (const component of components) {
          menu.currentEvent = "none";

          component.currentEvent = currentEvent;

          expect(menu.currentEvent).toBe(currentEvent);
          for (const sibling of components) {
            expect(sibling.currentEvent).toBe(currentEvent);
          }
        }
      }
    );

    it("should reject an invalid event without changing the root menu's value", () => {
      document.body.innerHTML = threeLevel;
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
        transitionClass: "",
      });

      menu.initialize();
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const components = [
        menu.elements.controller,
        menu.elements.submenuToggles[0],
        child.elements.submenuToggles[0],
      ];
      menu.currentEvent = "keyboard";

      for (const component of components) {
        expect(() => {
          component.currentEvent = "invalid";
        }).toThrow();

        expect(menu.currentEvent).toBe("keyboard");
        expect(component.currentEvent).toBe("keyboard");
      }
    });
  });

  describe("expandClass", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated expandClass settings from the menu", () => {
        const property = "expandClass";
        const menuProperty = "expandClass";
        const value = "changed-open";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the expandClass setter", () => {
        const property = "expandClass";
        const menuProperty = "expandClass";
        const value = "changed-open";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure expandClass from the controlled menu", () => {
        const property = "expandClass";
        const option = "expandClass";
        const value = "custom-open";

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("collapseClass", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated collapseClass settings from the menu", () => {
        const property = "collapseClass";
        const menuProperty = "collapseClass";
        const value = "changed-close";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the collapseClass setter", () => {
        const property = "collapseClass";
        const menuProperty = "collapseClass";
        const value = "changed-close";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure collapseClass from the controlled menu", () => {
        const property = "collapseClass";
        const option = "collapseClass";
        const value = "custom-close";

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("transitionClass", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated transitionClass settings from the menu", () => {
        const property = "transitionClass";
        const menuProperty = "transitionClass";
        const value = "changed-transition";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the transitionClass setter", () => {
        const property = "transitionClass";
        const menuProperty = "transitionClass";
        const value = "changed-transition";

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure transitionClass from the controlled menu", () => {
        const property = "transitionClass";
        const option = "transitionClass";
        const value = "custom-transition";

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("transitionDuration", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated transitionDuration settings from the menu", () => {
        const property = "transitionDuration";
        const menuProperty = "transitionDuration";
        const value = 300;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the transitionDuration setter", () => {
        const property = "transitionDuration";
        const menuProperty = "transitionDuration";
        const value = 300;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure transitionDuration from the controlled menu", () => {
        const property = "transitionDuration";
        const option = "transitionDuration";
        const value = 300;

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("expandDuration", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated expandDuration settings from the menu", () => {
        const property = "expandDuration";
        const menuProperty = "expandDuration";
        const value = 400;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the expandDuration setter", () => {
        const property = "expandDuration";
        const menuProperty = "expandDuration";
        const value = 400;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure expandDuration from the controlled menu", () => {
        const property = "expandDuration";
        const option = "expandDuration";
        const value = 400;

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("collapseDuration", () => {
    describe("controlled menu values", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should read updated collapseDuration settings from the menu", () => {
        const property = "collapseDuration";
        const menuProperty = "collapseDuration";
        const value = 500;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });
        const menu = toggle.elements.controlledMenu;

        menu[menuProperty] = value;

        expect(toggle[property]).toBe(value);
      });

      it("should update the menu through the collapseDuration setter", () => {
        const property = "collapseDuration";
        const menuProperty = "collapseDuration";
        const value = 500;

        const toggle = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
            transitionClass: "",
          }),
        });

        toggle[property] = value;

        expect(toggle.elements.controlledMenu[menuProperty]).toBe(value);
      });
    });

    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should configure collapseDuration from the controlled menu", () => {
        const property = "collapseDuration";
        const option = "collapseDuration";
        const value = 500;

        const controlledMenu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          [option]: value,
        });
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu,
        });

        expect(instance[property]).toBe(value);
      });
    });
  });

  describe("rootDOMElement", () => {
    describe("constructor options", () => {
      beforeEach(() => {
        document.body.innerHTML = twoLevelDisclosureTopLink;
      });

      afterEach(() => {
        document.body.innerHTML = "";
      });

      it("should resolve the configured DOM slot through the inherited getter", () => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });

        expect(instance.rootDOMElement).toBe(
          instance.dom[instance._rootDOMElement]
        );
      });

      it("should remain read-only on the menu instance", () => {
        const instance = new BaseMenuToggle({
          menuToggleElement: document.querySelector("button"),
          controlledMenu: new BaseMenu({
            menuElement: document.querySelector("ul"),
          }),
        });

        expect(() => {
          instance.rootDOMElement = document.querySelector("nav");
        }).toThrow(TypeError);
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
        const menu = new BaseMenu({
          menuElement: document.querySelector("ul"),
          submenuTogglesSelector: "a",
        });
        menu.initialize();
        const toggle = menu.elements.submenuToggles[0];

        expect(toggle.id).toBe(toggle.dom.controller.id);
      });
    });
  });
});
