# DisclosureMenuItem

A basic navigation link contained inside of a [DisclosureMenu](./disclosure-menu).

::: info Note

This is a subclass of [BaseMenuItem](./base-menu-item).

:::

## Constructor

Constructs a new `DisclosureMenuItem`.

```js
/**
 * @param {object}                    options                         - The options for generating the menu item.
 * @param {HTMLElement}               options.menuItemElement         - The menu item in the DOM.
 * @param {HTMLElement}               options.menuLinkElement         - The menu item's link in the DOM.
 * @param {DisclosureMenu}            options.parentMenu              - The parent menu.
 * @param {boolean}                   [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
 * @param {DisclosureMenu|null}       [options.childMenu = null]      - The child menu.
 * @param {DisclosureMenuToggle|null} [options.toggle = null]         - The controller for the child menu.
 * @param {boolean}                   [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
 */
new DisclosureMenuItem({
  menuItemElement,
  menuLinkElement,
  parentMenu,
  isSubmenuItem,
  childMenu,
  toggle,
  initialize,
});
```

The constructor will call [BaseMenuItem's constructor](./base-menu-item#constructor) with the provided options. It will also initialize the menu item if the initialize flag is set to true.

## Initialize

The initialize method is inherited from the [BaseMenuItem](./base-menu-item#initialize) class. There are no customizations for the DisclosureMenuItem class.

## Properties

Properties are inherited from the [BaseMenuItem](./base-menu-item#properties) class. There are no custom properties for the DisclosureMenuItem class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom getters and setters for the DisclosureMenuItem class.

## Methods

Methods are inherited from the [BaseMenuItem](./base-menu-item#methods) class. There are no custom methods for the DisclosureMenuItem class.
