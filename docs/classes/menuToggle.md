# MenuToggle Class

A link or button that controls the visibility of a menu.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuToggleElement | The toggle element in the DOM. | HTMLElement | true | `undefined` |
| parentElement | The element containing the menu. | HTMLElement | true | `undefined` |
| menu | The menu controlled by the this toggle. | Menu | true | `undefined` |
| openClass | The class to use when a submenu is open. | string | false | `"show"` |
| parentMenu | The menu containing the toggle. | Menu\|null | false | `null` |

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| element | The toggle element in the DOM. | HTMLElement |
| parentElement | The toggle's parent DOM element. | HTMLElement |
| menu | The menu controlled by the toggle. | Menu |
| parentMenu | The menu containing the toggle. | Menu |
| isOpen | The open state on the menu. | boolean |

## Available setters

| Setter | Description | Parameter | Type |
| --- | --- | --- | --- |
| isOpen | Set the open state on the menu. | value | boolean |

## Available methods

| Method | Description |
| --- | --- |
| expand | Expands the submenu. |
| open | Opens the submenu. |
| preview | Opens the submenu without focus entering it. |
| close | Closes the submenu. |
| toggle | Toggles the open state of the menu. |
| closeSiblings | Closes all sibling menus. |
| closeChildren | Closes all child menus. |
| handleClick | Handle click events required for proper menu usage. |
