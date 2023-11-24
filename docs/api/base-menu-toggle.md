# BaseMenuToggle

A link or button that controls the visibility of a [BaseMenu](./base-menu).

## Constructor

Constructs a new `BaseMenuToggle`

```js
/**
 * @param {object}        options                     - The options for generating the menu toggle.
 * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
 * @param {BaseMenu}      options.controlledMenu      - The menu controlled by this toggle.
 * @param {BaseMenu|null} [options.parentMenu = null] - The menu containing this toggle.
 */
new BaseMenuToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
});
```

The constructor populates the dom and elements properties. It will _not_ initialize the menu toggle; this is left to the subclasses to envoke.

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

Finally, the [collapse](#collapse) method is called to make sure the submenu is closed.

## Properties

### _dom

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

### _elements

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

### _open

The open state of the menu toggle.

```js
/**
 * @protected
 *
 * @type {boolean}
 */
BaseMenuToggle._open; // false.
```

### _expandEvent

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

### _collapseEvent

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

### dom

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

### elements

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

### isOpen

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


### _expand

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

Sets the toggle's `aria-expanded` to "true", adds the [open class](./base-menu#openclass) to the toggle's parent menu item and controlled menu, and removes the [closed class](./base-menu#closedclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuExpand](#expandEvent).

### _collapse

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

Sets the toggle's `aria-expanded` to "false", adds the [closed class](./base-menu#closedclass) to the toggle's parent menu item and controlled menu, and removes the [open class](./base-menu#openclass) from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called [accessibleMenuCollapse](#collapseEvent).

### open

Opens the controlled menu.

```js
/**
 * @public
 */
BaseMenuToggle.open();
```

Sets the controlled menu's [focus state](./base-menu#focusstate) to "self" and the parent menu's focus state to "child", calls [_expand](#expand), and sets the [isOpen](#isOpen) value to `true`.

### preview

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
BaseMenuToggle.preview();
```

Sets the controlled menu's [focus state](./base-menu#focusstate) to "self" and the parent menu's focus state to "child", and calls [_expand](#expand).

### close

Closes the controlled menu.

```js
/**
 * @public
 */
BaseMenuToggle.close();
```

Sets the controlled menu's [focus state](./base-menu#focusstate) to "none" and the parent menu's focus state to "self", blurs the controlled menu and sets it's [currentChild](./base-menu#currentchild) to 0, calls [_collapse](#collapse), and sets the [isOpen](#isOpen) value to `false`.

### toggle

Toggles the open state of the controlled menu between `true` and `false`.

```js
/**
 * @public
 */
BaseMenuToggle.toggle();
```

### closeSiblings

Closes all subling menus.

```js
/**
 * @public
 */
BaseMenuToggle.closeSiblings();
```

### closeChildren

Closes all child menus.

```js
/**
 * @public
 */
BaseMenuToggle.closeChildren();
```
