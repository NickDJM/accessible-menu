# BaseMenuItem

A basic navigation link contained inside of a [BaseMenu](./base-menu).

## Constructor

Constructs a new `BaseMenuItem`.

```js
new BaseMenuItem({
  menuItemElement,
  menuLinkElement,
  parentMenu,
  isSubmenuItem,
  childMenu,
  toggle,
  submenuSibling,
});
```

The constructor populates the dom, elements, and submenu properties. It will _not_ initialize the menu item; this is left to the subclasses to evoke.

### Parameters {#constructor--parameters}

| Name                    | Type                     | Description                                                        | Default     |
| ----------------------- | ------------------------ | ------------------------------------------------------------------ | ----------- |
| options                 | `object`                 | The options for generating the menu item.                          | `undefined` |
| options.menuItemElement | `HTMLElement`            | The menu item in the DOM.                                          | `undefined` |
| options.menuLinkElement | `HTMLElement`            | The menu item's link in the DOM.                                   | `undefined` |
| options.parentMenu      | `BaseMenu`               | The parent menu.                                                   | `undefined` |
| options.isSubmenuItem   | `boolean`                | A flag to mark if the menu item is controlling a submenu.          | `false`     |
| options.childMenu       | `BaseMenu`, `null`       | The child menu.                                                    | `null`      |
| options.toggle          | `BaseMenuToggle`, `null` | The controller for the child menu.                                 | `null`      |
| options.submenuSibling  | `BaseMenuItem`, `null`   | The separate menu item that controls the submenu beside this link. | `null`      |

## Initialize

Initialize the menu item.

```js
BaseMenuItem.initialize();
```

Calls Core's initialization method to validate the item and run its initialization hooks and listeners. If initialization succeeds, sets `isInitialized` to `true`. If it fails, sets `isValid` to `false` and logs the error. Validation errors are available through `errors`.

## Properties

The following properties include fields inherited from Core's `Component` class. Each menu or menu item has its own field values.

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu item.

```js
BaseMenuItem._dom;
```

#### Type {#property--dom--type}

`Object<string, HTMLElement>`

#### Properties {#property--dom--properties}

| Name | Type          | Description           | Default           |
| ---- | ------------- | --------------------- | ----------------- |
| item | `HTMLElement` | The menu item.        | `menuItemElement` |
| link | `HTMLElement` | The menu item's link. | `menuLinkElement` |

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu item.

```js
BaseMenuItem._elements;
```

#### Type {#property--elements--type}

`Object<string, BaseMenu|BaseMenuToggle|BaseMenuItem|null>`

#### Properties {#property--elements--properties}

| Name       | Type                     | Description                                                          | Default      |
| ---------- | ------------------------ | -------------------------------------------------------------------- | ------------ |
| parentMenu | `BaseMenu`               | The menu containing this menu item.                                  | `parentMenu` |
| childMenu  | `BaseMenu`, `null`       | The menu contained within this menu item.                            | `null`       |
| toggle     | `BaseMenuToggle`, `null` | The menu toggle within this menu item that controls the `childMenu`. | `null`       |
| sibling    | `BaseMenuItem`, `null`   | The separate menu item that controls the submenu beside this link.   | `null`       |

### _submenu <badge type="warning" text="protected" /> {#property--submenu}

A flag marking a submenu item.

```js
BaseMenuItem._submenu; // Default: `false`.
```

#### Type {#property--submenu--type}

`boolean`

### _rootDOMElement <badge type="warning" text="protected" /> {#property--rootdomelement}

The key used to get the root element from _dom.

```js
BaseMenuItem._rootDOMElement; // Default: `"item"`.
```

#### Type {#property--rootdomelement--type}

`string`

### _protectedDOMElements <badge type="warning" text="protected" /> {#property--protecteddomelements}

DOM element keys that cannot be generated or reset.

```js
BaseMenuItem._protectedDOMElements; // Default: `["item", "link"]`.
```

#### Type {#property--protecteddomelements--type}

`string[]`

### _selectors <badge type="warning" text="protected" /> {#property--selectors}

