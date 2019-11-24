import Menu from "./menu";
import SubmenuItem from "./submenuItem";
import { keyPress, preventEvent } from "./eventHandlers";

const validate = {
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
    validate.parentMenu(parentMenu);

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
          if (this.currentMenuItem instanceof SubmenuItem) {
            this.currentMenuItem.toggle.open();
          } else {
            this.rootMenu.closeChildren();
            this.rootMenu.focusNextChild();

            if (this.rootMenu.currentMenuItem instanceof SubmenuItem) {
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
          if (this.currentMenuItem instanceof SubmenuItem) {
            this.currentMenuItem.toggle.close();

            if (this.parentMenu === this.rootMenu) {
              this.rootMenu.closeChildren();
              this.rootMenu.focusPreviousChild();

              if (this.rootMenu.currentMenuItem instanceof SubmenuItem) {
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

export default Submenu;
