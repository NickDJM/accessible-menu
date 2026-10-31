import BaseMenu from "./_baseMenu.js";
import { isValidInstance } from "@accessible-ecosystem/core/validate.js";
import CollapsibleComponent from "@accessible-ecosystem/core/CollapsibleComponent.js";

/**
 * A link or button that controls the visibility of a BaseMenu.
 *
 * @extends CollapsibleComponent
 */
class BaseMenuToggle extends CollapsibleComponent {
  _scope = "AccessibleMenu";
  _name = "MenuToggle";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menuToggles";
  _shouldStore = false;
  _rootDOMElement = "controller";

  /**
   * A flag that prevents responsive expansion from enabling dynamic hover.
   *
   * @protected
   *
   * @type {boolean}
   */
  _handlingMediaQuery = false;

  /**
   * Constructs a new `BaseMenuToggle`.
   *
   * @param {object}       options                                     - The options for generating the menu toggle.
   * @param {HTMLElement}  options.menuToggleElement                   - The toggle element in the DOM.
   * @param {?HTMLElement} [options.containerElement = null]           - The element to apply the expand, collapse, and transition classes to. If null, the controlled menu element is used.
   * @param {?HTMLElement} [options.triggerElement = null]             - The element receiving expansion clicks. If null, the toggle element is used.
   * @param {BaseMenu}     options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?BaseMenu}    [options.parentMenu = null]                 - The menu containing this toggle.
   * @param {string}       [options.breakpoint = ""]                   - The breakpoint used to generate the controller's media query.
   * @param {string}       [options.mediaQuery = ""]                   - The media query used to trigger the controller's media query list events.
   * @param {boolean}      [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}      [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}      [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}      [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}      [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}      [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}      [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}      [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   */
  constructor({
    menuToggleElement,
    containerElement = null,
    triggerElement = null,
    controlledMenu,
    parentMenu = null,
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
  }) {
    // Submenus may not have a root menu yet, so use the classes and durations
    // configured on the controlled menu when setting up the toggle.
    //
    // Use the provided container for the toggle's classes, or the menu element
    // if no container is provided.
    super({
      controllerElement: menuToggleElement,
      controlledElement: containerElement ?? controlledMenu?.dom?.menu,
      triggerElement,
      expandClass: controlledMenu?.classes?.expand,
      collapseClass: controlledMenu?.classes?.collapse,
      transitionClass: controlledMenu?.classes?.transition,
      transitionDuration: controlledMenu?.durations?.transition,
      expandDuration: controlledMenu?.durations?.expand,
      collapseDuration: controlledMenu?.durations?.collapse,
      prefix: "am-",
      initializeClass: "",
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
      bootstrap: false,
    });

    // Set menu elements.
    this._elements.controlledMenu = controlledMenu;
    this._elements.parentMenu = parentMenu;

    this._bootstrap();
  }

  /**
   * Registers the menu toggle's validation event listener.
   *
   * Validation checks the required DOM elements, controlled menu, and parent menu.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap();
    this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (event) => {
        if (event.detail.component !== this) return;

        // DOM checks.
        // Check for null elements, which Component validation allows.
        const domElements = {};

        for (const name of ["controller", "controlled"]) {
          if (this.dom[name] === null) {
            domElements[`${name}Element`] = this.dom[name];
          }
        }

        // Check the required DOM elements.
        const domChecks = isValidInstance(HTMLElement, domElements, {
          shouldThrow: false,
        });

        // Handle DOM check failure.
        if (!domChecks.status) {
          this._errors = [...this._errors, ...domChecks.errors];
          this._valid = false;
        }

        // Menu checks.
        const menus = {
          controlledMenu: this.elements.controlledMenu,
        };

        if (this.elements.parentMenu !== null) {
          menus.parentMenu = this.elements.parentMenu;
        }

        // Check the menu relationships.
        const menuChecks = isValidInstance(BaseMenu, menus, {
          shouldThrow: false,
        });

        // Handle menu check failure.
        if (!menuChecks.status) {
          this._errors = [...this._errors, ...menuChecks.errors];
          this._valid = false;
        }
      }
    );
  }

  /**
   * The last event triggered anywhere in the menu tree.
   *
   * Reads and updates the root menu's value.
   *
   * @type {string}
   */
  get currentEvent() {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    return rootMenu ? rootMenu.currentEvent : super.currentEvent;
  }

