import BaseMenu from "./_baseMenu.js";
import TreeviewItem from "./treeviewItem.js";
import TreeviewToggle from "./treeviewToggle.js";
import { keyPress, preventEvent } from "./eventHandlers.js";

/**
 * An accessible treeview navigation in the DOM.
 *
 * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2a.html
 * or https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2b.html
 */
class Treeview extends BaseMenu {
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
   * @param {Treeview|null}    [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}           [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}          [param0.initialize = true]           - A flag to initialize the menu immediately upon creation.
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

    // Set default class types.
    this.MenuType = Treeview;
    this.MenuItemType = TreeviewItem;
    this.MenuToggleType = TreeviewToggle;

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    try {
      super.initialize();

      if (this.isTopLevel) {
        this.dom.menu.setAttribute("role", "tree");
        this.elements.menuItems[0].dom.link.tabIndex = 0;
      } else {
        this.dom.menu.setAttribute("role", "group");
      }

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

      if (key === "Tab") {
        // Hitting Tab:
        // - Moves focus out of the menu.
        if (this.elements.rootMenu.focusState !== "none") {
          this.elements.rootMenu.blur();
        } else {
          this.elements.rootMenu.focus();
        }
      }

      if (this.focusState === "self") {
        const keys = [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "Asterisk",
          "Home",
          "End",
        ];
        const submenuKeys = ["Enter", "ArrowRight"];
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

      if (key === "Character") {
        // Hitting Character:
        // - Focus moves to the next node with a name that starts with the typed character.
        // - Search wraps to first node if a matching name is not found among the nodes that follow the focused node.
        // - Search ignores nodes that are descendants of closed nodes.
        preventEvent(event);
        this.focusNextNodeWithCharacter(event.key);
      } else if (this.focusState === "self") {
        if (key === "Enter" || key === "Space") {
          // Hitting Space or Enter:
          // - Performs the default action (e.g. onclick event) for the focused node.
          // - If focus is on a closed node, opens the node; focus does not move.
          preventEvent(event);

          if (this.currentMenuItem.isSubmenuItem) {
            if (this.currentMenuItem.elements.toggle.isOpen) {
              this.currentMenuItem.elements.toggle.close();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "ArrowDown") {
          // Hitting the Down Arrow:
          // - Moves focus to the next node that is focusable without opening or closing a node.
          // - If focus is on the last node, does nothing.
          preventEvent(event);

          if (
            this.currentMenuItem.isSubmenuItem &&
            this.currentMenuItem.elements.toggle.isOpen
          ) {
            this.blurCurrentChild();
            this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent;
            this.currentMenuItem.elements.childMenu.focusFirstChild();
          } else if (
            !this.isTopLevel &&
            this.currentChild === this.elements.menuItems.length - 1
          ) {
            this.blurCurrentChild();
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.focusNextChild();
          } else {
            this.focusNextChild();
          }
        } else if (key === "ArrowUp") {
          // Hitting the Up Arrow:
          // - Moves focus to the previous node that is focusable without opening or closing a node.
          // - If focus is on the first node, does nothing.
          preventEvent(event);

          const previousMenuItem = this.elements.menuItems[
            this.currentChild - 1
          ];

          if (
            previousMenuItem &&
            previousMenuItem.isSubmenuItem &&
            previousMenuItem.elements.toggle.isOpen
          ) {
            this.blurCurrentChild();
            this.currentChild = this.currentChild - 1;
            this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent;
            this.currentMenuItem.elements.childMenu.focusLastChild();
          } else if (!this.isTopLevel && this.currentChild === 0) {
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.focusCurrentChild();
          } else {
            this.focusPreviousChild();
          }
        } else if (key === "ArrowRight") {
          // Hitting the Right Arrow:
          // - When focus is on a closed node, opens the node; focus does not move.
          // - When focus is on a open node, moves focus to the first child node.
          // - When focus is on an end node, does nothing.
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);

            if (this.currentMenuItem.elements.toggle.isOpen) {
              this.blurCurrentChild();
              this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent;
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          }
        } else if (key === "ArrowLeft") {
          // Hitting the Left Arrow:
          // - When focus is on an open node, closes the node.
          // - When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
          // - When focus is on a root node that is also either an end node or a closed node, does nothing.
          preventEvent(event);

          if (
            this.currentMenuItem.isSubmenuItem &&
            this.currentMenuItem.elements.toggle.isOpen
          ) {
            this.currentMenuItem.elements.childMenu.blurCurrentChild();
            this.currentMenuItem.elements.toggle.close();
          } else if (!this.isTopLevel) {
            this.blurCurrentChild();
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.focusCurrentChild();
          }
        } else if (key === "Home") {
          // Hitting Home:
          // - Moves focus to first node without opening or closing a node.
          preventEvent(event);
          this.blurCurrentChild();
          this.elements.rootMenu.focusFirstChild();
        } else if (key === "End") {
          // Hitting End:
          // - Moves focus to the last node that can be focused without expanding any nodes that are closed.
          preventEvent(event);
          this.blurCurrentChild();
          this.elements.rootMenu.focusLastNode();
        } else if (key === "Asterisk") {
          // Hitting Asterisk:
          // - Expands all closed sibling nodes that are at the same level as the focused node.
          // - Focus does not move.
          preventEvent(event);
          this.openChildren();
        }
      }
    });
  }

