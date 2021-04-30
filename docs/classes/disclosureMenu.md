# DisclosureMenu Class

See [WAI ARIA Pracitices Example Disclosure for Navigation Menus](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html) for a full explanation on what makes a menu a Disclosure Menu.

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
| parentMenu | The parent menu to this menu. | DisclosureMenu\|null | false | `null` |
| hoverType | The type of hoverability a menu has. | string | false | `"off"` |
| hoverDelay | The delay for closing menus if the menu is hoverable (in miliseconds). | number | false | `250` |

## Available Getters

See [BaseMenu](baseMenu.md#available-getters) for a list of inherited getters.

## Available Setters

See [BaseMenu](baseMenu.md#available-setters) for a list of inherited setters.

## Available Methods

See [BaseMenu](baseMenu.md#available-methods) for a list of inherited methods.

### Initialize

The initialize function will run [BaseMenu's initialize](baseMenu.md#initialize), as well as sets up the [focus](baseMenu.md#handleFocus), [click](baseMenu.md#handleClick), [hover](baseMenu.md#handleHover), [keydown](#handleKeydown), and [keyup](#handleKeyup) events through the menu.

Initalize will catch any validation errors thrown by the BaseMenu's initialize method.

### handleKeydown

Handles keydown events throughout the menu for proper menu use.

This method exists to assit the [handleKeyup](#handleKeyup) method.

- Adds all `keydown` listeners listed in [BaseMenu](baseMenu.md#handleKeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", and "Escape".

### handleKeyup

Handles keyup events throughout the menu for proper menu use.

- Adds all `keyup` listeners listed in [BaseMenu](baseMenu.md#handleKeyup).

The following keybinding explanations are taken from the WAI ARIA Pracitices Example Disclosure for Navigation Menus:

| Key | Function |
| --- | --- |
| _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
| _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
| _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
| _Down Arrow_ or _Right Arrow_ (Optional) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
| _Up Arrow_ or _Left Arrow_ (Optional) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
| _Home_ (Optional) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
| _End_ (Optional) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
