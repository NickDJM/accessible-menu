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
 *
 * This is intended to be used as a "base" to other menus and not to be used on
 * it's own in the DOM.
 *
 * Use a {@link DisclosureMenu}, {@link Menubar}, or {@link Treeview} instead.
 */
class BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @type {typeof BaseMenu}
   * @protected
   */
  _MenuType = BaseMenu;

  /**
   * The class to use when generating menu items.
   *
   * @type {typeof BaseMenuItem}
   * @protected
   */
  _MenuItemType = BaseMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @type {typeof BaseMenuToggle}
   * @protected
   */
  _MenuToggleType = BaseMenuToggle;

  /**
   * The DOM elements within the menu.
   *
   * @type {object.<HTMLElement,HTMLElement[]>}
   * @property {HTMLElement}   menu           - The menu element.
   * @property {HTMLElement[]} menuItems      - An array of menu items.
   * @property {HTMLElement[]} submenuItems   - An array of menu items that also contain submenu elements.
   * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
   * @property {HTMLElement[]} submenus       - An array of submenu elements.
   * @property {HTMLElement}   controller     - The toggle for this menu.
   * @property {HTMLElement}   container      - The container for this menu.
   * @protected
   */
  _dom = {
    menu: null,
    menuItems: [],
    submenuItems: [],
    submenuToggles: [],
    submenus: [],
    controller: null,
    container: null,
  };

  /**
   * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
   *
   * @type {object.<string>}
   * @property {string} menuItems      - The CSS selector for menu items.
   * @property {string} menuLinks      - The CSS selector for menu links.
   * @property {string} submenuItems   - The CSS selector for menu items containing submenus.
   * @property {string} submenuToggles - The CSS selector for menu links that function as submenu toggles.
   * @property {string} submenus       - The CSS selector for for submenus.
   * @protected
   */
  _selectors = {
    menuItems: "",
    menuLinks: "",
    submenuItems: "",
    submenuToggles: "",
    submenus: "",
  };

  /**
   * The declared accessible-menu elements within the menu.
   *
   * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
   * @property {BaseMenuItem[]}   menuItems      - An array of menu items.
   * @property {BaseMenuToggle[]} submenuToggles - An array of menu toggles.
   * @property {?BaseMenuToggle}  controller     - A menu toggle that controls this menu.
   * @property {?BaseMenu}        parentMenu     - The parent menu.
   * @property {?BaseMenu}        rootMenu       - The root menu of the menu tree.
   * @protected
   */
  _elements = {
    menuItems: [],
    submenuToggles: [],
    controller: null,
    parentMenu: null,
    rootMenu: null,
  };

  /**
   * The class(es) to apply when the menu is open.
   *
   * @type {string|string[]}
   * @protected
   */
  _openClass = "show";

  /**
   * The class(es) to apply when the menu is closed.
   *
   * @type {string|string[]}
   * @protected
   */
  _closeClass = "hide";

  /**
   * A flag marking the root menu.
   *
   * @type {boolean}
   * @protected
   */
  _root = true;

  /**
   * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
   *
   * @type {number}
   * @protected
   */
  _currentChild = 0;

  /**
   * The current state of the menu's focus.
   *
   * @type {string}
   * @protected
   */
  _focusState = "none";

  /**
   * This last event triggered on the menu.
   *
   * @type {string}
   * @protected
   */
  _currentEvent = "none";

  /**
   * The type of hoverability for the menu.
   *
   * @type {string}
   * @protected
   */
  _hoverType = "off";

  /**
   * The delay time (in miliseconds) used for mouseout events to take place.
   *
   * @type {number}
   * @protected
   */
  _hoverDelay = 250;

  /**
   * Constructs the menu.
   *
   * @param {object}                 options                             - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                 - The menu element in the DOM.
   * @param {string}                 [options.menuItemSelector = li]     - The CSS selector string for menu items.
   * @param {string}                 [options.menuLinkSelector = a]      - The CSS selector string for menu links.
   * @param {string}                 [options.submenuItemSelector]       - The CSS selector string for menu items containing submenus.
   * @param {string}                 [options.submenuToggleSelector = a] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenuSelector = ul]      - The CSS selector string for submenus.
   * @param {?HTMLElement}           [options.controllerElement = null]  - The element controlling the menu in the DOM.
   * @param {?HTMLElement}           [options.containerElement = null]   - The element containing the menu in the DOM.
   * @param {?(string|string[])}     [options.openClass = show]          - The class to apply when a menu is "open".
   * @param {?(string|string[])}     [options.closeClass = hide]         - The class to apply when a menu is "closed".
   * @param {boolean}                [options.isTopLevel = false]        - A flag to mark the root menu.
   * @param {?BaseMenu}              [options.parentMenu = null]         - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
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
    // Set DOM elements.
    this._dom.menu = menuElement;
    this._dom.controller = controllerElement;
    this._dom.container = containerElement;

    // Set DOM selectors.
    this._selectors.menuItems = menuItemSelector;
    this._selectors.menuLinks = menuLinkSelector;
    this._selectors.submenuItems = submenuItemSelector;
    this._selectors.submenuToggles = submenuToggleSelector;
    this._selectors.submenus = submenuSelector;

    // Set menu elements.
    this._elements.menuItems = [];
    this._elements.submenuToggles = [];
    this._elements.controller = null;
    this._elements.parentMenu = parentMenu;
    this._elements.rootMenu = isTopLevel ? this : null;

    // Set open/close classes.
    this._openClass = openClass || "";
    this._closeClass = closeClass || "";

    // Set root.
    this._root = isTopLevel;

    // Set hover settings.
    this._hoverType = hoverType;
    this._hoverDelay = hoverDelay;
  }

  /**
   * Initializes the menu.
   *
   * The following steps will be taken to initialize the menu:
   * - {@link BaseMenu#validate|Validate} that the menu can initialize,
   * - find the root menu of the menu tree if it isn't already set,
   * - populate all DOM elements within the {@link BaseMenu#dom|dom},
   * - if the current menu is the root menu _and_ has a controller, initialize
   *   the controller, and
   * - populate the menu elements within the {@link BaseMenu#elements|elements}
   *
   * @throws {Error} Will throw an Error if validate returns `false`.
   */
  initialize() {
    if (!this.validate()) {
      throw new Error(
        "AccesibleMenu: cannot initialize menu. See other error messages for more information."
      );
    }

    // Get the root menu if it doesn't exist.
    if (this.elements.rootMenu === null) this.findRootMenu(this);

    // Set all of the DOM elements.
    this.setDOMElements();

    if (this.isTopLevel) {
      if (this.dom.controller && this.dom.container) {
        // Create a new BaseMenuToggle to control the menu.
        const toggle = new this._MenuToggleType({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this,
        });

        this._elements.controller = toggle;
      }
    }

    this.createChildElements();
  }

  /**
   * The DOM elements within the menu.
   *
   * @type {object.<HTMLElement,HTMLElement[]>}
   * @readonly
   * @see _dom
   */
  get dom() {
    return this._dom;
  }

  /**
   * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
   *
   * @type {object.<string>}
   * @readonly
   * @see _selectors
   */
  get selectors() {
    return this._selectors;
  }

  /**
   * The declared accessible-menu elements within the menu.
   *
   * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
   * @readonly
   * @see _elements
   */
  get elements() {
    return this._elements;
  }

  /**
   * The class(es) to apply when the menu is open.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's open class(es).
   *
   * @type {string|string[]}
   * @see _openClass
   */
  get openClass() {
    return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
  }

  /**
   * The class(es) to apply when the menu is closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @type {string|string[]}
   * @see _closeClass
   */
  get closeClass() {
    return this.isTopLevel
      ? this._closeClass
      : this.elements.rootMenu.closeClass;
  }

  /**
   * The flag marking the root menu.
   *
   * @type {boolean}
   * @readonly
   * @see _root
   */
  get isTopLevel() {
    return this._root;
  }

  /**
   * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
   *
   * - Attempting to set a value less than -1 will set the current child to -1.
   * - Attempting to set a value greater than or equal to the number of menu items
   *   will set the current child to the index of the last menu item in the menu.
   *
   * If the current menu has a parent menu _and_ the menu's
   * {@link BaseMenu#currentEvent|current event} is "mouse", The parent menu
   * will have it's current child updated as well to help with transitioning
   * between mouse and keyboard naviation.
   *
   * @type {number}
   * @see _currentChild
   */
  get currentChild() {
    return this._currentChild;
  }

  /**
   * The current state of the menu's focus.
   *
   * - If the menu has submenus, setting the focus state to "none" or "self" will
   *   update all child menus to have the focus state of "none".
   * - If the menu has a parent menu, setting the focus state to "self" or "child"
   *   will update all parent menus to have the focus state of "child".
   *
   * @type {string}
   * @see _focusState
   */
  get focusState() {
    return this._focusState;
  }

  /**
   * The last event triggered on the menu.
   *
   * @type {string}
   * @see _currentEvent
   */
  get currentEvent() {
    return this._currentEvent;
  }

  /**
   * The currently selected menu item.
   *
   * @type {BaseMenuItem}
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
   * @type {string}
   * @see _hoverType
   */
  get hoverType() {
    return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
  }

  /**
   * The delay time (in miliseconds) used for mouseout events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @type {number}
   * @see _hoverDelay
   */
  get hoverDelay() {
    return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
  }

  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * This will be `false` unless any of the following criteria are met:
   * - The menu's {@link BaseMenu#currentEvent|current event} is "keyboard".
   * - The menu's current event is "character".
   * - The menu's current event is "mouse" _and_ the menu's
   *   {@link BaseMenu_hoverTypeType|hover type} is "dynamic".
   *
   * @type {boolean}
   */
  get shouldFocus() {
    let check = false;

    if (this.currentEvent === "keyboard" || this.currentEvent === "character") {
      check = true;
    }

    if (this.currentEvent === "mouse" && this.hoverType === "dynamic") {
      check = true;
    }

    return check;
  }

  set openClass(value) {
    isValidClassList({ openClass: value });

    if (this._openClass !== value) {
      this._openClass = value;
    }
  }

  set closeClass(value) {
    isValidClassList({ closeClass: value });

    if (this._closeClass !== value) {
      this._closeClass = value;
    }
  }

  set currentChild(value) {
    isValidType("number", { value });

    /**
     * Update the parent menu's current child to make sure clicks
     * and other jumps don't interfere with keyboard navigation.
     *
     * @param {BaseMenu} menu - The initial menu.
     */
    function setParentChild(menu) {
      const updateEvents = ["mouse", "character"];

      if (
        updateEvents.includes(menu.currentEvent) &&
        menu.elements.parentMenu
      ) {
        let index = 0;
        let found = false;

        while (
          !found &&
          index < menu.elements.parentMenu.elements.menuItems.length
        ) {
          const menuItem = menu.elements.parentMenu.elements.menuItems[index];

          if (
            menuItem.isSubmenuItem &&
            menuItem.elements.toggle.elements.controlledMenu === menu
          ) {
            found = true;

            menu.elements.parentMenu.currentEvent = menu.currentEvent;
            menu.elements.parentMenu.currentChild = index;
          }

          index++;
        }
      }
    }

    if (value < -1) {
      this._currentChild = -1;
      setParentChild(this);
    } else if (value >= this.elements.menuItems.length) {
      this._currentChild = this.elements.menuItems.length - 1;
      setParentChild(this);
    } else if (this.focusChild !== value) {
      this._currentChild = value;
      setParentChild(this);
    }
  }

  set focusState(value) {
    isValidState({ value });

    if (this._focusState !== value) {
      this._focusState = value;
    }

    if (
      this.elements.submenuToggles.length > 0 &&
      (value === "self" || value === "none")
    ) {
      this.elements.submenuToggles.forEach((toggle) => {
        toggle.elements.controlledMenu.focusState = "none";
      });
    }

    if (this.elements.parentMenu && (value === "self" || value === "child")) {
      this.elements.parentMenu.focusState = "child";
    }
  }

  set currentEvent(value) {
    isValidEvent({ value });

    if (this._currentEvent !== value) {
      this._currentEvent = value;

      if (this.elements.submenuToggles.length > 0) {
        this.elements.submenuToggles.forEach((submenuToggle) => {
          submenuToggle.elements.controlledMenu.currentEvent = value;
        });
      }
    }
  }

  set hoverType(value) {
    isValidHoverType({ value });

    if (this._hoverType !== value) {
      this._hoverType = value;
    }
  }

  set hoverDelay(value) {
    isValidType("number", { value });

    if (this._hoverDelay !== value) {
      this._hoverDelay = value;
    }
  }

  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @return {boolean} - The result of the validation.
   */
  validate() {
    let check = true;

    if (this._dom.container !== null || this._dom.controller !== null) {
      if (
        !isValidInstance(HTMLElement, {
          menuElement: this._dom.menu,
          controllerElement: this._dom.controller,
          containerElement: this._dom.container,
        })
      ) {
        check = false;
      }
    } else if (
      !isValidInstance(HTMLElement, {
        menuElement: this._dom.menu,
      })
    ) {
      check = false;
    }

    if (this._selectors.submenuItems !== "") {
      if (
        !isCSSSelector({
          menuItemSelector: this._selectors.menuItems,
          menuLinkSelector: this._selectors.menuLinks,
          submenuItemSelector: this._selectors.submenuItems,
          submenuToggleSelector: this._selectors.submenuToggles,
          submenuSelector: this._selectors.submenus,
        })
      ) {
        check = false;
      }
    } else if (
      !isCSSSelector({
        menuItemSelector: this._selectors.menuItems,
        menuLinkSelector: this._selectors.menuLinks,
      })
    ) {
      check = false;
    }

    if (
      this._openClass !== "" &&
      !isValidClassList({ openClass: this._openClass })
    ) {
      check = false;
    }

    if (
      this._closeClass !== "" &&
      !isValidClassList({ closeClass: this._closeClass })
    ) {
      check = false;
    }

    if (!isValidType("boolean", { isTopLevel: this._root })) {
      check = false;
    }

    if (
      this._elements.parentMenu !== null &&
      !isValidInstance(BaseMenu, { parentMenu: this._elements.parentMenu })
    ) {
      check = false;
    }

    if (!isValidHoverType({ hoverType: this._hoverType })) {
      check = false;
    }

    if (!isValidType("number", { hoverDelay: this._hoverDelay })) {
      check = false;
    }

    return check;
  }

  /**
   * Sets DOM elements within the menu.
   *
   * This will set the actual `domElement` property, so all existing items in a
   * given `domElement` property will be removed when this is run.
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
          this._dom[elementType] = domElements.filter((item) => filter(item));
        } else {
          this._dom[elementType] = domElements;
        }
      } else {
        this._dom[elementType] = domElements.filter((item) => baseFilter(item));
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
   * This is an additive function, so existing items in a given `domElement`
   * property will not be touched.
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
          this._dom[elementType] = [
            ...this._dom[elementType],
            ...domElements.filter((item) => filter(item)),
          ];
        } else {
          this._dom[elementType] = [...this._dom[elementType], ...domElements];
        }
      } else {
        this._dom[elementType] = [
          ...this._dom[elementType],
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

    if (Array.isArray(this._dom[elementType])) {
      this._dom[elementType] = [];
    } else if (typeof this._dom[elementType] !== "undefined") {
      this._dom[elementType] = null;
    } else {
      throw new Error(
        `${elementType} is not a valid element type within the menu.`
      );
    }
  }

  /**
   * Sets all DOM elements within the menu.
   *
   * Utiliizes {@link BaseMenu#setDOMElementType|setDOMElementType},
   * {@link BaseMenu#clearDOMElementType|clearDOMElementType},
   * and {@link BaseMenu#addDOMElementType|addDOMElementType}.
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
      this._elements.rootMenu = menu;
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
    this.dom.menuItems.forEach((element) => {
      let menuItem;

      if (this.dom.submenuItems.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selectors.submenuToggles);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selectors.submenus);

        // Create the new menu and initialize it.
        const menu = new this._MenuType({
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
        const toggle = new this._MenuToggleType({
          menuToggleElement: toggler,
          parentElement: element,
          controlledMenu: menu,
          parentMenu: this,
        });

        // Add the toggle to the list of toggles.
        this._elements.submenuToggles.push(toggle);

        // Create a new menu item.
        menuItem = new this._MenuItemType({
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
        menuItem = new this._MenuItemType({
          menuItemElement: element,
          menuLinkElement: link,
          parentMenu: this,
        });
      }

      this._elements.menuItems.push(menuItem);
    });
  }

  /**
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's {@link BaseMenu#focusState|focus state}
   *   to "self".
   */
  handleFocus() {
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("focus", () => {
        this.focusState = "self";
        this.currentChild = index;
      });
    });
  }

  /**
   * Handles click events throughout the menu for proper use.
   *
   * Depending on what is supported either `touchstart` and `touchend` or
   * `mousedown` and `mouseup` will be used for all "click" event handling.
   *
   * - Adds a `touchend`/`mouseup` listener to the document so if the user clicks
   *   outside of the menu when it is open, the menu will close.
   * - Adds a `touchstart`/`mousedown` listener to every menu item that will blur
   *   all menu items in the entire menu structure (starting at the root menu) and
   *   then properly focus the clicked item.
   * - Adds a `touchend`/`mouseup` listener to every submenu item that will properly
   *   toggle the submenu open/closed.
   * - Adds a `touchend`/`mouseup` listener to the menu's controller
   *   (if the menu is the root menu) so when it is clicked it will properly
   *   toggle open/closed.
   */
  handleClick() {
    // Use touch over mouse events when supported.
    const startEventType = isEventSupported("touchstart", this.dom.menu)
      ? "touchstart"
      : "mousedown";
    const endEventType = isEventSupported("touchend", this.dom.menu)
      ? "touchend"
      : "mouseup";

    /**
     * Toggles a toggle element.
     *
     * @param {BaseMenu}       menu   - This menu.
     * @param {BaseMenuToggle} toggle - The menu toggle
     * @param {Event}          event  - A Javascript event.
     */
    function toggleToggle(menu, toggle, event) {
      preventEvent(event);

      toggle.toggle();

      if (toggle.isOpen) {
        menu.focusState = "self";
        toggle.elements.controlledMenu.focusState = "none";
      }
    }

    this.elements.menuItems.forEach((item, index) => {
      // Properly focus the current menu item.
      item.dom.link.addEventListener(startEventType, () => {
        this.currentEvent = "mouse";
        this.elements.rootMenu.blurChildren();
        this.focusChild(index);
      });

      // Properly toggle submenus open and closed.
      if (item.isSubmenuItem) {
        item.elements.toggle.dom.toggle[`on${endEventType}`] = (event) => {
          this.currentEvent = "mouse";
          toggleToggle(this, item.elements.toggle, event);
        };
      }
    });

    // Open the this menu if it's controller is clicked.
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle[`on${endEventType}`] = (event) => {
        this.currentEvent = "mouse";
        toggleToggle(this, this.elements.controller, event);
      };
    }
  }

  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `mouseenter` listeners to all menu items and `mouseleave` listeners
   * to all submenu items which function differently depending on
   * the menu's {@link BaseMenu_hoverTypeType|hover type}.
   *
   * **Hover Type "on"**
   * - When a `mouseenter` event triggers on any menu item the menu's
   *   {@link BaseMenu#currentChild| current child} value will change to that
   *   menu item.
   * - When a `mouseenter` event triggers on a submenu item the
   *   {@link BaseMenuToggle#preview|preview method} for the submenu item's
   *   toggle will be called.
   * - When a `mouseleave` event triggers on an open submenu item the
   *   {@link BaseMenuToggle#close|close method} for the submenu item's toggle
   *   will be called after a delay set by the menu's {@link BaseMenu_hoverTypeDelay|hover delay}.
   *
   * **Hover Type "dynamic"**
   * - When a `mouseenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `mouseenter` event triggers on any menu item, and the menu's
   *   {@link BaseMenu#focusState|focus state} is not "none", the menu item
   *   will be focused.
   * - When a `mouseenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `mouseenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `mouseleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `mouseleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
   *
   * **Hover Type "off"**
   * All `mouseenter` and `mouseleave` events are ignored.
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
            if (this.hoverDelay > 0) {
              setTimeout(() => {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
              }, this.hoverDelay);
            } else {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.close();
            }
          } else if (this.hoverType === "dynamic") {
            if (!this.isTopLevel) {
              if (this.hoverDelay > 0) {
                setTimeout(() => {
                  this.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                  this.focusCurrentChild();
                }, this.hoverDelay);
              } else {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
                this.focusCurrentChild();
              }
            }
          }
        });
      }
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assit the {@link BaseMenu#handleKeyup|handleKeyup method}.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
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
   *
   * - Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
   *   - Opens the menu when the user hits "Space" or "Enter".
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
   *
   * Sets the menu's {@link BaseMenu#focusState|focus state} to "self" and
   * focusses the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
   * value is `true`.
   */
  focus() {
    this.focusState = "self";

    if (this.shouldFocus) {
      this.dom.menu.focus();
    }
  }

  /**
   * Unfocus the menu.
   *
   * Sets the menu's {@link BaseMenu#focusState|focus state} to "none"
   * and blurs the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
   * vallue is `true`.
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
    this.focusState = "self";

    if (this.currentChild !== -1) {
      this.currentMenuItem.focus();
    }
  }

  /**
   * Focuses the menu's child at a given index.
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(index) {
    this.blurCurrentChild();
    this.currentChild = index;
    this.focusCurrentChild();
  }

  /**
   * Focues the menu's first child.
   */
  focusFirstChild() {
    this.focusChild(0);
  }

  /**
   * Focus the menu's last child.
   */
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }

  /**
   * Focus the menu's next child.
   */
  focusNextChild() {
    if (this.currentChild < this.elements.menuItems.length - 1) {
      this.focusChild(this.currentChild + 1);
    } else {
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's previous child.
   */
  focusPreviousChild() {
    if (this.currentChild > 0) {
      this.focusChild(this.currentChild - 1);
    } else {
      this.focusCurrentChild();
    }
  }

  /**
   * Blurs the menu's current child.
   */
  blurCurrentChild() {
    this.focusState = "none";

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

  /**
   * Blurs all children and submenu's children.
   */
  blurChildren() {
    this.elements.menuItems.forEach((menuItem) => {
      menuItem.blur();

      if (menuItem.isSubmenuItem) {
        menuItem.elements.childMenu.blurChildren();
      }
    });
  }
}

export default BaseMenu;
