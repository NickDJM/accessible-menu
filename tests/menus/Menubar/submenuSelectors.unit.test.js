import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Menubar from "../../../src/menubar.js";

const menus = [];

beforeEach(() => {
  document.body.innerHTML = `
    <nav>
      <ul>
        <li>
          <a class="all-toggles root-toggle" href="#root">Root</a>
          <ul>
            <li>
              <a class="all-toggles child-toggle" href="#child">Child</a>
              <ul>
                <li>
                  <a class="all-toggles child-toggle" href="#grandchild">Grandchild</a>
                  <ul><li><a href="#last">Last</a></li></ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  `;
});

afterEach(() => {
  for (const menu of menus.splice(0)) {
    menu.dispose();
  }

  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("Menubar child toggle selectors", () => {
  it("preserves the existing selector when no deeper selector is provided", () => {
    const menu = new Menubar({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".all-toggles",
      transitionClass: "",
      initialize: false,
    });
    menus.push(menu);

    menu.initialize();

    const child = menu.elements.submenuToggles[0].elements.controlledMenu;
    const grandchild = child.elements.submenuToggles[0].elements.controlledMenu;
    const selector = ".all-toggles";

    expect(menu.isInitialized).toBe(true);
    expect(child.isInitialized).toBe(true);
    expect(grandchild.isInitialized).toBe(true);
    expect(child.selectors.submenuToggles).toBe(selector);
    expect(grandchild.selectors.submenuToggles).toBe(selector);
  });

  it("uses the configured submenu toggle selector when the deeper selector is null", () => {
    const menu = new Menubar({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".all-toggles",
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
    expect(child.selectors.submenuToggles).toBe(".all-toggles");
    expect(grandchild.selectors.submenuToggles).toBe(".all-toggles");
  });

  it("uses a different selector for child menus at every deeper level", () => {
    const menu = new Menubar({
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
    const menu = new Menubar({
      menuElement: document.querySelector("ul"),
      submenuTogglesSelector: ".all-toggles",
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
