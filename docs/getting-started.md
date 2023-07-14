# Getting started

## Installation

### NPM

NPM is recommended for large-scale development, since it works well with bundlers like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/guide/en/).

```shell
# latest stable
npm install accessible-menu
```

### CDN

For learning/prototyping purposes you can use the latest version with:

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu/dist/accessible-menu.js"></script>
```

For production environments, it is recommend to use a specific version to avoid unforseen breaking changes:

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/accessible-menu.min.js"></script>
```

## Usage

To use **accessible-menu**, you first need to make sure your menu matches the following structure:

```html
<nav>
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Include **accessible-menu** through import or bundled library in your project:

```js
import AccessibleMenu from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/accessible-menu.min.js"></script>
```

Once you have **accessible-menu** loaded, declare a new menu object.

`menuElement` is required for all menus, while `submenuItemSelector` is _only_ required if you have submenus/dropdowns.

```js
new AccessibleMenu.DisclosureMenu({
  menuElement: document.querySelector("nav > ul"),
});
```

### Only need one type of menu class?

Bundled versions of each menu are provided in the dist and individual exports are provided in the index.

There are also compiled ES Module versions if you don't want to use an iife!

#### DisclosureMenu usage

```js
import { DisclosureMenu } from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/disclosure-menu.min.js"></script>
```

then

```js
const menu = new DisclosureMenu({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: "li.dropdown",
});
```

#### Menubar usage

```js
import { Menubar } from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/menubar.min.js"></script>
```

then

```js
const menu = new Menubar({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: "li.dropdown",
});
```

#### TopLinkDisclosureMenu usage

```js
import { TopLinkDisclosureMenu } from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/top-link-disclosure-menu.min.js"></script>
```

then

```js
const menu = new TopLinkDisclosureMenu({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: "li.dropdown",
});
```

#### Treeview usage

```js
import { Treeview } from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@4.0.0-beta.4/dist/treeview.min.js"></script>
```

then

```js
const menu = new Treeview({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: "li.dropdown",
});
```
