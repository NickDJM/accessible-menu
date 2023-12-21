# DisclosureMenu

An accessible disclosure menu in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

Constructs a new `DisclosureMenu`.

```js
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

The constructor will call [BaseMenu's constructor](./base-menu#constructor) with the provided options. It will also populate the optionalSupport property and initialize the menu if the initialize flag is set to `true`.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu. | `undefined` |
| options.menuElement | `HTMLElement` | The menu element in the DOM. | `undefined` |
| options.menuItemSelector | `string` | The query selector string for menu items. | `"li"` |
| options.menuLinkSelector | `string` | The query selector string for menu links. | `"a"` |
| options.submenuItemSelector | `string` | The query selector string for menu items containing submenus. | `undefined` |
| options.submenuToggleSelector | `string` | The query selector string for submenu toggle buttons/links. | `"a"` |
| options.submenuSelector | `string` | The query selector string for submenus. | `"ul"` |
| options.controllerElement | `HTMLElement`, `null` | The element controlling the menu in the DOM. | `null` |
| options.containerElement | `HTMLElement`, `null` | The element containing the menu in the DOM. | `null` |
| options.openClass | `string`, `string[]`, `null` | The class to apply when a menu is "open". | `"show"` |
| options.closeClass | `string`, `string[]`, `null` | The class to apply when a menu is "closed". | `"hide"` |
| options.transitionClass | `string`, `string[]`, `null` | The class to apply when a menu is transitioning between "open" and "closed" states. | `transitioning` |
| options.isTopLevel | `boolean` | A flag to mark the root menu. | `true` |
| options.parentMenu | `DisclosureMenu`, `null` | The parent menu to this menu. | `null` |
| options.hoverType | `string` | The type of hoverability a menu has. | `"off"` |
| options.hoverDelay | `number` | The delay for opening and closing menus if the menu is hoverable (in miliseconds). | `250` |
| options.enterDelay | `number` | The delay for opening a menu if the menu is focusable (in miliseconds). | `-1` |
| options.leaveDelay | `number` | The delay for closing a menu if the menu is focusable (in miliseconds). | `-1` |
| options.optionalKeySupport | `boolean` | A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu. | `false` |
| options.initialize | `boolean` | A flag to initialize the menu immediately upon creation. | `true` |

## Initialize

Initializes the menu.

```js
DisclosureMenu.initialize();
```

Initialize will call [BaseMenu's initialize method](./base-menu#initialize) as well as set up [focus (inherited)](./base-menu#method--handlefocus), [click](#method--handleclick), [hover (inherited)](./base-menu#method--handlehover), [keydown](#method--handlekeydown), and [keyup](#method--handlekeyup) events for the menu.

If the BaseMenu's initialize method throws an error,
this will catch it and log it to the console.

## Properties

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overwritten in the DisclosureMenu class.

### _MenuType <badge type="warning" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
DisclosureMenu._MenuType; // Default: `DisclosureMenu`.
```

#### Type {#property--menutype--type}

`Class`

### _MenuItemType <badge type="warning" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
DisclosureMenu._MenuItemType; // Default: `DisclosureMenuItem`.
```

#### Type {#property--menuitemtype--type}

`Class`

### _MenuToggleType <badge type="warning" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
DisclosureMenu._MenuToggleType; // Default: `DisclosureMenuToggle`.
```

#### Type {#property--menutoggletype--type}

`Class`

### _currentChild <badge type="warning" text="protected" /> {#property--currentchild}

The index of the currently selected [menu item](./disclosure-menu-item) in the menu.

```js
DisclosureMenu._currentChild; // Default: `-1`.
```

#### Type {#property--currentchild--type}

`number`

### _optionalSupport <badge type="warning" text="protected" /> {#property--optionalsupport}

A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.

```js
DisclosureMenu._optionalSupport; // Default: `false`.
```

#### Type {#property--optionalsupport--type}

`boolean`

## Getters and Setters

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overwritten in the DisclosureMenu class.

### optionalKeySupport {#getter-setter--optionalkeysupport}

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

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overwritten in the DisclosureMenu class.

### _validate <badge type="warning" text="protected" /> {#method--validate}

Validates all aspects of the menu to ensure proper functionality.

```js
DisclosureMenu._validate();
```

The validation method will call [BaseMenu's validation method](./base-menu#method--validate) as well as validate the optionalKeySupport property.

#### Returns {#method--validate--returns}

| Type | Description |
| --- | --- |
| `boolean` | The result of the validation. |

### _handleClick <badge type="warning" text="protected" /> {#method--handleclick}

Handles click events throughout the menu for proper use.

```js
DisclosureMenu._handleClick();
```

This method will do the following:

- Adds all event listeners listed in [BaseMenu's _handleClick method](./base-menu#method--handleclick).
- Adds a `pointerup` listener to the `document` so if the user clicks outside of the menu it will close if it is open.

### _handleKeydown <badge type="warning" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
DisclosureMenu._handleKeydown();
```

This method exists to assist the [_handleKeyup method](#method--handlekeyup).

This method will do the following:
- Adds all `keydown` listeners from [BaseMenu's _handleKeydown method](./base-menu#method--handlekeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
  - _If_ [optional keyboard support](#getter-setter--optionalkeysupport) is enabled, blocks propagation on the following keys: "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".

### _handleKeyup <badge type="warning" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
DisclosureMenu._handleKeyup();
```

Adds all `keyup` listeners from [BaseMenu's _handleKeyup method](./base-menu#method--handlekeyup).

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

The optional keybindings are controlled by the menu's [optionalKeySupport](#getter-setter--optionalkeysupport) value.
