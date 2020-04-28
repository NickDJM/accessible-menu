# Single-level menu

A single-level menu is the most simple type of menu that can be used with accessible-menu.

A basic example of this kind of menu is as follows:

```html
<nav id="main-nav" aria-label="Main">
  <ul id="main-menu" class="menu">
    <li class="menu-item">
      <a href="..." class="menu-link">Link 1</a>
    </li>
    <li class="menu-item">
      <a href="..." class="menu-link">Link 2</a>
    </li>
    <li class="menu-item">
      <a href="..." class="menu-link">Link 3</a>
    </li>
  </ul>
</nav>
```

Given the above structure, the parameters needed for an accessible menu are:

- `menuElement`
- `menuItemSelector`
- `menuLinkSelector`

Depending on what kind of menu you'd like to create you can either use [Menubar](../classes/Menubar.md) or [DisclosureMenu](../classes/DisclosureMenu.md).

```jsx
const menuElement = document.querySelector("#main-menu");
const menuItemSelector = ".menu-item";
const menuLinkSelector = ".menu-link";

const menu = new AccessibleMenu.DisclosureMenu({
  menuElement,
  menuItemSelector,
  menuLinkSelector,
});
```

**Please note:** all collapse/expand styles are expected to be handled by your own CSS.