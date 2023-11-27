// eslint-disable-next-line no-unused-vars
/* global TopLinkDisclosureMenu */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a TopLinkDisclosureMenu.
 *
 * @extends BaseMenuToggle
 */
class TopLinkDisclosureMenuToggle extends BaseMenuToggle {
  /**
   * Constructs a new `TopLinkDisclosureMenuToggle`.
   *
   * @param {object}                     options                     - The options for generating the menu toggle.
   * @param {HTMLElement}                options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}                options.parentElement       - The element containing the controlled menu.
   * @param {TopLinkDisclosureMenu}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {TopLinkDisclosureMenu|null} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                    [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    parentMenu = null,
    initialize = true,
  }) {
    super({
      menuToggleElement,
      parentElement,
      controlledMenu,
      parentMenu,
    });

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   */
  open() {
    // Close all siblings.
    this.closeSiblings();

    super.open();
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   */
  preview() {
    // Close all siblings.
    this.closeSiblings();

    super.preview();
  }

  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   */
  close() {
    if (this.isOpen) {
      // Close all children.
      this.closeChildren();
    }

    super.close();
  }
}

export default TopLinkDisclosureMenuToggle;
