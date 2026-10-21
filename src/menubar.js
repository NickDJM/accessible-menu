import BaseMenu from "./_baseMenu.js";
import MenubarItem from "./menubarItem.js";
import MenubarToggle from "./menubarToggle.js";
import {
  keyPress,
  preventEvent,
} from "@accessible-ecosystem/core/eventHelpers.js";

/**
 * An accessible menubar navigation in the DOM.
 *
 * See Navigation Menubar Example
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
   * Constructs a new `Menubar`.
   *
   * @param {object}             options                                     - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                         - The menu element in the DOM.
   * @param {string}             [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuTogglesSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {?string}            [options.submenuSubtogglesSelector = null]  - The query selector string for submenu toggles below the top level. If null, submenuTogglesSelector is used.
   * @param {string}             [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])} [options.expandClass = show]                - The class to apply when a menu is expanded.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class to apply when a menu is collapsed.
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between expanded and collapsed states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}             [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}             [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?Menubar}           [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for expanding and collapsing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for expanding a menu if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for collapsing a menu if the menu is hoverable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint used to generate the root controller's media query.
   * @param {string}             [options.mediaQuery = '']                   - The media query used to trigger the root controller's media query list events.
   * @param {boolean}            [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}            [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}            [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}            [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}            [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}            [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}            [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}            [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                 - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement,
    menuItemsSelector = "li",
    menuLinksSelector = "a",
    submenuItemsSelector = "li:has(ul)",
    submenuTogglesSelector = "a",
    submenuSubtogglesSelector = null,
    submenusSelector = "ul",
    controllerElement = null,
    containerElement = null,
    initializeClass = "initializing",
    expandClass = "show",
    collapseClass = "hide",
    transitionClass = "transitioning",
    transitionDuration = 250,
    expandDuration = -1,
    collapseDuration = -1,
    isTopLevel = true,
    parentMenu = null,
    hoverType = "off",
    hoverDelay = 250,
    enterDelay = -1,
    leaveDelay = -1,
    breakpoint = "",
    mediaQuery = "",
    expandInsideBreakpoint = false,
    expandOutsideBreakpoint = false,
    collapseInsideBreakpoint = false,
    collapseOutsideBreakpoint = false,
    lockInsideBreakpoint = false,
    lockOutsideBreakpoint = false,
    unlockInsideBreakpoint = false,
    unlockOutsideBreakpoint = false,
    prefix = "am-",
    key = null,
    initialize = true,
  }) {
    super({
      menuElement,
      menuItemsSelector,
      menuLinksSelector,
      submenuItemsSelector,
      submenuTogglesSelector,
      submenuSubtogglesSelector,
      submenusSelector,
      controllerElement,
      containerElement,
      initializeClass,
      expandClass,
      collapseClass,
      transitionClass,
      transitionDuration,
      expandDuration,
      collapseDuration,
      isTopLevel,
      parentMenu,
      hoverType,
      hoverDelay,
      enterDelay,
      leaveDelay,
      breakpoint,
      mediaQuery,
      expandInsideBreakpoint,
      expandOutsideBreakpoint,
      collapseInsideBreakpoint,
      collapseOutsideBreakpoint,
      lockInsideBreakpoint,
      lockOutsideBreakpoint,
      unlockInsideBreakpoint,
      unlockOutsideBreakpoint,
      prefix,
      key,
    });

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Registers the menu's initialization event listener.
   *
   * If the menu is a root menu, its `role` will be set to "menubar" and the first
   * menu item's `tabIndex` will be set to 0 in the DOM if the menu has any items.
   *
   * If the menu is not a root menu, its `role` will be set to "menu".
   *
   * If the root menu has a controller, removes its `aria-haspopup` attribute.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap();
    this._addEventListener(
      this.getEventName("initialize"),
      this.rootDOMElement,
      (event) => {
        if (event.detail.component !== this) return;
        // Set the role of the menu.
        if (this.isTopLevel) {
          this.dom.menu.setAttribute("role", "menubar");
        } else {
          this.dom.menu.setAttribute("role", "menu");
        }

        if (this.isTopLevel) {
          if (this.elements.menuItems.length > 0) {
            this.elements.menuItems[0].dom.link.tabIndex = 0;
          }

          // Remove the aria-haspopup attribute from the controller.
          // It isn't needed for the root toggle.
          if (this.elements.controller) {
            this.elements.controller.dom.controller.removeAttribute(
              "aria-haspopup"
            );
          }
        }
      }
    );
  }

  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `click` listener to the `document` so if the user
   *   clicks outside of the menu it will collapse if it is expanded.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick();

    // Close the menu if a click event happens outside of it.
    this._addEventListener("click", document, (event) => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (!this.dom.menu.contains(event.target)) {
          this.collapseChildren();
          this.blur();

          if (this.elements.controller) {
            this.elements.controller.collapse();
          }

          this.elements.rootMenu.hasExpanded = false;
        }
      }
    });
  }

  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * Ignores keydown events using Ctrl, Alt, or Meta.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
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

    this._addEventListener("keydown", this.dom.menu, (event) => {
      // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (key === "Tab") {
        // Hitting Tab:
        // - Moves focus out of the menu.
        if (this.elements.rootMenu.focusState !== "none") {
          this.elements.rootMenu.blur();
          this.elements.rootMenu.collapseChildren();
        } else {
          this.elements.rootMenu.focus();
        }
      }

      // Prevent default event actions if we're handling the keyup event.
      if (key === "Character") {
        preventEvent(event);
      } else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const keys = [
            "Space",
            "Enter",
            "ArrowRight",
            "ArrowLeft",
            "Home",
            "End",
          ];
          const submenuKeys = ["ArrowDown", "ArrowUp"];
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
          "Space",
          "Enter",
          "Escape",
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
        ];

        if (keys.includes(key)) {
          preventEvent(event);
        }
      }
    });
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Ignores keyup events using Ctrl, Alt, or Meta.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * Navigation Menubar Example):
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
   * | _Space_ or _Enter_ | Opens a submenu and moves focus to its first item, or activates the link if the item has no submenu. |
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

    this._addEventListener("keyup", this.dom.menu, (event) => {
      // Leave shortcuts using Ctrl, Alt, or Meta to the browser or other handlers.
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (key === "Character") {
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
            preventEvent(event);

            if (this.currentMenuItem.isSubmenuItem) {
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.expand();
              this._focusSubmenu(this.currentMenuItem, { defer: true });
            } else {
              this.currentMenuItem.dom.link.click();
            }
          } else if (key === "ArrowRight") {
            // Hitting the Right Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
            preventEvent(event);

            // Remember whether the current item's submenu is open.
            const previousChildOpen =
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isExpanded;

            this.focusNextChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard";
                this.currentMenuItem.elements.toggle.preview();
              } else {
                this.collapseChildren();
              }
            }
          } else if (key === "ArrowLeft") {
            // Hitting the Left Arrow:
            // - Moves focus to the previous item in the menubar.
            // - If focus is on the first item, moves focus to the last item.
            // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
            preventEvent(event);

            // Remember whether the current item's submenu is open.
            const previousChildOpen =
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isExpanded;

            this.focusPreviousChild();

            // Open the newly focussed submenu if applicable.
            if (previousChildOpen) {
              if (this.currentMenuItem.isSubmenuItem) {
                this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard";
                this.currentMenuItem.elements.toggle.preview();
              } else {
                this.collapseChildren();
              }
            }
          } else if (key === "ArrowDown") {
            // Hitting the Down Arrow:
            // - Opens submenu and moves focus to first item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.expand();
              this._focusSubmenu(this.currentMenuItem, { defer: true });
            }
          } else if (key === "ArrowUp") {
            // Hitting the Up Arrow:
            // - Opens submenu and moves focus to last item in the submenu.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.expand();
              const submenu = this.currentMenuItem.elements.childMenu;

              this._focusSubmenu(this.currentMenuItem, {
                childIndex: submenu.elements.menuItems.length - 1,
                defer: true,
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
              (toggle) => toggle.isExpanded
            );

            if (hasOpenChild) {
              preventEvent(event);
              this.collapseChildren();
            } else if (
              this.isTopLevel &&
              this.elements.controller &&
              this.elements.controller.isExpanded
            ) {
              preventEvent(event);
              this.elements.controller.collapse();
              this.focusController();
            }
          }
        }
      } else {
        if (key === "Space" || key === "Enter") {
          // Hitting Space or Enter:
          // - Activates menu item, causing the link to be activated.
          preventEvent(event);

          if (this.currentMenuItem.isSubmenuItem) {
            this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
            this.currentMenuItem.elements.toggle.expand();
            this._focusSubmenu(this.currentMenuItem, { defer: true });
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "Escape") {
          // Hitting Escape:
          // - Closes submenu.
          // - Moves focus to parent menubar item.
          preventEvent(event);
          this.elements.parentMenu.collapseChildren();
          this.elements.parentMenu.focusCurrentChild();
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
            this.currentMenuItem.elements.toggle.expand();
            this._focusSubmenu(this.currentMenuItem, { defer: true });
          } else {
            preventEvent(event);
            this.elements.rootMenu.collapseChildren();
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
            this.elements.parentMenu.currentMenuItem.elements.toggle.collapse();
            this.elements.parentMenu.focusCurrentChild();

            if (this.elements.parentMenu === this.elements.rootMenu) {
              this.elements.rootMenu.collapseChildren();
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
          // - Moves focus to the next item in the submenu.
          // - If focus is on the last item, moves focus to the first item.
          preventEvent(event);
          this.focusNextChild();
        } else if (key === "ArrowUp") {
          // Hitting the Up Arrow:
          // - Moves focus to the previous item in the submenu.
          // - If focus is on the first item, moves focus to the last item.
          preventEvent(event);
          this.focusPreviousChild();
        } else if (key === "Home") {
          // Hitting Home:
          // - Moves focus to first item in the submenu.
          preventEvent(event);
          this.focusFirstChild();
        } else if (key === "End") {
          // Hitting End:
          // - Moves focus to last item in the submenu.
          preventEvent(event);
          this.focusLastChild();
        }
      }
    });
  }

  /**
   * Focus the menu's next child.
   *
   * If the currently focused child in the menu is the last child then this will
   * focus the first child in the menu.
   *
   * @public
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
   * If the currently focused child in the menu is the first child then this will
   * focus the last child in the menu.
   *
   * @public
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
   * @public
   *
   * @param {string} char - The character to look for.
   */
  focusNextChildWithCharacter(char) {
    // Ensure the character is lowercase just to be safe.
    const match = char.toLowerCase();
    let index = this.currentChild + 1;
    let found = false;

    while (!found && index < this.elements.menuItems.length) {
      let text;

      // Attempt to use the browser to get proper innerText,
      // otherwise fall back to textContent.
      if (this.elements.menuItems[index].dom.item.innerText) {
        text = this.elements.menuItems[index].dom.item.innerText;
      } else {
        text = this.elements.menuItems[index].dom.item.textContent;
      }

      // Remove spaces, make lowercase, and grab the first character of the string.
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
