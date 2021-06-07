/* eslint-disable jsdoc/no-undefined-types */

/**
 * A basic navigation link contained inside of a Menu.
 */
class BaseMenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}              param0                         - The menu item object.
   * @param {HTMLElement}         param0.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}         param0.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}            param0.parentMenu              - The parent menu.
   * @param {boolean}             [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {BaseMenu|null}       [param0.childMenu = null]      - The child menu.
   * @param {BaseMenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
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
   * @returns {object} - The DOM elements.
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The elements within the menu item.
   *
   * @returns {object} - The elements.
   */
  get elements() {
    return this.menuElements;
  }

  /**
   * A flag marking a submenu item.
   *
   * @returns {boolean} - The submenu flag.
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
