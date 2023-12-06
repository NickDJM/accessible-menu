# Treeview

An accessible treeview navigation in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

Constructs a new `Treeview`.

```js
/**
 * @param {object}             options                                   - The options for generating the menu.
 * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
 * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
 * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
 * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
 * @param {string}             [options.submenuToggleSelector = a]       - The query selector string for submenu toggle buttons/links.
 * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
 * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
 * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
 * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
 * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
 * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
 * @param {boolean}            [options.isTopLevel = true]               - A flag to mark the root menu.
 * @param {?Treeview}          [options.parentMenu = null]               - The parent menu to this menu.
 * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
 * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
 * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
 * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
 * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
 */
new Treeview({
  menuElement,
  menuItemSelector,
  menuLinkSelector,
  submenuItemSelector,
  submenuToggleSelector,
  submenuSelector,
  controllerElement,
  containerElement,
  openClass,
  closeClass,
  transitionClass,
  isTopLevel,
  parentMenu,
  hoverType,
  hoverDelay,
  enterDelay,
  leaveDelay,
  initialize,
});
```

The constructor will call [BaseMenu's constructor](./base-menu#constructor) with the provided options. It will also initialize the menu if the initialize flag is set to `true`.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu. | `undefined` |
| options.menuElement | `HTMLElement` | The menu element in the DOM. | `undefined` |
| options.menuItemSelector | `string` | The query selector string for menu items. | `"li"` |
| options.menuLinkSelector | `string` | The query selector string for menu links. | `"a"` |
| options.submenuItemSelector | `string` | The query selector string for menu items containing submenus. | `undefined` |
| options.submenuToggleSelector | `string` | The query selector string for submenu toggle buttons/links. | `"a"` |
| options.submenuSelector | `string` | The query selector string for submenus. | `"ul"` |
| options.controllerElement | `HTMLElement`, `null` | The element controlling the menu in the DOM. | `null` |
| options.containerElement | `HTMLElement`, `null` | The element containing the menu in the DOM. | `null` |
| options.openClass | `string`, `string[]`, `null` | The class to apply when a menu is "open". | `null` |
| options.closeClass | `string`, `string[]`, `null` | The class to apply when a menu is "closed". | `null` |
| options.transitionClass | `string`, `string[]`, `null` | The class to apply when a menu is transitioning between "open" and "closed" states. | `null` |
| options.isTopLevel | `boolean` | A flag to mark the root menu. | `true` |
| options.parentMenu | `Treeview`, `null` | The parent menu to this menu. | `null` |
| options.hoverType | `string` | The type of hoverability a menu has. | `"off"` |
| options.hoverDelay | `number` | The delay for opening and closing menus if the menu is hoverable (in miliseconds). | `250` |
| options.enterDelay | `number` | The delay for opening a menu if the menu is focusable (in miliseconds). | `-1` |
| options.leaveDelay | `number` | The delay for closing a menu if the menu is focusable (in miliseconds). | `-1` |
| options.initialize | `boolean` | A flag to initialize the menu immediately upon creation. | `true` |

## Initialize

Initializes the menu.

```js
Treeview.initialize();
```

Initialize will call [BaseMenu's initialize method](./base-menu#initialize) as well as set up [focus (inherited)](./base-menu#method--handlefocus), [click (inherited)](./base-menu#method--handleclick), [hover (inherited)](./base-menu#method--handlehover), [keydown](#method--handlekeydown), and [keyup](#method--handlekeyup) events for the menu.

If the menu is a root menu it's `role` will be set to "tree" and the first
menu item's `tabIndex` will be set to 0 in the DOM.

If the menu is _not_ a root menu it's `role` will be set to "group".

If the BaseMenu's initialize method throws an error,
this will catch it and log it to the console.

## Properties

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overwritten in the Treeview class.

### _MenuType <Badge type="tip" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
/**
 * @protected
 *
 * @type {typeof Treeview}
 */
Treeview._MenuType; // Treeview.
```

### _MenuItemType <Badge type="tip" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
/**
 * @protected
 *
 * @type {typeof TreeviewItem}
 */
Treeview._MenuItemType; // TreeviewItem.
```

### _MenuToggleType <Badge type="tip" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
/**
 * @protected
 *
 * @type {typeof TreeviewToggle}
 */
Treeview._MenuToggleType; // TreeviewToggle.
```

## Getters and Setters

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overwritten in the Treeview class.

## Methods

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overwritten in the Treeview class.

### _handleKeydown <Badge type="tip" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
Treeview._handleKeydown();
```

This method exists to assist the [_handleKeyup method](#method--handlekeyup).

This method will do the following:

- Adds all `keydown` listeners from [BaseMenu's _handleKeydown method](./base-menu#method--handlekeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
    "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
    "*" (asterisk), and "A" through "Z".
  - Moves focus out if the "Tab" key is pressed.

### _handleKeyup <Badge type="tip" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
/**
 * @protected
 */
Treeview._handleKeyup();
```

Adds all `keyup` listeners from [BaseMenu's _handleKeyup method](./base-menu#method--handlekeyup).

Adds the following keybindings (explanations are taken from the [Navigation Treeview Example Using Computed Properties](https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/treeview/treeview-2/treeview-2a.html#kbd_label)):

| Key | Function |
| --- | --- |
| _Enter_ or _Space_ | Performs the default action (e.g. onclick event) for the focused node. |
| _Down arrow_ | <ul><li>Moves focus to the next node that is focusable without opening or closing a node.</li><li>If focus is on the last node, does nothing.</li></ul> |
| _Up arrow_ | <ul><li>Moves focus to the previous node that is focusable without opening or closing a node.</li><li>If focus is on the first node, does nothing.</li></ul> |
| _Right arrow_ | <ul><li>When focus is on a closed node, opens the node; focus does not move.</li><li>When focus is on a open node, moves focus to the first child node.</li><li>When focus is on an end node, does nothing.</li></ul> |
| _Left arrow_ | <ul><li>When focus is on an open node, closes the node.</li><li>When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.</li><li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li></ul> |
| _Home_ | Moves focus to first node without opening or closing a node. |
| _End_ | Moves focus to the last node that can be focused without expanding any nodes that are closed. |
| _a-z_, _A-Z_ | <ul><li>Focus moves to the next node with a name that starts with the typed character.</li><li>Search wraps to first node if a matching name is not found among the nodes that follow the focused node.</li><li>Search ignores nodes that are descendants of closed nodes.</li></ul> |
| _* (asterisk)_ | <ul><li>Expands all closed sibling nodes that are at the same level as the focused node.</li><li>Focus does not move.</li></ul> |
| _Escape_ | If the root menu is collapsible, collapses the menu and focuses the menu's controlling element. |

### focusLastNode {#method--focuslastnode}

Focus the menu's last node of the entire expanded menu.

```js
/**
 * @public
 */
Treeview.focusLastNode();
```

This includes all _open_ child menu items.

### openChildren {#method--openchildren}

Open all submenu children.

```js
/**
 * @public
 */
Treeview.openChildren();
```

### focusNextNodeWithCharacter {#method--focusnextnodewithcharacter}

Focus the menu's next node starting with a specific letter.

```js
/**
 * @public
 *
 * @param {string} char - The character to look for.
 */
Treeview.focusNextNodeWithCharacter(char);
```

This includes all _open_ child menu items.

Wraps to the first node if no match is found after the current node.

#### Parameters {#method--focusnextnodewithcharacter--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| char | `string` | The character to look for. | `undefined` |

### focusParentsNextChild {#method--focusparentsnextchild}

Focus the parent menu's next child.

```js
/**
 * @public
 */
Treeview.focusParentsNextChild();
```

This will cascade up through to the root menu.

### focusChildsLastNode {#method--focuschildslastnode}

Focus the last child of the current child's submenu.

```js
/**
 * @public
 */
Treeview.focusChildsLastNode();
```

This will cascade down through to the last open menu.
