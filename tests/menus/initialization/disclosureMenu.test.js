/**
 * Test the DisclosureMenu class to make sure it can initialize under various scenarios.
 *
 * @jest-environment jsdom
 */

/* eslint-disable no-new */

import { DisclosureMenu } from "../../../index";
import { oneLevelMenu } from "../../test-menus";

describe("DisclosureMenu initialization tests", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;

  test("won't initialize if optionalKeySupport is not a boolean", () => {
    expect(() => {
      new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        optionalKeySupport: "true",
      });
    }).toThrow(
      "AccessibleMenu: optionalKeySupport must be a boolean. string given."
    );
  });
});
