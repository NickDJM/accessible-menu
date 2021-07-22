import BaseMenu from "./_baseMenu.js";
import DisclosureMenuItem from "./disclosureMenuItem.js";
import DisclosureMenuToggle from "./disclosureMenuToggle.js";
import { preventEvent, keyPress } from "./eventHandlers.js";
import { isValidType, isEventSupported } from "./validate.js";

/**
 * An accessible disclosure menu in the DOM.
 *
 * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html|Example Disclosure for Navigation Menus}
 *
 * @extends BaseMenu
 */
class DisclosureMenu extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @type {typeof DisclosureMenu}
   * @public
   */
  _MenuType = DisclosureMenu;

  /**
   * The class to use when generating menu items.
   *
   * @type {typeof DisclosureMenuItem}
   * @public
   */
  _MenuItemType = DisclosureMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @type {typeof DisclosureMenuToggle}
   * @public
   */
  _MenuToggleType = DisclosureMenuToggle;

  /**
   * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
   *
   * @type {number}
   * @protected
   */
  _currentChild = -1;

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * @type {boolean}
   * @protected
   */
  _optionalSupport = false;

  /**
   * Constructs the menu.
   *
   * @param {object}                 options                              - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                  - The menu element in the DOM.
   * @param {string}                 [options.menuItemSelector = li]      - The CSS selector string for menu items.
   * @param {string}                 [options.menuLinkSelector = a]       - The CSS selector string for menu links.
   * @param {string}                 [options.submenuItemSelector]        - The CSS selector string for menu items containing submenus.
   * @param {string}                 [options.submenuToggleSelector = a]  - The CSS selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenuSelector = ul]       - The CSS selector string for submenus.
   * @param {(HTMLElement|null)}     [options.controllerElement = null]   - The element controlling the menu in the DOM.
   * @param {(HTMLElement|null)}     [options.containerElement = null]    - The element containing the menu in the DOM.
   * @param {(string|string[]|null)} [options.openClass = show]           - The class to apply when a menu is "open".
   * @param {(string|string[]|null)} [options.closeClass = hide]          - The class to apply when a menu is "closed".
   * @param {boolean}                [options.isTopLevel = false]         - A flag to mark the root menu.
   * @param {(DisclosureMenu|null)}  [options.parentMenu = null]          - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]            - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]           - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}                [options.optionalKeySupport = false] - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {boolean}                [options.initialize = true]          - A flag to initialize the menu immediately upon creation.
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

    // Set optional key support.
    this._optionalSupport = optionalKeySupport;

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @type {boolean}
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
   * Initializes the menu.
   *
   * Initialize will call the {@link BaseMenu#initialize|BaseMenu's initialize method}
   * as well as set up {@link DisclosureMenu#handleFocus|focus},
   * {@link DisclosureMenu#handleClick|click},
   * {@link DisclosureMenu#handleHover|hover},
   * {@link DisclosureMenu#handleKeydown|keydown}, and
   * {@link DisclosureMenu#handleKeyup|keyup} events for the menu.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
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
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @return {boolean} - The result of the validation.
   */
  validate() {
    let check = super.validate();

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
   * Depending on what is supported either `touchstart` and `touchend` or
   * `mousedown` and `mouseup` will be used for all "click" event handling.
   *
   * - Adds all event listeners listed in
   *   {@link BaseMenu#handleClick|BaseMenu's handleClick method}, and
   * - adds a `touchend`/`mouseup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   */
  handleClick() {
    super.handleClick();

    // Use touch over mouse events when supported.
    const endEventType = isEventSupported("touchend", this.dom.menu)
      ? "touchend"
      : "mouseup";

    // Close the menu if a click event happens outside of it.
    document.addEventListener(endEventType, (event) => {
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
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the {@link DisclosureMenu#handleKeyup|handleKeyup method}.
   * - Adds all `keydown` listeners from {@link BaseMenu#handleKeydown|BaseMenu's handleKeydown method}
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ {@link DisclosureMenu#optionalKeySupport|optional keyboard support}
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
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
   *
   * Adds all `keyup` listeners from {@link BaseMenu#handleKeyup|BaseMenu's handleKeyup method}.
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
   * The optional keybindings are controlled by the menu's {@link DisclosureMenu#optionalKeySupport|optionalKeySupport} value.
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
