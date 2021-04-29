# accessible-menu

[![Latest release](https://img.shields.io/npm/v/accessible-menu?label=RELEASE&style=for-the-badge)](https://www.npmjs.com/package/accessible-menu)
[![License](https://img.shields.io/github/license/NickDJM/accessible-menu?style=for-the-badge)](/LICENSE)

A JavaScript library to help you generate WCAG accessible menus in the DOM.

The two supported menu types are:

- [Navigation Menubar](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html), and
- [Disclosure Navigation Menus](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html)

## Browser Support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome.svg" role="presentation" width="32px" height="32px" /><br />Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox.svg" role="presentation" width="32px" height="32px" /><br />Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_32x32.png" role="presentation" width="32px" height="32px" /><br />Safari  | <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge.svg" role="presentation" width="32px" height="32px" /><br />Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chromium/chromium.svg" role="presentation" width="32px" height="32px" /><br />Chromium | <img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/webkit/webkit.svg" role="presentation" width="32px" height="32px" /><br />Webkit |
| --- | --- | --- | --- | --- | --- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

Found something that doesn't work the way it should in one of the listed browsers above? [Open an issue](https://github.com/NickDJM/accessible-menu/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug%3A+%5BBrief+Description%5D)!

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
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@3.0.0/dist/accessible-menu.min.js"></script>
```

## Usage

To use **accessible-menu**, you first need to make sure your menu matches the following structure:

```html
<ul id="example-menu">
  <li><a href="/about">About</a></li>
  <li class="dropdown">
    <a href="#">Projects ▼</a>
    <ul>
      <li><a href="/projects/awesome">Awesome project</a></li>
      <li><a href="/projects/not-so-awesome">Not-so-awesome project</a></li>
    </ul>
  </li>
  <li><a href="/contact">Contact me</a></li>
</ul>
```

Include **accessible-menu** through import or bundled library in your project:

```jsx
import AccessibleMenu from "accessible-menu";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@3.0.0/dist/accessible-menu.min.js"></script>
```

Once you have **accessible-menu** loaded, declare a new menu object.

`menuElement` is required for all menus, while `submenuItemSelector` is _only_ required if you have submenus/dropdowns.

```jsx
const menu = new AccessibleMenu.DisclosureMenu({
  menuElement: document.querySelector("#example-menu"),
  submenuItemSelector: "li.dropdown",
});
```

### Documentation

- [Classes](docs/classes/index.md)
  - [BaseMenu](docs/classes/baseMenu.md)
  - [Menubar](docs/classes/menubar.md)
  - [DisclosureMenu](docs/classes/disclosureMenu.md)
  - [MenuItem](docs/classes/menuItem.md)
  - [MenuToggle](docs/classes/menuToggle.md)
- [Basic examples](docs/basics/index.md)
  - [Single-level menu](docs/basics/single-level-menu.md)
  - [Single-level menu with toggle](docs/basics/single-level-menu-with-toggle.md)
  - [Two-level menu with toggle](docs/basics/two-level-menu-with-toggle.md)

### Examples

Looking for a working example of **accessible-menu**? Check out these jsfiddles:

- [Custom implementation](https://jsfiddle.net/NickDJM/yokxg0vr/)
- [Bootstrap 4](https://jsfiddle.net/NickDJM/ku28qd97/)
- [TailwindCSS](https://jsfiddle.net/NickDJM/4rfsqw5z/)

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Contributing

If you're interested in contributing to the project, please read the [Contribution Guidelines](.github/CONTRIBUTING.md). Any and all contributions _must_ follow these guidelines or they will not be accepted.
