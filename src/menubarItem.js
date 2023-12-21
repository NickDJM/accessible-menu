// eslint-disable-next-line no-unused-vars
/* global Menubar, MenubarToggle */

import BaseMenuItem from "./_baseMenuItem.js";

/**
 * A basic navigation link contained inside of a Menubar.
 *
 * @extends BaseMenuItem
 */
class MenubarItem extends BaseMenuItem {
  /**
   * Constructs a new `MenubarItem`.
   *
   * @param {object}         options                         - The options for generating the menu item.
   * @param {HTMLElement}    options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}    options.menuLinkElement         - The menu item's link in the DOM.
   * @param {Menubar}        options.parentMenu              - The parent menu.
   * @param {boolean}        [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?Menubar}       [options.childMenu = null]      - The child menu.
   * @param {?MenubarToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}        [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
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
   * Initialize will call the BaseMenuItem's initialize method
   * as well as set the menu item's `role` to "none",
   * the menu link's `role` to "menuitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   */
  initialize() {
    super.initialize();

    this.dom.item.setAttribute("role", "none");
    this.dom.link.setAttribute("role", "menuitem");
    this.dom.link.tabIndex = -1;
  }

  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's focus method
   * as well as set the menu link's `tabIndex` to 0 if the parent menu
   * is the root menu.
   *
   * @public
   */
  focus() {
    super.focus();

    if (this.elements.parentMenu.isTopLevel) {
      this.dom.link.tabIndex = 0;
    }
  }

  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's blur method
   * as well as set the menu link's `tabIndex` to -1 if the parent menu
   * is the root menu.
   *
   * @public
   */
  blur() {
    super.blur();

    if (this.elements.parentMenu.isTopLevel) {
      this.dom.link.tabIndex = -1;
    }
  }
}

export default MenubarItem;
