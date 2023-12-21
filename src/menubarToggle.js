// eslint-disable-next-line no-unused-vars
/* global Menubar */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a Menubar.
 *
 * @extends BaseMenuToggle
 */
class MenubarToggle extends BaseMenuToggle {
  /**
   * Constructs a new `MenubarToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {Menubar}     options.controlledMenu      - The menu controlled by this toggle.
   * @param {?Menubar}    [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}     [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
   *
   * @public
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
   *
   * @public
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
   *
   * @public
   */
  close() {
    if (this.isOpen) {
      // Close all children.
      this.closeChildren();

      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusCurrentChild();
      }
    }

    super.close();
  }
}

export default MenubarToggle;
