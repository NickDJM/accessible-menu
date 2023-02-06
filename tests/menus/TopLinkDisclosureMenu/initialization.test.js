/**
 * Test the TopLinkDisclosureMenu class to make sure it can initialize under various scenarios.
 */

import { TopLinkDisclosureMenu } from "../../../index";
import { oneLevelMenu } from "../_common/test-menus";
import {
  defaultInitialization,
  controlledMenu,
  customizedMenu,
} from "../_common/initialize";

defaultInitialization(TopLinkDisclosureMenu);
controlledMenu(TopLinkDisclosureMenu);
customizedMenu(TopLinkDisclosureMenu);

describe("TopLinkDisclosureMenu-specific initialization", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  // Set up the DOM.
  document.body.innerHTML = oneLevelMenu;

  test("will fail if optionalKeySupport is not a boolean", () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new TopLinkDisclosureMenu({
        menuElement: document.querySelector("#menu-0"),
        optionalKeySupport: "true",
      });
    }).toThrow(
      "AccessibleMenu: optionalKeySupport must be a boolean. string given."
    );
  });
});
