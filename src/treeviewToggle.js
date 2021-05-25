/* eslint-disable jsdoc/no-undefined-types */

import BaseMenuToggle from "./_baseMenuToggle.js";

/*
 * A link or button that controls the visibility of a TreeviewNavigation.
 */
class TreeviewNavigationToggle extends BaseMenuToggle {
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

  /**
   * Opens the controlled menu.
   */
  open() {
    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "child";
    }

    this.elements.controlledMenu.focusState = "self";

    // Expand the controlled menu.
    this.expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   */
  preview() {
    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    this.elements.controlledMenu.focusState = "none";

    // Expand the controlled menu.
    this.expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Closes the controlled menu.
   */
  close() {
    if (this.isOpen) {
      // Reset controlled menu.
      this.elements.controlledMenu.currentChild = 0;
      this.elements.controlledMenu.blur();

      // Set proper focus states to parent & child.
      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }

      this.elements.controlledMenu.focusState = "none";

      // Collapse the controlled menu.
      this.collapse();

      // Set the open flag.
      this.isOpen = false;
    }
  }
}

export default TreeviewNavigationToggle;
