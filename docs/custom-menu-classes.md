# Custom menu classes

You can extend an existing menu when you need behavior that its constructor options do not provide. For standard menu setups, use the built-in classes and their options.

## Initialize after your fields are ready

The built-in menu classes initialize automatically unless `initialize` is `false`. Initialization creates the menu's items, toggles, and submenus, and adds its event listeners.

When you extend a class, JavaScript runs the parent constructor before setting your subclass fields. If the parent initializes the menu at that point, your custom field values are not ready yet.

::: warning Delay initialization

Pass `initialize: false` to `super()` to delay that work. Then initialize at the end of your constructor. Keep the caller's `initialize` option so they can delay initialization too.

:::

```js
import { DisclosureMenu } from "accessible-menu";

class CustomDisclosureMenu extends DisclosureMenu {
  // Use this class when the menu creates its submenus.
  _MenuType = CustomDisclosureMenu;

  constructor({ initialize = true, ...options }) {
    super({ ...options, initialize: false });

    // Subclass fields are ready here. Add any other setup before initializing.
    if (initialize) {
      this.initialize();
    }
  }
}
```
