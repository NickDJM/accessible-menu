# Automatic Opening and Closing of Menus

Accessible Menu provides built-in support for automatically opening and closing menus based on screen size. This feature is particularly useful for when you do not want to have custom styles to ignore the root menu being closed on larger screens (a.k.a. not in a hamburger menu or collapsed state).

## Enabling Automatic Opening and Closing

To enable automatic opening and closing of the menu based on screen size, set the `breakpoint` option to a string using valid units when creating a new menu instance.

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  controllerElement: document.querySelector("button.menu-toggle"),
  containerElement: document.querySelector("nav"),
  breakpoint: "768px", // Set the breakpoint to a unit of your choosing (px, ch, em, etc.).
});
```
## How It Works

When a `breakpoint` value is passed, the menu will use `window.mediaMatch` to automatically open when the viewport width is greater than or equal to the specified `breakpoint`. Conversely, the menu will automatically close when the viewport width is less than the `breakpoint`.

By default, the media query used is `(width <= ${breakpoint})`.

You _can_ pass `autoOpen: false` to prevent the menu from automatically opening when the breakpoint is met, but the menu will still automatically close when the viewport width is less than the `breakpoint`.

## Customizing Behavior

You can pass custom media queries to the menu by using the `mediaQuery` option. This allows you to create more complex conditions for when the menu should open or close.

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  controllerElement: document.querySelector("button.menu-toggle"),
  containerElement: document.querySelector("nav"),
  mediaQuery: "(min-width: 768px) and (orientation: landscape)", // Custom media query.
});
```

For more details, see the [API docs](./api/base-menu)
