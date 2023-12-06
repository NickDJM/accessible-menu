# BaseMenu

An accessible navigation element in the DOM.

This is intended to be used as a "base" to other menus and not to be used on
it's own in the DOM.

## Constructor

Constructs a new `BaseMenu`.

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

The constructor populates the dom, selector, CSS class, and hover related properties. It will _not_ initialize the menu automatically; this is left to the subclasses to envoke.

### Parameters {#constructor--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu. | `undefined` |
| options.menuElement | `HTMLElement` | The menu element in the DOM. | `undefined` |
| options.menuItemSelector | `string` | The query selector string for menu items. | `"li"` |
| options.menuLinkSelector | `string` | The query selector string for menu links. | `"a"` |
| options.submenuItemSelector | `string` | The query selector string for menu items containing submenus. | `undefined` |
| options.submenuToggleSelector | `string` | The query selector string for submenu toggle buttons/links. | `"a"` |
| options.submenuSelector | `string` | The query selector string for submenus. | `"ul"` |
| options.controllerElement | `HTMLElement` | The element controlling the menu in the DOM. | `null` |
| options.containerElement | `HTMLElement` | The element containing the menu in the DOM. | `null` |
| options.openClass | `string\|string[]` | The class to apply when a menu is "open". | `"show"` |
| options.closeClass | `string\|string[]` | The class to apply when a menu is "closed". | `"hide"` |
| options.transitionClass | `string\|string[]` | The class to apply when a menu is transitioning between "open" and "closed" states. | `transitioning` |
| options.isTopLevel | `boolean` | A flag to mark the root menu. | `false` |
| options.parentMenu | `BaseMenu` | The parent menu to this menu. | `null` |
| options.hoverType | `string` | The type of hoverability a menu has. | `"off"` |
| options.hoverDelay | `number` | The delay for opening and closing menus if the menu is hoverable (in miliseconds). | `250` |
| options.enterDelay | `number` | The delay for opening menus if the menu is hoverable (in miliseconds). | `-1` |
| options.leaveDelay | `number` | The delay for closing menus if the menu is hoverable (in miliseconds). | `-1` |

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

## Properties

### _MenuType <badge type="tip" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
/**
 * @protected
 *
 * @type {typeof BaseMenu}
 */
BaseMenu._MenuType; // BaseMenu.
```

### _MenuItemType <badge type="tip" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
/**
 * @protected
 *
 * @type {typeof BaseMenuItem}
 */
BaseMenu._MenuItemType; // BaseMenuItem.
```

### _MenuToggleType <badge type="tip" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
/**
 * @protected
 *
 * @type {typeof BaseMenuToggle}
 */
BaseMenu._MenuToggleType; // BaseMenuToggle.
```

### _dom <badge type="tip" text="protected" /> {#property--dom}

The DOM elements within the menu.

```js
/**
 * @protected
 *
 * @type {Object<HTMLElement, HTMLElement[]>}
 *
 * @property {HTMLElement}   menu           - The menu element.
 * @property {HTMLElement[]} menuItems      - An array of menu items.
 * @property {HTMLElement[]} submenuItems   - An array of menu items that also contain submenu elements.
 * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
 * @property {HTMLElement[]} submenus       - An array of submenu elements.
 * @property {HTMLElement}   controller     - The toggle for this menu.
 * @property {HTMLElement}   container      - The container for this menu.
 */
BaseMenu._dom;
```

### _selectors <badge type="tip" text="protected" /> {#property--selectors}

The query selectors used by the menu to populate the dom.

```js
/**
 * @protected
 *
 * @type {Object<string>}
 *
 * @property {string} menuItems      - The query selector for menu items.
 * @property {string} menuLinks      - The query selector for menu links.
 * @property {string} submenuItems   - The query selector for menu items containing submenus.
 * @property {string} submenuToggles - The query selector for menu links that function as submenu toggles.
 * @property {string} submenus       - The query selector for for submenus.
 */
