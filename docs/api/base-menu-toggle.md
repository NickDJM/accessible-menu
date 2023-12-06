# BaseMenuToggle

A link or button that controls the visibility of a [BaseMenu](./base-menu).

## Constructor

Constructs a new `BaseMenuToggle`

```js
/**
 * @param {object}      options                     - The options for generating the menu toggle.
 * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
 * @param {BaseMenu}    options.controlledMenu      - The menu controlled by this toggle.
 * @param {?BaseMenu}   [options.parentMenu = null] - The menu containing this toggle.
 */
new BaseMenuToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
});
```

The constructor populates the dom and elements properties. It will _not_ initialize the menu toggle; this is left to the subclasses to envoke.

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

Initialize does a lot of setup on the menu toggle.

The most basic setup steps are to ensure that the toggle has `aria-haspopup` set to "true", `aria-expanded` initially set to "false" and, if the toggle element is not a `<button>`, set the `role` to "button".

The next step to the initialization is to ensure both the toggle and the menu it controlls have IDs.

If they do not, the following steps take place:

- Generate a random 10 character string,
- Get the innerText of the toggle,
- Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
- Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`

Once the ID's have been generated, the menu's `aria-labelledby` is set to the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.

Finally, the [collapse](#method--collapse) method is called to make sure the submenu is closed.

## Properties

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu toggle.

```js
/**
 * @protected
 *
 * @type {Object<HTMLElement>}
 *
 * @property {HTMLElement} toggle - The menu toggle.
 * @property {HTMLElement} parent - The menu containing this toggle.
 */
BaseMenuToggle._dom;
```

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu toggle.

```js
/**
 * The declared accessible-menu elements within the menu toggle.
 *
 * @protected
 *
 * @type {Object<BaseMenu>}
 *
 * @property {BaseMenu} controlledMenu - The menu controlled by this toggle.
 * @property {BaseMenu} parentMenu     - The menu containing this toggle.
 */
BaseMenuToggle._elements;
```

### _open <badge type="warning" text="protected" /> {#property--open}

The open state of the menu toggle.

```js
/**
 * @protected
 *
 * @type {boolean}
 */
BaseMenuToggle._open; // false.
```

### _expandEvent <badge type="warning" text="protected" /> {#property--expandEvent}

The event that is triggered when the menu toggle expands.

```js
/**
 * @protected
 *
 * @event accessibleMenuExpand
 *
 * @type {CustomEvent}
 *
 * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
 */
BaseMenuToggle._expandEvent;
```

### _collapseEvent <badge type="warning" text="protected" /> {#property--collapseEvent}

The event that is triggered when the menu toggle collapses.

```js
/**
 * @protected
 *
 * @event accessibleMenuCollapse
 *
 * @type {CustomEvent}
 *
 * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
 */
BaseMenuToggle._collapseEvent;
```

## Getters and Setters

### dom {#getter--dom}

The DOM elements within the toggle.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<HTMLElement>}
 *
 * @see _dom
 */
BaseMenuToggle.dom;
```

:::

### elements {#getter--elements}

The declared accessible-menu elements within the toggle.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<BaseMenu>}
 *
 * @see _elements
 */
BaseMenuToggle.elements;
```

:::

### isOpen {#getter-setter--isopen}

The open state of the toggle.

::: code-group

```js [getter]
/**
 * @type {boolean}
 *
 * @see _open
 */
BaseMenuToggle.isOpen;
```

```js [setter]
/**
 * @type {boolean}
 */
BaseMenuToggle.isOpen = true;
```

:::

## Methods

### _expand <badge type="warning" text="protected" /> {#method--expand}

Expands the controlled menu.

```js
/**
 * @protected
 *
 * @fires accessibleMenuExpand
 *
 * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
 */
BaseMenuToggle._expand(emit);
```

Sets the toggle's `aria-expanded` to "true", adds the [open class](./base-menu#getter-setter--openclass) to the toggle's parent menu item and controlled menu, and removes the [closed class](./base-menu#getter-setter--closeclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuExpand](#property--expandEvent).

#### Parameters {#method--expand--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| emit | `boolean` | A toggle to emit the expand event once expanded. | `true` |

### _collapse <badge type="warning" text="protected" /> {#method--collapse}

Collapses the controlled menu.

```js
/**
 * @protected
 *
 * @fires accessibleMenuCollapse
 *
 * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
 */
BaseMenuToggle._collapse(emit);
```

Sets the toggle's `aria-expanded` to "false", adds the [closed class](./base-menu#getter-setter--closeclass) to the toggle's parent menu item and controlled menu, and removes the [open class](./base-menu#getter-setter--openclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuCollapse](#property--collapseEvent).

#### Parameters {#method--collapse--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| emit | `boolean` | A toggle to emit the collapse event once collapsed. | `true` |

### open <badge type="tip" text="public" /> {#method--open}

Opens the controlled menu.

```js
/**
 * @public
 */
BaseMenuToggle.open();
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "self" and the parent menu's focus state to "child", calls [_expand](#method--expand), and sets the [isOpen](#getter-setter--isopen) value to `true`.

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
BaseMenuToggle.preview();
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "self" and the parent menu's focus state to "child", and calls [_expand](#method--expand).

### close <badge type="tip" text="public" /> {#method--close}

Closes the controlled menu.

```js
/**
 * @public
 */
BaseMenuToggle.close();
```

Sets the controlled menu's [focus state](./base-menu#getter-setter--focusstate) to "none" and the parent menu's focus state to "self", blurs the controlled menu and sets it's [currentChild](./base-menu#getter-setter--currentchild) to 0, calls [_collapse](#method--collapse), and sets the [isOpen](#getter-setter--isopen) value to `false`.

### toggle <badge type="tip" text="public" /> {#method--toggle}

Toggles the open state of the controlled menu between `true` and `false`.

```js
/**
 * @public
 */
BaseMenuToggle.toggle();
```

### closeSiblings <badge type="tip" text="public" /> {#method--closesiblings}

Closes all subling menus.

```js
/**
 * @public
 */
BaseMenuToggle.closeSiblings();
```

### closeChildren <badge type="tip" text="public" /> {#method--closechildren}

Closes all child menus.

```js
/**
 * @public
 */
BaseMenuToggle.closeChildren();
```
