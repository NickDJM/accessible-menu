import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../../src/_baseMenu.js";
import { twoLevel } from "../../../demo/menus.js";
import { setupMatchMedia } from "../helpers.js";

const flags = [
  "expandInsideBreakpoint",
  "expandOutsideBreakpoint",
  "collapseInsideBreakpoint",
  "collapseOutsideBreakpoint",
  "lockInsideBreakpoint",
  "lockOutsideBreakpoint",
  "unlockInsideBreakpoint",
  "unlockOutsideBreakpoint",
];

beforeEach(() => {
  document.body.innerHTML = twoLevel;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("BaseMenu controller options", () => {
  it("should initialize the controller during child creation", () => {
    const createChildren = vi.spyOn(BaseMenu.prototype, "_createChildElements");
    const initialize = vi.spyOn(CollapsibleComponent.prototype, "initialize");
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
    });
    menu.initialize();
    const controller = menu.elements.controller;
    const callIndex = initialize.mock.contexts.indexOf(controller);

    expect(callIndex).toBeGreaterThanOrEqual(0);
    expect(initialize.mock.invocationCallOrder[callIndex]).toBeGreaterThan(
      createChildren.mock.invocationCallOrder[0]
    );
  });

  it("should not initialize the controller when setting ARIA attributes", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
    });
    menu.initialize();
    const initialize = vi.spyOn(menu.elements.controller, "initialize");

    menu._setAriaAttributes();

    expect(initialize).not.toHaveBeenCalled();
  });

  it("should not initialize an initialized controller again", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
    });
    menu.initialize();
    const initialize = vi.spyOn(menu.elements.controller, "initialize");

    menu._createController();

    expect(initialize).not.toHaveBeenCalled();
  });

  it.each(flags)("should forward %s to the controller", (option) => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      [option]: true,
    });
    menu.initialize();

    expect(menu.elements.controller[option]).toBe(true);
  });

  it.each(flags)("should use Core's false default for %s", (option) => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
    });
    menu.initialize();

    expect(menu.elements.controller[option]).toBe(false);
  });

  it.each(flags)("should validate %s through Core", (option) => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      [option]: "invalid",
    });
    menu.initialize();

    expect(menu.errors.some((error) => error.message.includes(option))).toBe(
      true
    );
  });

  it.each(flags)("should keep %s off submenu toggles", (option) => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      [option]: true,
    });
    menu.initialize();

    expect(menu.elements.submenuToggles[0][option]).toBe(false);
  });

  it("should register one media-query listener on the controller", () => {
    const { matchMedia } = setupMatchMedia(false);
    vi.stubGlobal("matchMedia", matchMedia);

    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      breakpoint: "40em",
    });
    menu.initialize();

    expect(matchMedia).toHaveBeenCalledExactlyOnceWith("(width <= 40em)");
  });

  it("should respond to a media-query change using Core", () => {
    const { matchMedia, mql, listeners } = setupMatchMedia(true);
    vi.stubGlobal("matchMedia", matchMedia);
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      breakpoint: "40em",
      lockOutsideBreakpoint: true,
    });
    menu.initialize();
    vi.advanceTimersToNextFrame();

    mql.matches = false;
    listeners.forEach((listener) => listener(mql));

    expect(menu.elements.controller.isLocked).toBe(true);
  });

  it("should stop responding to query changes when disposed", () => {
    const { matchMedia, mql, listeners } = setupMatchMedia(true);
    vi.stubGlobal("matchMedia", matchMedia);
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
      breakpoint: "40em",
      lockOutsideBreakpoint: true,
    });
    menu.initialize();
    const controller = menu.elements.controller;
    vi.advanceTimersToNextFrame();

    menu.dispose();
    mql.matches = false;
    listeners.forEach((listener) => listener(mql));

    expect(controller.isLocked).toBe(false);
  });

  it("should inherit Core's responsive callback on the controller", () => {
    const menu = new BaseMenu({
      menuElement: document.querySelector("ul"),
      controllerElement: document.querySelector("button"),
      containerElement: document.querySelector("nav"),
      submenuTogglesSelector: "a",
      initialize: false,
    });
    menu.initialize();

    expect(menu.elements.controller._mediaQueryListEventCallback).toBe(
      CollapsibleComponent.prototype._mediaQueryListEventCallback
    );
  });

  it.each(flags)(
    "should apply %s on the initial media-query frame",
    (option) => {
      const matches = option.includes("Inside");
      const { matchMedia } = setupMatchMedia(matches);
      vi.stubGlobal("matchMedia", matchMedia);
      const menu = new BaseMenu({
        menuElement: document.querySelector("ul"),
        controllerElement: document.querySelector("button"),
        containerElement: document.querySelector("nav"),
        submenuTogglesSelector: "a",
        initialize: false,
        breakpoint: "40em",
        [option]: true,
      });
      menu.initialize();
      const controller = menu.elements.controller;
      if (option.startsWith("collapse"))
        controller.expand({ transition: false, emit: false });
      if (option.startsWith("unlock")) controller.lock({ emit: false });

      vi.advanceTimersToNextFrame();

      if (option.startsWith("expand")) expect(controller.isExpanded).toBe(true);
      if (option.startsWith("collapse"))
        expect(controller.isExpanded).toBe(false);
      if (option.startsWith("lock")) expect(controller.isLocked).toBe(true);
      if (option.startsWith("unlock")) expect(controller.isLocked).toBe(false);
    }
  );
});