BaseMenu._selectors;
```

### _elements <badge type="tip" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu.

```js
/**
 * @protected
 *
 * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
 *
 * @property {BaseMenuItem[]}   menuItems      - An array of menu items.
 * @property {BaseMenuToggle[]} submenuToggles - An array of menu toggles.
 * @property {?BaseMenuToggle}  controller     - A menu toggle that controls this menu.
 * @property {?BaseMenu}        parentMenu     - The parent menu.
 * @property {?BaseMenu}        rootMenu       - The root menu of the menu tree.
 */
BaseMenu._elements;
```

### _openClass <badge type="tip" text="protected" /> {#property--openclass}

The class(es) to apply when the menu is open.

```js
/**
 * @protected
 *
 * @type {string|string[]}
 */
BaseMenu._openClass; // "show".
```

### _closeClass <badge type="tip" text="protected" /> {#property--closeclass}

The class(es) to apply when the menu is closed.

```js
/**
 * @protected
 *
 * @type {string|string[]}
 */
BaseMenu._closeClass; // "hide".
```

### _transitionClass <badge type="tip" text="protected" /> {#property--transitionclass}

The class(es) to apply when the menu is transitioning between states.

```js
/**
 * @protected
 *
 * @type {string|string[]}
 */
BaseMenu._transitionClass; // "transitioning"
```

### _root <badge type="tip" text="protected" /> {#property--root}

A flag marking the root menu.

```js
/**
 * @protected
 *
 * @type {boolean}
 */
BaseMenu._root; // true.
```

### _currentChild <badge type="tip" text="protected" /> {#property--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

```js
/**
 * @protected
 *
 * @type {number}
 */
BaseMenu._currentChild; // 0.
```

### _focusState <badge type="tip" text="protected" /> {#property--focusstate}

The current state of the menu's focus.

```js
/**
 * @protected
 *
 * @type {string}
 */
BaseMenu._focusState; // "none".
```

Available states are: `"none"`, `"self"`, and `"child"`.

### _currentEvent <badge type="tip" text="protected" /> {#property--currentevent}

The last event triggered on the menu.

```js
/**
 * @protected
 *
 * @type {string}
 */
BaseMenu._currentEvent; // "none".
```

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

### _hoverType <badge type="tip" text="protected" /> {#property--hovertype}

The type of hoverability for the menu.

```js
/**
 * @protected
 *
 * @type {string}
 */
BaseMenu._hoverType; // "off".
```

Available types are: `"off"`, `"on"`, and `"dynamic"`.

You can read more about [supported hover types](../hover-types) in the docs.

### _hoverDelay <badge type="tip" text="protected" /> {#property--hoverdelay}

The delay time (in miliseconds) used for pointerenter/pointerleave events to take place.

```js
/**
 * @protected
 *
 * @type {number}
 */
BaseMenu._hoverDelay; // 250.
```

### _enterDelay <badge type="tip" text="protected" /> {#property--enterdelay}

The delay time (in miliseconds) used for pointerenter events to take place.

```js
/**
 * @protected
 *
 * @type {number}
 */
BaseMenu._enterDelay; // -1.
```

### _leaveDelay <badge type="tip" text="protected" /> {#property--leavedelay}

The delay time (in miliseconds) used for pointerleave events to take place.

```js
/**
 * @protected
 *
 * @type {number}
 */
BaseMenu._leaveDelay; // -1.
```

### _hoverTimeout <badge type="tip" text="protected" /> {#property--hovertimeout}

A variable to hold the hover timeout function.

```js
/**
 * @protected
 *
 * @type {?Function}
 */
BaseMenu._hoverTimeout; // null.
```

### _errors <badge type="tip" text="protected" /> {#property--errors}

An array of error messages generated by the menu.

```js
/**
 * @protected
 *
 * @type {string[]}
 */
BaseMenu._errors; // [].
```

## Getters and Setters

### dom {#getter--dom}

The DOM elements within the menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<HTMLElement, HTMLElement[]>}
 *
 * @see _dom
 */
BaseMenu.dom;
```

:::

### selectors {#getter--selectors}

The query selectors used by the menu to populate the [dom](#property--dom).

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<string>}
 *
 * @see _selectors
 */
