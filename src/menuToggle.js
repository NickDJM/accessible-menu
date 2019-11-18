import Menu from "./menu";
import MenuItem from "./menuItem";

class MenuToggle {
  /**
   * Construct the menu toggle.
   *
   * @param {object}   menuToggleElement - The toggle element in the DOM.
   * @param {Menu}     menu              - The menu controlled by the this toggle.
   * @param {string}   openClass         - The class to use when a submenu is open.
   * @param {Menu}     parentMenu        - The menu containing the toggle.
   * @param {MenuItem} parentMenuItem    - The menu item containing the toggle.
   * @param {Menu}     rootMenu          - The root menu containing the toggle.
   */
  constructor(
    menuToggleElement,
    menu,
    openClass = "show",
    parentMenu = null,
    parentMenuItem = null,
    rootMenu = null
  ) {
    this.domElements = {
      toggle: menuToggleElement
    };
    this.elements = {
      menuItem: parentMenuItem,
      menu: menu,
      parentMenu: parentMenu,
      rootMenu: rootMenu || parentMenu
    };
    this.openClass = openClass;
  }

  /**
   * Initialize the toggle by ensuring WAI-ARIA values are set,
   * handling click events, and adding new keydown events.
   */
  initialize() {
    // Add WAI-ARIA properties.
    this.element.setAttribute("aria-haspopup", "true");
    this.element.setAttribute("aria-expanded", "false");
    this.element.setAttribute("role", "button");

    // Handle toggling the menu on click.
    this.element.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      this.toggle();
    });

    // Add new keydown events.
    this.handleKeydown();
  }

  /**
   * The toggle element in the DOM.
   *
   * @returns {object} - The toggle element.
   */
  get element() {
    return this.domElements.toggle;
  }

  /**
   * The toggle's parent MenuItem.
   *
   * @returns {MenuItem} - The parent menu item.
   */
  get menuItem() {
    return this.elements.menuItem;
  }

  /**
   * The menu controlled by the toggle.
   *
   * @returns {Menu} - The menu element.
   */
  get menu() {
    return this.elements.menu;
  }

  /**
   * The menu containing the toggle.
   *
   * @returns {Menu} - The menu element.
   */
  get parentMenu() {
    return this.elements.parentMenu;
  }

  /**
   * The root menu containing the toggle.
   *
   * @returns {Menu} - The root menu element.
   */
  get rootMenu() {
    return this.elements.rootMenu;
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
      this.element.setAttribute("aria-expanded", "true");
      this.menuItem.element.classList.add(this.openClass);
      this.menu.element.classList.add(this.openClass);

      // Close all sibling menus.
      this.closeSiblings();

      // Set proper focus states to parent & child.
      this.parentMenu.currentFocus = "child";
      this.menu.currentFocus = "self";

      // Set the new focus.
      this.menu.focusFirstChild();
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
      this.element.setAttribute("aria-expanded", "false");
      this.menuItem.element.classList.remove(this.openClass);
      this.menu.element.classList.remove(this.openClass);

      // Close all child menus.
      this.closeChildren();

      // Set proper focus states to parent & child.
      this.menu.currentFocus = "none";
      this.parentMenu.currentFocus = "self";

      // Set the new focus.
      this.parentMenu.focusCurrentChild();
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
    try {
      this.parentMenu.menuToggles.forEach(toggle => {
        if (toggle !== this) toggle.close();
      });
    } catch (error) {
      // Fail quietly. No parent exists.
    }
  }

  /**
   * Closes all child menus.
   */
  closeChildren() {
    this.menu.menuToggles.forEach(toggle => toggle.close());
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
    this.menu.element.addEventListener("keydown", event => {
      const { key } = event;

      if (key === "Escape") {
        // The Escape key should close the current menu.
        preventDefault(event);
        this.close();
      } else if (this.parentMenu.isTopLevel && key === "ArrowRight") {
      }
    });
    this.menuItem.element.addEventListener("keydown", event => {
      const { key } = event;

      if (this.menu.currentFocus === "none" && this.parentMenu.isTopLevel) {
        if (key === "ArrowUp") {
          // The Up Arrow key should open the submenu and select the last child.
          preventDefault(event);
          this.open();
          this.menu.focusLastChild();
        } else if (key === "ArrowDown") {
          // The Down Arrow key should open the submenu and select the first child.
          preventDefault(event);
          this.open();
        }
        console.log(this.menu.currentFocus);
      }
    });
  }
}

export default MenuToggle;
