import MenuItem from "./menuItem";
import MenuToggle from "./menuToggle";
import { keyPress, preventEvent } from "./eventHandlers";

// Basic validation for the class.
const validate = {
  menuElement: element => {
    // Ensure element is an HTML element.
    if (!(element instanceof HTMLElement)) {
      throw new TypeError("menuElement must be an HTML Element.");
    }
  },
  menuItemSelector: selector => {
    // Ensure selector is a string.
    if (typeof selector !== "string") {
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
  isTopLevel: flag => {
    // Ensure flag is a boolean.
    if (typeof flag !== "boolean") {
      throw new TypeError("isTopLevel must be true of false.");
    }
  },
  isDropdown: (controller, container) => {
    // Values are allowed to be null if both are null.
    if (controller === null && container === null) return;

    // Ensure controller is an HTML element.
    if (!(controller instanceof HTMLElement)) {
      throw new TypeError(
        "controllerElement must be an HTML Element if containerElement is provided."
      );
    }

    // Ensure container is an HTML element.
    if (!(container instanceof HTMLElement)) {
      throw new TypeError(
        "containerElement must be an HTML Element if controllerElement is provided."
      );
    }
  },
  parentMenu: menu => {
    // Menu can be null.
    if (menu === null) return;

    // Ensure menu is a Menu element.
    if (!(menu instanceof Menu)) {
      throw new TypeError("parentMenu must be a Menu.");
    }
  }
};

/**
 * An accessible navigation element in the DOM.
 */
class Menu {
  /**
   * {@inheritdoc}
   *
   * @param {object}           param0                       - The menu object.
   * @param {HTMLElement}      param0.menuElement           - The menu element in the DOM.
   * @param {string|null}      param0.menuItemSelector      - The selector string for menu items.
   * @param {string|null}      param0.submenuItemSelector   - The selector string for submenu items.
   * @param {string|null}      param0.submenuToggleSelector - The selector string for submenu toggle triggers.
   * @param {string}           param0.submenuSelector       - The selector string for the submenu itself.
   * @param {string}           param0.openClass             - The class to use when a submenu is open.
   * @param {boolean}          param0.isTopLevel            - A flag to mark the root menu.
   * @param {HTMLElement|null} param0.controllerElement     - The element controlling the menu in the DOM.
   * @param {HTMLElement|null} param0.containerElement      - The element containing the menu in the DOM.
   * @param {Menu|null}        param0.parentMenu            - The menu containing this menu.
   */
  constructor({
    menuElement,
    menuItemSelector,
    submenuItemSelector = null,
    submenuToggleSelector = null,
    submenuSelector = null,
    openClass = "show",
    isTopLevel = true,
    controllerElement = null,
    containerElement = null,
    parentMenu = null
  }) {
    // Run validations.
    validate.menuElement(menuElement);
    validate.menuItemSelector(menuItemSelector);
    validate.hasSubmenus(
      submenuItemSelector,
      submenuToggleSelector,
      submenuSelector
    );
    validate.openClass(openClass);
    validate.isTopLevel(isTopLevel);
    validate.isDropdown(controllerElement, containerElement);
    validate.parentMenu(parentMenu);

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
      controller: null,
      parentMenu: parentMenu,
      rootMenu: isTopLevel ? this : null
    };
    this.focussedChild = 0;
    this.focusState = "none";
    this.openClass = openClass;
    this.root = isTopLevel;

    this.initialize();
  }

  /**
   * Initializes the menu with proper tab indexing and properties.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    this.element.setAttribute("role", "menubar");

    if (this.rootMenu === null) this.findRootMenu(this);
    this.createMenuItems();
    this.handleKeydown();
    this.handleClick();

    if (this.isTopLevel) {
      // Set initial tabIndex.
      this.currentMenuItem.linkElement.tabIndex = 0;
      this.handleFocus();

      if (this.controllerElement && this.containerElement) {
        // Create a new MenuToggle to control the menu.
        const toggle = new MenuToggle({
          menuToggleElement: this.controllerElement,
          parentElement: this.containerElement,
          menu: this,
          openClass: this.openClass
        });

        this.elements.controller = toggle;
      }
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
   * @returns {HTMLElement|null} - The controller element.
   */
  get controllerElement() {
    return this.domElements.controller;
  }

  /**
   * The menu's container element in the DOM.
   *
   * @returns {HTMLElement|null} - The container element.
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
   * The parent menu containing this menu.
   *
   * @returns {Menu|null} - The parent menu.
   */
  get parentMenu() {
    return this.elements.parentMenu;
  }

  /**
   * The root menu containing this menu.
   *
   * @returns {Menu|null} - The root menu.
   */
  get rootMenu() {
    return this.elements.rootMenu;
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
   * @returns {MenuItem} - The menu item.
   */
  get currentMenuItem() {
    return this.menuItems[this.focussedChild];
  }

  /**
   * A flag marking the root menu.
   *
   * @returns {boolean} - The top-level flag.
   */
  get isTopLevel() {
    return this.root;
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
   * Finds the root Menu element.
   *
   * @param {Menu} menu - The menu to check.
   */
  findRootMenu(menu) {
    if (menu.isTopLevel) {
      this.elements.rootMenu = menu;
    } else if (menu.parentMenu !== null) {
      this.findRootMenu(menu.parentMenu);
    } else {
      throw new Error("Cannot find root menu.");
    }
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
        const menu = new Menu({
          menuElement: submenu,
          menuItemSelector: this.selector["menu-items"],
          submenuItemSelector: this.selector["submenu-items"],
          submenuToggleSelector: this.selector["submenu-toggle"],
          submenuSelector: this.selector.submenu,
          openClass: this.openClass,
          isTopLevel: false,
          parentMenu: this
        });

        // Create the new MenuToggle.
        const toggle = new MenuToggle({
          menuToggleElement: toggler,
          parentElement: element,
          menu: menu,
          openClass: this.openClass,
          parentMenu: this
        });

        // Add it to the list of submenu items.
        this.elements.menuToggles.push(toggle);

        // Create a new MenuItem.
        menuItem = new MenuItem({
          menuItemElement: element,
          menuLinkElement: toggler,
          parentMenu: this,
          isSubmenuItem: true,
          childMenu: menu,
          toggle
        });
      } else {
        const link = element.querySelector("a");

        // Create a new MenuItem.
        menuItem = new MenuItem({
          menuItemElement: element,
          menuLinkElement: link,
          parentMenu: this
        });
      }

      this.elements.menuItems.push(menuItem);
    });
  }

  /**
   * Sets up focusin/focusout handling.
   */
  handleFocus() {
    this.menuItems.forEach(item => {
      // Properly enter menu on focus.
      item.linkElement.addEventListener("focusin", () => {
        if (this.currentFocus === "none") {
          this.currentFocus = "self";
          this.focusCurrentChild();
        }
      });

      // Set tabIndex for the current menuItem.
      item.linkElement.addEventListener("focusout", () => {
        if (this.currentFocus === "none") {
          this.blur();
          this.closeChildren();
        }
      });
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

      if (this.isTopLevel) {
        if (this.currentFocus === "none") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Opens submenu and moves focus to first item in the submenu.
            preventEvent(event);
            this.currentFocus = "self";
            this.focusFirstChild();
          }
        } else if (this.currentFocus === "self") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Activates menu item, causing the link to be activated.
            preventEvent(event);
            this.currentMenuItem.linkElement.click();
          } else if (key === "ArrowRight") {
            // Hitting the Right Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
            preventEvent(event);

            // Store the current item's info if its an open dropdown.
            const previousChildOpen =
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.toggle.isOpen;

            this.focusNextChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.toggle.preview();
              } else {
                this.closeChildren();
              }
            }
          } else if (key === "ArrowLeft") {
            // Hitting the Left Arrow:
            // - Moves focus to the previous item in the menubar.
            // - If focus is on the first item, moves focus to the last item.
            // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
            preventEvent(event);

            // Store the current item's info if its an open dropdown.
            const previousChildOpen =
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.toggle.isOpen;

            this.focusPreviousChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.toggle.preview();
              } else {
                this.closeChildren();
              }
            }
          } else if (key === "ArrowDown") {
            // Hitting the Down Arrow:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.toggle.open();
              this.currentMenuItem.childMenu.focusFirstChild();
            }
          } else if (key === "ArrowUp") {
            // Hitting the Up Arrow:
            // - Opens submenu and moves focus to last item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
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
          } else if (key === "Escape") {
            if (this.controller !== null) {
              // Hitting Escape:
              // - Closes menu.
              this.controller.close();
            }
          }
        }
      } else {
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
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.currentMenuItem.toggle.open();
          } else {
            preventEvent(event);
            this.rootMenu.closeChildren();
            this.rootMenu.focusNextChild();

            if (this.rootMenu.currentMenuItem.isSubmenuItem) {
              this.rootMenu.currentMenuItem.toggle.preview();
            }
          }
        } else if (key === "ArrowLeft") {
          // Hitting the Left Arrow:
          // - Closes submenu and moves focus to parent menu item.
          // - If parent menu item is in the menubar, also:
          //   - moves focus to previous item in the menubar.
          //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
          if (this.parentMenu.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.parentMenu.currentMenuItem.toggle.close();

            if (this.parentMenu === this.rootMenu) {
              this.rootMenu.closeChildren();
              this.rootMenu.focusPreviousChild();

              if (this.rootMenu.currentMenuItem.isSubmenuItem) {
                this.rootMenu.currentMenuItem.toggle.preview();
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
        }
      }

      if (key === "Character" && !modifier) {
        // Hitting Character:
        // - Moves focus to next item in the menubar having a name that starts with the typed character.
        // - If none of the items have a name starting with the typed character, focus does not move.
        preventEvent(event);
        this.focusNextChildWithCharacter(event.key);
      }

      if (this.currentFocus !== "none") {
        if (key === "Tab") {
          // Hitting Tab:
          // - Moves focus out of the menu.
          this.rootMenu.blur();
          this.rootMenu.closeChildren();
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

    // Ensure proper menu focus is applied.
    this.menuItems.forEach(menuItem => {
      menuItem.linkElement.addEventListener("click", () => {
        this.focussedChild = this.menuItems.indexOf(menuItem);
      });
    });
  }

  /**
   * Focus the menu.
   */
  focus() {
    this.currentFocus = "self";
    this.element.focus();
  }

  /**
   * Unfocus the menu.
   */
  blur() {
    this.currentFocus = "none";
    this.element.blur();

    if (this.isTopLevel && this.controller) {
      this.controller.close();
    }
  }

  /**
   * Focues the menu's first child.
   */
  focusFirstChild() {
    this.blurCurrentChild();
    this.focussedChild = 0;
    this.focusCurrentChild();
  }

  /**
   * Focus the menu's last child.
   */
  focusLastChild() {
    this.blurCurrentChild();
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
      this.blurCurrentChild();
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
      this.blurCurrentChild();
      this.focussedChild = this.focussedChild - 1;
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's current child.
   */
  focusCurrentChild() {
    if (this.focussedChild !== -1) {
      this.currentMenuItem.focus();
    }
  }

  /**
   * Blurs the menu's current child.
   */
  blurCurrentChild() {
    if (this.focussedChild !== -1) {
      this.currentMenuItem.blur();
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

export default Menu;
