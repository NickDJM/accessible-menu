/* eslint-disable jsdoc/no-undefined-types */

import { isHTMLElement, isMenu, isTag, isBoolean } from "./validate.js";

/*
 * A link or button that controls the visibility of a Menu.
 */
class BaseMenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}               param0                       - The menu toggle object.
   * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
   * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
   * @param {BaseMenu}             param0.controlledMenu        - The menu controlled by this toggle.
   * @param {BaseMenu|null}        [param0.parentMenu = null]   - The menu containing this toggle.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    parentMenu = null,
  }) {
    // Run validations.
    isHTMLElement({ menuToggleElement, parentElement });

    if (parentMenu !== null) {
      isMenu({ controlledMenu, parentMenu });
    } else {
      isMenu({ controlledMenu });
    }

    this.domElements = {
      toggle: menuToggleElement,
      parent: parentElement,
    };
    this.menuElements = {
      controlledMenu,
      parentMenu,
    };
    this.isOpen = false;

    this.expandEvent = new CustomEvent("accessibleMenuExpand", {
      bubbles: true,
      detail: { toggle: this },
    });
    this.collapseEvent = new CustomEvent("accessibleMenuCollapse", {
      bubbles: true,
      detail: { toggle: this },
    });

    this.initialize();
  }

  /**
   * Initialize the toggle by ensuring WAI-ARIA values are set,
   * handling click events, and adding new keydown events.
   */
  initialize() {
    const { closeClass } = this.elements.controlledMenu;

    // Add WAI-ARIA properties.
    this.dom.toggle.setAttribute("aria-haspopup", "true");
    this.dom.toggle.setAttribute("aria-expanded", "false");

    // If the toggle element is a button, there's no need to add a role.
    if (!isTag("button", this.dom.toggle)) {
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

    // Add closed class.
    if (closeClass !== "") {
      if (typeof closeClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.add(closeClass);
      } else if (Array.isArray(closeClass)) {
        closeClass.forEach(value => {
          this.elements.controlledMenu.dom.menu.classList.add(value);
        });
      }
    }
  }

  /**
   * The DOM elements within the toggle.
   *
   * @returns {object} - The DOM elements.
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The elements within the toggle.
   *
   * @returns {object} - The elements.
   */
  get elements() {
    return this.menuElements;
  }

  /**
   * The open state on the menu.
   *
   * @returns {boolean} - The open state.
   */
  get isOpen() {
    return this.show;
  }

  /**
   * Set the open state on the menu.
   *
   * @param {boolean} value - The open state.
   */
  set isOpen(value) {
    isBoolean({ value });

    this.show = value;
  }

  /**
   * Expands the controlled menu.
   *
   * Alters ARIA attributes and classes.
   */
  expand() {
    const { closeClass, openClass } = this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "true");

    // Add the open class
    if (openClass !== "") {
      if (typeof openClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.add(openClass);
      } else if (Array.isArray(openClass)) {
        openClass.forEach(value => {
          this.elements.controlledMenu.dom.menu.classList.add(value);
        });
      }
    }

    // Remove the close class.
    if (closeClass !== "") {
      if (typeof closeClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
      } else if (Array.isArray(closeClass)) {
        closeClass.forEach(value => {
          this.elements.controlledMenu.dom.menu.classList.remove(value);
        });
      }
    }

    this.dom.toggle.dispatchEvent(this.expandEvent);
  }

  /**
   * Collapses the controlled menu.
   *
   * Alters ARIA attributes and classes.
   */
  collapse() {
    const { closeClass, openClass } = this.elements.controlledMenu;

    this.dom.toggle.setAttribute("aria-expanded", "false");

    // Add the close class
    if (closeClass !== "") {
      if (typeof closeClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.add(closeClass);
      } else if (Array.isArray(closeClass)) {
        closeClass.forEach(value => {
          this.elements.controlledMenu.dom.menu.classList.add(value);
        });
      }
    }

    // Remove the open class.
    if (openClass !== "") {
      if (typeof openClass === "string") {
        this.elements.controlledMenu.dom.menu.classList.remove(openClass);
      } else if (Array.isArray(openClass)) {
        openClass.forEach(value => {
          this.elements.controlledMenu.dom.menu.classList.remove(value);
        });
      }
    }

    this.dom.toggle.dispatchEvent(this.collapseEvent);
  }

  /**
   * Opens the controlled menu.
   */
  open() {
    this.isOpen = true;

    // Expand the controlled menu and close all siblings.
    this.expand();
    this.closeSiblings();

    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) this.elements.parentMenu.focusState = "child";
    this.elements.controlledMenu.focusState = "self";
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   */
  preview() {
    this.isOpen = true;

    // Expand the controlled menu and close all siblings.
    this.expand();
    this.closeSiblings();

    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    this.elements.controlledMenu.focusState = "none";
  }

  /**
   * Closes the controlled menu.
   */
  close() {
    if (this.isOpen) {
      this.isOpen = false;

      // Close the controlled menu and close all siblings.
      this.collapse();
      this.closeChildren();

      // Set proper focus states to parent & child.
      this.elements.controlledMenu.currentChild = 0;
      this.elements.controlledMenu.blur();

      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }
    }
  }

  /**
   * Toggles the open state of the controlled menu.
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
      this.elements.parentMenu.elements.submenuToggles.forEach(toggle => {
        if (toggle !== this) toggle.close();
      });
    }
  }

  /**
   * Closes all child menus.
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach(toggle =>
      toggle.close()
    );
  }
}

export default BaseMenuToggle;
