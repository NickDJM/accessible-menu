# BaseMenu

An accessible navigation element in the DOM.

This is intended to be used as a "base" to other menus and not to be used on
its own in the DOM.

::: info Inheritance
Members marked with an <badge type="tip" text="inherited" /> badge come from a parent class in `@accessible-ecosystem/core`. They are available on this class without being redefined here.
:::

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
  submenuTriggersSelector,
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

::: warning Delay initialization

When extending a menu class, pass `initialize: false` to `super()` and call `this.initialize()` after your subclass fields and constructor setup are complete.

:::

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
| options.submenuTriggersSelector   | `?string`                    | Selects a trigger inside each submenu toggle. Empty or null uses the toggle.                         | `null`            |
| options.submenusSelector          | `string`                     | The query selector string for submenus.                                                              | `"ul"`            |
| options.controllerElement         | `HTMLElement`, `null`        | The element controlling the menu in the DOM.                                                         | `null`            |
| options.containerElement          | `HTMLElement`, `null`        | The element containing the menu in the DOM.                                                          | `null`            |
| options.initializeClass           | `string`, `string[]`, `null` | The class(es) to apply when the menu is initializing.                                                | `"initializing"`  |
| options.expandClass               | `string`, `string[]`, `null` | The class(es) to apply when the menu is expanded.                                                    | `"show"`          |
| options.collapseClass             | `string`, `string[]`, `null` | The class(es) to apply when the menu is collapsed.                                                   | `"hide"`          |
| options.transitionClass           | `string`, `string[]`, `null` | The class(es) to apply when the menu is transitioning between expanded and collapsed states.         | `"transitioning"` |
| options.transitionDuration        | `number`                     | The duration of the transition between expanded and collapsed states (in milliseconds).              | `250`             |
| options.expandDuration            | `number`                     | The duration of the transition from collapsed to expanded states (in milliseconds).                  | `-1`              |
| options.collapseDuration          | `number`                     | The duration of the transition from expanded to collapsed states (in milliseconds).                  | `-1`              |
| options.isTopLevel                | `boolean`                    | A flag to mark the root menu.                                                                        | `true`            |
| options.parentMenu                | `BaseMenu`, `null`           | The parent menu to this menu.                                                                        | `null`            |
| options.hoverType                 | `string`                     | The type of hoverability a menu has.                                                                 | `"off"`           |
| options.hoverDelay                | `number`                     | The delay for expanding and collapsing menus if the menu is hoverable (in milliseconds).             | `250`             |
| options.enterDelay                | `number`                     | The delay for expanding menus if the menu is hoverable (in milliseconds).                            | `-1`              |
| options.leaveDelay                | `number`                     | The delay for collapsing menus if the menu is hoverable (in milliseconds).                           | `-1`              |
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

### _dom <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--dom}

The DOM elements within the menu.

```js
BaseMenu._dom;
```

#### Type {#property--dom--type}

`Object<string, HTMLElement|HTMLElement[]|null>`

#### Properties {#property--dom--properties}

| Name            | Type                  | Description                                                | Default                 |
| --------------- | --------------------- | ---------------------------------------------------------- | ----------------------- |
| menu            | `HTMLElement`         | The menu element.                                          | `menuElement`           |
| menuItems       | `HTMLElement[]`       | An array of menu items.                                    | Populated on initialize |
| menuLinks       | `HTMLElement[]`       | An array of menu links.                                    | `[]`                    |
| submenuItems    | `HTMLElement[]`       | An array of menu items that also contain submenu elements. | Populated on initialize |
| submenuToggles  | `HTMLElement[]`       | An array of menu links that function as submenu toggles.   | Populated on initialize |
| submenuTriggers | `HTMLElement[]`       | The separate triggers inside this menu's submenu toggles.  | Populated on initialize |
| submenus        | `HTMLElement[]`       | An array of submenu elements.                              | Populated on initialize |
| controller      | `HTMLElement`, `null` | The toggle for this menu.                                  | `null`                  |
| container       | `HTMLElement`, `null` | The container for this menu.                               | `null`                  |

`menuItems`, `submenuItems`, `submenuToggles`, and `submenus` are populated when the menu is initialized. When `submenuTriggersSelector` is empty or null, `submenuTriggers` remains empty and each toggle uses its controller as the trigger. The `menuLinks` slot starts as an empty array; links for individual items are stored on their menu item instances.

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

