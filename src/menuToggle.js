import Menu from "./menu";
import { preventEvent } from "./eventHandlers";
import { isHTMLElement, isMenu, isString, isBoolean } from "./validate";

/**
 * A link or button that controls the visibility of a menu.
 */
class MenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}      param0                      - The menu toggle object.
   * @param {HTMLElement} param0.menuToggleElement    - The toggle element in the DOM.
   * @param {HTMLElement} param0.parentElement        - The element containing the controlled menu.
   * @param {Menu}        param0.controlledMenu       - The menu controlled by this toggle.
   * @param {string}      [param0.openClass = "show"] - The class to apply when the controlled menu is "open".
   * @param {Menu|null}   [param0.parentMenu = null]  - The menu containing this toggle.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    openClass = "show",
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
    this.openClass = openClass;
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
    this.dom.toggle.setAttribute("role", "button");

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

    // Add new events.
    this.handleClick();
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
   * Expands the controlled menu.
   *
   * Alters ARIA attributes and classes.
   */
  expand() {
    this.dom.toggle.setAttribute("aria-expanded", "true");
    this.dom.parent.classList.add(this.openClass);
    this.elements.controlledMenu.dom.menu.classList.add(this.openClass);
  }

  /**
   * Opens the submenu.
   *
   * @param {Event} event - The triggering event.
   */
  open(event) {
    // Set the open value.
    this.isOpen = true;

    // Expand the controlled menu and close all siblings.
    this.expand();
    this.closeSiblings(event);

    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) this.elements.parentMenu.focusState = "child";
    this.elements.controlledMenu.focusState = "self";

    if (!(event instanceof MouseEvent)) {
      // Set the new focus.
      this.elements.controlledMenu.focusFirstChild();
    }
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * @param {Event} event - The triggering event.
   */
  preview(event) {
    // Set the open value.
    this.isOpen = true;

    // Expand the controlled menu and close all siblings.
    this.expand();
    this.closeSiblings(event);

    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";

      if (!(event instanceof MouseEvent)) {
        this.elements.parentMenu.focusCurrentChild();
      }
    }

    this.elements.controlledMenu.focusState = "none";
  }

  /**
   * Closes the controlled menu.
   *
   * @param {Event} event - The triggering event.
   */
  close(event) {
    if (this.isOpen) {
      this.isOpen = false;

      // Assign new WAI-ARIA/class values.
      this.dom.toggle.setAttribute("aria-expanded", "false");
      this.dom.parent.classList.remove(this.openClass);
      this.elements.controlledMenu.dom.menu.classList.remove(this.openClass);

      if (!(event instanceof MouseEvent)) {
        this.elements.controlledMenu.focusFirstChild();
      }

      // Close all child menus.
      this.closeChildren(event);

      // Set proper focus states to parent & child.
      this.elements.controlledMenu.blur(event);

      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";

        if (!(event instanceof MouseEvent)) {
          // Set the new focus.
          this.elements.parentMenu.focusCurrentChild();
        }
      } else if (
        this.elements.controlledMenu.isTopLevel &&
        !(event instanceof MouseEvent)
      ) {
        this.elements.controlledMenu.focusController();
      }
    }
  }

  /**
   * Toggles the open state of the controlled menu.
   *
   * @param {Event} event - The triggering event.
   */
  toggle(event) {
    if (this.isOpen) {
      this.close(event);
    } else {
      this.open(event);
    }
  }

  /**
   * Closes all sibling menus.
   *
   * @param {Event} event - The triggering event.
   */
  closeSiblings(event) {
    try {
      this.elements.parentMenu.elements.submenuToggles.forEach(toggle => {
        if (toggle !== this) toggle.close(event);
      });
    } catch (error) {
      // Fail quietly. No parent exists.
    }
  }

  /**
   * Closes all child menus.
   *
   * @param {Event} event - The triggering event.
   */
  closeChildren(event) {
    this.elements.controlledMenu.elements.submenuToggles.forEach(toggle =>
      toggle.close(event)
    );
  }

  /**
   * Handle click events required for proper menu usage.
   */
  handleClick() {
    // Handle toggling the menu on click.
    this.dom.toggle.addEventListener("click", event => {
      preventEvent(event);

      this.toggle(event);
    });
  }
}

export default MenuToggle;
