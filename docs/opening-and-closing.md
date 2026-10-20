# Opening and Closing the Menu

Accessible Menu opens and closes menus by adding and removing CSS classes. It does not provide CSS or apply visual styling. It also updates the menu button's `aria-expanded` attribute so screen readers know whether the menu is open.

The default classes used are as follows:

- `show`: Applied to the menu when it is open.
- `hide`: Applied to the menu when it is closed.
- `transitioning`: Applied to the menu when it is in the process of opening or closing.

You can change these classes through the `expandClass`, `collapseClass`, and `transitionClass` options. In the option names, "expand" means open and "collapse" means close. Your CSS decides how those classes show, hide, or animate the menu.

## Customizing the Open Class

To change the class(es) used to represent an open menu, you can pass in the `expandClass` option. This option takes either a string, an array of strings, or a `null` value (for when you do not want an open class to be used).

::: code-group

```js [single string]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  expandClass: "open", // Default: "show".
});
```

```js [array of strings]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  expandClass: ["open", "flex"], // Default: "show".
});
```

```js [null]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  expandClass: null, // Default: "show".
});
```

:::

## Customizing the Close Class

To change the class(es) used to represent a closed menu, you can pass in the `collapseClass` option. This option takes either a string, an array of strings, or a `null` value (for when you do not want a close class to be used).

::: code-group

```js [single string]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  collapseClass: "closed", // Default: "hide".
});
```

```js [array of strings]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  collapseClass: ["closed", "hidden"], // Default: "hide".
});
```

```js [null]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  collapseClass: null, // Default: "hide".
});
```

:::

## Customizing the Transition Class

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

## Transition Duration

When a menu has a transition class, `transitionDuration` sets how long the library waits before removing that class after the opening or closing class changes. The duration is in milliseconds. It does not create a CSS transition.

The reason for this is to allow for the menu's closing transition to be animated. Most of the time, when a menu is closed it will have the CSS property `display` set to `none`, which causes issues when trying to animate between states. Setting a timeout before the transition class is removed from the menu, allows you to transition between something like `opacity` or `transform` before the menu is visually removed.

The menu sets `--am-transition-duration`, `--am-expand-transition-duration`, and `--am-collapse-transition-duration` as inline CSS custom properties on each menu's `menuElement`. Their values are the configured durations in milliseconds. The prefix of each property, `am-`, can be customized through the menu's `prefix` option. Setting these properties does not apply styling on its own.

Set `transitionDuration` to `0` to use no timed delay. To skip the transition class entirely, set `transitionClass` to `null`.

::: code-group

```js [custom duration]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  transitionClass: "changing",
  transitionDuration: 300, // Default: 250.
});
```

```js [no duration]
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  transitionClass: "changing",
  transitionDuration: 0, // Default: 250.
});
```

:::

You can also set `expandDuration` and `collapseDuration` separately to control the opening and closing waits. Each defaults to `-1`, which results in using the value of `transitionDuration` instead.

## Order of Operations

The following steps describe when Accessible Menu updates attributes and classes. An animation frame is the browser's next chance to update what it draws. The expand and collapse events fire when opening or closing starts, rather than waiting for the animation to finish.

### Opening a Menu with a Transition Class

When there are transition classes, the following operations are followed when opening a menu:

1. The menu toggle's `aria-expanded` attribute is set to `true`.
2. The `transitionClass` is added to the menu.
3. An animation frame is requested.
4. The `collapseClass` is removed from the menu (if it exists).
5. An animation frame is requested.
6. The `expandClass` is added to the menu (if it exists).
7. After another animation frame and the opening duration, the `transitionClass` is removed from the menu.

The `accessibleMenuExpand` event fires after these class changes have been scheduled. It does not wait for the animation to finish.

### Opening a Menu without a Transition Class

When there are no transition classes, the following operations are followed when opening a menu:

1. The menu toggle's `aria-expanded` attribute is set to `true`.
2. The `expandClass` is added to the menu (if it exists).
3. The `collapseClass` is removed from the menu (if it exists).
4. An `accessibleMenuExpand` event is dispatched on the menu toggle.

### Closing a Menu with a Transition Class

When there are transition classes, the following operations are followed when closing a menu:

1. The menu toggle's `aria-expanded` attribute is set to `false`.
2. The `transitionClass` is added to the menu.
3. An animation frame is requested.
4. The `expandClass` is removed from the menu (if it exists).
5. An animation frame is requested.
6. The `collapseClass` is added to the menu (if it exists).
7. After another animation frame and the closing duration, the `transitionClass` is removed from the menu.

The `accessibleMenuCollapse` event fires after these class changes have been scheduled. It does not wait for the animation to finish.

### Closing a Menu without a Transition Class

When there are no transition classes, the following operations are followed when closing a menu:

1. The menu toggle's `aria-expanded` attribute is set to `false`.
2. The `collapseClass` is added to the menu (if it exists).
3. The `expandClass` is removed from the menu (if it exists).
4. An `accessibleMenuCollapse` event is dispatched on the menu toggle.

## Changing where the classes are added

By default, a submenu toggle adds the expand, collapse, and transition classes to the submenu's `<ul>` element. A root menu's controller applies those classes to the menu's configured `containerElement`.

When creating a toggle in a custom menu class, you can pass `containerElement` to add those classes to another element. For example, this toggle adds the classes to the list item containing the submenu. Here, `submenu` is the submenu object, `submenuButton` is its button element, and `parentMenu` is the menu containing it:

```js
new DisclosureMenuToggle({
  menuToggleElement: submenuButton,
  controlledMenu: submenu,
  parentMenu,
  containerElement: submenu.dom.menu.parentElement,
});
```

The toggle stores this element as `dom.controlled`. If `containerElement` is omitted or set to `null`, it uses the menu element instead. Locked and unlocked classes also apply to this element.

The button controls the submenu. Its ARIA attributes reference the submenu rather than the container.

`containerElement` is a toggle constructor option. Menus create their submenu toggles automatically, so using a different container for those toggles requires a custom menu or toggle class. See the [toggle API](./api/disclosure-menu-toggle#constructor) for the constructor options.
