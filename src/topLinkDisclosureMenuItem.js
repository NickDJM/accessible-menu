/* global TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a TopLinkDisclosureMenu.
 *
 * @extends BaseMenuItem
 */
class TopLinkDisclosureMenuItem extends BaseMenuItem {
  /**
   * Constructs a new `TopLinkDisclosureMenuItem`.
   *
   * @param {object}                       options                         - The options for generating the menu item.
   * @param {HTMLElement}                  options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}                  options.menuLinkElement         - The menu item's link in the DOM.
   * @param {TopLinkDisclosureMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}                      [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?TopLinkDisclosureMenu}       [options.childMenu = null]      - The child menu.
   * @param {?TopLinkDisclosureMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}                      [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   * @param {?BaseMenuItem}                [options.submenuSibling = null] - The separate menu item that controls the submenu beside this link.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
    initialize = true,
    submenuSibling = null,
  }) {
    super({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem,
      childMenu,
      toggle,
      submenuSibling,
    });

    if (initialize) {
      this.initialize();
    }
  }
}

export default TopLinkDisclosureMenuItem;
