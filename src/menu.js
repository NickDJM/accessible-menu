import MenuItem from "./menuItem";
import SubmenuItem from "./submenuItem";
import Submenu from "./submenu";
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
  openClass: value => {
    // Ensure value is a string.
    if (typeof value !== "string") {
      throw TypeError("openClass must be a string.");
    }

    // Ensure value is a valid CSS class name.
    const invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");
    if (invalidCharacters.length > 0) {
      throw Error("openClass must be a valid CSS class.");
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

/**
 * An accessible navigation element in the DOM.
 *
 * Must be initialized to be fully functional.
 */
class Menu {
  /**
   * {@inheritdoc}
   *
   * @param {object}            param0                       - The menu object.
   * @param {HTMLElement}       param0.menuElement           - The menu element in the DOM.
   * @param {string|null}       param0.menuItemSelector      - The selector string for menu items.
   * @param {string|null}       param0.submenuItemSelector   - The selector string for submenu items.
   * @param {string|null}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
   * @param {string}            param0.submenuSelector       - The selector string for the submenu itself.
   * @param {string}            param0.openClass             - The class to use when a submenu is open.
   * @param {HTMLElement|null}  param0.controllerElement     - The element controlling the menu in the DOM.
   * @param {HTMLElement|null}  param0.containerElement      - The element containing the menu in the DOM.
   */
  constructor({
    menuElement,
    menuItemSelector,
    submenuItemSelector = null,
    submenuToggleSelector = null,
    submenuSelector = null,
    openClass = "show",
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
    validate.openClass(openClass);
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
      menuToggles: [],
      controller: null
    };
    this.focussedChild = -1;
    this.focusState = "none";
    this.openClass = openClass;
  }

  /**
   * Initializes the menu with proper tab indexing and properties.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    this.element.setAttribute("role", "menubar");
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

      this.elements.controller = toggle;
    }
  }

  /**
   * The menu element in the DOM.
   *
   * @returns {HTMLElement} - The menu.
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
   * @returns {HTMLElement[]} - The menu items.
   */
  get menuItemElements() {
    return this.domElements.menuItems;
  }

  /**
   * The submenu item DOM elements contained in the menu.
   *
   * @returns {HTMLElement[]} - The submenu items.
   */
  get submenuItemElements() {
    return this.domElements.submenuItems;
  }

  /**
   * The menu items contained in the menu.
   *
   * @returns {MenuItem|SubmenuItem[]} - The menu items.
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
   * The menu's controller toggle.
   *
   * @returns {MenuToggle} - The toggle.
   */
  get controller() {
    return this.elements.controller;
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
   * The currently focussed menu item.
   *
   * @returns {MenuItem|SubmenuItem} - The menu item.
   */
  get currentMenuItem() {
    return this.menuItems[this.focussedChild];
  }

  /**
   * Set the focus state of the menu.
   *
   * @param {string} value - The focus state (self, child, none).
   */
  set currentFocus(value) {
    const states = ["self", "child", "none"];

    if (!states.includes(value)) {
      throw new Error("Focus state must be 'self', 'child', or 'none'.");
    }

    this.focusState = value;
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

      if (this.submenuItemElements.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selector["submenu-toggle"]);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selector.submenu);

        // Create the new Menu and initialize it.
        const menu = new Submenu({
          menuElement: submenu,
          menuItemSelector: this.selector["menu-items"],
          submenuItemSelector: this.selector["submenu-items"],
          submenuToggleSelector: this.selector["submenu-toggle"],
          submenuSelector: this.selector.submenu,
          submenuOpenClass: this.openClass,
          parentMenu: this
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

        menuItem = new SubmenuItem({
          menuItemElement: element,
          parentMenu: this,
          childMenu: menu,
          toggle
        });
      } else {
        // Create a new MenuItem.
        menuItem = new MenuItem({
          menuItemElement: element,
          parentMenu: this
        });
      }

      menuItem.initialize();

      this.elements.menuItem.push(menuItem);
    });
  }

  /**
   * Sets up the hijacked keydown events.
   */
  handleKeydown() {
    this.element.addEventListener("keydown", event => {
      const key = keyPress(event);
      const { altKey, crtlKey, metaKey } = event;
      const modifier = altKey || crtlKey || metaKey;

      if (this.currentFocus === "none") {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - Opens submenu and moves focus to first item in the submenu.
          preventEvent(event);
          this.currentFocus = "self";
          this.focusFirstChild();
        }
      } else if (this.currentFocus === "self") {
        if (key === "RightArrow") {
          // Hitting the Right Arrow:
          // - Moves focus to the next item in the menubar.
          // - If focus is on the last item, moves focus to the first item.
          preventEvent(event);
          this.focusNextChild();
        } else if (key === "LeftArrow") {
          // Hitting the Left Arrow:
          // - Moves focus to the previous item in the menubar.
          // - If focus is on the first item, moves focus to the last item.
          preventEvent(event);
          this.focusPreviousChild();
        } else if (key === "DownArrow") {
          // Hitting the Down Arrow:
          // - Opens submenu and moves focus to first item in the submenu.
          if (this.currentMenuItem instanceof SubmenuItem) {
            this.currentMenuItem.toggle.open();
            this.currentMenuItem.childMenu.focusFirstChild();
          }
        } else if (key === "UpArrow") {
          // Hitting the Up Arrow:
          // - Opens submenu and moves focus to last item in the submenu.
          if (this.currentMenuItem instanceof SubmenuItem) {
            this.currentMenuItem.toggle.open();
            this.currentMenuItem.childMenu.focusLastChild();
          }
        } else if (key === "Home") {
          // Hitting Home:
          // - Moves focus to first item in the menubar.
          preventEvent(event);
          this.focusFirstChild();
        } else if (key === "End") {
          // Hitting End:
          // - Moves focus to last item in the menubar.
          preventEvent(event);
          this.focusLastChild();
        } else if (key === "Character" && !modifier) {
          // Hitting Character:
          // - Moves focus to next item in the menubar having a name that starts with the typed character.
          // - If none of the items have a name starting with the typed character, focus does not move.
          preventEvent(event);
          this.focusNextChildWithCharacter(event.key);
        }
      }

      if (this.currentFocus !== "none") {
        if (key === "Tab") {
          // Hitting Tab:
          // - Moves focus out of the menu.
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

        if (this.controller) {
          this.controller.close();
        }
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

    while (!found && index < this.menuItems.length) {
      // Ensure the text in the item is lowercase just to be safe.
      const text = this.menuItems[index].element.innerText.toLowerCase();

      // Focus the child if the text matches, otherwise move on.
      if (text.startsWith(match)) {
        found = true;
        this.focussedChild = index;
        this.focusCurrentChild();
      }

      index++;
    }
  }

  /**
   * Focus the menu's controller.
   */
  focusController() {
    if (this.controllerElement) {
      this.controllerElement.focus();
      this.currentFocus = "none";
    }
  }

  /**
   * Focus the menu's container.
   */
  focusContainer() {
    if (this.containerElement) {
      this.containerElement.focus();
      this.currentFocus = "none";
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