  /**
   * Focus the menu's last node of the entire expanded menu.
   *
   * This includes all _open_ child menu items.
   */
  focusLastNode() {
    const numberOfItems = this.elements.menuItems.length - 1;
    const lastChild = this.elements.menuItems[numberOfItems];

    if (lastChild.isSubmenuItem && lastChild.elements.toggle.isOpen) {
      this.currentChild = numberOfItems;
      lastChild.elements.childMenu.currentEvent = this.currentEvent;
      lastChild.elements.childMenu.focusLastNode();
    } else {
      this.focusLastChild();
    }
  }

  /**
   * Open all submenu children.
   */
  openChildren() {
    this.elements.submenuToggles.forEach((toggle) => toggle.preview());
  }

  /**
   * Focus the menu's next node starting with a specific letter.
   *
   * Wraps to the first node if no match is found after the current node.
   *
   * This includes all _open_ child menu items.
   *
   * @param {string} char - The character to look for.
   */
  focusNextNodeWithCharacter(char) {
    /**
     * Gets all the menu's items and submenu's items.
     *
     * @param {Treeview} menu - The menu.
     *
     * @returns {TreeviewItem[]} - The menu items.
     */
    function getOpenMenuItems(menu) {
      let menuItems = [];

      menu.elements.menuItems.forEach((menuItem) => {
        menuItems.push(menuItem);

        if (menuItem.isSubmenuItem && menuItem.elements.toggle.isOpen) {
          menuItems = [
            ...menuItems,
            ...getOpenMenuItems(
              menuItem.elements.toggle.elements.controlledMenu
            ),
          ];
        }
      });

      return menuItems;
    }

    // Ensure the character is lowercase just to be safe.
    const match = char.toLowerCase();
    // Sort the menu items so the child _after_ the current child is first to be searched.
    const menuItems = getOpenMenuItems(this.elements.rootMenu);
    const currentItem = menuItems.indexOf(this.currentMenuItem) + 1;
    const sortedMenuItems = [
      ...menuItems.slice(currentItem),
      ...menuItems.slice(0, currentItem),
    ];
    let ctr = 0;
    let found = false;

    while (!found && ctr < sortedMenuItems.length) {
      // Ensure the text in the item is lowercase just to be safe.
      const text = sortedMenuItems[ctr].dom.item.innerText.toLowerCase();

      // Focus the child if the text matches, otherwise move on.
      if (text.startsWith(match)) {
        found = true;
        const menu = sortedMenuItems[ctr].elements.parentMenu;
        const index = menu.elements.menuItems.indexOf(sortedMenuItems[ctr]);
        this.elements.rootMenu.blurChildren();
        menu.focusChild(index);
      }

      ctr++;
    }
  }
}

export default Treeview;
