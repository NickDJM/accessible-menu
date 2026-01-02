# Upgrade guide

## Upgrading from v4

The following information is intended to help you upgrade from v4 to v5 of accessible-menu. It is not an exhaustive list of changes, but should cover the most common changes you will need to make.

You can find the full list of changes in the [changelog](https://github.com/NickDJM/accessible-menu/blob/5.x/CHANGELOG.md).

### Menu specific changes

#### Disclosure Menus

Currently, there are no breaking changes for Disclosure Menus in v5.

#### Menubars

Currently, there are no breaking changes for Menubars in v5.

#### Top Link Disclosure Menus

Currently, there are no breaking changes for Top Link Disclosure Menus in v5.

#### Treeviews

Currently, there are no breaking changes for Treeviews in v5.

### Developer changes

#### Class fields

All "class" fields (`_openClass`, `_closeClass`, and `_transitionClass`) have been merged into a single `_classes` field.

```js
_classes = {
  open: "",
  close: "",
  transition: "",
}
```

The corresponding getters/setters still exist, but now reference the appropriate `_classes` property.

A new read-only `classes` getter has been added in addiotion to the existing getter/setters.

#### Duration and delay fields

All "duration" fields (`_transitionDuration`, `_openDuration`, and `_closeDuration`) and all "delay" fields (`_hoverDelay`, `_enterDelay`, and `_leaveDelay`) have been merged into a single `_durations` field.

```js
_durations = {
  transition: 250,
  open: -1,
  close: -1,
  hover: 250,
  enter: -1,
  leave: -1,
}
```

The corresponding getters/setters still exist, but now reference the appropriate `_durations` property.

A new read-only `durations` getter has been added in addiotion to the existing getter/setters.

#### Event fields

All "event" fields (`_expandEvent` and `_collapseEvent`) have been merged into a single `_events` field.

```js
_events = {
  expand: new CustomEvent("accessibleMenuExpand", { bubbles: true, detail: { toggle } }),
  collapse: new CustomEvent("accessibleMenuCollapse", { bubbles: true, detail: { toggle } }),
}
```

A new read-only `events` getter has been added.

#### Dispatching events

All custom events are now dispatched through a new protected method called `_dispatchEvent`.

This allows for easier finding of events within the new `_events` field.

#### Event listeners

All event listeners are now set through a wrapper method (`_addEventListener`). This allows the menu to keep track of all event listeners that have been added _and_ makes it possible to remove all event listeners through 2 new methods (`_removeEventListener` and `_removeEventListeners`).

This change is to facilitate better cleanup of the menu if it is ever detroyed.

#### Timeouts

The `_setTimeout` method had been reworked to accept a scope parameter. This allows the menu to keep track of multiple timeouts and clear them through the reworked `_clearTimeout` method (which now also accepts a scope parameter) and a new `_clearTimeouts` method.

This change is to facilitate better cleanup of the menu if it is ever detroyed.

#### Storage

The global storage for menus has been reworked to use a new `StorageManager` class. The main change is menus are now stored in `window.AccessibleMenu.storage.menus` instead of in `window.AccessibleMenu.menus`.

## Upgrading from v1, v2, or v3

If you're still using v1, v2, or v3 you will need to follow the upgrade guides for those versions before upgrading to v5.

For v1 or v2, please follow the upgrade guide for v3 first, which can be found [here](/upgrade-guide-v3).

For v3, please follow the upgrade guide for v4 first, which can be found [here](/upgrade-guide-v4).
