# Single-Level Dropdown Menu

A single-level dropdown menu is probably the most common use-case for menus; they have a single navigation element that collapses (most likely in mobile view).

## Parameters Needed

* `menuElement`,
* `menuItemSelector`,
* `openClass`,
* `controllerElement`, and
* `containerElement`

## HTML

```html
<nav class="collapsable">
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
<button class="navigation-toggle">Main Navigation</button>
```

## JavaScript

```jsx
const menuElement = document.querySelector("ul.menu");
const menuItemSelector = "li.menu-item";
const openClass = "open";
const controllerElement = document.querySelector("button.navigation-toggle");
const containerElement = document.querySelector("nav.collapsable");

const menu = new AccessibleMenu({
  menuElement,
  menuItemSelector,
  openClass,
  controllerElement,
  containerElement
});
```
