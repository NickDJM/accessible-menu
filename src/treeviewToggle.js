// eslint-disable-next-line no-unused-vars
/* global Treeview */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a {@link Treeview}.
 *
 * @extends BaseMenuToggle
 */
class TreeviewToggle extends BaseMenuToggle {
  /**
   * Constructs the menu toggle.
   *
   * @param {object}        options                     - The options for generating the menu toggle.
   * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
   * @param {Treeview}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {Treeview|null} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}       [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
}

export default TreeviewToggle;
