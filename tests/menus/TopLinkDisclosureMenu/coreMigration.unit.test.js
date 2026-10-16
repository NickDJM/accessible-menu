import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("TopLinkDisclosureMenu lifecycle", () => {
  it("should register root interaction handlers once", () => {
    const click = vi.spyOn(TopLinkDisclosureMenu.prototype, "_handleClick");
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });

    const rootCalls = click.mock.contexts.filter((context) => context === menu);

    expect(rootCalls).toHaveLength(1);
  });

  it("should not rerun root setup for a child's bubbling initialization", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });
    const listenerCount = menu.listeners.length;
    const child = menu.elements.submenuToggles[0].elements.controlledMenu;

    child._dispatchEvent("initialize");

    expect(menu.listeners).toHaveLength(listenerCount);
  });

  it("should initialize every submenu", () => {
    const menu = new TopLinkDisclosureMenu({
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
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
    });

    expect(menu.focusState).toBe("none");
  });
});

describe("TopLinkDisclosureMenu nested Core integration", () => {
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
      const menu = new TopLinkDisclosureMenu({
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
      const menu = new TopLinkDisclosureMenu({
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
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuTogglesSelector: "a",
      });
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;

      menu[property] = 431;

      expect(child.dom.menu.style.getPropertyValue(cssProperty)).toBe("431ms");
    }
  );

  it("should forward the initialization class to Core", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
      initializeClass: "audit-initializing",
      initialize: false,
    });

    expect(menu.initializeClass).toBe("audit-initializing");
  });

  it("should remove descendant document listeners when the root is disposed", () => {
    const menu = new TopLinkDisclosureMenu({
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

describe("TopLinkDisclosureMenu optional key validation", () => {
  it("should report menu-specific optional-key validation through Core", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: "a",
      optionalKeySupport: "invalid",
      initialize: false,
    });

    menu.initialize();

    expect(menu.isValid).toBe(false);
    expect(
      menu.errors.some((error) => error.message.includes("optionalKeySupport"))
    ).toBe(true);
  });
});
