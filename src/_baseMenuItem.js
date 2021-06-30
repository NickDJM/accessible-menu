/* eslint-disable jsdoc/no-undefined-types */

/**
 * A basic navigation link contained inside of a [BaseMenu]{@link BaseMenu.md}.
 */
class BaseMenuItem {
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
    this.domElements = {
      item: menuItemElement,
      link: menuLinkElement,
    };
    this.menuElements = {
      parentMenu,
      childMenu,
      toggle,
    };
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
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The elements within the menu item.
   *
   * @type {object.<BaseMenu,BaseMenuToggle>}
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
   * Focuses the menu item's link if triggering event is valid.
   */
  focus() {
    if (this.elements.parentMenu.shouldFocus) {
      this.dom.link.focus();
    }
  }

  /**
   * Blurs the menu item's link if triggering event is valid.
   */
  blur() {
    if (this.elements.parentMenu.shouldFocus) {
      this.dom.link.blur();
    }
  }
}

export default BaseMenuItem;
