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

## Different toggles in deeper submenus

Every menu type accepts `submenuSubtogglesSelector`. Use it when the toggles inside a submenu need a different selector from the toggles in the root menu.

```js
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  submenuTogglesSelector: ".root-toggle",
  submenuSubtogglesSelector: ".child-toggle",
});
```

This menu uses `.root-toggle` for the toggles in the root menu. It uses `.child-toggle` for toggles inside child menus and at every deeper level.

For BaseMenu, Disclosure Menu, Menubar, and Treeview, `submenuSubtogglesSelector` defaults to `null`, which uses the configured `submenuTogglesSelector` at every level. Top Link Disclosure defaults to `"a"` for deeper toggles. Passing `null` to Top Link Disclosure makes it use the configured `submenuTogglesSelector` instead.

This option only changes which elements act as submenu toggles. It does not enable separate link and toggle items or change a menu type's keyboard behavior.
