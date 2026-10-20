import { afterEach, describe, it, expect, vi } from "vitest";
import BaseMenu from "../../../src/_baseMenu.js";
import TreeviewToggle from "../../../src/treeviewToggle.js";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("TreeviewToggle container", () => {
  it.each([{}, { containerElement: null }])(
    "defaults to the menu element for %j",
    (options) => {
      const toggle = new TreeviewToggle({
        menuToggleElement: document.createElement("button"),
        controlledMenu: new BaseMenu({
          menuElement: document.createElement("ul"),
          expandClass: "open",
          collapseClass: "closed",
          transitionClass: "",
        }),
        initialize: false,
        ...options,
      });

      toggle.expand({ transition: false, emit: false });

      expect(toggle.dom.controlled).toBe(
        toggle.elements.controlledMenu.dom.menu
      );
      expect(
        toggle.elements.controlledMenu.dom.menu.classList.contains("open")
      ).toBe(true);

      toggle.collapse({ transition: false, emit: false });

      expect(toggle.dom.controlled.classList.contains("closed")).toBe(true);
      expect(toggle.dom.controlled.classList.contains("open")).toBe(false);
    }
  );

  it("applies classes to a custom container and keeps ARIA on the menu", () => {
    const containerElement = document.createElement("li");
    const toggle = new TreeviewToggle({
      menuToggleElement: document.createElement("button"),
      controlledMenu: new BaseMenu({
        menuElement: document.createElement("ul"),
        expandClass: "open",
        collapseClass: "closed",
        transitionClass: "",
      }),
      initialize: false,
      containerElement,
    });
    containerElement.append(
      toggle.dom.controller,
      toggle.elements.controlledMenu.dom.menu
    );

    toggle.initialize();

    expect(toggle.isInitialized).toBe(true);
    expect(toggle.dom.controlled).toBe(containerElement);
    expect(containerElement.classList.contains("closed")).toBe(true);

    toggle.expand({ transition: false, emit: false });

    expect(containerElement.classList.contains("open")).toBe(true);
    expect(containerElement.classList.contains("closed")).toBe(false);
    expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe("true");
    expect(
      toggle.elements.controlledMenu.dom.menu.getAttribute("aria-labelledby")
    ).toBe(toggle.dom.controller.id);
    expect(containerElement.hasAttribute("aria-labelledby")).toBe(false);

    expect(toggle.dom.controller.getAttribute("aria-owns")).toBe(
      toggle.elements.controlledMenu.dom.menu.id
    );

    toggle.collapse({ transition: false, emit: false });

    expect(containerElement.classList.contains("closed")).toBe(true);
    expect(containerElement.classList.contains("open")).toBe(false);
    expect(toggle.dom.controller.getAttribute("aria-expanded")).toBe("false");
    expect(
      toggle.elements.controlledMenu.dom.menu.classList.contains("open")
    ).toBe(false);
    expect(
      toggle.elements.controlledMenu.dom.menu.classList.contains("closed")
    ).toBe(false);
  });

  it("applies locked and unlocked classes to the custom container", () => {
    const containerElement = document.createElement("li");
    const toggle = new TreeviewToggle({
      menuToggleElement: document.createElement("button"),
      controlledMenu: new BaseMenu({
        menuElement: document.createElement("ul"),
        expandClass: "open",
        collapseClass: "closed",
        transitionClass: "",
      }),
      initialize: false,
      containerElement,
    });

    toggle.lock({ emit: false });

    expect(containerElement.classList.contains("locked")).toBe(true);
    expect(toggle.dom.controller.disabled).toBe(true);
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe("");

    toggle.unlock({ emit: false });

    expect(containerElement.classList.contains("locked")).toBe(false);
    expect(containerElement.classList.contains("unlocked")).toBe(true);
    expect(toggle.dom.controller.disabled).toBe(false);
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe("");
  });

  it("applies transition classes to the controlled element", () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", (callback) =>
      setTimeout(callback, 16)
    );

    const containerElement = document.createElement("li");
    const toggle = new TreeviewToggle({
      menuToggleElement: document.createElement("button"),
      controlledMenu: new BaseMenu({
        menuElement: document.createElement("ul"),
        expandClass: "open",
        collapseClass: "closed",
        transitionClass: "",
      }),
      initialize: false,
      containerElement,
    });
    toggle.transitionClass = "transitioning";

    toggle.collapse({ transition: false, emit: false });

    toggle.expand({ transition: true, emit: false });

    expect(containerElement.classList.contains("transitioning")).toBe(true);

    vi.runAllTimers();

    expect(containerElement.className).toBe("open");

    toggle.collapse({ transition: true, emit: false });

    expect(containerElement.classList.contains("transitioning")).toBe(true);

    vi.runAllTimers();

    expect(containerElement.className).toBe("closed");
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe("");
  });
});
