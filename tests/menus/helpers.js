/**
 * Helper functions for testing menus.
 */

import BaseMenu from "../../src/_baseMenu.js";

/**
 * Initialize a menu for testing.
 *
 * This is required because BaseMenu does not auto-initialize.
 *
 * @param {BaseMenu} menu - The menu to initialize.
 */
export function initializeMenu(menu) {
  // Initialize the menu and its children.
  menu.initialize();

  menu.elements.menuItems.forEach((item) => {
    item.initialize();
  });
  menu.elements.submenuToggles.forEach((toggle) => {
    initializeMenu(toggle.elements.controlledMenu);
    toggle.initialize();
  });

  // Initialize the menu's controller if it is a top-level menu.
  if (menu.isTopLevel && menu.elements.controller) {
    menu.elements.controller.initialize();
  }

  menu._handleFocus();
  menu._handleClick();
  menu._handleHover();
  menu._handleKeydown();
  menu._handleKeyup();
}