BaseMenu.selectors;
```

:::

### elements {#getter--elements}

The declared accessible-menu elements within the menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
 *
 * @see _elements
 */
BaseMenu.elements;
```

:::

### isTopLevel {#getter--istoplevel}

The flag marking the root menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {boolean}
 *
 * @see _root
 */
BaseMenu.isTopLevel;
```

:::

### openClass {#getter-setter--openclass}

The class(es) to apply when the menu is open.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
 *
 * @see _openClass
 */
BaseMenu.openClass;
```

```js [setter]
/**
 * @type {string|string[]}
 */
BaseMenu.openClass = "show";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's open class(es).

### closeClass {#getter-setter--closeclass}

The class(es) to apply when the menu is closed.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
 *
 * @see _closeClass
 */
BaseMenu.closeClass;
```

```js [setter]
/**
 * @type {string|string[]}
 */
BaseMenu.closeClass = "hide";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's close class(es).

### transitionClass {#getter-setter--transitionclass}

The class(es) to apply when the menu is transitioning between open and closed.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
 *
 * @see _transitionClass
 */
BaseMenu.transitionClass;
```

```js [setter]
/**
 * @type {string|string[]}
 */
BaseMenu.transitionClass = "transitioning";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's transition class(es).

### currentChild {#getter-setter--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

::: code-group

```js [getter]
/**
 * @type {number}
 */
BaseMenu.currentChild;
```

```js [setter]
/**
 * @type {number}
 */
BaseMenu.currentChild = 0;
```

:::

Attempting to set the current child to a value less than -1 will set the current child to -1.

Attempting to set the current child to a value greater than or equal to the number of menu items will set the current child to the index of the last menu item in the menu.

If the current menu has a parent menu _and_ the menu's [current event](#property--currentevent) is "mouse", The parent menu will have it's current child updated as well to help with transitioning between mouse and keyboard naviation.

### focusState {#getter-setter--focusstate}

The current state of the menu's focus.

::: code-group

```js [getter]
/**
 * @type {string}
 */
BaseMenu.focusState;
```

```js [setter]
/**
 * @type {string}
 */
BaseMenu.focusState = "self";
```

:::

Available states are: `"none"`, `"self"`, and `"child"`.

If the menu has submenus, setting the focus state to "none" or "self" will update all child menus to have the focus state of "none".

If the menu has a parent menu, setting the focus state to "self" or "child" will update all parent menus to have the focus state of "child".

### currentEvent {#getter-setter--currentevent}

The last event triggered on the menu.

::: code-group

```js [getter]
/**
 * @type {string}
 */
BaseMenu.currentEvent;
```

```js [setter]
/**
 * @type {string}
 */
BaseMenu.currentEvent = "mouse";
```

:::

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

### currentMenuItem {#getter--currentmenuitem}

The currently selected menu item.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {BaseMenuItem}
 */
BaseMenu.currentMenuItem;
```

:::

### hoverType {#getter-setter--hovertype}

The type of hoverability for the menu.

::: code-group

```js [getter]
/**
 * @type {string}
 */
BaseMenu.hoverType;
```

```js [setter]
/**
 * @type {string}
 */
BaseMenu.hoverType = "off";
```

:::

Available types are: `"off"`, `"on"`, and `"dynamic"`.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hoverability.

You can read more about [supported hover types](../hover-types) in the docs.

### hoverDelay {#getter-setter--hoverdelay}

The delay time (in miliseconds) used for pointerenter/pointerleave events to take place.

::: code-group

```js [getter]
/**
 * @type {number}
 */
BaseMenu.hoverDelay;
```

```js [setter]
/**
 * @type {number}
 */
BaseMenu.hoverDelay = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hover delay.

### enterDelay {#getter-setter--enterdelay}

The delay time (in miliseconds) used for pointerenter events to take place.

::: code-group

```js [getter]
/**
 * @type {number}
 */
BaseMenu.enterDelay;
```

```js [setter]
/**
 * @type {number}
 */
BaseMenu.enterDelay = 250;
```

:::

If enterDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's enter delay.

### leaveDelay {#getter-setter--leavedelay}

The delay time (in miliseconds) used for pointerleave events to take place.

::: code-group

```js [getter]
/**
 * @type {number}
 */
