import { it, expect, beforeEach, afterEach, vi } from "vitest";
import DisclosureMenu from "../../../src/disclosureMenu.js";
import { twoLevel } from "../../../demo/menus.js";

beforeEach(() => {
  document.body.innerHTML = twoLevel;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

it("should expose the controller DOM ID through the inherited toggle ID getter", () => {
  const menu = new DisclosureMenu({
    menuElement: document.querySelector("ul"),
    submenuTogglesSelector: "a",
  });
  const toggle = menu.elements.submenuToggles[0];

  expect(toggle.id).toBe(toggle.dom.controller.id);
});
