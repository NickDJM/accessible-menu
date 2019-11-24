import Menu from "./menu";
import MenuToggle from "./menuToggle";

const validate = {
  menuItemElement: value => {
    // Ensure value is an HTML element.
    if (!(value instanceof HTMLElement)) {
      throw new TypeError("menuItemElement must be an HTML Element.");
    }
  },
  menuLinkElement: value => {
    if (!(value instanceof HTMLElement)) {
      throw new TypeError("menuLinkElement must be an HTML Element.");
    }
  },
  parentMenu: value => {
    // Ensure value is a Menu element.
    if (!(value instanceof Menu)) {
      throw new TypeError("parentMenu must be a Menu.");
    }
  },
  isSubmenuItem: value => {
    if (typeof value !== "boolean") {
      throw new TypeError("isSubmenuItem must be true or false");
    }
  },
  childMenu: value => {
    // Value can be null.
    if (value === null) return;

    if (!(value instanceof Menu)) {
      throw new TypeError("childMenu must be a Menu.");
    }
  },
  toggle: value => {
    // Value can be null.
    if (value === null) return;

    if (!(value instanceof MenuToggle)) {
      throw new TypeError("toggle must be a MenuToggle.");
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
   * @param {HTMLElement} param0.menuLinkElement - The menu item's link in the DOM.
   * @param {Menu}        param0.parentMenu      - The parent menu.
   * @param {boolean}     param0.isSubmenuItem   - A flag to mark if the menu item is controlling a submenu.
   * @param {Menu}        param0.childMenu       - The child menu.
   * @param {MenuToggle}  param0.toggle          - The controller for the child menu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null
  }) {
    // Run validations.
    validate.menuItemElement(menuItemElement);
    validate.menuLinkElement(menuLinkElement);
    validate.parentMenu(parentMenu);
    validate.isSubmenuItem(isSubmenuItem);
    validate.childMenu(childMenu);
    validate.toggle(toggle);

    this.domElements = {
      menuItem: menuItemElement,
      link: menuLinkElement
    };

    this.elements = {
      parentMenu,
      childMenu,
      toggle
    };

    this.isController = isSubmenuItem;
  }

  /**
   * Initialize the menu item by setting its tab index.
   */
  initialize() {
    this.element.setAttribute("role", "menuitem");
    this.linkElement.tabIndex = -1;
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
  get linkElement() {
    return this.domElements.link;
  }

  /**
   * The item's parent Menu.
   *
   * @returns {Menu} - The parent menu.
   */
  get parentMenu() {
    return this.elements.parentMenu;
  }

  /**
   * The item's child menu.
   *
   * @returns {Menu} - The menu.
   */
  get childMenu() {
    return this.elements.childMenu;
  }

  /**
   * The item's toggle.
   *
   * @returns {MenuToggle} - The toggle.
   */
  get toggle() {
    return this.elements.toggle;
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
   * Focuses the menu item's link.
   */
  focus() {
    this.linkElement.focus();
  }

  /**
   * Blurs the menu item's link.
   */
  blur() {
    this.linkElement.blur();
  }
}

export default MenuItem;
