# DisclosureMenuToggle

A link or button that controls the visibility of a [DisclosureMenu](./disclosure-menu).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `DisclosureMenuToggle`.

```js
new DisclosureMenuToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
  initialize,
});
```

The constructor will call [BaseMenuToggle's constructor](./base-menu-toggle#constructor) with the provided options. It will also initialize the menu toggle if the initialize flag is set to true.

### Parameters {#constructor--parameters}

| Name                              | Type                     | Description                                                     | Default     |
| --------------------------------- | ------------------------ | --------------------------------------------------------------- | ----------- |
| options                           | `object`                 | The options for generating the menu toggle.                     | `undefined` |
| options.menuToggleElement         | `HTMLElement`            | The toggle element in the DOM.                                  | `undefined` |
| options.parentElement             | `HTMLElement`            | The element containing the controlled menu.                     | `undefined` |
| options.controlledMenu            | `DisclosureMenu`         | The menu controlled by this toggle.                             | `undefined` |
| options.parentMenu                | `DisclosureMenu`, `null` | The menu containing this toggle.                                | `null`      |
| options.breakpoint                | `string`                 | The Core controller breakpoint.                                 | `""`        |
| options.mediaQuery                | `string`                 | The explicit Core controller media query.                       | `""`        |
| options.expandInsideBreakpoint    | `boolean`                | Core's expandInsideBreakpoint responsive action flag.           | `false`     |
| options.expandOutsideBreakpoint   | `boolean`                | Core's expandOutsideBreakpoint responsive action flag.          | `false`     |
| options.collapseInsideBreakpoint  | `boolean`                | Core's collapseInsideBreakpoint responsive action flag.         | `false`     |
| options.collapseOutsideBreakpoint | `boolean`                | Core's collapseOutsideBreakpoint responsive action flag.        | `false`     |
| options.lockInsideBreakpoint      | `boolean`                | Core's lockInsideBreakpoint responsive action flag.             | `false`     |
| options.lockOutsideBreakpoint     | `boolean`                | Core's lockOutsideBreakpoint responsive action flag.            | `false`     |
| options.unlockInsideBreakpoint    | `boolean`                | Core's unlockInsideBreakpoint responsive action flag.           | `false`     |
| options.unlockOutsideBreakpoint   | `boolean`                | Core's unlockOutsideBreakpoint responsive action flag.          | `false`     |
| options.initialize                | `boolean`                | A flag to initialize the menu toggle immediately upon creation. | `true`      |

## Initialize

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the DisclosureMenuToggle class.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the DisclosureMenuToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the DisclosureMenuToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the DisclosureMenuToggle class.

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
DisclosureMenuToggle._setAriaAttributes();
```

Calls the [BaseMenuToggle's _setAriaAttributes method](./base-menu-toggle#method--setAriaAttributes).

Ensures the toggle element has a `role` of "button" if it is not already a button.

Then using the toggle and menu's IDs, the toggle's `aria-controls` is set to the menu's ID.

### expand <badge type="tip" text="public" /> {#method--expand}

Opens and controlled menu.

```js
DisclosureMenuToggle.expand();
```

Calls the [collapseSiblings (inherited) method](./base-menu-toggle#method--collapsesiblings) and _then_ [BaseMenuToggle's expand method](./base-menu-toggle#method--expand).

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
DisclosureMenuToggle.preview();
```

Calls the [collapseSiblings (inherited) method](./base-menu-toggle#method--collapsesiblings) and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#method--preview).

### collapse <badge type="tip" text="public" /> {#method--collapse}

Closes the controlled menu.

```js
DisclosureMenuToggle.collapse();
```

Calls the [collapseChildren (inherited) method](./base-menu-toggle#method--collapsechildren) and _then_ [BaseMenuToggle's collapse method](./base-menu-toggle#method--collapse).
