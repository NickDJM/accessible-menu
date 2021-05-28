# Treeview Class

See [WAI ARIA Pracitices Navigation Treeview Example Using Computed Properties](https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2a.html) or [Navigation Treeview Example Using Declared Properties](https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2b.html) for a full explanation on what makes a menu a Treeview.

Extends all functionality for the [BaseMenu](baseMenu.md) class.

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
| parentMenu | The parent menu to this menu. | Treeview\|null | false | `null` |
| hoverType | The type of hoverability a menu has. | string | false | `"off"` |
| hoverDelay | The delay for closing menus if the menu is hoverable (in miliseconds). | number | false | `250` |
| initialize | A flag to initialize the menu immediately upon creation. | boolean | false | `true` |

## Available Getters

See [BaseMenu](baseMenu.md#available-getters) for a list of inherited getters.

## Available Setters

See [BaseMenu](baseMenu.md#available-setters) for a list of inherited setters.

## Available Methods

See [BaseMenu](baseMenu.md#available-methods) for a list of inherited methods.

### Initialize

Initialize will be called immediately upon creation unless `initialize: false` is passed as a parameter to the menu.

The initialize function will run [BaseMenu's initialize method](baseMenu.md#initialize).

Initalize will catch any validation errors thrown by the BaseMenu's initialize method.

### handleKeydown

Handles keydown events throughout the menu for proper menu use.

This method exists to assit the [handleKeyup](#handleKeyup) method.

- Adds all `keydown` listeners listed in [BaseMenu](baseMenu.md#handleKeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape", "*" (asterisk), and "A" through "Z".
  - Moves focus out if the "Tab" key is pressed.

### handleKeyup

Handles keyup events throughout the menu for proper menu use.

- Adds all `keyup` listeners listed in [BaseMenu](baseMenu.md#handleKeyup).

The following keybinding explanations are taken from the WAI ARIA Pracitices Navigation Treeview Example:

| Key | Function |
| --- | --- |
| _Enter_ or _Space_ | Performs the default action (e.g. onclick event) for the focused node. |
| _Down arrow_ | <ul><li>Moves focus to the next node that is focusable without opening or closing a node.</li><li>If focus is on the last node, does nothing.</li></ul> |
| _Up arrow_ | <ul><li>Moves focus to the previous node that is focusable without opening or closing a node.</li><li>If focus is on the first node, does nothing.</li></ul> |
| _Right arrow_ | <ul><li>When focus is on a closed node, opens the node; focus does not move.</li><li>When focus is on a open node, moves focus to the first child node.</li><li>When focus is on an end node, does nothing.</li></ul> |
| _Left arrow_ | <ul><li>When focus is on an open node, closes the node.</li><li>When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.</li><li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li></ul> |
| _Home_ | Moves focus to first node without opening or closing a node. |
| _End_ | Moves focus to the last node that can be focused without expanding any nodes that are closed. |
| _a-z_, _A-Z_ | <ul><li>Focus moves to the next node with a name that starts with the typed character.</li><li>Search wraps to first node if a matching name is not found among the nodes that follow the focused node.</li><li>Search ignores nodes that are descendants of closed nodes.</li></ul> |
| _* (asterisk)_ | <ul><li>Expands all closed sibling nodes that are at the same level as the focused node.</li><li>Focus does not move.</li></ul> |

### focusLastNode

Focus the menu's last node of the entire expanded menu.

This includes all _open_ child menu items.

### openChildren

Open all submenu children.
