/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a {@link Treeview}.
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
   * Initialize the menu item.
   *
   * Initialize will call the {@link BaseMenuItem#initialize|BaseMenuItem's initialize method}
   * as well as set the menu item's `role` to "none",
   * the menu link's `role` to "treeitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   */
  initialize() {
    super.initialize();

    this.dom.item.setAttribute("role", "none");
    this.dom.link.setAttribute("role", "treeitem");
    this.dom.link.tabIndex = -1;
  }

  /**
   * Focuses the menu item's link if the parent menu's
   * {@link Menubar#shouldFocus|shouldFocus} value is `true`.
   *
   * This will call the {@link BaseMenuItem#focus|BaseMenuItem's focus method}
   * as well as set the menu link's `tabIndex` to 0.
   */
  focus() {
    super.focus();

    this.dom.link.tabIndex = 0;
  }

  /**
   * Blurs the menu item's link if the parent menu's
   * {@link Menubar#shouldFocus|shouldFocus} value is `true`.
   *
   * This will call the {@link BaseMenuItem#blur|BaseMenuItem's blur method}
   * as well as set the menu link's `tabIndex` to -1.
   */
  blur() {
    super.blur();

    this.dom.link.tabIndex = -1;
  }
}

export default TreeviewItem;
