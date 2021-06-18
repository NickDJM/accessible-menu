/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuToggle from "./_baseMenuToggle.js";

/*
 * A link or button that controls the visibility of a TreeviewNavigation.
 */
class TreeviewToggle extends BaseMenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}                  param0                     - The menu toggle object.
   * @param {HTMLElement}             param0.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}             param0.parentElement       - The element containing the controlled menu.
   * @param {TreeviewNavigation}      param0.controlledMenu      - The menu controlled by this toggle.
   * @param {TreeviewNavigation|null} [param0.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                 [param0.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
