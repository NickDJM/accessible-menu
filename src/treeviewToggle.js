/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a [Treeview]{@link Treeview.md}.
 *
 * @augments BaseMenuToggle
 */
class TreeviewToggle extends BaseMenuToggle {
  /**
   * @inheritdoc
   *
   * @param {object}                  options                     - The options for generating the menu toggle.
   * @param {HTMLElement}             options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}             options.parentElement       - The element containing the controlled menu.
   * @param {TreeviewNavigation}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {TreeviewNavigation|null} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                 [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
