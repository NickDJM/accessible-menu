import MenuItem from "menuItem.js";
import SubmenuItem from "submenuItem.js";

export class Menu {
  /**
   * Constructs the menu.
   *
   * @param {object} menuElement           - The menu element in the DOM.
   * @param {string} menuItemSelector      - The selector string for menu items.
   * @param {string} submenuItemSelector   - The selector string for submenu items.
   * @param {string} submenuToggleSelector - The selector string for submenu toggle triggers.
   * @param {string} submenuSelector       - The selector string for the submenu itself.
   * @param {string} submenuOpenClass      - The class to use when a submenu is open.
   */
  constructor(
    menuElement,
    menuItemSelector,
    submenuItemSelector,
    submenuToggleSelector,
    submenuSelector,
    submenuOpenClass = "show"
  ) {
    this.domElements = {
      menu: menuElement,
      menuItems: Array.from(
        menuElement.querySelectorAll(menuItemSelector)
      ).filter(item => item.parentElement === menuElement),
      submenuItems: Array.from(
        menuElement.querySelectorAll(submenuItemSelector)
      ).filter(item => item.parentElement === menuElement)
    };
    this.domSelectors = {
      "menu-items": menuItemSelector,
      "submenu-items": submenuItemSelector,
      "submenu-toggle": submenuToggleSelector,
      submenu: submenuSelector
    };
    this.elements = {
      menuItems: [],
      submenuItems: []
    };
    this.focussedChild = -1;
    this.focusState = "none";
    this.openClass = submenuOpenClass;
  }

  /**
   * Initializes the menu with proper tab indexing and properties.
   *
   * This will also initialize all menu items and sub menus.
   *
   * @returns {undefined}
   */
  initialize() {
    this.element.setAttribute("role", "menu");
    this.element.tabIndex = 0;

    this.createMenuItems();
    this.handleKeydown();
    this.handleClick();
  }

  /**
   * The menu element in the DOM.
   *
   * @returns {object} - The menu.
   */
  get element() {
    return this.domElements.menu;
  }

  /**
   * The menu item DOM elements contained in the menu.
   *
   * @returns {object[]} - The menu items.
   */
  get menuItemElements() {
    return this.domElements.menuItems;
  }

  /**
   * The submenu item DOM elements contained in the menu.
   *
   * @returns {object[]} - The submenu items.
   */
  get submenuItemElements() {
    return this.domElements.submenuItems;
  }

  /**
   * The menu items contained in the menu.
   *
   * @returns {MenuItem[]} - The menu items.
   */
  get menuItems() {
    return this.elements.menuItems;
  }

  /**
   * The submenu items contained in the menu.
   *
   * @returns {SubmenuItem[]} - The submenu items.
   */
  get submenuItems() {
    return this.element.submenuItems;
  }

  /**
   * The DOM Selectors for the menu.
   *
   * @returns {object} - The DOM Selectors.
   */
  get selector() {
    return this.domSelectors;
  }

  /**
   * The focus state of the menu.
   *
   * @returns {string} - The focus state (self, child, none).
   */
  get currentFocus() {
    return this.focusState;
  }

  /**
   * The class used for open submenus.
   *
   * @returns {string} - The open class.
   */
  get openClass() {
    return this.submenuOpenClass;
  }

  /**
   * Set the focus state of the menu.
   *
   * @param {boolean} state - The focus state (self, child, none).
   */
  set currentFocus(state) {
    const states = ["self", "child", "none"];

    if (!states.includes(state)) {
      throw new Error("Focus state must be 'self', 'child', or 'none'.");
    }

    this.focusState = state;
  }

  /**
   * Set the class used for open submenus.
   *
   * @param {string} value - The open class.
   */
  set openClass(value) {
    if (typeof value !== "string") {
      throw new TypeError("Class must be a string.");
    }

    this.submenuOpenClass = value;
  }

