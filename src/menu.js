import MenuItem from "./menuItem";
import MenuToggle from "./menuToggle";
import { keyPress, preventEvent } from "./eventHandlers";

// Custom validation for params.
const validate = {
  menuElement: value => {
    // Ensure value is an HTML element.
    if (!(value instanceof HTMLElement)) {
      throw new TypeError("menuElement must be an HTML Element.");
    }
  },
  menuItemSelector: value => {
    // Ensure value is a string.
    if (typeof value !== "string") {
      throw new TypeError("menuItemSelector must be a CSS selector string.");
    }
  },
  hasSubmenus: (container, toggle, menu) => {
    if (container === null && toggle === null && menu === null) return;

    // Ensure container is a string.
    if (typeof container !== "string") {
      throw new TypeError("submenuItemSelector must be a CSS selector string.");
    }

    // Ensure toggle is a string.
    if (typeof container !== "string") {
      throw new TypeError(
        "submenuToggleSelector must be a CSS selector string."
      );
    }

    // Ensure menu is a string.
    if (typeof menu !== "string") {
      throw new TypeError("submenuSelector must be a CSS selector string.");
    }
  },
  submenuOpenClass: value => {
    // Ensure value is a string.
    if (typeof value !== "string") {
      throw TypeError("submenuOpenClass must be a string.");
    }

    // Ensure value is a valid CSS class name.
    const invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");
    if (invalidCharacters.length > 0) {
      throw Error("submenuOpenClass must be a valid CSS class.");
    }
  },
  isTopLevel: value => {
    // Ensure value is a string.
    if (typeof value !== "boolean") {
      throw new TypeError("isTopLevel must be true or false");
    }
  },
  isDropdown: (controller, container) => {
    // Values are allowed to be null if both are null.
    if (controller === null && container === null) return;

    // Ensure value is an HTML element.
    if (!(controller instanceof HTMLElement)) {
      throw new TypeError(
        "controllerElement must be an HTML Element if containerElement is provided."
      );
    }

    if (!(container instanceof HTMLElement)) {
      throw new TypeError(
        "containerElement must be an HTML Element if controllerElement is provided."
      );
    }
  }
};

