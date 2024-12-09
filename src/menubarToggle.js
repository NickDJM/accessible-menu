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
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Then sets the toggle's `aria-haspopup` attribute to "true".
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes();

    // Set aria-haspopup.
    this.dom.toggle.setAttribute("aria-haspopup", "true");
  }

  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @public
   *
   * @param {boolean} [emit = true]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [transition = true] - A toggle to respect transitions when expanding.
   */
  open(emit = true, transition = true) {
    // Close all siblings.
    this.closeSiblings(emit, transition);

    super.open(emit, transition);
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @public
   *
   * @param {boolean} [emit = true]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [transition = true] - A toggle to respect transitions when expanding.
   */
  preview(emit = true, transition = true) {
    // Close all siblings.
    this.closeSiblings(emit, transition);

    super.preview(emit, transition);
  }

  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @public
   *
   * @param {boolean} [emit = true]       - A toggle to emit the collapse event once collapsed.
   * @param {boolean} [transition = true] - A toggle to respect transitions when collapsing.
   */
  close(emit = true, transition = true) {
    if (this.isOpen) {
      // Close all children.
      this.closeChildren(emit, transition);

      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusCurrentChild();
      }
    }

    super.close(emit, transition);
  }
}

export default MenubarToggle;
