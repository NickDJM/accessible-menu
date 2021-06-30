/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a [Treeview]{@link Treeview.md}.
 *
 * @extends BaseMenuItem
 */
class TreeviewItem extends BaseMenuItem {
  /**
   * @inheritdoc
   *
   * @param {object}              options                         - The options for generating the menu item.
   * @param {HTMLElement}         options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}         options.menuLinkElement         - The menu item's link in the DOM.
   * @param {Treeview}            options.parentMenu              - The parent menu.
   * @param {boolean}             [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {Treeview|null}       [options.childMenu = null]      - The child menu.
   * @param {TreeviewToggle|null} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}             [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
    initialize = true,
  }) {
    super({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem,
      childMenu,
      toggle,
    });

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Initialize the menu item by setting its role and tab index.
   */
  initialize() {
    super.initialize();

    this.dom.item.setAttribute("role", "none");
    this.dom.link.setAttribute("role", "treeitem");
    this.dom.link.tabIndex = -1;
  }

  /**
   * Focuses the menu item's link and set proper tabIndex.
   */
  focus() {
    super.focus();

    this.dom.link.tabIndex = 0;
  }

  /**
   * Blurs the menu item's link and set proper tabIndex.
   */
  blur() {
    super.blur();

    this.dom.link.tabIndex = -1;
  }
}

export default TreeviewItem;
