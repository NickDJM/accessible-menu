# Single-Level Menu

A basic single-level menu is the easiest to set up; they consist of one navigation element that doesn't collapse.

## Parameters Needed

* `menuElement`, and
* `menuItemSelector`

## HTML

```html
<nav>
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
```

## JavaScript

```jsx
const menuElement = document.querySelector("ul.menu");
const menuItemSelector = "li.menu-item";

const menu = new AccessibleMenu({
  menuElement,
  menuItemSelector
});

menu.initialize();
```