The query selectors used to populate the DOM elements.

```js
BaseMenuItem._selectors; // Default: `{}`.
```

#### Type {#property--selectors--type}

`Object<string, string>`

### _classes <badge type="warning" text="protected" /> {#property--classes}

The classes to apply in each component state.

```js
BaseMenuItem._classes; // Default: `{ initialize: "" }`.
```

#### Type {#property--classes--type}

`Object<string, string|string[]>`

### _durations <badge type="warning" text="protected" /> {#property--durations}

The duration times (in milliseconds) for component transitions.

```js
BaseMenuItem._durations; // Default: `{}`.
```

#### Type {#property--durations--type}

`Object<string, number>`

### _delays <badge type="warning" text="protected" /> {#property--delays}

The delay times (in milliseconds) for component events.

```js
BaseMenuItem._delays; // Default: `{}`.
```

#### Type {#property--delays--type}

`Object<string, number>`

### _focusState <badge type="warning" text="protected" /> {#property--focusstate}

The current focus state.

```js
BaseMenuItem._focusState; // Default: `"none"`.
```

#### Type {#property--focusstate--type}

`string`

### _currentEvent <badge type="warning" text="protected" /> {#property--currentevent}

The last type of event triggered within the component.

```js
BaseMenuItem._currentEvent; // Default: `"none"`.
```

#### Type {#property--currentevent--type}

`string`

### _intervals <badge type="warning" text="protected" /> {#property--intervals}

Interval IDs indexed by scope.

```js
BaseMenuItem._intervals; // Default: `{}`.
```

#### Type {#property--intervals--type}

`Object<string, number>`

### _timeouts <badge type="warning" text="protected" /> {#property--timeouts}

Timeout IDs indexed by scope.

```js
BaseMenuItem._timeouts; // Default: `{}`.
```

#### Type {#property--timeouts--type}

`Object<string, number>`

### _listeners <badge type="warning" text="protected" /> {#property--listeners}

The registered event listeners.

```js
BaseMenuItem._listeners; // Default: `[]`.
```

#### Type {#property--listeners--type}

`object[]`

### _events <badge type="warning" text="protected" /> {#property--events}

The custom events available on the component.

```js
BaseMenuItem._events; // Default: `{}`.
```

#### Type {#property--events--type}

`Object<string, CustomEvent>`

The constructor registers the `prevalidate`, `validate`, `postvalidate`, `preinitialize`, `initialize`, and `postinitialize` events. Each event includes `{ component: this }` in its `detail`.

Use `getEventName(type)` to get the DOM event name. These events bubble, so custom listeners should check `event.detail.component === this` before running.

### _prefix <badge type="warning" text="protected" /> {#property--prefix}

The prefix used for CSS custom properties and attributes.

```js
BaseMenuItem._prefix; // Default: `"am-"`.
```

#### Type {#property--prefix--type}

`string`

### _key <badge type="warning" text="protected" /> {#property--key}

The key used to generate IDs.

```js
BaseMenuItem._key; // Default: `""`.
```

#### Type {#property--key--type}

`string`

### _name <badge type="warning" text="protected" /> {#property--name}

The component name.

```js
BaseMenuItem._name; // Default: `"MenuItem"`.
```

#### Type {#property--name--type}

`string`

### _scope <badge type="warning" text="protected" /> {#property--scope}

The scope used for events and global storage.

```js
BaseMenuItem._scope; // Default: `"AccessibleMenu"`.
```

#### Type {#property--scope--type}

`string`

### _eventPrefix <badge type="warning" text="protected" /> {#property--eventprefix}

The prefix used for event names. Menus, menu items, and toggles use `"accessibleMenu"`.

```js
BaseMenuItem._eventPrefix; // Default: `"accessibleMenu"`.
```

#### Type {#property--eventprefix--type}

`string`

### _storageKey <badge type="warning" text="protected" /> {#property--storagekey}

The storage type used for the component.

```js
BaseMenuItem._storageKey; // Default: `"menuItems"`.
```

