import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";
import BaseMenu from "../../../src/_baseMenu.js";
import BaseMenuToggle from "../../../src/_baseMenuToggle.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("BaseMenuToggle Core inheritance", () => {
  it("should inherit Core initialization", () => {
    expect(BaseMenuToggle.prototype.initialize).toBe(
      CollapsibleComponent.prototype.initialize
    );
  });

  it("should inherit shared Core validation", () => {
    expect(BaseMenuToggle.prototype._validate).toBe(
      CollapsibleComponent.prototype._validate
    );
  });
});

it.each([
  ["controlledMenu", {}, "controlledMenu"],
  ["parentMenu", {}, "parentMenu"],
  ["menuToggleElement", null, "controllerElement"],
  ["containerElement", 1, "controlledElement"],
])(
  "should reject invalid toggle %s through validation listeners",
  (property, value, errorField) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const controlledMenu = new BaseMenu({
      menuElement: document.createElement("ul"),
    });
    const toggle = new BaseMenuToggle({
      menuToggleElement: document.createElement("button"),
      controlledMenu,
      [property]: value,
    });

    toggle.initialize();

    expect(
      toggle.errors.some((error) => error.message.includes(errorField))
    ).toBe(true);
  }
);
