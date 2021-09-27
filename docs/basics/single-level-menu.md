# Single-level menu

A single-level menu is the most basic type of menu that can be used with **accessible-menu**.

An example of this kind of menu is as follows:

```html
<nav id="main-nav" aria-label="Main">
  <ul id="main-menu">
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a href="/projects">Projects</a>
    </li>
    <li>
      <a href="/contact">Contact me</a>
    </li>
  </ul>
</nav>
```

Given the above structure, the parameters needed for an accessible menu are:

- `menuElement`

Depending on what kind of menu you'd like to create you can use [DisclosureMenu](https://accessible-menu.netlify.app/disclosuremenu), [Menubar](https://accessible-menu.netlify.app/menubar), or [Treeview](https://accessible-menu.netlify.app/treeview).

```js
const menu = new AccessibleMenu.DisclosureMenu({
  menuElement: document.querySelector("#main-menu"),
});
```
