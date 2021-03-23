import BaseMenu from "./_baseMenu.js";
import MenubarItem from "./menubarItem.js";
import MenubarToggle from "./menubarToggle.js";
import { keyPress, preventEvent } from "./eventHandlers.js";

/**
 * An accessible menubar navigation in the DOM.
 *
 * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html
 */
class Menubar extends BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}           param0                               - The menu object.
   * @param {HTMLElement}      param0.menuElement                   - The menu element in the DOM.
   * @param {string}           [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}           [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}           [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}           [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}           [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement|null} [param0.controllerElement = null]    - The element controlling the menu in the DOM.
   * @param {HTMLElement|null} [param0.containerElement = null]     - The element containing the menu in the DOM.
   * @param {string}           [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string}           [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}          [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {Menubar|null}     [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}           [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
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

    this.MenuType = Menubar;
    this.MenuItemType = MenubarItem;
    this.MenuToggleType = MenubarToggle;

    this.initialize();
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    super.initialize();

    this.dom.menu.setAttribute("role", "menubar");

    this.handleFocus();
    this.handleClick();
    this.handleHover();
    this.handleKeydown();
    this.handleKeyup();

    this.elements.menuItems[0].dom.link.tabIndex = 0;
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   */
  handleKeydown() {
    super.handleKeydown();

    this.dom.menu.addEventListener("keydown", event => {
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
   */
  handleKeyup() {
    super.handleKeyup();

    this.dom.menu.addEventListener("keyup", event => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);
      const { altKey, crtlKey, metaKey } = event;
      const modifier = altKey || crtlKey || metaKey;

      if (key === "Character" && !modifier) {
        // Hitting Character:
        // - Moves focus to next item in the menubar having a name that starts with the typed character.
        // - If none of the items have a name starting with the typed character, focus does not move.
        preventEvent(event);
        this.focusNextChildWithCharacter(event.key);
      } else if (this.isTopLevel) {
        if (this.focusState === "self") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
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
              toggle => toggle.isOpen
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
            this.currentMenuItem.elements.toggle.open();
            // This ensures the the menu is _visually_ open before the child is focussed.
            requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            });
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
}

export default Menubar;
