import Menu from "./menu";

// Custom validation for params.
const validate = {
  menuItemElement: value => {
    // Ensure value is an HTML element.
    if (!(value instanceof HTMLElement)) {
      throw new TypeError("menuItemElement must be an HTML Element.");
    }
  },
  parentMenu: value => {
    // Ensure value is an Menu element.
    if (!(value instanceof Menu)) {
      throw new TypeError("parentMenu must be a Menu.");
    }
  }
};

/**
 * A basic navigation link contained inside of a Menu.
 *
 * Must be initialized to be fully functional.
 */
class MenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}      param0                 - The menu item object.
   * @param {HTMLElement} param0.menuItemElement - The menu item in the DOM.
   * @param {Menu}        param0.parentMenu      - The parent menu.
   */
  constructor({ menuItemElement, parentMenu }) {
    // Run validations.
    validate.menuItemElement(menuItemElement);
    validate.parentMenu(parentMenu);

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
   * @returns {HTMLElement} - The menu item element.
   */
  get element() {
    return this.domElements.menuItem;
  }

  /**
   * The link element inside the menu item.
   *
   * @returns {HTMLElement} - The link.
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

export default MenuItem;
