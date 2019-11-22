# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
