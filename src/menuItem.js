import Menu from "menu.js";

export class MenuItem {
  /**
   * Construct the menu item.
   *
   * @param {object} menuItemElement - The menu item in the DOM.
   * @param {Menu}   parentMenu      - The parent menu.
   */
  constructor(menuItemElement, parentMenu) {
    this.domElements = {
      menuItem: menuItemElement,
      link: menuItemElement.querySelector("a")
    };

    this.elements = {
      parent: parentMenu
    };
  }

  /**
   * Initialize the menu item by setting its tab index.
   */
  initialize() {
    this.element.setAttribute("role", "menuitem");
    this.link.tabIndex = -1;
  }

  /**
   * The menu item element in the DOM.
   *
   * @returns {object} - The menu item element.
   */
  get element() {
    return this.domElements.menuItem;
  }

  /**
   * The link element inside the menu item.
   *
   * @returns {object} - The link.
   */
  get link() {
    return this.domElements.link;
  }

  /**
   * The item's parent Menu.
   *
   * @returns {Menu} - The parent menu.
   */
  get parentMenu() {
    return this.elements.parent;
  }

  /**
   * Focuses the menu item's link.
   */
  focus() {
    this.element.querySelector("a").focus();
  }
}
