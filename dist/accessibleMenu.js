var AccessibleMenu = (function () {
  'use strict';

  class MenuItem {
    /**
     * Construct the menu item.
     *
     * @param {object} menuItemElement - The menu item in the DOM.
     * @param {Menu}   parentMenu      - The parent menu.
     */
    constructor(menuItemElement, parentMenu) {
      this.domElements = {
        menuItem: menuItemElement,
        link: menuItemElement.querySelector("a")
      };

      this.elements = {
        parent: parentMenu
      };
    }

    /**
     * Initialize the menu item by setting its tab index.
     */
    initialize() {
      this.element.setAttribute("role", "menuitem");
      this.link.tabIndex = -1;
    }

    /**
     * The menu item element in the DOM.
     *
     * @returns {object} - The menu item element.
     */
    get element() {
      return this.domElements.menuItem;
    }

    /**
     * The link element inside the menu item.
     *
     * @returns {object} - The link.
     */
    get link() {
      return this.domElements.link;
    }

    /**
     * The item's parent Menu.
     *
     * @returns {Menu} - The parent menu.
     */
    get parentMenu() {
      return this.elements.parent;
    }

    /**
     * Focuses the menu item's link.
     */
    focus() {
      this.element.querySelector("a").focus();
    }
  }

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

      // Ensure both toggle and menu have IDs.
      if (this.element.id === "" || this.menu.element.id === "") {
        const randomString = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 10);

        const id = `${this.element.innerText
        .toLowerCase()
        .replace(/\s/g, "-")}-${randomString}`;

        this.element.id = this.element.id || `${id}-menu-button`;
        this.menu.element.id = this.menu.element.id || `${id}-menu`;
      }

      // Set up proper aria label and control.
      this.menu.element.setAttribute("aria-labelledby", this.element.id);
      this.element.setAttribute("aria-controls", this.menu.element.id);

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
          // The Right Arrow key should focus the next menu item in the parent menu.
          preventDefault(event);
          this.close();
          this.parentMenu.focusNextChild();
        } else if (this.parentMenu.isTopLevel && key === "ArrowLeft") {
          // The Left Arrow key should focus the next menu item in the parent menu.
          preventDefault(event);
          this.close();
          this.parentMenu.focusPreviousChild();
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
        }
      });
    }
  }

  class Menu {
    /**
     * Constructs the menu.
     *
     * @param {object}  menuElement           - The menu element in the DOM.
     * @param {string}  menuItemSelector      - The selector string for menu items.
     * @param {string}  submenuItemSelector   - The selector string for submenu items.
     * @param {string}  submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}  submenuSelector       - The selector string for the submenu itself.
     * @param {string}  submenuOpenClass      - The class to use when a submenu is open.
     * @param {boolean} isTopLevel            - Flags the menu as a top-level menu.
     */
    constructor(
      menuElement,
      menuItemSelector,
      submenuItemSelector,
      submenuToggleSelector,
      submenuSelector,
      submenuOpenClass = "show",
      isTopLevel = true
    ) {
      this.domElements = {
        menu: menuElement,
        menuItems: Array.from(
          menuElement.querySelectorAll(menuItemSelector)
        ).filter(item => item.parentElement === menuElement),
        submenuItems: Array.from(
          menuElement.querySelectorAll(submenuItemSelector)
        ).filter(item => item.parentElement === menuElement)
      };
      this.domSelectors = {
        "menu-items": menuItemSelector,
        "submenu-items": submenuItemSelector,
        "submenu-toggle": submenuToggleSelector,
        submenu: submenuSelector
      };
      this.elements = {
        menuItems: [],
        menuToggles: []
      };
      this.focussedChild = -1;
      this.focusState = "none";
      this.openClass = submenuOpenClass;
      this.root = isTopLevel;
    }

    /**
     * Initializes the menu with proper tab indexing and properties.
     *
     * This will also initialize all menu items and sub menus.
     *
     * @returns {undefined}
     */
    initialize() {
      this.element.setAttribute("role", "menu");
      this.element.tabIndex = 0;

      this.createMenuItems();
      this.handleKeydown();
      this.handleClick();
    }

    /**
     * The menu element in the DOM.
     *
     * @returns {object} - The menu.
     */
    get element() {
      return this.domElements.menu;
    }

    /**
     * The menu item DOM elements contained in the menu.
     *
     * @returns {object[]} - The menu items.
     */
    get menuItemElements() {
      return this.domElements.menuItems;
    }

    /**
     * The submenu item DOM elements contained in the menu.
     *
     * @returns {object[]} - The submenu items.
     */
    get submenuItemElements() {
      return this.domElements.submenuItems;
    }

    /**
     * The menu items contained in the menu.
     *
     * @returns {MenuItem[]} - The menu items.
     */
    get menuItems() {
      return this.elements.menuItems;
    }

    /**
     * The menu toggles contained in the menu.
     *
     * @returns {MenuToggle[]} - The menu toggles.
     */
    get menuToggles() {
      return this.elements.menuToggles;
    }

    /**
     * The DOM Selectors for the menu.
     *
     * @returns {object} - The DOM Selectors.
     */
    get selector() {
      return this.domSelectors;
    }

    /**
     * The focus state of the menu.
     *
     * @returns {string} - The focus state (self, child, none).
     */
    get currentFocus() {
      return this.focusState;
    }

    /**
     * The class used for open submenus.
     *
     * @returns {string} - The open class.
     */
    get openClass() {
      return this.submenuOpenClass;
    }

    /**
     * The flag to mark as a top-level menu.
     *
     * @returns {boolean} - The top-level flag.
     */
    get isTopLevel() {
      return this.root;
    }

    /**
     * Set the focus state of the menu.
     *
     * @param {boolean} state - The focus state (self, child, none).
     */
    set currentFocus(state) {
      const states = ["self", "child", "none"];

      if (!states.includes(state)) {
        throw new Error("Focus state must be 'self', 'child', or 'none'.");
      }

      this.focusState = state;
    }

    /**
     * Set the class used for open submenus.
     *
     * @param {string} value - The open class.
     */
    set openClass(value) {
      if (typeof value !== "string") {
        throw new TypeError("Class must be a string.");
      }

      this.submenuOpenClass = value;
    }

    set isTopLevel(value) {
      if (typeof value !== "boolean") {
        throw new TypeError("Top-level flag must be true or false.");
      }

      this.root = value;
    }

    /**
     * Creates and initializes all menu items.
     */
    createMenuItems() {
      this.menuItemElements.forEach(element => {
        // Create a new MenuItem.
        const menuItem = new MenuItem(element, this);

        // Add the item to the list of menu items.
        this.elements.menuItems.push(menuItem);

        // Initialize the menu item.
        menuItem.initialize();

        // If the menu item is a dropdown, create a SubmenuItem,
        // otherwise create a normal MenuItem.
        if (this.submenuItemElements.includes(element)) {
          // The menu's toggle controller DOM element.
          const toggler = element.querySelector(this.selector["submenu-toggle"]);
          // The actual menu DOM element.
          const submenu = element.querySelector(this.selector.submenu);

          // Create the new Menu and initialize it.
          const menu = new Menu(
            submenu,
            this.selector["menu-items"],
            this.selector["submenu-items"],
            this.selector["submenu-toggle"],
            this.selector.submenu,
            this.openClass,
            false
          );
          menu.initialize();

          // Create the new MenuToggle.
          const toggle = new MenuToggle(
            toggler,
            menu,
            this.openClass,
            this,
            menuItem
          );
          toggle.initialize();

          // Add it to the list of submenu items.
          this.elements.menuToggles.push(toggle);
        }
      });
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

      this.element.addEventListener("keydown", event => {
        const { key, code } = event;

        if (this.currentFocus === "none") {
          if (key === "Enter" || (key === " " && code === "Space")) {
            // The Enter & Space keys should enter the menu.
            preventDefault(event);
            this.currentFocus = "self";
            this.focusFirstChild();
          }
        } else if (this.currentFocus === "self") {
          if (key === "Escape") {
            // The Escape key should exit the menu.
            preventDefault(event);
            this.focus();
            this.currentFocus = "none";
          } else if (!this.isTopLevel && key === "ArrowUp") {
            // The Up Arrow key should focus the previous menu item in submenus.
            preventDefault(event);
            this.focusPreviousChild();
          } else if (this.isTopLevel && key === "ArrowRight") {
            // The Right Arrow key should focus the next menu item.
            preventDefault(event);
            this.focusNextChild();
          } else if (!this.isTopLevel && key === "ArrowDown") {
            // The Down Arrow key should focus the next item in submenus.
            preventDefault(event);
            this.focusNextChild();
          } else if (this.isTopLevel && key === "ArrowLeft") {
            // The Left Arrow key should focus the previous menu item.
            preventDefault(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // The Home key should focus the first menu item.
            preventDefault(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // The End key should focus the last menu item.
            preventDefault(event);
            this.focusLastChild();
          }
        }

        if (this.currentFocus !== "none") {
          if (key === "Tab") {
            // The Tab key should select the next element outside of the menu.
            this.blur();
            this.closeChildren();
          }
        }
      });
    }

    /**
     * Handle click events required for proper menu usage.
     */
    handleClick() {
      document.addEventListener("click", event => {
        if (
          !this.element.contains(event.target) &&
          this.element !== event.target
        ) {
          this.blur();
          this.closeChildren();
        }
      });
    }

    /**
     * Focus the menu.
     */
    focus() {
      this.focussedChild = 0;
      this.currentFocus = "self";
      this.element.focus();
    }

    /**
     * Unfocus the menu.
     */
    blur() {
      this.focussedChild = -1;
      this.currentFocus = "none";
      this.element.blur();
    }

    /**
     * Focues the menu's first child.
     */
    focusFirstChild() {
      this.focussedChild = 0;
      this.focusCurrentChild();
    }

    /**
     * Focus the menu's last child.
     */
    focusLastChild() {
      this.focussedChild = this.menuItems.length - 1;
      this.focusCurrentChild();
    }

    /**
     * Focus the menu's next child.
     */
    focusNextChild() {
      if (this.focussedChild === this.menuItems.length - 1) {
        this.focusFirstChild();
      } else {
        this.focussedChild = this.focussedChild + 1;
        this.focusCurrentChild();
      }
    }

    /**
     * Focus the menu's last child.
     */
    focusPreviousChild() {
      if (this.focussedChild === 0) {
        this.focusLastChild();
      } else {
        this.focussedChild = this.focussedChild - 1;
        this.focusCurrentChild();
      }
    }

    /**
     * Focus the menu's current child.
     */
    focusCurrentChild() {
      if (this.focussedChild !== -1) {
        this.menuItems[this.focussedChild].focus();
      }
    }

    /**
     * Close all submenu children.
     */
    closeChildren() {
      this.menuToggles.forEach(toggle => toggle.close());
    }
  }

  return Menu;

}());
