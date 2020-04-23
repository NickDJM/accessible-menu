import BaseMenu from "./_baseMenu";

/**
 * An accessible disclosure menu in the DOM.
 */
class DisclosureMenu extends BaseMenu {
  /**
   * {@inheritdoc}
   *
   * @param {object}         param0                               - The menu object.
   * @param {HTMLElement}    param0.menuElement                   - The menu element in the DOM.
   * @param {string}         [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
   * @param {string}         [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
   * @param {string}         [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
   * @param {string}         [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
   * @param {string}         [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
   * @param {HTMLElement}    param0.controllerElement             - The element controlling the menu in the DOM.
   * @param {HTMLElement}    param0.containerElement              - The element containing the menu in the DOM.
   * @param {string}         [param0.openClass = "show"]          - The class to apply when a menu is "open".
   * @param {string}         [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
   * @param {boolean}        [param0.isTopLevel = false]          - A flag to mark the root menu.
   * @param {DisclosureMenu} param0.parentMenu                    - The parent menu to this menu.
   * @param {boolean}        [param0.isHoverable = false]         - A flag to allow hover events on the menu.
   * @param {number}         [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
   */
  constructor({
    menuElement,
    menuItemSelector = "li",
    menuLinkSelector = "a",
    submenuItemSelector = "",
    submenuToggleSelector = "a",
    submenuSelector = "ul",
    controllerElement,
    containerElement,
    openClass = "show",
    closeClass = "hide",
    isTopLevel = true,
    parentMenu,
    isHoverable = false,
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
      isHoverable,
      hoverDelay,
    });

    this.currentChild = -1;
  }

  /**
   * Initializes the menu.
   *
   * This will also initialize all menu items and sub menus.
   */
  initialize() {
    super.initialize();

    this.createChildElements(DisclosureMenu);
    this.handleFocus();
    this.handleClick();
    if (this.isHoverable) this.handleHover();
  }
}

export default DisclosureMenu;
