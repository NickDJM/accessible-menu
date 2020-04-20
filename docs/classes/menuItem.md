# MenuItem Class

A basic navigation link contained inside of a Menu.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| menuLinkElement | The menu item's link in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | The parent menu. | Menu | true | `undefined` |
| isSubmenuItem | A flag to mark if the menu item is controlling a submenu. | boolean | false | `false` |
| childMenu | The child menu. | Menu\|null | false | `null` |
| toggle | The controller for the child menu. | MenuToggle\|null | false | `null` |

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| element | The menu item element in the DOM. | HTMLElement |
| linkElement | The link element inside the menu item. | HTMLElement |
| parentMenu | The item's parent Menu. | Menu |
| childMenu | The item's child menu. | Menu|null |
| toggle | The item's toggle. | MenuToggle|null |
| isSubmenuItem | A flag marking a submenu item. | boolean |

## Available methods

| Method | Description |
| --- | --- |
| focus | Focuses the menu item's link and set proper tabIndex. |
| blur | Blurs the menu item's link and set proper tabIndex. |
