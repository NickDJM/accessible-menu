/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a DisclosureMenu.
 */
class DisclosureMenuItem extends BaseMenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}                    param0                         - The menu item object.
   * @param {HTMLElement}               param0.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}               param0.menuLinkElement         - The menu item's link in the DOM.
   * @param {DisclosureMenu}            param0.parentMenu              - The parent menu.
   * @param {boolean}                   [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {DisclosureMenu|null}       [param0.childMenu = null]      - The child menu.
   * @param {DisclosureMenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
  }) {
    super({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem,
      childMenu,
      toggle,
    });

    this.initialize();
  }
}

export default DisclosureMenuItem;