### _selectors <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--selectors}

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
| submenuTriggers   | `string` | The query selector for separate submenu triggers, when configured.  | `""`                                    |
| submenuSubtoggles | `string` | The query selector for submenu toggles below the top level.         | The configured `submenuTogglesSelector` |
| submenus          | `string` | The query selector for for submenus.                                | `"ul"`                                  |

`submenuTriggersSelector` selects the first matching direct child of each submenu toggle's controller. The selector is passed to child menus at every level. If a controller has no matching trigger, that toggle uses its controller as the trigger. A trigger belonging to another controller is not used. Invalid selector syntax still prevents initialization and reports an error.

The trigger receives expansion clicks. Focus, keyboard handling, and ARIA attributes remain on the controller. This option does not change the menu type's keyboard behavior.

### _elements <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--elements}

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

### _classes <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--classes}

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
| expand     | `string`, `string[]` | The class(es) to apply when the menu is expanded.                     | `"show"`          |
| collapse   | `string`, `string[]` | The class(es) to apply when the menu is collapsed.                    | `"hide"`          |
| transition | `string`, `string[]` | The class(es) to apply when the menu is transitioning between states. | `"transitioning"` |

### _durations <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--durations}

The duration times (in milliseconds) for various menu transitions and events.

```js
BaseMenu._durations;
```

#### Type {#property--durations--type}

`Object<string, number>`

#### Properties {#property--durations--properties}

| Name       | Type     | Description                                                                                   | Default |
| ---------- | -------- | --------------------------------------------------------------------------------------------- | ------- |
| transition | `number` | The duration time (in milliseconds) for the transition between expanded and collapsed states. | `250`   |
| expand     | `number` | The duration time (in milliseconds) for the transition from collapsed to expanded states.     | `-1`    |
| collapse   | `number` | The duration time (in milliseconds) for the transition from expanded to collapsed states.     | `-1`    |

### _delays <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--delays}

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

### _intervals <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--intervals}

Interval IDs indexed by scope.

```js
BaseMenu._intervals; // Default: `{}`.
```

#### Type {#property--intervals--type}

`Object<string, number>`

### _timeouts <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--timeouts}

Timeout IDs indexed by scope.

```js
BaseMenu._timeouts; // Default: `{}`.
```

#### Type {#property--timeouts--type}

`Object<string, number>`

### _frames <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--frames}

Pending animation frame IDs, stored by scope. Inherited from Core.

```js
BaseMenu._frames; // Default: {}.
```

#### Type {#property--frames--type}

`Object<string, number>`

### _listeners <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--listeners}

Event listeners throughout the menu.

```js
BaseMenu._listeners; // Default: `[]`.
```

#### Type {#property--listeners--type}

`object[]`

### _events <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--events}

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

### _focusState <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--focusstate}

The current state of the menu's focus.

```js
BaseMenu._focusState; // Default: `"none"`.
```

Available states are: `"none"`, `"self"`, and `"child"`.

#### Type {#property--focusstate--type}

`string`

### _currentEvent <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--currentevent}

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

### _prefix <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--prefix}

The prefix for the CSS custom properties.

```js
BaseMenu._prefix; // Default: `"am-"`.
```

#### Type {#property--prefix--type}

`string`

### _hasExpanded <badge type="warning" text="protected" /> {#property--hasexpanded}

A flag that enables dynamic hover at the root level after a toggle has expanded.
Automatic expansion from a media query does not change this value.

```js
BaseMenu._hasExpanded; // Default: `false`.
```

#### Type {#property--hasexpanded--type}

`boolean`

### _key <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--key}

The key used to generate IDs throughout the menu.

```js
BaseMenu._key; // Default: `""`.
```

#### Type {#property--key--type}

`string`

### _id <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--id}

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

### _shouldStore <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--shouldstore}

A flag to store the component in global storage. The constructor sets this to `true` for root menus and `false` for submenus.

```js
BaseMenu._shouldStore; // Default: `true`.
```

#### Type {#property--shouldstore--type}

`boolean`

### _valid <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--valid}

The validity state of the menu.

```js
BaseMenu._valid; // Default: `true`.
```

#### Type {#property--valid--type}

`boolean`

### _initialized <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--initialized}

A flag to check if the component has initialized successfully.

```js
BaseMenu._initialized; // Default: `false`.
```

