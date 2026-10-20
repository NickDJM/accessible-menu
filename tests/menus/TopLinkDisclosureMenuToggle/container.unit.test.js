import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import TopLinkDisclosureMenuToggle from "../../../src/topLinkDisclosureMenuToggle.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("TopLinkDisclosureMenuToggle container", () => {
  it.each([{}, { containerElement: null }])(
    "defaults to the menu element for %j",
    (options) => {
      const toggle = new TopLinkDisclosureMenuToggle({
        menuToggleElement: document.querySelector(".dropdown-toggle"),
        controlledMenu: new BaseMenu({
          menuElement: document.querySelector(".dropdown-menu"),
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
    const containerElement = document.querySelector(".dropdown");
    const toggle = new TopLinkDisclosureMenuToggle({
      menuToggleElement: document.querySelector(".dropdown-toggle"),
      controlledMenu: new BaseMenu({
        menuElement: document.querySelector(".dropdown-menu"),
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

    expect(toggle.dom.controller.getAttribute("aria-controls")).toBe(
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
    const containerElement = document.querySelector(".dropdown");
    const menuClasses = document.querySelector(".dropdown-menu").className;
    const toggle = new TopLinkDisclosureMenuToggle({
      menuToggleElement: document.querySelector(".dropdown-toggle"),
      controlledMenu: new BaseMenu({
        menuElement: document.querySelector(".dropdown-menu"),
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
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe(menuClasses);

    toggle.unlock({ emit: false });

    expect(containerElement.classList.contains("locked")).toBe(false);
    expect(containerElement.classList.contains("unlocked")).toBe(true);
    expect(toggle.dom.controller.disabled).toBe(false);
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe(menuClasses);
  });

  it("applies transition classes to the controlled element", () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", (callback) =>
      setTimeout(callback, 16)
    );

    const containerElement = document.querySelector(".dropdown");
    const containerClasses = containerElement.className;
    const menuClasses = document.querySelector(".dropdown-menu").className;
    const toggle = new TopLinkDisclosureMenuToggle({
      menuToggleElement: document.querySelector(".dropdown-toggle"),
      controlledMenu: new BaseMenu({
        menuElement: document.querySelector(".dropdown-menu"),
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

    expect(containerElement.className).toBe(`${containerClasses} open`);

    toggle.collapse({ transition: true, emit: false });

    expect(containerElement.classList.contains("transitioning")).toBe(true);

    vi.runAllTimers();

    expect(containerElement.className).toBe(`${containerClasses} closed`);
    expect(toggle.elements.controlledMenu.dom.menu.className).toBe(menuClasses);
  });
});
