/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuToggle from "./_baseMenuToggle.js";

/*
 * A link or button that controls the visibility of a DisclosureMenu.
 */
class DisclosureMenuToggle extends BaseMenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}               param0                       - The menu toggle object.
   * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
   * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
   * @param {DisclosureMenu}       param0.controlledMenu        - The menu controlled by this toggle.
   * @param {DisclosureMenu|null}  [param0.parentMenu = null]   - The menu containing this toggle.
   * @param {boolean}              [param0.initialize = true]   - A flag to initialize the menu toggle immediately upon creation.
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

export default DisclosureMenuToggle;
