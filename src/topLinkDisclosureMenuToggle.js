/* global TopLinkDisclosureMenu */

import BaseMenuToggle from "./_baseMenuToggle.js";
import { isTag } from "./validate.js";

/**
 * A link or button that controls the visibility of a TopLinkDisclosureMenu.
 *
 * @extends BaseMenuToggle
 */
class TopLinkDisclosureMenuToggle extends BaseMenuToggle {
  /**
   * Constructs a new `TopLinkDisclosureMenuToggle`.
   *
   * @param {object}                 options                     - The options for generating the menu toggle.
   * @param {HTMLElement}            options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}            options.parentElement       - The element containing the controlled menu.
   * @param {TopLinkDisclosureMenu}  options.controlledMenu      - The menu controlled by this toggle.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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
    if (
      !isTag("button", { toggle: this.dom.toggle }, { shouldThrow: false })
        .status
    ) {
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
   * @param {object}  [options = {}]                  - The options for opening the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to open.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when opening.
   */
  open({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    // Close all siblings.
    this.closeSiblings({ force, preserveState, emit, transition });

    super.open({ force, preserveState, emit, transition });
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @param {object}  [options = {}]                  - The options for previewing the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to preview.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when previewing.
   */
  preview({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    // Close all siblings.
    this.closeSiblings({ force, preserveState, emit, transition });

    super.preview({ force, preserveState, emit, transition });
  }

  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @param {object}  [options = {}]                  - The options for closing the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  close({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    // If the toggle is already closed we're not forcing it, just return.
    if (!this.isOpen && !force) return;

    // Close all children.
    this.closeChildren({ force, preserveState, emit, transition });

    super.close({ force, preserveState, emit, transition });
  }
}

export default TopLinkDisclosureMenuToggle;
