# BaseMenu Class

The BaseMenu class holds all of the universal menu properties and functions. It is not intended to be used by itself in the DOM-- use [Menubar](menubar.md) or [DisclosureMenu](disclosureMenu.md) instead.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuElement | The menu element in the DOM. | HTMLElement | true | `undefined` |
| menuItemSelector | The CSS selector string for menu items. | string | false | `"li"` |
| menuLinkSelector | The CSS selector string for menu links. | string | false | `"a"` |
| submenuItemSelector | The CSS selector string for menu items containing submenus. | string | false | `""` |
| submenuToggleSelector | The CSS selector string for submenu toggle buttons/links. | string | false | `"a"` |
| submenuSelector | The CSS selector string for submenus. | string | false | `"ul"` |
| controllerElement | The element controlling the menu in the DOM. | HTMLElement\|null | false | `null` |
| containerElement | The element containing the menu in the DOM. | HTMLElement\|null | false | `null` |
| openClass | The class to apply when a menu is "open". | string\|string[]\|null | false | `"show"` |
| closeClass | The class to apply when a menu is "closed". | string\|string[]\|null | false | `"hide"` |
| isTopLevel | A flag to mark the root menu. | boolean | false | `false` |
| parentMenu | The parent menu to this menu. | BaseMenu\|null | false | `null` |
| hoverType | The type of hoverability a menu has. | string | false | `"off"` |
| hoverDelay | The delay for closing menus if the menu is hoverable (in miliseconds). | number | false | `250` |

## Available Getters

| Getter |  Description | Type |
| --- | --- | --- |
| dom | The DOM elements within the menu. | object |
| selectors | The CSS selectors available to the menu. | object |
| elements | The elements within the menu. | object |
| openClass | <p>The class to apply when the menu is "open".</p><p>This functions differently for root vs. submenus. Submenus will always inherit their root menu's open class(es).</p> | string |
| closeClass | <p>The class to apply when the menu is "closed".</p><p>This functions differently for root vs. submenus. Submenus will always inherit their root menu's close class(es).</p> | string |
| isTopLevel | A flag marking the root menu. | boolean |
| currentChild | The index of the currently selected menu item in the menu. | number |
| focusState | The current state of the menu's focus. | string |
| currentEvent | This last event triggered on the menu. | string |
| currentMenuItem | The currently selected menu item. | BaseMenuItem |
| hoverType | The type of hoverability for the menu. | string |
| hoverDelay | The delay time (in miliseconds) used for mouseout events to take place. | number |
| shouldFocus | <p>A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.</p><p>Will return false unless any of the following criteria are met:</p><ul><li>The menu's `currentEvent` is `"keyboard"`.</li><li>The menu's `currentEvent` is `"character"`.</li><li>The menu's `currentEvent` is `"mouse"` _and_ the menu's `hoverType` is `"dynamic"`.</li></ul> | boolean |

## Available Setters

### openClass

Set the class to apply when the menu is "open".

#### openClass Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The class. | string | true | `undefined` |

### closeClass

Set the class to apply when the menu is "closed".

#### closeClass Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The class. | string | true | `undefined` |

### currentChild

Set the index currently selected menu item in the menu.

- Attempting to set a value less than -1 will set the `currentChild` to -1.
- Attempting to set a value greater than or equal to the number of menu items will set the `currentChild` to the number of menu items - 1.

If the current menu has a parent menu _and_ the menu's current event is "mouse", The parent menu will have it's current child updated as well to help with transitioning between mouse and keyboard naviation.

#### currentChild Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The index. | number | true | `undefined` |

### focusState

Set the state of the menu's focus.

Available states are "none", "self", and "child".

This is used for `keyup` and `keydown` events since some keybindings change depending on what level of menu the user is on.

#### focusState Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The state. | string | true | `undefined` |

### currentEvent

Set the last event triggered on the menu.

This is used mainly for controlling when the menu will take over forcing focus/blur on elements. When a mouse event is recorded, the menu will just let the browser control what is focussed and what isn't.

Available events are "keyboard", "mouse", and "character".

#### currentEvent Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The event type. | string | true | `undefined` |

### hoverType

Set the type of hoverability for the menu.

#### hoverType Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The hover type. | string | true | `undefined` |

### hoverDelay

Set the delay time (in miliseconds) used for mouseout events to take place.

#### hoverDelay Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The delay time. | number | true | `undefined` |

## Available Methods

### initialize

The initialize function will find the menu's [root menu](#findRootMenu), set up all of the [DOM elements](#setDOMElements) within itself, and create a [controller element](menuToggle.md) (if the information was provided, and the menu is the root menu).

