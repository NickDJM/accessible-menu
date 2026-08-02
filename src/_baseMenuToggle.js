/* global BaseMenu */

import { addClass, removeClass } from "./domHelpers.js";
import { isValidInstance } from "./validate.js";
import TransactionalValue from "./TransactionalValue.js";

/**
 * A link or button that controls the visibility of a BaseMenu.
 */
class BaseMenuToggle {
  /**
   * The DOM elements within the menu toggle.
   *
   * @protected
   *
   * @type {Object<HTMLElement>}
   *
   * @property {HTMLElement} toggle - The menu toggle.
   * @property {HTMLElement} parent - The menu containing this toggle.
   */
  _dom = {
    toggle: null,
    parent: null,
  };

  /**
   * The declared accessible-menu elements within the menu toggle.
   *
   * @protected
   *
   * @type {Object<BaseMenu>}
   *
   * @property {BaseMenu} controlledMenu - The menu controlled by this toggle.
   * @property {BaseMenu} parentMenu     - The menu containing this toggle.
   */
  _elements = {
    controlledMenu: null,
    parentMenu: null,
  };

  /**
   * The open state of the menu toggle.
   *
   * @protected
   *
   * @type {TransactionalValue<boolean>}
   */
  _open = new TransactionalValue(false);

  /**
   * Custom events that can be triggered throughout the menu toggle.
   *
   * @protected
   *
   * @type {Object<CustomEvent>}
   */
  _events = {
    /**
     * The event that is triggered when the menu toggle expands.
     *
     * @event accessibleMenuExpand
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    expand: new CustomEvent("accessibleMenuExpand", {
      bubbles: true,
      detail: { toggle: this },
    }),
    /**
     * The event that is triggered when the menu toggle collapses.
     *
     * @event accessibleMenuCollapse
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    collapse: new CustomEvent("accessibleMenuCollapse", {
      bubbles: true,
      detail: { toggle: this },
    }),
  };

  /**
   * Constructs a new `BaseMenuToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}    options.controlledMenu      - The menu controlled by this toggle.
   * @param {?BaseMenu}   [options.parentMenu = null] - The menu containing this toggle.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    parentMenu = null,
  }) {
    // Set DOM elements.
    this._dom.toggle = menuToggleElement;
    this._dom.parent = parentElement;

    // Set menu elements.
    this._elements.controlledMenu = controlledMenu;
    this._elements.parentMenu = parentMenu;
  }

  /**
   * Initializes the menu toggle.
   *
   * The first steps are to ensure that the toggle and controlled menu have IDs
   * using the setIds method, and to set the ARIA attributes on the toggle
   * and controlled menu using the setAriaAttributes method.
   *
   * Then the collapse method is called to make sure the submenu is closed.
   */
  initialize() {
    // Ensure both toggle and menu have IDs.
    this._setIds();

    // Set ARIA attributes.
    this._setAriaAttributes();

    // Collapse the menu.
    this._collapse(false);
  }

  /**
   * The DOM elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }

  /**
   * The declared accessible-menu elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<BaseMenu>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }

  /**
   * Custom events that can be triggered throughout the menu toggle.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _events
   */
  get events() {
    return this._events;
  }

  /**
   * The open state on the toggle.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open.value;
  }

  /**
   * The open state of the toggle that the user specifically triggered.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get hasOpened() {
    return this._open.committed;
  }

  /**
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `menu-button-${toggle-inner-text}-${key}`
   * - Set the menu's ID to: `menu-${toggle-inner-text}-${key}`
   *
   * @protected
   */
  _setIds() {
    if (
      this.dom.toggle.id === "" ||
      this.elements.controlledMenu.dom.menu.id === ""
    ) {
      let id = this.dom.toggle.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "";
      let finalID = this.elements.controlledMenu.key;

      if (
        !id.replace(/\s/g, "").length &&
        this.dom.toggle.getAttribute("aria-label")
      ) {
        id = this.dom.toggle
          .getAttribute("aria-label")
          .replace(/[^a-zA-Z0-9\s]/g, "");
      }

      if (id.replace(/\s/g, "").length > 0) {
        id = id.toLowerCase().replace(/\s+/g, "-");

        if (id.startsWith("-")) {
          id = id.substring(1);
        }

        if (id.endsWith("-")) {
          id = id.slice(0, -1);
        }

        finalID = `${id}-${finalID}`;
      }

      this.dom.toggle.id = this.dom.toggle.id || `menu-button-${finalID}`;
      this.elements.controlledMenu.dom.menu.id =
        this.elements.controlledMenu.dom.menu.id || `menu-${finalID}`;
    }
  }

  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * is initially set to "false".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    // Set up proper aria attributes.
    this.dom.toggle.setAttribute("aria-expanded", "false");

    // Set up proper aria label and control.
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    );
  }

  /**
   * Dispatch a custom event on an element in the DOM.
   *
   * @param {string}      eventType - The type of the event to dispatch.
   * @param {HTMLElement} element   - The element to dispatch the event on.
   */
  _dispatchEvent(eventType, element) {
    // Make sure the event type exists.
    if (!Object.keys(this.events).includes(eventType)) {
      throw new Error(
        `Accessible Menu: "${eventType}" is not a valid event type.`
      );
    }

    // Make sure the element is actually an HTML Element.
    isValidInstance(HTMLElement, { element });

    // Dispatch the event.
    element.dispatchEvent(this.events[eventType]);
  }

  /**
   * Expands the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "true", adds the
   * open class to the toggle's parent menu item
   * and controlled menu, and removes the closed class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuExpand
   *
   * @protected
   *
   * @fires accessibleMenuExpand
   *
   * @param {object}  [options = {}]              - The options for expanding the menu.
   * @param {boolean} [options.emit = true]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [options.transition = true] - A flag to use transitions when expanding.
   */
  _expand({ emit = true, transition = true } = {}) {
    const { closeClass, openClass, transitionClass, openDuration } =
      this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "true");
    this.elements.controlledMenu.elements.rootMenu.hasOpened = true;

    // If we're dealing with transition classes, then we need to utilize
    // requestAnimationFrame to add the transition class, remove the close class,
    // add the open class, and finally remove the transition class.
    if (transition && transitionClass !== "") {
      addClass(transitionClass, this.elements.controlledMenu.dom.menu);

      requestAnimationFrame(() => {
        removeClass(closeClass, this.elements.controlledMenu.dom.menu);

        requestAnimationFrame(() => {
          addClass(openClass, this.elements.controlledMenu.dom.menu);

          requestAnimationFrame(() => {
            setTimeout(() => {
              removeClass(
                transitionClass,
                this.elements.controlledMenu.dom.menu
              );
            }, openDuration);
          });
        });
      });
    } else {
      // Add the open class
      addClass(openClass, this.elements.controlledMenu.dom.menu);

      // Remove the close class.
      removeClass(closeClass, this.elements.controlledMenu.dom.menu);
    }

    if (emit) {
      this._dispatchEvent("expand", this.dom.toggle);
    }
  }

  /**
   * Collapses the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "false", adds the
   * closed class to the toggle's parent menu item
   * and controlled menu, and removes the open class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuCollapse
   *
   * @protected
   *
   * @fires accessibleMenuCollapse
   *
   * @param {object}  [options = {}]              - The options for collapsing the menu.
   * @param {boolean} [options.emit = true]       - A toggle to emit the collapse event once collapsed.
   * @param {boolean} [options.transition = true] - A flag to use transitions when collapsing.
   */
  _collapse({ emit = true, transition = true } = {}) {
    const { closeClass, openClass, transitionClass, closeDuration } =
      this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "false");

    // If we're dealing with transition classes, then we need to utilize
    // requestAnimationFrame to add the transition class, remove the open class,
    // add the close class, and finally remove the transition class.
    if (transition && transitionClass !== "") {
      addClass(transitionClass, this.elements.controlledMenu.dom.menu);

      requestAnimationFrame(() => {
        removeClass(openClass, this.elements.controlledMenu.dom.menu);

        requestAnimationFrame(() => {
          addClass(closeClass, this.elements.controlledMenu.dom.menu);

          requestAnimationFrame(() => {
            setTimeout(() => {
              removeClass(
                transitionClass,
                this.elements.controlledMenu.dom.menu
              );
            }, closeDuration);
          });
        });
      });
    } else {
      // Add the close class
      addClass(closeClass, this.elements.controlledMenu.dom.menu);

      // Remove the open class.
      removeClass(openClass, this.elements.controlledMenu.dom.menu);
    }

    if (emit) {
      this._dispatchEvent("collapse", this.dom.toggle);
    }
  }

  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isOpen value to `true`.
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
    // Set proper focus state on the child.
    this.elements.controlledMenu.focusState = "self";

    // If the toggle is already open and we're not forcing it, just return.
    if (this.isOpen && !force) return;

    this._expand({ emit, transition });

    // Set the open flag.
    this._open.value = true;

    if (!preserveState) {
      this._open.commit();
    }
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
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
    // Set proper focus state on the parent.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    // If the toggle is already open and we're not forcing it, just return.
    if (this.isOpen && !force) return;

    this._expand({ emit, transition });

    // Set the open flag.
    this._open.value = true;

    if (!preserveState) {
      this._open.commit();
    }
  }

  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's focus state to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's current child index to 0,
   * calls collapse, and sets
   * the isOpen value to `false`.
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
    // If the toggle is already closed and we're not forcing it, just return.
    if (!this.isOpen && !force) return;

    // Reset controlled menu.
    this.elements.controlledMenu.blur();

    // Set proper focus states on the parent.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    // Collapse the controlled menu.
    this._collapse({ emit, transition });

    // Set the open flag.
    this._open.value = false;

    if (!preserveState) {
      this._open.commit();
    }
  }

  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for toggling the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to open/close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand/collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when toggling.
   */
  toggle({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    if (this.isOpen) {
      this.close({ force, preserveState, emit, transition });
    } else {
      this.open({ force, preserveState, emit, transition });
    }
  }

  /**
   * Closes all sibling menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for closing the sibling menus.
   * @param {boolean} [options.force = false]         - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  closeSiblings({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    if (this.elements.parentMenu) {
      this.elements.parentMenu.elements.submenuToggles.forEach((toggle) => {
        if (toggle !== this)
          toggle.close({ force, preserveState, emit, transition });
      });
    }
  }

  /**
   * Closes all child menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for closing the child menus.
   * @param {boolean} [options.force = false]         - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  closeChildren({
    force = false,
    preserveState = false,
    emit = true,
    transition = true,
  } = {}) {
    this.elements.controlledMenu.elements.submenuToggles.forEach((toggle) =>
      toggle.close({ force, preserveState, emit, transition })
    );
  }
}

export default BaseMenuToggle;
