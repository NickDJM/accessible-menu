# Menubar Class

See [WAI ARIA Pracitices Navigation Menubar Example](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html) for a full explanation on what makes a menu a Menubar.

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
| parentMenu | The parent menu to this menu. | Menubar\|null | false | `null` |
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

The initialize function will run [BaseMenu's initialize method](baseMenu.md#initialize), as well as sets up the [focus](baseMenu.md#handleFocus), [click](baseMenu.md#handleClick), [hover](baseMenu.md#handleHover), [keydown](#handleKeydown), and [keyup](#handleKeyup) events through the menu.

This will also set the role of the menu element to "menubar", and ensure the first menu item is in the tab index.

Initalize will catch any validation errors thrown by the BaseMenu's initialize method.

### handleKeydown

Handles keydown events throughout the menu for proper menu use.

This method exists to assit the [handleKeyup](#handleKeyup) method.

- Adds all `keydown` listeners listed in [BaseMenu](baseMenu.md#handleKeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape", and "A" through "Z".
  - Completely closes the menu and moves focus out if the "Tab" key is pressed.

### handleKeyup

Handles keyup events throughout the menu for proper menu use.

Adds all `keyup` listeners listed in [BaseMenu](baseMenu.md#handleKeyup).

The following keybinding explanations are taken from the WAI ARIA Pracitices Navigation Menubar Example:

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

If the currently focussed child in the menu is the last child then this will focus the first child in the menu.

### focusPreviousChild

Focus the menu's last child.

If the currently focussed child in the menu is the first child then this will focus the last child in the menu.

### focusNextChildWithCharacter

Focus the menu's next child starting with a specific letter.

#### focusNextChildWithCharacter Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| char | The character to look for. | string | true | `undefined` |
