# accessible-menu

[![Latest release](https://img.shields.io/npm/v/accessible-menu?label=RELEASE&style=for-the-badge)](https://www.npmjs.com/package/accessible-menu)
[![License](https://img.shields.io/github/license/NickDJM/accessible-menu?style=for-the-badge)](/LICENSE)

A JavaScript library to help you generate WCAG accessible menus in the DOM.

The two supported menu types are:

- [Navigation Menubar](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html), and
- [Disclosure Navigation Menus](https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html)

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge [\*](#internet-explorer-and-edge-support)                                                                                                                                                           | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                          |

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
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@2.0.0/dist/accessibleMenu.js"></script>
```

## Usage

To use accessible-menu, you first need to ensure your menu follows a basic menu structure.

```html
<ul>
  <li><a>...</a></li>
  <li class="dropdown">
    <button>☰</button>
    <ul>
      <li><a>...</a></li>
      ...
    </ul>
  </li>
  <li><a>...</a></li>
  ...
</ul>
```

include the root menu or bundled library in your project:

```jsx
import AccessibleMenu from "accessible-menu";
```

or

```html
<script src="path/to/accessible-menu/dist/accessibleMenu.js"></script>
```

Once you have accessible-menu loaded, simply declare a new menu object.

```jsx
const menu = new AccessibleMenu.DisclosureMenu({
  menuElement: menuDOMObject,
  menuItemSelector: "li-css-selector",
  menuLinkSelector: "li-css-selector",
  submenuItemSelector: "li-with-dropdown-css-selector",
  submenuToggleSelector: "dropdown-toggle-css-selector",
  submenuSelector: "dropdown-menu-css-selector",
  openClass: "class-to-open-menus",
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

Looking for a working example of accessible-menu? Check out these jsfiddles:

- [Custom implementation](https://jsfiddle.net/NickDJM/yokxg0vr/)
- [Bootstrap 4](https://jsfiddle.net/NickDJM/ku28qd97/)
- [TailwindCSS](https://jsfiddle.net/NickDJM/4rfsqw5z/)

## Internet Explorer and Edge Support

For both IE and older (non-chromium-based) versions of Edge support, you will either need to use the CDN option, or run your code through [Babel](https://babeljs.io/).

If you are compiling your own code without the help of something like Babel + [core-js](https://www.npmjs.com/package/core-js), you will need polyfills for [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [`Array.prototype.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), [`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [`String.prototype.startsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), and [`String.prototype.endsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) for IE11 support.

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Contributing

If you're interested in contributing to the project, please read the [Contribution Guidelines](.github/CONTRIBUTING.md). Any and all contributions _must_ follow these guidelines or they will not be accepted.
