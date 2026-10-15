import BaseMenu from "./_baseMenu.js";
import DisclosureMenuItem from "./disclosureMenuItem.js";
import DisclosureMenuToggle from "./disclosureMenuToggle.js";
import {
  preventEvent,
  keyPress,
} from "@accessible-ecosystem/core/eventHelpers.js";
import { isValidType } from "@accessible-ecosystem/core/validate.js";

/**
 * An accessible disclosure menu in the DOM.
 *
 * See Example Disclosure for Navigation Menus
 *
 * @extends BaseMenu
 */
class DisclosureMenu extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof DisclosureMenu}
   */
  _MenuType = DisclosureMenu;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof DisclosureMenuItem}
   */
  _MenuItemType = DisclosureMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof DisclosureMenuToggle}
   */
  _MenuToggleType = DisclosureMenuToggle;

  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = -1;

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _optionalSupport = false;

  /**
   * Constructs a new `DisclosureMenu`.
   *
   * @param {object}             options                                     - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                         - The menu element in the DOM.
   * @param {string}             [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuTogglesSelector = button]   - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])} [options.expandClass = show]                - The class to apply when a menu is expanded.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between expanded and collapsed states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}             [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}             [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?DisclosureMenu}    [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for closing a menu if the menu is focusable (in milliseconds).
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
   * @param {boolean}            [options.optionalKeySupport = false]        - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                 - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement,
    menuItemsSelector = "li",
    menuLinksSelector = "a",
    submenuItemsSelector = "li:has(ul)",
    submenuTogglesSelector = "button",
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
    optionalKeySupport = false,
    prefix = "am-",
    key = null,
    initialize = true,
  }) {
    super({
      menuElement,
      menuItemsSelector,
      menuLinksSelector,
      submenuItemsSelector,
      submenuTogglesSelector,
      submenusSelector,
      controllerElement,
      containerElement,
      initializeClass,
      expandClass,
      collapseClass,
      transitionClass,
      transitionDuration,
      expandDuration,
      collapseDuration,
      isTopLevel,
      parentMenu,
      hoverType,
      hoverDelay,
      enterDelay,
      leaveDelay,
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
      prefix,
      key,
    });

    // Set optional key support.
    this._optionalSupport = optionalKeySupport;

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Registers the menu's validation event listener.
   *
   * Validation checks the optionalKeySupport flag.
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

        // Boolean checks.
        const booleans = {
          optionalKeySupport: this._optionalSupport,
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
      }
    );
  }

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @type {boolean}
   *
   * @see _optionalSupport
   */
  get optionalKeySupport() {
    return this.isTopLevel
      ? this._optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }

  set optionalKeySupport(value) {
    isValidType("boolean", { optionalKeySupport: value });

    this._optionalSupport = value;
  }

  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `click` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick();

    // Close the menu if a click event happens outside of it.
    this._addEventListener("click", document, (event) => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (
          !this.dom.menu.contains(event.target) &&
          !this.dom.menu !== event.target
        ) {
          this.collapseChildren();
          this.blur();

          if (this.elements.controller) {
            this.elements.controller.collapse();
          }

          this.elements.rootMenu.hasExpanded = false;
        }
      }
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ optional keyboard support
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown();

    this._addEventListener("keydown", this.dom.menu, (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      // Prevent default event actions if we're handling the keyup event.
      if (this.focusState === "self") {
        const keys = ["Space", "Enter"];
        const controllerKeys = ["Escape"];
        const parentKeys = ["Escape"];
        const optionalKeys = [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End",
        ];

        if (keys.includes(key)) {
          preventEvent(event);
        } else if (this.optionalKeySupport && optionalKeys.includes(key)) {
          preventEvent(event);
        } else if (this.elements.controller && controllerKeys.includes(key)) {
          preventEvent(event);
        } else if (this.elements.parentMenu && parentKeys.includes(key)) {
          preventEvent(event);
        }
      }
    });
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * WAI ARIA Practices Example Disclosure for Navigation Menus):
   *
   * | Key | Function |
   * | --- | --- |
   * | _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
   * | _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
   * | _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
   * | _Down Arrow_ or _Right Arrow_ (Optional}) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
   * | _Up Arrow_ or _Left Arrow_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
   * | _Home_ (Optional) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
   * | _End_ (Optional) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
   *
   * The optional keybindings are controlled by the menu's optionalKeySupport value.
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup();

    this._addEventListener("keyup", this.dom.menu, (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (this.focusState === "self") {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
          preventEvent(event);

          if (this.currentMenuItem.isSubmenuItem) {
            if (this.currentMenuItem.elements.toggle.isExpanded) {
              this.currentMenuItem.elements.toggle.collapse();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "Escape") {
          // Hitting Escape
          // - If a dropdown is open, closes it.
          // - If was within the closed dropdown, sets focus on the button that controls that dropdown.
          const hasOpenChild = this.elements.submenuToggles.some(
            (toggle) => toggle.isExpanded
          );

          if (hasOpenChild) {
            preventEvent(event);
            this.collapseChildren();
          } else if (this.elements.parentMenu) {
            preventEvent(event);
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.collapseChildren();
            this.elements.parentMenu.focusCurrentChild();
          } else if (
            this.isTopLevel &&
            this.elements.controller &&
            this.elements.controller.isExpanded
          ) {
            this.elements.controller.collapse();
            this.focusController();
          }
        } else if (this.optionalKeySupport) {
          if (key === "ArrowDown" || key === "ArrowRight") {
            // Hitting the Down or Right Arrow:
            // - If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.
            // - If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.
            // - If focus is on a link, and it is not the last link, moves focus to the next link.
            preventEvent(event);

            if (
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isExpanded
            ) {
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            } else {
              this.focusNextChild();
            }
          } else if (key === "ArrowUp" || key === "ArrowLeft") {
            // Hitting the Up or Left Arrow:
            // - If focus is on a button, and it is not the first button, moves focus to the previous button.
            // - If focus is on a link, and it is not the first link, moves focus to the previous link.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // Hitting Home:
            // - If focus is on a button, and it is not the first button, moves focus to the first button.
            // - If focus is on a link, and it is not the first link, moves focus to the first link.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - If focus is on a button, and it is not the last button, moves focus to the last button.
            // - If focus is on a link, and it is not the last link, moves focus to the last link.
            preventEvent(event);
            this.focusLastChild();
          }
        }
      }
    });
  }
}

export default DisclosureMenu;
