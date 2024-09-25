# Global Menu Storage

Accessible Menu provides a global storage object that is used to store all instances of accessible menus on a page. This object can be useful for debugging purposes or for interacting with multiple menus at once.

## Usage

The global storage object is available at `window.AccessibleMenu.menus`. This is an object that contains all instances of accessible menu keyed by the menu's ID.

```js
// Get the first instance of an accessible menu.
window.AccessibleMenu.menus[Object.keys(window.AccessibleMenu.menus)[0]];
```

## Caveats

The global storage uses the menu's ID as the key. If you have a menu without an ID it will be stored and accessible, but if you have multiple menus with the same ID, only the last menu will be stored.