#### Type {#property--storagekey--type}

`string`

### _shouldStore <badge type="warning" text="protected" /> {#property--shouldstore}

A flag to store the component in global storage. Menu items and toggles are stored on their menus instead.

```js
BaseMenuItem._shouldStore; // Default: `false`.
```

#### Type {#property--shouldstore--type}

`boolean`

### _id <badge type="warning" text="protected" /> {#property--id}

The main component ID.

```js
BaseMenuItem._id; // Default: `""`.
```

#### Type {#property--id--type}

`string`

### _valid <badge type="warning" text="protected" /> {#property--valid}

The validation state.

```js
BaseMenuItem._valid; // Default: `true`.
```

#### Type {#property--valid--type}

`boolean`

### _initialized <badge type="warning" text="protected" /> {#property--initialized}

A flag to check if the component has initialized successfully.

```js
BaseMenuItem._initialized; // Default: `false`.
```

#### Type {#property--initialized--type}

`boolean`

### _errors <badge type="warning" text="protected" /> {#property--errors}

The validation errors.

```js
BaseMenuItem._errors; // Default: `[]`.
```

#### Type {#property--errors--type}

`Error[]`

## Getters and Setters

### dom <badge type="warning" text="readonly" /> {#getter--dom}

The DOM elements within the menu item.

::: code-group

```js [getter]
BaseMenuItem.dom;
```

:::

