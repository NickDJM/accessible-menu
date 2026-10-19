import Component from "@accessible-ecosystem/core";
import BaseMenu from "./_baseMenu.js";
import BaseMenuToggle from "./_baseMenuToggle.js";
import {
  isValidInstance,
  isValidType,
} from "@accessible-ecosystem/core/validate.js";

/**
 * A basic navigation link contained inside of a BaseMenu.
 *
 * @extends Component
 */
class BaseMenuItem extends Component {
  _scope = "AccessibleMenu";
  _name = "MenuItem";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menuItems";
  _shouldStore = false;
  _rootDOMElement = "item";
  _protectedDOMElements = ["item", "link"];

  /**
   * A flag marking a submenu item.
   *
   * @protected
   *
   * @type {boolean}
   */
  _submenu = false;

  /**
   * Constructs a new `BaseMenuItem`.
   *
   * @param {object}          options                         - The options for generating the menu item.
   * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
   * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {?BaseMenuItem}   [options.submenuSibling = null] - The separate menu item that controls the submenu beside this link.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
    submenuSibling = null,
  }) {
    super({ prefix: "am-", initializeClass: "", bootstrap: false });

    // Set DOM elements.
    this._dom.item = menuItemElement;
    this._dom.link = menuLinkElement;

    // Set menu elements.
    this._elements.parentMenu = parentMenu;
    this._elements.childMenu = childMenu;
    this._elements.toggle = toggle;
    this._elements.sibling = submenuSibling;

    this._submenu = isSubmenuItem;
    this._bootstrap();
  }

  /**
   * Registers the menu item's validation event listener.
   *
   * Validation checks the required DOM elements, submenu flag, parent menu,
   * child menu, submenu toggle, and sibling menu item.
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

        for (const name of ["item", "link"]) {
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

        // Boolean checks.
        const booleans = {
          isSubmenuItem: this._submenu,
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

        // Menu checks.
        const menus = {
          parentMenu: this.elements.parentMenu,
        };

        if (this.elements.childMenu !== null || this.isSubmenuItem) {
          menus.childMenu = this.elements.childMenu;
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

        // Check the separate menu item that controls this link's submenu.
        // Most menu items do not have a separate toggle, so their sibling is null.
        if (this.elements.sibling !== null) {
          const siblingChecks = isValidInstance(
            BaseMenuItem,
            { submenuSibling: this.elements.sibling },
            { shouldThrow: false }
          );

          // Handle sibling check failure.
          if (!siblingChecks.status) {
            this._errors = [...this._errors, ...siblingChecks.errors];
            this._valid = false;
          }
        }

        // Toggle checks.
        if (this.elements.toggle !== null || this.isSubmenuItem) {
          const toggleChecks = isValidInstance(
            BaseMenuToggle,
            { toggle: this.elements.toggle },
            { shouldThrow: false }
          );

          // Handle toggle check failure.
          if (!toggleChecks.status) {
            this._errors = [...this._errors, ...toggleChecks.errors];
            this._valid = false;
          }
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
    const menu = this.elements.parentMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    return rootMenu ? rootMenu.currentEvent : super.currentEvent;
  }

  set currentEvent(value) {
    const menu = this.elements.parentMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    if (rootMenu) {
      rootMenu.currentEvent = value;
    } else {
      super.currentEvent = value;
    }
  }

  /**
   * A flag to check if the root menu allows the menu item to be focused in the DOM.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    const menu = this.elements.parentMenu;
    const rootMenu = menu?.elements.rootMenu || menu;

    return rootMenu ? rootMenu.shouldFocus : super.shouldFocus;
  }

  /**
   * A flag marking a submenu item.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _submenu
   */
  get isSubmenuItem() {
    return this._submenu;
  }

  /**
   * Sets the component ID to the menu item's existing ID.
   *
   * @protected
   */
  _setIds() {
    this._id = this.dom.item.id;
  }

  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * Cancels pending focus if the item is blurred or disposed of. Before focusing
   * the link, checks that focus has not moved away or left the parent menu.
   *
   * @public
   */
  focus() {
    this.focusState = "self";

    this._cancelAnimationFrame("focus");

    if (this.shouldFocus) {
      const focusedElement = document.activeElement;
      const parentFocusState = this.elements.parentMenu.focusState;

      this._requestAnimationFrame(() => {
        // Keep focus where it is if another action has moved it elsewhere.
        // Blurring the previous item can leave focus on the document body.
        if (
          this.focusState !== "self" ||
          this.elements.parentMenu.focusState !== parentFocusState ||
          !this.shouldFocus ||
          (document.activeElement !== focusedElement &&
            document.activeElement !== document.body)
        ) {
          return;
        }

        this.dom.link.focus();
      }, "focus");
    }
  }

  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  blur() {
    this._cancelAnimationFrame("focus");

    this.focusState = "none";

    if (this.shouldFocus) {
      this._requestAnimationFrame(() => {
        this.dom.link.blur();
      }, "blur");
    }
  }
}

export default BaseMenuItem;
