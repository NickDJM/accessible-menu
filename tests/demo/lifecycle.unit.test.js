import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import demoPage from "../../index.html?raw";
import { setupMatchMedia } from "../menus/helpers.js";

describe("Demo menu lifecycle", () => {
  let menu;
  let media;

  beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();
    media = setupMatchMedia();
    vi.stubGlobal("matchMedia", media.matchMedia);
    document.body.innerHTML = new DOMParser().parseFromString(
      demoPage,
      "text/html"
    ).body.innerHTML;

    await import("../../demo/main.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));
    document.querySelector("#buttonDisclosureMenu").click();

    const menuElement = document.querySelector("header nav > ul");
    menu = window.AccessibleMenuStorage.storage.menus[menuElement.id];
  });

  afterEach(() => {
    const menuElement = document.querySelector("header nav > ul");
    const currentMenu =
      window.AccessibleMenuStorage.storage.menus[menuElement?.id];

    currentMenu?.dispose();
    delete window.AccessibleMenuStorage;
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("should dispose nested components and pending work when replacing the menu", () => {
    document.querySelector("#buttonThreeLevel").click();

    const menuElement = document.querySelector("header nav > ul");
    menu = window.AccessibleMenuStorage.storage.menus[menuElement.id];
    const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;
    const controller = menu.elements.controller;
    const submenuDispose = vi.spyOn(submenu, "dispose");
    const controllerDispose = vi.spyOn(controller, "dispose");
    const callback = vi.fn();
    const dispose = menu.dispose.bind(menu);
    let connectedDuringDisposal;
    vi.spyOn(menu, "dispose").mockImplementation(() => {
      connectedDuringDisposal = menuElement.isConnected;
      dispose();
    });
    menu._setTimeout(callback, 100);
    submenu._requestAnimationFrame(callback);

    document.querySelector("#buttonTwoLevel").click();
    vi.advanceTimersByTime(500);

    expect(connectedDuringDisposal).toBe(true);
    expect(submenuDispose).toHaveBeenCalledOnce();
    expect(controllerDispose).toHaveBeenCalledOnce();
    expect(menu.listeners).toEqual([]);
    expect(submenu.frames).toEqual({});
    expect(callback).not.toHaveBeenCalled();
    expect(
      window.AccessibleMenuStorage.storage.menus[menuElement.id]
    ).toBeUndefined();
    expect(
      Object.values(window.AccessibleMenuStorage.storage.menus)
    ).toHaveLength(1);
  });

  it("should dispose the menu when returning to the native preview", () => {
    const dispose = vi.spyOn(menu, "dispose");

    document.querySelector("#buttonReset").click();

    expect(dispose).toHaveBeenCalledOnce();
    expect(
      Object.values(window.AccessibleMenuStorage.storage.menus)
    ).toHaveLength(0);
  });

  it.each([
    ["buttonKeySupportOn", "optionalKeySupport", true],
    ["buttonHoverOn", "hoverType", "on"],
    ["buttonTransitionOff", "transitionClass", ""],
  ])("should dispose the menu when selecting %s", (id, property, value) => {
    const dispose = vi.spyOn(menu, "dispose");

    document.getElementById(id).click();

    expect(dispose).toHaveBeenCalledOnce();
    const menuElement = document.querySelector("header nav > ul");
    const replacement =
      window.AccessibleMenuStorage.storage.menus[menuElement.id];
    expect(replacement.isInitialized).toBe(true);
    expect(replacement[property]).toBe(value);
  });

  it("should replace the responsive listener without recreating the menu", () => {
    const dispose = vi.spyOn(menu, "dispose");
    const removeListener = media.mql.removeEventListener;
    removeListener.mockClear();
    const breakpoint = document.querySelector("#breakpoint");

    breakpoint.value = "80ch";
    breakpoint.dispatchEvent(new Event("change"));

    expect(dispose).not.toHaveBeenCalled();
    expect(menu.breakpoint).toBe("80ch");
    expect(removeListener).toHaveBeenCalled();
    expect(media.listeners.size).toBe(1);
    expect(menu.dom.menu.isConnected).toBe(true);
  });

  it.each([
    ["hoverDelay", "input"],
    ["enterDelay", "input"],
    ["leaveDelay", "input"],
    ["transitionDuration", "change"],
    ["expandDuration", "change"],
    ["collapseDuration", "change"],
  ])("should preserve the menu while %s is empty or invalid", (id, event) => {
    const dispose = vi.spyOn(menu, "dispose");
    const input = document.getElementById(id);

    input.value = "";
    input.dispatchEvent(new Event(event));

    expect(dispose).not.toHaveBeenCalled();

    input.value = "-2";
    input.dispatchEvent(new Event(event));

    expect(dispose).not.toHaveBeenCalled();
    expect(menu.isInitialized).toBe(true);

    input.value = "100";
    input.dispatchEvent(new Event(event));

    expect(dispose).toHaveBeenCalledOnce();
    const menuElement = document.querySelector("header nav > ul");
    const replacement =
      window.AccessibleMenuStorage.storage.menus[menuElement.id];
    expect(replacement.isInitialized).toBe(true);
    expect(replacement[id]).toBe(100);
  });

  it("should dispose a menu that fails initialization", () => {
    const dispose = vi.spyOn(menu.constructor.prototype, "dispose");
    const validate = vi
      .spyOn(menu.constructor.prototype, "_validate")
      .mockReturnValue(false);
    vi.spyOn(console, "error").mockImplementation(() => {});

    document.querySelector("#buttonTwoLevel").click();

    expect(dispose).toHaveBeenCalledTimes(2);
    expect(
      Object.values(window.AccessibleMenuStorage.storage.menus)
    ).toHaveLength(0);

    document.querySelector("#buttonReset").click();

    expect(dispose).toHaveBeenCalledTimes(2);

    validate.mockRestore();
    document.querySelector("#buttonDisclosureMenu").click();

    const menuElement = document.querySelector("header nav > ul");
    expect(
      window.AccessibleMenuStorage.storage.menus[menuElement.id].isInitialized
    ).toBe(true);
  });
});
