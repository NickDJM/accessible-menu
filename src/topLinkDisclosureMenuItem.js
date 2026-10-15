/* global TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle */

import BaseMenuItem from "./_baseMenuItem.js";
import { isValidInstance } from "@accessible-ecosystem/core/validate.js";

/**
 * A basic navigation link contained inside of a TopLinkDisclosureMenu.
 *
 * @extends BaseMenuItem
 *
 * @property {Object<string, TopLinkDisclosureMenu|TopLinkDisclosureMenuToggle|TopLinkDisclosureMenuItem|null>} _elements         - The declared accessible-menu elements within the menu item.
 * @property {?TopLinkDisclosureMenuItem}                                                                       _elements.sibling - The sibling menu item that controls a submenu.
 */
class TopLinkDisclosureMenuItem extends BaseMenuItem {
  /**
   * Constructs a new `TopLinkDisclosureMenuItem`.
   *
   * @param {object}                       options                         - The options for generating the menu item.
   * @param {HTMLElement}                  options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}                  options.menuLinkElement         - The menu item's link in the DOM.
   * @param {TopLinkDisclosureMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}                      [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?TopLinkDisclosureMenu}       [options.childMenu = null]      - The child menu.
   * @param {?TopLinkDisclosureMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}                      [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   * @param {?TopLinkDisclosureMenuItem}   [options.submenuSibling = null] - The sibling menu item that controls a submenu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
    initialize = true,
    submenuSibling = null,
  }) {
    super({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem,
      childMenu,
      toggle,
    });

    // Set menu elements.
    this._elements.sibling = submenuSibling;

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Registers the menu item's validation event listener.
   *
   * Validation checks the sibling menu item if it is set.
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

        // Sibling checks.
        if (this.elements.sibling !== null) {
          const siblingChecks = isValidInstance(
            TopLinkDisclosureMenuItem,
            { submenuSibling: this.elements.sibling },
            { shouldThrow: false }
          );

          // Handle sibling check failure.
          if (!siblingChecks.status) {
            this._errors = [...this._errors, ...siblingChecks.errors];
            this._valid = false;
          }
        }
      }
    );
  }
}

export default TopLinkDisclosureMenuItem;