class Menu {
  /**
   * Constructs the menu.
   *
   * @param {object}       param0                       - The menu object.
   * @param {HTMLElement}  param0.menuElement           - The menu element in the DOM.
   * @param {string}       param0.menuItemSelector      - The selector string for menu items.
   * @param {string}       param0.submenuItemSelector   - The selector string for submenu items.
   * @param {string}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
   * @param {string}       param0.submenuSelector       - The selector string for the submenu itself.
   * @param {string}       param0.submenuOpenClass      - The class to use when a submenu is open.
   * @param {boolean}      param0.isTopLevel            - Flags the menu as a top-level menu.
   * @param {HTMLElement}  param0.controllerElement     - The element controlling the menu in the DOM.
   * @param {HTMLElement}  param0.containerElement      - The element containing the menu in the DOM.
   */
  constructor({
    menuElement,
    menuItemSelector,
    submenuItemSelector = null,
    submenuToggleSelector = null,
    submenuSelector = null,
    submenuOpenClass = "show",
    isTopLevel = true,
    controllerElement = null,
    containerElement = null
  }) {
    // Run validations.
    validate.menuElement(menuElement);
    validate.menuItemSelector(menuItemSelector);
    validate.hasSubmenus(
      submenuItemSelector,
      submenuToggleSelector,
      submenuSelector
    );
    validate.submenuOpenClass(submenuOpenClass);
    validate.isTopLevel(isTopLevel);
    validate.isDropdown(controllerElement, containerElement);

    this.domElements = {
      menu: menuElement,
      controller: controllerElement,
      container: containerElement,
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
      menuToggles: []
    };
    this.focussedChild = -1;
    this.focusState = "none";
    this.openClass = submenuOpenClass;
    this.root = isTopLevel;
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

    if (this.controllerElement && this.containerElement) {
      // Create a new MenuToggle to control the menu.
      const toggle = new MenuToggle({
        menuToggleElement: this.controllerElement,
        parentElement: this.containerElement,
        menu: this,
        openClass: this.openClass
      });
      toggle.initialize();
    }
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
   * The menu's controller element in the DOM.
   *
   * @returns {HTMLElement} - The controller element.
   */
  get controllerElement() {
    return this.domElements.controller;
  }

  /**
   * The menu's container element in the DOM.
   *
   * @returns {HTMLElement} - The container element.
   */
  get containerElement() {
    return this.domElements.container;
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
   * The menu toggles contained in the menu.
   *
   * @returns {MenuToggle[]} - The menu toggles.
   */
  get menuToggles() {
    return this.elements.menuToggles;
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
   * The flag to mark as a top-level menu.
   *
   * @returns {boolean} - The top-level flag.
   */
  get isTopLevel() {
    return this.root;
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

  set isTopLevel(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("Top-level flag must be true or false.");
    }

    this.root = value;
  }

  /**
   * Creates and initializes all menu items.
   */
  createMenuItems() {
    this.menuItemElements.forEach(element => {
      // Create a new MenuItem.
      const menuItem = new MenuItem({
        menuItemElement: element,
        parentMenu: this
      });

      // Add the item to the list of menu items.
      this.elements.menuItems.push(menuItem);

      // Initialize the menu item.
      menuItem.initialize();

      // If the menu item is a dropdown, create a SubmenuItem,
      // otherwise create a normal MenuItem.
      if (this.submenuItemElements.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selector["submenu-toggle"]);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selector.submenu);

        // Create the new Menu and initialize it.
        const menu = new Menu({
          menuElement: submenu,
          menuItemSelector: this.selector["menu-items"],
          submenuItemSelector: this.selector["submenu-items"],
          submenuToggleSelector: this.selector["submenu-toggle"],
          submenuSelector: this.selector.submenu,
          submenuOpenClass: this.openClass,
          isTopLevel: false
        });
        menu.initialize();

        // Create the new MenuToggle.
        const toggle = new MenuToggle({
          menuToggleElement: toggler,
          parentElement: element,
          menu: menu,
          openClass: this.openClass,
          parentMenu: this
        });
        toggle.initialize();

        // Add it to the list of submenu items.
        this.elements.menuToggles.push(toggle);
      }
    });
  }

  /**
   * Sets up the hijacked keydown events.
   */
  handleKeydown() {
    this.element.addEventListener("keydown", event => {
      // Key uses event.key or event.keyCode to support older browsers.
      const key = keyPress(event);
      const { altKey, crtlKey, metaKey } = event;
      const modifier = altKey || crtlKey || metaKey;

      if (this.currentFocus === "none") {
        if (key === "Enter" || key === "Space") {
          // The Enter & Space keys should enter the menu.
          preventEvent(event);
          this.currentFocus = "self";
          this.focusFirstChild();
        }
      } else if (this.currentFocus === "self") {
        if (key === "Escape") {
          // The Escape key should exit the menu.
          preventEvent(event);
          this.focus();
          this.currentFocus = "none";
        } else if (!this.isTopLevel && key === "ArrowUp") {
          // The Up Arrow key should focus the previous menu item in submenus.
          preventEvent(event);
          this.focusPreviousChild();
        } else if (this.isTopLevel && key === "ArrowRight") {
          // The Right Arrow key should focus the next menu item.
          preventEvent(event);
          this.focusNextChild();
        } else if (!this.isTopLevel && key === "ArrowDown") {
          // The Down Arrow key should focus the next item in submenus.
          preventEvent(event);
          this.focusNextChild();
        } else if (this.isTopLevel && key === "ArrowLeft") {
          // The Left Arrow key should focus the previous menu item.
          preventEvent(event);
          this.focusPreviousChild();
        } else if (key === "Home") {
          // The Home key should focus the first menu item.
          preventEvent(event);
          this.focusFirstChild();
        } else if (key === "End") {
          // The End key should focus the last menu item.
          preventEvent(event);
          this.focusLastChild();
        } else if (key === "Character" && !modifier) {
          // The A-Z keys should focus the next menu item starting with that letter.
          preventEvent(event);
          this.focusNextChildWithCharacter(event.key);
        }
      }

      if (this.currentFocus !== "none") {
        if (key === "Tab") {
          // The Tab key should select the next element outside of the menu.
          this.blur();
          this.closeChildren();
        }
      }
    });
  }

  /**
   * Handle click events required for proper menu usage.
   */
  handleClick() {
    document.addEventListener("click", event => {
      if (
        !this.element.contains(event.target) &&
        this.element !== event.target
      ) {
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
   * Focus the menu's next child starting with a specific letter.
   *
   * @param {string} char - The character to look for.
   */
  focusNextChildWithCharacter(char) {
    // Ensure the character is lowercase just to be safe.
    const match = char.toLowerCase();

    let index = this.focussedChild + 1;
    let found = false;

    console.log(`Looking for "${match}"...`);

    while (!found && index < this.menuItems.length) {
      // Ensure the text in the item is lowercase just to be safe.
      const text = this.menuItems[index].element.innerText.toLowerCase();

      console.log(`Searching "${text}" for "${match}"...`);

      // Focus the child if the text matches, otherwise move on.
      if (text.startsWith(match)) {
        console.log(`Found "${match}"!`);

        found = true;
        this.focussedChild = index;
        this.focusCurrentChild();
      }

      index++;
    }
  }

  /**
   * Close all submenu children.
   */
  closeChildren() {
    this.menuToggles.forEach(toggle => toggle.close());
  }
}

export default Menu;
