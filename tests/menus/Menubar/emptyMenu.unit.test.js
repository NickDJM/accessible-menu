/**
 * Empty menu initialization tests for the Menubar class.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { singleLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";

let menu;

afterEach(() => {
  menu?.dispose();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("Menubar empty menus", () => {
  it.each([false, true])(
    "should initialize an empty menu with a controller set to %s",
    (controlled) => {
      document.body.innerHTML = "<nav><button>Menu</button><ul></ul></nav>";
      const onError = vi.fn();
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      window.addEventListener("error", onError);

      try {
        menu = new Menubar({
          menuElement: document.querySelector("ul"),
          ...(controlled && {
            controllerElement: document.querySelector("button"),
            containerElement: document.querySelector("nav"),
          }),
        });

        expect(onError).not.toHaveBeenCalled();
        expect(consoleError).not.toHaveBeenCalled();
        expect(menu.isInitialized).toBe(true);
        expect(menu.isValid).toBe(true);
        expect(menu.errors).toEqual([]);
        expect(menu.elements.menuItems).toEqual([]);
        expect(menu.dom.menu.getAttribute("role")).toBe("menubar");
        expect(menu.dom.menu.querySelector('[tabindex="0"]')).toBeNull();

        if (controlled) {
          expect(menu.elements.controller.isInitialized).toBe(true);
          expect(menu.dom.controller.hasAttribute("aria-haspopup")).toBe(false);
        }
      } finally {
        window.removeEventListener("error", onError);
      }
    }
  );

  it("should initialize an empty submenu", () => {
    document.body.innerHTML =
      '<ul><li><a href="#parent">Parent</a><ul></ul></li></ul>';

    menu = new Menubar({
      menuElement: document.querySelector("ul"),
    });

    const submenu = menu.elements.submenuToggles[0].elements.controlledMenu;

    expect(menu.isInitialized).toBe(true);
    expect(submenu.isInitialized).toBe(true);
    expect(submenu.isValid).toBe(true);
    expect(submenu.errors).toEqual([]);
    expect(submenu.elements.menuItems).toEqual([]);
    expect(submenu.dom.menu.getAttribute("role")).toBe("menu");
  });

  it("should keep the first item of a populated root menu in the tab order", () => {
    document.body.innerHTML = singleLevel;

    menu = new Menubar({
      menuElement: document.querySelector("ul"),
    });

    expect(menu.isInitialized).toBe(true);
    expect(menu.elements.menuItems[0].dom.link.tabIndex).toBe(0);
    expect(menu.elements.menuItems[1].dom.link.tabIndex).toBe(-1);
  });
});
