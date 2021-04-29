# BaseMenuItem Class

The BaseMenuItem class holds all of the universal menu item properties and functions. It is not intended to be used by itself in the DOM-- use [DisclosureMenuItem](disclosureMenuItem.md) or [MenubarItem](menubarItem.md) instead.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | BaseMenu | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | BaseMenu\|null | false | `null` |
| toggle | The controller for the child menu. | BaseMenuToggle\|null | false | `null` |

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| dom | The DOM elements within the menu item. | object |
| elements | The elements within the menu item. | object |
| isSubmenuItem | A flag marking a submenu item. | boolean |

## Available methods

### initialize

Placeholder method for subclasses.

### focus

Focuses the menu's link if the triggering event wasn't a mouse event.

Will also set the link's tabindex to "0" is the parentMenu is a Menubar.

### blur

Blurs the menu's link if the triggering event wasn't a mouse event.

Will also set the link's tabindex to "-1" is the parentMenu is a Menubar.
