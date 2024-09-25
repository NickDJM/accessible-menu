/* global Treeview */

import BaseMenuToggle from "./_baseMenuToggle.js";

/**
 * A link or button that controls the visibility of a Treeview.
 *
 * @extends BaseMenuToggle
 */
class TreeviewToggle extends BaseMenuToggle {
  /**
   * Constructs a new `TreeviewToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {Treeview}    options.controlledMenu      - The menu controlled by this toggle.
   * @param {?Treeview}   [options.parentMenu = null] - The menu containing this toggle.
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
   * Initializes the menu toggle.
   *
   * The first steps are to ensure that the toggle and controlled menu have IDs
   * using the setIds method, and to set the ARIA attributes on the toggle
   * and controlled menu using the setAriaAttributes method.
   *
   * Then the open or collapse method is called based on the state of the
   * toggle's aria-expanded attribute.
   */
  initialize() {
    // Ensure both toggle and menu have IDs.
    this._setIds();

    // Set ARIA attributes.
    this._setAriaAttributes();

    // Open the menu if aria-expanded is true, otherwise collapse it.
    if (this.dom.toggle.getAttribute("aria-expanded") === "true") {
      this.open();
    } else {
      this._collapse(false);
    }
  }

  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * set to "false" if it's not already set explicitly to "true".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID, and the toggle's `aria-owns` is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    // If the toggle element doesn't have aria-expanded set to true, set it to false.
    if (this.dom.toggle.getAttribute("aria-expanded") !== "true") {
      this.dom.toggle.setAttribute("aria-expanded", "false");
    }

    // Set up proper aria label and control.
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    );
    this.dom.toggle.setAttribute(
      "aria-owns",
      this.elements.controlledMenu.dom.menu.id
    );
  }
}

export default TreeviewToggle;
