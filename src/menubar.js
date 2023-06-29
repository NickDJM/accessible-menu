import BaseMenu from "./_baseMenu.js";
import MenubarItem from "./menubarItem.js";
import MenubarToggle from "./menubarToggle.js";
import { keyPress, preventEvent } from "./eventHandlers.js";

/**
 * An accessible menubar navigation in the DOM.
 *
 * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html|Navigation Menubar Example}
 *
 * @extends BaseMenu
 *
 * @example
 * // Import the class.
 * import { Menubar } from "accessible-menu";
 *
 * // Select the desired menu element.
 * const menuElement = document.querySelector("nav ul");
 *
 * // Create the menu.
 * const menu = new Menubar({
 *   menuElement,
 * });
 */
class Menubar extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof Menubar}
   */
  _MenuType = Menubar;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof MenubarItem}
   */
  _MenuItemType = MenubarItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof MenubarToggle}
   */
  _MenuToggleType = MenubarToggle;

  /**
   * Constructs the menu.
   *
   * @param {object}                 options                             - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                 - The menu element in the DOM.
   * @param {string}                 [options.menuItemSelector = li]     - The CSS selector string for menu items.
   * @param {string}                 [options.menuLinkSelector = a]      - The CSS selector string for menu links.
   * @param {string}                 [options.submenuItemSelector]       - The CSS selector string for menu items containing submenus.
   * @param {string}                 [options.submenuToggleSelector = a] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenuSelector = ul]      - The CSS selector string for submenus.
   * @param {(HTMLElement|null)}     [options.controllerElement = null]  - The element controlling the menu in the DOM.
   * @param {(HTMLElement|null)}     [options.containerElement = null]   - The element containing the menu in the DOM.
   * @param {(string|string[]|null)} [options.openClass = show]          - The class to apply when a menu is "open".
   * @param {(string|string[]|null)} [options.closeClass = hide]         - The class to apply when a menu is "closed".
   * @param {boolean}                [options.isTopLevel = true]         - A flag to mark the root menu.
   * @param {(Menubar|null)}         [options.parentMenu = null]         - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}                [options.initialize = true]         - A flag to initialize the menu immediately upon creation.
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

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Initializes the menu.
   *
   * Initialize will call the {@link BaseMenu#initialize|BaseMenu's initialize method}
   * as well as set up {@link Menubar#_handleFocus|focus},
   * {@link Menubar#_handleClick|click},
   * {@link Menubar#_handleHover|hover},
   * {@link Menubar#_handleKeydown|keydown}, and
   * {@link Menubar#_handleKeyup|keyup} events for the menu.
   *
   * This will also set the menu's `role` to "menubar" in the DOM.
   *
   * If the menu is a root menu the first menu item's `tabIndex` will be set to
   * 0 in the DOM.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize();

      // Set the role of the menu.
      if (this.isTopLevel) {
        this.dom.menu.setAttribute("role", "menubar");
      } else {
        this.dom.menu.setAttribute("role", "menu");
      }

      this._handleFocus();
      this._handleClick();
      this._handleHover();
      this._handleKeydown();
      this._handleKeyup();

      if (this.isTopLevel) {
        this.elements.menuItems[0].dom.link.tabIndex = 0;
      }
    } catch (error) {
      console.error(error);
    }
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
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the {@link Menubar#_handleKeyup|_handleKeyup method}.
   * - Adds all `keydown` listeners from {@link BaseMenu#_handleKeydown|BaseMenu's _handleKeydown method}
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
   *     "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
   *     and "A" through "Z".
   *   - Completely closes the menu and moves focus out if the "Tab" key is pressed.
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown();

    this.dom.menu.addEventListener("keydown", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (key === "Tab") {
        // Hitting Tab:
        // - Moves focus out of the menu.
        if (this.elements.rootMenu.focusState !== "none") {
          this.elements.rootMenu.blur();
          this.elements.rootMenu.closeChildren();
        } else {
          this.elements.rootMenu.focus();
        }
      }

      // Prevent default event actions if we're handling the keyup event.
      if (key === "Character") {
        preventEvent(event);
      } else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
          const submenuKeys = ["Space", "Enter", "ArrowDown", "ArrowUp"];
          const controllerKeys = ["Escape"];

          if (keys.includes(key)) {
            preventEvent(event);
          } else if (
            this.currentMenuItem.isSubmenuItem &&
            submenuKeys.includes(key)
          ) {
            preventEvent(event);
          } else if (this.elements.controller && controllerKeys.includes(key)) {
            preventEvent(event);
          }
        }
      } else {
        const keys = [
          "Escape",
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
        ];
        const submenuKeys = ["Space", "Enter"];

        if (keys.includes(key)) {
          preventEvent(event);
        } else if (
          this.currentMenuItem.isSubmenuItem &&
          submenuKeys.includes(key)
        ) {
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
   * {@link https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/menubar/menubar-1/menubar-1.html#kbd_label|Navigation Menubar Example}):
   *
   * <strong>Menubar</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Right Arrow_ | <ul><li>Moves focus to the next item in the menubar.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Left Arrow_ | <ul><li>Moves focus to the previous item in the menubar.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | _Down Arrow_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Up Arrow_ | Opens submenu and moves focus to last item in the submenu. |
   * | _Home_ | Moves focus to first item in the menubar. |
   * | _End_ | Moves focus to last item in the menubar. |
   * | _Character_ | <ul><li>Moves focus to next item in the menubar having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * <strong>Submenu</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | <ul><li>Activates menu item, causing the link to be activated.</li><li>NOTE: the links go to dummy pages; use the browser go-back function to return to this menubar example page.</li></ul> |
   * | _Escape_ | <ul><li>Closes submenu.</li><li>Moves focus to parent menubar item.</li></ul> |
   * | _Right Arrow_ | <ul><li>If focus is on an item with a submenu, opens the submenu and places focus on the first item.</li><li>If focus is on an item that does not have a submenu:<ul><li>Closes submenu.</li><li>Moves focus to next item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Left Arrow_ | <ul><li>Closes submenu and moves focus to parent menu item.</li><li>If parent menu item is in the menubar, also:<ul><li>moves focus to previous item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Down Arrow_ | <ul><li>Moves focus to the next item in the submenu.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Up Arrow_ | <ul><li>Moves focus to previous item in the submenu.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | Home | Moves focus to the first item in the submenu. |
   * | End | Moves focus to the last item in the submenu. |
   * | _Character_ | <ul><li>Moves focus to the next item having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup();

    this.dom.menu.addEventListener("keyup", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);
      const { altKey, crtlKey, metaKey } = event;
      const modifier = altKey || crtlKey || metaKey;

      if (key === "Character" && !modifier) {
        // Hitting Character:
        // - Moves focus to next item in the menubar having a name that starts with the typed character.
        // - If none of the items have a name starting with the typed character, focus does not move.
        preventEvent(event);
        this.elements.rootMenu.currentEvent = "character";
        this.focusNextChildWithCharacter(event.key);
      } else if (this.isTopLevel) {
        if (this.focusState === "self") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            } else {
              this.currentMenuItem.dom.link.click();
            }
          } else if (key === "ArrowRight") {
            // Hitting the Right Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
            preventEvent(event);

            // Store the current item's info if its an open dropdown.
            const previousChildOpen =
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isOpen;

            this.focusNextChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard";
                this.currentMenuItem.elements.toggle.preview();
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
              this.currentMenuItem.elements.toggle.isOpen;

            this.focusPreviousChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard";
                this.currentMenuItem.elements.toggle.preview();
              } else {
                this.closeChildren();
              }
            }
          } else if (key === "ArrowDown") {
            // Hitting the Down Arrow:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            }
          } else if (key === "ArrowUp") {
            // Hitting the Up Arrow:
            // - Opens submenu and moves focus to last item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusLastChild();
              });
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
            // Hitting Escape:
            // - Closes menu.
            const hasOpenChild = this.elements.submenuToggles.some(
              (toggle) => toggle.isOpen
            );

            if (hasOpenChild) {
              preventEvent(event);
              this.closeChildren();
            } else if (
              this.isTopLevel &&
              this.elements.controller &&
              this.elements.controller.isOpen
            ) {
              preventEvent(event);
              this.elements.controller.close();
              this.focusController();
            }
          }
        }
      } else {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - Activates menu item, causing the link to be activated.
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
            this.currentMenuItem.elements.toggle.open();
            // This ensures the the menu is _visually_ open before the child is focussed.
            requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            });
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "Escape") {
          // Hitting Escape:
          // - Closes submenu.
          // - Moves focus to parent menubar item.
          preventEvent(event);
          this.elements.rootMenu.closeChildren();
          this.elements.rootMenu.focusCurrentChild();
        } else if (key === "ArrowRight") {
          // Hitting the Right Arrow:
          // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
          // - If focus is on an item that does not have a submenu:
          //   - Closes submenu.
          //   - Moves focus to next item in the menubar.
          //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
            this.currentMenuItem.elements.toggle.open();
            // This ensures the the menu is _visually_ open before the child is focussed.
            requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            });
          } else {
            preventEvent(event);
            this.elements.rootMenu.closeChildren();
            this.elements.rootMenu.focusNextChild();

            if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
              this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
            }
          }
        } else if (key === "ArrowLeft") {
          // Hitting the Left Arrow:
          // - Closes submenu and moves focus to parent menu item.
          // - If parent menu item is in the menubar, also:
          //   - moves focus to previous item in the menubar.
          //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
          if (this.elements.parentMenu.currentMenuItem.isSubmenuItem) {
            preventEvent(event);
            this.elements.parentMenu.currentMenuItem.elements.toggle.close();
            this.elements.parentMenu.focusCurrentChild();

            if (this.elements.parentMenu === this.elements.rootMenu) {
              this.elements.rootMenu.closeChildren();
              this.elements.rootMenu.focusPreviousChild();

              if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard";
                this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
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
    });
  }

  /**
   * Focus the menu's next child.
   *
   * If the currently focussed child in the menu is the last child then this will
   * focus the first child in the menu.
   */
  focusNextChild() {
    // If the current child is the last child of the menu, focus the menu's first child.
    if (this.currentChild === this.elements.menuItems.length - 1) {
      this.focusFirstChild();
    } else {
      this.focusChild(this.currentChild + 1);
    }
  }

  /**
   * Focus the menu's previous child.
   *
   * If the currently focussed child in the menu is the first child then this will
   * focus the last child in the menu.
   */
  focusPreviousChild() {
    // If the current child is the first child of the menu, focus the menu's last child.
    if (this.currentChild === 0) {
      this.focusLastChild();
    } else {
      this.focusChild(this.currentChild - 1);
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
    let index = this.currentChild + 1;
    let found = false;

    while (!found && index < this.elements.menuItems.length) {
      let text = "";

      // Attempt to use the browser to get proper innerText,
      // otherwise fall back to textContent.
      if (this.elements.menuItems[index].dom.item.innerText) {
        text = this.elements.menuItems[index].dom.item.innerText;
      } else {
        text = this.elements.menuItems[index].dom.item.textContent;
      }

      // Remove spaces, make lowercase, and grab the first chracter of the string.
      text = text.replace(/[\s]/g, "").toLowerCase().charAt(0);

      // Focus the child if the text matches, otherwise move on.
      if (text === match) {
        found = true;
        this.focusChild(index);
      }

      index++;
    }
  }
}

export default Menubar;
