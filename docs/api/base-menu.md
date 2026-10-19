# BaseMenu

An accessible navigation element in the DOM.

This is intended to be used as a "base" to other menus and not to be used on
its own in the DOM.

## Constructor

Constructs a new `BaseMenu`.

```js
new BaseMenu({
  menuElement,
  menuItemsSelector,
  menuLinksSelector,
  submenuItemsSelector,
  submenuTogglesSelector,
  submenuSubtogglesSelector,
  submenusSelector,
  controllerElement,
  containerElement,
  initializeClass,
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
});
```

The constructor populates the dom, selector, CSS class, and hover related properties. It will _not_ initialize the menu automatically; subclasses decide when to initialize it.

### Subclass initialization {#constructor--subclass-initialization}

When extending a menu class, pass `initialize: false` to `super()` and call `this.initialize()` after your subclass fields and constructor setup are complete.

### Parameters {#constructor--parameters}

| Param                             | Type                         | Description                                                                                          | Default           |
| --------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------- |
| options                           | `object`                     | The options for generating the menu.                                                                 | `undefined`       |
| options.menuElement               | `HTMLElement`                | The menu element in the DOM.                                                                         | `undefined`       |
| options.menuItemsSelector         | `string`                     | The query selector string for menu items.                                                            | `"li"`            |
| options.menuLinksSelector         | `string`                     | The query selector string for menu links.                                                            | `"a"`             |
| options.submenuItemsSelector      | `string`                     | The query selector string for menu items containing submenus.                                        | `li:has(ul)`      |
| options.submenuTogglesSelector    | `string`                     | The query selector string for submenu toggle buttons/links.                                          | `"a"`             |
| options.submenuSubtogglesSelector | `?string`                    | The query selector for submenu toggles below the top level. If null, submenuTogglesSelector is used. | `null`            |
| options.submenusSelector          | `string`                     | The query selector string for submenus.                                                              | `"ul"`            |
| options.controllerElement         | `HTMLElement`, `null`        | The element controlling the menu in the DOM.                                                         | `null`            |
| options.containerElement          | `HTMLElement`, `null`        | The element containing the menu in the DOM.                                                          | `null`            |
| options.initializeClass           | `string`, `string[]`, `null` | The class(es) to apply when the menu is initializing.                                                | `"initializing"`  |
| options.expandClass               | `string`, `string[]`, `null` | The class(es) to apply when the menu is open.                                                        | `"show"`          |
| options.collapseClass             | `string`, `string[]`, `null` | The class(es) to apply when the menu is closed.                                                      | `"hide"`          |
| options.transitionClass           | `string`, `string[]`, `null` | The class(es) to apply when the menu is transitioning between open and closed states.                | `"transitioning"` |
| options.transitionDuration        | `number`                     | The duration of the transition between expanded and collapsed states (in milliseconds).              | `250`             |
| options.expandDuration            | `number`                     | The duration of the transition from collapsed to expanded states (in milliseconds).                  | `-1`              |
| options.collapseDuration          | `number`                     | The duration of the transition from expanded to collapsed states (in milliseconds).                  | `-1`              |
| options.isTopLevel                | `boolean`                    | A flag to mark the root menu.                                                                        | `true`            |
| options.parentMenu                | `BaseMenu`, `null`           | The parent menu to this menu.                                                                        | `null`            |
| options.hoverType                 | `string`                     | The type of hoverability a menu has.                                                                 | `"off"`           |
| options.hoverDelay                | `number`                     | The delay for opening and closing menus if the menu is hoverable (in milliseconds).                  | `250`             |
| options.enterDelay                | `number`                     | The delay for opening menus if the menu is hoverable (in milliseconds).                              | `-1`              |
| options.leaveDelay                | `number`                     | The delay for closing menus if the menu is hoverable (in milliseconds).                              | `-1`              |
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

## Initialize

Initializes the menu.

```js
BaseMenu.initialize();
```

Initialization is inherited from Core's `Component`:

1. Create the root controller without initializing it during `prevalidate`, then validate Core fields and dispatch Menu-specific validation listeners. The controller validates responsive settings.
2. Apply the initialization class and dispatch `preinitialize`, which finds the root menu.
3. Generate a key, populate DOM elements, assign IDs and ARIA relationships, and set CSS custom properties.
4. Initialize the root controller through `_createController()`, then create and initialize menu items, submenus, and their toggles.
5. Register focus, hover, click, keydown, and keyup handlers once.
6. Dispatch `initialize`, including subclass role/tabindex listeners.
7. Store root menus, remove the initialization class, mark the menu initialized, and dispatch `postinitialize`.

The initial media-query callback runs on the next animation frame. Validation failures set `isValid` to `false`, populate `errors`, and are logged rather than thrown to the caller. Subclasses customize lifecycle listeners and concrete hooks instead of replacing this method.

## Properties

The following properties include fields inherited from Core's `Component` class. Each menu or menu item has its own field values.

### _MenuType <badge type="warning" text="protected" /> {#property--menutype}

The class to use when generating submenus.

```js
BaseMenu._MenuType; // Default: `BaseMenu`.
```

#### Type {#property--menutype--type}

`Class`

### _MenuItemType <badge type="warning" text="protected" /> {#property--menuitemtype}

The class to use when generating menu items.

```js
BaseMenu._MenuItemType; // Default: `BaseMenuItem`.
```

#### Type {#property--menuitemtype--type}

`Class`

### _MenuToggleType <badge type="warning" text="protected" /> {#property--menutoggletype}

The class to use when generating menu toggles.

```js
BaseMenu._MenuToggleType; // Default: `BaseMenuToggle`.
```

#### Type {#property--menutoggletype--type}

`Class`

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu.

```js
BaseMenu._dom;
```

#### Type {#property--dom--type}

`Object<string, HTMLElement|HTMLElement[]|null>`

#### Properties {#property--dom--properties}

