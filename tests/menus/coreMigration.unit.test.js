import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Component from "@accessible-ecosystem/core";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../src/_baseMenu.js";
import BaseMenuItem from "../../src/_baseMenuItem.js";
import BaseMenuToggle from "../../src/_baseMenuToggle.js";
import DisclosureMenu from "../../src/disclosureMenu.js";
import Menubar from "../../src/menubar.js";
import Treeview from "../../src/treeview.js";
import TopLinkDisclosureMenu from "../../src/topLinkDisclosureMenu.js";
import TopLinkDisclosureMenuItem from "../../src/topLinkDisclosureMenuItem.js";
import { twoLevel } from "../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("Core migration", () => {
  describe.each(
    [
      [BaseMenu, Component],
      [BaseMenuItem, Component],
      [BaseMenuToggle, CollapsibleComponent],
    ].map(([Type, CoreType]) => ({ name: Type.name, Type, CoreType }))
  )("$name", ({ Type, CoreType }) => {
    it("should inherit Core initialization", () => {
      expect(Type.prototype.initialize).toBe(CoreType.prototype.initialize);
    });

    it("should inherit shared Core validation", () => {
      expect(Type.prototype._validate).toBe(CoreType.prototype._validate);
    });
  });

  it.each([null, 12, undefined])(
    "should report an invalid menu element (%s) through Core errors",
    (menuElement) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const menu = new BaseMenu({ menuElement });

      menu.initialize();

      expect(menu.isValid).toBe(false);
      expect(
        menu.errors.some((error) => error.message.includes("menuElement"))
      ).toBe(true);
    }
  );

  it("should expose the controller DOM ID through the inherited toggle ID getter", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const toggle = menu.elements.submenuToggles[0];

    expect(toggle.id).toBe(toggle.dom.controller.id);
  });

  it("should expose an existing menu-item DOM ID through Core", () => {
    document.querySelector("li").id = "existing-menu-item";
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });

    expect(menu.elements.menuItems[0].id).toBe("existing-menu-item");
  });

  it("should leave media-query handling to the controller", () => {
    expect(BaseMenu.prototype).not.toHaveProperty("_handleMediaMatch");
  });

  describe.each(
    [DisclosureMenu, Menubar, Treeview, TopLinkDisclosureMenu].map((Type) => ({
      name: Type.name,
      Type,
    }))
  )("$name lifecycle", ({ Type }) => {
    it("should register root interaction handlers once", () => {
      const click = vi.spyOn(Type.prototype, "_handleClick");
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      const rootCalls = click.mock.contexts.filter(
        (context) => context === menu
      );

      expect(rootCalls).toHaveLength(1);
    });

    it("should not rerun root setup for a child's bubbling initialization", () => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });
      const listenerCount = menu.listeners.length;
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;

      child._dispatchEvent("initialize");

      expect(menu.listeners).toHaveLength(listenerCount);
    });

    it("should initialize every submenu", () => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      expect(
        menu.elements.submenuToggles.every(
          (toggle) =>
            toggle.isInitialized && toggle.elements.controlledMenu.isInitialized
        )
      ).toBe(true);
    });

    it("should preserve an unfocused root during initialization", () => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });

      expect(menu.focusState).toBe("none");
    });
  });

  describe.each(
    [DisclosureMenu, TopLinkDisclosureMenu].map((Type) => ({
      name: Type.name,
      Type,
    }))
  )("$name validation", ({ Type }) => {
    it("should report menu-specific optional-key validation through Core", () => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
        optionalKeySupport: "invalid",
        initialize: false,
      });

      menu.initialize();

      expect(menu.isValid).toBe(false);
      expect(
        menu.errors.some((error) =>
          error.message.includes("optionalKeySupport")
        )
      ).toBe(true);
    });
  });
});

