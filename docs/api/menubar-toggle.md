# Menubar Toggle

A link or button that controls the visibility of a [Menubar](./menubar).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `MenubarToggle`.

```js
/**
 * @param {object}      options                     - The options for generating the menu toggle.
 * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
 * @param {Menubar}     options.controlledMenu      - The menu controlled by this toggle.
 * @param {?Menubar}    [options.parentMenu = null] - The menu containing this toggle.
 * @param {boolean}     [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
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

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu toggle. | `undefined` |
| options.menuToggleElement | `HTMLElement` | The toggle element in the DOM. | `undefined` |
| options.parentElement | `HTMLElement` | The element containing the controlled menu. | `undefined` |
| options.controlledMenu | `Menubar` | The menu controlled by this toggle. | `undefined` |
| options.parentMenu | `Menubar`, `null` | The menu containing this toggle. | `null` |
| options.initialize | `boolean` | A flag to initialize the menu toggle immediately upon creation. | `true` |

## Initialize

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the MenubarToggle class.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the MenubarToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the MenubarToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the MenubarToggle class.

### open <badge type="tip" text="public" /> {#method--open}

Opens the controlled menu.

```js
/**
 * @public
 */
MenubarToggle.open();
```

Calls the [closeSiblings (inherited)](./base-menu-toggle#method--closesiblings) method and _then_ [BaseMenuToggle's open method](./base-menu-toggle#method--open).

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
MenubarToggle.preview();
```

Calls the [closeSiblings (inherited)](./base-menu-toggle#method--closesiblings) method and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#method--preview).

### close <badge type="tip" text="public" /> {#method--close}

Closes the controlled menu.

```js
/**
 * @public
 */
MenubarToggle.close();
```

Calls the [closeChildren (inherited)](./base-menu-toggle#method--closechildren) method and _then_ [BaseMenuToggle's close method](./base-menu-toggle#method--close).