| Name           | Type                  | Description                                                | Default                 |
| -------------- | --------------------- | ---------------------------------------------------------- | ----------------------- |
| menu           | `HTMLElement`         | The menu element.                                          | `menuElement`           |
| menuItems      | `HTMLElement[]`       | An array of menu items.                                    | Populated on initialize |
| menuLinks      | `HTMLElement[]`       | An array of menu links.                                    | `[]`                    |
| submenuItems   | `HTMLElement[]`       | An array of menu items that also contain submenu elements. | Populated on initialize |
| submenuToggles | `HTMLElement[]`       | An array of menu links that function as submenu toggles.   | Populated on initialize |
| submenus       | `HTMLElement[]`       | An array of submenu elements.                              | Populated on initialize |
| controller     | `HTMLElement`, `null` | The toggle for this menu.                                  | `null`                  |
| container      | `HTMLElement`, `null` | The container for this menu.                               | `null`                  |

`menuItems`, `submenuItems`, `submenuToggles`, and `submenus` are populated when the menu is initialized. The `menuLinks` slot starts as an empty array; links for individual items are stored on their menu item instances.

### _rootDOMElement <badge type="warning" text="protected" /> {#property--rootdomelement}

The key used to get the root DOM element from `_dom`.

```js
BaseMenu._rootDOMElement; // Default: `"menu"`.
```

#### Type {#property--rootdomelement--type}

`string`

### _protectedDOMElements <badge type="warning" text="protected" /> {#property--protecteddomelements}

DOM element keys that cannot be set or reset through `_setDOMElementType` or `_resetDOMElementType`.

```js
BaseMenu._protectedDOMElements; // Default: `["menu", "controller", "container"]`.
```

#### Type {#property--protecteddomelements--type}

`string[]`

### _selectors <badge type="warning" text="protected" /> {#property--selectors}

The query selectors used by the menu to populate the dom.

```js
BaseMenu._selectors;
```

#### Type {#property--selectors--type}

`Object<string, string>`

#### Properties {#property--selectors--properties}

| Name              | Type     | Description                                                         | Default                                 |
| ----------------- | -------- | ------------------------------------------------------------------- | --------------------------------------- |
| menuItems         | `string` | The query selector for menu items.                                  | `"li"`                                  |
| menuLinks         | `string` | The query selector for menu links.                                  | `"a"`                                   |
| submenuItems      | `string` | The query selector for menu items containing submenus.              | `"li:has(ul)"`                          |
| submenuToggles    | `string` | The query selector for menu links that function as submenu toggles. | `"a"`                                   |
| submenuSubtoggles | `string` | The query selector for submenu toggles below the top level.         | The configured `submenuTogglesSelector` |
| submenus          | `string` | The query selector for for submenus.                                | `"ul"`                                  |

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu.

```js
BaseMenu._elements;
```

#### Type {#property--elements--type}

`Object<string, BaseMenu|BaseMenuToggle|BaseMenuItem[]|BaseMenuToggle[]|null>`

#### Properties {#property--elements--properties}

| Name           | Type                     | Description                            | Default                                       |
| -------------- | ------------------------ | -------------------------------------- | --------------------------------------------- |
| menuItems      | `BaseMenuItem[]`         | An array of menu items.                | `[]`                                          |
| submenuToggles | `BaseMenuToggle[]`       | An array of menu toggles.              | `[]`                                          |
| controller     | `BaseMenuToggle`, `null` | A menu toggle that controls this menu. | `null`                                        |
| parentMenu     | `BaseMenu`, `null`       | The parent menu.                       | `null`                                        |
| rootMenu       | `BaseMenu`, `null`       | The root menu of the menu tree.        | `this` for a top-level menu; `null` otherwise |

### _classes <badge type="warning" text="protected" /> {#property--classes}

The classes to apply when the menu is in various states.

```js
BaseMenu._classes;
```

#### Type {#property--classes--type}

`Object<string, string|string[]>`

#### Properties {#property--classes--properties}

| Name       | Type                 | Description                                                           | Default           |
| ---------- | -------------------- | --------------------------------------------------------------------- | ----------------- |
| initialize | `string`, `string[]` | The class(es) to apply when the menu is initializing.                 | `"initializing"`  |
| expand     | `string`, `string[]` | The class(es) to apply when the menu is open.                         | `"show"`          |
| collapse   | `string`, `string[]` | The class(es) to apply when the menu is closed.                       | `"hide"`          |
| transition | `string`, `string[]` | The class(es) to apply when the menu is transitioning between states. | `"transitioning"` |

### _durations <badge type="warning" text="protected" /> {#property--durations}

The duration times (in milliseconds) for various menu transitions and events.

```js
BaseMenu._durations;
```

#### Type {#property--durations--type}

`Object<string, number>`

#### Properties {#property--durations--properties}

| Name       | Type     | Description                                                                            | Default |
| ---------- | -------- | -------------------------------------------------------------------------------------- | ------- |
| transition | `number` | The duration time (in milliseconds) for the transition between open and closed states. | `250`   |
| expand     | `number` | The duration time (in milliseconds) for the transition from closed to open states.     | `-1`    |
| collapse   | `number` | The duration time (in milliseconds) for the transition from open to closed states.     | `-1`    |

### _delays <badge type="warning" text="protected" /> {#property--delays}

The delay times (in milliseconds) for various menu transitions and events.

```js
BaseMenu._delays;
```

#### Type {#property--delays--type}

`Object<string, number>`

#### Properties {#property--delays--properties}

| Name  | Type     | Description                                                                               | Default |
| ----- | -------- | ----------------------------------------------------------------------------------------- | ------- |
| hover | `number` | The delay time (in milliseconds) used for pointerenter/pointerleave events to take place. | `250`   |
| enter | `number` | The delay time (in milliseconds) used for pointerenter events to take place.              | `-1`    |
| leave | `number` | The delay time (in milliseconds) used for pointerleave events to take place.              | `-1`    |

### _intervals <badge type="warning" text="protected" /> {#property--intervals}

