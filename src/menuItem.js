import Menu from "./menu";
import MenuToggle from "./menuToggle";

// Basic validation for the class.
const validate = {
  menuItemElement: element => {
    // Ensure element is an HTML element.
    if (!(element instanceof HTMLElement)) {
      throw new TypeError("menuItemElement must be an HTML Element.");
    }
  },
  menuLinkElement: element => {
    // Ensure element is an HTML element.
    if (!(element instanceof HTMLElement)) {
      throw new TypeError("menuLinkElement must be an HTML Element.");
    }
  },
  parentMenu: menu => {
    // Ensure menu is a Menu element.
    if (!(menu instanceof Menu)) {
      throw new TypeError("parentMenu must be a Menu.");
    }
  },
  isSubmenuItem: flag => {
    // Ensure flag is a boolean.
    if (typeof flag !== "boolean") {
      throw new TypeError("isSubmenuItem must be true or false");
    }
  },
  childMenu: menu => {
    // Menu can be null.
    if (menu === null) return;

    // Ensure menu is a Menu element.
    if (!(menu instanceof Menu)) {
      throw new TypeError("childMenu must be a Menu.");
    }
  },
  toggle: toggle => {
    // Toggle can be null.
    if (toggle === null) return;

    // Ensure toggle is a MenuToggle element.
    if (!(toggle instanceof MenuToggle)) {
      throw new TypeError("toggle must be a MenuToggle.");
    }
  }
};

/**
 * A basic navigation link contained inside of a Menu.
 */
class MenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}          param0                 - The menu item object.
   * @param {HTMLElement}     param0.menuItemElement - The menu item in the DOM.
   * @param {HTMLElement}     param0.menuLinkElement - The menu item's link in the DOM.
   * @param {Menu}            param0.parentMenu      - The parent menu.
   * @param {boolean}         param0.isSubmenuItem   - A flag to mark if the menu item is controlling a submenu.
   * @param {Menu|null}       param0.childMenu       - The child menu.
   * @param {MenuToggle|null} param0.toggle          - The controller for the child menu.
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

    this.initialize();
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
   * @returns {Menu|null} - The menu.
   */
  get childMenu() {
    return this.elements.childMenu;
  }

  /**
   * The item's toggle.
   *
   * @returns {MenuToggle|null} - The toggle.
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
   * Focuses the menu item's link and set proper tabIndex.
   */
  focus() {
    this.linkElement.focus();

    if (this.parentMenu.isTopLevel) {
      this.linkElement.tabIndex = 0;
    }
  }

  /**
   * Blurs the menu item's link and set proper tabIndex.
   */
  blur() {
    this.linkElement.blur();

    if (this.parentMenu.isTopLevel) {
      this.linkElement.tabIndex = -1;
    }
  }
}

export default MenuItem;
