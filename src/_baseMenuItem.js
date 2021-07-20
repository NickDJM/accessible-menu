/* eslint-disable jsdoc/no-undefined-types */

/**
 * A basic navigation link contained inside of a {@link BaseMenu}.
 */
class BaseMenuItem {
  domElements = {
    item: null,
    link: null,
  };

  menuElements = {
    parentMenu: null,
    childMenu: null,
    toggle: null,
  };

  /**
   * @inheritdoc
   *
   * @param {object}          options                         - The options for generating the menu item.
   * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
   * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
  }) {
    // Set DOM elements.
    this.domElements.item = menuItemElement;
    this.domElements.link = menuLinkElement;

    // Set menu elements.
    this.menuElements.parentMenu = parentMenu;
    this.menuElements.childMenu = childMenu;
    this.menuElements.toggle = toggle;

    this.isController = isSubmenuItem;
  }

  /**
   * Initialize the menu item.
   */
  initialize() {}

  /**
   * The DOM elements within the menu item.
   *
   * @type {object.<HTMLElement>}
   * @property {HTMLElement} item - The menu item.
   * @property {HTMLElement} link - The menu item's link.
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {object.<BaseMenu,BaseMenuToggle>}
   * @property {BaseMenu}        parentMenu - The menu containing this menu item.
   * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
   * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
   */
  get elements() {
    return this.menuElements;
  }

  /**
   * A flag marking a submenu item.
   *
   * @type {boolean}
   */
  get isSubmenuItem() {
    return this.isController;
  }

  /**
   * Focuses the menu item's link if the parent menu's
   * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
   */
  focus() {
    if (this.elements.parentMenu.shouldFocus) {
      this.dom.link.focus();
    }
  }

  /**
   * Blurs the menu item's link if the parent menu's
   * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
   */
  blur() {
    if (this.elements.parentMenu.shouldFocus) {
      this.dom.link.blur();
    }
  }
}

export default BaseMenuItem;
