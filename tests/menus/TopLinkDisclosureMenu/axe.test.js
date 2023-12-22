/**
 * Tests for TopLinkDisclosureMenu's axe compliance.
 */

import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import * as AxeMatchers from "vitest-axe/matchers";
import { twoLevel } from "../../../demo/menus.js";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";

expect.extend(AxeMatchers);

describe("TopLinkDisclosureMenu", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new TopLinkDisclosureMenu instance for testing.
  /* eslint-disable-next-line no-unused-vars */
  const menu = new TopLinkDisclosureMenu({
    menuElement: document.querySelector("ul"),
    submenuItemSelector: "li.dropdown",
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("button"),
  });

  // Test the root menu for axe compliance.
  it("should be axe compliant", async () => {
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
