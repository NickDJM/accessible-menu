# Top Link Disclosure Menu

An accessible disclosure menu with top-level links in the DOM.

::: info Note

This is a subclass of [BaseMenu](./base-menu).

:::

## Constructor

## Initialize

::: info Note

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the TopLinkDisclosureMenuToggle class.

:::

## Properties

::: info Note

Properties are inherited from the [BaseMenu](./base-menu#properties) class. The following properties are unique to or overwritten in the TopLinkDisclosureMenu class.

:::

### _MenuType

The class to use when generating submenus.

```js
/**
 * @protected
 *
 * @type {typeof TopLinkDisclosureMenu}
 */
TopLinkDisclosureMenu._MenuType; // TopLinkDisclosureMenu.
```

### _MenuItemType

The class to use when generating menu items.

```js
/**
 * @protected
 *
 * @type {typeof TopLinkDisclosureMenuItem}
 */
TopLinkDisclosureMenu._MenuItemType; // TopLinkDisclosureMenuItem.
```

### _MenuToggleType

The class to use when generating menu toggles.

```js
/**
 * @protected
 *
 * @type {typeof TopLinkDisclosureMenuToggle}
 */
TopLinkDisclosureMenu._MenuToggleType; // TopLinkDisclosureMenuToggle.
```

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenu](./base-menu#getters-and-setters) class. The following getters and setters are unique to or overwritten in the TopLinkDisclosureMenu class.

:::

## Methods

::: info Note

Methods are inherited from the [BaseMenu](./base-menu#methods) class. The following methods are unique to or overwritten in the TopLinkDisclosureMenu class.

:::
