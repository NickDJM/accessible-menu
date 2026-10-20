import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fourLevelDisclosureTopLinkSplit } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";

const menus = [];

beforeEach(() => {
  document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
});

afterEach(() => {
  for (const menu of menus.splice(0)) {
    menu.dispose();
  }

  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("BaseMenu child toggle selectors", () => {
  it("preserves the existing selector when no deeper selector is provided", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".menu-link",
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);

    menu.initialize();

    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;
    const selector = ".menu-link";

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(child.selectors.submenuToggles).toBe(selector);
    expect(grandchild.selectors.submenuToggles).toBe(selector);
  });

  it("uses the configured submenu toggle selector when the deeper selector is null", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".menu-link",
      transitionClass: "",
      initialize: false,
      submenuSubtogglesSelector: null,
    });
    menus.push(menu);

    menu.initialize();

    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(child.selectors.submenuToggles).toBe(".menu-link");
    expect(grandchild.selectors.submenuToggles).toBe(".menu-link");
  });

  it("uses a different selector for child menus at every deeper level", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      transitionClass: "",
      initialize: false,
      submenuTogglesSelector: ".root-toggle",
      submenuSubtogglesSelector: ".child-toggle",
    });
    menus.push(menu);

    menu.initialize();

    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(menu.selectors.submenuToggles).toBe(".root-toggle");
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(child.selectors.submenuToggles).toBe(".child-toggle");
    expect(grandchild.selectors.submenuToggles).toBe(".child-toggle");
    expect(child.elements.submenuToggles[0].dom.controller).toBe(
      child.dom.menu.querySelector(".child-toggle")
    );
    expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
      grandchild.dom.menu.querySelector(".child-toggle")
    );
  });

  it.each([1, "["])("reports an invalid deeper selector %j", (selector) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".menu-link",
      transitionClass: "",
      initialize: false,
      submenuSubtogglesSelector: selector,
    });
    menus.push(menu);

    menu.initialize();

    expect(menu.isInitialized).toBe(false);
    expect(menu.errors.length).toBeGreaterThan(0);
  });
});
