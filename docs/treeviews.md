# Treeviews

Treeviews are Accessible Menu's implementation of the [Navigation Treeviews](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/).

## Single-level Treeview {#single-level}

The following is an example of how you would set up a single-level Treeview.

::: code-group

```html
<nav id="creature-menu" aria-label="Creature Classifications">
  <ul>
    <li><a href="#">Humanoids</a></li>
    <li><a href="#">Beasts</a></li>
    <li><a href="#">Dragons</a></li>
    <li><a href="#">Fey</a></li>
    <li><a href="#">Undead</a></li>
  </ul>
</nav>

```

```js
import { Treeview } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new Treeview({
  menuElement: menu,
});
```

:::

## Multi-level Treeview {#multi-level}

The following is an example of how you would set up a multi-level Treeview.

::: code-group

```html
<nav id="creature-menu" aria-label="Creature Classifications">
  <ul>
    <li><a href="#">Humanoids</a></li>
    <li><a href="#">Beasts</a></li>
    <li class="dropdown">
      <a href="#">Dragons</a>
      <ul>
        <li><a href="#">Chromatic</a></li>
        <li><a href="#">Metallic</a></li>
        <li><a href="#">Gem</a></li>
      </ul>
    </li>
    <li><a href="#">Fey</a></li>
    <li><a href="#">Undead</a></li>
  </ul>
</nav>
```

```js
import { Treeview } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new Treeview({
  menuElement: menu,
  submenuItemSelector: ".dropdown",
});
```

:::

## Collapsible Treeview {#collapsible}

The following is an example of how you would set up a collapsible Treeview.

::: code-group

```html
<nav id="creature-menu" aria-label="Creature Classifications">
  <button>Toggle Menu</button>
  <ul>
    <li><a href="#">Humanoids</a></li>
    <li><a href="#">Beasts</a></li>
    <li><a href="#">Dragons</a></li>
    <li><a href="#">Fey</a></li>
    <li><a href="#">Undead</a></li>
  </ul>
</nav>
```

```js
import { Treeview } from "accessible-menu";

const nav = document.querySelector("#creature-menu");
const menu = document.querySelector("#creature-menu ul");
const toggle = document.querySelector("#creature-menu button");

const disclosureMenu = new Treeview({
  menuElement: menu,
  containerElement: nav,
  controllerElement: toggle,
});
```

:::

## Interactive Example {#interactive-example}

You can find an interactive example of a Treeview [here in this codepen](https://codepen.io/nickdjm/pen/KKYKewB).
