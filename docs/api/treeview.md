# Treeview

An accessible treeview navigation in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

Constructs a new `Treeview`.

```js
new Treeview({
  menuElement,
  menuItemsSelector,
  menuLinksSelector,
  submenuItemsSelector,
  submenuTogglesSelector,
  submenuSubtogglesSelector,
  submenuTriggersSelector,
  submenusSelector,
  controllerElement,
  containerElement,
  expandClass,
  collapseClass,
  transitionClass,
  transitionDuration,
  expandDuration,
  collapseDuration,
  isTopLevel,
  parentMenu,
  hoverType,
  hoverDelay,
  enterDelay,
  leaveDelay,
  breakpoint,
  mediaQuery,
  expandInsideBreakpoint,
  expandOutsideBreakpoint,
  collapseInsideBreakpoint,
  collapseOutsideBreakpoint,
  lockInsideBreakpoint,
  lockOutsideBreakpoint,
  unlockInsideBreakpoint,
  unlockOutsideBreakpoint,
  prefix,
  key,
  initialize,
});
```

The constructor will call [BaseMenu's constructor](./base-menu#constructor) with the provided options. It will also initialize the menu if the initialize flag is set to `true`.

### Parameters {#constructor--parameters}

| Name                              | Type                         | Description                                                                                          | Default           |
| --------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| options                           | `object`                     | The options for generating the menu.                                                                 | `undefined`       |
| options.menuElement               | `HTMLElement`                | The menu element in the DOM.                                                                         | `undefined`       |
| options.menuItemsSelector         | `string`                     | The query selector string for menu items.                                                            | `"li"`            |
| options.menuLinksSelector         | `string`                     | The query selector string for menu links.                                                            | `"a"`             |
| options.submenuItemsSelector      | `string`                     | The query selector string for menu items containing submenus.                                        | `li:has(ul)`      |
| options.submenuTogglesSelector    | `string`                     | The query selector string for submenu toggle buttons/links.                                          | `"a"`             |
| options.submenuSubtogglesSelector | `?string`                    | The query selector for submenu toggles below the top level. If null, submenuTogglesSelector is used. | `null`            |
| options.submenuTriggersSelector   | `?string`                    | Selects a trigger inside each submenu toggle. Empty or null uses the toggle.                         | `null`            |
| options.submenusSelector          | `string`                     | The query selector string for submenus.                                                              | `"ul"`            |
| options.controllerElement         | `HTMLElement`, `null`        | The element controlling the menu in the DOM.                                                         | `null`            |
| options.containerElement          | `HTMLElement`, `null`        | The element containing the menu in the DOM.                                                          | `null`            |
| options.initializeClass           | `string`, `string[]`, `null` | The class(es) to apply when the menu is initializing.                                                | `"initializing"`  |
| options.expandClass               | `string`, `string[]`, `null` | The class to apply when a menu is expanded.                                                          | `"show"`          |
| options.collapseClass             | `string`, `string[]`, `null` | The class to apply when a menu is collapsed.                                                         | `"hide"`          |
| options.transitionClass           | `string`, `string[]`, `null` | The class to apply when a menu is transitioning between expanded and collapsed states.               | `"transitioning"` |
| options.transitionDuration        | `number`                     | The duration of the transition between expanded and collapsed states (in milliseconds).              | `250`             |
| options.expandDuration            | `number`                     | The duration of the transition from collapsed to expanded states (in milliseconds).                  | `-1`              |
| options.collapseDuration          | `number`                     | The duration of the transition from expanded to collapsed states (in milliseconds).                  | `-1`              |
| options.isTopLevel                | `boolean`                    | A flag to mark the root menu.                                                                        | `true`            |
| options.parentMenu                | `Treeview`, `null`           | The parent menu to this menu.                                                                        | `null`            |
| options.hoverType                 | `string`                     | The type of hoverability a menu has.                                                                 | `"off"`           |
| options.hoverDelay                | `number`                     | The delay for expanding and collapsing menus if the menu is hoverable (in milliseconds).             | `250`             |
| options.enterDelay                | `number`                     | The delay for expanding a menu if the menu is hoverable (in milliseconds).                           | `-1`              |
| options.leaveDelay                | `number`                     | The delay for collapsing a menu if the menu is hoverable (in milliseconds).                          | `-1`              |
| options.breakpoint                | `string`                     | The breakpoint used to generate the root controller's media query.                                   | `""`              |
| options.mediaQuery                | `string`                     | The media query used to trigger the root controller's media query list events.                       | `""`              |
| options.expandInsideBreakpoint    | `boolean`                    | A flag to expand the menu when the media query matches.                                              | `false`           |
| options.expandOutsideBreakpoint   | `boolean`                    | A flag to expand the menu when the media query does not match.                                       | `false`           |
| options.collapseInsideBreakpoint  | `boolean`                    | A flag to collapse the menu when the media query matches.                                            | `false`           |
| options.collapseOutsideBreakpoint | `boolean`                    | A flag to collapse the menu when the media query does not match.                                     | `false`           |
| options.lockInsideBreakpoint      | `boolean`                    | A flag to lock the root controller when the media query matches.                                     | `false`           |
| options.lockOutsideBreakpoint     | `boolean`                    | A flag to lock the root controller when the media query does not match.                              | `false`           |
| options.unlockInsideBreakpoint    | `boolean`                    | A flag to unlock the root controller when the media query matches.                                   | `false`           |
| options.unlockOutsideBreakpoint   | `boolean`                    | A flag to unlock the root controller when the media query does not match.                            | `false`           |
| options.prefix                    | `string`, `null`             | The prefix for the CSS custom properties.                                                            | `"am-"`           |
| options.key                       | `string`, `null`             | The key used to generate IDs throughout the menu.                                                    | `null`            |
| options.initialize                | `boolean`                    | A flag to initialize the menu immediately upon creation.                                             | `true`            |

## Initialize

Initializes the menu.

```js
Treeview.initialize();
```

Initialize will call [BaseMenu's initialize method](./base-menu#initialize) as well as set up [focus (inherited)](./base-menu#method--handlefocus), [click (inherited)](./base-menu#method--handleclick), [hover (inherited)](./base-menu#method--handlehover), [keydown](#method--handlekeydown), and [keyup](#method--handlekeyup) events for the menu.

If the menu is a root menu its `role` will be set to "tree" and the first menu item's `tabIndex` will be set to 0 in the DOM if the menu has any items.

If the menu is _not_ a root menu its `role` will be set to "group".

Core handles initialization failures, sets `isValid` to `false`, and logs the error. Inspect `errors` for validation details.

## Properties

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overridden in the Treeview class.

### _collapseChildrenOnBlur <badge type="warning" text="protected" /> {#property--collapsechildrenonblur}

Keeps expanded branches available when keyboard focus leaves the tree. The current item remains in the tab sequence so focus can return to it.

```js
Treeview._collapseChildrenOnBlur; // Default: `false`.
```

#### Type {#property--collapsechildrenonblur--type}

`boolean`

### _collapseChildrenOnActivation <badge type="warning" text="protected" /> {#property--collapsechildrenonactivation}

Keeps expanded branches available after a navigation link is activated. See [BaseMenu's activation setting](./base-menu#property--collapsechildrenonactivation) for the shared click behavior.

```js
Treeview._collapseChildrenOnActivation; // Default: `false`.
```

#### Type {#property--collapsechildrenonactivation--type}

`boolean`

### _MenuType <badge type="warning" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
Treeview._MenuType; // Default: `Treeview`.
```

#### Type {#property--menutype--type}

`Class`

### _MenuItemType <badge type="warning" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
Treeview._MenuItemType; // Default: `TreeviewItem`.
```

#### Type {#property--menuitemtype--type}

`Class`

### _MenuToggleType <badge type="warning" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
Treeview._MenuToggleType; // Default: `TreeviewToggle`.
```

#### Type {#property--menutoggletype--type}

`Class`

## Getters and Setters

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overridden in the Treeview class.

## Methods

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overridden in the Treeview class.

### _handleHover <badge type="warning" text="protected" /> {#method--handlehover}

Handles hover events throughout the menu for proper use.

```js
Treeview._handleHover();
```

Uses the hover settings described in [BaseMenu's _handleHover method](./base-menu#method--handlehover). The following behavior is specific to Treeview.

#### Hover Type "on" {#method--handlehover--hovertype-on}

- When a `pointerenter` event triggers on a menu item's link, updates the menu's current child and focus state without moving keyboard focus.
- When the item has a submenu, calls its toggle's preview method after enterDelay.
- Leaving an item does not collapse its submenu.
- Leaving the root menu calls collapseChildren and blur after leaveDelay.

#### Hover Type "dynamic" {#method--handlehover--hovertype-dynamic}

- When a `pointerenter` event triggers on a menu item's link, updates the menu's current child.
- Updates the menu's focus state when it is a submenu or its focus state is not "none". Once dynamic hover is enabled, focus follows the hovered item.
- When the root menu's dynamicHoverEnabled value is `true`, previews the item's submenu after enterDelay.
- When dynamicHoverEnabled is `false`, hovering an item does not change selection, focus, or submenu state.
- Hovering an item without a submenu does not collapse other submenus. It cancels a pending hover timeout when enterDelay is greater than 0.
- Leaving an item or the root menu does not collapse submenus.

#### Hover Type "off" {#method--handlehover--hovertype-off}

All `pointerenter` and `pointerleave` events are ignored.

### _handleKeydown <badge type="warning" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
Treeview._handleKeydown();
```

Ignores keydown events using Ctrl, Alt, or Meta.

This method exists to assist the [_handleKeyup method](#method--handlekeyup).

This method will do the following:

- Adds all `keydown` listeners from [BaseMenu's _handleKeydown method](./base-menu#method--handlekeydown).
- Adds a `keydown` listener to the menu/all submenus.
  - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
    "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
    "*" (asterisk), and "A" through "Z".
  - Moves focus out if the "Tab" key is pressed.

### _handleKeyup <badge type="warning" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
Treeview._handleKeyup();
```

Ignores keyup events using Ctrl, Alt, or Meta.

Adds all `keyup` listeners from [BaseMenu's _handleKeyup method](./base-menu#method--handlekeyup).

Adds the following keybindings (explanations are taken from the [Navigation Treeview Example Using Computed Properties](https://www.w3.org/TR/2019/WD-wai-aria-practices-1.2-20191218/examples/treeview/treeview-2/treeview-2a.html#kbd_label)):

| Key                | Function                                                                                                                                                                                                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Enter_ or _Space_ | Performs the default action (e.g. onclick event) for the focused node.                                                                                                                                                                                                                         |
| _Down arrow_       | <ul><li>Moves focus to the next node that is focusable without opening or closing a node.</li><li>If focus is on the last node, does nothing.</li></ul>                                                                                                                                        |
| _Up arrow_         | <ul><li>Moves focus to the previous node that is focusable without opening or closing a node.</li><li>If focus is on the first node, does nothing.</li></ul>                                                                                                                                   |
| _Right arrow_      | <ul><li>When focus is on a closed node, opens the node; focus does not move.</li><li>When focus is on a open node, moves focus to the first child node.</li><li>When focus is on an end node, does nothing.</li></ul>                                                                          |
| _Left arrow_       | <ul><li>When focus is on an open node, closes the node.</li><li>When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.</li><li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li></ul> |
| _Home_             | Moves focus to first node without opening or closing a node.                                                                                                                                                                                                                                   |
| _End_              | Moves focus to the last node that can be focused without expanding any nodes that are closed.                                                                                                                                                                                                  |
| _a-z_, _A-Z_       | <ul><li>Focus moves to the next node with a name that starts with the typed character.</li><li>Search wraps to first node if a matching name is not found among the nodes that follow the focused node.</li><li>Search ignores nodes that are descendants of closed nodes.</li></ul>           |
| _\* (asterisk)_    | <ul><li>Expands all closed sibling nodes that are at the same level as the focused node.</li><li>Focus does not move.</li></ul>                                                                                                                                                                |
| _Escape_           | If the root menu is collapsible, collapses the menu and focuses the menu's controlling element.                                                                                                                                                                                                |

When a parent link has a separate expansion trigger, Enter and Space activate the link. When the link itself is the expansion trigger, these keys expand or collapse its branch.

### focusLastNode <badge type="tip" text="public" /> {#method--focuslastnode}

Focus the menu's last node of the entire expanded menu.

```js
Treeview.focusLastNode();
```

This includes all _expanded_ child menu items.

### expandChildren <badge type="tip" text="public" /> {#method--expandchildren}

Expand all submenu children.

```js
Treeview.expandChildren();
```

### focusNextNodeWithCharacter <badge type="tip" text="public" /> {#method--focusnextnodewithcharacter}

Focus the menu's next node starting with a specific letter.

```js
Treeview.focusNextNodeWithCharacter(char);
```

This includes all _expanded_ child menu items.

Wraps to the first node if no match is found after the current node.

#### Parameters {#method--focusnextnodewithcharacter--parameters}

| Name | Type     | Description                | Default     |
| ---- | -------- | -------------------------- | ----------- |
| char | `string` | The character to look for. | `undefined` |

### focusParentsNextChild <badge type="tip" text="public" /> {#method--focusparentsnextchild}

Focus the parent menu's next child.

```js
Treeview.focusParentsNextChild();
```

This will cascade up through to the root menu. If there is no next item, focus and the menu's focus state stay unchanged.

### focusChildsLastNode <badge type="tip" text="public" /> {#method--focuschildslastnode}

Focus the last child of the current child's submenu.

```js
Treeview.focusChildsLastNode();
```

This will cascade down through to the last expanded menu.

### _bootstrap

Registers the menu's initialization event listener.

If the menu is a root menu, its `role` will be set to "tree" and the first menu item's `tabIndex` will be set to 0 in the DOM.

If the menu is not a root menu, its `role` will be set to "group".

If the root menu has a controller, removes its `aria-owns` attribute.

## Responsive controller configuration

Uses [BaseMenu's responsive controller configuration](./base-menu#responsive-controller-configuration), including the steps for changing a query after initialization.
