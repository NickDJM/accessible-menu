import MenuToggle from "./menuToggle";
import MenuItem from "./menuItem";
import {
  isHTMLElement,
  isCSSSelector,
  isString,
  isBoolean,
  isMenu,
  isNumber,
  isValidState,
  isValidEvent,
} from "./validate";
import { preventEvent, keyPress } from "./eventHandlers";

/**
 * An accessible navigation element in the DOM.
 */
class BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}           param0                               - The menu object.
   * @param {HTMLElement}      param0.menuElement                   - The menu element in the DOM.
   * @param {string}           [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}           [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}           [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}           [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}           [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement|null} [param0.controllerElement = null]    - The element controlling the menu in the DOM.
   * @param {HTMLElement|null} [param0.containerElement = null]     - The element containing the menu in the DOM.
   * @param {string}           [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string}           [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}          [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {BaseMenu|null}    [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {boolean}          [param0.isHoverable = false]         - A flag to allow hover events on the menu.
   * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
   */
  constructor({
    menuElement,
    menuItemSelector = "li",
    menuLinkSelector = "a",
    submenuItemSelector = "",
    submenuToggleSelector = "a",
    submenuSelector = "ul",
    controllerElement = null,
    containerElement = null,
    openClass = "show",
    closeClass = "hide",
    isTopLevel = true,
    parentMenu = null,
    isHoverable = false,
    hoverDelay = 250,
  }) {
    // Run validations.
    isBoolean({ isTopLevel });

    if (submenuItemSelector !== "") {
      isCSSSelector({
        menuItemSelector,
        menuLinkSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
      });
    } else {
      isCSSSelector({ menuItemSelector, menuLinkSelector });
    }

    if (controllerElement !== null || containerElement !== null) {
      isHTMLElement({ menuElement, controllerElement, containerElement });
    } else {
      isHTMLElement({ menuElement });
    }

    if (parentMenu !== null) isMenu({ parentMenu });

    this.domElements = {
      menu: menuElement,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: controllerElement,
      container: containerElement,
    };
    this.domSelectors = {
      menuItems: menuItemSelector,
      menuLinks: menuLinkSelector,
      submenuItems: submenuItemSelector,
      submenuToggles: submenuToggleSelector,
      submenus: submenuSelector,
    };
    this.menuElements = {
      menuItems: [],
      submenuToggles: [],
      controller: null,
      parentMenu,
      rootMenu: isTopLevel ? this : null,
    };
    this.openClass = openClass;
    this.closeClass = closeClass;
    this.root = isTopLevel;
    this.currentChild = 0;
    this.focusState = "none";
    this.currentEvent = "none";
    this.isHoverable = isHoverable;
    this.hoverDelay = hoverDelay;

    this.initialize();
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    // Get the root menu if it doesn't exist.
    if (this.elements.rootMenu === null) this.findRootMenu(this);

    // Set all of the DOM elements.
    this.setDOMElements();

    if (this.isTopLevel) {
      if (this.dom.controller && this.dom.container) {
        // Create a new MenuToggle to control the menu.
        const toggle = new MenuToggle({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this,
          openClass: this.openClass,
          closeClass: this.closeClass,
        });

        this.menuElements.controller = toggle;
      }
    }
  }

  /**
   * The DOM elements within the menu.
   *
   * @returns {object} - The DOM elements.
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The CSS selectors available to the menu.
   *
   * @returns {object} - The selectors.
   */
  get selectors() {
    return this.domSelectors;
  }

  /**
   * The elements within the menu.
   *
   * @returns {object} - The elements.
   */
  get elements() {
    return this.menuElements;
  }

  /**
   * The class to apply when the menu is "open".
   *
   * @returns {string} - The class.
   */
  get openClass() {
    return this.submenuOpenClass;
  }

  /**
   * The class to apply when the menu is "closed".
   *
   * @returns {string} - The class.
   */
  get closeClass() {
    return this.submenuCloseClass;
  }

  /**
   * A flag marking the root menu.
   *
   * @returns {boolean} - The top-level flag.
   */
  get isTopLevel() {
    return this.root;
  }

  /**
   * The index of the currently selected menu item in the menu.
   *
   * @returns {number} - The index.
   */
  get currentChild() {
    return this.focussedChild;
  }

  /**
   * The current state of the menu's focus.
   *
   * @returns {string} - The state.
   */
  get focusState() {
    return this.state;
  }

  /**
   * This last event triggered on the menu.
   *
   * @returns {string} - The event type.
   */
  get currentEvent() {
    return this.event;
  }

  /**
   * The currently selected menu item.
   *
   * @returns {MenuItem} - The menu item.
   */
  get currentMenuItem() {
    return this.elements.menuItems[this.currentChild];
  }

  /**
   * A flag to allow hover events on the menu.
   *
   * @returns {boolean} - The hoverable flag.
   */
  get isHoverable() {
    return this.hoverable;
  }

  /**
   * The delay time (in miliseconds) used for mouseout events to take place.
   *
   * @returns {number} - The delay time.
   */
  get hoverDelay() {
    return this.delay;
  }

  /**
   * Set the class to apply when the menu is "open".
   *
   * @param {string} value - The class.
   */
  set openClass(value) {
    isString({ value });

    this.submenuOpenClass = value;
  }

  /**
   * Set the class to apply when the menu is "closed".
   *
   * @param {string} value - The class.
   */
  set closeClass(value) {
    isString({ value });

    this.submenuCloseClass = value;
  }

  /**
   * Set the index currently selected menu item in the menu.
   *
   * @param {number} value - The index.
   */
  set currentChild(value) {
    isNumber({ value });

    this.focussedChild = value;
  }

  /**
   * Set the state of the menu's focus.
   *
   * @param {string} value - The state.
   */
  set focusState(value) {
    isValidState({ value });

    this.state = value;
  }

  /**
   * Set the last event triggered on the menu.
   *
   * @param {string} value - The event type.
   */
  set currentEvent(value) {
    isValidEvent({ value });

    this.event = value;
  }

  /**
   * Set the flag to allow hover events on the menu.
   *
   * @param {boolean} value - The hoverable flag.
   */
  set isHoverable(value) {
    isBoolean({ value });

    this.hoverable = value;
  }

  /**
   * Set the delay time (in miliseconds) used for mouseout events to take place.
   *
   * @param {number} value - The delay time.
   */
  set hoverDelay(value) {
    isNumber({ value });

    this.delay = value;
  }

  /**
   * Sets DOM elements within the menu.
   *
   * @param {string}      elementType - The type of element to populate.
   * @param {HTMLElement} base        - The element used as the base for the querySelect.
   * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
   */
  setDOMElementType(elementType, base, filter) {
    if (typeof this.selectors[elementType] === "string") {
      if (base) isHTMLElement({ base });

      const baseElement = base || this.dom.menu;
      const baseFilter = item => item.parentElement === baseElement;
      const selector = this.selectors[elementType];
      const domElements = Array.from(baseElement.querySelectorAll(selector));

      if (typeof filter !== "undefined") {
        if (typeof filter === "function") {
          this.domElements[elementType] = domElements.filter(item =>
            filter(item)
          );
        } else {
          this.domElements[elementType] = domElements;
        }
      } else {
        this.domElements[elementType] = domElements.filter(item =>
          baseFilter(item)
        );
      }
    } else {
      throw new Error(
        `${elementType} is not a valid element type within the menu.`
      );
    }
  }

  /**
   * Adds an element to DOM elements within the menu.
   *
   * @param {string}      elementType - The type of element to populate.
   * @param {HTMLElement} base        - The element used as the base for the querySelect.
   * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
   */
  addDOMElementType(elementType, base, filter) {
    if (typeof this.selectors[elementType] === "string") {
      if (base) isHTMLElement({ base });

      const baseElement = base || this.dom.menu;
      const baseFilter = item => item.parentElement === baseElement;
      const selector = this.selectors[elementType];
      const domElements = Array.from(baseElement.querySelectorAll(selector));

      if (typeof filter !== "undefined") {
        if (typeof filter === "function") {
          this.domElements[elementType] = [
            ...this.domElements[elementType],
            ...domElements.filter(item => filter(item)),
          ];
        } else {
          this.domElements[elementType] = [
            ...this.domElements[elementType],
            ...domElements,
          ];
        }
      } else {
        this.domElements[elementType] = [
          ...this.domElements[elementType],
          ...domElements.filter(item => baseFilter(item)),
        ];
      }
    } else {
      throw new Error(
        `${elementType} is not a valid element type within the menu.`
      );
    }
  }

  /**
   * Clears DOM elements within the menu.
   *
   * @param {string} elementType - The type of element to clear.
   */
  clearDOMElementType(elementType) {
    if (elementType === "menu") return;

    if (Array.isArray(this.domElements[elementType])) {
      this.domElements[elementType] = [];
    } else if (typeof this.domElements[elementType] !== "undefined") {
      this.domElements[elementType] = null;
    } else {
      throw new Error(
        `${elementType} is not a valid element type within the menu.`
      );
    }
  }

  /**
   * Sets all DOM elements within the menu.
   */
  setDOMElements() {
    this.setDOMElementType("menuItems");

    if (this.selectors.submenuItems !== "") {
      this.setDOMElementType("submenuItems");

      this.clearDOMElementType("submenuToggles");
      this.clearDOMElementType("submenus");

      this.dom.submenuItems.forEach(item => {
        this.addDOMElementType("submenuToggles", item);
        this.addDOMElementType("submenus", item);
      });
    }
  }

  /**
   * Finds the root menu element.
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  findRootMenu(menu) {
    if (menu.isTopLevel) {
      this.menuElements.rootMenu = menu;
    } else if (menu.elements.parentMenu !== null) {
      this.findRootMenu(menu.elements.parentMenu);
    } else {
      throw new Error("Cannot find root menu.");
    }
  }

  /**
   * Creates and initializes all menu items and submenus.
   *
   * @param {object} MenuType - The menu type for created submenus.
   */
  createChildElements(MenuType = BaseMenu) {
    this.dom.menuItems.forEach(element => {
      let menuItem;

      if (this.dom.submenuItems.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selectors.submenuToggles);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selectors.submenus);

        // Create the new menu and initialize it.
        const menu = new MenuType({
          menuElement: submenu,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuToggles,
          submenuSelector: this.selectors.submenus,
          openClass: this.openClass,
          closeClass: this.closeClass,
          isTopLevel: false,
          parentMenu: this,
          isHoverable: this.isHoverable,
          hoverDelay: this.hoverDelay,
        });

        // Create the new MenuToggle.
        const toggle = new MenuToggle({
          menuToggleElement: toggler,
          parentElement: element,
          controlledMenu: menu,
          openClass: this.openClass,
          closeClass: this.closeClass,
          parentMenu: this,
        });

        // Add the toggle to the list of toggles.
        this.menuElements.submenuToggles.push(toggle);

        // Create a new MenuItem.
        menuItem = new MenuItem({
          menuItemElement: element,
          menuLinkElement: toggler,
          parentMenu: this,
          isSubmenuItem: true,
          childMenu: menu,
          toggle,
        });
      } else {
        const link = element.querySelector(this.selectors.menuLinks);

        // Create a new MenuItem.
        menuItem = new MenuItem({
          menuItemElement: element,
          menuLinkElement: link,
          parentMenu: this,
        });
      }

      this.menuElements.menuItems.push(menuItem);
    });
  }

  /**
   * Handles focus events throughout the menu for proper menu use.
   */
  handleFocus() {
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("focus", () => {
        if (this.elements.parentMenu)
          this.elements.parentMenu.focusState = "child";
        if (menuItem.elements.childMenu)
          menuItem.elements.childMenu.focusState = "none";

        this.focusState = "self";
        this.currentChild = index;
      });
    });
  }

  /**
   * Handles click events throughout the menu for proper use.
   */
  handleClick() {
    // Close the menu if a click event happens outside of it.
    document.addEventListener("click", event => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (
          !this.dom.menu.contains(event.target) &&
          !this.dom.menu !== event.target
        ) {
          this.closeChildren();
          this.blur();

          if (this.elements.controller) {
            this.elements.controller.close();
          }
        }
      }
    });

    // Toggle submenus when their controllers are clicked.
    this.elements.submenuToggles.forEach(toggle => {
      toggle.dom.toggle.addEventListener("click", event => {
        preventEvent(event);

        this.currentEvent = "mouse";

        toggle.toggle();

        if (toggle.isOpen) {
          this.focusState = "self";
          toggle.elements.controlledMenu.focusState = "none";
        }
      });
    });

    // Open the this menu if it's controller is clicked.
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener("click", event => {
        preventEvent(event);

        this.currentEvent = "mouse";

        this.elements.controller.toggle();
      });
    }
  }

  /**
   * Handles hover events throughout the menu for proper use.
   */
  handleHover() {
    this.elements.submenuToggles.forEach(toggle => {
      toggle.dom.parent.addEventListener("mouseenter", () => {
        this.currentEvent = "mouse";
        toggle.open();
      });

      toggle.dom.parent.addEventListener("mouseleave", () => {
        setTimeout(() => {
          this.currentEvent = "mouse";
          toggle.close();
        }, this.hoverDelay);
      });
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   */
  handleKeydown() {
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener("keydown", () => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        if (key === "Space" || key === "Enter") {
          preventEvent(event);
        }
      });
    }
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   */
  handleKeyup() {
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener("keyup", () => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        if (key === "Space" || key === "Enter") {
          preventEvent(event);
          this.elements.controller.open();
          this.focusFirstChild();
        }
      });
    }
  }

  /**
   * Focus the menu.
   */
  focus() {
    this.focusState = "self";

    if (this.currentEvent !== "mouse") {
      this.dom.menu.focus();
    }
  }

  /**
   * Unfocus the menu.
   */
  blur() {
    this.focusState = "none";

    if (this.currentEvent !== "mouse") {
      this.dom.menu.blur();
    }

    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.close();
    }
  }

  /**
   * Focues the menu's first child.
   */
  focusFirstChild() {
    this.blurCurrentChild();
    this.currentChild = 0;
    this.focusCurrentChild();
  }

  /**
   * Focus the menu's last child.
   */
  focusLastChild() {
    this.blurCurrentChild();
    this.currentChild = this.elements.menuItems.length - 1;
    this.focusCurrentChild();
  }

  /**
   * Focus the menu's next child.
   */
  focusNextChild() {
    if (this.currentChild === this.elements.menuItems.length - 1) {
      this.focusFirstChild();
    } else {
      this.blurCurrentChild();
      this.currentChild = this.currentChild + 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's last child.
   */
  focusPreviousChild() {
    if (this.currentChild === 0) {
      this.focusLastChild();
    } else {
      this.blurCurrentChild();
      this.currentChild = this.currentChild - 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's current child.
   */
  focusCurrentChild() {
    if (this.currentChild !== -1) {
      this.currentMenuItem.focus();
    }
  }

  /**
   * Blurs the menu's current child.
   */
  blurCurrentChild() {
    if (this.currentChild !== -1) {
      this.currentMenuItem.blur();
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
    let index = this.currentChild + 1;
    let found = false;

    while (!found && index < this.elements.menuItems.length) {
      // Ensure the text in the item is lowercase just to be safe.
      const text = this.elements.menuItems[
        index
      ].dom.item.innerText.toLowerCase();

      // Focus the child if the text matches, otherwise move on.
      if (text.startsWith(match)) {
        found = true;
        this.currentChild = index;
        this.focusCurrentChild();
      }

      index++;
    }
  }

  /**
   * Focus the menu's controller.
   */
  focusController() {
    if (this.dom.controller) {
      if (this.currentEvent !== "mouse") {
        this.dom.controller.focus();
      }

      this.focusState = "none";
    }
  }

  /**
   * Focus the menu's container.
   */
  focusContainer() {
    if (this.dom.container) {
      if (this.currentEvent !== "mouse") {
        this.dom.container.focus();
      }

      this.focusState = "none";
    }
  }

  /**
   * Close all submenu children.
   */
  closeChildren() {
    this.elements.submenuToggles.forEach(toggle => toggle.close());
  }
}

export default BaseMenu;