describe.each(
  [DisclosureMenu, Menubar, Treeview, TopLinkDisclosureMenu].map((Type) => ({
    name: Type.name,
    Type,
  }))
)("nested Core integration for $name", ({ Type }) => {
  it.each([
    ["root", "transition", 250],
    ["root", "expand", 321],
    ["root", "collapse", 654],
    ["submenu", "transition", 250],
    ["submenu", "expand", 321],
    ["submenu", "collapse", 654],
  ])(
    "should initialize %s %s CSS duration using the configured prefix",
    (level, action, value) => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
        prefix: "audit-",
        expandDuration: 321,
        collapseDuration: 654,
      });
      const target =
        level === "root"
          ? menu
          : menu.elements.submenuToggles[0].elements.controlledMenu;
      const property =
        action === "transition"
          ? "--audit-transition-duration"
          : `--audit-${action}-transition-duration`;

      expect(target.dom.menu.style.getPropertyValue(property)).toBe(
        `${value}ms`
      );
    }
  );

  it.each(["expandDuration", "collapseDuration"])(
    "should inherit a changed root %s after initialization",
    (property) => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu[property] = 431;

      expect(child[property]).toBe(431);
    }
  );

  it.each([
    ["transitionDuration", "--am-transition-duration"],
    ["expandDuration", "--am-expand-transition-duration"],
    ["collapseDuration", "--am-collapse-transition-duration"],
  ])(
    "should update descendant CSS when root %s changes",
    (property, cssProperty) => {
      const menu = new Type({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu[property] = 431;

      expect(child.dom.menu.style.getPropertyValue(cssProperty)).toBe("431ms");
    }
  );

  it("should forward the initialization class to Core", () => {
    const menu = new Type({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
      initializeClass: "audit-initializing",
      initialize: false,
    });

    expect(menu.initializeClass).toBe("audit-initializing");
  });

  it("should remove descendant document listeners when the root is disposed", () => {
    const menu = new Type({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const listener = vi.fn();
    child._addEventListener("audit-dispose", document, listener);

    menu.dispose();
    document.dispatchEvent(new Event("audit-dispose"));

    expect(listener).not.toHaveBeenCalled();
  });
});

describe("Menu-specific Core validation", () => {
  it.each([
    ["parentMenu", {}, "parentMenu"],
    ["isSubmenuItem", "invalid", "isSubmenuItem"],
    ["childMenu", {}, "childMenu"],
    ["toggle", {}, "toggle"],
    ["menuItemElement", null, "itemElement"],
    ["menuLinkElement", null, "linkElement"],
  ])(
    "should reject invalid item %s through validation listeners",
    (property, value, errorField) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const parentMenu = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const item = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu,
        [property]: value,
      });

      item.initialize();

      expect(
        item.errors.some((error) => error.message.includes(errorField))
      ).toBe(true);
    }
  );

  it("should reject an invalid top-link item sibling", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const parentMenu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: false,
    });
    const item = new TopLinkDisclosureMenuItem({
      menuItemElement: document.createElement("li"),
      menuLinkElement: document.createElement("a"),
      parentMenu,
      submenuSibling: {},
      initialize: false,
    });

    item.initialize();

    expect(
      item.errors.some((error) => error.message.includes("submenuSibling"))
    ).toBe(true);
  });

  it.each(["childMenu", "toggle"])(
    "should require a submenu item's %s",
    (relationship) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const parentMenu = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const item = new BaseMenuItem({
        menuItemElement: document.createElement("li"),
        menuLinkElement: document.createElement("a"),
        parentMenu,
        isSubmenuItem: true,
      });

      item.initialize();

      expect(
        item.errors.some((error) => error.message.includes(relationship))
      ).toBe(true);
    }
  );

  it.each([
    ["controlledMenu", {}, "controlledMenu"],
    ["parentMenu", {}, "parentMenu"],
    ["menuToggleElement", null, "controllerElement"],
    ["parentElement", null, "parentElement"],
  ])(
    "should reject invalid toggle %s through validation listeners",
    (property, value, errorField) => {
      vi.spyOn(console, "error").mockImplementation(() => {});
      const controlledMenu = new BaseMenu({
        menuElement: document.createElement("ul"),
      });
      const toggle = new BaseMenuToggle({
        menuToggleElement: document.createElement("button"),
        parentElement: document.createElement("li"),
        controlledMenu,
        [property]: value,
      });

      toggle.initialize();

      expect(
        toggle.errors.some((error) => error.message.includes(errorField))
      ).toBe(true);
    }
  );
});

describe("Menu item Core focus", () => {
  it("should use the parent menu's focus permission", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];

    menu.currentEvent = "keyboard";

    expect(item.shouldFocus).toBe(true);
  });

  it("should track logical focus through Core", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];

    item.focus();

    expect(item.focusState).toBe("self");
  });

  it("should clear logical focus through Core", () => {
    const menu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const item = menu.elements.menuItems[0];
    item.focus();

    item.blur();

    expect(item.focusState).toBe("none");
  });
});
