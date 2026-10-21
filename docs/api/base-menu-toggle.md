# BaseMenuToggle

A link or button that controls the visibility of a [BaseMenu](./base-menu).

Extends `CollapsibleComponent` from `@accessible-ecosystem/core`.

::: info Inheritance
Members marked with an <badge type="tip" text="inherited" /> badge come from a parent class in `@accessible-ecosystem/core`. They are available on this class without being redefined here.
:::

## Constructor

Constructs a new `BaseMenuToggle`

```js
new BaseMenuToggle({
  menuToggleElement,
  containerElement,
  controlledMenu,
  parentMenu,
});
```

The constructor populates the dom and elements properties. It will _not_ initialize the menu toggle; this is left to the subclasses to evoke.

### Parameters {#constructor--parameters}

| Name                              | Type               | Description                                                                          | Default     |
| --------------------------------- | ------------------ | ------------------------------------------------------------------------------------ | ----------- |
| options                           | `object`           | The options for generating the menu toggle.                                          | `undefined` |
| options.menuToggleElement         | `HTMLElement`      | The toggle element in the DOM.                                                       | `undefined` |
| options.containerElement          | `?HTMLElement`     | The element to apply state classes to. If null, the controlled menu element is used. | `null`      |
| options.controlledMenu            | `BaseMenu`         | The menu controlled by this toggle.                                                  | `undefined` |
| options.parentMenu                | `BaseMenu`, `null` | The menu containing this toggle.                                                     | `null`      |
| options.breakpoint                | `string`           | The Core controller breakpoint.                                                      | `""`        |
| options.mediaQuery                | `string`           | The explicit Core controller media query.                                            | `""`        |
| options.expandInsideBreakpoint    | `boolean`          | Core's expandInsideBreakpoint responsive action flag.                                | `false`     |
| options.expandOutsideBreakpoint   | `boolean`          | Core's expandOutsideBreakpoint responsive action flag.                               | `false`     |
| options.collapseInsideBreakpoint  | `boolean`          | Core's collapseInsideBreakpoint responsive action flag.                              | `false`     |
| options.collapseOutsideBreakpoint | `boolean`          | Core's collapseOutsideBreakpoint responsive action flag.                             | `false`     |
| options.lockInsideBreakpoint      | `boolean`          | Core's lockInsideBreakpoint responsive action flag.                                  | `false`     |
| options.lockOutsideBreakpoint     | `boolean`          | Core's lockOutsideBreakpoint responsive action flag.                                 | `false`     |
| options.unlockInsideBreakpoint    | `boolean`          | Core's unlockInsideBreakpoint responsive action flag.                                | `false`     |
| options.unlockOutsideBreakpoint   | `boolean`          | Core's unlockOutsideBreakpoint responsive action flag.                               | `false`     |

## Initialize

Initializes the menu toggle.

```js
BaseMenuToggle.initialize();
```

Core validates the toggle, sets IDs and ARIA through Menu hooks, and dispatches initialization listeners. The initial `aria-expanded` value determines whether it expands or collapses. Treeview preserves an explicitly expanded state; other Menu toggles initialize collapsed. Initial state changes suppress action events and transitions. Core also applies the initial lock state and marks successful initialization with `isInitialized = true`.

## Properties

The following properties include fields inherited from Core's `CollapsibleComponent`, `ResponsiveComponent`, and `Component` classes. Each toggle has its own field values.

### _dom <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--dom}

The DOM elements within the menu toggle.

```js
BaseMenuToggle._dom;
```

#### Type {#property--dom--type}

`Object<string, HTMLElement>`

#### Properties {#property--dom--properties}

| Name       | Type          | Description                        | Default                                       |
| ---------- | ------------- | ---------------------------------- | --------------------------------------------- |
| controller | `HTMLElement` | The menu toggle, used by Core.     | `menuToggleElement`                           |
| controlled | `HTMLElement` | The element to expand or collapse. | `containerElement ?? controlledMenu.dom.menu` |

The toggle adds and removes expand, collapse, transition, locked, and unlocked classes on `dom.controlled`. By default, this is the menu element. Pass `containerElement` to apply those classes to another element.