Interval IDs indexed by scope.

```js
BaseMenu._intervals; // Default: `{}`.
```

#### Type {#property--intervals--type}

`Object<string, number>`

### _timeouts <badge type="warning" text="protected" /> {#property--timeouts}

Timeout IDs indexed by scope.

```js
BaseMenu._timeouts; // Default: `{}`.
```

#### Type {#property--timeouts--type}

`Object<string, number>`

### _listeners <badge type="warning" text="protected" /> {#property--listeners}

Event listeners throughout the menu.

```js
BaseMenu._listeners; // Default: `[]`.
```

#### Type {#property--listeners--type}

`object[]`

### _events <badge type="warning" text="protected" /> {#property--events}

Custom events that can be triggered throughout the component.

```js
BaseMenu._events; // Default: `{}`.
```

#### Type {#property--events--type}

`Object<string, CustomEvent>`

The constructor registers the `prevalidate`, `validate`, `postvalidate`, `preinitialize`, `initialize`, and `postinitialize` events. Each event includes `{ component: this }` in its `detail`.

Use `getEventName(type)` to get the DOM event name. These events bubble, so custom listeners should check `event.detail.component === this` before running.

### _root <badge type="warning" text="protected" /> {#property--root}

A flag marking the root menu.

```js
BaseMenu._root; // Default: `true`.
```

#### Type {#property--root--type}

`boolean`

### _currentChild <badge type="warning" text="protected" /> {#property--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

```js
BaseMenu._currentChild; // Default: `0`.
```

#### Type {#property--currentchild--type}

`number`

### _focusState <badge type="warning" text="protected" /> {#property--focusstate}

The current state of the menu's focus.

```js
BaseMenu._focusState; // Default: `"none"`.
```

Available states are: `"none"`, `"self"`, and `"child"`.

#### Type {#property--focusstate--type}

`string`

### _currentEvent <badge type="warning" text="protected" /> {#property--currentevent}

The last event triggered on the menu.

```js
BaseMenu._currentEvent; // Default: `"none"`.
```

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

#### Type {#property--currentevent--type}

`string`

### _hoverType <badge type="warning" text="protected" /> {#property--hovertype}

The type of hoverability for the menu.

```js
BaseMenu._hoverType; // Default: `"off"`.
```

Available types are: `"off"`, `"on"`, and `"dynamic"`.

You can read more about [supported hover types](../hover-types) in the docs.

#### Type {#property--hovertype--type}

`string`

### _prefix <badge type="warning" text="protected" /> {#property--prefix}

The prefix for the CSS custom properties.

```js
BaseMenu._prefix; // Default: `"am-"`.
```

#### Type {#property--prefix--type}

`string`

### _hasExpanded <badge type="warning" text="protected" /> {#property--hasexpanded}

A flag to check if the menu can dynamically hover based on if a menu has been opened already.

```js
BaseMenu._hasExpanded; // Default: `false`.
```

#### Type {#property--hasexpanded--type}

`boolean`

### _key <badge type="warning" text="protected" /> {#property--key}

The key used to generate IDs throughout the menu.

```js
BaseMenu._key; // Default: `""`.
```

#### Type {#property--key--type}

`string`

### _id <badge type="warning" text="protected" /> {#property--id}

The main ID of the menu.

```js
BaseMenu._id; // Default: `""`.
```

#### Type {#property--id--type}

`string`

### _eventPrefix <badge type="warning" text="protected" /> {#property--eventprefix}

The prefix used for event names. Menus, menu items, and toggles use `"accessibleMenu"`.

```js
BaseMenu._eventPrefix; // Default: `"accessibleMenu"`.
```

#### Type {#property--eventprefix--type}

`string`

### _storageKey <badge type="warning" text="protected" /> {#property--storagekey}

The storage type used when storing the menu in the global storage manager.

```js
BaseMenu._storageKey; // Default: `"menus"`.
```

#### Type {#property--storagekey--type}

`string`

### _name <badge type="warning" text="protected" /> {#property--name}

The component name of the menu.

```js
BaseMenu._name; // Default: `"Menu"`.
```

#### Type {#property--name--type}

`string`

### _scope <badge type="warning" text="protected" /> {#property--scope}

The scope of the menu.

```js
BaseMenu._scope; // Default: `"AccessibleMenu"`.
```

#### Type {#property--scope--type}

`string`

### _shouldStore <badge type="warning" text="protected" /> {#property--shouldstore}

A flag to store the component in global storage. The constructor sets this to `true` for root menus and `false` for submenus.

```js
BaseMenu._shouldStore; // Default: `true`.
```

#### Type {#property--shouldstore--type}

`boolean`

### _valid <badge type="warning" text="protected" /> {#property--valid}

The validity state of the menu.

```js
BaseMenu._valid; // Default: `true`.
```

#### Type {#property--valid--type}

`boolean`

### _initialized <badge type="warning" text="protected" /> {#property--initialized}

A flag to check if the component has initialized successfully.

```js
BaseMenu._initialized; // Default: `false`.
```

#### Type {#property--initialized--type}

`boolean`

### _errors <badge type="warning" text="protected" /> {#property--errors}

An array of error objects generated by the menu.

```js
BaseMenu._errors; // Default: `[]`.
```

#### Type {#property--errors--type}

`Error[]`

## Getters and Setters

### dom <badge type="warning" text="readonly" /> {#getter--dom}

The DOM elements within the menu.

::: code-group

```js [getter]
BaseMenu.dom;
```

:::

