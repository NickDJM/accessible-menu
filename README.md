# accessible-menu

[![Latest release](https://img.shields.io/github/v/release/NickDJM/accessible-menu?include_prereleases&style=for-the-badge)](https://github.com/NickDJM/accessible-menu/releases)
[![License](https://img.shields.io/github/license/NickDJM/accessible-menu?style=for-the-badge)](/LICENSE)

A JavaScript library to help you generate WAI-ARIA accessible menus in the DOM.

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
<script src="https://cdn.jsdelivr.net/npm/accessible-menu@1.0.0-beta.1/dist/accessibleMenu.js"></script>
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

Once you have accessible-menu loaded, simply declare a new menu object and initialize it.

```jsx
const menu = new AccessibleMenu({
    menuElement: menuDOMObject,
    menuItemSelector: "menu-item-css-selector",
    submenuItemSelector: "menu-item-with-dropdown-css-selector",
    submenuToggleSelector: "dropdown-toggle-css-selector",
    submenuSelector: "dropdown-menu-css-selector",
    submenuOpenClass: "class-to-open-menus"
});

menu.initialize();
```

Want more detailed usage information? It's on the way! Check back for a later release which will include much more documentation.

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Development

### Set up

Run `npm install`.

This will ensure you have all the dependencies needed to properly lint your code and commits.

### Committing

This project uses the conventional commit standard, which means your commits should follow a basic template of:

    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]

For more detailed information about available types, scopes, breaking changes, etc. please see the [official documentation](https://www.conventionalcommits.org/en/v1.0.0/).

This project also provides a command to assist you in formatting  commit messages using [commitizen](https://commitizen.github.io/cz-cli/):

```
npm run commit
```

### Coding standards

This project follows a set of coding standards combining [StandardJS](https://standardjs.com/), [Prettier](https://prettier.io/), and [JSDoc](https://jsdoc.app/).

To check your code, you can use [ESLint](https://eslint.org/) with the provided script:

```
npm run lint
```

You can also fix some violations automatically using:

```
npm run fix
```
