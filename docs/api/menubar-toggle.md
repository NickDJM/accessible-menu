# Menubar Toggle

A link or button that controls the visibility of a [Menubar](./menubar).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `MenubarToggle`.

```js
/**
 * @param {object}       options                     - The options for generating the menu toggle.
 * @param {HTMLElement}  options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement}  options.parentElement       - The element containing the controlled menu.
 * @param {Menubar}      options.controlledMenu      - The menu controlled by this toggle.
 * @param {Menubar|null} [options.parentMenu = null] - The menu containing this toggle.
 * @param {boolean}      [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
 */
new MenubarToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
  initialize,
});
```

The constructor will call [BaseMenuToggle's constructor](./base-menu-toggle#constructor) with the provided options. It will also initialize the menu toggle if the initialize flag is set to true.

## Initialize

::: info Note

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the MenubarToggle class.

:::

## Properties

::: info Note

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the MenubarToggle class.

:::

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the MenubarToggle class.

:::

## Methods

::: info Note

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the MenubarToggle class.

:::

### open

Opens the controlled menu.

```js
/**
 * @public
 */
MenubarToggle.open();
```

Calls the [closeSiblings (inherited)](./base-menu-toggle#closesiblings) method and _then_ [BaseMenuToggle's open method](./base-menu-toggle#open).

### preview

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
MenubarToggle.preview();
```

Calls the [closeSiblings (inherited)](./base-menu-toggle#closesiblings) method and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#preview).

### close

Closes the controlled menu.

```js
/**
 * @public
 */
MenubarToggle.close();
```

Calls the [closeChildren (inherited)](./base-menu-toggle#closechildren) method and _then_ [BaseMenuToggle's close method](./base-menu-toggle#close).
