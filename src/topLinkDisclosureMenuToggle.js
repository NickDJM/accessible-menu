/* global TopLinkDisclosureMenu */

import BaseMenuToggle from "./_baseMenuToggle.js";
import { isTag } from "@accessible-ecosystem/core/validate.js";

/**
 * A link or button that controls the visibility of a TopLinkDisclosureMenu.
 *
 * @extends BaseMenuToggle
 */
class TopLinkDisclosureMenuToggle extends BaseMenuToggle {
  /**
   * Constructs a new `TopLinkDisclosureMenuToggle`.
   *
   * @param {object}                 options                                     - The options for generating the menu toggle.
   * @param {HTMLElement}            options.menuToggleElement                   - The toggle element in the DOM.
   * @param {?HTMLElement}           [options.containerElement = null]           - The element to apply the expand, collapse, and transition classes to. If null, the controlled menu element is used.
   * @param {TopLinkDisclosureMenu}  options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null]                 - The menu containing this toggle.
   * @param {string}                 [options.breakpoint = ""]                   - The breakpoint used to generate the controller's media query.
   * @param {string}                 [options.mediaQuery = ""]                   - The media query used to trigger the controller's media query list events.
   * @param {boolean}                [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}                [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}                [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}                [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}                [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}                [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}                [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}                [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {boolean}                [options.initialize = true]                 - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement,
    containerElement = null,
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
      !isTag("button", { toggle: this.dom.controller }, { shouldThrow: false })
        .status
    ) {
      this.dom.controller.setAttribute("role", "button");
    }

    // Set the `aria-controls` attribute on the toggle to the menu's ID.
    this.dom.controller.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    );
  }

  /**
   * Expands the controlled menu.
   *
   * Calls the collapseSiblings method
   * and _then_ BaseMenuToggle's expand method.
   *
   * @param {object}  [options = {}]                            - The options for expanding the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to expand.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when expanding.
   */
  expand({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    // Collapse all siblings.
    if (this.isLocked && !force) return;

    if (this.isInitialized)
      this.collapseSiblings({ force, preserveState, emit, transition });

    super.expand({ force, preserveState, emit, transition });
  }

  /**
   * Expands the controlled menu without the current focus entering it.
   *
   * Calls the collapseSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @param {object}  [options = {}]                            - The options for previewing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to preview.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when previewing.
   */
  preview({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    // Collapse all siblings.
    if (this.isLocked && !force) return;

    if (this.isInitialized)
      this.collapseSiblings({ force, preserveState, emit, transition });

    super.preview({ force, preserveState, emit, transition });
  }

  /**
   * Collapses the controlled menu.
   *
   * Calls the collapseChildren method
   * and _then_ BaseMenuToggle's collapse method.
   *
   * @param {object}  [options = {}]                            - The options for collapsing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to collapse.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when collapsing.
   */
  collapse({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    // If the toggle is already closed we're not forcing it, just return.
    if (!this.isExpanded && !force) return;

    // Close all children.
    if (this.isLocked && !force) return;

    if (this.isInitialized)
      this.collapseChildren({ force, preserveState, emit, transition });

    super.collapse({ force, preserveState, emit, transition });
  }
}

export default TopLinkDisclosureMenuToggle;
