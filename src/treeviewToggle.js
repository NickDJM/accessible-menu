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
   * @param {object}       options                                     - The options for generating the menu toggle.
   * @param {HTMLElement}  options.menuToggleElement                   - The toggle element in the DOM.
   * @param {?HTMLElement} [options.containerElement = null]           - The element to apply the expand, collapse, and transition classes to. If null, the controlled menu element is used.
   * @param {?HTMLElement} [options.triggerElement = null]             - The element receiving expansion clicks. If null, the toggle element is used.
   * @param {Treeview}     options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?Treeview}    [options.parentMenu = null]                 - The menu containing this toggle.
   * @param {string}       [options.breakpoint = ""]                   - The breakpoint used to generate the controller's media query.
   * @param {string}       [options.mediaQuery = ""]                   - The media query used to trigger the controller's media query list events.
   * @param {boolean}      [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}      [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}      [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}      [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}      [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}      [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}      [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}      [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {boolean}      [options.initialize = true]                 - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement,
    containerElement = null,
    triggerElement = null,
    controlledMenu,
    parentMenu = null,
    breakpoint = "",
    mediaQuery = "",
    expandInsideBreakpoint = false,
    expandOutsideBreakpoint = false,
    collapseInsideBreakpoint = false,
    collapseOutsideBreakpoint = false,
    lockInsideBreakpoint = false,
    lockOutsideBreakpoint = false,
    unlockInsideBreakpoint = false,
    unlockOutsideBreakpoint = false,
    initialize = true,
  }) {
    super({
      menuToggleElement,
      containerElement,
      triggerElement,
      controlledMenu,
      parentMenu,
      breakpoint,
      mediaQuery,
      expandInsideBreakpoint,
      expandOutsideBreakpoint,
      collapseInsideBreakpoint,
      collapseOutsideBreakpoint,
      lockInsideBreakpoint,
      lockOutsideBreakpoint,
      unlockInsideBreakpoint,
      unlockOutsideBreakpoint,
    });

    if (initialize) {
      this.initialize();
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
    if (this.dom.controller.getAttribute("aria-expanded") !== "true") {
      this.dom.controller.setAttribute("aria-expanded", "false");
    }

    // Set up proper aria label and control.
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.controller.id
    );
    this.dom.controller.setAttribute(
      "aria-owns",
      this.elements.controlledMenu.dom.menu.id
    );
  }
}

export default TreeviewToggle;
