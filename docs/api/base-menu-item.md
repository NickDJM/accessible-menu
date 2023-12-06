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
| options.childMenu | `BaseMenu`, `null` | The child menu. | `null` |
| options.toggle | `BaseMenuToggle`, `null` | The controller for the child menu. | `null` |

## Initialize

Initialize the menu item.

```js
BaseMenuItem.initialize();
```

This method is a placeholder for subclasses to expand upon. The BaseMenuItem's initialize method does nothing.

## Properties

### _dom <badge type="warning" text="protected" /> {#property--dom}

The DOM elements within the menu item.

```js
BaseMenuItem._dom;
```

#### Type {#property--dom--type}

`Object<HTMLElement>`

#### Properties {#property--dom--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| item | `HTMLElement` | The menu item. | `null` |
| link | `HTMLElement` | The menu item's link. | `null` |

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu item.

```js
BaseMenuItem._elements;
```

#### Type {#property--elements--type}

`Object<BaseMenu,BaseMenuToggle>`

#### Properties {#property--elements--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| parentMenu | `BaseMenu` | The menu containing this menu item. | `null` |
| childMenu | `BaseMenu`, `null` | The menu contained within this menu item. | `null` |
| toggle | `BaseMenuToggle`, `null` | The menu toggle within this menu item that controls the `childMenu`. | `null` |

### _submenu <badge type="warning" text="protected" /> {#property--submenu}

A flag marking a submenu item.

```js
BaseMenuItem._submenu; // Default: `false`.
```

#### Type {#property--submenu--type}

`boolean`

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

### blur <badge type="tip" text="public" /> {#method--blur}

Blurs the menu item's link if the parent menu's [shouldFocus](./base-menu.md#getter--shouldfocus) value is `true`.

```js
BaseMenuItem.blur();
```
