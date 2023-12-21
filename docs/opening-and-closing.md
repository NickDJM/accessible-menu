# Opening and Closing the Menu

All menus provided by Accessible Menu support opening and closing the menu through the addition of a set of optional classes (as well as proper aria-expanded attributes).

The default classes used are as follows:

- `show`: Applied to the menu when it is open.
- `hide`: Applied to the menu when it is closed.
- `transitioning`: Applied to the menu when it is in the process of opening or closing.

customizing these classes can be done through the `openClass`, `closeClass`, and `transitionClass` options.

## Customizing the Open Class {#open-class-customization}

To change the class(es) used to represent an open menu, you can pass in the `openClass` option. This option takes either a string, an array of strings, or a `null` value (for when you do not want an open class to be used).

::: code-group

```js [single string]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  openClass: "open", // Default: "show".
});
```

```js [array of strings]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  openClass: ["open", "flex"], // Default: "show".
});
```

```js [null]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  openClass: null, // Default: "show".
});
```

:::

## Customizing the Close Class {#close-class-customization}

To change the class(es) used to represent a closed menu, you can pass in the `closeClass` option. This option takes either a string, an array of strings, or a `null` value (for when you do not want a close class to be used).

::: code-group

```js [single string]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  closeClass: "closed", // Default: "hide".
});
```

```js [array of strings]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  closeClass: ["closed", "hidden"], // Default: "hide".
});
```

```js [null]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  closeClass: null, // Default: "hide".
});
```

:::

## Customizing the Transition Class {#transition-class-customization}

To change the class(es) used to represent a transitioning menu, you can pass in the `transitionClass` option. This option takes either a string, an array of strings, or a `null` value (for when you do not want a transition class to be used).

::: code-group

```js [single string]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  transitionClass: "changing", // Default: "transitioning".
});
```

```js [array of strings]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  transitionClass: ["changing", "overflow-hidden"], // Default: "transitioning".
});
```

```js [null]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  transitionClass: null, // Default: "transitioning".
});
```

:::

## Order of Operations {#order-of-operations}

When opening or closing a menu, a series of operations are followed based on the current state of the menu, and the classes that are being used.

### Opening a Menu with a Transition Class

When there are transition classes, the following operations are followed when opening a menu:

1. The menu toggle's `aria-expanded` attribute is set to `true`.
2. The `transitionClass` is added to the menu.
3. An animation frame is requested.
4. The `closeClass` is removed from the menu (if it exists).
5. An animation frame is requested.
6. The `openClass` is added to the menu (if it exists).
7. An animation frame is requested.
8. The `transitionClass` is removed from the menu.
9. An `accessibleMenuExpand` event is dispatched on the menu toggle.

### Opening a Menu without a Transition Class

When there are no transition classes, the following operations are followed when opening a menu:

1. The menu toggle's `aria-expanded` attribute is set to `true`.
2. The `openClass` is added to the menu (if it exists).
3. The `closeClass` is removed from the menu (if it exists).
4. An `accessibleMenuExpand` event is dispatched on the menu toggle.

### Closing a Menu with a Transition Class

When there are transition classes, the following operations are followed when closing a menu:

1. The menu toggle's `aria-expanded` attribute is set to `false`.
2. The `transitionClass` is added to the menu.
3. An animation frame is requested.
4. The `openClass` is removed from the menu (if it exists).
5. An animation frame is requested.
6. The `closeClass` is added to the menu (if it exists).
7. An animation frame is requested.
8. The `transitionClass` is removed from the menu.
9. An `accessibleMenuCollapse` event is dispatched on the menu toggle.

### Closing a Menu without a Transition Class

When there are no transition classes, the following operations are followed when closing a menu:

1. The menu toggle's `aria-expanded` attribute is set to `false`.
2. The `closeClass` is added to the menu (if it exists).
3. The `openClass` is removed from the menu (if it exists).
4. An `accessibleMenuCollapse` event is dispatched on the menu toggle.
