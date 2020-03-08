# accessible-menu

[![Latest release](https://img.shields.io/github/v/release/NickDJM/accessible-menu?include_prereleases&style=for-the-badge)](https://github.com/NickDJM/accessible-menu/releases)
[![License](https://img.shields.io/github/license/NickDJM/accessible-menu?style=for-the-badge)](/LICENSE)

A JavaScript library to help you generate WCAG accessible menus in the DOM.

The current reference used is W3C's [Navigation Menubar Example](https://w3c.github.io/aria-practices/examples/menubar/menubar-1/menubar-1.html).

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge [*](#internet-explorer-and-edge-support) | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

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
<script src="https://cdn.jsdelivr.net/npm/accessible-menu/dist/accessibleMenu.js"></script>
```

For production environments, it is recommend to use a specific version to avoid unforseen breaking changes:

```html
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@1.0.2/dist/accessibleMenu.js"></script>
```

## Usage

To use accessible-menu, you first need to ensure your menu follows a basic menu structure.

```html
<menu>
    <menu-item><a>...</a></menu-item>
    <menu-item-with-dropdown>
        <dropdown-toggle />
        <dropdown-menu>
            <menu-item><a>...</a></menu-item>
            ...
        </dropdown-menu>
    </menu-item-with-dropdown>
    <menu-item><a>...</a></menu-item>
    ...
</menu>
```

include the root menu or bundled library in your project:

```jsx
import AccessibleMenu from 'accessible-menu';
```

or

```html
<script src="path/to/accessible-menu/dist/accessibleMenu.js"></script>
```

Once you have accessible-menu loaded, simply declare a new menu object.

```jsx
const menu = new AccessibleMenu({
    menuElement: menuDOMObject,
    menuItemSelector: "menu-item-css-selector",
    submenuItemSelector: "menu-item-with-dropdown-css-selector",
    submenuToggleSelector: "dropdown-toggle-css-selector",
    submenuSelector: "dropdown-menu-css-selector",
    openClass: "class-to-open-menus"
});
```

### Documentation

* [Classes](docs/classes/index.md)
  * [Menu](docs/classes/menu.md)
  * [MenuItem](docs/classes/menuItem.md)
  * [MenuToggle](docs/classes/menuToggle.md)
* [Basic Examples](docs/basics/index.md)
  * [Single-Level Menu](docs/basics/single-level-menu.md)
  * [Single-Level Dropdown Menu](docs/basics/single-level-dropdown-menu.md)
  * [Two-Level Dropdown Menu](docs/basics/two-level-dropdown-menu.md)

## Internet Explorer and Edge Support

For both IE and Edge support, you will either need to use the CDN option, or run your code through [Babel](https://babeljs.io/).

For IE, you will also need to ensure you load [Babel Polyfill](https://babeljs.io/docs/en/babel-polyfill) before loading accessible-menu.

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Contributing

If you're interested in contributing to the project, please read the [Contribution Guidelines](.github/CONTRIBUTING.md). Any and all contributions _must_ follow these guidelines or they will not be accepted.
