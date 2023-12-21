# Bootstrap Support

Accessible Menu, by default, does not support [Bootstrap](https://getbootstrap.com). This is mainly due to the way Bootstrap handles it's submenu classes.

Because of this, two separate projects have been created to add full Accessible Menu support to Bootstrap:

- [Accessible Menu Bootstrap 5](https://github.com/NickDJM/accessible-menu-bootstrap-5), and
- [Accessible Menu Bootstrap 4](https://github.com/NickDJM/accessible-menu-bootstrap-4) (Also technically supports Bootstrap 3)

::: warning Bootstrap 4 Support

While there is a Bootstrap 4 specific project that supports Bootstrap 3 _and_ 4, both of these versions of Bootstrap are long passed their end-of-life and the Accessible Menu Bootstrap 4 project will not be updated to gain new features or bug fixes.

It is recommended you upgrade your own projects to Bootstrap 5 and use the Accessible Menu Bootstrap 5 project.

:::

## Conflicting Behaviours

### Sub-Menus

Bootstrap differs in the way it handles sub-menus. Bootstrap will add/remove it's "openClass" based on the state of the menus, but it will _not_ remove the "closeClass" when the menu is open. This means that, when open, the submenus will have both the "openClass" and "closeClass" applied to them.
