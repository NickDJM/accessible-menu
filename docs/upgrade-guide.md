# Upgrade guide

## Upgrading from v3 to v4

The following information is intended to help you upgrade from v3 to v4 of accessible-menu. It is not an exhaustive list of changes, but should cover the most common changes you will need to make.

You can find the full list of changes in the [changelog](https://github.com/NickDJM/accessible-menu/blob/4.x/CHANGELOG.md).

### Distribution file changes

In accessible-menu v3, the distribution files used the `.js` and `.esm.js` extensions. In v4 this has changed in the following way:

- `.js` files are now `.iife.js` files,
- `.esm.js` files are now `.es.js` files, and
- new `.cjs.js` files have been added if your project needs to support common js.

### Import and require

You may now use `import` and `require` to import accessible menu without needing to specify the file. Using `import` will import the `.es.js` file, and using `require` will import the `.cjs.js` file.

### Menu specific changes

#### Disclosure Menus

- The default `menuToggleSelector` has been changes from `"a"` to `"button"`.

#### Top Link Disclousre Menus

- Added new menu type for [top link disclosure menus](/top-link-disclousre-menus ).

### Developer changes

#### Error handling

Error handling in v4 has been improved significantly. The [validation functions](/api/validation) available will now return an object containing the error message _and_ the error status. This allows you to handle errors more effectively, but will require reworking of custom error handling you may have written.

#### Menu toggle initialization

The menu toggle initialization method had been split out into parts: [`_setIds`](/api/base-menu-toggle#method--setIds), and [`_setAriaAttributes`](/api/base-menu/toggle#method--setAriaAttributes). This allows for more granular control over the initialization process, but will require reworking of custom initialization methods you may have written.

#### CSS Selectors

The naming of variables and fields that used CSS selectors were technically inaccurate. They have been renamed to reference query selectors instead. This will most likely have no impact on your code, but just in case it is worth noting.

#### Deprecations

Anything flagged as deprecated in v3 has now been removed.

#### Build system

The build system has been updated to use [Vite](https://vitejs.dev/) for compiling, documentation, _and_ testing. This will not impact the functionality of your implementations, but it _will_ impact the way you contribute or your own subclass systems that depend on accessible menu.

## Upgrading from v2

If you're still using v2 (or even v1), you will need to upgrade to v3 before upgrading to v4. The upgrade guide for v3 can be found [here](/upgrade-guide-v3).
