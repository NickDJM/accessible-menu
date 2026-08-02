# Global Menu Storage

Accessible Menu provides a global storage object that is used to store all instances of accessible menus on a page. This object can be useful for debugging purposes or for interacting with multiple menus at once.

## Usage

Menus are stored in the global `StorageManager` instance registered on `window.AccessibleMenuStorage`.

```js
// Get a menu by id.
window.AccessibleMenuStorage.get({
  key: "menu-id",
});

// Get all stored menus.
window.AccessibleMenuStorage.get();
```

For more details on the storage API, see the [StorageManager API docs](./api/storage-manager).

## Caveats

The global storage uses the menu's ID as the key. If you have
multiple menus with the same ID (which you _shouldn't_), only the last menu will be stored.
