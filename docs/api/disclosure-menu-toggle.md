# DisclosureMenuToggle

A link or button that controls the visibility of a [DisclosureMenu](./disclosure-menu).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `DisclosureMenuToggle`.

```js
/**
 * @param {object}              options                     - The options for generating the menu toggle.
 * @param {HTMLElement}         options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement}         options.parentElement       - The element containing the controlled menu.
 * @param {DisclosureMenu}      options.controlledMenu      - The menu controlled by this toggle.
 * @param {DisclosureMenu|null} [options.parentMenu = null] - The menu containing this toggle.
 * @param {boolean}             [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
 */
new DisclosureMenuToggle({
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

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the DisclosureMenuToggle class.

:::

## Properties

::: info Note

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the DisclosureMenuToggle class.

:::

## Getters and Setters

::: info Note

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the DisclosureMenuToggle class.

:::

## Methods

::: info Note

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the DisclosureMenuToggle class.

:::

### open

Opens and controlled menu.

```js
/**
 * @public
 */
DisclosureMenuToggle.open();
```

Calls the [BaseMenuToggle's closeSiblings method](./base-menu-toggle#closesiblings) and _then_ [BaseMenuToggle's open method](./base-menu-toggle#open).

### preview

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
DisclosureMenuToggle.preview();
```

Calls the [BaseMenuToggle's closeSiblings method](./base-menu-toggle#closesiblings) and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#preview).


### close

Closes the controlled menu.

```js
/**
 * @public
 */
DisclosureMenuToggle.close();
```

Calls the [BaseMenuToggle's closeChildren method](./base-menu-toggle#closechildren) and _then_ [BaseMenuToggle's close method](./base-menu-toggle#close).
