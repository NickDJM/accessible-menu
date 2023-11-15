# Quick Start

## Installation

You can install Accessible Menu into your project using NPM.

```bash
# latest stable
npm install accessible-menu
```

## Using Accessible Menu from a CDN

You can use Accessible Menu directly from a CDN via a script tag.

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu/dist/accessible-menu.iife.js"></script>
```

We use [jsdelivr](https://www.jsdelivr.com/package/npm/accessible-menu) is used as the example, but you can use any cdn you prefer, such as [unpkg](https://unpkg.com). You can also download the files listed in the CDN and host them yourself if preferred.

## Setup

### Single-level Menu

The fastest setup for Accessible Menu is a single-level menu.

```html
<nav id="example-menu" aria-label="Example">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

::: code-group

```js [Disclosure Menu]
import { DisclosureMenu } from "accessible-menu";

const menu = new DisclosureMenu({
  menuElement: document.querySelector("#example-menu"),
});
```

```js [Menubar]
import { Menubar } from "accessible-menu";

const menu = new Menubar({
  menuElement: document.querySelector("#example-menu"),
});
```

```js [Treeview Navigation]
import { Treeview } from "accessible-menu";

const menu = new Treeview({
  menuElement: document.querySelector("#example-menu"),
});
```

:::

Accessible Menu will self-initialize once created adding the approriate roles, attributes, and keybindings.

### Two-level Menu

You can also generate two-level menus with Accessible Menu by passing in the `submenuItemSelector` option during creation.

```html
<nav id="example-menu" aria-label="Example">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li class="dropdown">
      <a href="#">Projects</a>
      <ul>
        <li><a href="/projects/fun-project">Fun project</a></li>
        <li><a href="/projects/cool-project">Cool project</a></li>
      </ul>
    </li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

::: code-group

```js [Disclosure Menu]
import { DisclosureMenu } from "accessible-menu";

const menu = new DisclosureMenu({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: ".dropdown",
});
```

```js [Menubar]
import { Menubar } from "accessible-menu";

const menu = new Menubar({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: ".dropdown",
});
```

```js [Treeview Navigation]
import { Treeview } from "accessible-menu";

const menu = new Treeview({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: ".dropdown",
});
```

:::
