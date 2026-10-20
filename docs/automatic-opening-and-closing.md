# Automatic opening and closing of menus

Accessible Menu provides built-in support for automatically opening and closing menus based on screen size.

For example, you might want a hamburger menu on smaller screens and an open navigation on larger screens. Accessible Menu can open or close the main menu as the browser gets wider or narrower. These settings affect the main menu controlled by your hamburger button. Submenus still open and close through their own toggles.

## Enabling automatic opening and closing

Set `breakpoint` to the width where you want the behavior to change. Use a string with a CSS unit, such as `"768px"`, `"48em"`, or `"80ch"`.

You also need to choose what should happen on each side of that width. The following example opens the menu on larger screens and closes it on smaller screens:

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  controllerElement: document.querySelector("button.menu-toggle"),
  containerElement: document.querySelector("nav"),
  breakpoint: "768px",
  expandOutsideBreakpoint: true, // Open above 768px.
  collapseInsideBreakpoint: true, // Close at 768px or below.
});
```

Here, `controllerElement` is the button that opens and closes the main menu, and `containerElement` is the element containing that menu. If you haven't added a button yet, see the [collapsible menu example](./disclosure-menus#collapsible).

These options work with all four menu types. Setting a breakpoint alone does not open or close anything. Both action options default to `false`, so you must enable the behavior you want.

## How it works

With a `"768px"` breakpoint:

- At **768px or narrower**, `collapseInsideBreakpoint` closes the main menu. The user can open it again with the menu button.
- **Above 768px**, `expandOutsideBreakpoint` opens the main menu.

Accessible Menu checks the width when the menu is first created and again when the browser crosses the breakpoint. It uses the same opening and closing classes and transitions as a click on the menu button. See [Opening and closing the menu](./opening-and-closing) for how these classes and properties are applied.

The option names use "expand" to mean open and "collapse" to mean close. With a breakpoint, "inside" means at or below the chosen width, and "outside" means above it.

## Keeping the menu open on larger screens

If you want to prevent the menu from being closed on larger screens, you can also lock its toggle button. Locking stops the button from opening or closing the menu. The links inside the menu remain usable.

Add `lockOutsideBreakpoint` to lock the button on larger screens, and `unlockInsideBreakpoint` so the button works again on smaller screens:

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  controllerElement: document.querySelector("button.menu-toggle"),
  containerElement: document.querySelector("nav"),
  breakpoint: "768px",
  expandOutsideBreakpoint: true,
  lockOutsideBreakpoint: true,
  collapseInsideBreakpoint: true,
  unlockInsideBreakpoint: true,
});
```

This opens the menu and disables its toggle button above 768px. At 768px or below, the button is enabled again and the menu closes, ready for the user to open it.

## Available options {#action-options}

You can choose opening, closing, locking, and unlocking separately. All of these options default to `false`.

| What you want to do     | At or below the breakpoint | Above the breakpoint        |
| ----------------------- | -------------------------- | --------------------------- |
| Open the menu           | `expandInsideBreakpoint`   | `expandOutsideBreakpoint`   |
| Close the menu          | `collapseInsideBreakpoint` | `collapseOutsideBreakpoint` |
| Disable the menu button | `lockInsideBreakpoint`     | `lockOutsideBreakpoint`     |
| Enable the menu button  | `unlockInsideBreakpoint`   | `unlockOutsideBreakpoint`   |

An automatic open or close can unlock the button to make that change. Any lock option for the new screen size runs afterward. For example, the larger-screen options above open the menu first, then lock it open.

For more details, including changing these settings after creating a menu, see the [controller API](./api/base-menu-toggle).

## Customizing when the menu opens and closes

If screen width alone isn't enough, use `mediaQuery` to provide a CSS media query. For example, you might want the menu open only on a wide screen in landscape orientation:

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  controllerElement: document.querySelector("button.menu-toggle"),
  containerElement: document.querySelector("nav"),
  mediaQuery: "(min-width: 768px) and (orientation: landscape)",
  expandInsideBreakpoint: true, // Open when both conditions are met.
  collapseOutsideBreakpoint: true, // Close when they aren't.
});
```

With a custom query, "inside" means the conditions in your query are met. "Outside" means they are not. In this example, the menu opens at 768px or wider in landscape orientation, and closes at other sizes or orientations.

If you provide both `mediaQuery` and `breakpoint`, Accessible Menu uses `mediaQuery`.
