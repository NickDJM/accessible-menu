# Top Link Disclosure Menus

Top Link Disclosure Menus are Accessible Menu's implementation of [Disclosure Navigation Menus with Top-level Links](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/).

## Single-level Top Link Disclosure Menu {#single-level}

The following is an example of how you would set up a single-level Top Link Disclosure Menu.

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
import { TopLinkDisclosureMenu } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new TopLinkDisclosureMenu({
  menuElement: menu,
});
```

:::

## Multi-level Top Link Disclosure Menu {#multi-level}

The following is an example of how you would set up a multi-level Top Link Disclosure Menu.

::: code-group

```html
<nav id="creature-menu" aria-label="Creature Classifications">
  <ul>
    <li><a href="#">Humanoids</a></li>
    <li><a href="#">Beasts</a></li>
    <li class="dropdown">
      <a href="#">Dragons</a>
      <button aria-label="Dragons submenu"></button>
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
import { TopLinkDisclosureMenu } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new TopLinkDisclosureMenu({
  menuElement: menu,
  submenuItemSelector: ".dropdown",
});
```

:::

## Collapsible Top Link Disclosure Menu {#collapsible}

The following is an example of how you would set up a collapsible Top Link Disclosure Menu.

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
import { TopLinkDisclosureMenu } from "accessible-menu";

const nav = document.querySelector("#creature-menu");
const menu = document.querySelector("#creature-menu ul");
const toggle = document.querySelector("#creature-menu button");

const disclosureMenu = new TopLinkDisclosureMenu({
  menuElement: menu,
  containerElement: nav,
  controllerElement: toggle,
});
```

:::

## Interactive Example {#interactive-example}

You can find an interactive example of a Top Link Disclosure Menu [here in this codepen](https://codepen.io/nickdjm/pen/xxJNzVR).
