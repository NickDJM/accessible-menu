/* global DisclosureMenu */

import BaseMenuToggle from "./_baseMenuToggle.js";
import { isTag } from "./validate.js";

/**
 * A link or button that controls the visibility of a DisclosureMenu.
 *
 * @extends BaseMenuToggle
 */
class DisclosureMenuToggle extends BaseMenuToggle {
  /**
   * Constructs a new `DisclosureMenuToggle`.
   *
   * @param {object}          options                     - The options for generating the menu toggle.
   * @param {HTMLElement}     options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}     options.parentElement       - The element containing the controlled menu.
   * @param {DisclosureMenu}  options.controlledMenu      - The menu controlled by this toggle.
   * @param {?DisclosureMenu} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}         [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Ensures the toggle element has a `role` of "button" if it is not
   * already a button.
   *
   * Then using the toggle and menu's IDs, the toggle's `aria-controls`
   * is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes();

    // If the toggle element is a button, there's no need to add a role.
    if (!isTag("button", { toggle: this.dom.toggle })) {
      this.dom.toggle.setAttribute("role", "button");
    }

    // Set the `aria-controls` attribute on the toggle to the menu's ID.
    this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    );
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
    }

    super.close();
  }
}

export default DisclosureMenuToggle;
