import BaseMenu from "./_baseMenu.js";
import DisclosureMenuItem from "./disclosureMenuItem.js";
import DisclosureMenuToggle from "./disclosureMenuToggle.js";
import { preventEvent, keyPress } from "./eventHandlers.js";
import { isValidType } from "./validate.js";

/**
 * An accessible disclosure menu in the DOM.
 *
 * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html
 */
class DisclosureMenu extends BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}              param0                               - The menu object.
   * @param {HTMLElement}         param0.menuElement                   - The menu element in the DOM.
   * @param {string}              [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}              [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}              [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}              [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}              [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement|null}    [param0.controllerElement = null]    - The element controlling the menu in the DOM.
   * @param {HTMLElement|null}    [param0.containerElement = null]     - The element containing the menu in the DOM.
   * @param {string}              [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string}              [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}             [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {DisclosureMenu|null} [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}              [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}              [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}             [param0.optionalKeySupport = false]  - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {boolean}             [param0.initialize = true]           - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement,
    menuItemSelector = "li",
    menuLinkSelector = "a",
    submenuItemSelector = "",
    submenuToggleSelector = "a",
    submenuSelector = "ul",
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
      submenuToggleSelector,
      submenuSelector,
      controllerElement,
      containerElement,
      openClass,
      closeClass,
      isTopLevel,
      parentMenu,
      hoverType,
      hoverDelay,
    });

    // Set default class types.
    this.MenuType = DisclosureMenu;
    this.MenuItemType = DisclosureMenuItem;
    this.MenuToggleType = DisclosureMenuToggle;

    this.currentChild = -1;
    this.optionalKeySupport = optionalKeySupport;

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @returns {boolean} - The flag.
   */
  get optionalKeySupport() {
    return this.isTopLevel
      ? this.optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }

  /**
   * Set the flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   *
   * @param {boolean} value - The flag.
   */
  set optionalKeySupport(value) {
    isValidType("boolean", { optionalKeySupport: value });

    this.optionalSupport = value;
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    try {
      super.initialize();

      this.handleFocus();
      this.handleClick();
      this.handleHover();
      this.handleKeydown();
      this.handleKeyup();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   */
  handleKeydown() {
    super.handleKeydown();

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
   */
  handleKeyup() {
    super.handleKeyup();

    this.dom.menu.addEventListener("keyup", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (this.focusState === "self") {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.currentMenuItem.elements.toggle.preview();
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

export default DisclosureMenu;
