// eslint-disable-next-line no-unused-vars
/* global TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a {@link TopLinkDisclosureMenu}.
 *
 * @extends BaseMenuItem
 */
class TopLinkDisclosureMenuItem extends BaseMenuItem {
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {Object<TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle>}
   *
   * @protected
   *
   * @property {TopLinkDisclosureMenu}                   parentMenu - The menu containing this menu item.
   * @property {?TopLinkDisclosureMenu}                  childMenu  - The menu contained within this menu item.
   * @property {?TopLinkDisclosureMenuToggle}            toggle     - The menu toggle within this menu item that controls the `childMenu`.
   * @property {?TopLinkDisclosureMenuItem} sibling    - The sibling menu item that is a submenu item.
   */
  _elements = {
    parentMenu: null,
    childMenu: null,
    toggle: null,
    sibling: null,
  };

  /**
   * Constructs the menu item.
   *
   * @param {object}                           options                         - The options for generating the menu item.
   * @param {HTMLElement}                      options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}                      options.menuLinkElement         - The menu item's link in the DOM.
   * @param {TopLinkDisclosureMenu}            options.parentMenu              - The parent menu.
   * @param {boolean}                          [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {TopLinkDisclosureMenu|null}       [options.childMenu = null]      - The child menu.
   * @param {TopLinkDisclosureMenuToggle|null} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}                          [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   * @param {TopLinkDisclosureMenuItem|null}   [options.submenuSibling = null] - The sibling menu item that controls a submenu.
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
    });

    // Set menu elements.
    this._elements.parentMenu = parentMenu;
    this._elements.childMenu = childMenu;
    this._elements.toggle = toggle;
    this._elements.sibling = submenuSibling;

    if (initialize) {
      this.initialize();
    }
  }
}

export default TopLinkDisclosureMenuItem;
