import MenuItem from "menuItem.js";
import Menu from "menu/js";

export class SubmenuItem extends MenuItem {
  /**
   * Construct the menu item.
   *
   * @param {object} menuItemElement - The menu item in the DOM.
   * @param {Menu}   parentMenu      - The parent menu.
   * @param {object} toggleElement   - The toggle link in the DOM.
   * @param {Menu}   childMenu       - The child menu.
   * @param {string} openClass       - The class to use when the child menu is open.
   */
  constructor(
    menuItemElement,
    parentMenu,
    toggleElement,
    childMenu,
    openClass
  ) {
    super(menuItemElement, parentMenu);

    this.domElements.toggle = toggleElement;
    this.elements.child = childMenu;
    this.show = false;
    this.openClass = openClass;
  }

  /**
   * Initialize the menu item by setting it's tab index,
   * ensuring WAI-ARIA values are set, handling click events,
   * and adding new keydown events.
   */
  initialize() {
    super.initialize();

    // Add WAI-ARIA properties.
    this.toggler.setAttribute("aria-haspopup", "true");
    this.toggler.setAttribute("aria-expanded", "false");
    this.toggler.setAttribute("role", "button");

    // Handle toggling the menu on click.
    this.toggler.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      this.toggle();
    });

    // Add new keydown events.
    this.handleKeydown();
  }

  /**
   * The menu element in the DOM.
   *
   * @returns {Menu} - The menu element.
   */
  get child() {
    return this.elements.child;
  }

  /**
   * The menu toggler DOM element.
   *
   * @returns {object} - The toggler.
   */
  get toggler() {
    return this.domElements.toggle;
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
   * @param {boolean} state - The open state.
   */
  set isOpen(state) {
    if (typeof state !== "boolean") {
      throw new TypeError("Open state must be true or false.");
    }

    this.show = state;
  }

  /**
   * Opens the submenu.
   */
  open() {
    if (!this.isOpen) {
      // Set the open value.
      this.isOpen = true;

      // Assign new WAI-ARIA/class values.
      this.toggler.setAttribute("aria-expanded", "true");
      this.element.classList.add(this.openClass);

      // Close all sibling menus.
      this.closeSiblings();

      // Set proper focus states to parent & child.
      this.parent.currentFocus = "child";
      this.child.currentFocus = "self";

      // Set the new focus.
      this.child.focusFirstChild();
    }
  }

  /**
   * Closes the submenu.
   */
  close() {
    if (this.isOpen) {
      // Set the open value.
      this.isOpen = false;

      // Assign new WAI-ARIA/class values.
      this.toggler.setAttribute("aria-expanded", "false");
      this.element.classList.remove(this.openClass);

      // Close all child menus.
      this.closeChildren();

      // Set proper focus states to parent & child.
      this.child.currentFocus = "none";
      this.parent.currentFocus = "self";

      // Set the new focus.
      this.parent.focusCurrentChild();
    }
  }

  /**
   * Toggles the open state of the menu.
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
    this.parent.elements.submenuItems.forEach(submenu => {
      if (submenu !== this) submenu.close();
    });
  }

  /**
   * Closes all child menus.
   */
  closeChildren() {
    this.child.elements.submenuItems.forEach(submenu => submenu.close());
  }

  /**
   * Sets up the hijacked keydown events.
   */
  handleKeydown() {
    /**
     * Short cut to preventing default event actions.
     *
     * @param {object} event - The event.
     */
    function preventDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.child.element.addEventListener("keydown", event => {
      const { key } = event;

      if (key === "Escape") {
        // The Escape key should close the current menu.
        preventDefault(event);
        this.close();
      }
    });
  }
}
