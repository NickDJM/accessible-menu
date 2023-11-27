# Menubar

An accessible menubar navigation in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

Constructs a new `Menubar`.

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
 * @param {?Menubar}           [options.parentMenu = null]               - The parent menu to this menu.
 * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
 * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
 * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
 * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
 * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
 */
new Menubar({
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
  initialize,
});
```

The constructor will call [BaseMenu's constructor](./base-menu#constructor) with the provided options. It will also initialize the menu if the initialize flag is set to `true`.

## Initialize

Initializes the menu.

```js
Menubar.initialize();
```

Initialize will call [BaseMenu's initialize method](./base-menu#initialize) as well as set up [focus](#handlefocus), [click](#handleclick), [hover](#handlehover), [keydown](#handlekeydown), and [keyup](#handlekeyup) events for the menu.

This will also set the menu's `role` to "menubar" in the DOM.

If the menu is a root menu the first menu item's `tabIndex` will be set to 0 in the DOM.

If the BaseMenu's initialize method throws an error, this will catch it and log it to the console.



## Properties

::: info Note

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overwritten in the Menubar class.

:::

### _MenuType

The class to use when generating submenus.

```js
/**
 * @protected
 *
 * @type {typeof Menubar}
 */
Menubar._MenuType; // Menubar.
```

### _MenuItemType

The class to use when generating menu items.

```js
/**
 * @protected
 *
 * @type {typeof MenubarItem}
 */
Menubar._MenuItemType; // MenubarItem.
```

### _MenuToggleType

The class to use when generating menu toggles.

```js
/**
 * @protected
 *
 * @type {typeof MenubarToggle}
 */
Menubar._MenuToggleType; // MenubarToggle.
```

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overwritten in the Menubar class.

:::

## Methods

::: info Note

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overwritten in the Menubar class.

:::

### _handleClick

Handles click events throughout the menu for proper use.

```js
/**
 * @protected
 */
Menubar._handleClick();
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
Menubar._handleKeydown();
```

This method exists to assist the [_handleKeyup method](#handlekeyup).

This method will do the following:

- Adds all `keydown` listeners from [BaseMenu's _handleKeydown method](./base-menu#handlekeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
    "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
    and "A" through "Z".
  - Completely closes the menu and moves focus out if the "Tab" key is pressed.


### _handleKeyup

Handles keyup events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
Menubar._handleKeyup();
```

Adds all `keyup` listeners from [BaseMenu's _handleKeyup method](./base-menu#handlekeyup).

Adds the following keybindings (explanations are taken from the [Navigation Menubar Example](https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/menubar/menubar-1/menubar-1.html#kbd_label):

#### Menubar

| Key | Function |
| --- | --- |
| _Space_ or _Enter_ | Opens submenu and moves focus to first item in the submenu. |
| _Right Arrow_ | <ul><li>Moves focus to the next item in the menubar.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
| _Left Arrow_ | <ul><li>Moves focus to the previous item in the menubar.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
| _Down Arrow_ | Opens submenu and moves focus to first item in the submenu. |
| _Up Arrow_ | Opens submenu and moves focus to last item in the submenu. |
| _Home_ | Moves focus to first item in the menubar. |
| _End_ | Moves focus to last item in the menubar. |
| _Character_ | <ul><li>Moves focus to next item in the menubar having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |

#### Submenu

| Key | Function |
| --- | --- |
| _Space_ or _Enter_ | <ul><li>Activates menu item, causing the link to be activated.</li><li>NOTE: the links go to dummy pages; use the browser go-back function to return to this menubar example page.</li></ul> |
| _Escape_ | <ul><li>Closes submenu.</li><li>Moves focus to parent menubar item.</li></ul> |
| _Right Arrow_ | <ul><li>If focus is on an item with a submenu, opens the submenu and places focus on the first item.</li><li>If focus is on an item that does not have a submenu:<ul><li>Closes submenu.</li><li>Moves focus to next item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
| _Left Arrow_ | <ul><li>Closes submenu and moves focus to parent menu item.</li><li>If parent menu item is in the menubar, also:<ul><li>moves focus to previous item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
| _Down Arrow_ | <ul><li>Moves focus to the next item in the submenu.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
| _Up Arrow_ | <ul><li>Moves focus to previous item in the submenu.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
| Home | Moves focus to the first item in the submenu. |
| End | Moves focus to the last item in the submenu. |
| _Character_ | <ul><li>Moves focus to the next item having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |

### focusNextChild

Focus the menu's next child.

```js
/**
 * @public
 */
Menubar.focusNextChild();
```

If the currently focussed child in the menu is the last child then this will focus the first child in the menu.


### focusPreviousChild

Focus the menu's previous child.

```js
/**
 * @public
 */
Menubar.focusPreviousChild();
```

If the currently focussed child in the menu is the first child then this will focus the last child in the menu.

### focusNextChildWithCharacter

Focus the menu's next child starting with a specific letter.

```js
/**
 * @public
 *
 * @param {string} char - The character to look for.
 */
Menubar.focusNextChildWithCharacter(char);
```
