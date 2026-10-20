import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Component from "@accessible-ecosystem/core";
import BaseMenu from "../../../src/_baseMenu.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("BaseMenu Core inheritance", () => {
  it("should inherit Core initialization", () => {
    expect(BaseMenu.prototype.initialize).toBe(Component.prototype.initialize);
  });

  it("should inherit shared Core validation", () => {
    expect(BaseMenu.prototype._validate).toBe(Component.prototype._validate);
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
