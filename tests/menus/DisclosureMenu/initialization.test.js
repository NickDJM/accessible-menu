/**
 * Test the DisclosureMenu class to make sure it can initialize under various scenarios.
 *
 * @jest-environment jsdom
 */

import { DisclosureMenu } from "../../../index";
import { oneLevelMenu } from "../_common/test-menus";
import {
  defaultInitialization,
  controlledMenu,
  customizedMenu,
} from "../_common/initialize";

defaultInitialization(DisclosureMenu);
controlledMenu(DisclosureMenu);
customizedMenu(DisclosureMenu);

describe("DisclosureMenu-specific initialization", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;

  test("will fail if optionalKeySupport is not a boolean", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new DisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        optionalKeySupport: "true",
      });
    }).toThrow(
      "AccessibleMenu: optionalKeySupport must be a boolean. string given."
    );
  });
});
