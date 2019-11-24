# Single-Level Dropdown Menu

A single-level dropdown menu is probably the most common use-case for menus; they have a single navigation element that collapses (most likely in mobile view).

## Parameters Needed

* `menuElement`,
* `controllerElement`,
* `containerElement`,
* `menuItemSelector`, and
* `openClass`

## HTML

```html
<nav class="collapsable">
  <h2>Main Menu</h2>
  <ul class="menu">
    <li class="menu-item">
      <a href="#">First Item</a>
    </li>
    <li class="menu-item">
      <a href="#">Second Item</a>
    </li>
    <li class="menu-item">
      <a href="#">Third Item</a>
    </li>
    <li class="menu-item">
      <a href="#">Fourth Item</a>
    </li>
    <li class="menu-item">
      <a href="#">Fifth Item</a>
    </li>
  </ul>
</nav>
<button class="navigation-toggle">Toggle Navigation</button>
```

## JavaScript

```jsx
const menuElement = document.querySelector("ul.menu");
const controllerElement = document.querySelector("button.navigation-toggle");
const containerElement = document.querySelector("nav.collapsable");
const menuItemSelector = "li.menu-item";
const openClass = "open";

const menu = new AccessibleMenu({
  menuElement,
  controllerElement,
  containerElement,
  menuItemSelector,
  openClass
});

menu.initialize();
```
