# accessible-menu

[![Latest release](https://img.shields.io/npm/v/accessible-menu?label=RELEASE&style=for-the-badge)](https://www.npmjs.com/package/accessible-menu)
[![License](https://img.shields.io/github/license/NickDJM/accessible-menu?style=for-the-badge)](/LICENSE)
[![Tests](https://img.shields.io/github/actions/workflow/status/nickdjm/accessible-menu/test.yml?branch=4.x&label=Tests&style=for-the-badge)](https://github.com/NickDJM/accessible-menu/actions/workflows/test.yml)
[![GitHub CodeQL](https://img.shields.io/github/actions/workflow/status/nickdjm/accessible-menu/codeql-analysis.yml?branch=4.x&label=CodeQL&style=for-the-badge)](https://github.com/NickDJM/accessible-menu/actions/workflows/codeql-analysis.yml)

A JavaScript library to help you generate WCAG accessible menus in the DOM.

The supported menu types are:

- [Disclosure Navigation Menus](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/),
- [Disclosure Navigation Menus with Top-Level Links](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/),
- [Navigation Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/), and
- [Navigation Treeview](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/)

## Documentation

- [API Documentation](https://accessible-menu.netlify.app/)

## Examples

Looking for a working example of **accessible-menu**? Check out these codepens:

- [Collapsible DisclosureMenu with optional key support](https://codepen.io/nickdjm/pen/LYBoOWX)
- [Collapsible Menubar](https://codepen.io/nickdjm/pen/ZEjNoXw)
- [Treeview](https://codepen.io/nickdjm/pen/wvxbjpy)

### Bootstrap support

Looking to use this with Bootstrap? Because Bootstrap adds classes to the menu's containing element to show/hide the menu, you'll need custom open/close functions for your menu. Check out the [accessible-menu-bootstrap-4](https://www.npmjs.com/package/accessible-menu-bootstrap-4) or [accessible-menu-bootstrap-5](https://github.com/NickDJM/accessible-menu-bootstrap-5) projects where all that is done for you!

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Contributing

If you're interested in contributing to the project, please read the [Contribution Guidelines](.github/CONTRIBUTING.md). Any and all contributions _must_ follow these guidelines or they will not be accepted.

## Sponsors

<p align="center">
  <a href="https://coldfrontlabs.ca">
    <img src="https://coldfrontlabs.ca/themes/custom/frosty/images/coldfrontlabs-flakkon-logo.png" alt="Coldfront Labs Inc." width="300px"/>
  </a>
</p>
