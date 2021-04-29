# MenubarItem Class

The menu item class used in Menubars.

Extends all functionality for the [BaseMenuItem](baseMenuItem.md) class.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | Menubar | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | Menubar\|null | false | `null` |
| toggle | The controller for the child menu. | MenubarToggle\|null | false | `null` |

## Available getters

See [BaseMenuItem](baseMenuItem.md#available-getters) for a list of inherited getters.

## Available methods

See [BaseMenuItem](baseMenuItem.md#available-methods) for a list of inherited methods.

### initialize

The initialize function will run [BaseMenuItem's initialize](baseMenuItem.md#initialize), as well as sets up the proper roles and tabindexes for Menubars.

The menu item itself will be given a `role` of `"none"` and the item's link will be given a `role` of `"menuitem"` as well as having it's tabindex set to `-1`.

### focus

The focus function will run [BaseMenuItem's focus](baseMenuItem.md#focus), as well as setting the tabindex of the menu item's link to `0`.

### blur

The blur function will run [BaseMenuItem's blur](baseMenuItem.md#blur), as well as setting the tabindex of the menu item's link to `-1`.
