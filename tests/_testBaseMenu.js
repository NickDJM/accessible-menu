/**
 * A menu subclass specifically for testing the base menu.
 *
 * All this does is ensures the base menu will initialize automatically.
 */

import BaseMenu from "../src/_baseMenu.js";
import BaseMenuItem from "../src/_baseMenuItem.js";
import BaseMenuToggle from "../src/_baseMenuToggle.js";

class TestBaseMenuItem extends BaseMenuItem {
  /**
   * {@inheritdoc}
   *
   * @param {object}                  param0                         - The menu item object.
   * @param {HTMLElement}             param0.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}             param0.menuLinkElement         - The menu item's link in the DOM.
   * @param {TestBaseMenu}            param0.parentMenu              - The parent menu.
   * @param {boolean}                 [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {TestBaseMenu|null}       [param0.childMenu = null]      - The child menu.
   * @param {TestBaseMenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
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

class TestBaseMenuToggle extends BaseMenuToggle {
  /**
   * {@inheritdoc}
   *
   * @param {object}            param0                     - The menu toggle object.
   * @param {HTMLElement}       param0.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}       param0.parentElement       - The element containing the controlled menu.
   * @param {TestBaseMenu}      param0.controlledMenu      - The menu controlled by this toggle.
   * @param {TestBaseMenu|null} [param0.parentMenu = null] - The menu containing this toggle.
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

class TestBaseMenu extends BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}            param0                               - The menu object.
   * @param {HTMLElement}       param0.menuElement                   - The menu element in the DOM.
   * @param {string}            [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}            [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}            [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}            [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}            [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement|null}  [param0.controllerElement = null]    - The element controlling the menu in the DOM.
   * @param {HTMLElement|null}  [param0.containerElement = null]     - The element containing the menu in the DOM.
   * @param {string}            [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string}            [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}           [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {TestBaseMenu|null} [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}            [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}            [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
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

export default TestBaseMenu;
