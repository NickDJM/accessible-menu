var AccessibleMenu = (function () {
  'use strict';

  // Custom validation for params.
  const validate = {
    event: value => {
      if (!(value instanceof Event)) {
        throw new TypeError("event must be an event.");
      }
    },
    keyboardEvent: value => {
      if (!(value instanceof KeyboardEvent)) {
        throw new TypeError("event must be a keyboard event.");
      }
    }
  };

  /**
   * Retrieves the pressed key from an event.
   *
   * @param   {KeyboardEvent} event - The keyboard event.
   *
   * @returns {string} - The name of the key.
   */
  function keyPress(event) {
    // Run validation.
    validate.keyboardEvent(event);

    try {
      // Use event.key or event.keyCode to support older browsers.
      const key = event.key || event.keyCode;
      const keys = {
        Enter: key === "Enter" || key === 13,
        Space: key === " " || key === "Spacebar" || key === 32,
        Escape: key === "Escape" || key === "Esc" || key === 27,
        ArrowUp: key === "ArrowUp" || key === "Up" || key === 38,
        ArrowRight: key === "ArrowRight" || key === "Right" || key === 39,
        ArrowDown: key === "ArrowDown" || key === "Down" || key === 40,
        ArrowLeft: key === "ArrowLeft" || key === "Left" || key === 37,
        Home: key === "Home" || key === 36,
        End: key === "End" || key === 35,
        Character: !!key.match(/^[a-zA-Z]{1}$/),
        Tab: key === "Tab" || key === 9
      };

      return Object.keys(keys).find(key => keys[key] === true);
    } catch (error) {
      // Return an empty string if something goes wrong.
      return "";
    }
  }

  /**
   * Stops an event from taking action.
   *
   * @param {Event} event - The event.
   */
  function preventEvent(event) {
    // Run validation.
    validate.event(event);

    event.preventDefault();
    event.stopPropagation();
  }

  // Custom validation for params.
  const validate$1 = {
    menuToggleElement: value => {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuToggleElement must be an HTML Element.");
      }
    },
    parentElement: value => {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("parentElement must be an HTML Element.");
      }
    },
    menu: value => {
      // Ensure value is an Menu element.
      if (!(value instanceof Menu)) {
        throw new TypeError("menu must be a Menu.");
      }
    },
    openClass: value => {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw TypeError("openClass must be a string.");
      }

      // Ensure value is a valid CSS class name.
      const invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");
      if (invalidCharacters.length > 0) {
        throw Error("openClass must be a valid CSS class.");
      }
    },
    parentMenu: value => {
      // Value is allowed to be null.
      if (value === null) return;

      // Ensure value is an Menu element.
      if (!(value instanceof Menu)) {
        throw new TypeError("parentMenu must be a Menu.");
      }
    }
  };

  /**
   * A link or button that controls the visibility of a menu.
   *
   * Must be initialized to be fully functional.
   */
  class MenuToggle {
    /**
     * {@inheritdoc}
     *
     * @param {object}           param0                   - The menu toggle object.
     * @param {HTMLElement}      param0.menuToggleElement - The toggle element in the DOM.
     * @param {HTMLElement}      param0.parentElement     - The element containing the menu.
     * @param {Menu}             param0.menu              - The menu controlled by the this toggle.
     * @param {string}           param0.openClass         - The class to use when a submenu is open.
     * @param {Menu|null}        param0.parentMenu        - The menu containing the toggle.
     */
    constructor({
      menuToggleElement,
      parentElement,
      menu,
      openClass = "show",
      parentMenu = null
    }) {
      // Run validations.
      validate$1.menuToggleElement(menuToggleElement);
      validate$1.parentElement(parentElement);
      validate$1.menu(menu);
      validate$1.openClass(openClass);
      validate$1.parentMenu(parentMenu);

      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement
      };
      this.elements = {
        menu: menu,
        parentMenu: parentMenu
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
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s/g, "-")}-${randomString}`;

        this.element.id = this.element.id || `${id}-menu-button`;
        this.menu.element.id = this.menu.element.id || `${id}-menu`;
      }

      // Set up proper aria label and control.
      this.menu.element.setAttribute("aria-labelledby", this.element.id);
      this.element.setAttribute("aria-controls", this.menu.element.id);

      // Add new events.
      this.handleClick();
    }

    /**
     * The toggle element in the DOM.
     *
     * @returns {HTMLElement} - The toggle element.
     */
    get element() {
      return this.domElements.toggle;
    }

    /**
     * The toggle's parent DOM element.
     *
     * @returns {HTMLElement} - The parent element.
     */
    get parentElement() {
      return this.domElements.parent;
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
      if (typeof value !== "boolean") {
        throw new TypeError("Open state must be true or false.");
      }

      this.show = value;
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
        this.parentElement.classList.add(this.openClass);
        this.menu.element.classList.add(this.openClass);

        // Close all sibling menus.
        this.closeSiblings();

        // Set proper focus states to parent & child.
        if (this.parentMenu) this.parentMenu.currentFocus = "child";
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
        this.parentElement.classList.remove(this.openClass);
        this.menu.element.classList.remove(this.openClass);

        // Close all child menus.
        this.closeChildren();

        // Set proper focus states to parent & child.
        this.menu.currentFocus = "none";

        if (this.parentMenu) {
          this.parentMenu.currentFocus = "self";

          // Set the new focus.
          this.parentMenu.focusCurrentChild();
        } else if (this.menu.isTopLevel) {
          this.menu.focusController();
        }
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
     * Handle click events required for proper menu usage.
     */
    handleClick() {
      // Handle toggling the menu on click.
      this.element.addEventListener("click", event => {
        preventEvent(event);

        this.toggle();
      });
    }
  }

  const validate$2 = {
    childMenu: value => {
      if (!(value instanceof Submenu)) {
        throw new TypeError("childMenu must be a Submenu.");
      }
    },
    toggle: toggle => {
      if (!(toggle instanceof MenuToggle)) {
        throw new TypeError("toggle must be a MenuToggle.");
      }
    }
  };

  /**
   * A navigation link containing a submenu.
   */
  class submenuItem extends MenuItem {
    /**
     * {@inheritdoc}
     *
     * @param {object}       param0                 - The menu item object.
     * @param {HTMLElement}  param0.menuItemElement - The menu item in the DOM.
     * @param {Menu|Submenu} param0.parentMenu      - The parent menu.
     * @param {Submenu}      param0.childMenu       - The child menu.
     * @param {MenuToggle}   param0.toggle          - The controller for the child menu.
     */
    constructor({ menuItemElement, parentMenu, childMenu, toggle }) {
      validate$2.childMenu(childMenu);
      validate$2.toggle(toggle);

      super({ menuItemElement, parentMenu });

      this.elements = {
        ...this.elements,
        childMenu,
        toggle
      };
    }

    /**
     * The link element inside the menu item.
     *
     * @returns {HTMLElement} - The link.
     */
    get linkElement() {
      return this.toggle.element;
    }

    /**
     * The item's child menu.
     *
     * @returns {Submenu} - The menu.
     */
    get childMenu() {
      return this.elements.childMenu;
    }

    /**
     * The item's toggle.
     *
     * @returns {MenuToggle} - The toggle.
     */
    get toggle() {
      return this.elements.toggle;
    }
  }

  const validate$3 = {
    parentMenu: value => {
      if (!(value instanceof Menu || value instanceof Submenu)) {
        throw new TypeError("parentMenu must be either a Menu or a Submenu.");
      }
    }
  };

  /**
   * A Menu nested inside of another Menu.
   *
   * Must be initialized to be fully functional.
   */
  class Submenu extends Menu {
    /**
     * {@inheritdoc}
     *
     * @param {object}       param0                       - The menu object.
     * @param {HTMLElement}  param0.menuElement           - The menu element in the DOM.
     * @param {string}       param0.menuItemSelector      - The selector string for menu items.
     * @param {string}       param0.submenuItemSelector   - The selector string for submenu items.
     * @param {string}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}       param0.submenuSelector       - The selector string for the submenu itself.
     * @param {string}       param0.openClass             - The class to use when a submenu is open.
     * @param {Menu|Submenu} param0.parentMenu            - The menu containing this menu.
     */
    constructor({
      menuElement,
      menuItemSelector,
      submenuItemSelector,
      submenuToggleSelector,
      submenuSelector,
      openClass,
      parentMenu
    }) {
      validate$3.parentMenu(parentMenu);

      super({
        menuElement,
        menuItemSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        openClass
      });

      this.elements = {
        ...this.elements,
        parentMenu: parentMenu
      };
    }

    /**
     * Set up the menu.
     */
    initialize() {
      // Get the root menu.
      this.findRootMenu(this.parentMenu);

      super.initialize();

      this.element.setAttribute("aria-rolle", "menu");
    }

    /**
     * The menu's parent menu.
     *
     * @returns {Menu|Submenu} - The menu.
     */
    get parentMenu() {
      return this.elements.parentMenu;
    }

    /**
     * The menu's root parent menu.
     *
     * @returns {Menu} - The menu.
     */
    get rootMenu() {
      return this.elements.rootMenu;
    }

    /**
     * Set the menu's root parent menu.
     *
     * @param {Menu} menu - The menu.
     */
    set rootMenu(menu) {
      if (!(menu instanceof Menu)) {
        throw new TypeError("menu must be a Menu.");
      }

      this.elements.rootMenu = menu;
    }

    findRootMenu(menu) {
      if (menu instanceof Menu) {
        this.rootMenu = this.parentMenu;
      } else if (menu instanceof Submenu) {
        this.findRootMenu(menu.parentMenu);
      } else {
        throw new TypeError("menu must be a Menu or a Submenu");
      }
    }

    handleKeydown() {
      this.currentMenuItem.linkElement.addEventListener("keydown", event => {
        const key = keyPress(event);
        const { altKey, crtlKey, metaKey } = event;
        const modifier = altKey || crtlKey || metaKey;

        if (this.currentFocus === "self") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Activates menu item, causing the link to be activated.
            preventEvent(event);
            this.currentMenuItem.linkElement.click();
          } else if (key === "Escape") {
            // Hitting Escape:
            // - Closes submenu.
            // - Moves focus to parent menubar item.
            preventEvent(event);
            this.rootMenu.closeChildren();
            this.rootMenu.focusCurrentChild();
          } else if (key === "ArrowRight") {
            // Hitting the Right Arrow:
            // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
            // - If focus is on an item that does not have a submenu:
            //   - Closes submenu.
            //   - Moves focus to next item in the menubar.
            //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
            preventEvent(event);
            if (this.currentMenuItem instanceof submenuItem) {
              this.currentMenuItem.toggle.open();
            } else {
              this.rootMenu.closeChildren();
              this.rootMenu.focusNextChild();

              if (this.rootMenu.currentMenuItem instanceof submenuItem) {
                this.rootMenu.currentMenuItem.toggle.open();
                this.rootMenu.currentMenuItem.childMenu.focus();
              }
            }
          } else if (key === "ArrowLeft") {
            // Hitting the Left Arrow:
            // - Closes submenu and moves focus to parent menu item.
            // - If parent menu item is in the menubar, also:
            //   - moves focus to previous item in the menubar.
            //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
            preventEvent(event);
            if (this.currentMenuItem instanceof submenuItem) {
              this.currentMenuItem.toggle.close();

              if (this.parentMenu === this.rootMenu) {
                this.rootMenu.closeChildren();
                this.rootMenu.focusPreviousChild();

                if (this.rootMenu.currentMenuItem instanceof submenuItem) {
                  this.rootMenu.currentMenuItem.toggle.open();
                  this.rootMenu.currentMenuItem.childMenu.focus();
                }
              }
            }
          } else if (key === "ArrowDown") {
            // Hitting the Down Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            preventEvent(event);
            this.focusNextChild();
          } else if (key === "ArrowUp") {
            // Hitting the Up Arrow:
            // - Moves focus to the previous item in the menubar.
            // - If focus is on the first item, moves focus to the last item.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // Hitting Home:
            // - Moves focus to first item in the menubar.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - Moves focus to last item in the menubar.
            preventEvent(event);
            this.focusLastChild();
          } else if (key === "Character" && !modifier) {
            // Hitting Character:
            // - Moves focus to next item in the menubar having a name that starts with the typed character.
            // - If none of the items have a name starting with the typed character, focus does not move.
            preventEvent(event);
            this.focusNextChildWithCharacter(event.key);
          }
        }
      });
    }
  }

  // Custom validation for params.
  const validate$4 = {
    menuItemElement: value => {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuItemElement must be an HTML Element.");
      }
    },
    parentMenu: value => {
      // Ensure value is an Menu or Submenu element.
      if (!(value instanceof Menu || value instanceof Submenu)) {
        throw new TypeError("parentMenu must be a Menu or a Submenu.");
      }
    }
  };

  /**
   * A basic navigation link contained inside of a Menu.
   *
   * Must be initialized to be fully functional.
   */
  class MenuItem {
    /**
     * {@inheritdoc}
     *
     * @param {object}      param0                 - The menu item object.
     * @param {HTMLElement} param0.menuItemElement - The menu item in the DOM.
     * @param {Menu}        param0.parentMenu      - The parent menu.
     */
    constructor({ menuItemElement, parentMenu }) {
      // Run validations.
      validate$4.menuItemElement(menuItemElement);
      validate$4.parentMenu(parentMenu);

      this.domElements = {
        menuItem: menuItemElement,
        link: menuItemElement.querySelector("a")
      };

      this.elements = {
        parentMenu
      };
    }

    /**
     * Initialize the menu item by setting its tab index.
     */
    initialize() {
      this.element.setAttribute("role", "menuitem");
      this.linkElement.tabIndex = -1;
    }

    /**
     * The menu item element in the DOM.
     *
     * @returns {HTMLElement} - The menu item element.
     */
    get element() {
      return this.domElements.menuItem;
    }

    /**
     * The link element inside the menu item.
     *
     * @returns {HTMLElement} - The link.
     */
    get linkElement() {
      return this.domElements.link;
    }

    /**
     * The item's parent Menu.
     *
     * @returns {Menu} - The parent menu.
     */
    get parentMenu() {
      return this.elements.parentMenu;
    }

    /**
     * Focuses the menu item's link.
     */
    focus() {
      this.linkElement.focus();
    }

    /**
     * Blurs the menu item's link.
     */
    blur() {
      this.linkElement.blur();
    }
  }

  // Custom validation for params.
  const validate$5 = {
    menuElement: value => {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuElement must be an HTML Element.");
      }
    },
    menuItemSelector: value => {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw new TypeError("menuItemSelector must be a CSS selector string.");
      }
    },
    hasSubmenus: (container, toggle, menu) => {
      if (container === null && toggle === null && menu === null) return;

      // Ensure container is a string.
      if (typeof container !== "string") {
        throw new TypeError("submenuItemSelector must be a CSS selector string.");
      }

      // Ensure toggle is a string.
      if (typeof container !== "string") {
        throw new TypeError(
          "submenuToggleSelector must be a CSS selector string."
        );
      }

      // Ensure menu is a string.
      if (typeof menu !== "string") {
        throw new TypeError("submenuSelector must be a CSS selector string.");
      }
    },
    openClass: value => {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw TypeError("openClass must be a string.");
      }

      // Ensure value is a valid CSS class name.
      const invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");
      if (invalidCharacters.length > 0) {
        throw Error("openClass must be a valid CSS class.");
      }
    },
    isDropdown: (controller, container) => {
      // Values are allowed to be null if both are null.
      if (controller === null && container === null) return;

      // Ensure value is an HTML element.
      if (!(controller instanceof HTMLElement)) {
        throw new TypeError(
          "controllerElement must be an HTML Element if containerElement is provided."
        );
      }

      if (!(container instanceof HTMLElement)) {
        throw new TypeError(
          "containerElement must be an HTML Element if controllerElement is provided."
        );
      }
    }
  };

  /**
   * An accessible navigation element in the DOM.
   *
   * Must be initialized to be fully functional.
   */
  class Menu {
    /**
     * {@inheritdoc}
     *
     * @param {object}            param0                       - The menu object.
     * @param {HTMLElement}       param0.menuElement           - The menu element in the DOM.
     * @param {string|null}       param0.menuItemSelector      - The selector string for menu items.
     * @param {string|null}       param0.submenuItemSelector   - The selector string for submenu items.
     * @param {string|null}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}            param0.submenuSelector       - The selector string for the submenu itself.
     * @param {string}            param0.openClass             - The class to use when a submenu is open.
     * @param {HTMLElement|null}  param0.controllerElement     - The element controlling the menu in the DOM.
     * @param {HTMLElement|null}  param0.containerElement      - The element containing the menu in the DOM.
     */
    constructor({
      menuElement,
      menuItemSelector,
      submenuItemSelector = null,
      submenuToggleSelector = null,
      submenuSelector = null,
      openClass = "show",
      controllerElement = null,
      containerElement = null
    }) {
      // Run validations.
      validate$5.menuElement(menuElement);
      validate$5.menuItemSelector(menuItemSelector);
      validate$5.hasSubmenus(
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector
      );
      validate$5.openClass(openClass);
      validate$5.isDropdown(controllerElement, containerElement);

      this.domElements = {
        menu: menuElement,
        controller: controllerElement,
        container: containerElement,
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
        menuToggles: [],
        controller: null
      };
      this.focussedChild = -1;
      this.focusState = "none";
      this.openClass = openClass;
    }

    /**
     * Initializes the menu with proper tab indexing and properties.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      this.element.setAttribute("role", "menubar");
      this.element.tabIndex = 0;

      this.createMenuItems();
      this.handleKeydown();
      this.handleClick();

      if (this.controllerElement && this.containerElement) {
        // Create a new MenuToggle to control the menu.
        const toggle = new MenuToggle({
          menuToggleElement: this.controllerElement,
          parentElement: this.containerElement,
          menu: this,
          openClass: this.openClass
        });
        toggle.initialize();

        this.elements.controller = toggle;
      }
    }

    /**
     * The menu element in the DOM.
     *
     * @returns {HTMLElement} - The menu.
     */
    get element() {
      return this.domElements.menu;
    }

    /**
     * The menu's controller element in the DOM.
     *
     * @returns {HTMLElement} - The controller element.
     */
    get controllerElement() {
      return this.domElements.controller;
    }

    /**
     * The menu's container element in the DOM.
     *
     * @returns {HTMLElement} - The container element.
     */
    get containerElement() {
      return this.domElements.container;
    }

    /**
     * The menu item DOM elements contained in the menu.
     *
     * @returns {HTMLElement[]} - The menu items.
     */
    get menuItemElements() {
      return this.domElements.menuItems;
    }

    /**
     * The submenu item DOM elements contained in the menu.
     *
     * @returns {HTMLElement[]} - The submenu items.
     */
    get submenuItemElements() {
      return this.domElements.submenuItems;
    }

    /**
     * The menu items contained in the menu.
     *
     * @returns {MenuItem|SubmenuItem[]} - The menu items.
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
     * The menu's controller toggle.
     *
     * @returns {MenuToggle} - The toggle.
     */
    get controller() {
      return this.elements.controller;
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
     * The currently focussed menu item.
     *
     * @returns {MenuItem|SubmenuItem} - The menu item.
     */
    get currentMenuItem() {
      return this.menuItems[this.focussedChild];
    }

    /**
     * Set the focus state of the menu.
     *
     * @param {string} value - The focus state (self, child, none).
     */
    set currentFocus(value) {
      const states = ["self", "child", "none"];

      if (!states.includes(value)) {
        throw new Error("Focus state must be 'self', 'child', or 'none'.");
      }

      this.focusState = value;
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

    /**
     * Creates and initializes all menu items.
     */
    createMenuItems() {
      this.menuItemElements.forEach(element => {
        let menuItem;

        if (this.submenuItemElements.includes(element)) {
          // The menu's toggle controller DOM element.
          const toggler = element.querySelector(this.selector["submenu-toggle"]);
          // The actual menu DOM element.
          const submenu = element.querySelector(this.selector.submenu);

          // Create the new Menu and initialize it.
          const menu = new Submenu({
            menuElement: submenu,
            menuItemSelector: this.selector["menu-items"],
            submenuItemSelector: this.selector["submenu-items"],
            submenuToggleSelector: this.selector["submenu-toggle"],
            submenuSelector: this.selector.submenu,
            submenuOpenClass: this.openClass,
            parentMenu: this
          });
          menu.initialize();

          // Create the new MenuToggle.
          const toggle = new MenuToggle({
            menuToggleElement: toggler,
            parentElement: element,
            menu: menu,
            openClass: this.openClass,
            parentMenu: this
          });
          toggle.initialize();

          // Add it to the list of submenu items.
          this.elements.menuToggles.push(toggle);

          menuItem = new submenuItem({
            menuItemElement: element,
            parentMenu: this,
            childMenu: menu,
            toggle
          });
        } else {
          // Create a new MenuItem.
          menuItem = new MenuItem({
            menuItemElement: element,
            parentMenu: this
          });
        }

        menuItem.initialize();

        this.elements.menuItem.push(menuItem);
      });
    }

    /**
     * Sets up the hijacked keydown events.
     */
    handleKeydown() {
      this.element.addEventListener("keydown", event => {
        const key = keyPress(event);
        const { altKey, crtlKey, metaKey } = event;
        const modifier = altKey || crtlKey || metaKey;

        if (this.currentFocus === "none") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Opens submenu and moves focus to first item in the submenu.
            preventEvent(event);
            this.currentFocus = "self";
            this.focusFirstChild();
          }
        } else if (this.currentFocus === "self") {
          if (key === "RightArrow") {
            // Hitting the Right Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            preventEvent(event);
            this.focusNextChild();
          } else if (key === "LeftArrow") {
            // Hitting the Left Arrow:
            // - Moves focus to the previous item in the menubar.
            // - If focus is on the first item, moves focus to the last item.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "DownArrow") {
            // Hitting the Down Arrow:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem instanceof submenuItem) {
              this.currentMenuItem.toggle.open();
              this.currentMenuItem.childMenu.focusFirstChild();
            }
          } else if (key === "UpArrow") {
            // Hitting the Up Arrow:
            // - Opens submenu and moves focus to last item in the submenu.
            if (this.currentMenuItem instanceof submenuItem) {
              this.currentMenuItem.toggle.open();
              this.currentMenuItem.childMenu.focusLastChild();
            }
          } else if (key === "Home") {
            // Hitting Home:
            // - Moves focus to first item in the menubar.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - Moves focus to last item in the menubar.
            preventEvent(event);
            this.focusLastChild();
          } else if (key === "Character" && !modifier) {
            // Hitting Character:
            // - Moves focus to next item in the menubar having a name that starts with the typed character.
            // - If none of the items have a name starting with the typed character, focus does not move.
            preventEvent(event);
            this.focusNextChildWithCharacter(event.key);
          }
        }

        if (this.currentFocus !== "none") {
          if (key === "Tab") {
            // Hitting Tab:
            // - Moves focus out of the menu.
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

          if (this.controller) {
            this.controller.close();
          }
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
     * Focus the menu's next child starting with a specific letter.
     *
     * @param {string} char - The character to look for.
     */
    focusNextChildWithCharacter(char) {
      // Ensure the character is lowercase just to be safe.
      const match = char.toLowerCase();

      let index = this.focussedChild + 1;
      let found = false;

      while (!found && index < this.menuItems.length) {
        // Ensure the text in the item is lowercase just to be safe.
        const text = this.menuItems[index].element.innerText.toLowerCase();

        // Focus the child if the text matches, otherwise move on.
        if (text.startsWith(match)) {
          found = true;
          this.focussedChild = index;
          this.focusCurrentChild();
        }

        index++;
      }
    }

    /**
     * Focus the menu's controller.
     */
    focusController() {
      if (this.controllerElement) {
        this.controllerElement.focus();
        this.currentFocus = "none";
      }
    }

    /**
     * Focus the menu's container.
     */
    focusContainer() {
      if (this.containerElement) {
        this.containerElement.focus();
        this.currentFocus = "none";
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
