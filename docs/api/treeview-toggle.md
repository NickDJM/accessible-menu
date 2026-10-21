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
  containerElement,
  controlledMenu,
  parentMenu,
  initialize,
});
```

The constructor will call [BaseMenuToggle's constructor](./base-menu-toggle#constructor) with the provided options. It will also initialize the menu toggle if the initialize flag is set to true.

### Parameters {#constructor--parameters}

| Name                              | Type               | Description                                                                          | Default     |
| --------------------------------- | ------------------ | ------------------------------------------------------------------------------------ | ----------- |
| options                           | `object`           | The options for generating the menu toggle.                                          | `undefined` |
| options.menuToggleElement         | `HTMLElement`      | The toggle element in the DOM.                                                       | `undefined` |
| options.containerElement          | `?HTMLElement`     | The element to apply state classes to. If null, the controlled menu element is used. | `null`      |
| options.controlledMenu            | `Treeview`         | The menu controlled by this toggle.                                                  | `undefined` |
| options.parentMenu                | `Treeview`, `null` | The menu containing this toggle.                                                     | `null`      |
| options.breakpoint                | `string`           | The Core controller breakpoint.                                                      | `""`        |
| options.mediaQuery                | `string`           | The explicit Core controller media query.                                            | `""`        |
| options.expandInsideBreakpoint    | `boolean`          | Core's expandInsideBreakpoint responsive action flag.                                | `false`     |
| options.expandOutsideBreakpoint   | `boolean`          | Core's expandOutsideBreakpoint responsive action flag.                               | `false`     |
| options.collapseInsideBreakpoint  | `boolean`          | Core's collapseInsideBreakpoint responsive action flag.                              | `false`     |
| options.collapseOutsideBreakpoint | `boolean`          | Core's collapseOutsideBreakpoint responsive action flag.                             | `false`     |
| options.lockInsideBreakpoint      | `boolean`          | Core's lockInsideBreakpoint responsive action flag.                                  | `false`     |
| options.lockOutsideBreakpoint     | `boolean`          | Core's lockOutsideBreakpoint responsive action flag.                                 | `false`     |
| options.unlockInsideBreakpoint    | `boolean`          | Core's unlockInsideBreakpoint responsive action flag.                                | `false`     |
| options.unlockOutsideBreakpoint   | `boolean`          | Core's unlockOutsideBreakpoint responsive action flag.                               | `false`     |
| options.initialize                | `boolean`          | A flag to initialize the menu toggle immediately upon creation.                      | `true`      |

## Initialize

Initializes the menu toggle.

```js
TreeviewToggle.initialize();
```

The first steps are to ensure that the toggle and controlled menu have IDs using the [setIds](./base-menu-toggle#method--setIds) method, and to set the ARIA attributes on the toggle and controlled menu using the [setAriaAttributes](#method--setAriaAttributes) method.

Then the [expand](./base-menu-toggle#method--expand) or [collapse](./base-menu-toggle#method--collapse) method is called based on the state of the toggle's aria-expanded attribute.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the TreeviewToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the TreeviewToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overridden in the TreeviewToggle class.

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
TreeviewToggle._setAriaAttributes();
```

The first steps are to ensure that the toggle has `aria-expanded` set to "false" if it's not already set explicitly to "true".

Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to the toggle's ID, and the toggle's `aria-owns` is set to the menu's ID.
