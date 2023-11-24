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

The constructor populates the dom, selector, CSS class, and hover related properties. It will _not_ initialize the menu automatically; this is left to the subclasses to handle.

## Initialize

Initializes the menu.

```js
BaseMenu.initialize();
```

Initializing the menu will validate the menu, set the root menu element, populate the remaining dom elements, and create all child elements.

It will also create the root toggle element if one is provided through `controllerElement` and `containerElement`.

## Getters and Setters

### dom

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<HTMLElement, HTMLElement[]>}
 */
BaseMenu.dom;
```

:::

### selectors

The query selectors used by the menu to populate the dom.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<string>}
 */
BaseMenu.selectors;
```

:::

### elements

The declared accessible-menu elements within the menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
 */
BaseMenu.elements;
```

:::

### isTopLevel

The flag marking the root menu.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {boolean}
 */
BaseMenu.isTopLevel;
```

:::

### openClass

The class(es) to apply when the menu is open.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
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

### closeClass

The class(es) to apply when the menu is closed.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
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

### transitionClass

The class(es) to apply when the menu is transitioning between open and closed.

::: code-group

```js [getter]
/**
 * @type {string|string[]}
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

### currentChild

The index of the currently selected menu item in the menu.

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

If the current menu has a parent menu _and_ the menu's current event is "mouse", The parent menu will have it's current child updated as well to help with transitioning between mouse and keyboard naviation.

### focusState

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

### currentEvent

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

### currentMenuItem

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

### hoverType

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

### hoverDelay

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

### enterDelay

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

### leaveDelay

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

### shouldFocus

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

- The menu's current event is "keyboard".
- The menu's current event is "character".
- The menu's current event is "mouse" _and_ the menu's hover type is "dynamic".

### errors

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

### validate

Validates all aspects of the menu to ensure proper functionality.

```js
/**
 * Validates all aspects of the menu to ensure proper functionality.
 *
 * @protected
 *
 * @return {boolean} - The result of the validation.
 */
BaseMenu._validate();
```

### setDOMElementType

Sets DOM elements within the menu.

```js
/**
 * Sets DOM elements within the menu.
 *
 * @protected
 *
 * @param {string}      elementType            - The type of element to populate.
 * @param {HTMLElement} [base = this.dom.menu] - The element used as the base for the querySelect.
 * @param {boolean}     [overwrite = true]     - A flag to set if the existing elements will be overwritten.
 */
BaseMenu._setDOMElementType(elementType, base, overwrite);
```

Elements that are not stored inside an array cannot be set through this method.

### resetDOMElementType

Resets DOM elements within the menu.

```js
/**
 * Resets DOM elements within the menu.
 *
 * @protected
 *
 * @param {string} elementType - The type of element to clear.
 */
BaseMenu._resetDOMElementType(elementType);
```

Elements that are not stored inside an array cannot be reset through this method.

### setDOMElements

Sets all DOM elements within the menu.

```js
/**
  * Sets all DOM elements within the menu.
  *
  * @protected
  */
BaseMenu._setDOMElements();
```

Utilizes [`_setDOMElementType`](#setdomelementtype) and [`_resetDOMElementType`](#resetdomelementtype).

### findRootMenu

Finds the root menu element.

```js
/**
 * Finds the root menu element.
 *
 * @protected
 *
 * @param {BaseMenu} menu - The menu to check.
 */
BaseMenu._findRootMenu(menu);
```

### createChildMenu

Creates and initializes all menu items and submenus.

```js
/**
 * Creates and initializes all menu items and submenus.
 *
 * @protected
 */
BaseMenu._createChildMenu();
```

### handleFocus

Handles focus events throughout the menu for proper menu use.

```js
/**
 * Handles focus events throughout the menu for proper menu use.
 *
 * @protected
 */
BaseMenu._handleFocus();
```

Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu's {@link BaseMenu#focusState|focus state} to "self".

### handleClick

Handles click events throughout the menu for proper use.

```js
/**
 * Handles click events throughout the menu for proper use.
 *
 * @protected
 */
BaseMenu._handleClick();
```

Adds a `pointerdown` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.

Adds a `pointerup` listener to every submenu item that will properly toggle the submenu open/closed.

Adds a `pointerup` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### handleHover

Handles hover events throughout the menu for proper use.

```js
/**
 * Handles hover events throughout the menu for proper use.
 *
 * @protected
 */
