# Hover Delay

All menus provided by Accessible Menu support a configurable hover delay. The hover delay is the amount of time, in milliseconds, that a user must hover over a menu toggle before the menu will open.

This can be useful for preventing menus from opening when a user accidentally hovers over a menu toggle.

::: tip Note
The hover delay is only used when the menu is in hover **on** or hover **dynamic** mode.
:::

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "on",
  hoverDelay: 300, // Default: 250.
});
```

## Enter Delay

If you need to customize _only_ the delay before a menu opens, you can use the `enterDelay` option. This will override whatever the `hoverDelay` option is set to when it comes to `pointerenter` events.

This can be useful for creating a menu with a reduced delay to open a menu when a user hovers over a menu toggle, but still delay closing of the menu by the standard amount of time (250ms) when a user hovers off the menu.

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "on",
  enterDelay: 100, // Default: -1.
});
```

Setting `enterDelay` to `-1` will cause the menu to use the `hoverDelay` option instead.

## Leave Delay

If you need to customize _only_ the delay before a menu closes, you can use the `leaveDelay` option. This will override whatever the `hoverDelay` option is set to when it comes to `pointerleave` events.

This can be useful for creating a menu with an increased delay to close a menu when a user hovers off a menu, but still open the menu by the standard amount of time (250ms) when a user hovers over the menu toggle.

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "on",
  leaveDelay: 500, // Default: -1.
});
```

Setting `leaveDelay` to `-1` will cause the menu to use the `hoverDelay` option instead.
