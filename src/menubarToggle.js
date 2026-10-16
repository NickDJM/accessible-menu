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
   * @param {object}       options                                     - The options for generating the menu toggle.
   * @param {HTMLElement}  options.menuToggleElement                   - The toggle element in the DOM.
   * @param {?HTMLElement} [options.containerElement = null]           - The element to apply the expand, collapse, and transition classes to. If null, the controlled menu element is used.
   * @param {Menubar}      options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?Menubar}     [options.parentMenu = null]                 - The menu containing this toggle.
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
   * Then sets the toggle's `aria-haspopup` attribute to "true".
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes();

    // Set aria-haspopup.
    this.dom.controller.setAttribute("aria-haspopup", "true");
  }

  /**
   * Opens the controlled menu.
   *
   * Calls the collapseSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @param {object}  [options = {}]                            - The options for opening the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to open.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when opening.
   */
  expand({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    // Close all siblings.
    if (this.isLocked && !force) return;

    if (this.isInitialized)
      this.collapseSiblings({ force, preserveState, emit, transition });

    super.expand({ force, preserveState, emit, transition });
  }

  /**
   * Opens the controlled menu without the current focus entering it.
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
    // Close all siblings.
    if (this.isLocked && !force) return;

    if (this.isInitialized)
      this.collapseSiblings({ force, preserveState, emit, transition });

    super.preview({ force, preserveState, emit, transition });
  }

  /**
   * Closes the controlled menu.
   *
   * Calls the collapseChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @param {object}  [options = {}]                            - The options for closing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to close.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when closing.
   */
  collapse({
    force = !this.isInitialized,
    preserveState = false,
    emit = this.isInitialized,
    transition = this.isInitialized,
  } = {}) {
    if (this.isExpanded) {
      // Close all children.
      if (this.isLocked && !force) return;

      if (this.isInitialized)
        this.collapseChildren({ force, preserveState, emit, transition });

      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusCurrentChild();
      }
    }

    super.collapse({ force, preserveState, emit, transition });
  }
}

export default MenubarToggle;
