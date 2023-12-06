# BaseMenuItem

A basic navigation link contained inside of a [BaseMenu](./base-menu).

## Constructor

Constructs a new `BaseMenuItem`.

```js
/**
 * Constructs a new `BaseMenuItem`.
 *
 * @param {object}          options                         - The options for generating the menu item.
 * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
 * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
 * @param {BaseMenu}        options.parentMenu              - The parent menu.
 * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
 * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
 * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
 */
new BaseMenuItem({
  menuItemElement,
  menuLinkElement,
  parentMenu,
  isSubmenuItem,
  childMenu,
  toggle,
});
```

The constructor populates the dom, elements, and submenu properties. It will _not_ initialize the menu item; this is left to the subclasses to envoke.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu item. | `undefined` |
| options.menuItemElement | `HTMLElement` | The menu item in the DOM. | `undefined` |
| options.menuLinkElement | `HTMLElement` | The menu item's link in the DOM. | `undefined` |
| options.parentMenu | `BaseMenu` | The parent menu. | `undefined` |
| options.isSubmenuItem | `boolean` | A flag to mark if the menu item is controlling a submenu. | `false` |
| options.childMenu | `BaseMenu|null` | The child menu. | `null` |
| options.toggle | `BaseMenuToggle|null` | The controller for the child menu. | `null` |

## Initialize

Initialize the menu item.

```js
BaseMenuItem.initialize();
```

This method is a placeholder for subclasses to expand upon. The BaseMenuItem's initialize method does nothing.

## Properties

### _dom <badge type="tip" text="protected" /> {#property--dom}

The DOM elements within the menu item.

```js
/**
 * @protected
 *
 * @type {Object<HTMLElement>}
 *
 * @property {HTMLElement} item - The menu item.
 * @property {HTMLElement} link - The menu item's link.
 */
BaseMenuItem._dom;
```

### _elements <badge type="tip" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu item.

```js
/**
 * @protected
 *
 * @type {Object<BaseMenu, BaseMenuToggle>}
 *
 * @property {BaseMenu}        parentMenu - The menu containing this menu item.
 * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
 * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
 */
BaseMenuItem._elements;
```

### _submenu <badge type="tip" text="protected" /> {#property--submenu}

A flag marking a submenu item.

```js
/**
 * @protected
 *
 * @type {boolean}
 */
BaseMenuItem._submenu; // false.
```

## Getters and Setters

### dom {#getter--dom}

The DOM elements within the menu item.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<HTMLElement>}
 */
BaseMenuItem.dom;
```

:::

### elements {#getter--elements}

The declared accessible-menu elements within the menu item.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {Object<BaseMenu, BaseMenuToggle>}
 */
BaseMenuItem.elements;
```

:::

### isSubmenuItem {#getter--issubmenuitem}

A flag marking a submenu item.

::: code-group

```js [getter]
/**
 * @readonly
 *
 * @type {boolean}
 */
BaseMenuItem.isSubmenuItem;
```

:::

## Methods

### focus {#method--focus}

Focuses the menu item's link if the parent menu's [shouldFocus](./base-menu.md#getter--shouldfocus) value is `true`.

```js
/**
 * @public
 */
BaseMenuItem.focus();
```

### blur {#method--blur}

Blurs the menu item's link if the parent menu's [shouldFocus](./base-menu.md#getter--shouldfocus) value is `true`.

```js
/**
 * @public
 */
BaseMenuItem.blur();
```
