# Two-Level Dropdown Menu

Two-level dropdown menus are found on many sites (typically larger organizations); they consist of a main (root) level of navigation, with any number of the root menu items having sub-menus inside of them.

## Parameters Needed

* `menuElement`,
* `menuItemSelector`,
* `submenuItemSelector`,
* `submenuToggleSelector`,
* `submenuSelector`,
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
    <li class="menu-item dropdown">
      <a class="dropdown-toggle" href="#">Second Item</a>
      <ul class="menu dropdown-menu">
        <li class="menu-item">
          <a href="#">First Sub-item</a>
        </li>
        <li class="menu-item">
          <a href="#">Second Sub-item</a>
        </li>
        <li class="menu-item">
          <a href="#">Third Sub-item</a>
        </li>
      </ul>
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
const menuElement = document.querySelector("ul.menu:not(.dropdown)");
const menuItemSelector = "li.menu-item";
const submenuItemSelector = "li.menu-item.dropdown";
const submenuToggleSelector = "a.dropdown-toggle";
const submenuSelector = "ul.menu.dropdown-menu";
const openClass = "open";
const controllerElement = document.querySelector("button.navigation-toggle");
const containerElement = document.querySelector("nav.collapsable");

const menu = new AccessibleMenu({
  menuElement,
  menuItemSelector,
  submenuItemSelector,
  submenuToggleSelector,
  submenuSelector,
  openClass,
  controllerElement,
  containerElement
});
```
