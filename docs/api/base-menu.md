# BaseMenu

An accessible navigation element in the DOM.

This is intended to be used as a "base" to other menus and not to be used on
it's own in the DOM.

## Constructor

Constructs a new `BaseMenu`.

```js
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
  transitionDuration,
  openDuration,
  closeDuration,
  isTopLevel,
  parentMenu,
  hoverType,
  hoverDelay,
  enterDelay,
  leaveDelay,
  prefix,
  key,
});
```

The constructor populates the dom, selector, CSS class, and hover related properties. It will _not_ initialize the menu automatically; this is left to the subclasses to evoke.

### Parameters {#constructor--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu. | `undefined` |
| options.menuElement | `HTMLElement` | The menu element in the DOM. | `undefined` |
| options.menuItemSelector | `string` | The query selector string for menu items. | `"li"` |
| options.menuLinkSelector | `string` | The query selector string for menu links. | `"a"` |
| options.submenuItemSelector | `string` | The query selector string for menu items containing submenus. | `li:has(ul)` |
| options.submenuToggleSelector | `string` | The query selector string for submenu toggle buttons/links. | `"a"` |
| options.submenuSelector | `string` | The query selector string for submenus. | `"ul"` |
| options.controllerElement | `HTMLElement`, `null` | The element controlling the menu in the DOM. | `null` |
| options.containerElement | `HTMLElement`, `null` | The element containing the menu in the DOM. | `null` |
| options.openClass | `string`, `string[]`, `null` | The class to apply when a menu is "open". | `"show"` |
| options.closeClass | `string`, `string[]`, `null` | The class to apply when a menu is "closed". | `"hide"` |
| options.transitionClass | `string`, `string[]`, `null` | The class to apply when a menu is transitioning between "open" and "closed" states. | `transitioning` |
| options.transitionDuration | `number` | The duration of the transition between "open" and "closed" states (in milliseconds). | `250` |
| options.openDuration | `number` | The duration of the transition from "closed" to "open" states (in milliseconds). | `250` |
| options.closeDuration | `number` | The duration of the transition from "open" to "closed" states (in milliseconds). | `250` |
| options.isTopLevel | `boolean` | A flag to mark the root menu. | `false` |
| options.parentMenu | `BaseMenu`, `null` | The parent menu to this menu. | `null` |
| options.hoverType | `string` | The type of hoverability a menu has. | `"off"` |
| options.hoverDelay | `number` | The delay for opening and closing menus if the menu is hoverable (in milliseconds). | `250` |
| options.enterDelay | `number` | The delay for opening menus if the menu is hoverable (in milliseconds). | `-1` |
| options.leaveDelay | `number` | The delay for closing menus if the menu is hoverable (in milliseconds). | `-1` |
| options.prefix | `string`, `null` | The prefix for the CSS custom properties. | `"am-"` |
| options.key | `string`, `null` | The key used to generate IDs throughout the menu. | `null` |

## Initialize

Initializes the menu.

```js
BaseMenu.initialize();
```

The following steps will be taken to initialize the menu:

- [Validate](#validate) that the menu can initialize,
- Find the root menu of the menu tree if it isn't already set.
- Populate all DOM elements within the [dom](#property--dom).
- If the current menu is the root menu _and_ has a controller, initialize the controller.
- Populate the menu elements within the [elements](#property--elements).
- Set the transition duration custom prop for the menu.

## Properties

### _MenuType <badge type="warning" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
BaseMenu._MenuType; // Default: `BaseMenu`.
```

#### Type {#property--menutype--type}

`Class`

### _MenuItemType <badge type="warning" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
BaseMenu._MenuItemType; // Default: `BaseMenuItem`.
```

#### Type {#property--menuitemtype--type}

`Class`

### _MenuToggleType <badge type="warning" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
BaseMenu._MenuToggleType; // Default: `BaseMenuToggle`.
```

#### Type {#property--menutoggletype--type}

`Class`

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu.

```js
BaseMenu._dom;
```

#### Type {#property--dom--type}

`Object<HTMLElement, HTMLElement[]>`

#### Properties {#property--dom--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| menu | `HTMLElement` | The menu element. | `null` |
| menuItems | `HTMLElement[]` | An array of menu items. | `[]` |
| submenuItems | `HTMLElement[]` | An array of menu items that also contain submenu elements. | `[]` |
| submenuToggles | `HTMLElement[]` | An array of menu links that function as submenu toggles. | `[]` |
| submenus | `HTMLElement[]` | An array of submenu elements. | `[]` |
| controller | `HTMLElement` | The toggle for this menu. | `null` |
| container | `HTMLElement` | The container for this menu. | `null` |

### _selectors <badge type="warning" text="protected" /> {#property--selectors}

The query selectors used by the menu to populate the dom.

```js
BaseMenu._selectors;
```

#### Type {#property--selectors--type}

`Object<string>`

#### Properties {#property--selectors--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| menuItems | `string` | The query selector for menu items. | `""` |
| menuLinks | `string` | The query selector for menu links. | `""` |
| submenuItems | `string` | The query selector for menu items containing submenus. | `""` |
| submenuToggles | `string` | The query selector for menu links that function as submenu toggles. | `""` |
| submenus | `string` | The query selector for for submenus. | `""` |

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu.

```js
BaseMenu._elements;
```

#### Type {#property--elements--type}

`Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]`

#### Properties {#property--elements--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| menuItems | `BaseMenuItem[]` | An array of menu items. | `[]` |
| submenuToggles | `BaseMenuToggle[]` | An array of menu toggles. | `[]` |
| controller | `BaseMenuToggle`, `null` | A menu toggle that controls this menu. | `null` |
| parentMenu | `BaseMenu`, `null` | The parent menu. | `null` |
| rootMenu | `BaseMenu`, `null` | The root menu of the menu tree. | `null` |

### _classes <badge type="warning" text="protected" /> {#property--classes}

The classes to apply when the menu is in various states.

```js
BaseMenu._classes;
```

#### Type {#property--classes--type}

`Object<string, string[]>`

#### Properties {#property--classes--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| open | `string`, `string[]` | The class(es) to apply when the menu is open. | `"show"` |
| close | `string`, `string[]` | The class(es) to apply when the menu is closed. | `"hide"` |
| transition | `string`, `string[]` | The class(es) to apply when the menu is transitioning between states. | `"transitioning"` |

### _durations <badge type="warning" text="protected" /> {#property--durations}

The duration times (in milliseconds) for various menu transitions and events.

```js
BaseMenu._durations;
```

#### Type {#property--durations--type}

`Object<number>`

#### Properties {#property--durations--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| transition | `number` | The duration time (in milliseconds) for the transition between open and closed states. | `250` |
| open | `number` | The duration time (in milliseconds) for the transition from closed to open states. | `-1` |
| close | `number` | The duration time (in milliseconds) for the transition from open to closed states. | `-1` |
| hover | `number` | The delay time (in milliseconds) used for pointerenter/pointerleave events to take place. | `250` |
| enter | `number` | The delay time (in milliseconds) used for pointerenter events to take place. | `-1` |
| leave | `number` | The delay time (in milliseconds) used for pointerleave events to take place. | `-1` |

### _listeners <badge type="warning" text="protected" /> {#property--listeners}

Event listeners throughout the menu.

```js
BaseMenu._listeners; // Default: `[]`.
```

#### Type {#property--listeners--type}

`object[]`

### _root <badge type="warning" text="protected" /> {#property--root}

A flag marking the root menu.

```js
BaseMenu._root; // Default: `true`.
```

#### Type {#property--root--type}

`boolean`

### _currentChild <badge type="warning" text="protected" /> {#property--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

```js
BaseMenu._currentChild; // Default: `0`.
```

#### Type {#property--currentchild--type}

`number`

### _focusState <badge type="warning" text="protected" /> {#property--focusstate}

The current state of the menu's focus.

```js
BaseMenu._focusState; // Default: `"none"`.
```

Available states are: `"none"`, `"self"`, and `"child"`.

#### Type {#property--focusstate--type}

`string`

### _currentEvent <badge type="warning" text="protected" /> {#property--currentevent}

The last event triggered on the menu.

```js
BaseMenu._currentEvent; // Default: `"none"`.
```

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

#### Type {#property--currentevent--type}

`string`

### _hoverType <badge type="warning" text="protected" /> {#property--hovertype}

The type of hoverability for the menu.

```js
BaseMenu._hoverType; // Default: `"off"`.
```

Available types are: `"off"`, `"on"`, and `"dynamic"`.

You can read more about [supported hover types](../hover-types) in the docs.

#### Type {#property--hovertype--type}

`string`

### _prefix <badge type="warning" text="protected" /> {#property--prefix}

The prefix for the CSS custom properties.

```js
BaseMenu._prefix; // Default: `"am-"`.
```

### _hoverTimeout <badge type="warning" text="protected" /> {#property--hovertimeout}

A variable to hold the hover timeout function.

```js
BaseMenu._hoverTimeout; // Default: `null`.
```

#### Type {#property--hovertimeout--type}

`Function`

### _hasOpened <badge type="warning" text="protected" /> {#property--hasopened}

A flag to check if the menu can dynamically hover based on if a menu has been opened already.

```js
BaseMenu._hasOpened; // Default: `false`.
```

#### Type {#property--hasopened--type}

`boolean`

### _key <badge type="warning" text="protected" /> {#property--key}

The key used to generate IDs throughout the menu.

```js
BaseMenu._key; // Default: `""`.
```

#### Type {#property--key--type}

`string`

### _errors <badge type="warning" text="protected" /> {#property--errors}

An array of error messages generated by the menu.

```js
BaseMenu._errors; // Default: `[]`.
```

#### Type {#property--errors--type}

`string[]`

## Getters and Setters

### dom <badge type="warning" text="readonly" /> {#getter--dom}

The DOM elements within the menu.

::: code-group

```js [getter]
BaseMenu.dom;
```

:::

See [_dom](#property--dom) for more information.

### selectors <badge type="warning" text="readonly" /> {#getter--selectors}

The query selectors used by the menu to populate the [dom](#property--dom).

::: code-group

```js [getter]
BaseMenu.selectors;
```

:::

See [_selectors](#property--selectors) for more information.

### elements <badge type="warning" text="readonly" /> {#getter--elements}

The declared accessible-menu elements within the menu.

::: code-group

```js [getter]
BaseMenu.elements;
```

:::

See [_elements](#property--elements) for more information.

### classes <badge type="warning" text="readonly" /> {#getter--classes}

The classes to apply when the menu is in various states.

::: code-group

```js [getter]
BaseMenu.classes;
```

:::

See [_classes](#property--classes) for more information.

### durations <badge type="warning" text="readonly" /> {#getter--durations}

The duration times (in milliseconds) for various menu transitions and events.

::: code-group

```js [getter]
BaseMenu.durations;
```

:::

See [_durations](#property--durations) for more information.

### listeners <badge type="warning" text="readonly" /> {#getter--listeners}

The event listeners throughout the menu.

::: code-group

```js [getter]
BaseMenu.listeners;
```

:::

See [_listeners](#property--listeners) for more information.

### isTopLevel <badge type="warning" text="readonly" /> {#getter--istoplevel}

The flag marking the root menu.

::: code-group

```js [getter]
BaseMenu.isTopLevel;
```

:::

See [_root](#property--root) for more information.

### key <badge type="warning" text="readonly" /> {#getter--key}

The key used to generate IDs throughout the menu.

::: code-group
```js [getter]
BaseMenu.key;
```

:::

This functions differently for root vs. submenus.
Submenus will always inherit their parent menu's key suffixed with thier position.

See [_key](#property--key) for more information.

### openClass {#getter-setter--openclass}

The class(es) to apply when the menu is open.

::: code-group

```js [getter]
BaseMenu.openClass;
```

```js [setter]
BaseMenu.openClass = "show";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's open class(es).

See [_classes.open](#property--classes) for more information.

### closeClass {#getter-setter--closeclass}

The class(es) to apply when the menu is closed.

::: code-group

```js [getter]
BaseMenu.closeClass;
```

```js [setter]
BaseMenu.closeClass = "hide";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's close class(es).

See [_classes.close](#property--classes) for more information.

### transitionClass {#getter-setter--transitionclass}

The class(es) to apply when the menu is transitioning between open and closed.

::: code-group

```js [getter]
BaseMenu.transitionClass;
```

```js [setter]
BaseMenu.transitionClass = "transitioning";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's transition class(es).

See [_classes.transition](#property--classes) for more information.

### transitionDuration {#getter-setter--transitionduration}

The duration time (in milliseconds) for the transition between open and closed states.

::: code-group

```js [getter]
BaseMenu.transitionDuration;
```

```js [setter]
BaseMenu.transitionDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's transition duration.

Setting this value will also set the `--am-transition-duration` CSS custom property on the menu.

See [_durations.transition](#property--durations) for more information.

### openDuration {#getter-setter--openduration}

The duration time (in milliseconds) for the transition from closed to open states.

::: code-group

```js [getter]
BaseMenu.openDuration;
```

```js [setter]
BaseMenu.openDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's open duration.

Setting this value will also set the `--am-open-transition-duration` CSS custom property on the menu.

See [_durations.open](#property--durations) for more information.

### closeDuration {#getter-setter--closeduration}

The duration time (in milliseconds) for the transition from open to closed states.

::: code-group

```js [getter]
BaseMenu.closeDuration;
```

```js [setter]
BaseMenu.closeDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's close duration.

Setting this value will also set the `--am-close-transition-duration` CSS custom property on the menu.

See [_durations.close](#property--durations) for more information.

### currentChild {#getter-setter--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

::: code-group

```js [getter]
BaseMenu.currentChild;
```

```js [setter]
BaseMenu.currentChild = 0;
```

:::

Attempting to set the current child to a value less than -1 will set the current child to -1.

Attempting to set the current child to a value greater than or equal to the number of menu items will set the current child to the index of the last menu item in the menu.

If the current menu has a parent menu _and_ the menu's [current event](#property--currentevent) is "mouse", The parent menu will have it's current child updated as well to help with transitioning between mouse and keyboard naviation.

See [_currentChild](#property--currentchild) for more information.

### focusState {#getter-setter--focusstate}

The current state of the menu's focus.

::: code-group

```js [getter]
BaseMenu.focusState;
```

```js [setter]
BaseMenu.focusState = "self";
```

:::

Available states are: `"none"`, `"self"`, and `"child"`.

If the menu has submenus, setting the focus state to "none" or "self" will update all child menus to have the focus state of "none".

If the menu has a parent menu, setting the focus state to "self" or "child" will update all parent menus to have the focus state of "child".

See [_focusState](#property--focusstate) for more information.

### currentEvent {#getter-setter--currentevent}

The last event triggered on the menu.

::: code-group

```js [getter]
BaseMenu.currentEvent;
```

```js [setter]
BaseMenu.currentEvent = "mouse";
```

:::

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

See [_currentEvent](#property--currentevent) for more information.

### currentMenuItem <badge type="warning" text="readonly" /> {#getter--currentmenuitem}

The currently selected menu item.

::: code-group

```js [getter]
BaseMenu.currentMenuItem;
```

:::

### hoverType {#getter-setter--hovertype}

The type of hoverability for the menu.

::: code-group

```js [getter]
BaseMenu.hoverType;
```

```js [setter]
BaseMenu.hoverType = "off";
```

:::

Available types are: `"off"`, `"on"`, and `"dynamic"`.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hoverability.

See [_hoverType](#property--hovertype) for more information.

### hoverDelay {#getter-setter--hoverdelay}

The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.

::: code-group

```js [getter]
BaseMenu.hoverDelay;
```

```js [setter]
BaseMenu.hoverDelay = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hover delay.

See [_durations.hover](#property--durations) for more information.

### enterDelay {#getter-setter--enterdelay}

The delay time (in milliseconds) used for pointerenter events to take place.

::: code-group

```js [getter]
BaseMenu.enterDelay;
```

```js [setter]
BaseMenu.enterDelay = 250;
```

:::

If enterDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's enter delay.

See [_durations.enter](#property--durations) for more information.

### leaveDelay {#getter-setter--leavedelay}

The delay time (in milliseconds) used for pointerleave events to take place.

::: code-group

```js [getter]
BaseMenu.leaveDelay;
```

```js [setter]
BaseMenu.leaveDelay = 250;
```

:::

If leaveDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's leave delay.

See [_durations.leave](#property--durations) for more information.

### prefix {#getter-setter--prefix}

The prefix for the CSS custom properties.

::: code-group

```js [getter]
BaseMenu.prefix;
```

```js [setter]
BaseMenu.prefix = "am-";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's prefix.

See [_prefix](#property--prefix) for more information.

### shouldFocus <badge type="warning" text="readonly" /> {#getter--shouldfocus}

A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

::: code-group

```js [getter]
BaseMenu.shouldFocus;
```

:::

This will be `false` unless any of the following criteria are met:

- The menu's [current event](#property--currentevent) is "keyboard".
- The menu's current event is "character".
- The menu's current event is "mouse" _and_ the menu's [hover type](#property--hovertype) is "dynamic".

### hasOpened {#getter-setter--hasopened}

A flag to check if the menu can dynamically hover.

::: code-group

```js [getter]
BaseMenu.hasOpened;
```

```js [setter]
BaseMenu.hasOpened = true;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hasOpened.

See [_hasOpened](#property--hasopened) for more information.

### errors <badge type="warning" text="readonly" /> {#getter--errors}

An array of error messages generated by the menu.

::: code-group

```js [getter]
BaseMenu.errors;
```

:::

See [_errors](#property--errors) for more information.

## Methods

### _validate <badge type="warning" text="protected" /> {#method--validate}

Validates all aspects of the menu to ensure proper functionality.

```js
BaseMenu._validate();
```

#### Returns {#method--validate--returns}

| Type | Description |
| --- | --- |
| `boolean` | The result of the validation. |

### _setDOMElementType <badge type="warning" text="protected" /> {#method--setdomelementtype}

Sets DOM elements within the menu.

```js
BaseMenu._setDOMElementType(elementType, base, overwrite);
```

Elements that are not stored inside an array cannot be set through this method.

#### Parameters {#method--setdomelementtype--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| elementType | `string` | The type of element to populate. | `undefined` |
| base | `HTMLElement` | The element used as the base for the querySelect. | `this.dom.menu` |
| overwrite | `boolean` | A flag to set if the existing elements will be overwritten. | `true` |

### _resetDOMElementType <badge type="warning" text="protected" /> {#method--resetdomelementtype}

Resets DOM elements within the menu.

```js
BaseMenu._resetDOMElementType(elementType);
```

Elements that are not stored inside an array cannot be reset through this method.

#### Parameters {#method--resetdomelementtype--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| elementType | `string` | The type of element to clear. | `undefined` |

### _setDOMElements <badge type="warning" text="protected" /> {#method--setdomelements}

Sets all DOM elements within the menu.

```js
BaseMenu._setDOMElements();
```

Utilizes [`_setDOMElementType`](#method--setdomelementtype) and [`_resetDOMElementType`](#method--resetdomelementtype).

### _generateKey <bade type="warning" text="protected" /> {#method--generatekey}

Generates a key for the menu.

```js
BaseMenu._generateKey(regenerate);
```

#### Parameters {#method--generatekey--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| regenerate | `boolean` | A flag to determine if the key should be regenerated. | `false` |

### _setIds <badge type="warning" text="protected" /> {#method--setids}

Sets the IDs of the menu and it's elements if they do not already exist.

```js
BaseMenu._setIds();
```

The generated IDs use the key and follow the format:

- menu: `menu-${key}`,
- container: `menu-container-${key}`,
- controller: `menu-controller-${key}`,

### _findRootMenu <badge type="warning" text="protected" /> {#method--findrootmenu}

Finds the root menu element.

```js
BaseMenu._findRootMenu(menu);
```

#### Parameters {#method--findrootmenu--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| menu | `BaseMenu` | The menu to check. | `undefined` |

### _createChildElements <badge type="warning" text="protected" /> {#method--createchildelements}

Creates and initializes all menu items and submenus.

```js
BaseMenu._createChildMenu();
```

### _clearTimeout <badge type="warning" text="protected" /> {#method--cleartimeout}

Clears the hover timeout.

```js
BaseMenu._clearTimeout();
```

### _setTimeout <badge type="warning" text="protected" /> {#method--settimeout}

Sets the hover timeout.

```js
BaseMenu._setTimeout(callback, delay);
```

#### Parameters {#method--settimeout--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| callback | `Function` | The callback function to execute. | `undefined` |
| delay | `number` | The delay time in milliseconds. | `undefined` |

### _handleFocus <badge type="warning" text="protected" /> {#method--handlefocus}

Handles focus events throughout the menu for proper menu use.

```js
BaseMenu._handleFocus();
```

- Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu's [focus state](#property--focusstate) to "self".
- Adds a `focusout` listener to the menu so when the menu loses focus, it will close.

### _handleClick {#method--handleclick}

Handles click events throughout the menu for proper use.

```js
BaseMenu._handleClick();
```

This method will do the following:

- Adds a `click` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
- Adds a `click` listener to every submenu item that will properly toggle the submenu open/closed.
- Adds a `click` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### _handleHover <badge type="warning" text="protected" /> {#method--handlehover}

Handles hover events throughout the menu for proper use.

```js
BaseMenu._handleHover();
```

Adds `pointerenter` listeners to all menu items and `pointerleave` listeners to all submenu items which function differently depending on the menu's [hover type](#property--hovertype).

Before executing anything, the event is checked to make sure the event wasn't triggered by a pen or touch.

This method will add the following behaviour:

#### Hover Type "on" {#method--handlehover--hovertype-on}

- When a `pointerenter` event triggers on any menu item the menu's [current child](#property--currentchild) value will change to that menu item.
- When a `pointerenter` event triggers on a submenu item the [preview method](./base-menu-toggle#method--preview) for the submenu item's toggle will be called.
- When a `pointerleave` event triggers on an open submenu item the [close method](./base-menu-toggle#method--close) for the submenu item's toggle will be called after a delay set by the menu's hover delay.

#### Hover Type "dynamic" {#method--handlehover--hovertype-dynamic}

- When a `pointerenter` event triggers on any menu item the menu's current child value will change to that menu item.
- When a `pointerenter` event triggers on any menu item, and the menu's [focus state](#property--focusstate) is not "none", the menu item will be focused.
- When a `pointerenter` event triggers on a submenu item, and a submenu is already open, the preview method for the submenu item's toggle will be called.
- When a `pointerenter` event triggers on a non-submenu item, and a submenu is already open, the closeChildren method for the menu will be called.
- When a `pointerenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
- When a `pointerleave` event triggers on an open submenu item that is not a root-level submenu item the close method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's hover delay.
- When a `pointerleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.

#### Hover Type "off" {#method--handlehover--hovertype-off}

All `pointerenter` and `pointerleave` events are ignored.

### _handleKeydown <badge type="warning" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
BaseMenu._handleKeydown();
```

This method exists to assist the [_handleKeyup](#method--handlekeyup) method.

This method will do the following:

- Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
  - Blocks propagation on "Space", "Enter", and "Escape" keys.

### _handleKeyup <badge type="warning" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
BaseMenu._handleKeyup();
```

This method will do the following:

- Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
  - Toggles the menu when the user hits "Space" or "Enter".

### _setTransitionDuration <badge type="warning" text="protected" /> {#method--settransitionduration}

Sets the transition duration of the menu as a CSS custom property.

```js
BaseMenu._setTransitionDuration();
```

The custom properties are:

- `--am-transition-duration`,
- `--am-open-transition-duration`, and
- `--am-close-transition-duration`.

The prefix of `am-` can be changed by setting the menu's prefix value.

### _addEventListener <badge type="warning" text="protected" /> {#method--addeventlistener}

Add an event listener to an element and register it within the menu.

```js
BaseMenu._addEventListener(type, element, listener, options);
```

#### Parameters {#method--addeventlistener--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| type | `string` | The event type to listen for. | `undefined` |
| element | `HTMLElement` | The element to add the listener to. | `undefined` |
| listener | `Function` | The listener callback. | `undefined` |
| options | `Object`, `boolean` | The options to pass to the listener. | `{}` |

### _removeEventListener <badge type="warning" text="protected" /> {#method--removeeventlistener}

Remove an event listener from an element and unregister it within the menu.

```js
BaseMenu._removeEventListener(type, element, listener, options);
```

#### Parameters {#method--removeeventlistener--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| type | `string` | The event type to remove. | `undefined` |
| element | `HTMLElement` | The element to remove the listener from. | `undefined` |
| listener | `Function` | The listener callback. | `undefined` |
| options | `Object`, `boolean` | The options that were passed to the listener. | `{}` |

### _removeEventListeners <badge type="warning" text="protected" /> {#method--removeeventlisteners}

Remove all event listeners registered in the menu.

```js
BaseMenu._removeEventListeners();
```

#### Parameters {#method--removeeventlisteners--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `Object` | The options for removing the listeners. | `{}` |
| options.type | `string`, `null` | The type of event to remove. If `null`, all types are removed. | `null` |
| options.element | `HTMLElement`, `null` | The element to remove listeners from. If `null`, all elements are removed. | `null` |

### focus <badge type="tip" text="public" /> {#method--focus}

Focus the menu.

```js
BaseMenu.focus();
```

Sets the menu's [focus state](#property--focusstate) to "self" and focusses the menu if the menu's [shouldFocus](#getter--shouldfocus) value is `true`.

### blur <badge type="tip" text="public" /> {#method--blur}

Unfocus the menu.

```js
BaseMenu.blur();
```

Sets the menu's focus state to "none" and blurs the menu if the menu's shouldFocus value is `true`.

### focusCurrentChild <badge type="tip" text="public" /> {#method--focuscurrentchild}

Focuses the menu's current child.

```js
BaseMenu.focusCurrentChild();
```

### focusChild <badge type="tip" text="public" /> {#method--focuschild}

Focuses the menu's child at a given index.

```js
BaseMenu.focusChild(index);
```

#### Parameters {#method--focuschild--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| index | `number` | The index of the child to focus. | `undefined` |

### focusFirstChild <badge type="tip" text="public" /> {#method--focusfirstchild}

Focus the menu's first child.

```js
BaseMenu.focusFirstChild();
```

### focusLastChild <badge type="tip" text="public" /> {#method--focuslastchild}

Focus the menu's last child.

```js
BaseMenu.focusLastChild();
```

### focusNextChild <badge type="tip" text="public" /> {#method--focusnextchild}

Focus the menu's next child.

```js
BaseMenu.focusNextChild();
```

### focusPreviousChild <badge type="tip" text="public" /> {#method--focuspreviouschild}

Focus the menu's previous child.

```js
BaseMenu.focusPreviousChild();
```

### blurCurrentChild <badge type="tip" text="public" /> {#method--blurcurrentchild}

Blurs the menu's current child.

```js
BaseMenu.blurCurrentChild();
```

### focusController <badge type="tip" text="public" /> {#method--focuscontroller}

Focus the menu's controller.

```js
BaseMenu.focusController();
```

### focusContainer <badge type="tip" text="public" /> {#method--focuscontainer}

Focus the menu's container.

```js
BaseMenu.focusContainer();
```

### closeChildren <badge type="tip" text="public" /> {#method--closechildren}

Close all submenu children.

```js
BaseMenu.closeChildren();
```

### blurChildren <badge type="tip" text="public" /> {#method--blurchildren}

Blurs all children and submenu's children.

```js
BaseMenu.blurChildren();
```
