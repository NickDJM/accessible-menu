# Bootstrap Support

Accessible Menu, by default, does not support [Bootstrap](https://getbootstrap.com). This is mainly due to the way Bootstrap handles its submenu classes.

Because of this, two separate projects have been created to add full Accessible Menu support to Bootstrap:

- [Accessible Menu Bootstrap 5](https://github.com/NickDJM/accessible-menu-bootstrap-5), and
- [Accessible Menu Bootstrap 4](https://github.com/NickDJM/accessible-menu-bootstrap-4) (Also technically supports Bootstrap 3)

::: warning Bootstrap 4 Support

While there is a Bootstrap 4 specific project that supports Bootstrap 3 _and_ 4, both of these versions of Bootstrap are long passed their end-of-life and the Accessible Menu Bootstrap 4 project will not be updated to gain new features or bug fixes.

It is recommended you upgrade your own projects to Bootstrap 5 and use the Accessible Menu Bootstrap 5 project.

:::

## Conflicting Behaviours

### Sub-Menus

Bootstrap and Accessible Menu use different class changes to show and hide submenus. Bootstrap keeps the class used for a closed submenu even when that submenu is open. Accessible Menu normally removes its `collapseClass` when adding its `expandClass`.

Because the two expect different classes, combining them directly can cause a submenu to display incorrectly. The Bootstrap projects linked above handle these differences for you.
