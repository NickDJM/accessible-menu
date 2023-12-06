# Top Link Disclosure Menu Toggle

A link or button that controls the visibility of a [TopLinkDisclosureMenu](./top-link-disclosure-menu).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `TopLinkDisclosureMenuToggle`.

```js
/**
 * @param {object}                 options                     - The options for generating the menu toggle.
 * @param {HTMLElement}            options.menuToggleElement   - The toggle element in the DOM.
 * @param {HTMLElement}            options.parentElement       - The element containing the controlled menu.
 * @param {TopLinkDisclosureMenu}  options.controlledMenu      - The menu controlled by this toggle.
 * @param {?TopLinkDisclosureMenu} [options.parentMenu = null] - The menu containing this toggle.
 * @param {boolean}                [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
 */
new TopLinkDisclosureMenuToggle({
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
| options.controlledMenu | `TopLinkDisclosureMenu` | The menu controlled by this toggle. | `undefined` |
| options.parentMenu | `TopLinkDisclosureMenu`, `null` | The menu containing this toggle. | `null` |
| options.initialize | `boolean` | A flag to initialize the menu toggle immediately upon creation. | `true` |

## Initialize

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the TopLinkDisclosureMenuToggle class.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the TopLinkDisclosureMenuToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the TopLinkDisclosureMenuToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the TopLinkDisclosureMenuToggle class.

### open {#method--open}

Opens and controlled menu.

```js
/**
 * @public
 */
TopLinkDisclosureMenuToggle.open();
```

Calls the [closeSiblings (inherited) method](./base-menu-toggle#method--closesiblings) and _then_ [BaseMenuToggle's open method](./base-menu-toggle#method--open).

### preview {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
/**
 * @public
 */
TopLinkDisclosureMenuToggle.preview();
```

Calls the [closeSiblings (inherited) method](./base-menu-toggle#method--closesiblings) and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#method--preview).

### close {#method--close}

Closes the controlled menu.

```js
/**
 * @public
 */
TopLinkDisclosureMenuToggle.close();
```

Calls the [closeChildren (inherited) method](./base-menu-toggle#method--closechildren) and _then_ [BaseMenuToggle's close method](./base-menu-toggle#method--close).
