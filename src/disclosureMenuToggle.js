/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a [DisclosureMenu]{@link DisclousreMenu.md}.
 *
 * @augments BaseMenuToggle
 */
class DisclosureMenuToggle extends BaseMenuToggle {
  /**
   * @inheritdoc
   *
   * @param {object}              options                     - The options for generating the menu toggle.
   * @param {HTMLElement}         options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}         options.parentElement       - The element containing the controlled menu.
   * @param {DisclosureMenu}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {DisclosureMenu|null} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}             [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
   */
  open() {
    // Close all siblings.
    this.closeSiblings();

    super.open();
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   */
  preview() {
    // Close all siblings.
    this.closeSiblings();

    super.preview();
  }

  /**
   * Closes the controlled menu.
   */
  close() {
    if (this.isOpen) {
      // Close all children.
      this.closeChildren();
    }

    super.close();
  }
}

export default DisclosureMenuToggle;
