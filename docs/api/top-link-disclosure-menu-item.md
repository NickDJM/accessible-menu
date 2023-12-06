# Top Link Disclosure Menu Item

A basic navigation link contained inside of a [TopLinkDisclosureMenu](./top-link-disclosure-menu).

::: info Note

This is a subclass of [BaseMenuItem](./base-menu-item).

:::

## Constructor

Constructs a new `TopLinkDisclosureMenuItem`.

```js
/**
 * @param {object}                       options                         - The options for generating the menu item.
 * @param {HTMLElement}                  options.menuItemElement         - The menu item in the DOM.
 * @param {HTMLElement}                  options.menuLinkElement         - The menu item's link in the DOM.
 * @param {TopLinkDisclosureMenu}        options.parentMenu              - The parent menu.
 * @param {boolean}                      [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
 * @param {?TopLinkDisclosureMenu}       [options.childMenu = null]      - The child menu.
 * @param {?TopLinkDisclosureMenuToggle} [options.toggle = null]         - The controller for the child menu.
 * @param {boolean}                      [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
 * @param {?TopLinkDisclosureMenuItem}   [options.submenuSibling = null] - The sibling menu item that controls a submenu.
 */
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

### _elements <badge type="warning" text="protected" /> {#property--elements}

The declared accessible-menu elements within the menu item.

```js
/**
 * @type {Object<TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle>}
 *
 * @protected
 *
 * @property {TopLinkDisclosureMenu}                   parentMenu - The menu containing this menu item.
 * @property {?TopLinkDisclosureMenu}                  childMenu  - The menu contained within this menu item.
 * @property {?TopLinkDisclosureMenuToggle}            toggle     - The menu toggle within this menu item that controls the `childMenu`.
 * @property {?TopLinkDisclosureMenuItem}              sibling    - The sibling menu item that is a submenu item.
 */
TopLinkDisclosureMenuItem._elements;
```

## Getters and Setters

Getters and setters are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom getters and setters for the TopLinkDisclosureMenuItem class.

## Methods

Methods are inherited from the [BaseMenuItem](./base-menu-item#getters-and-setters) class. There are no custom methods for the TopLinkDisclosureMenuItem class.
