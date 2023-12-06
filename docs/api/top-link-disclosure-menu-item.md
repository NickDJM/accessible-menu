# Top Link Disclosure Menu Item

A basic navigation link contained inside of a [TopLinkDisclosureMenu](./top-link-disclosure-menu).

::: info Note

This is a subclass of [BaseMenuItem](./base-menu-item).

:::

## Constructor

Constructs a new `TopLinkDisclosureMenuItem`.

```js
new TopLinkDisclosureMenuItem({
  menuItemElement,
  menuLinkElement,
  parentMenu,
  isSubmenuItem,
  childMenu,
  toggle,
  initialize,
  submenuSibling,
});
```

The constructor will call [BaseMenuItem's constructor](./base-menu-item#constructor) with the provided options. It will also populate the elements property and initialize the menu item if the initialize flag is set to true.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu item. | `undefined` |
| options.menuItemElement | `HTMLElement` | The menu item in the DOM. | `undefined` |
| options.menuLinkElement | `HTMLElement` | The menu item's link in the DOM. | `undefined` |
| options.parentMenu | `TopLinkDisclosureMenu` | The parent menu. | `undefined` |
| options.isSubmenuItem | `boolean` | A flag to mark if the menu item is controlling a submenu. | `false` |
| options.childMenu | `TopLinkDisclosureMenu`, `null` | The child menu. | `null` |
| options.toggle | `TopLinkDisclosureMenuToggle`, `null` | The controller for the child menu. | `null` |
| options.initialize | `boolean` | A flag to initialize the menu item immediately upon creation. | `true` |
| options.submenuSibling | `TopLinkDisclosureMenuItem`, `null` | The sibling menu item that controls a submenu. | `null` |

## Initialize

The initialize method is inherited from the [BaseMenuItem](./base-menu-item#initialize) class. There are no customizations for the TopLinkDisclosureMenuItem class.

## Properties

Properties are inherited from the [BaseMenuItem](./base-menu-item#properties) class. The following properties are unique to or overwritten in the TopLinkDisclosureMenuItem class.

### _elements <Badge type="tip" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu item.

```js
TopLinkDisclosureMenuItem._elements;
```

#### Type {#property--elements--type}

`Object<TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle>`

#### Properties {#property--elements--properties}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| parentMenu | `TopLinkDisclosureMenu` | The menu containing this menu item. | `null` |
| childMenu | `TopLinkDisclosureMenu`, `null` | The menu contained within this menu item. | `null` |
| toggle | `TopLinkDisclosureMenuToggle`, `null` | The menu toggle within this menu item that controls the `childMenu`. | `null` |
| sibling | `TopLinkDisclosureMenuItem`, `null` | The sibling menu item that is a submenu item. | `null` |

## Getters and Setters

Getters and setters are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom getters and setters for the TopLinkDisclosureMenuItem class.

## Methods

Methods are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom methods for the TopLinkDisclosureMenuItem class.
