# DisclosureMenuItem Class

The menu item class used in Disclosure Menus.

Extends all functionality for the [BaseMenuItem](baseMenuItem.md) class.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | DisclosureMenu | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | DisclosureMenu\|null | false | `null` |
| toggle | The controller for the child menu. | DisclosureMenuToggle\|null | false | `null` |

## Available getters

See [BaseMenuItem](baseMenuItem.md#available-getters) for a list of inherited getters.

## Available methods

See [BaseMenuItem](baseMenuItem.md#available-methods) for a list of inherited methods.
