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