#### Type {#property--initialized--type}

`boolean`

### _errors <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--errors}

An array of error objects generated by the menu.

```js
BaseMenu._errors; // Default: `[]`.
```

#### Type {#property--errors--type}

`Error[]`

### _controllerOptions <badge type="warning" text="protected" /> {#property--controlleroptions}

The responsive options passed to the root controller. Includes `breakpoint`, `mediaQuery`, and the eight breakpoint action flags. All action flags default to `false`. The controller validates these options and registers the media-query listener.

```js
BaseMenu._controllerOptions;
```

#### Type {#property--controlleroptions--type}

`object`

### _splitMenuLinks <badge type="warning" text="protected" /> {#property--splitmenulinks}

A flag to create separate menu items for navigation links and submenu toggles. Defaults to `false`. Top Link Disclosure sets it to `true`.

Subclasses can override this field. Use the [subclass initialization pattern](#constructor--subclass-initialization) so the field is ready when items are created.

The field does not change keyboard or hover behavior on its own.

```js
BaseMenu._splitMenuLinks; // Default: false.
```

#### Type {#property--splitmenulinks--type}

`boolean`

## Getters and Setters

### dom <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--dom}

The DOM elements within the menu.

::: code-group

```js [getter]
BaseMenu.dom;
```

:::

See [_dom](#property--dom) for more information.

### selectors <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--selectors}

The query selectors used by the menu to populate the [dom](#property--dom).

::: code-group

```js [getter]
BaseMenu.selectors;
```

:::

See [_selectors](#property--selectors) for more information.

### elements <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--elements}

The declared accessible-menu elements within the menu.

::: code-group

```js [getter]
BaseMenu.elements;
```

:::

See [_elements](#property--elements) for more information.

### classes <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--classes}

The classes to apply when the menu is in various states.

::: code-group

```js [getter]
BaseMenu.classes;
```

:::

See [_classes](#property--classes) for more information.

### durations <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--durations}

The duration times (in milliseconds) for various menu transitions and events.

::: code-group

```js [getter]
BaseMenu.durations;
```

:::

See [_durations](#property--durations) for more information.

### delays <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--delays}

The delay times (in milliseconds) for various menu transitions and events.

::: code-group

```js [getter]
BaseMenu.delays;
```

:::

See [_delays](#property--delays) for more information.

### timeouts <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--timeouts}

Timeout IDs indexed by scope.

::: code-group

```js [getter]
BaseMenu.timeouts;
```

:::

See [_timeouts](#property--timeouts) for more information.

### listeners <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--listeners}

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

### id <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--id}

The main ID of the menu element.

::: code-group

```js [getter]
BaseMenu.id;
```

:::

See [_id](#property--id) for more information.

### expandClass {#getter-setter--openclass}

The class(es) to apply when the menu is expanded.

::: code-group

```js [getter]
BaseMenu.expandClass;
```

```js [setter]
BaseMenu.expandClass = "show";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's expand class(es).

See [_classes.expand](#property--classes) for more information.

### collapseClass {#getter-setter--closeclass}

The class(es) to apply when the menu is collapsed.

::: code-group

```js [getter]
BaseMenu.collapseClass;
```

```js [setter]
BaseMenu.collapseClass = "hide";
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's collapse class(es).

See [_classes.collapse](#property--classes) for more information.

### transitionClass {#getter-setter--transitionclass}

The class(es) to apply when the menu is transitioning between expanded and collapsed.

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

The duration time (in milliseconds) for the transition between expanded and collapsed states.

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

The duration time (in milliseconds) for the transition from collapsed to expanded states.

::: code-group

```js [getter]
BaseMenu.expandDuration;
```

```js [setter]
BaseMenu.expandDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's expand duration.

Setting this value will also set the `--am-expand-transition-duration` CSS custom property on the menu.

See [_durations.expand](#property--durations) for more information.

### collapseDuration {#getter-setter--closeduration}

The duration time (in milliseconds) for the transition from expanded to collapsed states.

::: code-group

```js [getter]
BaseMenu.collapseDuration;
```

```js [setter]
BaseMenu.collapseDuration = 250;
```

:::

This functions differently for root vs. submenus. Submenus will always inherit their root menu's collapse duration.

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

The value must be a finite integer. Other types throw a `TypeError`; fractions, `NaN`, and infinities throw a `RangeError`. Invalid values leave the current child unchanged.

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

### breakpoint {#getter-setter--breakpoint}

The breakpoint passed to the root controller.

::: code-group

```js [getter]
BaseMenu.breakpoint;
```

```js [setter]
BaseMenu.breakpoint = "60rem";
```

:::

Reads the root controller's current value, so changes made directly on the controller are also available here. Before the controller is created, returns the configured option. Submenus read and update the root menu's value.

Setting this value updates the root controller. The menu itself does not register a media-query listener. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--breakpoint--type}

`string`

### mediaQuery {#getter-setter--mediaquery}

The media query used by the root controller.

::: code-group

```js [getter]
BaseMenu.mediaQuery;
```

```js [setter]
BaseMenu.mediaQuery = "(orientation: portrait)";
```

:::

Reads the root controller's current value, so changes made directly on the controller are also available here. Before the controller is created, uses the explicit query or generates one from the breakpoint. Submenus read and update the root menu's value.

Setting this value updates the root controller. The menu itself does not register a media-query listener. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--mediaquery--type}

`string`

### expandInsideBreakpoint {#getter-setter--expandinsidebreakpoint}

A flag to expand the root controller when its media query matches. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.expandInsideBreakpoint;
```

```js [setter]
BaseMenu.expandInsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--expandinsidebreakpoint--type}

`boolean`

### expandOutsideBreakpoint {#getter-setter--expandoutsidebreakpoint}

A flag to expand the root controller when its media query does not match. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.expandOutsideBreakpoint;
```

```js [setter]
BaseMenu.expandOutsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--expandoutsidebreakpoint--type}

`boolean`

### collapseInsideBreakpoint {#getter-setter--collapseinsidebreakpoint}

A flag to collapse the root controller when its media query matches. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.collapseInsideBreakpoint;
```

```js [setter]
BaseMenu.collapseInsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--collapseinsidebreakpoint--type}

`boolean`

### collapseOutsideBreakpoint {#getter-setter--collapseoutsidebreakpoint}

A flag to collapse the root controller when its media query does not match. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.collapseOutsideBreakpoint;
```

```js [setter]
BaseMenu.collapseOutsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--collapseoutsidebreakpoint--type}

`boolean`

### lockInsideBreakpoint {#getter-setter--lockinsidebreakpoint}

A flag to lock the root controller when its media query matches. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.lockInsideBreakpoint;
```

```js [setter]
BaseMenu.lockInsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--lockinsidebreakpoint--type}

`boolean`

### lockOutsideBreakpoint {#getter-setter--lockoutsidebreakpoint}

A flag to lock the root controller when its media query does not match. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.lockOutsideBreakpoint;
```

```js [setter]
BaseMenu.lockOutsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--lockoutsidebreakpoint--type}

`boolean`

### unlockInsideBreakpoint {#getter-setter--unlockinsidebreakpoint}

A flag to unlock the root controller when its media query matches. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.unlockInsideBreakpoint;
```

```js [setter]
BaseMenu.unlockInsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--unlockinsidebreakpoint--type}

`boolean`

### unlockOutsideBreakpoint {#getter-setter--unlockoutsidebreakpoint}

A flag to unlock the root controller when its media query does not match. Defaults to `false`.

::: code-group

```js [getter]
BaseMenu.unlockOutsideBreakpoint;
```

```js [setter]
BaseMenu.unlockOutsideBreakpoint = true;
```

:::

Reads and updates the root controller's value. Changes made directly on the controller are reflected here. Before the controller is created, stores the option to pass to it. Submenus use the root menu's value.

Changes take effect the next time the controller handles a media-query match. See [responsive controller configuration](#responsive-controller-configuration).

#### Type {#getter-setter--unlockoutsidebreakpoint--type}

`boolean`

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

A flag that enables dynamic hover at the root level after a toggle has expanded.
Automatic expansion from a media query does not change this value.

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

### errors <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--errors}

An array of error objects generated by the menu.

::: code-group

```js [getter]
BaseMenu.errors;
```

:::

See [_errors](#property--errors) for more information.

### _submenuOptions <badge type="warning" text="protected" /> <badge type="warning" text="readonly" /> {#getter--submenuoptions}

A read-only getter that returns additional constructor options for child menus. BaseMenu passes the current `selectors.submenuSubtoggles` value as both the child menu's `submenuTogglesSelector` and `submenuSubtogglesSelector`. It also passes the configured `submenuTriggersSelector`, or an empty string when no separate trigger is configured. Subclasses can override the getter to read current selectors when children are created, rather than storing copies before the constructor has finished setting them.

::: code-group

```js [getter]
BaseMenu._submenuOptions;
```

:::

#### Type {#getter--submenuoptions--type}

`object`

### rootDOMElement <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--rootdomelement}

The root DOM element of the component.

::: code-group

```js [getter]
BaseMenu.rootDOMElement;
```

:::

#### Type {#getter--rootdomelement--type}

`HTMLElement`

### frames <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--frames}

Pending animation frame IDs, stored by scope. A completed or cancelled frame is removed from this object.

::: code-group

```js [getter]
BaseMenu.frames;
```

:::

#### Type {#getter--frames--type}

`Object<string, number>`

### intervals <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--intervals}

Intervals throughout the component.

::: code-group

```js [getter]
BaseMenu.intervals;
```

:::

#### Type {#getter--intervals--type}

`object`

### events <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--events}

Custom events that can be triggered throughout the component.

::: code-group

```js [getter]
BaseMenu.events;
```

:::

#### Type {#getter--events--type}

`Object<string, CustomEvent>`

### initializeClass <badge type="tip" text="inherited" /> {#getter-setter--initializeclass}

The class(es) to apply when the component is in the initialization state.

::: code-group

```js [getter]
BaseMenu.initializeClass;
```

```js [setter]
BaseMenu.initializeClass = "initializing";
```

:::

#### Type {#getter-setter--initializeclass--type}

`string|string[]`

### name <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--name}

The component name.

::: code-group

```js [getter]
BaseMenu.name;
```

:::

#### Type {#getter--name--type}

`string`

### eventPrefix <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--eventprefix}

The prefix used when registering events. Returns `"accessibleMenu"` by default. Inherited from Core and read-only. Subclasses can override `_eventPrefix` before bootstrapping.

::: code-group

```js [getter]
BaseMenu.eventPrefix;
```

:::

#### Type {#getter--eventprefix--type}

`string`

### scope <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--scope}

The scope of the component.

::: code-group

```js [getter]
BaseMenu.scope;
```

:::

#### Type {#getter--scope--type}

`string`

### isValid <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--isvalid}

The validity state of the component.

::: code-group

```js [getter]
BaseMenu.isValid;
```

:::

#### Type {#getter--isvalid--type}

`boolean`

### isInitialized <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--isinitialized}

The initialized state of the component.

::: code-group

```js [getter]
BaseMenu.isInitialized;
```

:::

#### Type {#getter--isinitialized--type}

`boolean`

## Methods

### _validate <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--validate}

Validates all aspects of the menu to ensure proper functionality.

```js
BaseMenu._validate();
```

#### Returns {#method--validate--returns}

| Type      | Description                   |
| --------- | ----------------------------- |
| `boolean` | The result of the validation. |

### _setDOMElementType <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--setdomelementtype}

Sets DOM elements within the provided context. Pass `options.context` to specify the element to search.

Elements listed in [_protectedDOMElements](#property--protecteddomelements) cannot be set through this method.

```js
BaseMenu._setDOMElementType(elementType, options);
```

#### Parameters {#method--setdomelementtype--parameters}

| Param             | Type          | Description                                                      | Default     |
| ----------------- | ------------- | ---------------------------------------------------------------- | ----------- |
| elementType       | `string`      | The type of element to populate.                                 | `undefined` |
| options           | `object`      | The options for setting the DOM element type.                    | `{}`        |
| options.context   | `HTMLElement` | The element used as the base context for the `querySelectorAll`. | `undefined` |
| options.overwrite | `boolean`     | A flag to set if the existing elements will be overwritten.      | `true`      |
| options.strict    | `boolean`     | When `true`, only direct children of `context` are stored.       | `false`     |

### _resetDOMElementType <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--resetdomelementtype}

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

Menu items and submenu items are collected from the menu's direct children. Submenu controllers and submenus are collected from each submenu item's direct children. Triggers are collected from each controller's direct children.

```js
BaseMenu._setDOMElements();
```

Uses [`_setDOMElementType`](#method--setdomelementtype) and [`_resetDOMElementType`](#method--resetdomelementtype).

### _generateKey <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--generatekey}

Generates a key for the menu.

```js
BaseMenu._generateKey(regenerate);
```

#### Parameters {#method--generatekey--parameters}

| Param      | Type      | Description                                           | Default |
| ---------- | --------- | ----------------------------------------------------- | ------- |
| regenerate | `boolean` | A flag to determine if the key should be regenerated. | `false` |

### _setIds <badge type="warning" text="protected" /> {#method--setids}

Sets the IDs of the menu and its elements if they do not already exist.

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

### _createChildElements <badge type="warning" text="protected" /> {#method--createchildelements}

Creates and initializes all menu items and submenus.

```js
BaseMenu._createChildElements();
```

By default, a submenu has one menu item that acts as its toggle. A subclass can set `_splitMenuLinks = true` to create separate menu items when the navigation link and toggle are different elements. The link comes first, followed by the toggle. If both selectors match the same element, the method creates one menu item.

The method looks for the navigation link and toggle separately. A navigation link can appear before or after its toggle. If there is no separate navigation link, the toggle becomes the menu item's link. Links and toggles inside the child submenu are excluded from the parent item's search.

The `_submenuOptions` getter provides additional constructor options for child menus. All menu types use it to select the toggles at deeper levels and pass the configured trigger selector to child menus.

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

### _setTimeout <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--settimeout}

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

### _clearTimeout <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--cleartimeout}

Clears a timeout within the menu.

```js
BaseMenu._clearTimeout(scope);
```

#### Parameters {#method--cleartimeout--parameters}

| Param | Type     | Description                                                        | Default      |
| ----- | -------- | ------------------------------------------------------------------ | ------------ |
| scope | `string` | The scope of the timeout (used to get the timeout from _timeouts). | `"_default"` |

### _clearTimeouts <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--cleartimeouts}

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
- Adds a `focusout` listener to the menu so when the menu loses focus, it will collapse.

### _handleClick {#method--handleclick}

Handles click events throughout the menu for proper use.

```js
BaseMenu._handleClick();
```

This method will do the following:

- Adds a `click` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
- Adds a `click` listener to every submenu item that will properly expand or collapse the submenu.
- Adds a `click` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will expand or collapse.

### _handleHover <badge type="warning" text="protected" /> {#method--handlehover}

Handles hover events throughout the menu for proper use.

```js
BaseMenu._handleHover();
```

Adds pointer listeners for the menu's hover type. Events triggered by a pen or touch are ignored.

`pointerenter` actions use enterDelay, and `pointerleave` actions use leaveDelay. A value of `-1` uses hoverDelay. A delay of `0` runs the action immediately.

#### Hover Type "on" {#method--handlehover--hovertype-on}

- When a `pointerenter` event triggers on a menu item's link or toggle, updates the menu's current child and focus state without moving keyboard focus.
- When the item has a submenu, calls its toggle's preview method after enterDelay.
- When a `pointerleave` event triggers on an item containing a submenu, calls its toggle's collapse method after leaveDelay.
- Re-entering an item containing a submenu cancels its pending hover timeout when leaveDelay is greater than 0.

#### Hover Type "dynamic" {#method--handlehover--hovertype-dynamic}

- When a `pointerenter` event triggers on a menu item's link or toggle, updates the menu's current child.
- Updates the menu's focus state when it is a submenu or its focus state is not "none". This tracks the hovered item without moving keyboard focus.
- In submenus, or when the root menu's hasExpanded value is `true`, previews the item's submenu after enterDelay. If the item has no submenu, calls collapseChildren after enterDelay instead.
- At the root level, when hasExpanded is `false`, hovering an item does not expand or collapse submenus.
- Leaving an item containing a submenu does not collapse it. The handler sets currentEvent to "mouse" after leaveDelay.
- Re-entering an item containing a submenu cancels its pending hover timeout when leaveDelay is greater than 0.

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

### _store <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--store}

Stores the menu in the global [StorageManager](./storage-manager) under
`window.AccessibleMenuStorage`, using the menu's [id](#property--id) (or generated
[key](#property--key)) and [_storageKey](#property--storagekey) as identifiers.

```js
BaseMenu._store();
```

### _unstore <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--unstore}

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

### _addEventListener <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--addeventlistener}

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

### _removeEventListener <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--removeeventlistener}

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

### _removeEventListeners <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--removeeventlisteners}

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

Disposes of the menu's submenus, submenu toggles, menu items, and root controller. Then removes the menu's event listeners, intervals, timeouts, pending animation frames, and global storage entry. This does not delete references to the menu held by your code.

### focus <badge type="tip" text="public" /> <badge type="tip" text="inherited" /> {#method--focus}

Focus the menu.

```js
BaseMenu.focus();
```

Sets the menu's [focus state](#property--focusstate) to "self" and focuses the menu if the menu's [shouldFocus](#getter--shouldfocus) value is `true`.

Selection and focus-state changes happen immediately, even when DOM focus is not allowed. DOM focus follows the root menu's [shouldFocus](#getter--shouldfocus) value; these methods do not change `currentEvent` themselves. Item links are focused or blurred on an animation frame, while calls on the menu, controller, or container happen immediately.

### blur <badge type="tip" text="public" /> <badge type="tip" text="inherited" /> {#method--blur}

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

Sets the menu's `focusState` to `"self"` and calls the current item's `focus()` method. If `currentChild` is `-1`, no item is focused.

### focusChild <badge type="tip" text="public" /> {#method--focuschild}

Focuses the menu's child at a given index.

```js
BaseMenu.focusChild(index);
```

#### Parameters {#method--focuschild--parameters}

| Param | Type     | Description                      | Default     |
| ----- | -------- | -------------------------------- | ----------- |
| index | `number` | The index of the child to focus. | `undefined` |

The index is required and must be a finite integer. It follows [currentChild's clamping rules](#getter-setter--currentchild). An index of `-1` clears the current child without focusing another item. Invalid types throw a `TypeError`; fractions, `NaN`, and infinities throw a `RangeError`. Validation happens before the current item is blurred or selection changes.

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

Keeps the current child when it is already the last item.

### focusPreviousChild <badge type="tip" text="public" /> {#method--focuspreviouschild}

Focus the menu's previous child.

```js
BaseMenu.focusPreviousChild();
```

Keeps the current child when it is already the first item.

### blurCurrentChild <badge type="tip" text="public" /> {#method--blurcurrentchild}

Blurs the menu's current child.

```js
BaseMenu.blurCurrentChild();
```

Sets the menu's `focusState` to `"none"` without changing `currentChild`. If `currentChild` is `-1`, no item is blurred.

### focusController <badge type="tip" text="public" /> {#method--focuscontroller}

Focus the menu's controller.

```js
BaseMenu.focusController();
```

Does nothing if the menu has no controller. Otherwise, sets the menu's `focusState` to `"none"` and calls the controller's DOM `focus()` method if the root menu allows focus.

### focusContainer <badge type="tip" text="public" /> {#method--focuscontainer}

Focus the menu's container.

```js
BaseMenu.focusContainer();
```

Does nothing if the menu has no container. Otherwise, sets the menu's `focusState` to `"none"` and calls the container's DOM `focus()` method if the root menu allows focus.

### collapseChildren <badge type="tip" text="public" /> {#method--collapsechildren}

Collapse all submenu children.

```js
BaseMenu.collapseChildren();
```

### blurChildren <badge type="tip" text="public" /> {#method--blurchildren}

Blurs all children and submenu's children.

```js
BaseMenu.blurChildren();
```

### _bootstrap

Registers the menu's validation and initialization event listeners.

Before validation, creates the root controller without initializing it. Before initialization, finds the root menu if it isn't already set.

Validation checks the required DOM elements, controller and container, root flag, parent menu, controller options, and hover type.

### _setAriaAttributes

Sets the ARIA attributes on the root controller.

If the root menu has a controller and container, adds `role="button"` when the controller is not a button and sets `aria-controls` to the root menu's ID. Submenu toggles set their own ARIA attributes.

### _createController

Creates and initializes the root controller using `_controllerOptions`.

Before validation, the menu calls this method with `{ initialize: false }` so the controller's options can be checked. During child creation, `_createChildElements()` calls it again to initialize the controller after the menu's IDs and ARIA attributes are set. An initialized controller is not initialized again.

The controller registers its own media-query listener. Submenu toggles do not receive these responsive options.

### initialize <badge type="tip" text="inherited" />

Initialize the component.

```js
initialize();
```

### init <badge type="tip" text="inherited" />

Calls `initialize()`.

```js
init();
```

### _setInterval <badge type="tip" text="inherited" />

Sets an interval within the component.

```js
_setInterval(callback, delay, (scope = "_default"));
```

| Parameter            | Type       | Description                                                           |
| -------------------- | ---------- | --------------------------------------------------------------------- |
| `[callback]`         | `Function` | The callback function.                                                |
| `[delay]`            | `number`   | The time (in milliseconds) of the delay.                              |
| `[scope = _default]` | `string`   | The scope of the interval (used to store the interval in _intervals). |

### _clearInterval <badge type="tip" text="inherited" />

Clears an interval within the component.

```js
_clearInterval((scope = "_default"));
```

| Parameter            | Type     | Description                                                           |
| -------------------- | -------- | --------------------------------------------------------------------- |
| `[scope = _default]` | `string` | The scope of the interval (used to get the interval from _intervals). |

### _clearIntervals <badge type="tip" text="inherited" />

Clears all intervals within the component.

```js
_clearIntervals();
```

### _requestAnimationFrame <badge type="tip" text="inherited" />

Schedules a callback for the next animation frame. Replaces any pending frame in the same scope.

```js
BaseMenu._requestAnimationFrame(callback, scope);
```

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| callback | `Function` | The callback to run. Receives the browser's frame timestamp. | Required |
| scope | `string` | The name used to track the pending frame. | `"_default"` |

Removes the frame from storage before calling the callback, so the callback can request another frame in the same scope.

Returns the browser's animation frame ID as a `number`.

### _cancelAnimationFrame <badge type="tip" text="inherited" />

Cancels the pending animation frame in a scope and removes it from storage. Does nothing if that scope has no pending frame.

```js
BaseMenu._cancelAnimationFrame(scope);
```

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| scope | `string` | The scope of the frame to cancel. | `"_default"` |

### _cancelAnimationFrames <badge type="tip" text="inherited" />

Cancels all pending animation frames tracked by the component.

```js
BaseMenu._cancelAnimationFrames();
```

### _registerEvent <badge type="tip" text="inherited" />

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

### getEventName <badge type="tip" text="inherited" />

Gets the name of an event type stored in the _events object.

```js
getEventName(type);
```

| Parameter | Type     | Description                                           |
| --------- | -------- | ----------------------------------------------------- |
| `type`    | `string` | The type of the event to get from the _events object. |

Returns `?string`: The event name (or null if none exists).

### _dispatchEvent <badge type="tip" text="inherited" />

Dispatch a custom event on an element in the DOM.

```js
_dispatchEvent(eventType, (element = this.rootDOMElement));
```

| Parameter                         | Type          | Description                           |
| --------------------------------- | ------------- | ------------------------------------- |
| `eventType`                       | `string`      | The type of the event to dispatch.    |
| `[element = this.rootDOMElement]` | `HTMLElement` | The element to dispatch the event on. |

## Responsive controller configuration

`breakpoint`, `mediaQuery`, and the eight breakpoint action flags are passed to the root controller, `elements.controller`. Submenu toggles do not receive these options.

All action flags default to `false`. To expand outside the breakpoint and collapse inside it, pass `expandOutsideBreakpoint: true` and `collapseInsideBreakpoint: true`.

The controller uses an explicit `mediaQuery` when one is provided. The menu's `mediaQuery` getter returns the effective query. Otherwise, it generates `(width <= ${breakpoint})` from `breakpoint`. If both values are empty strings, it does not register a media-query listener.

Read or update the query settings through `menu.breakpoint` and `menu.mediaQuery`. These values pass through to the root controller. Changes made directly on the controller are reflected by the menu getters.

Read or update the action flags on the menu in the same way, for example `menu.expandOutsideBreakpoint = true`. These also pass through to the root controller. Changed action flags take effect the next time the controller handles a media-query match.

### Changing the query after initialization

Set the new value on the root menu. It passes the value to the root controller, where Core removes the previous listener, cancels its pending callback, and registers a listener for the updated query.

```js
menu.breakpoint = "60rem";
```

An explicit `mediaQuery` still takes priority over `breakpoint`. Clear it to use the breakpoint, or set it to a new query:

```js
menu.mediaQuery = "(orientation: portrait)";
```

The controller applies the new query's current match state on the next animation frame and responds to future query changes. Assigning the same value leaves the current listener in place. If both `breakpoint` and `mediaQuery` are empty strings, Core removes the listener without creating another one.
