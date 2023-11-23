# BaseMenu

An accessible navigation element in the DOM.

This is intended to be used as a "base" to other menus and not to be used on
it's own in the DOM.

## Constructor

Constructs a new `BaseMenu`.

```js

  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}            [options.isTopLevel = false]              - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.enterDelay = -1]                 - The delay for opening menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.leaveDelay = -1]                 - The delay for closing menus if the menu is hoverable (in miliseconds).
   */
  new BaseMenu({
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
    transitionClass,
    isTopLevel,
    parentMenu,
    hoverType,
    hoverDelay,
    enterDelay,
    leaveDelay,
  });
```

The constructor populates the `_dom`, `_selectors`, `_elements`, `_openClass`, `_closeClass`, `_transitionClass`, `_root`, `_hoverType`, `_hoverDelay`, `_enterDelay`, and `_leaveDelay` properties. It will _not_ initialize the menu; this is left to the subclasses to handle.
