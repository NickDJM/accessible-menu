import BaseMenuToggle from "./_baseMenuToggle.js";
import BaseMenuItem from "./_baseMenuItem.js";
import {
  isValidInstance,
  isValidType,
  isCSSSelector,
  isValidClassList,
  isValidState,
  isValidEvent,
  isValidHoverType,
  isEventSupported,
} from "./validate.js";
import { preventEvent, keyPress } from "./eventHandlers.js";

/**
 * An accessible navigation element in the DOM.
 */
class BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}               param0                               - The menu object.
   * @param {HTMLElement}          param0.menuElement                   - The menu element in the DOM.
   * @param {string}               [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}               [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}               [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}               [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}               [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement|null}     [param0.controllerElement = null]    - The element controlling the menu in the DOM.
   * @param {HTMLElement|null}     [param0.containerElement = null]     - The element containing the menu in the DOM.
   * @param {string|string[]|null} [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string|string[]|null} [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}              [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {BaseMenu|null}        [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}               [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}               [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
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
    hoverType = "off",
    hoverDelay = 250,
  }) {
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
    this.submenuOpenClass = openClass || "";
    this.submenuCloseClass = closeClass || "";
    this.root = isTopLevel;
    this.focussedChild = 0;
    this.state = "none";
    this.event = "none";
    this.hover = hoverType;
    this.delay = hoverDelay;

    // Set default class types.
    this.MenuType = BaseMenu;
    this.MenuItemType = BaseMenuItem;
    this.MenuToggleType = BaseMenuToggle;
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    if (!this.validate()) {
      throw new Error(
        "AccesibleMenu: cannot initialize menu. See other error messaged for more information."
      );
    }

    const { MenuToggleType } = this;

    // Get the root menu if it doesn't exist.
    if (this.elements.rootMenu === null) this.findRootMenu(this);

    // Set all of the DOM elements.
    this.setDOMElements();

    if (this.isTopLevel) {
      if (this.dom.controller && this.dom.container) {
        // Create a new BaseMenuToggle to control the menu.
        const toggle = new MenuToggleType({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this,
          openClass: this.openClass,
          closeClass: this.closeClass,
        });

        this.menuElements.controller = toggle;
      }
    }

    this.createChildElements();
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
   * The class(es) to apply when the menu is "open".
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's open class(es).
   *
   * @returns {string|string[]} - The class(es).
   */
  get openClass() {
    return this.isTopLevel
      ? this.submenuOpenClass
      : this.elements.rootMenu.openClass;
  }

  /**
   * The class(es) to apply when the menu is "closed".
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @returns {string|string[]} - The class(es).
   */
  get closeClass() {
    return this.isTopLevel
      ? this.submenuCloseClass
      : this.elements.rootMenu.closeClass;
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
   * @returns {BaseMenuItem} - The menu item.
   */
  get currentMenuItem() {
    return this.elements.menuItems[this.currentChild];
  }

  /**
   * The type of hoverability for the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hoverability.
   *
   * @returns {string} - The hover type.
   */
  get hoverType() {
    return this.root ? this.hover : this.elements.rootMenu.hoverType;
  }

  /**
   * The delay time (in miliseconds) used for mouseout events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @returns {number} - The delay time.
   */
  get hoverDelay() {
    return this.root ? this.delay : this.elements.rootMenu.hoverDelay;
  }

  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * Will return false unless any of the following criteria are met:
   * - The menu's currentEvent is "keyboard".
   * - The menu's currentEvent is "mouse" _and_ the menu's hoverType is "dynamic".
   *
   * @returns {boolean} - The flag.
   */
  get shouldFocus() {
    let check = false;

    if (this.currentEvent === "keyboard") {
      check = true;
    }

    if (this.currentEvent === "mouse" && this.hoverType === "dynamic") {
      check = true;
    }

    return check;
  }

  /**
   * Set the class to apply when the menu is "open".
   *
   * @param {string} value - The class.
   */
  set openClass(value) {
    isValidClassList({ openClass: value });

    this.submenuOpenClass = value;
  }

  /**
   * Set the class to apply when the menu is "closed".
   *
   * @param {string} value - The class.
   */
  set closeClass(value) {
    isValidClassList({ closeClass: value });

    this.submenuCloseClass = value;
  }

  /**
   * Set the index currently selected menu item in the menu.
   *
   * - Attempting to set a value < -1 will set the currentChild to -1.
   * - Attempting to set a value >= the number of menu items will set the currentChild to the number of menu items - 1.
   *
   * @param {number} value - The index.
   */
  set currentChild(value) {
    isValidType("number", { value });

    if (value < -1) {
      this.focussedChild = -1;
    } else if (value >= this.elements.menuItems.length) {
      this.focussedChild = this.elements.menuItems.length - 1;
    } else {
      this.focussedChild = value;
    }
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
   * Set the type of hoverability for the menu.
   *
   * @param {string} value - The hover type.
   */
  set hoverType(value) {
    isValidHoverType({ value });

    this.hover = value;
  }

  /**
   * Set the delay time (in miliseconds) used for mouseout events to take place.
   *
   * @param {number} value - The delay time.
   */
  set hoverDelay(value) {
    isValidType("number", { value });

    this.delay = value;
  }

  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @returns {boolean} - The result of the validation.
   */
  validate() {
    const {
      domElements,
      domSelectors,
      menuElements,
      submenuOpenClass,
      submenuCloseClass,
      root,
      hover,
      delay,
    } = this;

    let check = true;

    if (domElements.container !== null || domElements.controller !== null) {
      if (
        !isValidInstance(HTMLElement, {
          menuElement: domElements.menu,
          controllerElement: domElements.controller,
          containerElement: domElements.container,
        })
      ) {
        check = false;
      }
    } else if (
      !isValidInstance(HTMLElement, {
        menuElement: domElements.menu,
      })
    ) {
      check = false;
    }

    if (domSelectors.submenuItems !== "") {
      if (
        !isCSSSelector({
          menuItemSelector: domSelectors.menuItems,
          menuLinkSelector: domSelectors.menuLinks,
          submenuItemSelector: domSelectors.submenuItems,
          submenuToggleSelector: domSelectors.submenuToggles,
          submenuSelector: domSelectors.submenus,
        })
      ) {
        check = false;
      }
    } else if (
      !isCSSSelector({
        menuItemSelector: domSelectors.menuItems,
        menuLinkSelector: domSelectors.menuLinks,
      })
    ) {
      check = false;
    }

    if (submenuOpenClass !== "" && !isValidClassList({ submenuOpenClass })) {
      check = false;
    }

    if (submenuCloseClass !== "" && !isValidClassList({ submenuCloseClass })) {
      check = false;
    }

    if (!isValidType("boolean", { isTopLevel: root })) {
      check = false;
    }

    if (
      menuElements.parentMenu !== null &&
      !isValidInstance(BaseMenu, { parentMenu: menuElements.parentMenu })
    ) {
      check = false;
    }

    if (!isValidHoverType({ hoverType: hover })) {
      check = false;
    }

    if (!isValidType("number", { hoverDelay: delay })) {
      check = false;
    }

    return check;
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
      if (base) isValidInstance(HTMLElement, { base });

      const baseElement = base || this.dom.menu;
      const baseFilter = (item) => item.parentElement === baseElement;
      const selector = this.selectors[elementType];
      const domElements = Array.from(baseElement.querySelectorAll(selector));

      if (typeof filter !== "undefined") {
        if (typeof filter === "function") {
          this.domElements[elementType] = domElements.filter((item) =>
            filter(item)
          );
        } else {
          this.domElements[elementType] = domElements;
        }
      } else {
        this.domElements[elementType] = domElements.filter((item) =>
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
      if (base) isValidInstance(HTMLElement, { base });

      const baseElement = base || this.dom.menu;
      const baseFilter = (item) => item.parentElement === baseElement;
      const selector = this.selectors[elementType];
      const domElements = Array.from(baseElement.querySelectorAll(selector));

      if (typeof filter !== "undefined") {
        if (typeof filter === "function") {
          this.domElements[elementType] = [
            ...this.domElements[elementType],
            ...domElements.filter((item) => filter(item)),
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
          ...domElements.filter((item) => baseFilter(item)),
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

      this.dom.submenuItems.forEach((item) => {
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
   */
  createChildElements() {
    const { MenuType, MenuItemType, MenuToggleType } = this;

    this.dom.menuItems.forEach((element) => {
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
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
        });

        // Create the new menu toggle.
        const toggle = new MenuToggleType({
          menuToggleElement: toggler,
          parentElement: element,
          controlledMenu: menu,
          parentMenu: this,
        });

        // Add the toggle to the list of toggles.
        this.menuElements.submenuToggles.push(toggle);

        // Create a new menu item.
        menuItem = new MenuItemType({
          menuItemElement: element,
          menuLinkElement: toggler,
          parentMenu: this,
          isSubmenuItem: true,
          childMenu: menu,
          toggle,
        });
      } else {
        const link = element.querySelector(this.selectors.menuLinks);

        // Create a new menu item.
        menuItem = new MenuItemType({
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
    /**
     * Toggles a toggle element.
     *
     * @param {BaseMenu}       menu - This menu.
     * @param {BaseMenuToggle} toggle - The menu toggle
     * @param {Event}          event - A Javascript event.
     */
    function toggleToggle(menu, toggle, event) {
      preventEvent(event);

      menu.currentEvent = "mouse";

      toggle.toggle();

      if (toggle.isOpen) {
        menu.focusState = "self";
        toggle.elements.controlledMenu.focusState = "none";
      }
    }

    // Close the menu if a click event happens outside of it.
    document.addEventListener("mouseup", (event) => {
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
    this.elements.submenuToggles.forEach((toggle) => {
      if (isEventSupported("touchend", toggle.dom.toggle)) {
        toggle.dom.toggle.ontouchend = (event) => {
          toggleToggle(this, toggle, event);
        };
      } else {
        toggle.dom.toggle.onmouseup = (event) => {
          toggleToggle(this, toggle, event);
        };
      }
    });

    // Open the this menu if it's controller is clicked.
    if (this.isTopLevel && this.elements.controller) {
      if (isEventSupported("touchend", this.elements.controller.dom.toggle)) {
        this.elements.controller.dom.toggle.ontouchend = (event) => {
          toggleToggle(this, this.elements.controller, event);
        };
      } else {
        this.elements.controller.dom.toggle.onmouseup = (event) => {
          toggleToggle(this, this.elements.controller, event);
        };
      }
    }
  }

  /**
   * Handles hover events throughout the menu for proper use.
   */
  handleHover() {
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("mouseenter", () => {
        if (this.hoverType === "on") {
          this.currentEvent = "mouse";
          this.currentChild = index;

          if (menuItem.isSubmenuItem) {
            menuItem.elements.toggle.preview();
          }
        } else if (this.hoverType === "dynamic") {
          const isOpen = this.elements.submenuToggles.some(
            (toggle) => toggle.isOpen
          );
          this.currentChild = index;

          if (!this.isTopLevel || this.focusState !== "none") {
            this.currentEvent = "mouse";
            this.focusCurrentChild();
          }

          if (menuItem.isSubmenuItem && (!this.isTopLevel || isOpen)) {
            this.currentEvent = "mouse";
            menuItem.elements.toggle.preview();
          }
        }
      });

      if (menuItem.isSubmenuItem) {
        menuItem.dom.item.addEventListener("mouseleave", () => {
          if (this.hoverType === "on") {
            setTimeout(() => {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.close();
            }, this.hoverDelay);
          } else if (this.hoverType === "dynamic") {
            if (!this.isTopLevel) {
              setTimeout(() => {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
                this.focusCurrentChild();
              }, this.hoverDelay);
            }
          }
        });
      }
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   */
  handleKeydown() {
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener(
        "keydown",
        (event) => {
          this.currentEvent = "keyboard";

          const key = keyPress(event);

          if (key === "Space" || key === "Enter") {
            preventEvent(event);
          }
        }
      );
    }
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   */
  handleKeyup() {
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener("keyup", (event) => {
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

    if (this.shouldFocus) {
      this.dom.menu.focus();
    }
  }

  /**
   * Unfocus the menu.
   */
  blur() {
    this.focusState = "none";

    if (this.shouldFocus) {
      this.dom.menu.blur();
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
    if (this.currentChild < this.elements.menuItems.length - 1) {
      this.blurCurrentChild();
      this.currentChild = this.currentChild + 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's previous child.
   */
  focusPreviousChild() {
    if (this.currentChild > 0) {
      this.blurCurrentChild();
      this.currentChild = this.currentChild - 1;
      this.focusCurrentChild();
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
   * Focus the menu's controller.
   */
  focusController() {
    if (this.dom.controller) {
      if (this.shouldFocus) {
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
      if (this.shouldFocus) {
        this.dom.container.focus();
      }

      this.focusState = "none";
    }
  }

  /**
   * Close all submenu children.
   */
  closeChildren() {
    this.elements.submenuToggles.forEach((toggle) => toggle.close());
  }
}

export default BaseMenu;
