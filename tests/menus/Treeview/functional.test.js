/**
 * Test the Treeview class to make sure it functions correctly.
 *
 * @jest-environment jsdom
 */

import { Treeview } from "../../../index";
import {
  openClose,
  clickTests,
  hoverTests,
  baseKeypressTests,
} from "../_common/functional";
import { fullMenu } from "../_common/test-menus";
import {
  simulateKeypress,
  toggleIsClosed,
  toggleIsPreviewed,
} from "../_common/helpers";

openClose(Treeview);
clickTests(Treeview);
hoverTests(Treeview);
baseKeypressTests(Treeview);

describe("Treeview keypress tests", () => {
  describe.each(["Spacebar", "Enter"])("'%s' key", (key) => {
    test("Opens the current submenu if closed.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsPreviewed(toggle);
    });

    test("Closes the current submenu if open.", () => {
      // Set up the DOM.
      document.body.innerHTML = fullMenu;
      const menu = new Treeview({
        menuElement: document.querySelector("#menu-0"),
        submenuItemSelector: "li.dropdown",
      });
      const toggle = menu.elements.submenuToggles[0];

      // Enter the menu.
      menu.elements.menuItems[0].dom.link.focus();

      // Set up the menu for the test.
      menu.focusChild(1);
      toggle.preview();

      // Simluate the keypress.
      simulateKeypress(key, menu.dom.menu);

      toggleIsClosed(toggle);
    });
  });
});
