/* eslint-disable jsdoc/no-undefined-types */

import { isTag, isValidType } from "./validate.js";

/**
 * A link or button that controls the visibility of a [BaseMenu]{@link BaseMenu.md}.
 */
class BaseMenuToggle {
  /**
   * @inheritdoc
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
  }

  /**
   * Initialize the toggle by ensuring WAI-ARIA values are set, handling click events, and adding new keydown events.
   *
   * Initialize does a lot of setup on the menu toggle.
   *
   * The most basic setup steps are to ensure that the toggle has `aria-haspopup` set to `"true"`, `aria-expanded` initially set to `"false"` and, if the toggle element is not a `<button>`, set the `role` to `"button"`.
   *
   * The next step to the initialization is to ensure both the toggle and the menu it controlls have IDs.
   *
   * If they do not, the following steps take place:
   * - Generate a random 10 character string,
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
   * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
   *
   * Once the ID's have been generated, the menu's "aria-labelledby" is set to the toggle's ID, and the toggle's "aria-controls" is set to the menu's ID.
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
    this.collapse(false);
  }

  /**
   * The DOM elements within the toggle.
   *
   * @type {object.<HTMLElement>}
   */
  get dom() {
    return this.domElements;
  }

  /**
   * The elements within the toggle.
   *
   * @type {object.<BaseMenu>}
   */
  get elements() {
    return this.menuElements;
  }

  /**
   * The open state on the menu.
   *
   * @type {boolean}
   */
  get isOpen() {
    return this.show;
  }

  set isOpen(value) {
    isValidType("boolean", { value });

    this.show = value;
  }

  /**
   * Expands the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to `"true"`, adds the open class to the toggle's parent menu item and controlled menu, and removed the closed class from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuExpand` which bubbles and contains the toggle object in `event.detail`.
   *
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  expand(emit = true) {
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
      this.dom.toggle.dispatchEvent(this.expandEvent);
    }
  }

  /**
   * Collapses the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to `"false"`, adds the closed class to the toggle's parent menu item and controlled menu, and removed the open class from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuCollapse` which bubbles and contains the toggle object in `event.detail`.
   *
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  collapse(emit = true) {
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
      this.dom.toggle.dispatchEvent(this.collapseEvent);
    }
  }

  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`,
   * calls {@link expand}, and sets {@link isOpen} to `true`.
   */
  open() {
    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "child";
    }

    this.elements.controlledMenu.focusState = "self";

    // Expand the controlled menu.
    this.expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`, and calls {@link expand}
   */
  preview() {
    // Set proper focus states to parent & child.
    if (this.elements.parentMenu) {
      this.elements.parentMenu.focusState = "self";
    }

    this.elements.controlledMenu.focusState = "none";

    // Expand the controlled menu.
    this.expand();

    // Set the open flag.
    this.isOpen = true;
  }

  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's focus state to `"none"` and the parent menu's focus state to `"self"`,
   * blurs the controlled menus and sets it's current child index to 0,
   * calls {@link collapse}, and sets {@link isOpen} to `false`.
   */
  close() {
    if (this.isOpen) {
      // Reset controlled menu.
      this.elements.controlledMenu.currentChild = 0;
      this.elements.controlledMenu.blur();

      // Set proper focus states to parent & child.
      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }

      this.elements.controlledMenu.focusState = "none";

      // Collapse the controlled menu.
      this.collapse();

      // Set the open flag.
      this.isOpen = false;
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
