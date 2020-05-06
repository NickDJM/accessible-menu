# MenuItem Class

The MenuItem class is used to hold some super basic functionality for menu items.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | BaseMenu | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | BaseMenu\|null | false | `null` |
| toggle | The controller for the child menu. | MenuToggle\|null | false | `null` |

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| dom | The DOM elements within the menu item. | object |
| elements | The elements within the menu item. | object |
| isSubmenuItem | A flag marking a submenu item. | boolean |

## Available methods

### initialize

Initializes the menu item by checking to see if the parentMenu is a [Menubar](menubar.md). If it is, the role of the list item is set to "none, the role of the link is set to "menuitem", and the link is removed from the tab index.

### focus

Focuses the menu's link if the triggering event wasn't a mouse event.

Will also set the link's tabindex to "0" is the parentMenu is a Menubar.

### blur

Blurs the menu's link if the triggering event wasn't a mouse event.

Will also set the link's tabindex to "-1" is the parentMenu is a Menubar.
