# Treeview Toggle

A link or button that controls the visibility of a [Treeview](./treeview).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `TreeviewToggle`.

```js
/**
 * @param {object}        options                     - The options for generating the menu toggle.
 * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
 * @param {Treeview}      options.controlledMenu      - The menu controlled by this toggle.
 * @param {Treeview|null} [options.parentMenu = null] - The menu containing this toggle.
 * @param {boolean}       [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
 */
new TreeviewToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
  initialize,
});
```

The constructor will call [BaseMenuToggle's constructor](./base-menu-toggle#constructor) with the provided options. It will also initialize the menu toggle if the initialize flag is set to true.

## Initialize

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the TreeviewToggle class.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the TreeviewToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the TreeviewToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. There are no custom methods for the TreeviewToggle class.