BaseMenu.leaveDelay;
```

```js [setter]
/**
 * @type {number}
 */
BaseMenu.leaveDelay = 250;
```

:::

If leaveDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's leave delay.

### shouldFocus {#getter--shouldfocus}

A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {boolean}
 */
BaseMenu.shouldFocus;
```

:::

This will be `false` unless any of the following criteria are met:

- The menu's [current event](#property--currentevent) is "keyboard".
- The menu's current event is "character".
- The menu's current event is "mouse" _and_ the menu's [hover type](#property--hovertype) is "dynamic".

### errors {#getter--errors}

An array of error messages generated by the menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {string[]}
 */
BaseMenu.errors;
```

:::

## Methods

### _validate <badge type="tip" text="protected" /> {#method--validate}

Validates all aspects of the menu to ensure proper functionality.

```js
/**
 * @protected
 *
 * @return {boolean} - The result of the validation.
 */
BaseMenu._validate();
```

### _setDOMElementType <badge type="tip" text="protected" /> {#method--setdomelementtype}

Sets DOM elements within the menu.

```js
/**
 * @protected
 *
 * @param {string}      elementType            - The type of element to populate.
 * @param {HTMLElement} [base = this.dom.menu] - The element used as the base for the querySelect.
 * @param {boolean}     [overwrite = true]     - A flag to set if the existing elements will be overwritten.
 */
BaseMenu._setDOMElementType(elementType, base, overwrite);
```

Elements that are not stored inside an array cannot be set through this method.

#### Parameters {#method--setdomelementtype--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| elementType | `string` | The type of element to populate. | `undefined` |
| base | `HTMLElement` | The element used as the base for the querySelect. | `this.dom.menu` |
| overwrite | `boolean` | A flag to set if the existing elements will be overwritten. | `true` |

### _resetDOMElementType <badge type="tip" text="protected" /> {#method--resetdomelementtype}

Resets DOM elements within the menu.

```js
/**
 * @protected
 *
 * @param {string} elementType - The type of element to clear.
 */
BaseMenu._resetDOMElementType(elementType);
```

Elements that are not stored inside an array cannot be reset through this method.

#### Parameters {#method--resetdomelementtype--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| elementType | `string` | The type of element to clear. | `undefined` |

### _setDOMElements <badge type="tip" text="protected" /> {#method--setdomelements}

Sets all DOM elements within the menu.

```js
/**
 * @protected
 */
BaseMenu._setDOMElements();
```

Utilizes [`_setDOMElementType`](#method--setdomelementtype) and [`_resetDOMElementType`](#method--resetdomelementtype).

### _findRootMenu <badge type="tip" text="protected" /> {#method--findrootmenu}

Finds the root menu element.

```js
/**
 * @protected
 *
 * @param {BaseMenu} menu - The menu to check.
 */
BaseMenu._findRootMenu(menu);
```

#### Parameters {#method--findrootmenu--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| menu | `BaseMenu` | The menu to check. | `undefined` |

### _createChildElements <badge type="tip" text="protected" /> {#method--createchildelements}

Creates and initializes all menu items and submenus.

```js
/**
 * @protected
 */
BaseMenu._createChildMenu();
```

### _handleFocus <badge type="tip" text="protected" /> {#method--handlefocus}

Handles focus events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
BaseMenu._handleFocus();
```

Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu's [focus state](#property--focusstate) to "self".

### _handleClick {#method--handleclick}

Handles click events throughout the menu for proper use.

```js
/**
 * @protected
 */
BaseMenu._handleClick();
```

This method will do the following:

- Adds a `pointerdown` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
- Adds a `pointerup` listener to every submenu item that will properly toggle the submenu open/closed.
- Adds a `pointerup` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### _handleHover <badge type="tip" text="protected" /> {#method--handlehover}

Handles hover events throughout the menu for proper use.

```js
/**
 * @protected
 */
BaseMenu._handleHover();
```

Adds `pointerenter` listeners to all menu items and `pointerleave` listeners to all submenu items which function differently depending on the menu's [hover type](#property--hovertype).

Before executing anything, the event is checked to make sure the event wasn't triggered by a pen or touch.

This method will add the following behaviour:

#### Hover Type "on" {#method--handlefover--hovertype-on}

- When a `pointerenter` event triggers on any menu item the menu's [current child](#property--currentchild) value will change to that menu item.
- When a `pointerenter` event triggers on a submenu item the [preview method](./base-menu-toggle#method--preview) for the submenu item's toggle will be called.
- When a `pointerleave` event triggers on an open submenu item the [close method](./base-menu-toggle#method--close) for the submenu item's toggle will be called after a delay set by the menu's hover delay.

#### Hover Type "dynamic" {#method--handlefover--hovertype-dynamic}

- When a `pointerenter` event triggers on any menu item the menu's current child value will change to that menu item.
- When a `pointerenter` event triggers on any menu item, and the menu's [focus state](#property--focusstate) is not "none", the menu item will be focused.
- When a `pointerenter` event triggers on a submenu item, and a submenu is already open, the preview method for the submenu item's toggle will be called.
- When a `pointerenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
- When a `pointerleave` event triggers on an open submenu item that is not a root-level submenu item the close method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's hover delay.
- When a `pointerleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.

#### Hover Type "off" {#method--handlefover--hovertype-off}

All `pointerenter` and `pointerleave` events are ignored.

### _handleKeydown <badge type="tip" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
BaseMenu._handleKeydown();
```

This method exists to assit the [_handleKeyup](#method--handlekeyup) method.

This method will do the following:

- Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
  - Blocks propagation on "Space", "Enter", and "Escape" keys.

### _handleKeyup <badge type="tip" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
BaseMenu._handleKeyup();
```

This method will do the following:

- Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
  - Toggles the menu when the user hits "Space" or "Enter".

### focus {#method--focus}

Focus the menu.

```js
/**
 * @public
 */
BaseMenu.focus();
```

Sets the menu's [focus state](#property--focusstate) to "self" and focusses the menu if the menu's [shouldFocus](#getter--shouldfocus) value is `true`.

### blur {#method--blur}

Unfocus the menu.

```js
/**
 * @public
 */
BaseMenu.blur();
```

Sets the menu's focus state to "none" and blurs the menu if the menu's shouldFocus value is `true`.

### focusCurrentChild {#method--focuscurrentchild}

Focuses the menu's current child.

```js
/**
 * @public
 */
BaseMenu.focusCurrentChild();
```

### focusChild {#method--focuschild}

Focuses the menu's child at a given index.

```js
/**
 * @public
 *
 * @param {number} index - The index of the child to focus.
 */
BaseMenu.focusChild(index);
```

#### Parameters {#method--focuschild--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| index | `number` | The index of the child to focus. | `undefined` |

### focusFirstChild {#method--focusfirstchild}

Focus the menu's first child.

```js
/**
 * @public
 */
BaseMenu.focusFirstChild();
```

### focusLastChild {#method--focuslastchild}

Focus the menu's last child.

```js
/**
 * @public
 */
BaseMenu.focusLastChild();
```

### focusNextChild {#method--focusnextchild}

Focus the menu's next child.

```js
/**
 * @public
 */
BaseMenu.focusNextChild();
```

### focusPreviousChild {#method--focuspreviouschild}

Focus the menu's previous child.

```js
/**
 * @public
 */
BaseMenu.focusPreviousChild();
```

### blurCurrentChild {#method--blurcurrentchild}

Blurs the menu's current child.

```js
/**
 * @public
 */
BaseMenu.blurCurrentChild();
```

### focusController {#method--focuscontroller}

Focus the menu's controller.

```js
/**
 * @public
 */
BaseMenu.focusController();
```

### focusContainer {#method--focuscontainer}

Focus the menu's container.

```js
/**
 * @public
 */
BaseMenu.focusContainer();
```

### closeChildren {#method--closechildren}

Close all submenu children.

```js
/**
 * @public
 */
BaseMenu.closeChildren();
```

### blurChildren {#method--blurchildren}

Blurs all children and submenu's children.

```js
/**
 * @public
 */
BaseMenu.blurChildren();
```
