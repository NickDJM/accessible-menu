# Menubar Item

A basic navigation link contained inside of a [Menubar](./menubar).

::: info Note

This is a subclass of [BaseMenuItem](./base-menu-item).

:::

## Constructor

Constructs a new `MenubarItem`.

```js
/**
 * @param {object}             options                         - The options for generating the menu item.
 * @param {HTMLElement}        options.menuItemElement         - The menu item in the DOM.
 * @param {HTMLElement}        options.menuLinkElement         - The menu item's link in the DOM.
 * @param {Menubar}            options.parentMenu              - The parent menu.
 * @param {boolean}            [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
 * @param {Menubar|null}       [options.childMenu = null]      - The child menu.
 * @param {MenubarToggle|null} [options.toggle = null]         - The controller for the child menu.
 * @param {boolean}            [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
 */
new MenubarItem({
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

Initialize the menu item.

```js
MenubarItem.initialize();
```

Initialize will call the [BaseMenuItem's initialize method](./base-menu-item#initialize) as well as set the menu item's `role` to "none", the menu link's `role` to "menuitem", and the menu link's `tabIndex` to -1 in the DOM.

## Properties

::: info Note

Properties are inherited from the [BaseMenuItem](./base-menu-item#properties) class. There are no custom properties for the MenubarItem class.

:::

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom getters and setters for the MenubarItem class.

:::

## Methods

::: info Note

Methods are inherited from the [BaseMenuItem](./base-menu-item#methods) class. The following methods are unique to or overwritten in the MenubarItem class.

:::

### focus

Focuses the menu item's link if the parent menu's [shouldFocus](./base-menu.md#shouldfocus) value is `true`.

```js
/**
 * @public
 */
MenubarItem.focus();
```

This will call the [BaseMenuItem's focus method](./base-menu-item#focus) as well as set the menu link's `tabIndex` to 0 if the parent menu is the root menu.

### blur

Blurs the menu item's link if the parent menu's [shouldFocus](./base-menu.md#shouldfocus) value is `true`.

```js
/**
 * @public
 */
MenubarItem.blur();
```

This will call the [BaseMenuItem's focus method](./base-menu-item#focus) as well as set the menu link's `tabIndex` to -1 if the parent menu is the root menu.
