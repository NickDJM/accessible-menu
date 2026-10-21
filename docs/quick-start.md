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

We use [jsdelivr](https://www.jsdelivr.com/package/npm/accessible-menu) as the example, but you can use any cdn you prefer, such as [unpkg](https://unpkg.com). You can also download the files listed in the CDN and host them yourself if preferred.

The script exposes the menu classes through `AccessibleMenu`. Once your menu HTML and the library script have loaded, create a menu using that global:

```js
const menu = new AccessibleMenu.DisclosureMenu({
  menuElement: document.querySelector("#example-menu ul"),
});
```

The setup examples below use module imports for projects installed through NPM. For a CDN setup, use `AccessibleMenu.DisclosureMenu`, `AccessibleMenu.Menubar`, or `AccessibleMenu.Treeview` in place of the imported class. Run your setup after the menu HTML is available.

## Setup

::: info Bring your own CSS

Accessible Menu does not provide CSS. It applies classes, attributes, and CSS custom properties. Your project controls the styling. See [Opening and closing the menu](./opening-and-closing) for how those classes and properties are applied.

:::

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
  menuElement: document.querySelector("#example-menu ul"),
});
```

```js [Menubar]
import { Menubar } from "accessible-menu";

const menu = new Menubar({
  menuElement: document.querySelector("#example-menu ul"),
});
```

```js [Treeview Navigation]
import { Treeview } from "accessible-menu";

const menu = new Treeview({
  menuElement: document.querySelector("#example-menu ul"),
});
```

:::

Pass the `<ul>` element to `menuElement`. Accessible Menu sets up the menu when you create it, adding the roles, attributes, and keyboard controls it needs.

### Two-level Menu

You can also generate two-level menus with Accessible Menu. By default, any `<li>` element that contains a nested `<ul>` will be treated as a submenu.

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
  menuElement: document.querySelector("#example-menu ul"),
  submenuTogglesSelector: "a",
});
```

```js [Menubar]
import { Menubar } from "accessible-menu";

const menu = new Menubar({
  menuElement: document.querySelector("#example-menu ul"),
});
```

```js [Treeview Navigation]
import { Treeview } from "accessible-menu";

const menu = new Treeview({
  menuElement: document.querySelector("#example-menu ul"),
});
```

:::

The Disclosure Menu example sets `submenuTogglesSelector: "a"` because the Projects toggle in this HTML is a link. If you use a `<button>` for it instead, you can leave that option at its default.
