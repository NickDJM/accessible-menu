# Two-level menu with toggle

A two-level menu with a toggle is similar to the single-level, except it adds submenus and toggle links.

An example of this kind of menu is as follows:

```html
<nav id="main-nav" aria-label="Main">
  <button id="main-menu-toggle" aria-label="Toggle main menu">☰</button>
  <ul id="main-menu">
    <li>
      <a href="/about">About</a>
    </li>
    <li class="dropdown">
      <a href="#">Projects ▼</a>
      <ul>
        <li>
          <a href="/projects/awesome">Awesome project</a>
        </li>
        <li>
          <a href="/projects/not-so-awesome">Not-so-awesome project</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="/contact">Contact me</a>
    </li>
  </ul>
</nav>
```

Given the above structure, the parameters needed for an accessible menu are:

- `menuElement`
- `submenuItemSelector`
- `controllerElement`
- `containerElement`
- `openClass`

Depending on what kind of menu you'd like to create you can either use [Menubar](../classes/Menubar.md) or [DisclosureMenu](../classes/DisclosureMenu.md).

```js
const menu = new AccessibleMenu.DisclosureMenu({
  menuElement: document.querySelector("#main-menu"),
  submenuItemSelector: ".dropdown",
  controllerElement: document.querySelector("#main-menu-toggle"),
  containerElement: document.querySelector("#main-nav"),
  openClass: "open",
});
```

**Please note:** all open/close class styles are expected to be handled by your own CSS.
