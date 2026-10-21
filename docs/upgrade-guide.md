# Upgrade guide

## Upgrading from v4

The following information covers changes from v4 to v5 of accessible-menu. It is not an exhaustive list, but should cover the most common changes you will need to make.

You can find the full list of changes in the [changelog](https://github.com/NickDJM/accessible-menu/blob/5.x/CHANGELOG.md).

### General changes

#### Selector option renaming {#general-changes-selector-option-renaming}

The selector options have been renamed to match the naming conventions used throughout the library.

You _must_ update any customized selector options when upgrading to v5, or your menu will not work correctly.

| Old option name         | New option name          |
| ----------------------- | ------------------------ |
| `menuItemSelector`      | `menuItemsSelector`      |
| `menuLinkSelector`      | `menuLinksSelector`      |
| `submenuItemSelector`   | `submenuItemsSelector`   |
| `submenuToggleSelector` | `submenuTogglesSelector` |
| `submenuSelector`       | `submenusSelector`       |

#### Expanding and collapsing

The open and close names have been changed to expand and collapse. Update constructor options, property access, and method calls:

| v4 name                                                            | v5 name                                                                 |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `open()` / `close()`                                               | `expand()` / `collapse()`                                               |
| `openChildren()` / `closeChildren()` / `closeSiblings()`           | `expandChildren()` / `collapseChildren()` / `collapseSiblings()`        |
| `isOpen`.                                                          | `isExpanded`                                                            |
| `hasOpened`.                                                       | `hasExpanded`                                                           |
| `openClass` / `closeClass`                                         | `expandClass` / `collapseClass`                                         |
| `openDuration` / `closeDuration`                                   | `expandDuration` / `collapseDuration`                                   |
| `--am-open-transition-duration` / `--am-close-transition-duration` | `--am-expand-transition-duration` / `--am-collapse-transition-duration` |

`preview()` and `toggle()` keep their names. The `show` and `hide` default class values are unchanged.

#### Toggle state changes

The writable `isOpen` property has been replaced by the read-only `isExpanded` property. Use `expand()`, `collapse()`, or `toggle()` to change state.

The new `shouldBeExpanded` getter lets you keep track of an earlier open or closed state. For example, closing an open menu with `preserveState: true` makes `isExpanded` return `false`, while `shouldBeExpanded` stays `true`. Without that option, both values change together.

#### Toggle method options

Toggle methods now accept an options object:

- `expand({ force, preserveState, emit, transition })`
- `preview({ force, preserveState, emit, transition })`
- `collapse({ force, preserveState, emit, transition })`
- `toggle({ force, preserveState, emit, transition })`
- `collapseSiblings({ force, preserveState, emit, transition })`
- `collapseChildren({ force, preserveState, emit, transition })`

Existing calls without arguments can keep that form after updating renamed methods.

After the menu is set up, the options have these defaults:

| Option          | Default | What it does                                                                         |
| --------------- | ------- | ------------------------------------------------------------------------------------ |
| `force`         | `false` | Runs the action even if the toggle is locked or already in that state.               |
| `preserveState` | `false` | Keeps the previous `shouldBeExpanded` value while changing whether the menu is open. |
| `emit`          | `true`  | Fires the action's custom events.                                                    |
| `transition`    | `true`  | Uses the menu's transition classes and duration.                                     |

While the menu is first being created, it uses `force: true`, `emit: false`, and `transition: false` to set its starting state without events or animations.

Toggles also have new lock and unlock methods. After initialization, a locked toggle ignores expand, preview, and collapse actions unless `force` is `true`.

#### Events

The expand and collapse events keep their v4 names, `accessibleMenuExpand` and `accessibleMenuCollapse`. The toggle is now available through `event.detail.component` instead of `event.detail.toggle`.

Use `toggle.getEventName("expand")` and `toggle.getEventName("collapse")` to get the event names.

#### Responsive actions

Automatic opening and closing based on screen size is new in v5. For example, you can keep navigation open on a desktop and close it behind a hamburger button on a phone. See [Automatic opening and closing](./automatic-opening-and-closing) for a complete example.

Set `breakpoint` to the width where the behavior should change. Then set `expandOutsideBreakpoint: true` to open above that width and `collapseInsideBreakpoint: true` to close at or below it. Both action options default to `false`. They affect the main menu, not individual submenus.

The width is checked when the menu is first set up and whenever the browser crosses the breakpoint. If you want the menu to reopen when the screen gets larger, enable `expandOutsideBreakpoint`; closing automatically does not enable reopening by itself.

You can read and update `breakpoint`, `mediaQuery`, and all eight responsive action flags on the menu after setup:

```js
menu.breakpoint = "60rem";
menu.expandOutsideBreakpoint = true;
menu.collapseInsideBreakpoint = true;
```

These properties pass through to the root controller. Changes made directly on the controller are reflected by the menu getters. Submenus use the root menu's values. The controller owns the responsive listener; the menu does not register a separate one.

Changing `breakpoint` or `mediaQuery` automatically replaces the controller's listener and cancels its pending callback. The updated query's current match state is applied on the next animation frame. An explicit `mediaQuery` takes priority over `breakpoint`. Changing an action flag takes effect the next time the controller handles a media-query match. See [responsive controller configuration](./api/base-menu#responsive-controller-configuration) for details.

#### Bundles

CommonJS bundles now use the `.cjs` extension. For example, `accessible-menu.cjs.js` is now `accessible-menu.cjs`. This also applies to the individual menu bundles. Package imports already resolve to the new names, but you must update any direct bundle paths.

The combined ESM bundle now provides named exports for `DisclosureMenu`, `Menubar`, `TopLinkDisclosureMenu`, and `Treeview`, in addition to its default export.

### Menu specific changes

#### Disclosure Menus

The general and developer changes apply to Disclosure Menus. There are no additional changes specific to this menu type.

#### Menubars

The general and developer changes apply to Menubars. There are no additional changes specific to this menu type.

#### Top Link Disclosure Menus

##### Selector option renaming {#top-link-disclosure-menu-selector-option-renaming}

Update the selector option for submenu toggles:

| Old option name            | New option name             |
| -------------------------- | --------------------------- |
| `submenuSubtoggleSelector` | `submenuSubtogglesSelector` |

See [General changes](#general-changes-selector-option-renaming) for the selector changes that affect all menu types.

#### Treeviews

The general and developer changes apply to Treeviews. There are no additional changes specific to this menu type.

### Developer changes

The following sections cover custom menu subclasses and code that imports helpers directly. If you only create menus with the public constructor options, you can skip these sections.

#### Core inheritance

`BaseMenu` and `BaseMenuItem` now extend `Component` from `@accessible-ecosystem/core`. `BaseMenuToggle` extends Core's `CollapsibleComponent`.

Shared accessors, validation, DOM helpers, timers, event listeners, storage, initialization, and disposal now come from Core. Accessible Menu still provides child creation, IDs, ARIA attributes, and interaction handlers.

The inherited properties and methods remain documented in the [API reference](./api/).

#### Initialization and validation hooks

In custom subclasses, call `super._bootstrap()` before registering listeners for `getEventName("preinitialize")`, `getEventName("initialize")`, or `getEventName("validate")`. Use these listeners to add initialization or validation behavior. Keep overrides for hooks that implement menu-specific behavior, such as `_createChildElements()` and the interaction handlers.

Check `event.detail.component === this` before running a listener because these events bubble from child components. If custom validation fails, add its errors to `_errors` and set `_valid = false`.

Core registers initialization, validation, expansion, collapse, lock, and unlock events, including their pre and post events. Subclasses do not need to register these event types again. All menu, menu item, and toggle classes use the `accessibleMenu` event prefix. For example, initialization dispatches `accessibleMenuInitialize` from each component.

Successful initialization sets the new `isInitialized` flag to `true`. Validation failures set `isValid` to `false` and populate `errors` with `Error` objects instead of strings. `BaseMenu.initialize()` now logs failures instead of throwing them to the caller. The concrete menu classes already logged initialization failures in v4.

Validation also checks required DOM elements and item/toggle relationships. Submenu items require both a child menu and a toggle. Top Link Disclosure menu items validate their optional sibling.

#### Class fields

The `_openClass`, `_closeClass`, and `_transitionClass` fields have been merged into `_classes`. The public getters/setters use the corresponding entries:

| v4 field           | v5 entry              | v5 getter/setter  |
| ------------------ | --------------------- | ----------------- |
| `_openClass`       | `_classes.expand`     | `expandClass`     |
| `_closeClass`      | `_classes.collapse`   | `collapseClass`   |
| `_transitionClass` | `_classes.transition` | `transitionClass` |

The new read-only `classes` getter provides access to this map. Menus also accept an `initializeClass` option, which defaults to `"initializing"` and applies while the menu initializes.

#### Duration fields

The `_transitionDuration`, `_openDuration`, and `_closeDuration` fields have been merged into `_durations`:

| v4 field              | v5 entry                | v5 getter/setter     |
| --------------------- | ----------------------- | -------------------- |
| `_transitionDuration` | `_durations.transition` | `transitionDuration` |
| `_openDuration`       | `_durations.expand`     | `expandDuration`     |
| `_closeDuration`      | `_durations.collapse`   | `collapseDuration`   |

The new read-only `durations` getter provides access to this map. Expand and collapse durations still default to `-1`, which uses `transitionDuration`.

Submenu durations inherit the root menu's settings. Changing a root transition, expand, or collapse duration also updates the CSS custom properties throughout the menu tree.

#### Delay fields

The `_hoverDelay`, `_enterDelay`, and `_leaveDelay` fields have been merged into `_delays`:

| v4 field      | v5 entry        |
| ------------- | --------------- |
| `_hoverDelay` | `_delays.hover` |
| `_enterDelay` | `_delays.enter` |
| `_leaveDelay` | `_delays.leave` |

The public `hoverDelay`, `enterDelay`, and `leaveDelay` getters/setters keep their names. The new read-only `delays` getter provides access to the map.

#### Other protected members

Update these references in custom subclasses:

| v4 member                           | v5 replacement                                    |
| ----------------------------------- | ------------------------------------------------- |
| Menu `_hasOpened`                   | `_hasExpanded`                                    |
| Toggle `_open` boolean              | `_expanded`, a Core `TransactionalValue<boolean>` |
| Toggle `_dom.toggle` / `dom.toggle` | `_dom.controller` / `dom.controller`              |
| `_setTransitionDurations()`         | `_setCustomProps()`                               |
| `_hoverTimeout`                     | The hover timer in `_timeouts._default`           |

Use public toggle actions to update expansion state. Unlike the v4 `_open` boolean, `_expanded` stores both current and committed values.

The new `dom.controlled` entry defaults to the controlled menu element. Pass `containerElement` to the toggle constructor to apply state classes to another element. Toggles no longer accept `parentElement` or expose `dom.parent`. Toggle class and duration getters read the controlled menu's root settings.

#### Separate links and submenu toggles

The base menu classes now handle the link and toggle creation used by Top Link Disclosure. All menu item constructors accept an optional `submenuSibling`. Its default is `null`. When a navigation link has a separate toggle item, `elements.sibling` points to that item.

Top Link Disclosure keeps its existing behavior. The other built-in menu types still create one combined submenu item. Custom subclasses can set the protected `_splitMenuLinks` field to `true` to create separate items, then provide the keyboard and hover behavior for their menu type. The protected `_submenuOptions` getter provides additional child-menu options when they are needed. `_createChildElements()` takes no arguments. These are not menu constructor options.

Top Link Disclosure no longer combines the navigation link and toggle selectors in `selectors.menuLinks`. BaseMenu now looks for each element separately and uses the toggle if no separate link exists. Custom code that reads `selectors.menuLinks` should use `selectors.submenuToggles` when it needs to find toggles.

#### Selectors for deeper submenu toggles

`submenuSubtogglesSelector` is now available on every menu type through BaseMenu. It chooses the toggles inside child menus and at all deeper levels. Its default is `null`, which uses the configured `submenuTogglesSelector`, so existing setups keep their selectors. Top Link Disclosure continues to default to `"a"` for deeper toggles.

The shared `_submenuOptions` getter reads `selectors.submenuSubtoggles` when creating each child menu. Top Link Disclosure no longer overrides that getter.

#### DOM helpers

`_setDOMElementType()` now takes an options object instead of positional context and overwrite arguments:

```js
// v4
this._setDOMElementType("submenus", item, false);

// v5
this._setDOMElementType("submenus", { context: item, overwrite: false });
```

BaseMenu still selects direct children by default. Pass `strict: false` to include deeper descendants. Core also supports populating and resetting single-element entries, in addition to arrays. Root and protected DOM entries cannot be set or reset through these helpers.

#### Event fields and listeners

The `_expandEvent` and `_collapseEvent` fields have been replaced by `_events.expand` and `_events.collapse`. The read-only `events` getter provides access to the registered custom events.

Dispatch registered events through `_dispatchEvent(type, element)`. The element defaults to `rootDOMElement`. This method validates the event type and target before dispatching.

The protected `_expand()` and `_collapse()` methods also use an options object instead of v4's `emit` boolean. For example, replace `_collapse(false)` with `_collapse({ emit: false })`. You can also pass `transition: false` to skip transitions.

Use `_addEventListener()` to register listeners so the component can track them. `_removeEventListener()` removes one tracked listener, and `_removeEventListeners()` removes all matching listeners. `dispose()` removes the remaining listeners automatically.

#### Interaction state and focus

In v4, setting a menu's `currentEvent` copied the value to its submenus. In v5, submenus, items, and toggles read the root menu's value directly. Setting `currentEvent` on any of them also updates the root, so custom code should not use it to track a separate event for one submenu.

In v4, each menu calculated `shouldFocus` from its own event value, and items used their containing menu's decision. In v5, all menus, items, and toggles use the root menu's decision. It allows DOM focus when `currentEvent` is `"keyboard"` or `"character"`. Mouse interaction with dynamic hover no longer allows focus methods to move keyboard focus.

Focus methods still update selection and focus state when DOM focus is not allowed. They do not change `currentEvent` themselves. If custom code needs to move keyboard focus, set the event before calling a focus method:

```js
menu.currentEvent = "keyboard";
menu.focusFirstChild();
```

Menu item `focus()` and `blur()` still move DOM focus on an animation frame. Pending item focus is now cancelled when the item is blurred or disposed of. Before focusing, the callback also checks that focus has not moved elsewhere and the root menu still allows it. Selection and focus-state changes happen immediately, so code should not assume that `document.activeElement` changes in the same call.

Custom handlers that move into a submenu can use the shared protected `_focusSubmenu(menuItem, { childIndex: 0, defer: false })` method. Set `defer: true` to wait one animation frame before selecting the submenu item. A deferred move is cancelled if the submenu collapses, selection changes, or focus moves away. See [the BaseMenu API](./api/base-menu#method--focussubmenu) for details.

#### Timeouts

The single `_hoverTimeout` field has been replaced by scoped timers. `_setTimeout(callback, delay, scope)` and `_clearTimeout(scope)` default to the `"_default"` scope. `_clearTimeouts()` clears all tracked timeouts.

Setting a timeout clears the previous timer in the same scope before scheduling another. This differs from v4, where `_setTimeout()` could leave a previous callback scheduled.

#### Animation frames

Use Core's `_requestAnimationFrame(callback, scope)` to track deferred work in custom components. It replaces a pending frame in the same scope. `_cancelAnimationFrame(scope)` cancels one tracked frame, and `_cancelAnimationFrames()` cancels them all. The default scope is `"_default"`.

Disposal cancels tracked frames automatically. Use these helpers instead of calling the browser's `requestAnimationFrame()` directly when the work should be cancelled with the component.

#### Storage and disposal

Root menus are now stored in `window.AccessibleMenuStorage.storage.menus` instead of `window.AccessibleMenu.menus`. The global object is a Core `StorageManager` instance. Pass `type: "menus"` when calling its storage methods directly:

```js
window.AccessibleMenuStorage.get({ type: "menus", key: "menu-id" });
```

Calling `dispose()` on a root menu disposes of its submenus, menu items, submenu toggles, and root controller. It removes their event listeners, timers, pending animation frames, and the root menu's global storage entry. Do not continue using these components after disposal.

#### Menu items and component IDs

Menu items now have a `shouldFocus` getter that reads the root menu's permission. Their `focus()` and `blur()` methods still respect that permission when moving focus in the DOM, and now update the item's `focusState` even when DOM focus does not move.

After initialization, the new `id` getter returns the menu's DOM ID, a toggle controller's DOM ID, or a menu item's existing DOM ID. Menu items do not receive generated DOM IDs.

#### Helper imports

The local `domHelpers`, `eventHandlers`, and `validate` files have been removed. Update imports to use Core directly:

| v4 import                              | v5 import                                    |
| -------------------------------------- | -------------------------------------------- |
| `accessible-menu/src/domHelpers.js`    | `@accessible-ecosystem/core/domHelpers.js`   |
| `accessible-menu/src/eventHandlers.js` | `@accessible-ecosystem/core/eventHelpers.js` |
| `accessible-menu/src/validate.js`      | `@accessible-ecosystem/core/validate.js`     |

Core also provides `StorageManager.js` and `TransactionalValue.js`, along with focusable-element selectors and the `isValidEventType()` and `hasValidRootDOMElement()` validators. Core's DOM class helpers ignore empty strings in class arrays.

#### Error handling and validation

Validation helpers now accept an options object after their existing parameters. The `shouldThrow` option defaults to `true`, which throws the first validation error. This differs from v4, where the helpers returned the error.

Pass `{ shouldThrow: false }` to collect all validation errors instead. The result uses an `errors` array instead of v4's single `error` property:

```js
{
  status: false,
  errors: [new TypeError("Example validation error")],
}
```

Component validation checks `_dom`, `_selectors`, `_classes`, `_durations`, and `_delays` through Core's `_validate()` method. Custom menus can add validation through the `validate` event instead of repeating these checks.

## Upgrading from v1, v2, or v3

If you're still using v1, v2, or v3 you will need to follow the upgrade guides for those versions before upgrading to v5.

For v1 or v2, please follow the upgrade guide for v3 first, which can be found [here](/upgrade-guide-v3).

For v3, please follow the upgrade guide for v4 first, which can be found [here](/upgrade-guide-v4).
