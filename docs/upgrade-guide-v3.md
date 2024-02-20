# Upgrading from v2 to v3

There have been a few breaking changes between version 2 and version 3 of accessible menu, to upgrade you should keep the following in mind.

## Distribution file changes

Version 3 of accessible-menu has changed the naming scheme for compiled files to make them more "url-friendly".

- `dist/accessibleMenu.js` has changed to `dist/accessible-menu.js`, and
- `dist/accessibleMenu.min.js` has changed to `dist/accessible-menu.min.js`.

Make sure you update your imports/script urls accordingly.

## Source file and class name changes

Version 3 of accessible-menu has completely overhauled the class system used to create the different menu classes.

The most important change with this is the creation of "base" menu item and toggle classes with each subclass of menu having it's own subclasses for menu times and toggles. This allows for easier one-off customization per-menu subclass without affecting all other menus.

- `menuItem.js` has been replaced with `_baseMenuItem.js` and exports the [`BaseMenuItem`](/api/base-menu-item) class.
- `menuToggle.js` has been replaced with `_baseMenuToggle.js` and exports the [`BaseMenuToggle`](/api/base-menu/toggle) class.
- [`BaseMenu`](/api/base-menu) now uses the `BaseMenuItem` and `BaseMenuToggle` classes.
- [`DisclosureMenu`](/api/disclosure-menu) now uses the [`DisclosureMenuItem`](/api/disclosure-menu-item) and [`DisclosureMenuToggle`](/api/disclosure-menu-toggle) classes.
- [`Menubar`](/api/menubar) now uses the [`MenubarItem`](/api/menubar-item) and [`MenubarToggle`](/api/menubar-toggle) classes.

If you have written custom subclass that extend the `MenuItem` or `MenuToggle` classes, they should now extend the `BaseMenuItem` and `BaseMenuToggle` classes respectively.

## Disclosure Menu option keyboard support

In version 2, Disclosure Menus _always_ had the [keyboard support that is labelled as "optional"](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html#kbd_label). This is no longer the case in version 3.

You will need to set the [`optionalKeySupport`](/optional-keyboard-support) value to `true` to gain access to the optional keyboard support.

## Class field/method changes

Version 3 of accessible-menu has cleaned up and renamed some class fields and methods:

### Menu fields

- `BaseMenu.domElements` has been renamed to `BaseMenu._dom`
- `BaseMenu.domSelectors` has been renamed to `BaseMenu._selectors`
- `BaseMenu.menuElements` has been renamed to `BaseMenu._elements`
- `BaseMenu.submenuOpenClass` has been renamed to `BaseMenu._openClass`
- `BaseMenu.submenuCloseClass` has been renamed to `BaseMenu._closeClass`
- `BaseMenu.root` has been renamed to `BaseMenu._root`
- `BaseMenu.focussedChild` has been renamed to `BaseMenu._currentChild`
- `BaseMenu.state` has been renamed to `BaseMenu._focusState`
- `BaseMenu.event` has been renamed to `BaseMenu._currentEvent`
- `BaseMenu.hoverable` has been renamed to `BaseMenu._hoverType`
- `BaseMenu.delay` has been renamed to `BaseMenu._hoverDelay`

### Menu methods

- `BaseMenu.setDOMElementType()` and `BaseMenu.addDOMElementType()` have been merged into `BaseMenu._setDOMEelementType()`
- `BaseMenu.clearDOMElementType()` has been renamed to `BaseMenu._resetDOMElementType()`
- `BaseMenu.setDOMElements()` has been renamed to `BaseMenu._setDOMElements()`
- `BaseMenu.findRootMenu()` has been renamed to `BaseMenu._findRootMenu()`
- `BaseMenu.createChildElements()` has been renamed to `BaseMenu._createChildElements()`
- `BaseMenu.handleFocus()` has been renamed to `BaseMenu._handleFocus()`
- `BaseMenu.handleClick()` has been renamed to `BaseMenu._handleClick()`
- `BaseMenu.handleHover()` has been renamed to `BaseMenu._handleHover()`
- `BaseMenu.handleKeydown()` has been renamed to `BaseMenu._handleKeydown()`
- `BaseMenu.handleKeyup()` has been renamed to `BaseMenu._handleKeyup()`

### Menu item fields

- `MenuItem.domElements` has been renamed to `BaseMenuItem._dom`
- `MenuItem.menuElements` has been renamed to `BaseMenuItem._elements`
- `MenuItem.isController` has been renamed to `BaseMenuItem._submenu`

### Menu toggle fields

- `MenuToggle.domElements` has been renamed to `BaseMenuToggle._dom`
- `MenuToggle.menuElements` has been renamed to `BaseMenuToggle._elements`
- `MenuToggle.show` has been renamed to `BaseMenuToggle._open`
- `MenuToggle.expandEvent` has been renamed to `BaseMenuToggle._expandEvent`
- `MenuToggle.collapseEvent` has been renamed to `BaseMenuToggle._collapseEvent`
- `MenuToggle.openClass` has been removed
- `MenuToggle.closeClass` has been removed

### Menu toggle methods

- `MenuToggle.expand()` has been renamed to `BaseMenuToggle._expand()`
- `MenuToggle.collapse()` has been renamed to `BaseMenuToggle._collapse()`
