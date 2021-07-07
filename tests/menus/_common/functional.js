/**
 * Reusable functional tests.
 *
 * @jest-environment jsdom
 */
/* eslint-disable no-new */

import { twoLevelMenu } from "./test-menus";
import { click, touch } from "./helpers";

/**
 * A set of open/close click tests.
 *
 * @param {(DisclosureMenu|Menubar|Treeview)} MenuClass - The menu class to test.
 */
export function openClose(MenuClass) {
  const menuType = MenuClass.name;

  // Set up the DOM.
  document.body.innerHTML = twoLevelMenu;
  const menu = new MenuClass({
    menuElement: document.querySelector("#menu-0"),
    submenuItemSelector: "li.dropdown",
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("#toggle-0"),
  });

  // const submenus = [
  //   { index: 0, id: 2 },
  //   { index: 1, id: 3 },
  //   { index: 2, id: 5 },
  // ];

  describe(menuType, () => {
    test("will open when the controller's open method is called", () => {
      menu.elements.controller.open();

      expect(menu.elements.controller.isOpen).toBeTrue();
      expect(menu.focusState).toBe("self");
    });

    test("will close when the controller's close method is called", () => {
      menu.elements.controller.close();

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
    });

    test("will open when the controller is clicked when the menu is closed", () => {
      menu.elements.controller.close();
      click(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeTrue();
      expect(menu.focusState).toBe("self");
    });

    test("will close when the controller is clicked when the menu is open", () => {
      menu.elements.controller.open();
      click(menu.dom.controller);

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
    });

    test("will close when a click event is registered outside of the menu", () => {
      menu.elements.controller.open();
      const main = document.querySelector("main");
      click(main);

      expect(menu.elements.controller.isOpen).toBeFalse();
      expect(menu.focusState).toBe("none");
    });
  });
}
