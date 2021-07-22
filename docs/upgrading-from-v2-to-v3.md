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

- `menuItem.js` has been replaced with `_baseMenuItem.js` and exports the [`BaseMenuItem`](https://accessible-menu.netlify.app/basemenuitem) class.
- `menuToggle.js` has been replaced with `_baseMenuToggle.js` and exports the [`BaseMenuToggle`](https://accessible-menu.netlify.app/basemenutoggle) class.
- [`BaseMenu`](https://accessible-menu.netlify.app/basemenu) now uses the `BaseMenuItem` and `BaseMenuToggle` classes.
- [`DisclosureMenu`](https://accessible-menu.netlify.app/disclosuremenu) now uses the [`DisclosureMenuItem`](https://accessible-menu.netlify.app/disclosuremenuitem) and [`DisclosureMenuToggle`](https://accessible-menu.netlify.app/disclosuremenutoggle) classes.
- [`Menubar`](https://accessible-menu.netlify.app/menubar) now uses the [`MenubarItem`](https://accessible-menu.netlify.app/menubaritem) and [`MenubarToggle`](https://accessible-menu.netlify.app/menubartoggle) classes.

If you have written custom subclass that extend the `MenuItem` or `MenuToggle` classes, they should now extend the `BaseMenuItem` and `BaseMenuToggle` classes respectively.

## Disclosure Menu option keyboard support

In version 2, Disclosure Menus _always_ had the [keyboard support that is labelled as "optional"](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html#kbd_label). This is no longer the case in version 3.

You will need to set the [`optionalKeySupport`](https://accessible-menu.netlify.app/disclosuremenu#optionalKeySupport) value to `true` to gain access to the optional keyboard support.

## Class field changes

Version 3 of accessible-menu has cleaned up and renamed some class fields:

### Menu fields

- `BaseMenu.domElements` has changed to `BaseMenu._dom`
- `BaseMenu.domSelectors` has changed to `BaseMenu._selectors`
- `BaseMenu.menuElements` has changed to `BaseMenu._elements`
- `BaseMenu.submenuOpenClass` has changed to `BaseMenu._openClass`
- `BaseMenu.submenuCloseClass` has changed to `BaseMenu._closeClass`
- `BaseMenu.root` has changed to `BaseMenu._root`
- `BaseMenu.focussedChild` has changed to `BaseMenu._currentChild`
- `BaseMenu.state` has changed to `BaseMenu._focusState`
- `BaseMenu.event` has changed to `BaseMenu._currentEvent`
- `BaseMenu.hoverable` has changed to `BaseMenu._hoverType`
- `BaseMenu.delay` has changed to `BaseMenu._hoverDelay`

### Menu item fields

- `MenuItem.domElements` has changed to `BaseMenuItem._dom`
- `MenuItem.menuElements` has changed to `BaseMenuItem._elements`
- `MenuItem.isController` has changed to `BaseMenuItem._submenu`

### Menu toggle fields

- `MenuToggle.domElements` has changed to `BaseMenuToggle._dom`
- `MenuToggle.menuElements` has changed to `BaseMenuToggle._elements`
- `MenuToggle.show` has changed to `BaseMenuToggle._open`
- `MenuToggle.expandEvent` has changed to `BaseMenuToggle._expandEvent`
- `MenuToggle.collapseEvent` has changed to `BaseMenuToggle._collapseEvent`
- `MenuToggle.openClass` has been removed
- `MenuToggle.closeClass` has been removed