  set currentEvent(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    if (rootMenu) {
      rootMenu.currentEvent = value;
    } else {
      super.currentEvent = value;
    }
  }

  /**
   * A flag to check if the root menu allows the toggle to be focused in the DOM.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    return rootMenu ? rootMenu.shouldFocus : super.shouldFocus;
  }

  /**
   * The class(es) to apply when the controlled menu is expanded.
   *
   * @type {string|string[]}
   */
  get expandClass() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu ? menu.expandClass : super.expandClass;
  }

  set expandClass(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.expandClass = value;
    this._classes.expand = value;
  }

  /**
   * The class(es) to apply when the controlled menu is collapsed.
   *
   * @type {string|string[]}
   */
  get collapseClass() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu ? menu.collapseClass : super.collapseClass;
  }

  set collapseClass(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.collapseClass = value;
    this._classes.collapse = value;
  }

  /**
   * The class(es) to apply when the controlled menu is transitioning.
   *
   * @type {string|string[]}
   */
  get transitionClass() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu
      ? menu.transitionClass
      : super.transitionClass;
  }

  set transitionClass(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.transitionClass = value;
    this._classes.transition = value;
  }

  /**
   * The duration of the transition between expanded and collapsed states (in milliseconds).
   *
   * @type {number}
   */
  get transitionDuration() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu
      ? menu.transitionDuration
      : super.transitionDuration;
  }

  set transitionDuration(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.transitionDuration = value;
    this._durations.transition = value;
  }

  /**
   * The duration of the transition from collapsed to expanded states (in milliseconds).
   *
   * @type {number}
   */
  get expandDuration() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu ? menu.expandDuration : super.expandDuration;
  }

  set expandDuration(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.expandDuration = value;
    this._durations.expand = value;
  }

  /**
   * The duration of the transition from expanded to collapsed states (in milliseconds).
   *
   * @type {number}
   */
  get collapseDuration() {
    const menu = this.elements.controlledMenu;

    return menu.elements.rootMenu
      ? menu.collapseDuration
      : super.collapseDuration;
  }

  set collapseDuration(value) {
    const menu = this.elements.controlledMenu;
    const rootMenu = menu.elements.rootMenu || menu;

    rootMenu.collapseDuration = value;
    this._durations.collapse = value;
  }

  /**
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `menu-button-${toggle-inner-text}-${key}`
   * - Set the menu's ID to: `menu-${toggle-inner-text}-${key}`
   *
   * @protected
   */
  _setIds() {
    if (
      this.dom.controller.id === "" ||
      this.elements.controlledMenu.dom.menu.id === ""
    ) {
      let id =
        this.dom.controller.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "";
      let finalID = this.elements.controlledMenu.key;

      if (
        !id.replace(/\s/g, "").length &&
        this.dom.controller.getAttribute("aria-label")
      ) {
        id = this.dom.controller
          .getAttribute("aria-label")
          .replace(/[^a-zA-Z0-9\s]/g, "");
      }

      if (id.replace(/\s/g, "").length > 0) {
        id = id.toLowerCase().replace(/\s+/g, "-");

        if (id.startsWith("-")) {
          id = id.substring(1);
        }

        if (id.endsWith("-")) {
          id = id.slice(0, -1);
        }

        finalID = `${id}-${finalID}`;
      }

      this.dom.controller.id =
        this.dom.controller.id || `menu-button-${finalID}`;
      this.elements.controlledMenu.dom.menu.id =
        this.elements.controlledMenu.dom.menu.id || `menu-${finalID}`;
    }

    this._id = this.dom.controller.id;
  }

  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * is initially set to "false".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    // Set up proper aria attributes.
    this.dom.controller.setAttribute("aria-expanded", "false");

    // Set up proper aria label and control.
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.controller.id
    );
  }

  /**
   * Applies responsive actions without changing the root menu's dynamicHoverEnabled value.
   *
   * Responsive expansion should not enable dynamic hover before a user expands
   * a menu themselves.
   *
   * @protected
   *
   * @param {MediaQueryListEvent} event - The media query's current state.
   */
  _mediaQueryListEventCallback(event) {
    this._handlingMediaQuery = true;

    try {
      super._mediaQueryListEventCallback(event);
    } finally {
      this._handlingMediaQuery = false;
    }
  }

  /**
   * Expands the controlled menu.
   *
   * Sets the root menu's dynamicHoverEnabled value to `true` unless a media query is
   * expanding the menu. Then calls
   * CollapsibleComponent's _expand method to set the ARIA attributes,
   * classes, and transitions.
   *
   * The classes and transitions are applied to the provided container,
   * or to the controlled menu element if no container is provided.
   * The toggle's `aria-expanded` attribute is set to "true".
   *
   * If `emit` is set to `true`, this will also emit the expand event.
   *
   * @protected
   *
   * @param {object}  [options = {}]                            - The options for expanding the menu.
   * @param {boolean} [options.emit = this.isInitialized]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when expanding.
   */
  _expand(options = {}) {
    const rootMenu = this.elements.controlledMenu.elements.rootMenu;

    if (rootMenu && !this._handlingMediaQuery) {
      rootMenu.dynamicHoverEnabled = true;
    }

    super._expand(options);
  }

  /**
   * Expands the controlled menu.
   *
   * Calls _expand and sets the isExpanded value to `true`.
   * If the toggle is initialized, also sets the controlled menu's focus state
   * to "self" and its parent menu's focus state to "child", if it has a parent menu.
   *
   * @param {object}  [options = {}]                            - The options for expanding the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to expand, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when expanding.
   */
  expand({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    if (this.isLocked && !force) return;

    if (this.isInitialized) this.elements.controlledMenu.focusState = "self";

    super.expand({ force, preserveState, emit, transition });
  }

  /**
   * Expands the controlled menu without the current focus entering it.
   *
   * Calls _expand and sets the isExpanded value to `true`.
   * If the toggle is initialized and has a parent menu, also sets that menu's
   * focus state to "self". This keeps focus outside the submenu.
   *
   * @param {object}  [options = {}]                            - The options for previewing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to preview, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when previewing.
   */
  preview({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    if (this.isLocked && !force) return;

    if (this.isInitialized && this.elements.parentMenu)
      this.elements.parentMenu.focusState = "self";

    super.preview({ force, preserveState, emit, transition });
  }

  /**
   * Collapses the controlled menu.
   *
   * Calls _collapse and sets the isExpanded value to `false`.
   * If the toggle is initialized, also blurs the controlled menu, setting its
   * focus state to "none", and sets the parent menu's focus state to "self",
   * if there is a parent menu.
   *
   * @param {object}  [options = {}]                            - The options for collapsing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to collapse, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when collapsing.
   */
  collapse({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    if (this.isLocked && !force) return;

    if (!this.isExpanded && !force) return;

    if (this.isInitialized) this.elements.controlledMenu.blur();
    if (this.isInitialized && this.elements.parentMenu)
      this.elements.parentMenu.focusState = "self";

    super.collapse({ force, preserveState, emit, transition });
  }

  /**
   * Collapses all sibling menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                            - The options for collapsing the sibling menus.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menus to collapse.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when collapsing.
   */
  collapseSiblings({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    if (this.elements.parentMenu) {
      this.elements.parentMenu.elements.submenuToggles.forEach((toggle) => {
        if (toggle !== this)
          toggle.collapse({ force, preserveState, emit, transition });
      });
    }
  }

  /**
   * Collapses all child menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                            - The options for collapsing the child menus.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menus to collapse.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when collapsing.
   */
  collapseChildren({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    this.elements.controlledMenu.elements.submenuToggles.forEach((toggle) =>
      toggle.collapse({ force, preserveState, emit, transition })
    );
  }
}

export default BaseMenuToggle;