BaseMenu._handleHover();
```

Adds `pointerenter` listeners to all menu items and `pointerleave` listeners to all submenu items which function differently depending on the menu's [hover type](../hover-types).

Before executing anything, the event is checked to make sure the event wasn't triggered by a pen or touch.

The method will add the following behaviour:

#### Hover Type "on"

- When a `pointerenter` event triggers on any menu item the menu's currentChild value will change to that menu item.
- When a `pointerenter` event triggers on a submenu item the preview method for the submenu item's toggle will be called.
- When a `pointerleave` event triggers on an open submenu item the close method for the submenu item's toggle will be called after a delay set by the menu's hover delay.

#### Hover Type "dynamic"

- When a `pointerenter` event triggers on any menu item the menu's current child value will change to that menu item.
- When a `pointerenter` event triggers on any menu item, and the menu's focus state is not "none", the menu item will be focused.
- When a `pointerenter` event triggers on a submenu item, and a submenu is already open, the preview method for the submenu item's toggle will be called.
- When a `pointerenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
- When a `pointerleave` event triggers on an open submenu item that is not a root-level submenu item the close method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's hover delay.
- When a `pointerleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.

#### Hover Type "off"

All `pointerenter` and `pointerleave` events are ignored.

### handleKeydown

Handles keydown events throughout the menu for proper menu use.

```js
/**
 * Handles keydown events throughout the menu for proper menu use.
 *
 * @protected
 */
BaseMenu._handleKeydown();
```

This method exists to assit the [_handleKeyup](#handlekeyup) method.

The method will do the following:

- Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
  - Blocks propagation on "Space", "Enter", and "Escape" keys.

### handleKeyup

Handles keyup events throughout the menu for proper menu use.

```js
/**
 * Handles keyup events throughout the menu for proper menu use.
 *
 * @protected
 */
BaseMenu._handleKeyup();
```

The method will do the following:

- Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
  - Toggles the menu when the user hits "Space" or "Enter".

### focus

Focus the menu.

```js
/**
 * Focus the menu.
 *
 * @public
 */
BaseMenu.focus();
```

Sets the menu's focus state to "self" and focusses the menu if the menu's shouldFocus value is `true`.

### blur

Unfocus the menu.

```js
/**
 * Unfocus the menu.
 *
 * @public
 */
BaseMenu.blur();
```

Sets the menu's focus state to "none" and blurs the menu if the menu's shouldFocus value is `true`.

### focusCurrentChild

Focuses the menu's current child.

```js
/**
 * Focuses the menu's current child.
 *
 * @public
 */
BaseMenu.focusCurrentChild();
```

### focusChild

Focuses the menu's child at a given index.

```js
/**
 * Focuses the menu's child at a given index.
 *
 * @public
 *
 * @param {number} index - The index of the child to focus.
 */
BaseMenu.focusChild(index);
```

### focusFirstChild

Focus the menu's first child.

```js
/**
 * Focus the menu's first child.
 *
 * @public
 */
BaseMenu.focusFirstChild();
```


### focusLastChild

Focus the menu's last child.

```js
/**
 * Focus the menu's last child.
 *
 * @public
 */
BaseMenu.focusLastChild();
```

### focusNextChild

Focus the menu's next child.

```js
/**
 * Focus the menu's next child.
 *
 * @public
 */
BaseMenu.focusNextChild();
```

### focusPreviousChild

Focus the menu's previous child.

```js
/**
 * Focus the menu's previous child.
 *
 * @public
 */
BaseMenu.focusPreviousChild();
```

### blurCurrentChild

Blurs the menu's current child.

```js
/**
 * Blurs the menu's current child.
 *
 * @public
 */
BaseMenu.blurCurrentChild();
```

### focusController

Focus the menu's controller.

```js
/**
 * Focus the menu's controller.
 *
 * @public
 */
BaseMenu.focusController();
```

### focusContainer

Focus the menu's container.

```js
/**
 * Focus the menu's container.
 *
 * @public
 */
BaseMenu.focusContainer();
```

### closeChildren

Close all submenu children.

```js
/**
 * Close all submenu children.
 *
 * @public
 */
BaseMenu.closeChildren();
```

### blurChildren

Blurs all children and submenu's children.

```js
/**
 * Blurs all children and submenu's children.
 *
 * @public
 */
BaseMenu.blurChildren();
```
