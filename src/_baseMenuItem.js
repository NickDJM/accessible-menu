// eslint-disable-next-line no-unused-vars
/* global BaseMenu BaseMenuToggle */

/**
 * A basic navigation link contained inside of a {@link BaseMenu}.
 */
class BaseMenuItem {
  /**
   * The DOM elements within the menu item.
   *
   * @type {Object<HTMLElement>}
   *
   * @protected
   *
   * @property {HTMLElement} item - The menu item.
   * @property {HTMLElement} link - The menu item's link.
   */
  _dom = {
    item: null,
    link: null,
  };

  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @protected
   *
   * @property {BaseMenu}        parentMenu - The menu containing this menu item.
   * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
   * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
   */
  _elements = {
    parentMenu: null,
    childMenu: null,
    toggle: null,
  };

  /**
   * A flag marking a submenu item.
   *
   * @type {boolean}
   */
  _submenu = false;

  /**
   * Constructs the menu item.
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
    this._dom.item = menuItemElement;
    this._dom.link = menuLinkElement;

    // Set menu elements.
    this._elements.parentMenu = parentMenu;
    this._elements.childMenu = childMenu;
    this._elements.toggle = toggle;

    this._submenu = isSubmenuItem;
  }

  /**
   * Initialize the menu item.
   */
  initialize() {}

  /**
   * The DOM elements within the menu item.
   *
   * @type {Object<HTMLElement>}
   *
   * @readonly
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }

  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @readonly
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }

  /**
   * A flag marking a submenu item.
   *
   * @type {boolean}
   *
   * @readonly
   *
   * @see _submenu
   */
  get isSubmenuItem() {
    return this._submenu;
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
