# Global Menu Storage

Accessible Menu provides a global storage object that is used to store all instances of accessible menus on a page. This object can be useful for debugging purposes or for interacting with multiple menus at once.

## Usage

Accessible Menu stores the menus you create on `window.AccessibleMenuStorage`. You can look up one menu by its HTML ID, or get all of them to work with several menus at once. Submenus are available through their root menu rather than stored separately.

```js
// Get the menu whose HTML element has id="menu-id".
const menu = window.AccessibleMenuStorage.get({
  type: "menus",
  key: "menu-id",
});

// Get all stored menus.
const menus = window.AccessibleMenuStorage.get({ type: "menus" });
```

The `type: "menus"` option selects the stored menus. Once you have a menu, you can use its normal methods, such as `menu.focusFirstChild()`. For the full list of storage methods, see the [StorageManager API docs](./api/storage-manager).

## Caveats

The global storage uses the menu's ID as the key. If you have
multiple menus with the same ID (which you _shouldn't_), only the last menu will be stored.
