import BaseMenu from "./_baseMenu.js";
import TopLinkDisclosureMenuItem from "./topLinkDisclosureMenuItem.js";
import TopLinkDisclosureMenuToggle from "./topLinkDisclosureMenuToggle.js";
import { preventEvent, keyPress } from "./eventHandlers.js";
import { isCSSSelector, isValidType } from "./validate.js";

/**
 * An accessible disclosure menu with top-level links in the DOM.
 *
 * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation-hybrid.html#mythical-page-content|Example Disclosure Navigation Menu with Top-Level Links}
 *
 * @extends BaseMenu
 *
 * @example
 * // Import the class.
 * import { TopLinkDisclosureMenu } from "accessible-menu";
 *
 * // Select the desired menu element.
 * const menuElement = document.querySelector("nav ul");
 *
 * // Create the menu.
 * const menu = new TopLinkDisclosureMenu({
 *   menuElement,
 * });
 */
class TopLinkDisclosureMenu extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenu}
   */
  _MenuType = TopLinkDisclosureMenu;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuItem}
   */
  _MenuItemType = TopLinkDisclosureMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuToggle}
   */
  _MenuToggleType = TopLinkDisclosureMenuToggle;

  /**
   * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = -1;

  /**
   * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
   *
   * @protected
   *
   * @type {Object<string>}
   *
   * @property {string} menuItems         - The CSS selector for menu items.
   * @property {string} menuLinks         - The CSS selector for menu links.
   * @property {string} submenuItems      - The CSS selector for menu items containing submenus.
   * @property {string} submenuToggles    - The CSS selector for menu links that function as submenu toggles.
   * @property {string} submenus          - The CSS selector for for submenus.
   * @property {string} submenuSubtoggles - The CSS selector for menu links that function as submenu toggles below the top level.
   */
  _selectors = {
    menuItems: "",
    menuLinks: "",
    submenuItems: "",
    submenuToggles: "",
    submenus: "",
    submenuSubtoggles: "",
  };

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _optionalSupport = false;

  /**
   * Constructs the menu.
   *
   * @param {object}                       options                                  - The options for generating the menu.
   * @param {HTMLElement}                  options.menuElement                      - The menu element in the DOM.
   * @param {string}                       [options.menuItemSelector = li]          - The CSS selector string for menu items.
   * @param {string}                       [options.menuLinkSelector = a]           - The CSS selector string for menu links.
   * @param {string}                       [options.submenuItemSelector]            - The CSS selector string for menu items containing submenus.
   * @param {string}                       [options.submenuToggleSelector = button] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}                       [options.submenuSelector = ul]           - The CSS selector string for submenus.
   * @param {string}                       [options.submenuSubtoggleSelector = a]   - The CSS selector string for submenu toggle buttons/links below the top level.
   * @param {(HTMLElement|null)}           [options.controllerElement = null]       - The element controlling the menu in the DOM.
   * @param {(HTMLElement|null)}           [options.containerElement = null]        - The element containing the menu in the DOM.
   * @param {(string|string[]|null)}       [options.openClass = show]               - The class to apply when a menu is "open".
   * @param {(string|string[]|null)}       [options.closeClass = hide]              - The class to apply when a menu is "closed".
   * @param {boolean}                      [options.isTopLevel = true]              - A flag to mark the root menu.
   * @param {(TopLinkDisclosureMenu|null)} [options.parentMenu = null]              - The parent menu to this menu.
   * @param {string}                       [options.hoverType = off]                - The type of hoverability a menu has.
   * @param {number}                       [options.hoverDelay = 250]               - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}                      [options.optionalKeySupport = false]     - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {boolean}                      [options.initialize = true]              - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement,
    menuItemSelector = "li",
    menuLinkSelector = "a",
    submenuItemSelector = "",
    submenuToggleSelector = "button",
    submenuSelector = "ul",
    submenuSubtoggleSelector = "a",
    controllerElement = null,
    containerElement = null,
    openClass = "show",
    closeClass = "hide",
    isTopLevel = true,
    parentMenu = null,
    hoverType = "off",
    hoverDelay = 250,
    optionalKeySupport = false,
    initialize = true,
  }) {
    super({
      menuElement,
      menuItemSelector,
      menuLinkSelector,
      submenuItemSelector,
      submenuSelector,
      submenuToggleSelector,
      controllerElement,
      containerElement,
      openClass,
      closeClass,
      isTopLevel,
      parentMenu,
      hoverType,
      hoverDelay,
    });

    // Set optional key support.
    this._optionalSupport = optionalKeySupport;

    // Set DOM selectors.
    this._selectors.menuItems = menuItemSelector;
    this._selectors.submenuItems = submenuItemSelector;
    this._selectors.submenuToggles = submenuToggleSelector;
    this._selectors.submenus = submenuSelector;
    this._selectors.submenuSubtoggles = submenuSubtoggleSelector;

    // Set unique menu link selectors.
    this._selectors.menuLinks = [
      ...new Set([menuLinkSelector, submenuToggleSelector]),
    ].join(",");

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Initializes the menu.
   *
   * Initialize will call the {@link BaseMenu#initialize|BaseMenu's initialize method}
   * as well as set up {@link TopLinkDisclosureMenu#_handleFocus|focus},
   * {@link TopLinkDisclosureMenu#_handleClick|click},
   * {@link TopLinkDisclosureMenu#_handleHover|hover},
   * {@link TopLinkDisclosureMenu#_handleKeydown|keydown}, and
   * {@link TopLinkDisclosureMenu#_handleKeyup|keyup} events for the menu.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize();

      this._handleFocus();
      this._handleClick();
      this._handleHover();
      this._handleKeydown();
      this._handleKeyup();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @type {boolean}
   *
   * @see _optionalSupport
   */
  get optionalKeySupport() {
    return this.isTopLevel
      ? this._optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }

  set optionalKeySupport(value) {
    isValidType("boolean", { optionalKeySupport: value });

    this._optionalSupport = value;
  }

  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((element) => {
      let menuItem, menuToggleItem;
      const link = element.querySelector(this.selectors.menuLinks);

      if (this.dom.submenuItems.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selectors.submenuToggles);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selectors.submenus);

        // Create the new menu and initialize it.
        const menu = new this._MenuType({
          menuElement: submenu,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuSubtoggles,
          submenuSelector: this.selectors.submenus,
          submenuSubtoggleSelector: this.selectors.submenuSubtoggles,
          openClass: this.openClass,
          closeClass: this.closeClass,
          isTopLevel: false,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
        });

        // Create the new menu toggle.
        const toggle = new this._MenuToggleType({
          menuToggleElement: toggler,
          parentElement: element,
          controlledMenu: menu,
          parentMenu: this,
        });

        // Add the toggle to the list of toggles.
        this._elements.submenuToggles.push(toggle);

        // If the toggle and link are different, create separate menu items for each.
        // Otherwise, create a single menu item with a toggle.
        if (toggler !== link) {
          // Create a new menu item for the toggle.
          menuToggleItem = new this._MenuItemType({
            menuItemElement: element,
            menuLinkElement: toggler,
            parentMenu: this,
            isSubmenuItem: true,
            childMenu: menu,
            toggle,
          });

          // Create a new menu item for the link.
          menuItem = new this._MenuItemType({
            menuItemElement: element,
            menuLinkElement: link,
            parentMenu: this,
            submenuSibling: menuToggleItem,
          });
        } else {
          // Create a new menu item with a toggle.
          menuItem = new this._MenuItemType({
            menuItemElement: element,
            menuLinkElement: link,
            parentMenu: this,
            isSubmenuItem: true,
            childMenu: menu,
            toggle,
          });
        }
      } else {
        // Create a new menu item.
        menuItem = new this._MenuItemType({
          menuItemElement: element,
          menuLinkElement: link,
          parentMenu: this,
        });
      }

      this._elements.menuItems.push(menuItem);

      if (typeof menuToggleItem !== "undefined") {
        this._elements.menuItems.push(menuToggleItem);
      }
    });
  }

  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let check = super._validate();

    if (
      !isCSSSelector({
        submenuSubtoggleSelector: this._selectors.submenuSubtoggles,
      })
    ) {
      check = false;
    }

    if (
      !isValidType("boolean", { optionalKeySupport: this._optionalSupport })
    ) {
      check = false;
    }

    return check;
  }

  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   {@link BaseMenu#_handleClick|BaseMenu's _handleClick method}, and
   * - adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick();

    // Close the menu if a click event happens outside of it.
    document.addEventListener("pointerup", (event) => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (
          !this.dom.menu.contains(event.target) &&
          !this.dom.menu !== event.target
        ) {
          this.closeChildren();
          this.blur();

          if (this.elements.controller) {
            this.elements.controller.close();
          }
        }
      }
    });
  }

  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's {@link BaseMenu_hoverTypeType|hover type}.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   {@link BaseMenu#currentChild| current child} value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   {@link BaseMenuToggle#preview|preview method} for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   {@link BaseMenuToggle#close|close method} for the submenu item's toggle
   *   will be called after a delay set by the menu's {@link BaseMenu_hoverTypeDelay|hover delay}.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   {@link BaseMenu#focusState|focus state} is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `pointerleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `pointerleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("pointerenter", (event) => {
        // Exit out of the event if it was not made by a mouse.
        if (event.pointerType === "pen" || event.pointerType === "touch") {
          return;
        }

        if (this.hoverType === "on") {
          this.currentEvent = "mouse";
          this.currentChild = index;

          // Hovering over both the menu item _and_ the toggle item should work.
          if (menuItem.isSubmenuItem) {
            menuItem.elements.toggle.preview();
          } else if (menuItem.elements.sibling !== null) {
            menuItem.elements.sibling.elements.toggle.preview();
          }
        } else if (this.hoverType === "dynamic") {
          const isOpen = this.elements.submenuToggles.some(
            (toggle) => toggle.isOpen
          );
          this.currentChild = index;

          if (!this.isTopLevel || this.focusState !== "none") {
            this.currentEvent = "mouse";
            this.focusCurrentChild();
          }

          if (!this.isTopLevel || isOpen) {
            this.currentEvent = "mouse";

            // Hovering over both the menu item _and_ the toggle item should work.
            if (menuItem.isSubmenuItem) {
              menuItem.elements.toggle.preview();
            } else if (menuItem.elements.sibling !== null) {
              menuItem.elements.sibling.elements.toggle.preview();
            }
          }
        }
      });

      if (menuItem.isSubmenuItem) {
        menuItem.dom.item.addEventListener("pointerleave", (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }

          if (this.hoverType === "on") {
            if (this.hoverDelay > 0) {
              setTimeout(() => {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
              }, this.hoverDelay);
            } else {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.close();
            }
          } else if (this.hoverType === "dynamic") {
            if (!this.isTopLevel) {
              if (this.hoverDelay > 0) {
                setTimeout(() => {
                  this.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                  this.focusCurrentChild();
                }, this.hoverDelay);
              } else {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
                this.focusCurrentChild();
              }
            }
          }
        });
      }
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the {@link TopLinkDisclosureMenu#_handleKeyup|_handleKeyup method}.
   * - Adds all `keydown` listeners from {@link BaseMenu#_handleKeydown|BaseMenu's _handleKeydown method}
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ {@link TopLinkDisclosureMenu#optionalKeySupport|optional keyboard support}
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown();

    this.dom.menu.addEventListener("keydown", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      // Prevent default event actions if we're handling the keyup event.
      if (this.focusState === "self") {
        const submenuKeys = ["Space", "Enter"];
        const controllerKeys = ["Escape"];
        const parentKeys = ["Escape"];

        if (this.optionalKeySupport) {
          const keys = [
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "ArrowLeft",
            "Home",
            "End",
          ];
          if (keys.includes(key)) {
            preventEvent(event);
          }
        } else if (
          this.currentMenuItem.isSubmenuItem &&
          submenuKeys.includes(key)
        ) {
          preventEvent(event);
        } else if (this.elements.controller && controllerKeys.includes(key)) {
          preventEvent(event);
        } else if (this.elements.parentMenu && parentKeys.includes(key)) {
          preventEvent(event);
        }
      }
    });
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from {@link BaseMenu#_handleKeyup|BaseMenu's _handleKeyup method}.
   *
   * Adds the following keybindings (explanations are taken from the
   * {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html#kbd_label|WAI ARIA Pracitices Example Disclosure for Navigation Menus}):
   *
   * | Key | Function |
   * | --- | --- |
   * | _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
   * | _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
   * | _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
   * | _Down Arrow_ or _Right Arrow_ (Optional}) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
   * | _Up Arrow_ or _Left Arrow_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
   * | _Home_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
   * | _End_ (Optional}) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
   *
   * The optional keybindings are controlled by the menu's {@link TopLinkDisclosureMenu#optionalKeySupport|optionalKeySupport} value.
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup();

    this.dom.menu.addEventListener("keyup", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (this.focusState === "self") {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
          if (
            this.currentMenuItem.isSubmenuItem &&
            event.target.matches(this.selectors.submenuToggles)
          ) {
            preventEvent(event);
            if (this.currentMenuItem.elements.toggle.isOpen) {
              this.currentMenuItem.elements.toggle.close();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "Escape") {
          // Hitting Escape
          // - If a dropdown is open, closes it.
          // - If was within the closed dropdown, sets focus on the button that controls that dropdown.
          const hasOpenChild = this.elements.submenuToggles.some(
            (toggle) => toggle.isOpen
          );

          if (hasOpenChild) {
            preventEvent(event);
            this.closeChildren();
          } else if (this.elements.parentMenu) {
            preventEvent(event);
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.closeChildren();
            this.elements.parentMenu.focusCurrentChild();
          } else if (
            this.isTopLevel &&
            this.elements.controller &&
            this.elements.controller.isOpen
          ) {
            this.elements.controller.close();
            this.focusController();
          }
        } else if (this.optionalKeySupport) {
          if (key === "ArrowDown" || key === "ArrowRight") {
            // Hitting the Down or Right Arrow:
            // - If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.
            // - If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.
            // - If focus is on a link, and it is not the last link, moves focus to the next link.
            preventEvent(event);

            if (
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isOpen
            ) {
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            } else {
              this.focusNextChild();
            }
          } else if (key === "ArrowUp" || key === "ArrowLeft") {
            // Hitting the Up or Left Arrow:
            // - If focus is on a button, and it is not the first button, moves focus to the previous button.
            // - If focus is on a link, and it is not the first link, moves focus to the previous link.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // Hitting Home:
            // - If focus is on a button, and it is not the first button, moves focus to the first button.
            // - If focus is on a link, and it is not the first link, moves focus to the first link.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - If focus is on a button, and it is not the last button, moves focus to the last button.
            // - If focus is on a link, and it is not the last link, moves focus to the last link.
            preventEvent(event);
            this.focusLastChild();
          }
        }
      }
    });
  }
}

export default TopLinkDisclosureMenu;
