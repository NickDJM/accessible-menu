import BaseMenu from "./_baseMenu";
import Menubar from "./menubar";
import MenuToggle from "./menuToggle";
import { isHTMLElement, isBoolean, isMenu, isMenuToggle } from "./validate";

/**
 * A basic navigation link contained inside of a Menu.
 */
class MenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}          param0                         - The menu item object.
   * @param {HTMLElement}     param0.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     param0.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}        param0.parentMenu              - The parent menu.
   * @param {boolean}         [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {BaseMenu|null}   [param0.childMenu = null]      - The child menu.
   * @param {MenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
  }) {
    // Run validations.
    isHTMLElement({ menuItemElement, menuLinkElement });
    isBoolean({ isSubmenuItem });

    if (childMenu !== null) {
      isMenu({ parentMenu, childMenu });
    } else {
      isMenu({ parentMenu });
    }

    if (toggle !== null) isMenuToggle({ toggle });

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

    this.initialize();
  }

  /**
   * Initialize the menu item by setting its tab index.
   */
  initialize() {
    this.isMenubar = this.elements.parentMenu instanceof Menubar;

    if (this.isMenubar) {
      this.dom.item.setAttribute("role", "none");
      this.dom.link.setAttribute("role", "menuitem");
      this.dom.link.tabIndex = -1;
    }
  }

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
   * Focuses the menu item's link and set proper tabIndex.
   */
  focus() {
    if (this.elements.parentMenu.currentEvent !== "mouse") {
      this.dom.link.focus();
    }

    if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
      this.dom.link.tabIndex = 0;
    }
  }

  /**
   * Blurs the menu item's link and set proper tabIndex.
   */
  blur() {
    if (this.elements.parentMenu.currentEvent !== "mouse") {
      this.dom.link.blur();
    }

    if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
      this.dom.link.tabIndex = -1;
    }
  }
}

export default MenuItem;