See [_dom](#property--dom) for more information.

### selectors <badge type="warning" text="readonly" /> {#getter--selectors}

The query selectors used by the menu to populate the [dom](#property--dom).

::: code-group

```js [getter]
BaseMenu.selectors;
```

:::

See [_selectors](#property--selectors) for more information.

### elements <badge type="warning" text="readonly" /> {#getter--elements}

The declared accessible-menu elements within the menu.

::: code-group

```js [getter]
BaseMenu.elements;
```

:::

See [_elements](#property--elements) for more information.

### classes <badge type="warning" text="readonly" /> {#getter--classes}

The classes to apply when the menu is in various states.

::: code-group

```js [getter]
BaseMenu.classes;
```

:::

See [_classes](#property--classes) for more information.

### durations <badge type="warning" text="readonly" /> {#getter--durations}

The duration times (in milliseconds) for various menu transitions and events.

::: code-group

```js [getter]
BaseMenu.durations;
```

:::

See [_durations](#property--durations) for more information.

### delays <badge type="warning" text="readonly" /> {#getter--delays}

The delay times (in milliseconds) for various menu transitions and events.

::: code-group

```js [getter]
BaseMenu.delays;
```

:::

See [_delays](#property--delays) for more information.

### timeouts <badge type="warning" text="readonly" /> {#getter--timeouts}

Timeout IDs indexed by scope.

::: code-group

```js [getter]
BaseMenu.timeouts;
```

:::

See [_timeouts](#property--timeouts) for more information.

### listeners <badge type="warning" text="readonly" /> {#getter--listeners}

The event listeners throughout the menu.

::: code-group

```js [getter]
BaseMenu.listeners;
```

:::

See [_listeners](#property--listeners) for more information.

### isTopLevel <badge type="warning" text="readonly" /> {#getter--istoplevel}

The flag marking the root menu.

::: code-group

```js [getter]
BaseMenu.isTopLevel;
```

:::

See [_root](#property--root) for more information.

### key <badge type="warning" text="readonly" /> {#getter--key}

The key used to generate IDs throughout the menu.

::: code-group

```js [getter]
BaseMenu.key;
```

:::

This functions differently for root vs. submenus.
Submenus will always inherit their parent menu's key suffixed with thier position.

See [_key](#property--key) for more information.

### id <badge type="warning" text="readonly" /> {#getter--id}

The main ID of the menu element.

::: code-group

```js [getter]
BaseMenu.id;
```

:::

See [_id](#property--id) for more information.

### expandClass {#getter-setter--openclass}

The class(es) to apply when the menu is open.

::: code-group

```js [getter]
BaseMenu.expandClass;
```

```js [setter]
BaseMenu.expandClass = "show";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's open class(es).

See [_classes.expand](#property--classes) for more information.

### collapseClass {#getter-setter--closeclass}

The class(es) to apply when the menu is closed.

::: code-group

```js [getter]
BaseMenu.collapseClass;
```

```js [setter]
BaseMenu.collapseClass = "hide";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's close class(es).

See [_classes.collapse](#property--classes) for more information.

### transitionClass {#getter-setter--transitionclass}

The class(es) to apply when the menu is transitioning between open and closed.

::: code-group

```js [getter]
BaseMenu.transitionClass;
```

```js [setter]
BaseMenu.transitionClass = "transitioning";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's transition class(es).

See [_classes.transition](#property--classes) for more information.

### transitionDuration {#getter-setter--transitionduration}

The duration time (in milliseconds) for the transition between open and closed states.

::: code-group

```js [getter]
BaseMenu.transitionDuration;
```

```js [setter]
BaseMenu.transitionDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's transition duration.

Setting this value will also set the `--am-transition-duration` CSS custom property on the menu.

See [_durations.transition](#property--durations) for more information.

### expandDuration {#getter-setter--openduration}

The duration time (in milliseconds) for the transition from closed to open states.

::: code-group

```js [getter]
BaseMenu.expandDuration;
```

```js [setter]
BaseMenu.expandDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's open duration.

Setting this value will also set the `--am-expand-transition-duration` CSS custom property on the menu.

See [_durations.expand](#property--durations) for more information.

### collapseDuration {#getter-setter--closeduration}

The duration time (in milliseconds) for the transition from open to closed states.

::: code-group

```js [getter]
BaseMenu.collapseDuration;
```

```js [setter]
BaseMenu.collapseDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's close duration.

Setting this value will also set the `--am-collapse-transition-duration` CSS custom property on the menu.

See [_durations.collapse](#property--durations) for more information.

### currentChild {#getter-setter--currentchild}

The index of the currently selected [menu item](./base-menu-item) in the menu.

::: code-group

```js [getter]
BaseMenu.currentChild;
```

```js [setter]
BaseMenu.currentChild = 0;
```

:::

Attempting to set the current child to a value less than -1 will set the current child to -1.

Attempting to set the current child to a value greater than or equal to the number of menu items will set the current child to the index of the last menu item in the menu.

If the current menu has a parent menu _and_ the menu's [current event](#property--currentevent) is "mouse" or "character", the parent menu will have its current child updated as well to help with transitioning between mouse and keyboard navigation.

See [_currentChild](#property--currentchild) for more information.

### focusState {#getter-setter--focusstate}

The current state of the menu's focus.

::: code-group

```js [getter]
BaseMenu.focusState;
```

```js [setter]
BaseMenu.focusState = "self";
```

:::

Available states are: `"none"`, `"self"`, and `"child"`.

If the menu has submenus, setting the focus state to "none" or "self" will update all child menus to have the focus state of "none".

If the menu has a parent menu, setting the focus state to "self" or "child" will update all parent menus to have the focus state of "child".

See [_focusState](#property--focusstate) for more information.

### currentEvent {#getter-setter--currentevent}

The last event triggered on the menu.

::: code-group

```js [getter]
BaseMenu.currentEvent;
```

```js [setter]
BaseMenu.currentEvent = "mouse";
```

:::

The root menu stores this value for the entire menu tree. Reading it from any submenu, item, or toggle returns the root value. Setting it on any of those components updates the root.

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

See [_currentEvent](#property--currentevent) for more information.

### currentMenuItem <badge type="warning" text="readonly" /> {#getter--currentmenuitem}

The currently selected menu item.

::: code-group

```js [getter]
BaseMenu.currentMenuItem;
```

:::

### hoverType {#getter-setter--hovertype}

The type of hoverability for the menu.

::: code-group

```js [getter]
BaseMenu.hoverType;
```

```js [setter]
BaseMenu.hoverType = "off";
```

:::

Available types are: `"off"`, `"on"`, and `"dynamic"`.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hoverability.

See [_hoverType](#property--hovertype) for more information.

### hoverDelay {#getter-setter--hoverdelay}

The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.

::: code-group

```js [getter]
BaseMenu.hoverDelay;
```

```js [setter]
BaseMenu.hoverDelay = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hover delay.

See [_delays.hover](#property--delays) for more information.

### enterDelay {#getter-setter--enterdelay}

The delay time (in milliseconds) used for pointerenter events to take place.

::: code-group

```js [getter]
BaseMenu.enterDelay;
```

```js [setter]
BaseMenu.enterDelay = 250;
```

:::

If enterDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's enter delay.

See [_delays.enter](#property--delays) for more information.

### leaveDelay {#getter-setter--leavedelay}

The delay time (in milliseconds) used for pointerleave events to take place.

::: code-group

```js [getter]
BaseMenu.leaveDelay;
```

```js [setter]
BaseMenu.leaveDelay = 250;
```

:::

If leaveDelay is set to -1, the hoverDelay value will be used instead.

This functions differently for root vs. submenus. Submenus will always inherit their root menu's leave delay.

See [_delays.leave](#property--delays) for more information.

### prefix {#getter-setter--prefix}

The prefix for the CSS custom properties.

::: code-group

```js [getter]
BaseMenu.prefix;
```

```js [setter]
BaseMenu.prefix = "am-";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's prefix.

See [_prefix](#property--prefix) for more information.

### shouldFocus <badge type="warning" text="readonly" /> {#getter--shouldfocus}

A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

::: code-group

```js [getter]
BaseMenu.shouldFocus;
```

:::

Submenus, items, and toggles use the root menu's decision.

For the root menu, this will be `false` unless any of the following criteria are met:

- The menu's [current event](#property--currentevent) is "keyboard".
- The menu's current event is "character".

### hasExpanded {#getter-setter--hasopened}

A flag to check if the menu can dynamically hover.

::: code-group

```js [getter]
BaseMenu.hasExpanded;
```

```js [setter]
BaseMenu.hasExpanded = true;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's hasExpanded.

See [_hasExpanded](#property--hasexpanded) for more information.

### errors <badge type="warning" text="readonly" /> {#getter--errors}

An array of error objects generated by the menu.

::: code-group

```js [getter]
BaseMenu.errors;
```

:::

See [_errors](#property--errors) for more information.

## Methods

### _validate <badge type="warning" text="protected" /> {#method--validate}

Validates all aspects of the menu to ensure proper functionality.

```js
BaseMenu._validate();
```

#### Returns {#method--validate--returns}

| Type      | Description                   |
| --------- | ----------------------------- |
| `boolean` | The result of the validation. |

### _setDOMElementType <badge type="warning" text="protected" /> {#method--setdomelementtype}

Sets DOM elements within the menu.

Elements listed in [_protectedDOMElements](#property--protecteddomelements) cannot be set through this method.

```js
BaseMenu._setDOMElementType(elementType, options);
```

#### Parameters {#method--setdomelementtype--parameters}

| Param             | Type          | Description                                                      | Default         |
| ----------------- | ------------- | ---------------------------------------------------------------- | --------------- |
| elementType       | `string`      | The type of element to populate.                                 | `undefined`     |
| options           | `object`      | The options for setting the DOM element type.                    | `{}`            |
| options.context   | `HTMLElement` | The element used as the base context for the `querySelectorAll`. | `this.dom.menu` |
| options.overwrite | `boolean`     | A flag to set if the existing elements will be overwritten.      | `true`          |
| options.strict    | `boolean`     | When `true`, only direct children of `context` are stored.       | `true`          |

### _resetDOMElementType <badge type="warning" text="protected" /> {#method--resetdomelementtype}

Resets DOM elements within the menu.

```js
BaseMenu._resetDOMElementType(elementType);
```

Elements listed in [_protectedDOMElements](#property--protecteddomelements) cannot be reset through this method.

#### Parameters {#method--resetdomelementtype--parameters}

| Param       | Type     | Description                   | Default     |
| ----------- | -------- | ----------------------------- | ----------- |
| elementType | `string` | The type of element to clear. | `undefined` |

### _setDOMElements <badge type="warning" text="protected" /> {#method--setdomelements}

Sets all DOM elements within the menu.

```js
BaseMenu._setDOMElements();
```

Utilizes [`_setDOMElementType`](#method--setdomelementtype) and [`_resetDOMElementType`](#method--resetdomelementtype).

### _generateKey <bade type="warning" text="protected" /> {#method--generatekey}

Generates a key for the menu.

```js
BaseMenu._generateKey(regenerate);
```

#### Parameters {#method--generatekey--parameters}

| Param      | Type      | Description                                           | Default |
| ---------- | --------- | ----------------------------------------------------- | ------- |
| regenerate | `boolean` | A flag to determine if the key should be regenerated. | `false` |

### _setIds <badge type="warning" text="protected" /> {#method--setids}

Sets the IDs of the menu and it's elements if they do not already exist.

```js
BaseMenu._setIds();
```

The generated IDs use the key and follow the format:

- menu: `menu-${key}`,
- container: `menu-container-${key}`,
- controller: `menu-controller-${key}`,

### _findRootMenu <badge type="warning" text="protected" /> {#method--findrootmenu}

Finds the root menu element.

```js
BaseMenu._findRootMenu(menu);
```

#### Parameters {#method--findrootmenu--parameters}

| Param | Type       | Description        | Default     |
| ----- | ---------- | ------------------ | ----------- |
| menu  | `BaseMenu` | The menu to check. | `undefined` |

### _splitMenuLinks <badge type="warning" text="protected" />

A flag to create separate menu items for navigation links and submenu toggles. Defaults to `false`. Top Link Disclosure sets it to `true`.

Subclasses can override this field. Use the [subclass initialization pattern](#constructor--subclass-initialization) so the field is ready when items are created.

The field does not change keyboard or hover behavior on its own.

### _submenuOptions <badge type="warning" text="protected" />

A read-only getter that returns additional constructor options for child menus. BaseMenu passes the current `selectors.submenuSubtoggles` value as both the child menu's `submenuTogglesSelector` and `submenuSubtogglesSelector`. Subclasses can override the getter to read current selectors when children are created, rather than storing copies before the constructor has finished setting them.

### _createChildElements <badge type="warning" text="protected" /> {#method--createchildelements}

Creates and initializes all menu items and submenus.

```js
BaseMenu._createChildElements();
```

By default, a submenu has one menu item that acts as its toggle. A subclass can set `_splitMenuLinks = true` to create separate menu items when the navigation link and toggle are different elements. The link comes first, followed by the toggle. If both selectors match the same element, the method creates one menu item.

The method looks for the navigation link and toggle separately. A navigation link can appear before or after its toggle. If there is no separate navigation link, the toggle becomes the menu item's link. Links and toggles inside the child submenu are excluded from the parent item's search.

The `_submenuOptions` getter provides additional constructor options for child menus. All menu types use it to select the toggles at deeper levels.

These protected fields and getters are for subclasses, not menu constructor options.

### _createMenuItems <badge type="warning" text="protected" /> {#method--createmenuitems}

Creates and initializes the menu items for one link and its submenu toggle.

```js
BaseMenu._createMenuItems({
  menuItemElement,
  menuLinkElement,
  toggle: null,
  splitMenuLinks: false,
});
```

`menuItemElement` is the containing list item. `menuLinkElement` is the navigation link, and `toggle` is the submenu toggle component if one exists. Without split behavior, a submenu's toggle remains the focusable menu link.

Returns an array of menu items. With a separate link and toggle, the link item's `elements.sibling` points to the toggle item. The link itself does not become a submenu toggle. Subclasses handle their own keyboard and hover behavior.

### _setTimeout <badge type="warning" text="protected" /> {#method--settimeout}

Sets a timeout within the menu.

```js
BaseMenu._setTimeout(callback, delay, scope);
```

#### Parameters {#method--settimeout--parameters}

| Param    | Type       | Description                                                        | Default      |
| -------- | ---------- | ------------------------------------------------------------------ | ------------ |
| callback | `Function` | The callback function.                                             | `undefined`  |
| delay    | `number`   | The time (in milliseconds) of the delay.                           | `undefined`  |
| scope    | `string`   | The scope of the timeout (used to store the timeout in _timeouts). | `"_default"` |

### _clearTimeout <badge type="warning" text="protected" /> {#method--cleartimeout}

Clears a timeout within the menu.

```js
BaseMenu._clearTimeout(scope);
```

#### Parameters {#method--cleartimeout--parameters}

| Param | Type     | Description                                                        | Default      |
| ----- | -------- | ------------------------------------------------------------------ | ------------ |
| scope | `string` | The scope of the timeout (used to get the timeout from _timeouts). | `"_default"` |

### _clearTimeouts <badge type="warning" text="protected" /> {#method--cleartimeouts}

Clears all timeouts within the menu.

```js
BaseMenu._clearTimeouts();
```

### _handleFocus <badge type="warning" text="protected" /> {#method--handlefocus}

Handles focus events throughout the menu for proper menu use.

```js
BaseMenu._handleFocus();
```

- Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu's [focus state](#property--focusstate) to "self".
- Adds a `focusout` listener to the menu so when the menu loses focus, it will close.

### _handleClick {#method--handleclick}

Handles click events throughout the menu for proper use.

```js
BaseMenu._handleClick();
```

This method will do the following:

- Adds a `click` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
- Adds a `click` listener to every submenu item that will properly toggle the submenu open/closed.
- Adds a `click` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.

### _handleHover <badge type="warning" text="protected" /> {#method--handlehover}

Handles hover events throughout the menu for proper use.

```js
BaseMenu._handleHover();
```

Adds `pointerenter` listeners to all menu items and `pointerleave` listeners to all submenu items which function differently depending on the menu's [hover type](#property--hovertype).

Before executing anything, the event is checked to make sure the event wasn't triggered by a pen or touch.

This method will add the following behaviour:

#### Hover Type "on" {#method--handlehover--hovertype-on}

- When a `pointerenter` event triggers on any menu item the menu's [current child](#property--currentchild) value will change to that menu item.
- When a `pointerenter` event triggers on a submenu item the [preview method](./base-menu-toggle#method--preview) for the submenu item's toggle will be called.
- When a `pointerleave` event triggers on an open submenu item the [collapse method](./base-menu-toggle#method--collapse) for the submenu item's toggle will be called after a delay set by the menu's hover delay.

#### Hover Type "dynamic" {#method--handlehover--hovertype-dynamic}

- When a `pointerenter` event triggers on any menu item the menu's current child value will change to that menu item.
- When a `pointerenter` event triggers on any menu item, and the menu's [focus state](#property--focusstate) is not "none", the menu item will be focused.
- When a `pointerenter` event triggers on a submenu item, and a submenu is already open, the preview method for the submenu item's toggle will be called.
- When a `pointerenter` event triggers on a non-submenu item, and a submenu is already open, the collapseChildren method for the menu will be called.
- When a `pointerenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
- When a `pointerleave` event triggers on an open submenu item that is not a root-level submenu item the close method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's hover delay.
- When a `pointerleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.

#### Hover Type "off" {#method--handlehover--hovertype-off}

All `pointerenter` and `pointerleave` events are ignored.

### _focusSubmenu <badge type="warning" text="protected" /> {#method--focussubmenu}

Moves focus to an item at a given index in a menu item's submenu.

```js
menu._focusSubmenu(menuItem);
// Focus the third item.
menu._focusSubmenu(menuItem, { childIndex: 2 });
```

Selects the item immediately by default. Set defer to true to wait one animation frame for the submenu to open before selecting its child.

Cancels a deferred move if focus moves away, the submenu closes, or another item becomes current before the frame runs.

#### Parameters {#method--focussubmenu--parameters}

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| menuItem | `BaseMenuItem` | The item whose submenu will receive focus. It must have a submenu. | |
| options.childIndex | `number` | The index of the child to focus. | `0` |
| options.defer | `boolean` | Wait one animation frame before selecting the child. | `false` |

### _handleKeydown <badge type="warning" text="protected" /> {#method--handlekeydown}

Handles keydown events throughout the menu for proper menu use.

```js
BaseMenu._handleKeydown();
```

Ignores keydown events using Ctrl, Alt, or Meta.

This method exists to assist the [_handleKeyup](#method--handlekeyup) method.

This method will do the following:

- Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
  - Blocks propagation on "Space", "Enter", and "Escape" keys.

### _handleKeyup <badge type="warning" text="protected" /> {#method--handlekeyup}

Handles keyup events throughout the menu for proper menu use.

```js
BaseMenu._handleKeyup();
```

Ignores keyup events using Ctrl, Alt, or Meta.

This method will do the following:

- Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
  - Toggles the menu when the user hits "Space" or "Enter".

### _store <badge type="warning" text="protected" /> {#method--store}

Stores the menu in the global [StorageManager](./storage-manager) under
`window.AccessibleMenuStorage`, using the menu's [id](#property--id) (or generated
[key](#property--key)) and [_storageKey](#property--storagekey) as identifiers.

```js
BaseMenu._store();
```

### _unstore <badge type="warning" text="protected" /> {#method--unstore}

Removes the menu from the global `StorageManager` if it exists.

```js
BaseMenu._unstore();
```

### _setCustomProps <badge type="warning" text="protected" /> {#method--setcustomprops}

Sets the transition duration of the menu as a CSS custom property.

```js
BaseMenu._setCustomProps();
```

The custom properties are:

- `--am-transition-duration`,
- `--am-expand-transition-duration`, and
- `--am-collapse-transition-duration`.

The prefix of `am-` can be changed by setting the menu's prefix value.

### _addEventListener <badge type="warning" text="protected" /> {#method--addeventlistener}

Add an event listener to an element and register it within the menu.

```js
BaseMenu._addEventListener(type, element, listener, options);
```

#### Parameters {#method--addeventlistener--parameters}

| Param    | Type                | Description                          | Default     |
| -------- | ------------------- | ------------------------------------ | ----------- |
| type     | `string`            | The event type to listen for.        | `undefined` |
| element  | `HTMLElement`       | The element to add the listener to.  | `undefined` |
| listener | `Function`          | The listener callback.               | `undefined` |
| options  | `Object`, `boolean` | The options to pass to the listener. | `{}`        |

### _removeEventListener <badge type="warning" text="protected" /> {#method--removeeventlistener}

Remove an event listener from an element and unregister it within the menu.

```js
BaseMenu._removeEventListener(type, element, listener, options);
```

#### Parameters {#method--removeeventlistener--parameters}

| Param    | Type                | Description                                   | Default     |
| -------- | ------------------- | --------------------------------------------- | ----------- |
| type     | `string`            | The event type to remove.                     | `undefined` |
| element  | `HTMLElement`       | The element to remove the listener from.      | `undefined` |
| listener | `Function`          | The listener callback.                        | `undefined` |
| options  | `Object`, `boolean` | The options that were passed to the listener. | `{}`        |

### _removeEventListeners <badge type="warning" text="protected" /> {#method--removeeventlisteners}

Remove all event listeners registered in the menu.

```js
BaseMenu._removeEventListeners();
```

#### Parameters {#method--removeeventlisteners--parameters}

| Param           | Type                  | Description                                                                | Default |
| --------------- | --------------------- | -------------------------------------------------------------------------- | ------- |
| options         | `Object`              | The options for removing the listeners.                                    | `{}`    |
| options.type    | `string`, `null`      | The type of event to remove. If `null`, all types are removed.             | `null`  |
| options.element | `HTMLElement`, `null` | The element to remove listeners from. If `null`, all elements are removed. | `null`  |

### dispose <badge type="tip" text="public" /> {#method--dispose}

Dispose of the menu instance.

```js
BaseMenu.dispose();
```

Disposes of the menu's submenus, submenu toggles, menu items, and root controller. Then removes the menu's event listeners, intervals, timeouts, and global storage entry. This does not delete references to the menu held by your code.

### focus <badge type="tip" text="public" /> {#method--focus}

Focus the menu.

```js
BaseMenu.focus();
```

Sets the menu's [focus state](#property--focusstate) to "self" and focusses the menu if the menu's [shouldFocus](#getter--shouldfocus) value is `true`.

### blur <badge type="tip" text="public" /> {#method--blur}

Unfocus the menu.

```js
BaseMenu.blur();
```

Sets the menu's focus state to "none" and blurs the menu if the menu's shouldFocus value is `true`.

### focusCurrentChild <badge type="tip" text="public" /> {#method--focuscurrentchild}

Focuses the menu's current child.

```js
BaseMenu.focusCurrentChild();
```

### focusChild <badge type="tip" text="public" /> {#method--focuschild}

Focuses the menu's child at a given index.

```js
BaseMenu.focusChild(index);
```

#### Parameters {#method--focuschild--parameters}

| Param | Type     | Description                      | Default     |
| ----- | -------- | -------------------------------- | ----------- |
| index | `number` | The index of the child to focus. | `undefined` |

### focusFirstChild <badge type="tip" text="public" /> {#method--focusfirstchild}

Focus the menu's first child.

```js
BaseMenu.focusFirstChild();
```

### focusLastChild <badge type="tip" text="public" /> {#method--focuslastchild}

Focus the menu's last child.

```js
BaseMenu.focusLastChild();
```

### focusNextChild <badge type="tip" text="public" /> {#method--focusnextchild}

Focus the menu's next child.

```js
BaseMenu.focusNextChild();
```

### focusPreviousChild <badge type="tip" text="public" /> {#method--focuspreviouschild}

Focus the menu's previous child.

```js
BaseMenu.focusPreviousChild();
```

### blurCurrentChild <badge type="tip" text="public" /> {#method--blurcurrentchild}

Blurs the menu's current child.

```js
BaseMenu.blurCurrentChild();
```

### focusController <badge type="tip" text="public" /> {#method--focuscontroller}

Focus the menu's controller.

```js
BaseMenu.focusController();
```

### focusContainer <badge type="tip" text="public" /> {#method--focuscontainer}

Focus the menu's container.

```js
BaseMenu.focusContainer();
```

### collapseChildren <badge type="tip" text="public" /> {#method--collapsechildren}

Close all submenu children.

```js
BaseMenu.collapseChildren();
```

### blurChildren <badge type="tip" text="public" /> {#method--blurchildren}

Blurs all children and submenu's children.

```js
BaseMenu.blurChildren();
```

## Inherited Core API

The following members are inherited from Core and are available on this class and its subclasses.

### initialize

Initialize the component.

```js
initialize();
```

### init

Calls `initialize()`.

```js
init();
```

### rootDOMElement

The root DOM element of the component.

Type: `HTMLElement`. Read-only.

### intervals

Intervals throughout the component.

Type: `object`. Read-only.

### events

Custom events that can be triggered throughout the component.

Type: `Object<string, CustomEvent>`. Read-only.

### initializeClass

The class(es) to apply when the component is in the initialization state.

Type: `string|string[]`. Readable and writable.

### name

The component name.

Type: `string`. Read-only.

### eventPrefix

The prefix used when registering events. Returns `"accessibleMenu"` by default. Inherited from Core and read-only. Subclasses can override `_eventPrefix` before bootstrapping.

Type: `string`. Read-only.

### scope

The scope of the component.

Type: `string`. Read-only.

### isValid

The validity state of the component.

Type: `boolean`. Read-only.

### isInitialized

The initialized state of the component.

Type: `boolean`. Read-only.

### _setInterval

Sets an interval within the component.

```js
_setInterval(callback, delay, (scope = "_default"));
```

| Parameter            | Type       | Description                                                           |
| -------------------- | ---------- | --------------------------------------------------------------------- |
| `[callback]`         | `Function` | The callback function.                                                |
| `[delay]`            | `number`   | The time (in milliseconds) of the delay.                              |
| `[scope = _default]` | `string`   | The scope of the interval (used to store the interval in _intervals). |

### _clearInterval

Clears an interval within the component.

```js
_clearInterval((scope = "_default"));
```

| Parameter            | Type     | Description                                                           |
| -------------------- | -------- | --------------------------------------------------------------------- |
| `[scope = _default]` | `string` | The scope of the interval (used to get the interval from _intervals). |

### _clearIntervals

Clears all intervals within the component.

```js
_clearIntervals();
```

### _registerEvent

Registers a new event type within the component.

```js
_registerEvent(name, ({ bubbles = true, detail = {} } = {}));
```

| Parameter                  | Type      | Description                                 |
| -------------------------- | --------- | ------------------------------------------- |
| `name`                     | `string`  | The name of the new event type.             |
| `[options = {}]`           | `object`  | The options for the new event type.         |
| `[options.bubbles = true]` | `boolean` | A flag to set if the event bubbles.         |
| `[options.detail = {}]`    | `object`  | Additional details to include in the event. |

### getEventName

Gets the name of an event type stored in the _events object.

```js
getEventName(type);
```

| Parameter | Type     | Description                                           |
| --------- | -------- | ----------------------------------------------------- |
| `type`    | `string` | The type of the event to get from the _events object. |

Returns `?string`: The event name (or null if none exists).

### _dispatchEvent

Dispatch a custom event on an element in the DOM.

```js
_dispatchEvent(eventType, (element = this.rootDOMElement));
```

| Parameter                         | Type          | Description                           |
| --------------------------------- | ------------- | ------------------------------------- |
| `eventType`                       | `string`      | The type of the event to dispatch.    |
| `[element = this.rootDOMElement]` | `HTMLElement` | The element to dispatch the event on. |

### _bootstrap

Registers the menu's validation and initialization event listeners.

Before validation, creates the root controller without initializing it. Before initialization, finds the root menu if it isn't already set.

Validation checks the required DOM elements, controller and container, root flag, parent menu, controller options, and hover type.

### _setAriaAttributes

Sets the ARIA attributes on the root controller.

If the root menu has a controller and container, adds `role="button"` when the controller is not a button and sets `aria-controls` to the root menu's ID. Submenu toggles set their own ARIA attributes.

### _controllerOptions

The responsive options passed to the root controller. Includes `breakpoint`, `mediaQuery`, and the eight breakpoint action flags. All action flags default to `false`. The controller validates these options and registers the media-query listener.

### _createController

Creates and initializes the root controller using `_controllerOptions`.

Before validation, the menu calls this method with `{ initialize: false }` so the controller's options can be checked. During child creation, `_createChildElements()` calls it again to initialize the controller after the menu's IDs and ARIA attributes are set. An initialized controller is not initialized again.

The controller registers its own media-query listener. Submenu toggles do not receive these responsive options.

## Responsive controller configuration

`breakpoint`, `mediaQuery`, and the eight breakpoint action flags are passed to the root controller, `elements.controller`. Submenu toggles do not receive these options.

All action flags default to `false`. To expand outside the breakpoint and collapse inside it, pass `expandOutsideBreakpoint: true` and `collapseInsideBreakpoint: true`.

After initialization, you can read the responsive settings and change action flags through `menu.elements.controller`. The controller registers its media-query listener during initialization. If you change `breakpoint` or `mediaQuery` afterward, you must also reconfigure that listener.
