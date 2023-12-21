# Menubars

Menubars are Accessible Menu's implementation of [Navigation Menubars](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/).

## Single-level Menubar {#single-level}

The following is an example of how you would set up a single-level Menubar.

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
import { Menubar } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new Menubar({
  menuElement: menu,
});
```

:::

## Multi-level Menubar {#multi-level}

The following is an example of how you would set up a multi-level Menubar.

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
import { Menubar } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new Menubar({
  menuElement: menu,
  submenuItemSelector: ".dropdown",
});
```

:::

## Collapsible Menubar {#collapsible}

The following is an example of how you would set up a collapsible Menubar.

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
import { Menubar } from "accessible-menu";

const nav = document.querySelector("#creature-menu");
const menu = document.querySelector("#creature-menu ul");
const toggle = document.querySelector("#creature-menu button");

const disclosureMenu = new Menubar({
  menuElement: menu,
  containerElement: nav,
  controllerElement: toggle,
});
```

:::
