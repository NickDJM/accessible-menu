import BaseMenu from "../src/_baseMenu.js";
import BaseMenuItem from "../src/_baseMenuItem.js";
import BaseMenuToggle from "../src/_baseMenuToggle.js";

/**
 * A BaseMenuItem clone that auto-initializes for the purposes of testing.
 *
 * @augments BaseMenuItem
 */
export class TestBaseMenuItem extends BaseMenuItem {
  /**
   * @inheritdoc
   *
   * @param {object}                  options                         - The options for generating the menu.
   * @param {HTMLElement}             options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}             options.menuLinkElement         - The menu item's link in the DOM.
   * @param {TestBaseMenu}            options.parentMenu              - The parent menu.
   * @param {boolean}                 [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {TestBaseMenu|null}       [options.childMenu = null]      - The child menu.
   * @param {TestBaseMenuToggle|null} [options.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement,
    menuLinkElement,
    parentMenu,
    isSubmenuItem = false,
    childMenu = null,
    toggle = null,
  }) {
    super({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem,
      childMenu,
      toggle,
    });

    this.initialize();
  }
}

/**
 * A BaseMenuToggle clone that auto-initializes for the purposes of testing.
 *
 * @augments BaseMenuToggle
 */
export class TestBaseMenuToggle extends BaseMenuToggle {
  /**
   * @inheritdoc
   *
   * @param {object}            options                     - The options for generating the menu toggle.
   * @param {HTMLElement}       options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}       options.parentElement       - The element containing the controlled menu.
   * @param {TestBaseMenu}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {TestBaseMenu|null} [options.parentMenu = null] - The menu containing this toggle.
   */
  constructor({
    menuToggleElement,
    parentElement,
    controlledMenu,
    parentMenu = null,
  }) {
    super({
      menuToggleElement,
      parentElement,
      controlledMenu,
      parentMenu,
    });

    this.initialize();
  }
}

/**
 * A BaseMenu clone that auto-initializes for the purposes of testing.
 *
 * @augments BaseMenu
 */
export class TestBaseMenu extends BaseMenu {
  /**
   * @inheritdoc
   *
   * @param {object}                 options                             - The menu object.
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
   * @param {boolean}                [options.isTopLevel = false]        - A flag to mark the root menu.
   * @param {(TestBaseMenu|null)}    [options.parentMenu = null]         - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
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

    this.MenuType = TestBaseMenu;
    this.MenuItemType = TestBaseMenuItem;
    this.MenuToggleType = TestBaseMenuToggle;

    this.initialize();
  }
}
