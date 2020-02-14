# Menu Class

An accessible navigation element in the DOM.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuElement | The menu element in the DOM. | HTMLElement | true | `undefined`|
| menuItemSelector | The selector string for menu items. | string\|null | true | `undefined`|
| submenuItemSelector | The selector string for submenu items. | string\|null | false | `null`|
| submenuToggleSelector | The selector string for submenu toggle triggers. | string\|null | false | `null`|
| submenuSelector | The selector string for the submenu itself. | string | false | `null`|
| openClass | The class to use when a submenu is open. | string | false | `"show"`|
| isTopLevel | A flag to mark the root menu. | boolean | false | `true`|
| controllerElement | The element controlling the menu in the DOM. | HTMLElement\|null | false | `null`|
| containerElement | The element containing the menu in the DOM. | HTMLElement\|null | false | `null`|
| parentMenu | The menu containing this menu. | Menu\|null | false | `null`|

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| element | The menu element in the DOM. | HTMLElement |
| controllerElement | The menu's controller element in the DOM. | HTMLElement\|null |
| containerElement | The menu's container element in the DOM. | HTMLElement\|null |
| menuItemElements | The menu item DOM elements contained in the menu. | HTMLElement[] |
| submenuItemElements | The submenu item DOM elements contained in the menu. | HTMLElement[] |
| menuItems | The menu items contained in the menu. | MenuItem[] |
| menuToggles | The menu toggles contained in the menu. | MenuToggle[] |
| parentMenu | The parent menu containing this menu. | Menu\|null |
| rootMenu | The root menu containing this menu. | Menu\|null |
| controller | The menu's controller toggle. | MenuToggle |
| selector | The DOM Selectors for the menu. | object |
| currentFocus | The focus state of the menu. | string |
| openClass | The class used for open submenus. | string |
| currentMenuItem | The currently focussed menu item. | MenuItem |
| isTopLevel | A flag marking the root menu. | boolean |

## Available setters

| Setter | Description | Parameter | Type |
| --- | --- | --- | --- |
| currentFocus | Set the focus state of the menu. | value | string |
| openClass | Set the class used for open submenus. | value | string |

## Available methods

| Method | Description |
| --- | --- |
| initialize | Initializes the menu with proper tab indexing and properties. This will also initialize all menu items and sub menus. |
| findRootMenu[*](#findrootmenu) | Finds the root Menu element. |
| createMenuItems | Creates and initializes all menu items. |
| handleFoucs | Sets up focusin/focusout handling. |
| handleKeydown | Sets up the hijacked keydown events. |
| handleClick | Handle click events required for proper menu usage. |
| focus | Focus the menu. |
| blur | Unfocus the menu. |
| focusFirstChild | Focues the menu's first child. |
| focusLastChild | Focus the menu's last child. |
| focusNextChild | Focus the menu's next child. |
| focusPreviousChild | Focus the menu's last child. |
| focusCurrentChild | Focus the menu's current child. |
| focusNextChildWithCharacter[*](#focusnextchildwithcharacter) | Focus the menu's next child starting with a specific letter. |
| focusController | Focus the menu's controller. |
| focusContainer | Focus the menu's container. |
| closeChildren | Close all submenu children. |

### findRootMenu

| Parameter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menu | The menu to check. | Menu | true | `undefined` |

### focusNextChildWithCharacter

| Parameter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| char | The character to look for. | string | true | `undefined` |