See [_dom](#property--dom) for more information.

### elements <badge type="warning" text="readonly" /> {#getter--elements}

The declared accessible-menu elements within the menu item.

::: code-group

```js [getter]
BaseMenuItem.elements;
```

:::

See [_elements](#property--elements) for more information.

### isSubmenuItem <badge type="warning" text="readonly" /> {#getter--issubmenuitem}

A flag marking a submenu item.

::: code-group

```js [getter]
BaseMenuItem.isSubmenuItem;
```

:::

See [_submenu](#property--submenu) for more information.

## Methods

### focus <badge type="tip" text="public" /> {#method--focus}

Focuses the menu item's link if the parent menu's [shouldFocus](./base-menu.md#getter--shouldfocus) value is `true`.

```js
BaseMenuItem.focus();
```

Sets `focusState` to `"self"` immediately. If the parent menu allows DOM focus, focuses the link on the next animation frame.

### blur <badge type="tip" text="public" /> {#method--blur}

Blurs the menu item's link if the parent menu's [shouldFocus](./base-menu.md#getter--shouldfocus) value is `true`.

```js
BaseMenuItem.blur();
```

Sets `focusState` to `"none"` immediately. If the parent menu allows DOM focus, blurs the link on the next animation frame.

## Inherited Core API

The following members are inherited from Core and are available on this class and its subclasses.

### _bootstrap

Registers the menu item's validation event listener.

Validation checks the required DOM elements, submenu flag, parent menu, child menu, submenu toggle, and sibling menu item if one is provided.

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

### selectors

The query selectors used by the component.

Type: `object`. Read-only.

### classes

The CSS classes to apply when the component is in various states.

Type: `object`. Read-only.

### durations

The duration times (in milliseconds) for various aspects throughout the component.

Type: `object`. Read-only.

### delays

The delay times (in milliseconds) for various aspects throughout the component.

Type: `object`. Read-only.

### intervals

Intervals throughout the component.

Type: `object`. Read-only.

### timeouts

Timeouts throughout the component.

Type: `object`. Read-only.

### listeners

Event listeners throughout the component.

Type: `object[]`. Read-only.

### events

Custom events that can be triggered throughout the component.

Type: `Object<string, CustomEvent>`. Read-only.

### initializeClass

The class(es) to apply when the component is in the initialization state.

Type: `string|string[]`. Readable and writable.

### focusState

The current state of the component's focus.

Type: `string`. Readable and writable.

### currentEvent

The last type of event triggered within the component.

Type: `string`. Readable and writable.

### shouldFocus

A flag to check if the parent menu allows the menu item's `focus()` and `blur()` methods to move focus in the DOM. This follows the parent menu's keyboard, character, and dynamic hover behavior. Read-only.

```js
BaseMenuItem.shouldFocus;
```

### prefix

The prefix used for CSS custom properties and attributes.

Type: `string`. Read-only.

### key

The key used to generate IDs throughout the component.

Type: `string`. Read-only.

### name

The component name.

Type: `string`. Read-only.

### eventPrefix

The prefix used when registering events. Returns `"accessibleMenu"` by default. Inherited from Core and read-only. Subclasses can override `_eventPrefix` before bootstrapping.

Type: `string`. Read-only.

### scope

The scope of the component.

Type: `string`. Read-only.

### id

The main ID of the component.

Type: `string`. Read-only.

### isValid

The validity state of the component.

Type: `boolean`. Read-only.

### isInitialized

The initialized state of the component.

Type: `boolean`. Read-only.

### errors

An array containing validation errors.

Type: `Error[]`. Read-only.

### _validate

Validates all aspects of the component to ensure proper functionality.

Keys are altered to match the arguments passed in during creation where possible.

```js
_validate();
```

Returns `boolean`: The result of the validation checks.

### _generateKey

Generates a key for the component.

```js
_generateKey((regenerate = false));
```

| Parameter              | Type      | Description                                           |
| ---------------------- | --------- | ----------------------------------------------------- |
| `[regenerate = false]` | `boolean` | A flag to determine if the key should be regenerated. |

### _setIds

Sets `_id` to the menu item's existing DOM ID without changing that ID. The `id` getter returns this value after initialization.

```js
BaseMenuItem._setIds();
```

### _setAriaAttributes

Sets ARIA attributes throughout the component.

```js
_setAriaAttributes();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _setCustomProps

Sets custom props throughout the component.

```js
_setCustomProps();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _setDOMElementType

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

### _resetDOMElementType

Resets DOM elements throughout the component.

Elements listed in _protectedDOMElements cannot be reset using this method.

```js
_resetDOMElementType(elementType);
```

| Parameter     | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `elementType` | `string` | The type of element to clear. |

### _setDOMElements

Sets all DOM elements throughout the component.

Utilizes _setDOMElementType and _resetDOMElementType.

```js
_setDOMElements();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _createChildElements

Creates and initializes child elements throughout the component.

```js
_createChildElements();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleFocus

Handles focus events through the component.

```js
_handleFocus();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleClick

Handles click events through the component.

```js
_handleClick();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleHover

Handles hover events through the component.

```js
_handleHover();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleKeydown

Handles keydown events through the component.

```js
_handleKeydown();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _handleKeyup

Handles keyup events through the component.

```js
_handleKeyup();
```

This method is inherited from Core and is empty by default. Subclasses can override it to add this behavior.

### _store

Stores the component into the global storage object.

```js
_store();
```

### _unstore

Removes the component from the global storage object.

```js
_unstore();
```

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

### _setTimeout

Sets a timeout within the component.

```js
_setTimeout(callback, delay, (scope = "_default"));
```

| Parameter            | Type       | Description                                                        |
| -------------------- | ---------- | ------------------------------------------------------------------ |
| `[callback]`         | `Function` | The callback function.                                             |
| `[delay]`            | `number`   | The time (in milliseconds) of the delay.                           |
| `[scope = _default]` | `string`   | The scope of the timeout (used to store the timeout in _timeouts). |

### _clearTimeout

Clears a timeout within the component.

```js
_clearTimeout((scope = "_default"));
```

| Parameter            | Type     | Description                                                        |
| -------------------- | -------- | ------------------------------------------------------------------ |
| `[scope = _default]` | `string` | The scope of the timeout (used to get the timeout from _timeouts). |

### _clearTimeouts

Clears all timeouts within the component.

```js
_clearTimeouts();
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

### _addEventListener

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

### _removeEventListener

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

### _removeEventListeners

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

### dispose

Disposes of the current instantiated component.

Removes all intervals, timeouts, and event listeners, and removes the component from global storage. This does not delete references to the component held by your code.

```js
dispose();
```
