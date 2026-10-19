import BaseMenu from "./_baseMenu.js";
import TopLinkDisclosureMenuItem from "./topLinkDisclosureMenuItem.js";
import TopLinkDisclosureMenuToggle from "./topLinkDisclosureMenuToggle.js";
import {
  preventEvent,
  keyPress,
} from "@accessible-ecosystem/core/eventHelpers.js";
import { isValidType } from "@accessible-ecosystem/core/validate.js";

/**
 * An accessible disclosure menu with top-level links in the DOM.
 *
 * See Example Disclosure Navigation Menu with Top-Level Links
 *
 * @extends BaseMenu
 *
 * @property {Object<string, string>} _selectors                   - The query selectors used by the menu to populate the dom.
 * @example
 * // Import the class.
 * import { TopLinkDisclosureMenu } from "accessible-menu";
 *
 * // Select the desired menu element.
 * const menuElement = document.querySelector("nav ul");
 *
 * // Create the menu.
 * const menu = new TopLinkDisclosureMenu({
 *   menuElement,
 * });
 */
class TopLinkDisclosureMenu extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenu}
   */
  _MenuType = TopLinkDisclosureMenu;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuItem}
   */
  _MenuItemType = TopLinkDisclosureMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuToggle}
   */
  _MenuToggleType = TopLinkDisclosureMenuToggle;

  /**
   * A flag to create separate menu items for navigation links and submenu toggles.
   *
   * @protected
   *
   * @type {boolean}
   */
  _splitMenuLinks = true;

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
   * Constructs a new `TopLinkDisclosureMenu`.
   *
   * @param {object}                 options                                     - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                         - The menu element in the DOM.
   * @param {string}                 [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}                 [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}                 [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}                 [options.submenuTogglesSelector = button]   - The query selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?string}                [options.submenuSubtogglesSelector = a]     - The query selector string for submenu toggle buttons/links below the top level. If null, submenuTogglesSelector is used.
   * @param {?HTMLElement}           [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}           [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])}     [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])}     [options.expandClass = show]                - The class to apply when a menu is expanded.
   * @param {?(string|string[])}     [options.collapseClass = hide]              - The class to apply when a menu is "closed".
   * @param {?(string|string[])}     [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between expanded and collapsed states.
   * @param {number}                 [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}                 [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}                 [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}                [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}                 [options.enterDelay = -1]                   - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}                 [options.leaveDelay = -1]                   - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {string}                 [options.breakpoint = '']                   - The breakpoint used to generate the root controller's media query.
   * @param {string}                 [options.mediaQuery = '']                   - The media query used to trigger the root controller's media query list events.
   * @param {boolean}                [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}                [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}                [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}                [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}                [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}                [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}                [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}                [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {boolean}                [options.optionalKeySupport = false]        - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {?string}                [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}                [options.key = null]                        - The key used to generate IDs throughout the menu.
   * @param {boolean}                [options.initialize = true]                 - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement,
    menuItemsSelector = "li",
    menuLinksSelector = "a",
    submenuItemsSelector = "li:has(ul)",
    submenuTogglesSelector = "button",
    submenusSelector = "ul",
    submenuSubtogglesSelector = "a",
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
      submenusSelector,
      submenuTogglesSelector,
      submenuSubtogglesSelector,
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
   *   BaseMenu's _handleClick method, and
   * - adds a `click` listener to the `document` so if the user
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
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's hover type.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *    current child value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   preview method for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   close method for the submenu item's toggle
   *   will be called after a delay set by the menu's hover delay.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   focus state is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a non-submenu item, and a submenu
   *   is already open, the collapseChildren method for the menu will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `pointerleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `pointerleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
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

          let toggle = menuItem.isSubmenuItem ? menuItem.elements.toggle : null;

          // Hovering over both the menu item _and_ the toggle item should work.
          if (menuItem.elements.sibling !== null) {
            toggle = menuItem.elements.sibling.elements.toggle;
          }

          // If there is no toggle exit out of the event.
          if (toggle === null) return;

          if (this.enterDelay > 0) {
            this._setTimeout(() => {
              toggle.preview();
            }, this.enterDelay);
          } else {
            toggle.preview();
          }
        } else if (this.hoverType === "dynamic") {
          this.currentChild = index;

          if (!this.isTopLevel || this.focusState !== "none") {
            this.currentEvent = "mouse";
            this.elements.rootMenu.blurChildren();
            this.focusCurrentChild();
          }

          if (!this.isTopLevel || this.hasExpanded) {
            this.currentEvent = "mouse";
            this.elements.rootMenu.blurChildren();
            this.focusCurrentChild();

            let toggle = menuItem.isSubmenuItem
              ? menuItem.elements.toggle
              : null;

            // Hovering over both the menu item _and_ the toggle item should work.
            if (menuItem.elements.sibling !== null) {
              toggle = menuItem.elements.sibling.elements.toggle;
            }

            if (toggle !== null) {
              if (this.enterDelay > 0) {
                this._setTimeout(() => {
                  toggle.preview();
                }, this.enterDelay);
              } else {
                toggle.preview();
              }
            } else {
              if (this.enterDelay > 0) {
                this._setTimeout(() => {
                  this.collapseChildren();
                }, this.enterDelay);
              } else {
                this.collapseChildren();
              }
            }
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
   * Handles keydown events throughout the menu for proper menu use.
   *
   * Ignores keydown events using Ctrl, Alt, or Meta.
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
      // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
      if (event.ctrlKey || event.altKey || event.metaKey) return;

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
   * Ignores keyup events using Ctrl, Alt, or Meta.
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
   * | _Home_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
   * | _End_ (Optional}) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
   *
   * The optional keybindings are controlled by the menu's optionalKeySupport value.
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup();

    this._addEventListener("keyup", this.dom.menu, (event) => {
      // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
      if (event.ctrlKey || event.altKey || event.metaKey) return;

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
              this._focusSubmenu(this.currentMenuItem);
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

export default TopLinkDisclosureMenu;
