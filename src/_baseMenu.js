// eslint-disable-next-line no-unused-vars
/* global DisclosureMenu, Menubar, TopLinkDisclosureMenu, Treeview */

import BaseMenuToggle from "./_baseMenuToggle.js";
import BaseMenuItem from "./_baseMenuItem.js";
import {
  isValidInstance,
  isValidType,
  isValidClassList,
  isValidHoverType,
  isTag,
} from "@accessible-ecosystem/core/validate.js";
import {
  preventEvent,
  keyPress,
} from "@accessible-ecosystem/core/eventHelpers.js";
import Component from "@accessible-ecosystem/core";

/**
 * An accessible navigation element in the DOM.
 *
 * This is intended to be used as a "base" to other menus and not to be used on
 * its own in the DOM.
 *
 * @extends Component
 */
class BaseMenu extends Component {
  _scope = "AccessibleMenu";
  _name = "Menu";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menus";
  _rootDOMElement = "menu";
  _protectedDOMElements = ["menu", "controller", "container"];

  /**
   * Whether leaving the menu through the keyboard collapses its submenus.
   *
   * @protected
   *
   * @type {boolean}
   */
  _collapseChildrenOnBlur = true;

  /**
   * Whether activating a navigation link collapses the root menu's submenus.
   *
   * @protected
   *
   * @type {boolean}
   */
  _collapseChildrenOnActivation = true;

  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof BaseMenu}
   */
  _MenuType = BaseMenu;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof BaseMenuItem}
   */
  _MenuItemType = BaseMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof BaseMenuToggle}
   */
  _MenuToggleType = BaseMenuToggle;

  /**
   * A flag to create separate menu items for navigation links and submenu toggles.
   *
   * @protected
   *
   * @type {boolean}
   */
  _splitMenuLinks = false;

  /**
   * A flag marking the root menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _root = true;

  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = 0;

  /**
   * The type of hoverability for the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _hoverType = "off";

  /**
   * A flag that enables dynamic hover after a submenu expands or a root menu item is clicked.
   * Automatic expansion from a media query does not change this value.
   *
   * @protected
   *
   * @type {boolean}
   */
  _dynamicHoverEnabled = false;

  /**
   * The options passed to the root controller.
   *
   * @protected
   *
   * @type {object}
   */
  _controllerOptions = {};

  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                     - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                         - The menu element in the DOM.
   * @param {string}             [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuTogglesSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {?string}            [options.submenuSubtogglesSelector = null]  - The query selector string for submenu toggles below the top level. If null, submenuTogglesSelector is used.
   * @param {?string}            [options.submenuTriggersSelector = null]    - The query selector for a trigger inside each submenu toggle. If empty, null, or unmatched, each toggle acts as its own trigger.
   * @param {string}             [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])} [options.expandClass = show]                - The class(es) to apply when the menu is expanded.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class(es) to apply when the menu is collapsed.
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class(es) to apply when the menu is transitioning between expanded and collapsed states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}             [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}             [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for expanding and collapsing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for expanding menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for collapsing menus if the menu is hoverable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint used to generate the root controller's media query.
   * @param {string}             [options.mediaQuery = '']                   - The media query used to trigger the root controller's media query list events.
   * @param {boolean}            [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}            [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}            [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}            [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}            [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}            [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}            [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}            [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   */
  constructor({
    menuElement,
    menuItemsSelector = "li",
    menuLinksSelector = "a",
    submenuItemsSelector = "li:has(ul)",
    submenuTogglesSelector = "a",
    submenuSubtogglesSelector = null,
    submenuTriggersSelector = null,
    submenusSelector = "ul",
    controllerElement = null,
    containerElement = null,
    initializeClass = "initializing",
    expandClass = "show",
    collapseClass = "hide",
    transitionClass = "transitioning",
    transitionDuration = 250,
    expandDuration = -1,
    collapseDuration = -1,
    isTopLevel = true,
    parentMenu = null,
    hoverType = "off",
    hoverDelay = 250,
    enterDelay = -1,
    leaveDelay = -1,
    breakpoint = "",
    mediaQuery = "",
    expandInsideBreakpoint = false,
    expandOutsideBreakpoint = false,
    collapseInsideBreakpoint = false,
    collapseOutsideBreakpoint = false,
    lockInsideBreakpoint = false,
    lockOutsideBreakpoint = false,
    unlockInsideBreakpoint = false,
    unlockOutsideBreakpoint = false,
    prefix = "am-",
    key = null,
  }) {
    super({
      prefix,
      key,
      initializeClass,
      bootstrap: false,
    });

    // Set DOM elements.
    this._dom.menu = menuElement;
    this._dom.menuItems = [];
    this._dom.menuLinks = [];
    this._dom.submenuItems = [];
    this._dom.submenuToggles = [];
    this._dom.submenuTriggers = [];
    this._dom.submenus = [];
    this._dom.controller = controllerElement;
    this._dom.container = containerElement;

    // Set DOM selectors.
    this._selectors.menuItems = menuItemsSelector;
    this._selectors.menuLinks = menuLinksSelector;
    this._selectors.submenuItems = submenuItemsSelector;
    this._selectors.submenuToggles = submenuTogglesSelector;
    this._selectors.submenuSubtoggles =
      submenuSubtogglesSelector ?? submenuTogglesSelector;
    this._selectors.submenus = submenusSelector;
    this._selectors.submenuTriggers = submenuTriggersSelector ?? "";

    // Set menu elements.
    this._elements.menuItems = [];
    this._elements.submenuToggles = [];
    this._elements.controller = null;
    this._elements.parentMenu = parentMenu;
    this._elements.rootMenu = isTopLevel ? this : null;

    // Set open/close classes.
    this._classes.expand = expandClass || "";
    this._classes.collapse = collapseClass || "";
    this._classes.transition = transitionClass || "";

    // Set transition duration.
    this._durations.transition = transitionDuration;
    this._durations.expand = expandDuration;
    this._durations.collapse = collapseDuration;

    // Set root.
    this._root = isTopLevel;

    // Set hover settings.
    this._hoverType = hoverType;
    this._delays.hover = hoverDelay;
    this._delays.enter = enterDelay;
    this._delays.leave = leaveDelay;

    // Set options passed to the root controller.
    this._controllerOptions = {
      breakpoint,
      mediaQuery,
      expandInsideBreakpoint,
      expandOutsideBreakpoint,
      collapseInsideBreakpoint,
      collapseOutsideBreakpoint,
      lockInsideBreakpoint,
      lockOutsideBreakpoint,
      unlockInsideBreakpoint,
      unlockOutsideBreakpoint,
    };

    // Only top level menus need to store themselves.
    this._shouldStore = isTopLevel;

    // Bootstrap the component.
    this._bootstrap();
  }

  /**
   * Registers the menu's validation and initialization event listeners.
   *
   * Before validation, creates the root controller without initializing it.
   * Before initialization, finds the root menu if it isn't already set.
   *
   * Validation checks the required DOM elements, controller and container,
   * root flag, parent menu, controller options, and hover type.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap();

    // Create the controller before validating the menu.
    this._addEventListener(
      this.getEventName("prevalidate"),
      this.rootDOMElement,
      (event) => {
        if (event.detail.component !== this) return;
        this._createController({ initialize: false });
      }
    );

    // Get the root menu if it doesn't exist.
    this._addEventListener(
      this.getEventName("preinitialize"),
      this.rootDOMElement,
      (event) => {
        if (event.detail.component !== this) return;
        if (this.elements.rootMenu === null) this._findRootMenu(this);
      }
    );

    this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (event) => {
        if (event.detail.component !== this) return;

        // DOM checks.
        if (this.dom.menu === null) {
          const domChecks = isValidInstance(
            HTMLElement,
            { menuElement: this.dom.menu },
            { shouldThrow: false }
          );

          // Handle DOM check failure.
          if (!domChecks.status) {
            this._errors = [...this._errors, ...domChecks.errors];
            this._valid = false;
          }
        }

        // Controller and container checks.
        if ((this.dom.controller === null) !== (this.dom.container === null)) {
          this._errors.push(
            new TypeError(
              "controllerElement and containerElement must be provided together."
            )
          );
          this._valid = false;
        }

        // Boolean checks.
        const booleans = {
          isTopLevel: this._root,
        };

        // Check the booleans.
        const booleanChecks = isValidType("boolean", booleans, {
          shouldThrow: false,
        });

        // Handle boolean check failure.
        if (!booleanChecks.status) {
          this._errors = [...this._errors, ...booleanChecks.errors];
          this._valid = false;
        }

        // Parent menu checks.
        if (!this._root && this.elements.parentMenu === null) {
          this._errors.push(new TypeError("A submenu requires a parentMenu."));
          this._valid = false;
        } else if (this.elements.parentMenu !== null) {
          const parentMenuChecks = isValidInstance(
            BaseMenu,
            { parentMenu: this.elements.parentMenu },
            { shouldThrow: false }
          );

          // Handle parent menu check failure.
          if (!parentMenuChecks.status) {
            this._errors = [...this._errors, ...parentMenuChecks.errors];
            this._valid = false;
          }
        }

        // Controller checks.
        // Check the controller's options.
        if (
          this.elements.controller !== null &&
          !this.elements.controller._validate()
        ) {
          this._errors = [...this._errors, ...this.elements.controller.errors];
          this._valid = false;
        }

        // Hover type checks.
        const hoverTypeChecks = isValidHoverType(
          { hoverType: this._hoverType },
          { shouldThrow: false }
        );

        // Handle hover type check failure.
        if (!hoverTypeChecks.status) {
          this._errors = [...this._errors, ...hoverTypeChecks.errors];
          this._valid = false;
        }
      }
    );
  }

  /**
   * The flag marking the root menu.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _root
   */
  get isTopLevel() {
    return this._root;
  }

  /**
   * The key used to generate IDs throughout the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their parent menu's key suffixed with their position.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _key
   */
  get key() {
    if (this.isTopLevel) {
      return this._key;
    }

    const position =
      this.elements.parentMenu.dom.submenus.indexOf(this.dom.menu) || 0;

    return `${this.elements.parentMenu.key}-${position}`;
  }

  /**
   * The class(es) to apply when the menu is expanded.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's expand class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.expand
   */
  get expandClass() {
    return this.isTopLevel
      ? this._classes.expand
      : this.elements.rootMenu.expandClass;
  }

  set expandClass(value) {
    isValidClassList({ expandClass: value });

    if (this._classes.expand !== value) {
      this._classes.expand = value;
    }
  }

  /**
   * The class(es) to apply when the menu is collapsed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's collapse class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.collapse
   */
  get collapseClass() {
    return this.isTopLevel
      ? this._classes.collapse
      : this.elements.rootMenu.collapseClass;
  }

  set collapseClass(value) {
    isValidClassList({ collapseClass: value });

    if (this._classes.collapse !== value) {
      this._classes.collapse = value;
    }
  }

  /**
   * The class(es) to apply when the menu is transitioning between expanded and collapsed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.transition
   */
  get transitionClass() {
    return this.isTopLevel
      ? this._classes.transition
      : this.elements.rootMenu.transitionClass;
  }

  set transitionClass(value) {
    isValidClassList({ transitionClass: value });

    if (this._classes.transition !== value) {
      this._classes.transition = value;
    }
  }

  /**
   * The duration time (in milliseconds) for the transition between expanded and collapsed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition duration.
   *
   * Setting this value will also set the --am-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _durations.transition
   */
  get transitionDuration() {
    return this.isTopLevel
      ? this._durations.transition
      : this.elements.rootMenu.transitionDuration;
  }

  set transitionDuration(value) {
    isValidType("number", { transitionDuration: value });

    if (this._durations.transition !== value) {
      this._durations.transition = value;
      this._setCustomProps();
    }
  }

  /**
   * The duration time (in milliseconds) for the transition from collapsed to expanded states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's expandDuration.
   *
   * If expandDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-expand-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _durations.expand
   */
  get expandDuration() {
    if (!this.isTopLevel) return this.elements.rootMenu.expandDuration;

    return this._durations.expand === -1
      ? this.transitionDuration
      : this._durations.expand;
  }

  set expandDuration(value) {
    isValidType("number", { expandDuration: value });

    if (this._durations.expand !== value) {
      this._durations.expand = value;
      this._setCustomProps();
    }
  }

  /**
   * The duration time (in milliseconds) for the transition from expanded to collapsed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's collapseDuration.
   *
   * If collapseDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-collapse-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _durations.collapse
   */
  get collapseDuration() {
    if (!this.isTopLevel) return this.elements.rootMenu.collapseDuration;

    return this._durations.collapse === -1
      ? this.transitionDuration
      : this._durations.collapse;
  }

  set collapseDuration(value) {
    isValidType("number", { collapseDuration: value });

    if (this._durations.collapse !== value) {
      this._durations.collapse = value;
      this._setCustomProps();
    }
  }

  /**
   * The index of the currently selected menu item in the menu.
   *
   * - Attempting to set a value less than -1 will set the current child to -1.
   * - Attempting to set a value greater than or equal to the number of menu items
   *   will set the current child to the index of the last menu item in the menu.
   *
   * If the current menu has a parent menu _and_ the menu's
   * current event is "mouse" or "character", the parent menu
   * will have its current child updated as well to help with transitioning
   * between mouse and keyboard navigation.
   *
   * @type {number}
   *
   * @see _currentChild
   */
  get currentChild() {
    return this._currentChild;
  }

  set currentChild(value) {
    isValidType("number", { currentChild: value });

    if (!Number.isInteger(value)) {
      throw new RangeError("currentChild must be a finite integer.");
    }

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
    } else if (value >= this.elements.menuItems.length) {
      this._currentChild = this.elements.menuItems.length - 1;
    } else if (this.currentChild !== value) {
      this._currentChild = value;
    }

    setParentChild(this);
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
   *
   * @see _focusState
   */
  get focusState() {
    return super.focusState;
  }

  set focusState(value) {
    super.focusState = value;

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

  /**
   * The last event triggered anywhere in the menu tree.
   *
   * The root menu stores this value. Setting it on a submenu updates the root.
   *
   * @type {string}
   *
   * @see _currentEvent
   */
  get currentEvent() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    return menu && menu !== this ? menu.currentEvent : super.currentEvent;
  }

  set currentEvent(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.currentEvent = value;
    } else {
      super.currentEvent = value;
    }
  }

  /**
   * The currently selected menu item.
   *
   * @readonly
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
   *
   * @see _hoverType
   */
  get hoverType() {
    return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
  }

  set hoverType(value) {
    isValidHoverType({ hoverType: value });

    if (this._hoverType !== value) {
      this._hoverType = value;
    }
  }

  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @type {number}
   *
   * @see _delays.hover
   */
  get hoverDelay() {
    return this._root ? this._delays.hover : this.elements.rootMenu.hoverDelay;
  }

  set hoverDelay(value) {
    isValidType("number", { hoverDelay: value });

    if (this._delays.hover !== value) {
      this._delays.hover = value;
    }
  }

  /**
   * The delay time (in milliseconds) used for pointerenter events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's enter delay.
   *
   * If enterDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _delays.enter
   */
  get enterDelay() {
    if (this._delays.enter === -1) return this.hoverDelay;

    return this._root ? this._delays.enter : this.elements.rootMenu.enterDelay;
  }

  set enterDelay(value) {
    isValidType("number", { enterDelay: value });

    if (this._delays.enter !== value) {
      this._delays.enter = value;
    }
  }

  /**
   * The delay time (in milliseconds) used for pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's leave delay.
   *
   * If leaveDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _delays.leave
   */
  get leaveDelay() {
    if (this._delays.leave === -1) return this.hoverDelay;

    return this._root ? this._delays.leave : this.elements.rootMenu.leaveDelay;
  }

  set leaveDelay(value) {
    isValidType("number", { leaveDelay: value });

    if (this._delays.leave !== value) {
      this._delays.leave = value;
    }
  }

  /**
   * The breakpoint passed to the root controller.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the options that will be passed to it.
   * Setting this value updates the root controller without making the menu
   * itself responsive. Submenus use their root menu's value.
   *
   * @type {string}
   */
  get breakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.breakpoint;

    return this.elements.controller
      ? this.elements.controller.breakpoint
      : this._controllerOptions.breakpoint;
  }

  set breakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.breakpoint = value;
      return;
    }

    isValidType("string", { breakpoint: value });

    if (this.elements.controller) this.elements.controller.breakpoint = value;

    this._controllerOptions.breakpoint = value;
  }

  /**
   * The media query passed to the root controller.
   * Uses the breakpoint to generate the query when no explicit query is set.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the options that will be passed to it.
   * Setting this value updates the root controller without making the menu
   * itself responsive. Submenus use their root menu's value.
   *
   * @type {string}
   */
  get mediaQuery() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.mediaQuery;

    if (this.elements.controller) return this.elements.controller.mediaQuery;

    if (this._controllerOptions.mediaQuery !== "") {
      return this._controllerOptions.mediaQuery;
    }

    if (this.breakpoint === "") return "";

    return `(width <= ${this.breakpoint})`;
  }

  set mediaQuery(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.mediaQuery = value;
      return;
    }

    isValidType("string", { mediaQuery: value });

    if (this.elements.controller) this.elements.controller.mediaQuery = value;

    this._controllerOptions.mediaQuery = value;
  }

  /**
   * A flag to expand the root controller when its media query matches.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get expandInsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.expandInsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.expandInsideBreakpoint
      : this._controllerOptions.expandInsideBreakpoint;
  }

  set expandInsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.expandInsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { expandInsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.expandInsideBreakpoint = value;
    }

    this._controllerOptions.expandInsideBreakpoint = value;
  }

  /**
   * A flag to expand the root controller when its media query does not match.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get expandOutsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.expandOutsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.expandOutsideBreakpoint
      : this._controllerOptions.expandOutsideBreakpoint;
  }

  set expandOutsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.expandOutsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { expandOutsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.expandOutsideBreakpoint = value;
    }

    this._controllerOptions.expandOutsideBreakpoint = value;
  }

  /**
   * A flag to collapse the root controller when its media query matches.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get collapseInsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.collapseInsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.collapseInsideBreakpoint
      : this._controllerOptions.collapseInsideBreakpoint;
  }

  set collapseInsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.collapseInsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { collapseInsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.collapseInsideBreakpoint = value;
    }

    this._controllerOptions.collapseInsideBreakpoint = value;
  }

  /**
   * A flag to collapse the root controller when its media query does not match.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get collapseOutsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.collapseOutsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.collapseOutsideBreakpoint
      : this._controllerOptions.collapseOutsideBreakpoint;
  }

  set collapseOutsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.collapseOutsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { collapseOutsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.collapseOutsideBreakpoint = value;
    }

    this._controllerOptions.collapseOutsideBreakpoint = value;
  }

  /**
   * A flag to lock the root controller when its media query matches.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get lockInsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.lockInsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.lockInsideBreakpoint
      : this._controllerOptions.lockInsideBreakpoint;
  }

  set lockInsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.lockInsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { lockInsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.lockInsideBreakpoint = value;
    }

    this._controllerOptions.lockInsideBreakpoint = value;
  }

  /**
   * A flag to lock the root controller when its media query does not match.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get lockOutsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.lockOutsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.lockOutsideBreakpoint
      : this._controllerOptions.lockOutsideBreakpoint;
  }

  set lockOutsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.lockOutsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { lockOutsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.lockOutsideBreakpoint = value;
    }

    this._controllerOptions.lockOutsideBreakpoint = value;
  }

  /**
   * A flag to unlock the root controller when its media query matches.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get unlockInsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.unlockInsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.unlockInsideBreakpoint
      : this._controllerOptions.unlockInsideBreakpoint;
  }

  set unlockInsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.unlockInsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { unlockInsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.unlockInsideBreakpoint = value;
    }

    this._controllerOptions.unlockInsideBreakpoint = value;
  }

  /**
   * A flag to unlock the root controller when its media query does not match.
   *
   * Reads the controller's current value when it exists. Before the controller
   * is created, reads the option that will be passed to it.
   * Submenus read and update their root menu's value.
   * Changes take effect the next time the controller handles a media query match.
   *
   * @type {boolean}
   */
  get unlockOutsideBreakpoint() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.unlockOutsideBreakpoint;

    return this.elements.controller
      ? this.elements.controller.unlockOutsideBreakpoint
      : this._controllerOptions.unlockOutsideBreakpoint;
  }

  set unlockOutsideBreakpoint(value) {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) {
      menu.unlockOutsideBreakpoint = value;
      return;
    }

    isValidType("boolean", { unlockOutsideBreakpoint: value });

    if (this.elements.controller) {
      this.elements.controller.unlockOutsideBreakpoint = value;
    }

    this._controllerOptions.unlockOutsideBreakpoint = value;
  }

  /**
   * The prefix to use for CSS custom properties.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's prefix.
   *
   * @type {string}
   *
   * @see _prefix
   */
  get prefix() {
    return this._root ? this._prefix : this.elements.rootMenu.prefix;
  }

  set prefix(value) {
    isValidType("string", { prefix: value });

    if (this._prefix !== value) {
      this._prefix = value;
    }
  }

  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * Submenus use the root menu's value.
   *
   * This will be `false` unless any of the following criteria are met:
   * - The menu's current event is "keyboard".
   * - The menu's current event is "character".
   * - The menu's current event is "mouse", its hover type is "dynamic", and
   *   dynamic hover has been enabled by expansion or a root menu item click.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    const menu = this.elements.rootMenu || this.elements.parentMenu;

    if (menu && menu !== this) return menu.shouldFocus;

    return (
      super.shouldFocus ||
      this.currentEvent === "character" ||
      (this.currentEvent === "mouse" &&
        this.hoverType === "dynamic" &&
        this.dynamicHoverEnabled)
    );
  }

  /**
   * A flag that enables dynamic hover after a submenu expands or a root menu item is clicked.
   * Automatic expansion from a media query does not change this value.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's dynamicHoverEnabled.
   *
   * @type {boolean}
   *
   * @see _dynamicHoverEnabled
   */
  get dynamicHoverEnabled() {
    return this._root
      ? this._dynamicHoverEnabled
      : this.elements.rootMenu.dynamicHoverEnabled;
  }

  set dynamicHoverEnabled(value) {
    isValidType("boolean", { dynamicHoverEnabled: value });

    if (this._dynamicHoverEnabled !== value) {
      this._dynamicHoverEnabled = value;
    }
  }

  /**
   * Additional options to pass when creating a child menu.
   *
   * Subclasses can override this getter to use their current selector values.
   * The options are read when the child menu is created.
   *
   * @protected
   *
   * @readonly
   *
   * @type {object}
   */
  get _submenuOptions() {
    return {
      submenuTogglesSelector: this.selectors.submenuSubtoggles,
      submenuSubtogglesSelector: this.selectors.submenuSubtoggles,
      submenuTriggersSelector: this.selectors.submenuTriggers,
    };
  }

  /**
   * Sets all DOM elements within the menu.
   *
   * Utilizes _setDOMElementType and
   * _resetDOMElementType.
   *
   * @protected
   */
  _setDOMElements() {
    this._setDOMElementType("menuItems", {
      context: this.dom.menu,
      strict: true,
    });

    if (this.selectors.submenuItems !== "") {
      this._setDOMElementType("submenuItems", {
        context: this.dom.menu,
        strict: true,
      });

      this._resetDOMElementType("submenuToggles");
      this._resetDOMElementType("submenus");

      this.dom.submenuItems.forEach((item) => {
        this._setDOMElementType("submenuToggles", {
          context: item,
          overwrite: false,
          strict: true,
        });
        this._setDOMElementType("submenus", {
          context: item,
          overwrite: false,
          strict: true,
        });
      });
    }

    this._resetDOMElementType("submenuTriggers");

    if (this.selectors.submenuTriggers !== "") {
      this.dom.submenuToggles.forEach((controller) => {
        this._setDOMElementType("submenuTriggers", {
          context: controller,
          overwrite: false,
          strict: true,
        });
      });
    }
  }

  /**
   * Sets the IDs of the menu and its elements if they do not already exist.
   *
   * The generated IDs use the key and follow the format:
   *  - menu: `menu-${key}`
   *  - container: `menu-container-${key}`
   *  - controller: `menu-controller-${key}`
   */
  _setIds() {
    this.dom.menu.id = this.dom.menu.id || `menu-${this.key}`;

    if (this.dom.container) {
      this.dom.container.id =
        this.dom.container.id || `menu-container-${this.key}`;
    }

    if (this.dom.controller) {
      this.dom.controller.id =
        this.dom.controller.id || `menu-controller-${this.key}`;
    }

    this._id = this.dom.menu.id;
  }

  /**
   * Sets the ARIA attributes on the root controller.
   *
   * @protected
   */
  _setAriaAttributes() {
    if (this.isTopLevel && this.dom.controller && this.dom.container) {
      const controller = this.dom.controller;
      // If the toggle isn't a button, add the appropriate role to let
      // screen readers know it should act like a button.
      if (!isTag("button", { controller }, { shouldThrow: false }).status) {
        controller.setAttribute("role", "button");
      }

      // Set the controller's aria attributes.
      // These aren't necessarily the same as the standard menu toggle.
      controller.setAttribute("aria-controls", this.dom.menu.id);
    }
  }

  /**
   * Creates and initializes the root controller.
   *
   * @protected
   *
   * @param {object}  [options = {}]              - The options for creating the controller.
   * @param {boolean} [options.initialize = true] - A flag to initialize the controller. Set to false before validation.
   */
  _createController({ initialize = true } = {}) {
    if (!this.isTopLevel || !this.dom.controller || !this.dom.container) {
      return;
    }

    if (this.elements.controller === null) {
      this._elements.controller = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        controlledMenu: this,
        ...this._controllerOptions,
        initialize: false,
      });
    }

    if (initialize && !this.elements.controller.isInitialized) {
      this.elements.controller.initialize();
    }
  }

  /**
   * Finds the root menu element.
   *
   * @protected
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  _findRootMenu(menu) {
    if (menu.isTopLevel) {
      this._elements.rootMenu = menu;
    } else if (menu.elements.parentMenu !== null) {
      this._findRootMenu(menu.elements.parentMenu);
    } else {
      throw new Error("Cannot find root menu.");
    }
  }

  /**
   * Creates and initializes all menu items and submenus.
   *
   * By default, a submenu has one menu item that acts as its toggle.
   * Subclasses can set _splitMenuLinks to true to create a separate menu item
   * for the navigation link when the link and toggle are different elements.
   *
   * @protected
   */
  _createChildElements() {
    this._createController();

    this.dom.menuItems.forEach((element) => {
      let toggle = null;
      const isSubmenuItem = this.dom.submenuItems.includes(element);
      const submenu = isSubmenuItem
        ? element.querySelector(this.selectors.submenus)
        : null;

      // Only look for controls in this menu item. A link or toggle inside its
      // child menu belongs to that child, not to the item containing it.
      let toggler = null;

      if (isSubmenuItem || this._splitMenuLinks) {
        const toggles = Array.from(
          element.querySelectorAll(this.selectors.submenuToggles)
        );

        toggler =
          toggles.find((candidate) => !submenu?.contains(candidate)) ?? null;
      }

      // Prefer a separate navigation link, even if the toggle appears first.
      // If there is no separate link, use the toggle as the menu item's link.
      const links = Array.from(
        element.querySelectorAll(this.selectors.menuLinks)
      );
      const link =
        links.find(
          (candidate) => candidate !== toggler && !submenu?.contains(candidate)
        ) ?? toggler;

      if (isSubmenuItem) {
        const trigger =
          this.dom.submenuTriggers.find((candidate) =>
            toggler?.contains(candidate)
          ) ?? null;

        // Create the new menu and initialize it.
        const menu = new this._MenuType({
          menuElement: submenu,
          menuItemsSelector: this.selectors.menuItems,
          menuLinksSelector: this.selectors.menuLinks,
          submenuItemsSelector: this.selectors.submenuItems,
          submenuTogglesSelector: this.selectors.submenuToggles,
          submenusSelector: this.selectors.submenus,
          expandClass: this.expandClass,
          collapseClass: this.collapseClass,
          transitionClass: this.transitionClass,
          transitionDuration: this.transitionDuration,
          expandDuration: this.expandDuration,
          collapseDuration: this.collapseDuration,
          isTopLevel: false,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay,
          ...this._submenuOptions,
        });

        if (!menu.isInitialized) menu.initialize();

        // Create the new menu toggle.
        toggle = new this._MenuToggleType({
          menuToggleElement: toggler,
          triggerElement: trigger,
          controlledMenu: menu,
          parentMenu: this,
        });

        if (!toggle.isInitialized) toggle.initialize();

        // Add the toggle to the list of toggles.
        this._elements.submenuToggles.push(toggle);
      }

      // A single list item can contain both a navigation link and a toggle.
      // Keep their menu items in the same order as the existing top link menu.
      this._elements.menuItems.push(
        ...this._createMenuItems({
          menuItemElement: element,
          menuLinkElement: link,
          toggle,
          splitMenuLinks: this._splitMenuLinks,
        })
      );
    });
  }

  /**
   * Creates the menu items for a link and its submenu toggle.
   *
   * When the link and toggle are separate, the link's sibling points to the
   * toggle's menu item. This lets a subclass find the submenu from either item
   * without making a click on the navigation link also toggle the submenu.
   *
   * @protected
   *
   * @param {object}          options                         - The options for creating the menu items.
   * @param {HTMLElement}     options.menuItemElement         - The element containing the link and toggle.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}         [options.splitMenuLinks = false] - A flag to create separate menu items for links and toggles.
   * @return {BaseMenuItem[]} The initialized menu items, with the navigation link before its separate toggle.
   */
  _createMenuItems({
    menuItemElement,
    menuLinkElement,
    toggle = null,
    splitMenuLinks = false,
  }) {
    const items = [];
    let toggleItem = null;

    // Most menu types use the toggle itself as the menu item's link.
    // Only use the separate navigation link when the subclass asks for it.
    const link =
      toggle && !splitMenuLinks ? toggle.dom.controller : menuLinkElement;

    // Create a separate toggle item only when a different link was provided.
    // If the same element acts as both, it still needs just one menu item.
    if (splitMenuLinks && toggle && menuLinkElement !== toggle.dom.controller) {
      toggleItem = new this._MenuItemType({
        menuItemElement,
        menuLinkElement: toggle.dom.controller,
        parentMenu: this,
        isSubmenuItem: true,
        childMenu: toggle.elements.controlledMenu,
        toggle,
      });

      if (!toggleItem.isInitialized) toggleItem.initialize();
    }

    const isSubmenuItem = toggle !== null && toggleItem === null;
    const menuItem = new this._MenuItemType({
      menuItemElement,
      menuLinkElement: link,
      parentMenu: this,
      isSubmenuItem,
      childMenu: isSubmenuItem ? toggle.elements.controlledMenu : null,
      toggle: isSubmenuItem ? toggle : null,
      submenuSibling: toggleItem,
    });

    if (!menuItem.isInitialized) menuItem.initialize();

    items.push(menuItem);

    if (toggleItem !== null) items.push(toggleItem);

    return items;
  }

  /**
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's focus state
   *   to "self" and select the item. Each ancestor menu selects the item
   *   that owns the focused submenu without moving focus.
   * - Adds a `focusout` listener to the menu so when the menu loses focus,
   *   its focus state is cleared. Submenus collapse if _collapseChildrenOnBlur
   *   is true.
   *
   * @protected
   */
  _handleFocus() {
    this.elements.menuItems.forEach((menuItem, index) => {
      this._addEventListener("focus", menuItem.dom.link, () => {
        this.focusState = "self";
        this.currentChild = index;

        // Tabbing back into a submenu must also restore its ancestor selections.
        let menu = this;
        while (menu.elements.parentMenu) {
          const parent = menu.elements.parentMenu;
          const parentIndex = parent.elements.menuItems.findIndex(
            (item) => item.elements.childMenu === menu
          );
          parent.currentChild = parentIndex;
          menu = parent;
        }
      });
    });

    this._addEventListener("focusout", this.dom.menu, (event) => {
      if (
        this.currentEvent !== "keyboard" ||
        event.relatedTarget === null ||
        this.dom.menu.contains(event.relatedTarget)
      ) {
        return;
      }

      this.focusState = "none";

      if (this._collapseChildrenOnBlur) this.collapseChildren();
    });
  }

  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds a `click` listener to every menu item that will blur
   *   all menu items in the entire menu structure (starting at the root menu) and
   *   then properly focus the clicked item.
   * - Adds a `click` listener to every submenu item that will properly
   *   expand or collapse the submenu.
   * - Collapses the root menu's submenus after a navigation link's click
   *   handlers run if _collapseChildrenOnActivation is true.
   * - Adds a `click` listener to the menu's controller
   *   (if the menu is the root menu) so when it is clicked it will properly
   *   toggle open/closed.
   *
   * @protected
   */
  _handleClick() {
    /**
     * Toggles a toggle element.
     *
     * @param {BaseMenu}       menu   - This menu.
     * @param {BaseMenuToggle} toggle - The menu toggle
     * @param {Event}          event  - A Javascript event.
     */
    function toggleToggle(menu, toggle, event) {
      preventEvent(event);

      if (event.button !== 0) {
        return;
      }

      toggle.toggle();

      if (toggle.isExpanded) {
        menu.focusState = "self";
        toggle.elements.controlledMenu.focusState = "none";
      }
    }

    this.elements.menuItems.forEach((item, index) => {
      // Properly focus the current menu item.
      this._addEventListener(
        "click",
        item.dom.link,
        () => {
          if (this.isTopLevel) this.dynamicHoverEnabled = true;

          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this._clearTimeout();
          this.focusChild(index);
        },
        { passive: true }
      );

      // Properly toggle submenus open and closed.
      if (item.isSubmenuItem) {
        this._addEventListener(
          "click",
          item.elements.toggle.dom.trigger,
          (event) => {
            if (this.isTopLevel) this.dynamicHoverEnabled = true;

            this.currentEvent = "mouse";

            // The trigger may be inside the link. Its click does not reach the
            // link's listener because toggling stops event propagation.
            if (item.elements.toggle.dom.trigger !== item.dom.link) {
              this.elements.rootMenu.blurChildren();
              this._clearTimeout();
              this.focusChild(index);
            }

            toggleToggle(this, item.elements.toggle, event);
          }
        );
      }
    });

    if (this._collapseChildrenOnActivation) {
      // Listen on the menu so the click bubbles through the link's own
      // handlers first, including application handlers added after initialization.
      this._addEventListener("click", this.dom.menu, (event) => {
        const isNavigationLink = this.elements.menuItems.some(
          (item) => !item.isSubmenuItem && item.dom.link.contains(event.target)
        );

        if (isNavigationLink) {
          this.elements.rootMenu.collapseChildren();
        }
      });
    }

    // Toggle this menu open or closed when its controller is clicked.
    if (this.isTopLevel && this.elements.controller) {
      this._addEventListener(
        "click",
        this.elements.controller.dom.trigger,
        (event) => {
          this.currentEvent = "mouse";
          toggleToggle(this, this.elements.controller, event);
        }
      );
    }

    // If the menu has no open children, set dynamicHoverEnabled to false.
    this._addEventListener("click", document, (event) => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (!this.dom.menu.contains(event.target)) {
          this.elements.rootMenu.dynamicHoverEnabled =
            this.elements.submenuToggles.some((toggle) => toggle.isExpanded);
        }
      }
    });
  }

  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Events triggered by a pen or touch are ignored.
   * `pointerenter` actions use enterDelay, and `pointerleave` actions use leaveDelay.
   * A delay of -1 uses hoverDelay. A delay of 0 runs the action immediately.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on a menu item's link or toggle, updates the
   *   menu's current child and focus state without moving keyboard focus.
   * - When the item has a submenu, calls its toggle's preview method after enterDelay.
   * - When a `pointerleave` event triggers on an item containing a submenu, calls its
   *   toggle's collapse method after leaveDelay.
   * - Re-entering an item containing a submenu cancels its pending hover timeout when
   *   leaveDelay is greater than 0.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on a menu item's link or toggle, updates the
   *   menu's current child.
   * - Updates the menu's focus state when it is a submenu or its focus state is not
   *   "none". Once dynamic hover is enabled, focus follows the hovered item.
   * - When the root menu's dynamicHoverEnabled value is `true`, previews the
   *   item's submenu after enterDelay. If the item has no submenu, calls collapseChildren
   *   after enterDelay instead.
   * - When dynamicHoverEnabled is `false`, hovering an item
   *   does not change selection, focus, or submenu state.
   * - Leaving an item containing a submenu does not collapse it. The handler sets
   *   currentEvent to "mouse" after leaveDelay.
   * - Re-entering an item containing a submenu cancels its pending hover timeout when
   *   leaveDelay is greater than 0.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((menuItem, index) => {
      this._addEventListener("pointerenter", menuItem.dom.link, (event) => {
        // Exit out of the event if it was not made by a mouse.
        if (event.pointerType === "pen" || event.pointerType === "touch") {
          return;
        }

        if (this.hoverType === "on") {
          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this.focusChild(index);

          if (menuItem.isSubmenuItem) {
            if (this.enterDelay > 0) {
              this._setTimeout(() => {
                menuItem.elements.toggle.preview();
              }, this.enterDelay);
            } else {
              menuItem.elements.toggle.preview();
            }
          }
        } else if (this.hoverType === "dynamic") {
          if (!this.dynamicHoverEnabled) return;

          this.currentChild = index;

          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this.focusCurrentChild();

          if (menuItem.isSubmenuItem) {
            if (this.enterDelay > 0) {
              this._setTimeout(() => {
                menuItem.elements.toggle.preview();
              }, this.enterDelay);
            } else {
              menuItem.elements.toggle.preview();
            }
          } else if (this.enterDelay > 0) {
            this._setTimeout(() => {
              this.collapseChildren();
            }, this.enterDelay);
          } else {
            this.collapseChildren();
          }
        }
      });

      if (menuItem.isSubmenuItem) {
        this._addEventListener("pointerleave", menuItem.dom.item, (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }

          if (this.hoverType === "on") {
            if (this.leaveDelay > 0) {
              this._setTimeout(() => {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.collapse();
              }, this.leaveDelay);
            } else {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.collapse();
            }
          } else if (this.hoverType === "dynamic") {
            if (this.leaveDelay > 0) {
              this._setTimeout(() => {
                this.currentEvent = "mouse";
              }, this.leaveDelay);
            } else {
              this.currentEvent = "mouse";
            }
          }
        });

        // Clear hover timeouts any time the mouse enters an item with a submenu. This prevents the
        // menu from closing if the mouse leaves but then re-enters before leaveDelay has elapsed.
        this._addEventListener("pointerenter", menuItem.dom.item, (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }
          if (
            menuItem.isSubmenuItem &&
            (this.hoverType === "on" || this.hoverType === "dynamic") &&
            this.leaveDelay > 0
          ) {
            this._clearTimeout();
          }
        });
      }
    });
  }

  /**
   * Moves focus to an item at a given index in a menu item's submenu.
   *
   * Selects the item immediately by default. Set defer to true to wait one
   * animation frame for the submenu to open before selecting its child.
   *
   * Cancels a deferred move if focus moves away, the submenu closes, or another
   * item becomes current before the frame runs.
   *
   * @protected
   *
   * @param {BaseMenuItem} menuItem                    - The item whose submenu will receive focus.
   * @param {object}       [options = {}]              - The options for focusing the submenu.
   * @param {number}       [options.childIndex = 0]    - The zero-based index of the child to focus.
   * @param {boolean}      [options.defer = false]     - A flag to wait one animation frame before selecting the child.
   */
  _focusSubmenu(menuItem, { childIndex = 0, defer = false } = {}) {
    this._cancelAnimationFrame("submenuFocus");

    const submenu = menuItem.elements.childMenu;
    submenu.currentEvent = this.currentEvent;

    if (!defer) {
      submenu.focusChild(childIndex);
      return;
    }

    const focusedElement = document.activeElement;

    // Wait until the submenu is visually open before focusing its child.
    this._requestAnimationFrame(() => {
      if (
        this.currentMenuItem !== menuItem ||
        this.currentEvent !== "keyboard" ||
        !menuItem.elements.toggle.isExpanded ||
        document.activeElement !== focusedElement
      ) {
        return;
      }

      submenu.focusChild(childIndex);
    }, "submenuFocus");
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * Ignores keydown events using Ctrl, Alt, or Meta.
   *
   * This method exists to assist the _handleKeyup method.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
   *
   * @protected
   */
  _handleKeydown() {
    if (this.isTopLevel && this.elements.controller) {
      this._addEventListener(
        "keydown",
        this.elements.controller.dom.controller,
        (event) => {
          // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
          if (event.ctrlKey || event.altKey || event.metaKey) return;

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
   * Ignores keyup events using Ctrl, Alt, or Meta.
   *
   * - Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
   *   - Toggles the menu when the user hits "Space" or "Enter".
   *
   * @protected
   */
  _handleKeyup() {
    this._addEventListener("keyup", this.dom.menu, () => {
      this._cancelAnimationFrame("submenuFocus");
    });

    if (this.isTopLevel && this.elements.controller) {
      this._addEventListener(
        "keyup",
        this.elements.controller.dom.controller,
        (event) => {
          // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
          if (event.ctrlKey || event.altKey || event.metaKey) return;

          this.currentEvent = "keyboard";

          const key = keyPress(event);

          if (key === "Space" || key === "Enter") {
            preventEvent(event);
            this.elements.controller.toggle();

            // If the menu is open, focus the first child.
            if (this.elements.controller.isExpanded) {
              this.focusFirstChild();
            }
          }
        }
      );
    }
  }

  /**
   * Sets the transition durations of the menu as a CSS custom properties.
   *
   * The custom properties are:
   *   - `--am-transition-duration`,
   *   - `--am-expand-transition-duration`, and
   *   - `--am-collapse-transition-duration`.
   *
   * The prefix of `am-` can be changed by setting the menu's prefix value.
   *
   * @protected
   */
  _setCustomProps() {
    this.dom.menu.style.setProperty(
      `--${this.prefix}transition-duration`,
      `${this.transitionDuration}ms`
    );

    this.dom.menu.style.setProperty(
      `--${this.prefix}expand-transition-duration`,
      `${this.expandDuration}ms`
    );

    this.dom.menu.style.setProperty(
      `--${this.prefix}collapse-transition-duration`,
      `${this.collapseDuration}ms`
    );

    this.elements.submenuToggles.forEach((toggle) => {
      toggle.elements.controlledMenu._setCustomProps();
    });
  }

  /**
   * Disposes of the menu, its controller, menu items, submenus, and submenu toggles.
   *
   * @public
   */
  dispose() {
    this.elements.submenuToggles.forEach((toggle) => {
      toggle.elements.controlledMenu.dispose();
      toggle.dispose();
    });
    this.elements.menuItems.forEach((item) => item.dispose());
    this.elements.controller?.dispose();

    super.dispose();
  }

  /**
   * Focus the menu's current child.
   *
   * @public
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
   * Accepts finite integers and uses currentChild's clamping rules. Throws a
   * TypeError for other types and a RangeError for fractions, NaN, and infinities.
   * Validates the index before blurring the current item or changing focus.
   *
   * @public
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(index) {
    isValidType("number", { index });

    if (!Number.isInteger(index)) {
      throw new RangeError("index must be a finite integer.");
    }

    this.blurCurrentChild();
    this.currentChild = index;
    this.focusCurrentChild();
  }

  /**
   * Focuses the menu's first child.
   *
   * @public
   */
  focusFirstChild() {
    this.focusChild(0);
  }

  /**
   * Focus the menu's last child.
   *
   * @public
   */
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }

  /**
   * Focus the menu's next child.
   *
   * @public
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
   *
   * @public
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
   *
   * @public
   */
  blurCurrentChild() {
    this.focusState = "none";

    if (this.currentChild !== -1) {
      this.currentMenuItem.blur();
    }
  }

  /**
   * Focus the menu's controller.
   *
   * @public
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
   *
   * @public
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
   * Collapse all submenu children.
   *
   * @public
   */
  collapseChildren() {
    this.elements.submenuToggles.forEach((toggle) => toggle.collapse());
  }

  /**
   * Blurs all children and submenu's children.
   *
   * @public
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
