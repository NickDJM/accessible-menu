import BaseMenu from "./_baseMenu";
import { isHTMLElement, isMenu, isString, isTag, isBoolean } from "./validate";

/**
 * A link or button that controls the visibility of a menu.
 */
class MenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}        param0                       - The menu toggle object.
   * @param {HTMLElement}   param0.menuToggleElement     - The toggle element in the DOM.
   * @param {HTMLElement}   param0.parentElement         - The element containing the controlled menu.
   * @param {BaseMenu}      param0.controlledMenu        - The menu controlled by this toggle.
   * @param {string|null}   [param0.openClass = "show"]  - The class to apply when the controlled menu is "open".
   * @param {string|null}   [param0.closeClass = "hide"] - The class to apply when the controlled menu is "closed".
   * @param {BaseMenu|null} [param0.parentMenu = null]   - The menu containing this toggle.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    openClass = "show",
    closeClass = "hide",
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
    this.openClass = openClass || "";
    this.closeClass = closeClass || "";
    this.isOpen = false;

    this.initialize();
  }

  /**
   * Initialize the toggle by ensuring WAI-ARIA values are set,
   * handling click events, and adding new keydown events.
   */
  initialize() {
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

      const id = `${this.dom.toggle.innerText
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s/g, "-")}-${randomString}`;

      this.dom.toggle.id = this.dom.toggle.id || `${id}-menu-button`;
      this.elements.controlledMenu.dom.menu.id =
        this.elements.controlledMenu.dom.menu.id || `${id}-menu`;
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
    if (this.closeClass !== "") {
      this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
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
   * The class to apply when the controlled menu is "open".
   *
   * @returns {string} - The class.
   */
  get openClass() {
    return this.controlledMenuOpenClass;
  }

  /**
   * The class to apply when the controlled menu is "closed".
   *
   * @returns {string} - The class.
   */
  get closeClass() {
    return this.controlledMenuCloseClass;
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
   * Set the class to apply when the controlled menu is "open".
   *
   * @param {string} value - The class.
   */
  set openClass(value) {
    isString({ value });

    this.controlledMenuOpenClass = value;
  }

  /**
   * Set the class to apply when the controlled menu is "closed".
   *
   * @param {string} value - The class.
   */
  set closeClass(value) {
    isString({ value });

    this.controlledMenuCloseClass = value;
  }

  /**
   * Expands the controlled menu.
   *
   * Alters ARIA attributes and classes.
   */
  expand() {
    this.dom.toggle.setAttribute("aria-expanded", "true");

    // Add the open class
    if (
      this.openClass !== "" &&
      !this.elements.controlledMenu.dom.menu.classList.contains(this.openClass)
    ) {
      this.elements.controlledMenu.dom.menu.classList.add(this.openClass);
    }

    // Remove the close class.
    if (
      (this.closeClass !== "") &
      this.elements.controlledMenu.dom.menu.classList.contains(this.closeClass)
    ) {
      this.elements.controlledMenu.dom.menu.classList.remove(this.closeClass);
    }
  }

  /**
   * Collapses the controlled menu.
   *
   * Alters ARIA attributes and classes.
   */
  collapse() {
    this.dom.toggle.setAttribute("aria-expanded", "false");

    // Add the close class
    if (
      this.closeClass !== "" &&
      !this.elements.controlledMenu.dom.menu.classList.contains(this.closeClass)
    ) {
      this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
    }

    // Remove the open class.
    if (
      (this.openClass !== "") &
      this.elements.controlledMenu.dom.menu.classList.contains(this.openClass)
    ) {
      this.elements.controlledMenu.dom.menu.classList.remove(this.openClass);
    }
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

export default MenuToggle;