Initialize also [validates](#validate) the menu's parameters before executing and will throw an uncaught error if the menu is invalid.

### validate

Validates all parameters given to the menu upon creation.

This is used during initalization to make sure all provided values are valid.

### setDOMElementType

Sets DOM elements within the menu.

This will set the actual `domElement` property, so all existing items in a given `domElement` property will be removed when this is run.

#### setDOMElementType Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to populate. | string | true | `undefined` |
| base | The element used as the base for the querySelect. | HTMLElement | false | The menu DOM element |
| filter | A filter to use to narrow down the DOM elements selected. | Function | false | A filter to find direct children |

### addDOMElementType

Adds an element to DOM elements within the menu.

This is an additive function, so existing items in a given `domElement` property will not be touched.

#### addDOMElementType Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to populate. | string | true | `undefined` |
| base | The element used as the base for the querySelect. | HTMLElement | false | The menu DOM element |
| filter | A filter to use to narrow down the DOM elements selected. | Function | false | A filter to find direct children |

### clearDOMElementType

Clears DOM elements within the menu.

#### clearDOMElementType Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to clear. | string | true | `undefined` |

### setDOMElements

Using [setDomElementType](#setDomElementType), [clearDOMElementType](#clearDOMElementType) and [addDOMElementType](#addDOMElementType), this function will query and set all of the required DOM elements within the menu.

### findRootMenu

Finds the root menu element by cascading through all parent menu items.

#### findRootMenu Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menu | The menu to check. | BaseMenu | true | `undefined` |

### createChildElements

Creates and initializes all menu items and submenus.

#### createChildElements Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| MenuType | The menu type for created submenus. | object | false | `BaseMenu` |

### handleFocus

Handles focus events throughout the menu for proper menu use.

- Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu to a "self" focus state, any parent menu to a "child" focus state, and any child menu to a "none" focus state.

### handleClick

Handles click events throughout the menu for proper use.

Depending on what is supported either `touchstart` and `touchend` or `mousedown` and `mouseup` will be used for all "click" event handling.

- Adds a `touchend`/`mouseup` listener to the document so if the user clicks outside of the menu when it is open, the menu will close.
- Adds a `touchstart`/`mousedown` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
- Adds a `touchend`/`mouseup` listener to every submenu item that will properly toggle the submenu open/closed.
- Adds a `touchend`/`mouseup` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### handleHover

Handles hover events throughout the menu for proper use.

Adds `mouseenter` listeners to all menu items and `mouseleave` listeners to all submenu items which function differently depending on the menu's `hoverType`.

#### Hover Type "on"

- When a `mouseenter` event triggers on _any_ menu item the menu's `currentChild` value will change to that menu item.
- When a `mouseenter` event triggers on a submenu item the `preview()` method for the submenu item's toggle will be called.
- When a `mouseleave` event triggers on an open submenu item the `close()` method for the submenu item's toggle will be called after a delay set by the menu's `hoverDelay`.

#### Hover Type "dynamic"

- When a `mouseenter` event triggers on _any_ menu item the menu's `currentChild` value will change to that menu item.
- When a `mouseenter` event triggers on _any_ menu item, _and_ the menu's `focusState` is not `"none"`, the menu item will be focused.
- When a `mouseenter` event triggers on a submenu item, _and_ a submenu is already open, the `preview()` method for the submenu item's toggle will be called.
- When a `mouseenter` event triggers on a submenu item, _and_ no submenu is open, no submenu-specific methods will be called.
- When a `mouseleave` event triggers on an open submenu item that _is not_ a root-level submenu item the `close()` method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's `hoverDelay`.
- When a `mouseleave` event triggers on an open submenu item that _is_ a root-level submenu item no submenu-specific methods will be called.

#### Hover Type "off"

All `mouseenter` and `mouseleave` events are ignored.

### handleKeydown

Handles keydown events throughout the menu for proper menu use.

This method exists to assit the [handleKeyup](#handleKeyup) method.

- Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
  - Blocks propagation on "Space", "Enter", and "Escape" keys.

### handleKeyup

Handles keyup events throughout the menu for proper menu use.

- Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
  - Opens the menu when the user hits "Space" or "Enter".

### focus

Sets the menu's focusState to "self" and focusses the menu if the triggering event was not a mouse event.

### blur

Sets the menu's focusState to "none" and blurs the menu if the triggering event was not a mouse event.

If the menu is the root menu and has a controller, it will also close the menu.

### focusCurrentChild

Focus the menu's current child.

### focusChild

Focuses the menu's child at a given index.

#### focusChild Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| index | The index of the child to focus. | number | true | `undefined` |

### focusFirstChild

Focues the menu's first child.

### focusLastChild

Focus the menu's last child.

### focusNextChild

Focus the menu's next child.

If the currently focussed child in the menu is the last child this method will do nothing.

### focusPreviousChild

Focus the menu's last child.

If the currently focussed child in the menu is the first child  this method will do nothing.

### blurCurrentChild

Blurs the menu's current child.

### focusController

Focus the menu's controller.

### focusContainer

Focus the menu's container.

### closeChildren

Close all submenu children.

### blurChildren

Blurs all children and submenu's children.
