# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.3.0](https://github.com/NickDJM/accessible-menu/compare/v2.2.0...v2.3.0) (2021-06-07)


### Features

* **menu:** allow Menubar and DisclosureMenu to be imported individually ([b168dd3](https://github.com/NickDJM/accessible-menu/commit/b168dd3ce6666141b8a83ad8ecb6cf9c733ebedd))


### Bug Fixes

* **compile:** properly run code through babel ([e5bac70](https://github.com/NickDJM/accessible-menu/commit/e5bac70642b92f893692da2b71c60afc1e6a573f))
* **menu:** rewrite click events to resolve unresponiveness issue ([12598fc](https://github.com/NickDJM/accessible-menu/commit/12598fcb11c36623ab61109cff5d5f8e2b492271)), closes [#109](https://github.com/NickDJM/accessible-menu/issues/109)


### Build System

* overhaul build and development config ([be89706](https://github.com/NickDJM/accessible-menu/commit/be89706a7c01eb508074c42c223a18be1d7014dd))


### Documentation

* **readme:** update browser support icons and info ([b3cbdd5](https://github.com/NickDJM/accessible-menu/commit/b3cbdd570d3f2aa3013bb0936f42953ce1b428ab))
* correct function comments ([f4264b7](https://github.com/NickDJM/accessible-menu/commit/f4264b7f43e6642d65f22900db311db16976578a))

## [2.2.0](https://github.com/NickDJM/accessible-menu/compare/v2.1.1...v2.2.0) (2021-03-24)


### Features

* **menu:** add expand/collapse events to MenuToggles ([b736c1a](https://github.com/NickDJM/accessible-menu/commit/b736c1adbc41d51f7c7b05e0c4fdc153c9b6444d)), closes [#90](https://github.com/NickDJM/accessible-menu/issues/90)


### Bug Fixes

* **event:** check if menu isHoverable before running event code ([638778d](https://github.com/NickDJM/accessible-menu/commit/638778de1016fe597dc6cdc958b0d74fabd0303a)), closes [#84](https://github.com/NickDJM/accessible-menu/issues/84)
* **event:** properly pass event object to keydown and keyup events ([fc281bf](https://github.com/NickDJM/accessible-menu/commit/fc281bf81059e8dcd897d554a614bba3536d151b))
* **menubar:** wait for menu to render before focussing child ([21f50ee](https://github.com/NickDJM/accessible-menu/commit/21f50ee0aa420500eaf43ef3f7761c8e080fd431)), closes [#99](https://github.com/NickDJM/accessible-menu/issues/99)
* **polyfill:** add CustomEvent constructor polyfill for IE ([d08cb2d](https://github.com/NickDJM/accessible-menu/commit/d08cb2d7c35dbae4bdfab99f299f4baa8e217d0a)), closes [#97](https://github.com/NickDJM/accessible-menu/issues/97)


### Documentation

* mention new expand/collapse events in the toggle documentation ([f65ce32](https://github.com/NickDJM/accessible-menu/commit/f65ce32829cc00350c8ff7027863619ffc92887b))


### Build System

* **npm:** update dev dependencies to latest ([accc5ba](https://github.com/NickDJM/accessible-menu/commit/accc5ba143f01bfb37a06c67ecb6ac8925af4e3b))

### [2.1.1](https://github.com/NickDJM/accessible-menu/compare/v2.1.0...v2.1.1) (2020-11-05)


### Bug Fixes

* **accessibility:** handle various scenarios causing inaccessible IDs ([c55ff1d](https://github.com/NickDJM/accessible-menu/commit/c55ff1d0df6145c51ad8da4f1eb35956116d8acc)), closes [#87](https://github.com/NickDJM/accessible-menu/issues/87)


### Build System

* **npm:** update dependencies and security violations ([d05e1c6](https://github.com/NickDJM/accessible-menu/commit/d05e1c6bdcf53d0c705d24c18dba8f738e9e673e))
* **polyfills:** add polyfill for String.prototype.endsWith() ([82b345a](https://github.com/NickDJM/accessible-menu/commit/82b345a47a211656385703e3e82efe7d2ac68d59))

## [2.1.0](https://github.com/NickDJM/accessible-menu/compare/v2.0.0...v2.1.0) (2020-07-25)


### Features

* **menu:** allow for empty open and close classes ([a58b1e3](https://github.com/NickDJM/accessible-menu/commit/a58b1e335c54ec9c4d919075463248c0ef62f316)), closes [#72](https://github.com/NickDJM/accessible-menu/issues/72)
* **menu:** allow for multiple open and close classes ([b4bc19f](https://github.com/NickDJM/accessible-menu/commit/b4bc19f4d4acd987f6ee1749192799387b533355)), closes [#73](https://github.com/NickDJM/accessible-menu/issues/73)


### Bug Fixes

* **events:** make click handling a lot more strict ([7f91256](https://github.com/NickDJM/accessible-menu/commit/7f91256be4e2ad016be02f2cc41c210ac72b34da))
* **toggle:** allow for multiple open/close classes in IE with loop ([608450d](https://github.com/NickDJM/accessible-menu/commit/608450d51214cd35bc44fa4ebcc40cb2dfdb95ac)), closes [#72](https://github.com/NickDJM/accessible-menu/issues/72)


### Documentation

* **usage:** update example to be plain html ([302a87c](https://github.com/NickDJM/accessible-menu/commit/302a87cdba7abb510ea85a4f78d6be58eed0df30)), closes [#75](https://github.com/NickDJM/accessible-menu/issues/75)


### Build System

* **deps-dev:** bump standard-version from 7.1.0 to 8.0.1 ([7b6a2c2](https://github.com/NickDJM/accessible-menu/commit/7b6a2c21da5ad96c98799a63e3e1cceed6736378)), closes [#82](https://github.com/NickDJM/accessible-menu/issues/82)
* **deps-dev:** bump standard-version from 7.1.0 to 8.0.1 ([0fc954f](https://github.com/NickDJM/accessible-menu/commit/0fc954fea531393ec2443aee713de2ab8974c784))

## [2.0.0](https://github.com/NickDJM/accessible-menu/compare/v1.1.0...v2.0.0) (2020-05-21)


### ⚠ BREAKING CHANGES

* **menutoggle:** Bootstrap users will need to adjust their custom styles to handle not having the
parent's class altered when menus are toggled
* **menu:** AccessibleMenu is no longer a constructor, so uses will have to use
AccessibleMenu.Menubar
* **menu:** Anything relying on the menu.js file will need to be updated to _baseMenu.js
* **menu:** Using old getters/setter will result in an error

### Features

* **events:** use keyup events instead of keydown events ([4b8a5ad](https://github.com/NickDJM/accessible-menu/commit/4b8a5ad5a6219e1fac1b98b936036788694aecdc))
* **menu:** add ability to make submenu's open/close on hover ([6b30546](https://github.com/NickDJM/accessible-menu/commit/6b30546e4da5c3b30013b753856539508518e737))
* **menu:** add DisclosureMenu class ([9ade527](https://github.com/NickDJM/accessible-menu/commit/9ade527c1d222e5b494b37fbd6bbc37f8c60cc2e)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menu:** add menuLinkSelector property to Menu class ([6b4e1f2](https://github.com/NickDJM/accessible-menu/commit/6b4e1f2c6dc1c6f771f3a363c2ff37dde1fc0e8a)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menu:** add new methods for setting dom elements in the menu ([f55951c](https://github.com/NickDJM/accessible-menu/commit/f55951c1213e65cfc7dc1bb6534d93f16c6624a9))
* **menu:** add support for a closed class ([0668b56](https://github.com/NickDJM/accessible-menu/commit/0668b56dc43f8f12ec56fe1012aedb990bf9e71b))
* **menu:** remove focus changing when user is using a mouse ([0b02fb0](https://github.com/NickDJM/accessible-menu/commit/0b02fb06f294d4fd686957ffeb9aa3ebc6bc2998))
* **menu:** split out menubar functionality into it's own class ([3466db1](https://github.com/NickDJM/accessible-menu/commit/3466db1ce166035b617ed105dd145ebf90bdea04)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)


### Bug Fixes

* **events:** use touchup and mouseup events instead of click ([24f8eaf](https://github.com/NickDJM/accessible-menu/commit/24f8eaf3a3ca2e82188275646ada2d46b64f576d))
* **ie:** add string.prototype.startsWith polyfill ([181194b](https://github.com/NickDJM/accessible-menu/commit/181194b1143b373fb9247455c9f48b2a7cd97300))
* **importing:** update index to match new structure ([5e7a09b](https://github.com/NickDJM/accessible-menu/commit/5e7a09b31031caf1b3b20e2fbf890287191113df))
* **menu:** pass hoverDelay to all submenus ([4eca2aa](https://github.com/NickDJM/accessible-menu/commit/4eca2aaac8355be0c4d97a0af5a5713dfdc5b7d4))
* **package:** adjust files ([4bd259a](https://github.com/NickDJM/accessible-menu/commit/4bd259a26a62c22fb7faea12684748cff61693a9))
* correct paths ([ee62bc3](https://github.com/NickDJM/accessible-menu/commit/ee62bc37aa5d4c81e72a3b1df2cd7d088c65cd14))
* **menubar:** ensure escape will always close open menus ([c42d2e5](https://github.com/NickDJM/accessible-menu/commit/c42d2e585f26284977802a01bb580b53b84aceae))


### Performance Improvements

* **events:** add menu-level event tracking ([338a2b0](https://github.com/NickDJM/accessible-menu/commit/338a2b0d6814395fa0cfe76c02ff5eeff9196efc)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menu:** set default menuItemSelector to li ([98e7ec5](https://github.com/NickDJM/accessible-menu/commit/98e7ec5dea58345b12413a6f53b129a66173e904))
* **toggle:** clean up close function and create collapse ([131d22d](https://github.com/NickDJM/accessible-menu/commit/131d22db6b02d1c6457cc97cf452bb7692f24ddc))
* **toggle:** only add button role if toggle isn't a button ([95f2cfb](https://github.com/NickDJM/accessible-menu/commit/95f2cfb855342033aa0612cf129468c3b29d5c3a))
* **validation:** condense more of the validation ([d9064ac](https://github.com/NickDJM/accessible-menu/commit/d9064ac1127cd20205f63ba4b61d055b475ee675))
* **validation:** move validation to its own file for code reuse ([9df795d](https://github.com/NickDJM/accessible-menu/commit/9df795da6ddac0b7f592798d804d724796f3c699))


### Build System

* update dependencies and config ([aa10023](https://github.com/NickDJM/accessible-menu/commit/aa100231f8c90885fbe9c5332e162006425b1e48))


### Documentation

* update documentation for 2.0.0 ([794b553](https://github.com/NickDJM/accessible-menu/commit/794b5533b53f837c475cecc57e454e46bec4fee4))
* update jsdocs to have proper default values declared ([e7335a1](https://github.com/NickDJM/accessible-menu/commit/e7335a18d277b22bf7effc6891ffe102023054fb))


### Code Refactoring

* **events:** move toggle events into main menu ([04fcc98](https://github.com/NickDJM/accessible-menu/commit/04fcc98b34680e94b1a0b8a22357d70711e18bf0)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menu:** change constructors, getters, and setters for menus ([3800046](https://github.com/NickDJM/accessible-menu/commit/3800046e197f1d56a5ced5bd3a0250dc4ebbc358)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menu:** rename Menu to BaseMenu ([6ad7ec6](https://github.com/NickDJM/accessible-menu/commit/6ad7ec637229120dd48196987f101bd0d3ff7a2c)), closes [#61](https://github.com/NickDJM/accessible-menu/issues/61)
* **menutoggle:** only alter controlled menu classes on open/close ([8099df8](https://github.com/NickDJM/accessible-menu/commit/8099df84e73f635ab7b81473fd3fc9f92012730f))

## [1.1.0](https://github.com/NickDJM/accessible-menu/compare/v1.0.6...v1.1.0) (2020-03-09)


### Features

* add built-in ie11 support to cdn  ([0fbba5b](https://github.com/NickDJM/accessible-menu/commit/0fbba5b6620ba6102938e17d08a06b183434b495)), closes [#58](https://github.com/NickDJM/accessible-menu/issues/58)


### Bug Fixes

* **menu:** add handlers for enter/space in root level menus ([4b26192](https://github.com/NickDJM/accessible-menu/commit/4b26192e499b8fa8c97de9683a50b745f4406b07)), closes [#56](https://github.com/NickDJM/accessible-menu/issues/56)


### Build System

* **npm:** fix commitizen ([244e5b1](https://github.com/NickDJM/accessible-menu/commit/244e5b1d9b5a2c5ac9a802740be1ad76e94a6fc1))


### Documentation

* **general:** add jsfiddle example for the library ([8304580](https://github.com/NickDJM/accessible-menu/commit/8304580fea306610580e1c81fa3cacc64168d82e))
* **general:** update description ([6427d56](https://github.com/NickDJM/accessible-menu/commit/6427d568c1a386593270a407bdcd1d7d86af9758))

### [1.0.6](https://github.com/NickDJM/accessible-menu/compare/v1.0.5...v1.0.6) (2020-02-26)


### Bug Fixes

* **accessibility:** correct role declarations on menu items ([66aca2f](https://github.com/NickDJM/accessible-menu/commit/66aca2f230c9d065e1770e68c01b0b2726084780)), closes [#54](https://github.com/NickDJM/accessible-menu/issues/54)

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
