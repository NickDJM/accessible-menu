# TreeviewItem Class

The menu item class used in Treeviews.

Extends all functionality for the [BaseMenuItem](baseMenuItem.md) class.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | Treeview | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | Treeview\|null | false | `null` |
| toggle | The controller for the child menu. | TreeviewToggle\|null | false | `null` |
| initialize | A flag to initialize the menu item immediately upon creation. | boolean | false | `true` |

## Available getters

See [BaseMenuItem](baseMenuItem.md#available-getters) for a list of inherited getters.

## Available methods

See [BaseMenuItem](baseMenuItem.md#available-methods) for a list of inherited methods.

### Initialize

Initialize will be called immediately upon creation unless `initialize: false` is passed as a parameter to the menu item.

The initialize function will run [BaseMenuItem's initialize method](baseMenuItem.md#initialize).
