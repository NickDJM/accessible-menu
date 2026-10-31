# Supported Hover Types

All menus provided by Accessible Menu support three types of hover: **off**, **on**, and **dynamic**.

Hover responds to mouse pointer events. Pen and touch events are ignored. Hover "on" can update the item tracked by the menu without moving keyboard focus. In dynamic mode, focus follows the pointer after a submenu has expanded or a root menu item has been clicked. Before activation, root-level dynamic hover leaves selection, focus, and submenu state unchanged. Merely focusing the menu with the keyboard or opening its external root controller does not enable dynamic hover.

The `enterDelay` and `leaveDelay` options control how long hover actions wait. Both use `hoverDelay` when set to `-1`.

## Hover Off

Hover **off** is the default hover type. All `pointerenter` and `pointerleave` events are ignored, and submenus expand or collapse through clicks and keyboard activation.

```js
// DisclosureMenu is used in this example, but all menus support these hover types.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "off", // Default: "off".
});
```

## Hover On

Hover **on** expands a submenu when the mouse enters its toggle. It collapses the submenu when the mouse leaves the list item containing that toggle and submenu. For Top Link Disclosure Menus, hovering the separate link can also expand its submenu.

```js
// DisclosureMenu is used in this example, but all menus support these hover types.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "on", // Default: "off".
});
```

### Treeviews and Hover On

When using a treeview menu with hover **on**, leaving an item does not collapse its submenu. Leaving the root menu collapses its submenus after `leaveDelay`. This keeps submenus expanded while the mouse moves between treeview items.

## Hover Dynamic

Hover **dynamic** lets the user expand a menu before hovering between its submenus. Expanding a submenu toggle sets the root menu's `dynamicHoverEnabled` value to `true`, whether the expansion comes from a click, keyboard interaction, or a method call. Clicking a root menu item also sets this value to `true`, including a navigation link that has no submenu.

Automatic expansion or collapse from a media query leaves `dynamicHoverEnabled` unchanged. It does not enable dynamic hover or reset it after a user has enabled it.

While `dynamicHoverEnabled` is `true`, hovering a root-level submenu toggle previews its submenu. Hovering an item without a submenu collapses the current menu's submenus. Within submenus, this hover behavior is available regardless of `dynamicHoverEnabled`.

Leaving an item does not collapse its submenu. For Disclosure Menus, Top Link Disclosure Menus, and Menubars, clicking outside the menu collapses it and resets `dynamicHoverEnabled`. Collapsing a toggle alone does not reset that value.

```js
// DisclosureMenu is used in this example, but all menus support these hover types.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "dynamic", // Default: "off".
});
```

### Treeviews and Hover Dynamic

When using a treeview menu with hover **dynamic**, hovering an item without a submenu keeps other submenus expanded. Leaving an item or the root menu also keeps submenus expanded. Use a toggle or the supported keyboard controls to collapse a submenu.