The menu element remains available through `elements.controlledMenu.dom.menu`. ARIA attributes reference that menu element. See [changing where the classes are added](../opening-and-closing#changing-where-the-classes-are-added) for an example.

### _elements <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--elements}

The declared accessible-menu elements within the menu toggle.

```js
BaseMenuToggle._elements;
```

#### Type {#property--elements--type}

`Object<string, BaseMenu|null>`

#### Properties {#property--elements--properties}

| Name           | Type               | Description                         | Default          |
| -------------- | ------------------ | ----------------------------------- | ---------------- |
| controlledMenu | `BaseMenu`         | The menu controlled by this toggle. | `controlledMenu` |
| parentMenu     | `BaseMenu`, `null` | The menu containing this toggle.    | `null`           |

### _events <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--events}

The expand and collapse events use the names `accessibleMenuExpand` and `accessibleMenuCollapse` and include the toggle in `detail.component`. Core registers component lifecycle and action events during construction, including pre/post expansion, collapse, locking, and unlocking. Use `getEventName()` to obtain their names.

Custom events that can be triggered throughout the menu toggle.

```js
BaseMenuToggle._events;
```

#### Type {#property--events--type}

`Object<string, CustomEvent>`

#### Properties {#property--events--properties}

| Name     | Type          | Description                                    | Default                  |
| -------- | ------------- | ---------------------------------------------- | ------------------------ |
| expand   | `CustomEvent` | The event triggered when the toggle expands.   | `accessibleMenuExpand`   |
| collapse | `CustomEvent` | The event triggered when the toggle collapses. | `accessibleMenuCollapse` |

The constructor registers the `prevalidate`, `validate`, `postvalidate`, `preinitialize`, `initialize`, and `postinitialize` events. Each event includes `{ component: this }` in its `detail`.

Use `getEventName(type)` to get the DOM event name. These events bubble, so custom listeners should check `event.detail.component === this` before running.

Toggles also register `preexpand`, `expand`, `postexpand`, `precollapse`, `collapse`, `postcollapse`, `prelock`, `lock`, `postlock`, `preunlock`, `unlock`, and `postunlock`. Actions default to emitting events only after initialization.

### _rootDOMElement <badge type="warning" text="protected" /> {#property--rootdomelement}

The key used to get the root element from _dom.

```js
BaseMenuToggle._rootDOMElement; // Default: `"controller"`.
```

#### Type {#property--rootdomelement--type}

`string`

### _protectedDOMElements <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--protecteddomelements}

DOM element keys that cannot be generated or reset.

```js
BaseMenuToggle._protectedDOMElements; // Default: `["controller", "controlled"]`.
```

#### Type {#property--protecteddomelements--type}

`string[]`

### _selectors <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--selectors}

The query selectors used to populate the DOM elements.

```js
BaseMenuToggle._selectors; // Default: `{}`.
```

#### Type {#property--selectors--type}

`Object<string, string>`

### _classes <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--classes}

The classes to apply to `dom.controlled` when the toggle changes state. The expand, collapse, and transition classes come from the controlled menu. The locked and unlocked classes come from Core.

The class getters read the controlled menu's current settings, so changes to the root menu also apply to the toggle's transitions.

```js
BaseMenuToggle._classes; // Default: `{ initialize: "", locked: "locked", unlocked: "unlocked", expand: controlledMenu.classes.expand, collapse: controlledMenu.classes.collapse, transition: controlledMenu.classes.transition }`.
```

#### Type {#property--classes--type}

`Object<string, string|string[]>`

### _durations <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--durations}

The duration times (in milliseconds) for the controlled menu's transitions. An expand or collapse duration of `-1` uses the transition duration.

```js
BaseMenuToggle._durations; // Default: `{ transition: controlledMenu.durations.transition, expand: controlledMenu.durations.expand, collapse: controlledMenu.durations.collapse }`.
```

#### Type {#property--durations--type}

`Object<string, number>`

### _delays <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--delays}

The inherited delay settings in milliseconds.

```js
BaseMenuToggle._delays; // Default: `{ transition: 250 }`.
```

#### Type {#property--delays--type}

`Object<string, number>`

### _focusState <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--focusstate}

The current focus state.

```js
BaseMenuToggle._focusState; // Default: `"none"`.
```

#### Type {#property--focusstate--type}

`string`

### _currentEvent <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--currentevent}

The last type of event triggered within the component.

```js
BaseMenuToggle._currentEvent; // Default: `"none"`.
```

#### Type {#property--currentevent--type}

`string`

### _intervals <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--intervals}

Interval IDs indexed by scope.

```js
BaseMenuToggle._intervals; // Default: `{}`.
```

#### Type {#property--intervals--type}

`Object<string, number>`

### _timeouts <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--timeouts}

Timeout IDs indexed by scope.

```js
BaseMenuToggle._timeouts; // Default: `{}`.
```

#### Type {#property--timeouts--type}

`Object<string, number>`

### _frames <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--frames}

Pending animation frame IDs, stored by scope. Inherited from Core.

```js
BaseMenuToggle._frames; // Default: {}.
```

#### Type {#property--frames--type}

`Object<string, number>`

### _listeners <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--listeners}

The registered event listeners. Core populates this list with its validation and initialization listeners during construction.

```js
BaseMenuToggle._listeners; // Populated by Core during construction.
```

#### Type {#property--listeners--type}

`object[]`

### _prefix <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--prefix}

The prefix used for CSS custom properties and attributes.

```js
BaseMenuToggle._prefix; // Default: `"am-"`.
```

#### Type {#property--prefix--type}

`string`

### _key <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--key}

The key used to generate IDs.

```js
BaseMenuToggle._key; // Default: `""`.
```

#### Type {#property--key--type}

`string`

### _name <badge type="warning" text="protected" /> {#property--name}

The component name.

```js
BaseMenuToggle._name; // Default: `"MenuToggle"`.
```

#### Type {#property--name--type}

`string`

### _scope <badge type="warning" text="protected" /> {#property--scope}

The scope used for events and global storage.

```js
BaseMenuToggle._scope; // Default: `"AccessibleMenu"`.
```

#### Type {#property--scope--type}

`string`

### _eventPrefix <badge type="warning" text="protected" /> {#property--eventprefix}

The prefix used for event names. Menus, menu items, and toggles use `"accessibleMenu"`.

```js
BaseMenuToggle._eventPrefix; // Default: `"accessibleMenu"`.
```

#### Type {#property--eventprefix--type}

`string`

### _storageKey <badge type="warning" text="protected" /> {#property--storagekey}

The storage type used for the component.

```js
BaseMenuToggle._storageKey; // Default: `"menuToggles"`.
```

#### Type {#property--storagekey--type}

`string`

### _shouldStore <badge type="warning" text="protected" /> {#property--shouldstore}

A flag to store the component in global storage. Menu items and toggles are stored on their menus instead.

```js
BaseMenuToggle._shouldStore; // Default: `false`.
```

#### Type {#property--shouldstore--type}

`boolean`

### _id <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--id}

The main component ID.

```js
BaseMenuToggle._id; // Default: `""`.
```

#### Type {#property--id--type}

`string`

### _valid <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--valid}

The validation state.

```js
BaseMenuToggle._valid; // Default: `true`.
```

#### Type {#property--valid--type}

`boolean`

### _initialized <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--initialized}

A flag to check if the toggle has initialized successfully. This becomes `true` after the IDs, ARIA attributes, and initial expansion and lock states have been set.

```js
BaseMenuToggle._initialized; // Default: `false`.
```

#### Type {#property--initialized--type}

`boolean`

### _errors <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--errors}

The validation errors.

```js
BaseMenuToggle._errors; // Default: `[]`.
```

#### Type {#property--errors--type}

`Error[]`

### _expanded <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--expanded}

The current and committed expansion state, managed by Core.

```js
BaseMenuToggle._expanded; // Default: `new TransactionalValue(false)`.
```

#### Type {#property--expanded--type}

`TransactionalValue<boolean>`

### _locked <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--locked}

The current and committed lock state.

```js
BaseMenuToggle._locked; // Default: `new TransactionalValue(false)`.
```

#### Type {#property--locked--type}

`TransactionalValue<boolean>`

### _breakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--breakpoint}

The breakpoint used for responsive actions.

```js
BaseMenuToggle._breakpoint; // Default: `""`.
```

#### Type {#property--breakpoint--type}

`string`

### _mediaQueryString <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--mediaquerystring}

The explicit media query used for responsive actions.

```js
BaseMenuToggle._mediaQueryString; // Default: `""`.
```

#### Type {#property--mediaquerystring--type}

`string`

### _mediaQueryList <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--mediaquerylist}

The media query list used for responsive actions.

```js
BaseMenuToggle._mediaQueryList; // Default: `null`.
```

#### Type {#property--mediaquerylist--type}

`MediaQueryList|null`

### _expandInsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--expandinsidebreakpoint}

Whether to expand when inside the breakpoint.

```js
BaseMenuToggle._expandInsideBreakpoint; // Default: `false`.
```

#### Type {#property--expandinsidebreakpoint--type}

`boolean`

### _expandOutsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--expandoutsidebreakpoint}

Whether to expand when outside the breakpoint.

```js
BaseMenuToggle._expandOutsideBreakpoint; // Default: `false`.
```

#### Type {#property--expandoutsidebreakpoint--type}

`boolean`

### _collapseInsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--collapseinsidebreakpoint}

Whether to collapse when inside the breakpoint.

```js
BaseMenuToggle._collapseInsideBreakpoint; // Default: `false`.
```

#### Type {#property--collapseinsidebreakpoint--type}

`boolean`

### _collapseOutsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--collapseoutsidebreakpoint}

Whether to collapse when outside the breakpoint.

```js
BaseMenuToggle._collapseOutsideBreakpoint; // Default: `false`.
```

#### Type {#property--collapseoutsidebreakpoint--type}

`boolean`

### _lockInsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--lockinsidebreakpoint}

Whether to lock when inside the breakpoint.

```js
BaseMenuToggle._lockInsideBreakpoint; // Default: `false`.
```

#### Type {#property--lockinsidebreakpoint--type}

`boolean`

### _lockOutsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--lockoutsidebreakpoint}

Whether to lock when outside the breakpoint.

```js
BaseMenuToggle._lockOutsideBreakpoint; // Default: `false`.
```

#### Type {#property--lockoutsidebreakpoint--type}

`boolean`

### _unlockInsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--unlockinsidebreakpoint}

Whether to unlock when inside the breakpoint.

```js
BaseMenuToggle._unlockInsideBreakpoint; // Default: `false`.
```

#### Type {#property--unlockinsidebreakpoint--type}

`boolean`

### _unlockOutsideBreakpoint <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#property--unlockoutsidebreakpoint}

Whether to unlock when outside the breakpoint.

```js
BaseMenuToggle._unlockOutsideBreakpoint; // Default: `false`.
```

#### Type {#property--unlockoutsidebreakpoint--type}

`boolean`

## Getters and Setters

### dom <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--dom}

The DOM elements within the toggle.

::: code-group

```js [getter]
BaseMenuToggle.dom;
```

:::

See [_dom](#property--dom) for more information.

### elements <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--elements}

The declared accessible-menu elements within the toggle.

::: code-group

```js [getter]
BaseMenuToggle.elements;
```

:::

See [_elements](#property--elements) for more information.

### events <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--events}

Custom events that can be triggered throughout the menu toggle.

::: code-group

```js [getter]
BaseMenuToggle.events;
```

:::

See [_events](#property--events) for more information.

### isExpanded <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--isexpanded}

The current expansion state.

```js
BaseMenuToggle.isExpanded;
```

See [_expanded](#property--expanded) for more information.

### shouldBeExpanded <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--shouldbeexpanded}

The last committed expansion state.

```js
BaseMenuToggle.shouldBeExpanded;
```

See [_expanded](#property--expanded) for more information.

### isLocked <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--islocked}

The current lock state. Locked toggles ignore expand, preview, and collapse actions unless forced.

```js
BaseMenuToggle.isLocked;
```

See [_locked](#property--locked) for more information.

### shouldBeLocked <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--shouldbelocked}

The committed lock state.

```js
BaseMenuToggle.shouldBeLocked;
```

See [_locked](#property--locked) for more information.

### expandClass {#getter--expandclass}

Reads the controlled menu's `expandClass` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.expandClass;
```

```js [setter]
BaseMenuToggle.expandClass = "show";
```

:::

#### Type {#getter--expandclass--type}

`string|string[]`

### collapseClass {#getter--collapseclass}

Reads the controlled menu's `collapseClass` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.collapseClass;
```

```js [setter]
BaseMenuToggle.collapseClass = "hide";
```

:::

#### Type {#getter--collapseclass--type}

`string|string[]`

### transitionClass {#getter--transitionclass}

Reads the controlled menu's `transitionClass` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.transitionClass;
```

```js [setter]
BaseMenuToggle.transitionClass = "transitioning";
```

:::

#### Type {#getter--transitionclass--type}

`string|string[]`

### transitionDuration {#getter--transitionduration}

Reads the controlled menu's `transitionDuration` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.transitionDuration;
```

```js [setter]
BaseMenuToggle.transitionDuration = 250;
```

:::

#### Type {#getter--transitionduration--type}

`number`

### expandDuration {#getter--expandduration}

Reads the controlled menu's `expandDuration` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.expandDuration;
```

```js [setter]
BaseMenuToggle.expandDuration = 250;
```

:::

#### Type {#getter--expandduration--type}

`number`

### collapseDuration {#getter--collapseduration}

Reads the controlled menu's `collapseDuration` setting. Setting this property updates the root menu's setting, including its validation and CSS custom property updates. Core uses this accessor for transitions.

::: code-group

```js [getter]
BaseMenuToggle.collapseDuration;
```

```js [setter]
BaseMenuToggle.collapseDuration = 250;
```

:::

#### Type {#getter--collapseduration--type}

`number`

### currentEvent {#getter-setter--currentevent}

The last event triggered anywhere in the menu tree. Reading this value returns the root menu's current event. Setting it updates the root menu.

::: code-group

```js [getter]
BaseMenuToggle.currentEvent;
```

```js [setter]
BaseMenuToggle.currentEvent = "mouse";
```

:::

#### Type {#getter-setter--currentevent--type}

`string`

### shouldFocus <badge type="warning" text="readonly" /> {#getter--shouldfocus}

The root menu's decision about whether focus methods should move DOM focus. This follows the root menu's keyboard and character navigation behavior.

::: code-group

```js [getter]
BaseMenuToggle.shouldFocus;
```

:::

#### Type {#getter--shouldfocus--type}

`boolean`

### rootDOMElement <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--rootdomelement}

The root DOM element of the component.

::: code-group

```js [getter]
BaseMenuToggle.rootDOMElement;
```

:::

#### Type {#getter--rootdomelement--type}

`HTMLElement`

### selectors <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--selectors}

The query selectors used by the component.

::: code-group

```js [getter]
BaseMenuToggle.selectors;
```

:::

#### Type {#getter--selectors--type}

`object`

### classes <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--classes}

The CSS classes to apply when the component is in various states.

::: code-group

```js [getter]
BaseMenuToggle.classes;
```

:::

#### Type {#getter--classes--type}

`object`

### durations <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--durations}

The duration times (in milliseconds) for various aspects throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.durations;
```

:::

#### Type {#getter--durations--type}

`object`

### delays <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--delays}

The delay times (in milliseconds) for various aspects throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.delays;
```

:::

#### Type {#getter--delays--type}

`object`

### frames <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--frames}

Pending animation frame IDs, stored by scope. A completed or cancelled frame is removed from this object.

::: code-group

```js [getter]
BaseMenuToggle.frames;
```

:::

#### Type {#getter--frames--type}

`Object<string, number>`

### intervals <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--intervals}

Intervals throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.intervals;
```

:::

#### Type {#getter--intervals--type}

`object`

### timeouts <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--timeouts}

Timeouts throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.timeouts;
```

:::

#### Type {#getter--timeouts--type}

`object`

### listeners <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--listeners}

Event listeners throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.listeners;
```

:::

#### Type {#getter--listeners--type}

`object[]`

### initializeClass <badge type="tip" text="inherited" /> {#getter-setter--initializeclass}

The class(es) to apply when the component is in the initialization state.

::: code-group

```js [getter]
BaseMenuToggle.initializeClass;
```

```js [setter]
BaseMenuToggle.initializeClass = "initializing";
```

:::

#### Type {#getter-setter--initializeclass--type}

`string|string[]`

### focusState <badge type="tip" text="inherited" /> {#getter-setter--focusstate}

The current state of the component's focus.

::: code-group

```js [getter]
BaseMenuToggle.focusState;
```

```js [setter]
BaseMenuToggle.focusState = "";
```

:::

#### Type {#getter-setter--focusstate--type}

`string`

### prefix <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--prefix}

The prefix used for CSS custom properties and attributes.

::: code-group

```js [getter]
BaseMenuToggle.prefix;
```

:::

#### Type {#getter--prefix--type}

`string`

### key <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--key}

The key used to generate IDs throughout the component.

::: code-group

```js [getter]
BaseMenuToggle.key;
```

:::

#### Type {#getter--key--type}

`string`

### name <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--name}

The component name.

::: code-group

```js [getter]
BaseMenuToggle.name;
```

:::

#### Type {#getter--name--type}

`string`

### eventPrefix <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--eventprefix}

The prefix used when registering events. Returns `"accessibleMenu"` by default. Inherited from Core and read-only. Subclasses can override `_eventPrefix` before bootstrapping.

::: code-group

```js [getter]
BaseMenuToggle.eventPrefix;
```

:::

#### Type {#getter--eventprefix--type}

`string`

### scope <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--scope}

The scope of the component.

::: code-group

```js [getter]
BaseMenuToggle.scope;
```

:::

#### Type {#getter--scope--type}

`string`

### id <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--id}

The main ID of the component.

::: code-group

```js [getter]
BaseMenuToggle.id;
```

:::

#### Type {#getter--id--type}

`string`

### isValid <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--isvalid}

The validity state of the component.

::: code-group

```js [getter]
BaseMenuToggle.isValid;
```

:::

#### Type {#getter--isvalid--type}

`boolean`

### isInitialized <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--isinitialized}

The initialized state of the component.

::: code-group

```js [getter]
BaseMenuToggle.isInitialized;
```

:::

#### Type {#getter--isinitialized--type}

`boolean`

### errors <badge type="warning" text="readonly" /> <badge type="tip" text="inherited" /> {#getter--errors}

An array containing validation errors.

::: code-group

```js [getter]
BaseMenuToggle.errors;
```

:::

#### Type {#getter--errors--type}

`Error[]`

### breakpoint <badge type="tip" text="inherited" /> {#getter-setter--breakpoint}

The breakpoint used to generate the controller's media query when no explicit `mediaQuery` is set.

Changing this value after initialization automatically replaces the media-query listener. See [changing the query after initialization](./base-menu#changing-the-query-after-initialization).

::: code-group

```js [getter]
BaseMenuToggle.breakpoint;
```

```js [setter]
BaseMenuToggle.breakpoint = "";
```

:::

#### Type {#getter-setter--breakpoint--type}

`string`

### mediaQuery <badge type="tip" text="inherited" /> {#getter-setter--mediaquery}

The explicit media query used by the controller. An empty string uses the query generated from `breakpoint`.

Changing this value after initialization automatically replaces the media-query listener. See [changing the query after initialization](./base-menu#changing-the-query-after-initialization).

::: code-group

```js [getter]
BaseMenuToggle.mediaQuery;
```

```js [setter]
BaseMenuToggle.mediaQuery = "";
```

:::

#### Type {#getter-setter--mediaquery--type}

`string`

### lockedClass <badge type="tip" text="inherited" /> {#getter-setter--lockedclass}

The class(es) to apply when the component is in the locked state.

::: code-group

```js [getter]
BaseMenuToggle.lockedClass;
```

```js [setter]
BaseMenuToggle.lockedClass = "initializing";
```

:::

#### Type {#getter-setter--lockedclass--type}

`string|string[]`

### unlockedClass <badge type="tip" text="inherited" /> {#getter-setter--unlockedclass}

The class(es) to apply when the component is in the unlocked state.

::: code-group

```js [getter]
BaseMenuToggle.unlockedClass;
```

```js [setter]
BaseMenuToggle.unlockedClass = "initializing";
```

:::

#### Type {#getter-setter--unlockedclass--type}

`string|string[]`

### expandOnFocus <badge type="tip" text="inherited" /> {#getter-setter--expandonfocus}

Inherited from Core, but not used by Accessible Menu's focus handlers. Setting this value does not make the menu expand when its toggle receives focus.

::: code-group

```js [getter]
BaseMenuToggle.expandOnFocus;
```

```js [setter]
BaseMenuToggle.expandOnFocus = true;
```

:::

#### Type {#getter-setter--expandonfocus--type}

`boolean|undefined`

The menu does not set a default value.

### collapseOnBlur <badge type="tip" text="inherited" /> {#getter-setter--collapseonblur}

Inherited from Core, but not used by Accessible Menu's focus handlers. Setting this value does not make the menu collapse when its toggle loses focus.

::: code-group

```js [getter]
BaseMenuToggle.collapseOnBlur;
```

```js [setter]
BaseMenuToggle.collapseOnBlur = true;
```

:::

#### Type {#getter-setter--collapseonblur--type}

`boolean|undefined`

The menu does not set a default value.

### expandInsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--expandinsidebreakpoint}

A flag to expand the component when inside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.expandInsideBreakpoint;
```

```js [setter]
BaseMenuToggle.expandInsideBreakpoint = true;
```

:::

#### Type {#getter-setter--expandinsidebreakpoint--type}

`boolean`

### expandOutsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--expandoutsidebreakpoint}

A flag to expand the component when outside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.expandOutsideBreakpoint;
```

```js [setter]
BaseMenuToggle.expandOutsideBreakpoint = true;
```

:::

#### Type {#getter-setter--expandoutsidebreakpoint--type}

`boolean`

### collapseInsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--collapseinsidebreakpoint}

A flag to collapse the component when inside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.collapseInsideBreakpoint;
```

```js [setter]
BaseMenuToggle.collapseInsideBreakpoint = true;
```

:::

#### Type {#getter-setter--collapseinsidebreakpoint--type}

`boolean`

### collapseOutsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--collapseoutsidebreakpoint}

A flag to collapse the component when outside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.collapseOutsideBreakpoint;
```

```js [setter]
BaseMenuToggle.collapseOutsideBreakpoint = true;
```

:::

#### Type {#getter-setter--collapseoutsidebreakpoint--type}

`boolean`

### lockInsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--lockinsidebreakpoint}

A flag to lock the component in its current state when inside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.lockInsideBreakpoint;
```

```js [setter]
BaseMenuToggle.lockInsideBreakpoint = true;
```

:::

#### Type {#getter-setter--lockinsidebreakpoint--type}

`boolean`

### lockOutsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--lockoutsidebreakpoint}

A flag to lock the component in its current state when outside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.lockOutsideBreakpoint;
```

```js [setter]
BaseMenuToggle.lockOutsideBreakpoint = true;
```

:::

#### Type {#getter-setter--lockoutsidebreakpoint--type}

`boolean`

### unlockInsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--unlockinsidebreakpoint}

A flag to unlock the component when inside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.unlockInsideBreakpoint;
```

```js [setter]
BaseMenuToggle.unlockInsideBreakpoint = true;
```

:::

#### Type {#getter-setter--unlockinsidebreakpoint--type}

`boolean`

### unlockOutsideBreakpoint <badge type="tip" text="inherited" /> {#getter-setter--unlockoutsidebreakpoint}

A flag to unlock the component when outside the breakpoint.

::: code-group

```js [getter]
BaseMenuToggle.unlockOutsideBreakpoint;
```

```js [setter]
BaseMenuToggle.unlockOutsideBreakpoint = true;
```

:::

#### Type {#getter-setter--unlockoutsidebreakpoint--type}

`boolean`

## Methods

### _setIds <badge type="warning" text="protected" /> {#method--setIds}

Sets unique IDs for the toggle and controlled menu.

```js
BaseMenuToggle._setIds();
```

If the toggle and controlled menu do not have IDs, the following steps take place:

- Generate a random string 1-10 characters long,
- Get the innerText of the toggle,
- Set the toggle's ID to: `menu-button-${toggle-inner-text}-${key}`
- Set the menu's ID to: `menu-${toggle-inner-text}-${key}`

This hook also sets Core's `_id` to the controller element's ID, so the inherited `id` getter reports the toggle ID after initialization.

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
BaseMenuToggle._setAriaAttributes();
```

The first steps are to ensure that the toggle has `aria-expanded` is initially set to "false".

Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to the toggle's ID.

### _dispatchEvent <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--dispatchevent}

Inherited from Core's `Component`. Dispatches a registered custom event on the root controller or an explicitly supplied element.

```js
BaseMenuToggle._dispatchEvent(eventType, element);
```

#### Parameters {#method--dispatchevent--parameters}

| Name      | Type          | Description               | Default               |
| --------- | ------------- | ------------------------- | --------------------- |
| eventType | `string`      | The registered event key. | `undefined`           |
| element   | `HTMLElement` | The target element.       | `this.rootDOMElement` |

Unregistered event keys and invalid target elements cause a `TypeError`.

### _expand <badge type="warning" text="protected" /> {#method--protected-expand}

Sets the root menu's `hasExpanded` value to `true`, then calls Core's `_expand()` method to set the ARIA attributes, classes, and transitions. If `emit` is `true`, this also emits the expand event.

```js
BaseMenuToggle._expand({ emit, transition });
```

#### Parameters {#method--protected-expand--parameters}

| Name               | Type      | Description                                    | Default              |
| ------------------ | --------- | ---------------------------------------------- | -------------------- |
| options            | `object`  | Expansion options.                             | `{}`                 |
| options.emit       | `boolean` | Emit preexpand, expand, and postexpand events. | `this.isInitialized` |
| options.transition | `boolean` | Use transition classes and durations.          | `this.isInitialized` |

### _collapse <badge type="warning" text="protected" /> <badge type="tip" text="inherited" /> {#method--protected-collapse}

Inherited directly from Core's `CollapsibleComponent`. Sets the controller's `aria-expanded` to `false` and applies collapsed classes and transitions to the controlled menu.

```js
BaseMenuToggle._collapse({ emit, transition });
```

#### Parameters {#method--protected-collapse--parameters}

| Name               | Type      | Description                                          | Default              |
| ------------------ | --------- | ---------------------------------------------------- | -------------------- |
| options            | `object`  | Collapse options.                                    | `{}`                 |
| options.emit       | `boolean` | Emit precollapse, collapse, and postcollapse events. | `this.isInitialized` |
| options.transition | `boolean` | Use transition classes and durations.                | `this.isInitialized` |

### expand <badge type="tip" text="public" /> {#method--expand}

Opens the controlled menu.

The action is skipped while locked unless `force` is `true`.

```js
BaseMenuToggle.expand({ force, preserveState, emit, transition });
```

Calls [_expand](#method--protected-expand) and sets [isExpanded](#getter--isexpanded) to `true`.

If the toggle is initialized, also sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "self" and its parent menu's focus state to "child", if it has a parent menu.

#### Parameters {#method--expand--parameters}

| Name                  | Type      | Description                             | Default               |
| --------------------- | --------- | --------------------------------------- | --------------------- |
| options               | `object`  | The options for opening the menu.       | `{}`                  |
| options.force         | `boolean` | A flag to force the menu to open.       | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.   | `false`               |
| options.emit          | `boolean` | A flag to emit the expand event.        | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when opening. | `this.isInitialized`  |

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

The action is skipped while locked unless `force` is `true`.

```js
BaseMenuToggle.preview({ force, preserveState, emit, transition });
```

Calls [_expand](#method--protected-expand) and sets [isExpanded](#getter--isexpanded) to `true`.

If the toggle is initialized and has a parent menu, also sets that menu's [focus state](./base-menu#getter-setter--focusstate) to "self". This keeps focus outside the submenu.

#### Parameters {#method--preview--parameters}

| Name                  | Type      | Description                                | Default               |
| --------------------- | --------- | ------------------------------------------ | --------------------- |
| options               | `object`  | The options for previewing the menu.       | `{}`                  |
| options.force         | `boolean` | A flag to force the menu to preview.       | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.      | `false`               |
| options.emit          | `boolean` | A flag to emit the expand event.           | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when previewing. | `this.isInitialized`  |

### collapse <badge type="tip" text="public" /> {#method--collapse}

Closes the controlled menu.

The action is skipped while locked unless `force` is `true`.

```js
BaseMenuToggle.collapse({ force, preserveState, emit, transition });
```

Calls [_collapse](#method--protected-collapse) and sets [isExpanded](#getter--isexpanded) to `false`.

If the toggle is initialized, also blurs the controlled menu, setting its [focus state](./base-menu#getter-setter--focusstate) to "none", and sets the parent menu's focus state to "self", if there is a parent menu.

#### Parameters {#method--collapse--parameters}

| Name                  | Type      | Description                             | Default               |
| --------------------- | --------- | --------------------------------------- | --------------------- |
| options               | `object`  | The options for closing the menu.       | `{}`                  |
| options.force         | `boolean` | A flag to force the menu to close.      | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.   | `false`               |
| options.emit          | `boolean` | A flag to emit the collapse event.      | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when closing. | `this.isInitialized`  |

### toggle <badge type="tip" text="public" /> <badge type="tip" text="inherited" /> {#method--toggle}

Toggles the open state of the controlled menu between `true` and `false`.

```js
BaseMenuToggle.toggle({ force, preserveState, emit, transition });
```

#### Parameters {#method--toggle--parameters}

| Name                  | Type      | Description                               | Default               |
| --------------------- | --------- | ----------------------------------------- | --------------------- |
| options               | `object`  | The options for toggling the menu.        | `{}`                  |
| options.force         | `boolean` | A flag to force the menu to open/close.   | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.     | `false`               |
| options.emit          | `boolean` | A flag to emit the expand/collapse event. | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when toggling.  | `this.isInitialized`  |

### collapseSiblings <badge type="tip" text="public" /> {#method--collapsesiblings}

Closes all sibling menus.

```js
BaseMenuToggle.collapseSiblings({ force, preserveState, emit, transition });
```

#### Parameters {#method--collapsesiblings--parameters}

| Name                  | Type      | Description                                | Default               |
| --------------------- | --------- | ------------------------------------------ | --------------------- |
| options               | `object`  | The options for closing the sibling menus. | `{}`                  |
| options.force         | `boolean` | A flag to force the menus to close.        | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.      | `false`               |
| options.emit          | `boolean` | A flag to emit the collapse event.         | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when closing.    | `this.isInitialized`  |

### collapseChildren <badge type="tip" text="public" /> {#method--collapsechildren}

Closes all child menus.

```js
BaseMenuToggle.collapseChildren({ force, preserveState, emit, transition });
```

#### Parameters {#method--collapsechildren--parameters}

| Name                  | Type      | Description                              | Default               |
| --------------------- | --------- | ---------------------------------------- | --------------------- |
| options               | `object`  | The options for closing the child menus. | `{}`                  |
| options.force         | `boolean` | A flag to force the menus to close.      | `!this.isInitialized` |
| options.preserveState | `boolean` | A flag to preserve the current state.    | `false`               |
| options.emit          | `boolean` | A flag to emit the collapse event.       | `this.isInitialized`  |
| options.transition    | `boolean` | A flag to use transitions when closing.  | `this.isInitialized`  |

### _bootstrap

Registers the menu toggle's validation event listener.

Validation checks the required DOM elements, controlled menu, and parent menu.

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

### _validate <badge type="tip" text="inherited" />

Validates all aspects of the component to ensure proper functionality.

Keys are altered to match the arguments passed in during creation where possible.

```js
_validate();
```

Returns `boolean`: The result of the validation checks.

### _generateKey <badge type="tip" text="inherited" />

Generates a key for the component.

```js
_generateKey((regenerate = false));
```

| Parameter              | Type      | Description                                           |
| ---------------------- | --------- | ----------------------------------------------------- |
| `[regenerate = false]` | `boolean` | A flag to determine if the key should be regenerated. |

### _setCustomProps <badge type="tip" text="inherited" />

Sets custom props throughout the component.

```js
_setCustomProps();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _setDOMElementType <badge type="tip" text="inherited" />

Sets DOM elements throughout the component.

Elements listed in _protectedDOMElements cannot be set using this method.

```js
_setDOMElementType(
  elementType,
  ({ context, overwrite = true, strict = false } = {})
);
```

| Parameter                    | Type                          | Description                                                        |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| `elementType`                | `string`                      | The type of element to populate.                                   |
| `[options = {}]`             | `Object<HTMLElement,boolean>` | The options for setting the DOM element type.                      |
| `[options.context]`          | `HTMLElement`                 | The element used as the base context for the querySelector.        |
| `[options.overwrite = true]` | `boolean`                     | A flag to set if the existing elements will be overwritten.        |
| `[options.strict = false]`   | `boolean`                     | A flag to set if the elements must be direct children of the base. |

### _resetDOMElementType <badge type="tip" text="inherited" />

Resets DOM elements throughout the component.

Elements listed in _protectedDOMElements cannot be reset using this method.

```js
_resetDOMElementType(elementType);
```

| Parameter     | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `elementType` | `string` | The type of element to clear. |

### _setDOMElements <badge type="tip" text="inherited" />

Sets all DOM elements throughout the component.

Utilizes _setDOMElementType and _resetDOMElementType.

```js
_setDOMElements();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _createChildElements <badge type="tip" text="inherited" />

Creates and initializes child elements throughout the component.

```js
_createChildElements();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleFocus <badge type="tip" text="inherited" />

Handles focus events through the component.

```js
_handleFocus();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleClick <badge type="tip" text="inherited" />

Handles click events through the component.

```js
_handleClick();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleHover <badge type="tip" text="inherited" />

Handles hover events through the component.

```js
_handleHover();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleKeydown <badge type="tip" text="inherited" />

Handles keydown events through the component.

```js
_handleKeydown();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleKeyup <badge type="tip" text="inherited" />

Handles keyup events through the component.

```js
_handleKeyup();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _store <badge type="tip" text="inherited" />

Stores the component into the global storage object.

```js
_store();
```

### _unstore <badge type="tip" text="inherited" />

Removes the component from the global storage object.

```js
_unstore();
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

### _setTimeout <badge type="tip" text="inherited" />

Sets a timeout within the component.

```js
_setTimeout(callback, delay, (scope = "_default"));
```

| Parameter            | Type       | Description                                                        |
| -------------------- | ---------- | ------------------------------------------------------------------ |
| `[callback]`         | `Function` | The callback function.                                             |
| `[delay]`            | `number`   | The time (in milliseconds) of the delay.                           |
| `[scope = _default]` | `string`   | The scope of the timeout (used to store the timeout in _timeouts). |

### _clearTimeout <badge type="tip" text="inherited" />

Clears a timeout within the component.

```js
_clearTimeout((scope = "_default"));
```

| Parameter            | Type     | Description                                                        |
| -------------------- | -------- | ------------------------------------------------------------------ |
| `[scope = _default]` | `string` | The scope of the timeout (used to get the timeout from _timeouts). |

### _clearTimeouts <badge type="tip" text="inherited" />

Clears all timeouts within the component.

```js
_clearTimeouts();
```

### _requestAnimationFrame <badge type="tip" text="inherited" />

Schedules a callback for the next animation frame. Replaces any pending frame in the same scope.

```js
BaseMenuToggle._requestAnimationFrame(callback, scope);
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
BaseMenuToggle._cancelAnimationFrame(scope);
```

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| scope | `string` | The scope of the frame to cancel. | `"_default"` |

### _cancelAnimationFrames <badge type="tip" text="inherited" />

Cancels all pending animation frames tracked by the component.

```js
BaseMenuToggle._cancelAnimationFrames();
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

### _addEventListener <badge type="tip" text="inherited" />

Add an event listener to an element and register it within the component.

```js
_addEventListener(type, element, listener, (options = {}));
```

| Parameter        | Type              | Description                         |
| ---------------- | ----------------- | ----------------------------------- |
| `type`           | `string`          | The type of event to listen for.    |
| `element`        | `HTMLElement`     | The element to add the listener to. |
| `listener`       | `Function`        | The listener callback.              |
| `[options = {}]` | `object\|boolean` | Options to pass to the listener.    |

### _removeEventListener <badge type="tip" text="inherited" />

Remove an event listener from an element and unregister it within the component.

```js
_removeEventListener(type, element, listener, (options = {}));
```

| Parameter        | Type              | Description                              |
| ---------------- | ----------------- | ---------------------------------------- |
| `type`           | `string`          | The type of event to remove.             |
| `element`        | `HTMLElement`     | The element to remove the listener from. |
| `listener`       | `Function`        | The listener callback.                   |
| `[options = {}]` | `object\|boolean` | Options to pass to the listener.         |

### _removeEventListeners <badge type="tip" text="inherited" />

Removes all event listeners registered in the component.

This can be filtered by type and/or element.

```js
_removeEventListeners(({ type = null, element = null } = {}));
```

| Parameter                  | Type           | Description                                                              |
| -------------------------- | -------------- | ------------------------------------------------------------------------ |
| `[options = {}]`           | `object`       | Options for removing listeners.                                          |
| `[options.type = null]`    | `?string`      | The type of event to remove. If null, all types are removed.             |
| `[options.element = null]` | `?HTMLElement` | The element to remove listeners from. If null, all elements are removed. |

### focus <badge type="tip" text="inherited" />

Sets the toggle's focus state to `"self"` immediately. Calls its controller element's DOM `focus()` method immediately if the root menu's [shouldFocus](./base-menu#getter--shouldfocus) value is `true`.

```js
focus();
```

### blur <badge type="tip" text="inherited" />

Sets the toggle's focus state to `"none"` immediately. Calls its controller element's DOM `blur()` method immediately if the root menu allows focus.

```js
blur();
```

### dispose <badge type="tip" text="inherited" />

Disposes of the current instantiated component.

Removes all intervals, timeouts, pending animation frames, and event listeners, and removes the component from global storage. This does not delete references to the component held by your code.

```js
dispose();
```

### _mediaQueryListEventCallback <badge type="tip" text="inherited" />

A callback for media query list events.

```js
_mediaQueryListEventCallback(event);
```

| Parameter | Type                  | Description |
| --------- | --------------------- | ----------- |
| `event`   | `MediaQueryListEvent` | The event.  |

### _handleMediaMatch <badge type="tip" text="inherited" />

Removes the previous media-query listener and cancels its pending callback. Registers a listener for the current query and schedules its initial callback for the next animation frame. If the query is empty, removes the previous listener without creating another one.

The breakpoint and mediaQuery setters call this method automatically after initialization. See [changing the query after initialization](./base-menu#changing-the-query-after-initialization).

```js
_handleMediaMatch();
```

### _lock <badge type="tip" text="inherited" />

Applies the required attributes and classes for the component's locked state.

```js
_lock(({ emit = this.isInitialized } = {}));
```

| Parameter                             | Type              | Description                        |
| ------------------------------------- | ----------------- | ---------------------------------- |
| `[options = {}]`                      | `Object<boolean>` | Options for locking the component. |
| `[options.emit = this.isInitialized]` | `boolean`         | Emit the lock events.              |

### _unlock <badge type="tip" text="inherited" />

Applies the required attributes and classes for the component's unlocked state.

```js
_unlock(({ emit = this.isInitialized } = {}));
```

| Parameter                             | Type              | Description                          |
| ------------------------------------- | ----------------- | ------------------------------------ |
| `[options = {}]`                      | `Object<boolean>` | Options for unlocking the component. |
| `[options.emit = this.isInitialized]` | `boolean`         | Emit the unlock events.              |

### lock <badge type="tip" text="inherited" />

Locks the component.

```js
lock(
  ({
    force = !this.isInitialized,
    emit = this.isInitialized,
    preserveState = false,
  } = {})
);
```

| Parameter                               | Type              | Description                        |
| --------------------------------------- | ----------------- | ---------------------------------- |
| `[options = {}]`                        | `Object<boolean>` | Options for locking the component. |
| `[options.force = !this.isInitialized]` | `boolean`         | Force the lock action.             |
| `[options.emit = this.isInitialized]`   | `boolean`         | Emit the lock events.              |
| `[options.preserveState = false]`       | `boolean`         | Preserve the locked state.         |

### unlock <badge type="tip" text="inherited" />

Unlocks the component.

```js
unlock(
  ({
    force = !this.isInitialized,
    emit = this.isInitialized,
    preserveState = false,
  } = {})
);
```

| Parameter                               | Type              | Description                          |
| --------------------------------------- | ----------------- | ------------------------------------ |
| `[options = {}]`                        | `Object<boolean>` | Options for unlocking the component. |
| `[options.force = !this.isInitialized]` | `boolean`         | Force the unlock action.             |
| `[options.emit = this.isInitialized]`   | `boolean`         | Emit the unlock event.               |
| `[options.preserveState = false]`       | `boolean`         | Preserve the unlocked state.         |

### toggleLock <badge type="tip" text="inherited" />

Toggles locking and unlocking the component.

```js
toggleLock(
  ({
    force = !this.isInitialized,
    emit = this.isInitialized,
    preserveState = false,
  } = {})
);
```

| Parameter                               | Type              | Description                                  |
| --------------------------------------- | ----------------- | -------------------------------------------- |
| `[options = {}]`                        | `Object<boolean>` | Options for locking/unlocking the component. |
| `[options.force = !this.isInitialized]` | `boolean`         | Force the toggle action.                     |
| `[options.emit = this.isInitialized]`   | `boolean`         | Emit the lock/unlock events.                 |
| `[options.preserveState = false]`       | `boolean`         | Preserve the locked state.                   |
