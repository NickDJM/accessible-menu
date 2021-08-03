/* eslint-disable jsdoc/no-undefined-types */

import { isTag, isValidType } from "./validate.js";

/**
 * A link or button that controls the visibility of a {@link BaseMenu}.
 */
class BaseMenuToggle {
  /**
   * The DOM elements within the menu toggle.
   *
   * @protected
   *
   * @type {object.<HTMLElement>}
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
   * @type {object.<BaseMenu>}
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
   * @type {boolean}
   */
  _open = false;

  /**
   * Expand event.
   *
   * @protected
   *
   * @event accessibleMenuExpand
   *
   * @type {CustomEvent}
   *
   * @property {object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _expandEvent = new CustomEvent("accessibleMenuExpand", {
    bubbles: true,
    detail: { toggle: this },
  });

  /**
   * Collapse event.
   *
   * @protected
   *
   * @event accessibleMenuCollapse
   *
   * @type {CustomEvent}
   *
   * @property {object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _collapseEvent = new CustomEvent("accessibleMenuCollapse", {
    bubbles: true,
    detail: { toggle: this },
  });

  /**
   * Constructs the menu toggle.
   *
   * @param {object}        options                     - The options for generating the menu toggle.
   * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {BaseMenu|null} [options.parentMenu = null] - The menu containing this toggle.
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
   * Initialize does a lot of setup on the menu toggle.
   *
   * The most basic setup steps are to ensure that the toggle has `aria-haspopup`
   * set to "true", `aria-expanded` initially set to "false" and, if the toggle
   * element is not a `<button>`, set the `role` to "button".
   *
   * The next step to the initialization is to ensure both the toggle and the
   * menu it controlls have IDs.
   *
   * If they do not, the following steps take place:
   * - Generate a random 10 character string,
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
   * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
   *
   * Once the ID's have been generated, the menu's `aria-labelledby` is set to
   * the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.
   *
   * Finally, the collapse method is called to make sure the submenu is closed.
   */
  initialize() {
    // Add WAI-ARIA properties.
    this.dom.toggle.setAttribute("aria-haspopup", "true");
    this.dom.toggle.setAttribute("aria-expanded", "false");

    // If the toggle element is a button, there's no need to add a role.
    if (!isTag("button", { toggle: this.dom.toggle })) {
      this.dom.toggle.setAttribute("role", "button");
    }

    // Ensure both toggle and menu have IDs.
    if (
      this.dom.toggle.id === "" ||
      this.elements.controlledMenu.dom.menu.id === ""
    ) {
      const randomString = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10);

      let id = this.dom.toggle.innerText.replace(/[^a-zA-Z0-9\s]/g, "");
      let finalID = randomString;

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

      this.dom.toggle.id = this.dom.toggle.id || `${finalID}-menu-button`;
      this.elements.controlledMenu.dom.menu.id =
        this.elements.controlledMenu.dom.menu.id || `${finalID}-menu`;
    }

    // Set up proper aria label and control.
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    );
    this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    );

    // Make sure the menu is collapsed on initialization, but do not emit the collapse event.
    this._collapse(false);
  }

  /**
   * Get the DOM elements within the toggle.
   *
   * @readonly
   *
   * @type {object.<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }

  /**
   * Get the declared accessible-menu elements within the menu toggle.
   *
   * @readonly
   *
   * @type {object.<BaseMenu>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }

  /**
   * Get the open state on the menu.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open;
  }

  set isOpen(value) {
    isValidType("boolean", { value });

    this._open = value;
  }

  /**
   * Expands the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "true", adds the
   * {@link BaseMenu#openClass|open class} to the toggle's parent menu item
   * and controlled menu, and removed the {@link BaseMenu#closeClass|closed class}
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called {@link accessibleMenuExpand}
   *
   * @protected
   *
   * @fires accessibleMenuExpand
   *
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  _expand(emit = true) {
    const { closeClass, openClass } = this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "true");

    // Add the open class
    if (openClass !== "") {
      if (typeof openClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.add(openClass);
      } else {
        this.elements.controlledMenu.dom.menu.classList.add(...openClass);
      }
    }

    // Remove the close class.
    if (closeClass !== "") {
      if (typeof closeClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
      } else {
        this.elements.controlledMenu.dom.menu.classList.remove(...closeClass);
      }
    }

    if (emit) {
      this.dom.toggle.dispatchEvent(this._expandEvent);
    }
  }

  /**
   * Collapses the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "false", adds the
   * {@link BaseMenu#closeClass|closed class} to the toggle's parent menu item
   * and controlled menu, and removes the {@link BaseMenu#openClass|open class}
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called {@link accessibleMenuCollapse}
   *
   * @protected
   *
   * @fires accessibleMenuCollapse
   *
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  _collapse(emit = true) {
    const { closeClass, openClass } = this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "false");

    // Add the close class
    if (closeClass !== "") {
      if (typeof closeClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.add(closeClass);
      } else {
        this.elements.controlledMenu.dom.menu.classList.add(...closeClass);
      }
    }

    // Remove the open class.
    if (openClass !== "") {
      if (typeof openClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.remove(openClass);
      } else {
        this.elements.controlledMenu.dom.menu.classList.remove(...openClass);
      }
    }

    if (emit) {
      this.dom.toggle.dispatchEvent(this._collapseEvent);
    }
  }

  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
   * and the parent menu's focus state to "child", calls {@link BaseMenuToggle#expand|expand},
   * and sets the {@link BaseMenuToggle#isOpen|isOpen} value to `true`.
   */
  open() {
    // Set proper focus state on the child.
    this.elements.controlledMenu.focusState = "self";

    // Expand the controlled menu.
    this._expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
   * and the parent menu's focus state to "child",
   * and calls {@link BaseMenuToggle#expand|expand}.
   */
  preview() {
    // Set proper focus state on the parent.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    // Expand the controlled menu.
    this._expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's {@link BaseMenu#currentChild|current child index} to 0,
   * calls {@link BaseMenuToggle#collapse|collapse}, and sets
   * the {@link BaseMenuToggle#isOpen|isOpen} value to `false`.
   */
  close() {
    if (this.isOpen) {
      // Reset controlled menu.
      this.elements.controlledMenu.currentChild = 0;
      this.elements.controlledMenu.blur();

      // Set proper focus states on the parent.
      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }

      // Collapse the controlled menu.
      this._collapse();

      // Set the open flag.
      this.isOpen = false;
    }
  }

  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Closes all sibling menus.
   */
  closeSiblings() {
    if (this.elements.parentMenu) {
      this.elements.parentMenu.elements.submenuToggles.forEach((toggle) => {
        if (toggle !== this) toggle.close();
      });
    }
  }

  /**
   * Closes all child menus.
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach((toggle) =>
      toggle.close()
    );
  }
}

export default BaseMenuToggle;
