import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fourLevelDisclosureTopLinkSplit } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";

beforeEach(() => {
  document.body.innerHTML = fourLevelDisclosureTopLinkSplit;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("TopLinkDisclosureMenu child toggle selectors", () => {
  it("preserves the default link toggles below the top level", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
    });
    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(menu.elements.submenuToggles[0].dom.controller.tagName).toBe(
      "BUTTON"
    );
    expect(child.selectors.submenuToggles).toBe("a");
    expect(grandchild.selectors.submenuToggles).toBe("a");
    expect(child.elements.submenuToggles[0].dom.controller.tagName).toBe("A");
    expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
      grandchild.dom.menu.querySelector("a")
    );
  });

  it.each(["button", null])(
    "creates separate buttons below the top level with a deeper selector of %s",
    (submenuSubtogglesSelector) => {
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuSubtogglesSelector,
      });
      const child = menu.elements.submenuToggles[0].elements.controlledMenu;
      const grandchild =
        child.elements.submenuToggles[0].elements.controlledMenu;
      const link = child.elements.menuItems[1];
      const toggle = child.elements.menuItems[2];

      expect(menu.isInitialized).toBe(true);
      expect(child.isInitialized).toBe(true);
      expect(grandchild.isInitialized).toBe(true);
      expect(child.selectors.submenuToggles).toBe("button");
      expect(grandchild.selectors.submenuToggles).toBe("button");
      expect(link.dom.link.tagName).toBe("A");
      expect(link.elements.sibling).toBe(toggle);
      expect(toggle.dom.link).toBe(child.dom.menu.querySelector("button"));
      expect(toggle.elements.toggle).toBe(child.elements.submenuToggles[0]);
      expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
        grandchild.dom.menu.querySelector("button")
      );
      expect(grandchild.elements.menuItems[0].elements.sibling).toBe(
        grandchild.elements.menuItems[1]
      );
    }
  );

  it("uses custom selectors for root and child toggle buttons", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".root-toggle",
      submenuSubtogglesSelector: ".child-toggle",
    });
    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(menu.elements.submenuToggles[0].dom.controller).toBe(
      document.querySelector(".root-toggle")
    );
    expect(child.elements.submenuToggles[0].dom.controller).toBe(
      child.dom.menu.querySelector(".child-toggle")
    );
    expect(child.selectors.submenuToggles).toBe(".child-toggle");
    expect(grandchild.selectors.submenuToggles).toBe(".child-toggle");
    expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
      grandchild.dom.menu.querySelector(".child-toggle")
    );
  });

  it("uses the custom root selector below the top level when the deeper selector is null", () => {
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".dropdown-toggle",
      submenuSubtogglesSelector: null,
    });
    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(menu.selectors.submenuToggles).toBe(".dropdown-toggle");
    expect(child.selectors.submenuToggles).toBe(".dropdown-toggle");
    expect(grandchild.selectors.submenuToggles).toBe(".dropdown-toggle");
    expect(child.elements.submenuToggles[0].dom.controller).toBe(
      child.dom.menu.querySelector("button")
    );
    expect(grandchild.elements.submenuToggles[0].dom.controller).toBe(
      grandchild.dom.menu.querySelector(".dropdown-toggle")
    );
  });

  it.each([1, "["])("reports an invalid deeper selector %j", (selector) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const menu = new TopLinkDisclosureMenu({
      menuElement: document.querySelector("ul"),
      submenuSubtogglesSelector: selector,
    });

    expect(menu.isInitialized).toBe(false);
    expect(menu.errors.length).toBeGreaterThan(0);
  });
});
