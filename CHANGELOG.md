# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.5](https://github.com/NickDJM/accessible-menu/compare/v1.0.4...v1.0.5) (2020-02-14)


### Bug Fixes

* **menu:** focus menuitem on tab instead of whole menu ([e24c2eb](https://github.com/NickDJM/accessible-menu/commit/e24c2eb070dbe6c3dc79edd8d8aaf2154cefb9b0)), closes [#52](https://github.com/NickDJM/accessible-menu/issues/52)

### [1.0.4](https://github.com/NickDJM/accessible-menu/compare/v1.0.3...v1.0.4) (2019-12-15)


### Bug Fixes

* **menu:** keep focus on root item after left/right arrows ([f0d1499](https://github.com/NickDJM/accessible-menu/commit/f0d149968e153b22b3fdd7ba6dc9c9fda0ed2edb)), closes [#50](https://github.com/NickDJM/accessible-menu/issues/50)
* **menu:** prevent default event on arrow up/down on top level menus ([d9410f3](https://github.com/NickDJM/accessible-menu/commit/d9410f30955110e17fa7500afefb270f41cefbf3)), closes [#47](https://github.com/NickDJM/accessible-menu/issues/47)


### Build System

* **npm:** disallow .files from being packaged ([73e0579](https://github.com/NickDJM/accessible-menu/commit/73e0579a559b3529d65cb201c1aeb8f8f39efaa4))
* **npm:** ensure build is run and committed with release ([a9f03ff](https://github.com/NickDJM/accessible-menu/commit/a9f03ff2bac8809c16a564f2a7a267569f5d1c79))


### Code Refactoring

* **main:** change main.js to index.js to keep to internal standard ([c4091ab](https://github.com/NickDJM/accessible-menu/commit/c4091abcc70c978511823911b293a2157ff72f67))

### [1.0.3](https://github.com/NickDJM/accessible-menu/compare/v1.0.2...v1.0.3) (2019-11-25)


### Bug Fixes

* **menu:** fix typo in build ([8a9a72d](https://github.com/NickDJM/accessible-menu/commit/8a9a72d9b5569cc9f9e9081f5c47c193056711ab))

### [1.0.2](https://github.com/NickDJM/accessible-menu/compare/v1.0.1...v1.0.2) (2019-11-25)


### Bug Fixes

* **menu:** correct type in tab event ([d0d9420](https://github.com/NickDJM/accessible-menu/commit/d0d9420813dc60e2579e072e6015760f1b2b3ca6))


### Documentation

* **general:** update version in cdn example ([da78b06](https://github.com/NickDJM/accessible-menu/commit/da78b066c3c046a6122cf047c0448cd2ed8ccf2f))
* **general:** update version in cdn example ([588dd78](https://github.com/NickDJM/accessible-menu/commit/588dd782a6a920d16d744d6e6eab45a684088bd9))

### [1.0.1](https://github.com/NickDJM/accessible-menu/compare/v1.0.0...v1.0.1) (2019-11-24)


### Documentation

* **setup:** remove notes on initialization ([7aa1f4d](https://github.com/NickDJM/accessible-menu/commit/7aa1f4d7220ef7e853a3c6a9c1724e5e9176ce06))

## [1.0.0](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-beta.4...v1.0.0) (2019-11-24)


### Bug Fixes

* **menu:** add proper event handling for older browsers ([ef62b61](https://github.com/NickDJM/accessible-menu/commit/ef62b6116ca28afaf6747ad7f0a5368aacefc47a)), closes [#16](https://github.com/NickDJM/accessible-menu/issues/16)
* **menu:** close top-level dropdowns on click away ([5c9ae7c](https://github.com/NickDJM/accessible-menu/commit/5c9ae7c3c3f9336950af19b8a851d66bc2e55c42)), closes [#42](https://github.com/NickDJM/accessible-menu/issues/42)
* **menu:** fix focus on exit ([576b540](https://github.com/NickDJM/accessible-menu/commit/576b540554675ec1705505d0e26bd44210bf4232))
* **menu:** focus menu controller on exit ([a89539c](https://github.com/NickDJM/accessible-menu/commit/a89539c24c7c8f5f8778a236aeb16183d28f03ea))
* **toggle:** handle non-existant parent menu properly ([82e0156](https://github.com/NickDJM/accessible-menu/commit/82e0156f0c23dd49554c2e0d47920f7fd49d953e))


### Build System

* **npm:** update dependencies ([2b18bbb](https://github.com/NickDJM/accessible-menu/commit/2b18bbbd3a4f8fb008e993740e4b194bdb307fb8))


### Documentation

* **contribution:** keep all contributing docs in contributing.md ([9c252c0](https://github.com/NickDJM/accessible-menu/commit/9c252c0e34675a03bb48c69f51f8fce5274ac90a))
* **general:** add class and usage documentation ([b007134](https://github.com/NickDJM/accessible-menu/commit/b0071344f9f98ad2fd7737a0c655ab368994590b)), closes [#38](https://github.com/NickDJM/accessible-menu/issues/38)
* **readme:** add basic instructions for IE/Edge support ([fa0e3ee](https://github.com/NickDJM/accessible-menu/commit/fa0e3ee69a4015fe13ae236b365b2ce127d67e39)), closes [#37](https://github.com/NickDJM/accessible-menu/issues/37)
* **readme:** add browser support icons ([081ce1b](https://github.com/NickDJM/accessible-menu/commit/081ce1b71620a71f4f3457096d588fdf94bb6bae))


### Code Refactoring

* **menu:** allow submenu selectors to be null ([db1c4d8](https://github.com/NickDJM/accessible-menu/commit/db1c4d80ae717768740823eeee11cc7591a10750))
* **menu:** overhaul keydown handling ([ccf3ddc](https://github.com/NickDJM/accessible-menu/commit/ccf3ddc947494761c4bfd4dbd31f974bfac54000)), closes [#43](https://github.com/NickDJM/accessible-menu/issues/43) [#44](https://github.com/NickDJM/accessible-menu/issues/44)
* **toggle:** move click event into handleClick ([337a275](https://github.com/NickDJM/accessible-menu/commit/337a275aba2d0db156da00b7094a8f699c568d1f))

## [1.0.0-beta.4](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2019-11-22)


### ⚠ BREAKING CHANGES

* **menu:** Constructor params converted to object

### Features

* **menu:** add support for root dropdown menus ([1f85f4e](https://github.com/NickDJM/accessible-menu/commit/1f85f4e729fee4b1a05b7847d77c73209502a08b)), closes [#15](https://github.com/NickDJM/accessible-menu/issues/15)

## [1.0.0-beta.3](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2019-11-21)


### Features

* **menu:** add support for a-z keys ([ecf80f8](https://github.com/NickDJM/accessible-menu/commit/ecf80f81de33f1dcfd492e6e1dc062ff6105dc0d)), closes [#8](https://github.com/NickDJM/accessible-menu/issues/8)


### Performance Improvements

* **menu:** provide minified source files ([d690bad](https://github.com/NickDJM/accessible-menu/commit/d690badc5e1b693da853f3b47f9f9ea591d71a87)), closes [#31](https://github.com/NickDJM/accessible-menu/issues/31)

## [1.0.0-beta.2](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2019-11-20)


### Features

* **menu:** add aria-controls to menu toggles ([ed3cfd2](https://github.com/NickDJM/accessible-menu/commit/ed3cfd2f1737358086f3c9993a714c06f82e5e18)), closes [#9](https://github.com/NickDJM/accessible-menu/issues/9)
* **menu:** add aria-label/labelledby to submenus ([6f6f2ac](https://github.com/NickDJM/accessible-menu/commit/6f6f2ac9049329628f30f6062c2a8344e6003e86)), closes [#10](https://github.com/NickDJM/accessible-menu/issues/10)
* **menu:** add basic type error handling ([b705d47](https://github.com/NickDJM/accessible-menu/commit/b705d474776307e856ee8d6cc46d5f42fda9aff2)), closes [#26](https://github.com/NickDJM/accessible-menu/issues/26)
* **menu:** compile menu through babel ([46d4efd](https://github.com/NickDJM/accessible-menu/commit/46d4efd3e86d5edb4c50cd18bba110ebcf836972))


### Build System

* **npm:** add babel ([4910dcc](https://github.com/NickDJM/accessible-menu/commit/4910dcc2c4a3e28b17067eab3dfdd4c2ae1697cb))


### Documentation

* **contributing:** update contributing guidelines with more information ([8b7563b](https://github.com/NickDJM/accessible-menu/commit/8b7563bcd5b3f3b3216e7b9a9aff23b0f1083889))
* **development:** add specific release documentation ([84f908c](https://github.com/NickDJM/accessible-menu/commit/84f908c9efe761911912017c76a0d59a7bc6841c))
* **menu:** add usage documentation ([5552e68](https://github.com/NickDJM/accessible-menu/commit/5552e689d2e86e4f075b6fc9dde52c4beccc16e6)), closes [#25](https://github.com/NickDJM/accessible-menu/issues/25)

## [1.0.0-beta.1](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2019-11-18)


### Bug Fixes

* **menu:** remove tab capturing from menus ([012e458](https://github.com/NickDJM/accessible-menu/commit/012e458000441088e57775da6860963e55f2fa15)), closes [#19](https://github.com/NickDJM/accessible-menu/issues/19)


### Code Refactoring

* **menu:** adjust keybindings to properly follow spec ([df3db91](https://github.com/NickDJM/accessible-menu/commit/df3db91c8227bb6f0ad3d5f13006b65bec4f96da)), closes [#21](https://github.com/NickDJM/accessible-menu/issues/21)

## [1.0.0-beta.0](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-alpha.1...v1.0.0-beta.0) (2019-11-17)


### Features

* **menu:** add bundled library ([5b89937](https://github.com/NickDJM/accessible-menu/commit/5b89937f6026fe3daf1c2ec5e426c456c30b8167)), closes [#11](https://github.com/NickDJM/accessible-menu/issues/11)

## [1.0.0-alpha.1](https://github.com/NickDJM/accessible-menu/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2019-11-17)


### ⚠ BREAKING CHANGES

* **menu:** The submenuItem class no longer exists, and the menuToggle class has been added.

### Bug Fixes

* **menu:** properly exit menu on escape ([b5113e9](https://github.com/NickDJM/accessible-menu/commit/b5113e9bea30c412192526efdc8d3bb0be8e45c0))
* **package:** correct entry point to ([de6b439](https://github.com/NickDJM/accessible-menu/commit/de6b439cf37c1d2568a1ef94eae1dba63a659551)), closes [#12](https://github.com/NickDJM/accessible-menu/issues/12)


### Documentation

* **readme:** add release and license badges ([cea2814](https://github.com/NickDJM/accessible-menu/commit/cea2814b5e971463acca9ad02e05b8b3043f3cb6))


### Code Refactoring

* **menu:** replace submenuItem with menuToggle ([e43ad22](https://github.com/NickDJM/accessible-menu/commit/e43ad220962766b284f6cc33277bf194013fde13))

## 1.0.0-alpha.0 (2019-11-17)


### Features

* **menu:** add menu, menuitem, and submenuitem classes ([d0b26ab](https://github.com/NickDJM/accessible-menu/commit/d0b26ab99d996dce4c859c40722914197261027e))
* initial commit ([248b6ee](https://github.com/NickDJM/accessible-menu/commit/248b6ee65ea8b1b658a29306bd3e09ea1c4ef43b))


### Build System

* **npm:** add standard-version ([1b9b3af](https://github.com/NickDJM/accessible-menu/commit/1b9b3af5be9f4bae55ffc7d8135659183bc97846)), closes [#6](https://github.com/NickDJM/accessible-menu/issues/6)
* **npm:** implement basic githooks ([ace93a7](https://github.com/NickDJM/accessible-menu/commit/ace93a7c850d86f024aaf11e1991231c9c947d7a)), closes [#3](https://github.com/NickDJM/accessible-menu/issues/3)
* **npm:** implement eslint and hook ([b05128c](https://github.com/NickDJM/accessible-menu/commit/b05128c1f90ee662a214cbc9580d825bc5388c8e)), closes [#3](https://github.com/NickDJM/accessible-menu/issues/3)


### Documentation

* **conduct:** add code of conduct ([0ba3a83](https://github.com/NickDJM/accessible-menu/commit/0ba3a8345519fe052235624b5a8fa971da715742)), closes [#1](https://github.com/NickDJM/accessible-menu/issues/1)
* **contributing:** add contributing guidelines ([c9a97d2](https://github.com/NickDJM/accessible-menu/commit/c9a97d26dd710aba044978fdbec8ddc8fb6793eb))
* **license:** add license file ([b5f70bb](https://github.com/NickDJM/accessible-menu/commit/b5f70bb7c581f67a459060d1c1356b4519970e37)), closes [#1](https://github.com/NickDJM/accessible-menu/issues/1)
* **readme:** add initial readme ([2e79315](https://github.com/NickDJM/accessible-menu/commit/2e79315597bb2672d5cd4eb9a2cd07c4c3d05ae9)), closes [#1](https://github.com/NickDJM/accessible-menu/issues/1)
* **readme:** add versioning docs ([e76a5a9](https://github.com/NickDJM/accessible-menu/commit/e76a5a9f849fd80c345ae47a1e61327e82b7ae21))
* **templates:** add issue and pr templates ([f5a55b3](https://github.com/NickDJM/accessible-menu/commit/f5a55b36f2974ae1213dfdf85067dd8cb4f0bd33))
