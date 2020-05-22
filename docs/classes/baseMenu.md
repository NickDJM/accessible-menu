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
| isHoverable | A flag to allow hover events on the menu. | boolean | false | `false` |
| hoverDelay | The delay for closing menus if the menu is hoverable (in miliseconds). | number | false | `250` |

## Available Getters

| Getter |  Description | Type |
| --- | --- | --- |
| dom | The DOM elements within the menu. | object |
| selectors | The CSS selectors available to the menu. | object |
| elements | The elements within the menu. | object |
| openClass | The class to apply when the menu is "open". | string |
| closeClass | The class to apply when the menu is "closed". | string |
| isTopLevel | A flag marking the root menu. | boolean |
| currentChild | The index of the currently selected menu item in the menu. | number |
| focusState | The current state of the menu's focus. | string |
| currentEvent | This last event triggered on the menu. | string |
| currentMenuItem | The currently selected menu item. | MenuItem |
| isHoverable | A flag to allow hover events on the menu. | boolean |
| hoverDelay | The delay time (in miliseconds) used for mouseout events to take place. | number |

## Available Setters

### openClass
Set the class to apply when the menu is "open".

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The class. | string | true | `undefined` |

### closeClass
Set the class to apply when the menu is "closed".

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The class. | string | true | `undefined` |

### currentChild
Set the index currently selected menu item in the menu.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The index. | number | true | `undefined` |

### focusState
Set the state of the menu's focus.

Available states are "none", "self", and "child".

This is used for `keyup` and `keydown` events since some keybindings change depending on what level of menu the user is on.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The state. | string | true | `undefined` |

### currentEvent
Set the last event triggered on the menu.

This is used mainly for controlling when the menu will take over forcing focus/blur on elements. When a mouse event is recorded, the menu will just let the browser control what is focussed and what isn't.

Available events are "keyboard" and "mouse"

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The event type. | string | true | `undefined` |

### isHoverable
Set the flag to allow hover events on the menu.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The hoverable flag. | boolean | true | `undefined` |

### hoverDelay
Set the delay time (in miliseconds) used for mouseout events to take place.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The delay time. | number | true | `undefined` |

## Available Methods

### initialize
The initialize function will find the menu's [root menu](#findRootMenu), set up all of the [DOM elements](#setDOMElements) within itself, and create a [controller element](menuToggle.md) (if the information was provided, and the menu is the root menu).

### setDOMElementType
Sets DOM elements within the menu.

This will set the actual `domElement` property, so all existing items in a given `domElement` property will be removed when this is run.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to populate. | string | true | `undefined` |
| base | The element used as the base for the querySelect. | HTMLElement | false | The menu DOM element |
| filter | A filter to use to narrow down the DOM elements selected. | Function | false | A filter to find direct children |

### addDOMElementType
Adds an element to DOM elements within the menu.

This is an additive function, so existing items in a given `domElement` property will not be touched.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to populate. | string | true | `undefined` |
| base | The element used as the base for the querySelect. | HTMLElement | false | The menu DOM element |
| filter | A filter to use to narrow down the DOM elements selected. | Function | false | A filter to find direct children |

### clearDOMElementType
Clears DOM elements within the menu.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| elementType | The type of element to clear. | string | true | `undefined` |

### setDOMElements
Using [setDomElementType](#setDomElementType), [clearDOMElementType](#clearDOMElementType) and [addDOMElementType](#addDOMElementType), this function will query and set all of the required DOM elements within the menu.

### findRootMenu
Finds the root menu element by cascading through all parent menu items.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menu | The menu to check. | BaseMenu | true | `undefined` |

### createChildElements
Creates and initializes all menu items and submenus.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| MenuType | The menu type for created submenus. | object | false | `BaseMenu` |

### handleFocus
Handles focus events throughout the menu for proper menu use.

- Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu to a "self" focus state, any parent menu to a "child" focus state, and any child menu to a "none" focus state.

### handleClick
Handles click events throughout the menu for proper use.

- Adds a `click` listener to the document so if the user clicks outside of the menu when it is open, the menu will close.
- Adds a `click` listener to every submenu toggle so when they are clicked they will properly toggle open/closed.
- Adds a `click` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### handleHover
Handles hover events throughout the menu for proper use.

- Adds a `mouseenter` and `mouseleave` listener to all submenu toggles to they properly toggle open/closed when hovered over.

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

### focusFirstChild
Focues the menu's first child.

### focusLastChild
Focus the menu's last child.

### focusNextChild
Focus the menu's next child.

If the currently focussed child in the menu is the last child then this will focus the first child in the menu.

### focusPreviousChild
Focus the menu's last child.

If the currently focussed child in the menu is the first child then this will focus the last child in the menu.

### focusCurrentChild
Focus the menu's current child.

### blurCurrentChild
Blurs the menu's current child.

### focusNextChildWithCharacter
Focus the menu's next child starting with a specific letter.

#### Parameters
| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| char | The character to look for. | string | true | `undefined` |

### focusController
Focus the menu's controller.

### focusContainer
Focus the menu's container.

### closeChildren
Close all submenu children.

