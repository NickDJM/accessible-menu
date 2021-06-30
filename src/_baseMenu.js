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
 * This is intended to be used as a "base" to other menus and not to be used on it's own in the DOM.
 * Use a [DisclosureMenu]{@link DisclosureMenu.md}, [Menubar]{@link Menubar.md}, or [Treeview]{@link Treeview.md} instead.
 */
class BaseMenu {
  /**
   * @inheritdoc
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
   *
   * @throws {Error} Will throw an Error if the validate method returns `false`.
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
        });

        this.menuElements.controller = toggle;
      }
    }

    this.createChildElements();
  }

  /**
   * The DOM elements within the menu.
   *
   * @type {object.<HTMLElement,HTMLElement[]>}
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The CSS selectors available to the menu.
   *
   * @type {object.<string>}
   */
  get selectors() {
    return this.domSelectors;
  }

  /**
   * The elements within the menu.
   *
   * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
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
   * @type {string|string[]}
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
   * @type {string|string[]}
   */
  get closeClass() {
    return this.isTopLevel
      ? this.submenuCloseClass
      : this.elements.rootMenu.closeClass;
  }

  /**
   * A flag marking the root menu.
   *
   * @type {boolean}
   */
  get isTopLevel() {
    return this.root;
  }

  /**
   * The index of the currently selected menu item in the menu.
   *
   * - Attempting to set a value < -1 will set the `currentChild` to -1.
   * - Attempting to set a value >= the number of menu items will set the `currentChild` to the number of menu items - 1.
   *
   * If the current menu has a parent menu _and_ the menu's current event is `"mouse"`,
   * The parent menu will have it's current child updated as well to help with transitioning
   * between mouse and keyboard naviation.
   *
   * @type {number}
   */
  get currentChild() {
    return this.focussedChild;
  }

  /**
   * The current state of the menu's focus.
   *
   * @type {string}
   */
  get focusState() {
    return this.state;
  }

  /**
   * This last event triggered on the menu.
   *
   * @type {string}
   */
  get currentEvent() {
    return this.event;
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
   * @type {number}
   */
  get hoverDelay() {
    return this.root ? this.delay : this.elements.rootMenu.hoverDelay;
  }

  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * Will return false unless any of the following criteria are met:
   * - The menu's `currentEvent` is `"keyboard"`.
   * - The menu's `currentEvent` is `"character"`.
   * - The menu's `currentEvent` is `"mouse"` _and_ the menu's `hoverType` is `"dynamic"`.
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

    if (this.submenuOpenClass !== value) {
      this.submenuOpenClass = value;
    }
  }

  set closeClass(value) {
    isValidClassList({ closeClass: value });

    if (this.submenuCloseClass !== value) {
      this.submenuCloseClass = value;
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
      this.focussedChild = -1;
      setParentChild(this);
    } else if (value >= this.elements.menuItems.length) {
      this.focussedChild = this.elements.menuItems.length - 1;
      setParentChild(this);
    } else if (this.focusChild !== value) {
      this.focussedChild = value;
      setParentChild(this);
    }
  }

  set focusState(value) {
    isValidState({ value });

    if (this.state !== value) {
      this.state = value;
    }
  }

  set currentEvent(value) {
    isValidEvent({ value });

    if (this.event !== value) {
      this.event = value;

      if (this.elements.submenuToggles.length > 0) {
        this.elements.submenuToggles.forEach((submenuToggle) => {
          submenuToggle.elements.controlledMenu.currentEvent = value;
        });
      }
    }
  }

  set hoverType(value) {
    isValidHoverType({ value });

    if (this.hover !== value) {
      this.hover = value;
    }
  }

  set hoverDelay(value) {
    isValidType("number", { value });

    if (this.delay !== value) {
      this.delay = value;
    }
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

    if (
      submenuOpenClass !== "" &&
      !isValidClassList({ openClass: submenuOpenClass })
    ) {
      check = false;
    }

    if (
      submenuCloseClass !== "" &&
      !isValidClassList({ closeClass: submenuCloseClass })
    ) {
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
   * This will set the actual `domElement` property, so all existing items in a given `domElement` property will be removed when this is run.
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
   * This is an additive function, so existing items in a given `domElement` property will not be touched.
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
   *
   * Utiliizes {@link setDOMElementType}, {@link clearDOMElementType}, and {@link addDOMElementType}.
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
   *
   * - Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu to a "self" focus state, any parent menu to a "child" focus state, and any child menu to a "none" focus state.
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
   *
   * Depending on what is supported either `touchstart` and `touchend` or `mousedown` and `mouseup` will be used for all "click" event handling.
   *
   * - Adds a `touchend`/`mouseup` listener to the document so if the user clicks outside of the menu when it is open, the menu will close.
   * - Adds a `touchstart`/`mousedown` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
   * - Adds a `touchend`/`mouseup` listener to every submenu item that will properly toggle the submenu open/closed.
   * - Adds a `touchend`/`mouseup` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.
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
   * Adds `mouseenter` listeners to all menu items and `mouseleave` listeners to all submenu items which function differently depending on the menu's {@link hoverType}.
   *
   * **Hover Type "on"**
   * - When a `mouseenter` event triggers on any menu item the menu's {@link currentChild} value will change to that menu item.
   * - When a `mouseenter` event triggers on a submenu item the `preview()` method for the submenu item's toggle will be called.
   * - When a `mouseleave` event triggers on an open submenu item the `close()` method for the submenu item's toggle will be called after a delay set by the menu's {@link hoverDelay}.
   *
   * **Hover Type "dynamic"**
   * - When a `mouseenter` event triggers on any menu item the menu's {@link currentChild} value will change to that menu item.
   * - When a `mouseenter` event triggers on any menu item, and the menu's {@link focusState} is not `"none"`, the menu item will be focused.
   * - When a `mouseenter` event triggers on a submenu item, and a submenu is already open, the `preview()` method for the submenu item's toggle will be called.
   * - When a `mouseenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
   * - When a `mouseleave` event triggers on an open submenu item that is not a root-level submenu item the `close()` method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's {@link hoverDelay}.
   * - When a `mouseleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.
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
   *
   * This method exists to assit the {@link handleKeyup} method.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on `Space`, `Enter`, and `Escape` keys.
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
   *   - Opens the menu when the user hits `Space` or `Enter`.
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
   * Sets the menu's {@link focusState} to `"self"` and focusses the menu if the menu's {@link shouldFocus} vallue is `true`.
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
   * Sets the menu's {@link focusState} to `"none"` and blurs the menu if the menu's {@link shouldFocus} vallue is `true`.
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
