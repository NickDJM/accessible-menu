# BaseMenuToggle

A link or button that controls the visibility of a [BaseMenu](./base-menu).

## Constructor

Constructs a new `BaseMenuToggle`

```js
new BaseMenuToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
});
```

The constructor populates the dom and elements properties. It will _not_ initialize the menu toggle; this is left to the subclasses to evoke.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu toggle. | `undefined` |
| options.menuToggleElement | `HTMLElement` | The toggle element in the DOM. | `undefined` |
| options.parentElement | `HTMLElement` | The element containing the controlled menu. | `undefined` |
| options.controlledMenu | `BaseMenu` | The menu controlled by this toggle. | `undefined` |
| options.parentMenu | `BaseMenu`, `null` | The menu containing this toggle. | `null` |

## Initialize

Initializes the menu toggle.

```js
BaseMenuToggle.initialize();
```

The first steps are to ensure that the toggle and controlled menu have IDs using the [setIds](#method--setIds) method, and to set the ARIA attributes on the toggle and controlled menu using the [setAriaAttributes](#method--setAriaAttributes) method.

Then the [collapse](#method--collapse) method is called to make sure the submenu is closed.

## Properties

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu toggle.

```js
BaseMenuToggle._dom;
```

#### Type {#property--dom--type}

`Object<HTMLElement>`

#### Properties {#property--dom--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| toggle | `HTMLElement` | The menu toggle. | `null` |
| parent | `HTMLElement` | The menu containing this toggle. | `null` |

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu toggle.

```js
BaseMenuToggle._elements;
```

#### Type {#property--elements--type}

`Object<BaseMenu>`

#### Properties {#property--elements--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| controlledMenu | `BaseMenu` | The menu controlled by this toggle. | `null` |
| parentMenu | `BaseMenu` | The menu containing this toggle. | `null` |

### _open <badge type="warning" text="protected" /> {#property--open}

The open state of the menu toggle.

```js
BaseMenuToggle._open; // Default: `new TransactionalValue(false)`.
```

#### Type {#property--open--type}

`TransactionalValue<boolean>`

### _events <badge type="warning" text="protected" /> {#property--events}

Custom events that can be triggered throughout the menu toggle.

```js
BaseMenuToggle._events;
```

#### Type {#property--events--type}

`Object<CustomEvent>`

#### Properties {#property--events--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| expand | `CustomEvent` | The event that is triggered when the menu toggle expands.
| collapse | `CustomEvent` | The event that is triggered when the menu toggle collapses. |

## Getters and Setters

### dom <badge type="warning" text="readonly" /> {#getter--dom}

The DOM elements within the toggle.

::: code-group

```js [getter]
BaseMenuToggle.dom;
```

:::

See [_dom](#property--dom) for more information.

### elements <badge type="warning" text="readonly" /> {#getter--elements}

The declared accessible-menu elements within the toggle.

::: code-group

```js [getter]
BaseMenuToggle.elements;
```

:::

See [_elements](#property--elements) for more information.

### events <badge type="warning" text="readonly" /> {#getter--events}

Custom events that can be triggered throughout the menu toggle.

::: code-group

```js [getter]
BaseMenuToggle.events;
```

:::

See [_events](#property--events) for more information.

### isOpen <badge type="warning" text="readonly" /> {#getter--isopen}

The open state of the toggle.

::: code-group

```js [getter]
BaseMenuToggle.isOpen;
```

:::

See [_open](#property--open) for more information.

### hasOpened <badge type="warning" text="readonly" /> {#getter--hasopened}

The open state of the toggle that the user specifically triggered.

::: code-group

```js [getter]
BaseMenuToggle.hasOpened;
```

:::

See [_open](#property--open) for more information.

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

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
BaseMenuToggle._setAriaAttributes();
```

The first steps are to ensure that the toggle has `aria-expanded` is initially set to "false".

Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to the toggle's ID.

### _dispatchEvent <badge type="warning" text="protected" /> {#method--dispatchevent}

Dispatch a custom event on an element in the DOM.

```js
BaseMenuToggle._dispatchEvent(eventType, element);
```

#### Parameters {#method--dispatchevent--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| eventType | `string` | The type of event to dispatch. | `undefined` |
| element | `HTMLElement` | The element to dispatch the event on. | `undefined` |

### _expand <badge type="warning" text="protected" /> {#method--expand}

Expands the controlled menu.

```js
BaseMenuToggle._expand({ emit, transition });
```

Sets the toggle's `aria-expanded` to "true", adds the [open class](./base-menu#getter-setter--openclass) to the toggle's parent menu item and controlled menu, and removes the [closed class](./base-menu#getter-setter--closeclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuExpand](#property--expandEvent).

#### Parameters {#method--expand--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for expanding the menu. | `{}` |
| options.emit | `boolean` | A toggle to emit the expand event once expanded. | `true` |
| options.transition | `boolean` | A flag to use transitions when expanding. | `true` |

### _collapse <badge type="warning" text="protected" /> {#method--collapse}

Collapses the controlled menu.

```js
BaseMenuToggle._collapse({ emit, transition });
```

Sets the toggle's `aria-expanded` to "false", adds the [closed class](./base-menu#getter-setter--closeclass) to the toggle's parent menu item and controlled menu, and removes the [open class](./base-menu#getter-setter--openclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuCollapse](#property--collapseEvent).

#### Parameters {#method--collapse--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for collapsing the menu. | `{}` |
| options.emit | `boolean` | A toggle to emit the collapse event once collapsed. | `true` |
| options.transition | `boolean` | A flag to use transitions when collapsing. | `true` |

### open <badge type="tip" text="public" /> {#method--open}

Opens the controlled menu.

```js
BaseMenuToggle.open({ force, preserveState, emit, transition });
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "self" and the parent menu's focus state to "child", calls [_expand](#method--expand), and sets the [isOpen](#getter--isopen) value to `true`.

#### Parameters {#method--open--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for opening the menu. | `{}` |
| options.force | `boolean` | A flag to force the menu to open. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the expand event. | `true` |
| options.transition | `boolean` | A flag to use transitions when opening. | `true` |

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
BaseMenuToggle.preview({ force, preserveState, emit, transition });
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "self" and the parent menu's focus state to "child", and calls [_expand](#method--expand).

#### Parameters {#method--preview--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for previewing the menu. | `{}` |
| options.force | `boolean` | A flag to force the menu to preview. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the expand event. | `true` |
| options.transition | `boolean` | A flag to use transitions when previewing. | `true` |

### close <badge type="tip" text="public" /> {#method--close}

Closes the controlled menu.

```js
BaseMenuToggle.close({ force, preserveState, emit, transition });
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "none" and the parent menu's focus state to "self", blurs the controlled menu and sets it's [currentChild](./base-menu#getter-setter--currentchild) to 0, calls [_collapse](#method--collapse), and sets the [isOpen](#getter--isopen) value to `false`.

#### Parameters {#method--close--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for closing the menu. | `{}` |
| options.force | `boolean` | A flag to force the menu to close. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the collapse event. | `true` |
| options.transition | `boolean` | A flag to use transitions when closing. | `true` |

### toggle <badge type="tip" text="public" /> {#method--toggle}

Toggles the open state of the controlled menu between `true` and `false`.

```js
BaseMenuToggle.toggle({ force, preserveState, emit, transition });
```

#### Parameters {#method--toggle--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for toggling the menu. | `{}` |
| options.force | `boolean` | A flag to force the menu to open/close. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the expand/collapse event. | `true` |
| options.transition | `boolean` | A flag to use transitions when toggling. | `true` |

### closeSiblings <badge type="tip" text="public" /> {#method--closesiblings}

Closes all sibling menus.

```js
BaseMenuToggle.closeSiblings({ force, preserveState, emit, transition });
```

#### Parameters {#method--closesiblings--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for closing the sibling menus. | `{}` |
| options.force | `boolean` | A flag to force the menus to close. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the collapse event. | `true` |
| options.transition | `boolean` | A flag to use transitions when closing. | `true` |

### closeChildren <badge type="tip" text="public" /> {#method--closechildren}

Closes all child menus.

```js
BaseMenuToggle.closeChildren({ force, preserveState, emit, transition });
```

#### Parameters {#method--closechildren--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for closing the child menus. | `{}` |
| options.force | `boolean` | A flag to force the menus to close. | `false` |
| options.preserveState | `boolean` | A flag to preserve the current state. | `false` |
| options.emit | `boolean` | A flag to emit the collapse event. | `true` |
| options.transition | `boolean` | A flag to use transitions when closing. | `true` |
