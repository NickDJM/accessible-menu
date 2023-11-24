# DisclosureMenu

An accessible disclosure menu in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

Constructs a new `DisclosureMenu`.

```js
/**
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
 * @param {boolean}            [options.isTopLevel = true]               - A flag to mark the root menu.
 * @param {?DisclosureMenu}    [options.parentMenu = null]               - The parent menu to this menu.
 * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
 * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
 * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
 * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
 * @param {boolean}            [options.optionalKeySupport = false]      - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
 * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
 */
new DisclosureMenu({
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
  optionalKeySupport,
  initialize,
});
```

The constructor will call [BaseMenu's constructor](./base-menu#constructor) with the provided options. It will also populate the optionalSupport property and initialize the menu if the initialize flag is set to true.

## Initialize

Initializes the menu.

```js
DisclosureMenu.initialize();
```

Initialize will call [BaseMenu's initialize method](./base-menu#initialize) as well as set up [focus](#handlefocus), [click](#handleclick), [hover](#handlehover), [keydown](#handlekeydown), and [keyup](#handlekeyup) events for the menu.

If the BaseMenu's initialize method throws an error,
this will catch it and log it to the console.

## Properties

::: info Note

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overwritten in the DisclosureMenu class.

:::

### _MenuType

The class to use when generating submenus.

```js
/**
 * @protected
 *
 * @type {typeof DisclosureMenu}
 */
DisclosureMenu._MenuType; // DisclosureMenu.
```

### _MenuItemType

The class to use when generating menu items.

```js
/**
 * @protected
 *
 * @type {typeof DisclosureMenuItem}
 */
DisclosureMenu._MenuItemType; // DisclosureMenuItem.
```

### _MenuToggleType

The class to use when generating menu toggles.

```js
/**
 * @protected
 *
 * @type {typeof DisclosureMenuToggle}
 */
DisclosureMenu._MenuToggleType; // DisclosureMenuToggle.
```

### _currentChild

The index of the currently selected [menu item](./disclosure-menu-item) in the menu.

```js
/**
 * @protected
 *
 * @type {number}
 */
DisclosureMenu._currentChild; // -1.
```

### _optionalSupport

A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.

```js
/**
 * @protected
 *
 * @type {boolean}
 */
DisclosureMenu._optionalSupport; // false.
```

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overwritten in the DisclosureMenu class.

:::

### optionalKeySupport

A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.

::: code-group

```js [getter]
/**
 * @type {boolean}
 *
 * @see _optionalSupport
 */
DisclosureMenu.optionalKeySupport;
```

```js [setter]
/**
 * @type {boolean}
 */
DisclosureMenu.optionalKeySupport = true;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's optionalKeySupport.

## Methods

::: info Note

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overwritten in the DisclosureMenu class.

:::

### _validate

Validates all aspects of the menu to ensure proper functionality.

```js
/**
 * @protected
 *
 * @returns {boolean} - The result of the validation.
 */
DisclosureMenu._validate();
```

The validation method will call [BaseMenu's validation method](./base-menu#validate) as well as validate the optionalKeySupport property.

### _handleClick

Handles click events throughout the menu for proper use.

```js
/**
 * @protected
 */
DisclosureMenu._handleClick();
```

This method will do the following:

- Adds all event listeners listed in [BaseMenu's _handleClick method](./base-menu#handleclick).
- Adds a `pointerup` listener to the `document` so if the user clicks outside of the menu it will close if it is open.

### _handleKeydown

Handles keydown events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
DisclosureMenu._handleKeydown();
```

This method exists to assist the [_handleKeyup method](#handlekeyup).

This method will do the following:
- Adds all `keydown` listeners from [BaseMenu's _handleKeydown method](./base-menu#handlekeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
  - _If_ [optional keyboard support](#optionalkeysupport) is enabled, blocks propagation on the following keys: "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".

### _handleKeyup

Handles keyup events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
DisclosureMenu._handleKeyup();
```

Adds all `keyup` listeners from [BaseMenu's _handleKeyup method](./base-menu#handlekeyup).

Adds the following keybindings (explanations are taken from the [WAI ARIA Pracitices Example Disclosure for Navigation Menus](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html#kbd_label):

| Key | Function |
| --- | --- |
| _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
| _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
| _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
| _Down Arrow_ or _Right Arrow_ (Optional}) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
| _Up Arrow_ or _Left Arrow_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
| _Home_ (Optional) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
| _End_ (Optional) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |

The optional keybindings are controlled by the menu's [optionalKeySupport](#optionalkeysupport) value.