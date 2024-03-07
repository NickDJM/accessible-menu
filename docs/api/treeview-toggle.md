# Treeview Toggle

A link or button that controls the visibility of a [Treeview](./treeview).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `TreeviewToggle`.

```js
new TreeviewToggle({
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
| options.controlledMenu | `Treeview` | The menu controlled by this toggle. | `undefined` |
| options.parentMenu | `Treeview`, `null` | The menu containing this toggle. | `null` |
| options.initialize | `boolean` | A flag to initialize the menu toggle immediately upon creation. | `true` |

## Initialize

Initializes the menu toggle.

```js
TreeviewToggle.initialize();
```

The first steps are to ensure that the toggle and controlled menu have IDs using the [setIds](./base-menu-toggle#method--setIds) method, and to set the ARIA attributes on the toggle and controlled menu using the [setAriaAttributes](#method--setAriaAttributes) method.

Then the [open](./base-menu-toggle#method--open) or [collapse](./base-menu-toggle#method--collapse) method is called based on the state of the toggle's aria-expanded attribute.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the TreeviewToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the TreeviewToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the TreeviewToggle class.

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
TreeviewToggle._setAriaAttributes();
```

The first steps are to ensure that the toggle has `aria-haspopup` set to "true", `aria-expanded` set to "false" if it's not already set explicitly to "true", and if the toggle element is not a `<button>`, set the `role` to "button".

Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.
