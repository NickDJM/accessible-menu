// eslint-disable-next-line no-unused-vars
/* global BaseMenu */

import { addClass, removeClass } from "./domHelpers.js";
import { isTag, isValidType } from "./validate.js";

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
   * @type {boolean}
   */
  _open = false;

  /**
   * The event that is triggered when the menu toggle expands.
   *
   * @protected
   *
   * @event accessibleMenuExpand
   *
   * @type {CustomEvent}
   *
   * @property {boolean}                bubbles - A flag to bubble the event.
   * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _expandEvent = new CustomEvent("accessibleMenuExpand", {
    bubbles: true,
    detail: { toggle: this },
  });

  /**
   * The event that is triggered when the menu toggle collapses.
   *
   * @protected
   *
   * @event accessibleMenuCollapse
   *
   * @type {CustomEvent}
   *
   * @property {boolean}                bubbles - A flag to bubble the event.
   * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _collapseEvent = new CustomEvent("accessibleMenuCollapse", {
    bubbles: true,
    detail: { toggle: this },
  });

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
   * The open state on the toggle.
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
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Generate a random 10 character string,
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
   * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
   *
   * @protected
   */
  _setIds() {
    if (
      this.dom.toggle.id === "" ||
      this.elements.controlledMenu.dom.menu.id === ""
    ) {
      const randomString = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10);

      let id = this.dom.toggle.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "";
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

      this.dom.toggle.id = this.dom.toggle.id || `menu-button-${finalID}`;
      this.elements.controlledMenu.dom.menu.id =
        this.elements.controlledMenu.dom.menu.id || `menu-${finalID}`;
    }
  }

  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-haspopup`
   * set to "true", `aria-expanded` is initially set to "false" and,
   * if the toggle element is not a `<button>`, set the `role` to "button".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    // Set up proper aria attributes.
    this.dom.toggle.setAttribute("aria-haspopup", "true");
    this.dom.toggle.setAttribute("aria-expanded", "false");

    // If the toggle element is a button, there's no need to add a role.
    if (!isTag("button", { toggle: this.dom.toggle })) {
      this.dom.toggle.setAttribute("role", "button");
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
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  _expand(emit = true) {
    const { closeClass, openClass, transitionClass } =
      this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "true");

    // If we're dealing with transition classes, then we need to utilize
    // requestAnimationFrame to add the transition class, remove the close class,
    // add the open class, and finally remove the transition class.
    if (transitionClass !== "") {
      addClass(transitionClass, this.elements.controlledMenu.dom.menu);

      requestAnimationFrame(() => {
        if (closeClass !== "") {
          removeClass(closeClass, this.elements.controlledMenu.dom.menu);
        }

        requestAnimationFrame(() => {
          if (openClass !== "") {
            addClass(openClass, this.elements.controlledMenu.dom.menu);
          }

          requestAnimationFrame(() => {
            removeClass(transitionClass, this.elements.controlledMenu.dom.menu);
          });
        });
      });
    } else {
      // Add the open class
      if (openClass !== "") {
        addClass(openClass, this.elements.controlledMenu.dom.menu);
      }

      // Remove the close class.
      if (closeClass !== "") {
        removeClass(closeClass, this.elements.controlledMenu.dom.menu);
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
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  _collapse(emit = true) {
    const { closeClass, openClass, transitionClass } =
      this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "false");

    // If we're dealing with transition classes, then we need to utilize
    // requestAnimationFrame to add the transition class, remove the open class,
    // add the close class, and finally remove the transition class.
    if (transitionClass !== "") {
      addClass(transitionClass, this.elements.controlledMenu.dom.menu);

      requestAnimationFrame(() => {
        if (openClass !== "") {
          removeClass(openClass, this.elements.controlledMenu.dom.menu);
        }

        requestAnimationFrame(() => {
          if (closeClass !== "") {
            addClass(closeClass, this.elements.controlledMenu.dom.menu);
          }

          requestAnimationFrame(() => {
            removeClass(transitionClass, this.elements.controlledMenu.dom.menu);
          });
        });
      });
    } else {
      // Add the close class
      if (closeClass !== "") {
        addClass(closeClass, this.elements.controlledMenu.dom.menu);
      }

      // Remove the open class.
      if (openClass !== "") {
        removeClass(openClass, this.elements.controlledMenu.dom.menu);
      }
    }

    if (emit) {
      this.dom.toggle.dispatchEvent(this._collapseEvent);
    }
  }

  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isOpen value to `true`.
   *
   * @public
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
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
   *
   * @public
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
   * Sets the controlled menu's focus state to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's current child index to 0,
   * calls collapse, and sets
   * the isOpen value to `false`.
   *
   * @public
   */
  close() {
    if (this.isOpen) {
      // Reset controlled menu.
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
   *
   * @public
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
   *
   * @public
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
   *
   * @public
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach((toggle) =>
      toggle.close()
    );
  }
}

export default BaseMenuToggle;
