# MenuItem Class

A basic navigation link contained inside of a Menu.

Must be initialized to be fully functional.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuItemElement | The menu item in the DOM. | HTMLElement | true | `undefined` |
| parentMenu | he parent menu. | Menu | true | `undefined` |

## Available getters

| Getter |  Description | Type |
| element | The menu item element in the DOM. | HTMLElement |
| link | The link element inside the menu item. | HTMLElement |
| parentMenu | The item's parent Menu. | Menu |

## Available methods

| Method | Description |
| --- | --- |
| focus | Focuses the menu item's link. |