  /**
   * Creates and initializes all menu items.
   */
  createMenuItems() {
    this.menuItemElements.forEach(element => {
      let menuItem;

      // If the menu item is a dropdown, create a SubmenuItem,
      // otherwise create a normal MenuItem.
      if (this.submenuItemElements.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selector["submenu-toggle"]);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selector.submenu);

        // Create the new Menu and initialize it.
        const menu = new Menu(
          submenu,
          this.selector["menu-items"],
          this.selector["submenu-items"],
          this.selector["submenu-toggle"],
          this.selector.submenu,
          this.openClass
        );
        menu.initialize();

        // Create a new SubmenuItem.
        menuItem = new SubmenuItem(
          element,
          this,
          toggler,
          menu,
          this.openClass
        );

        // Add it to the list of submenu items.
        this.elements.submenuItems.push(menuItem);
      } else {
        // Create a new MenuItem.
        menuItem = new MenuItem(element, this);
      }

      // Add the item to the list of menu items.
      this.elements.menuItems.push(menuItem);

      // Initialize the menu item.
      menuItem.initialize();
    });
  }

  /**
   * Sets up the hijacked keydown events.
   */
  handleKeydown() {
    /**
     * Short cut to preventing default event actions.
     *
     * @param {object} event - The event.
     */
    function preventDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.element.addEventListener("keydown", event => {
      const { key, code, shiftKey } = event;

      if (this.currentFocus === "none") {
        if (key === "Enter" || (key === " " && code === "Space")) {
          // The Enter & Space keys should enter the menu.
          preventDefault(event);
          this.currentFocus = "self";
          this.focusFirstChild();
        }
      } else if (this.currentFocus === "self") {
        if (key === "Escape") {
          // The Escape key should exit the menu.
          preventDefault(event);
          this.currentFocus = "none";
          this.focus();
        } else if (key === "ArrowDown" || (key === "Tab" && !shiftKey)) {
          // The Down Arrow and Tab keys should focus the next menu item.
          preventDefault(event);
          this.focusNextChild();
        } else if (key === "ArrowUp" || (key === "Tab" && shiftKey)) {
          // The Up Arrow and Shift + Tab keys should focus the previous menu item.
          preventDefault(event);
          this.focusPreviousChild();
        } else if (key === "Home") {
          // The Home key should focus the first menu item.
          preventDefault(event);
          this.focusFirstChild();
        } else if (key === "End") {
          // The End key should focus the last menu item.
          preventDefault(event);
          this.focusLastChild();
        }
      }
    });
  }

  /**
   * Handle click events required for proper menu usage.
   */
  handleClick() {
    document.addEventListener("click", event => {
      if (!this.element.contains(event.target)) {
        this.blur();
        this.closeChildren();
      }
    });
  }

  /**
   * Focus the menu.
   */
  focus() {
    this.focussedChild = 0;
    this.currentFocus = "self";
    this.element.focus();
  }

  /**
   * Unfocus the menu.
   */
  blur() {
    this.focussedChild = -1;
    this.currentFocus = "none";
    this.element.blur();
  }

  /**
   * Focues the menu's first child.
   */
  focusFirstChild() {
    this.focussedChild = 0;
    this.focusCurrentChild();
  }

  /**
   * Focus the menu's last child.
   */
  focusLastChild() {
    this.focussedChild = this.menuItems.length - 1;
    this.focusCurrentChild();
  }

  /**
   * Focus the menu's next child.
   */
  focusNextChild() {
    if (this.focussedChild === this.menuItems.length - 1) {
      this.focusFirstChild();
    } else {
      this.focussedChild = this.focussedChild + 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's last child.
   */
  focusPreviousChild() {
    if (this.focussedChild === 0) {
      this.focusLastChild();
    } else {
      this.focussedChild = this.focussedChild - 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's current child.
   */
  focusCurrentChild() {
    if (this.focussedChild !== -1) {
      this.menuItems[this.focussedChild].focus();
    }
  }

  /**
   * Close all submenu children.
   */
  closeChildren() {
    this.elements.submenuItems.forEach(submenu => submenu.close());
  }
}
