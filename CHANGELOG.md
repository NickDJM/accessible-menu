# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0-beta.3](https://github.com/NickDJM/accessible-menu/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2023-06-22)


### Bug Fixes

* **controller:** use toggle for space and enter ([e5d7969](https://github.com/NickDJM/accessible-menu/commit/e5d79693e4d27ac554713f7a023244ab7a66c48d)), closes [#222](https://github.com/NickDJM/accessible-menu/issues/222)
* **focus:** do not reset child menus to correct focusing issues ([b92fa0f](https://github.com/NickDJM/accessible-menu/commit/b92fa0fb1164696bbcfa765521deb5224d1d7117)), closes [#209](https://github.com/NickDJM/accessible-menu/issues/209)
* **hover:** correct treeview focus and general hover delay bugs ([f613c84](https://github.com/NickDJM/accessible-menu/commit/f613c843b1488bc7c2e4ef2ca9e8bb28adb6e089))
* **menubar:** properly focus parent menu current child when closing  ([0e42d2b](https://github.com/NickDJM/accessible-menu/commit/0e42d2bc5fa766bd4b5b4cfe9ed9b58d88799d34))


### Build System

* **npm:** update all dependencies to latest ([92506d1](https://github.com/NickDJM/accessible-menu/commit/92506d1ce5752df0be812a441a529a2a0e30a446))

## [4.0.0-beta.2](https://github.com/NickDJM/accessible-menu/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2023-06-21)

## [4.0.0-beta.1](https://github.com/NickDJM/accessible-menu/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2023-06-20)


### Features

* add support for hoverDelay and transitions on pointerenter ([1a19215](https://github.com/NickDJM/accessible-menu/commit/1a19215b366cd73449d1579a80e6f2790588fb28)), closes [#211](https://github.com/NickDJM/accessible-menu/issues/211)


### Documentation

* update test docs to account for top-link disclosures ([de0a72b](https://github.com/NickDJM/accessible-menu/commit/de0a72b0720dad2590136e0fd2dff39aee330c3f))


### Continuous Integration

* **codeql:** upgrade to v2 ([6d14c98](https://github.com/NickDJM/accessible-menu/commit/6d14c986a5e298be90eb6e42521a594b15dc16bc)), closes [#214](https://github.com/NickDJM/accessible-menu/issues/214)


### Build System

* bump eslint-plugin-jsdoc from 39.9.1 to 40.0.0 ([056c0cd](https://github.com/NickDJM/accessible-menu/commit/056c0cdf14c697873ea4f2c1fd615d329dc3aa16))
* bump eslint-plugin-jsdoc from 40.3.0 to 43.0.0 ([95e2b48](https://github.com/NickDJM/accessible-menu/commit/95e2b48adc970be3e60add08e4667860bf5472d2))
* **eslint:** upgrade options for jsdoc plugin ([f3d96c5](https://github.com/NickDJM/accessible-menu/commit/f3d96c5b98dd96504f00917b1eef51cfc0e7915e))
* **npm:** ensure latest version of vitest to fix issues with githun action tests ([a4488e8](https://github.com/NickDJM/accessible-menu/commit/a4488e848ae74fc873b61a7618ab9ea0ca2d6e41))

## [4.0.0-beta.0](https://github.com/NickDJM/accessible-menu/compare/v3.0.5...v4.0.0-beta.0) (2023-02-09)


### ⚠ BREAKING CHANGES

* dist file names have changed to *.iife.js and *.es.js
* **validation:** changes the return type of validation functions from boolean to object
* isEventSupported will no longer be declared in validate
* dist file names have changed to *.iife.js and *.es.js
* **validation:** changes the return type of validation functions from boolean to object
* isEventSupported will no longer be declared in validate
* **validation:** changes the return type of validation functions from boolean to object
* isEventSupported will no longer be declared in validate
* isEventSupported will no longer be declared in validate
* **validation:** changes the return type of validation functions from boolean to object

### Features

* add demo environment using vite ([07fb0ba](https://github.com/NickDJM/accessible-menu/commit/07fb0baf0f27e6374155fbd074dfcb747494a861)), closes [#201](https://github.com/NickDJM/accessible-menu/issues/201)
* add demo environment using vite ([b9329bf](https://github.com/NickDJM/accessible-menu/commit/b9329bf8e6084f6a5c17ec7242ea65013d7c7472)), closes [#201](https://github.com/NickDJM/accessible-menu/issues/201)
* **menu:** add new TopLinkDisclosureMenu sub-class ([93dbca1](https://github.com/NickDJM/accessible-menu/commit/93dbca18b4184f3b40d551348881285360eaa0ec)), closes [#168](https://github.com/NickDJM/accessible-menu/issues/168)
* **menu:** add new TopLinkDisclosureMenu sub-class ([2481e91](https://github.com/NickDJM/accessible-menu/commit/2481e91d552c92e95cc5a7d8f36e1568c228008c)), closes [#168](https://github.com/NickDJM/accessible-menu/issues/168)


### Miscellaneous Chores

* remove deprecated validation function ([d710180](https://github.com/NickDJM/accessible-menu/commit/d7101809c2488f9b9d0956b791b40dfeb4660d04))
* remove deprecated validation function ([418d95b](https://github.com/NickDJM/accessible-menu/commit/418d95b8b1fdd49cc319b56ecbed19c191903205))
* remove deprecated validation function ([e746d54](https://github.com/NickDJM/accessible-menu/commit/e746d54f44f051f1a723aa2490c48a355893250b))
* remove deprecated validation function ([01739ca](https://github.com/NickDJM/accessible-menu/commit/01739caa7e44104e2c14cf6abd917a831e4e395c))


### Code Refactoring

* **validation:** return a status and message when validation fails ([ec16bc5](https://github.com/NickDJM/accessible-menu/commit/ec16bc52c2d8719403f7955ce6a88caa28403564))
* **validation:** return a status and message when validation fails ([4a490b3](https://github.com/NickDJM/accessible-menu/commit/4a490b3a761cb98373ec5e978edb1ad95aeb662f))
* **validation:** return a status and message when validation fails ([8933f44](https://github.com/NickDJM/accessible-menu/commit/8933f444372ffce740a98c2124ac6f169bb9281e))
* **validation:** return a status and message when validation fails ([4e2acb4](https://github.com/NickDJM/accessible-menu/commit/4e2acb4ffa7423cae2ef3b9dce10da63fc2f1fa6))
* **validation:** update validation functions to take advantage of new error system ([aba9997](https://github.com/NickDJM/accessible-menu/commit/aba9997575b329446888f72d47f540d84739a958))
* **validation:** update validation functions to take advantage of new error system ([81d048a](https://github.com/NickDJM/accessible-menu/commit/81d048a864ee4eb8f0dfab019085c65b5d841761))
* **validation:** update validation functions to take advantage of new error system ([d97d7ae](https://github.com/NickDJM/accessible-menu/commit/d97d7aecbbc5f404b108ee2804e344b434512845))
* **validation:** update validation functions to take advantage of new error system ([b1782b9](https://github.com/NickDJM/accessible-menu/commit/b1782b97c7d4cb96210c5fefb0760ac1c302d7e8))


### Documentation

* update references and security policy to reflext 4.x change ([f1c639d](https://github.com/NickDJM/accessible-menu/commit/f1c639d92fd3ea59b31f88b2540ddfba4eae11fd))
* update references and security policy to reflext 4.x change ([c849693](https://github.com/NickDJM/accessible-menu/commit/c849693ed6fea9a886377b87f99db2a531b19bbe))
* update references and security policy to reflext 4.x change ([78c2d68](https://github.com/NickDJM/accessible-menu/commit/78c2d684f011e2478232808e6adaab8eadf0dfbc))
* update references and security policy to reflext 4.x change ([9792aeb](https://github.com/NickDJM/accessible-menu/commit/9792aeb8eb7c09ad4166ede1c7081ef791719000))


### Build System

* **github:** enable all workflows for 4.x ([a08dda1](https://github.com/NickDJM/accessible-menu/commit/a08dda134243d11b0adefe230bf5bab7bc280903))
* **github:** enable all workflows for 4.x ([e8220fa](https://github.com/NickDJM/accessible-menu/commit/e8220fa6edc1fe5ec5e9e7fba80a9fad53d47206))
* **github:** enable all workflows for 4.x ([10b6a96](https://github.com/NickDJM/accessible-menu/commit/10b6a9603d19ac5e488dfd572890ed774284aca6))
* **github:** enable all workflows for 4.x ([f06a060](https://github.com/NickDJM/accessible-menu/commit/f06a060d1d493ec6f9027c704418aabd9ca5b2fc))
* replace rollup with vite and update dist to match ([d7b6785](https://github.com/NickDJM/accessible-menu/commit/d7b6785390de58257870ba9400f333fb01e3964f))
* replace rollup with vite and update dist to match ([304f0ac](https://github.com/NickDJM/accessible-menu/commit/304f0ac84ad3a2449b9ba89408a95293109d528e))
* use test run script for prerelease ([9b33d1a](https://github.com/NickDJM/accessible-menu/commit/9b33d1a62e40dfc3d25f4d8219d75021e94379cd))
* use test run script for prerelease ([6cc60a3](https://github.com/NickDJM/accessible-menu/commit/6cc60a34a45654c9166e136db95b98afdf060d23))

### [3.0.5](https://github.com/NickDJM/accessible-menu/compare/v3.0.4...v3.0.5) (2023-02-09)


### Bug Fixes

* enter/space should toggle submenu visibility ([6472c69](https://github.com/NickDJM/accessible-menu/commit/6472c6995cfa1f73a23d4c358b6d319f312d7ef1))
* **tests:** add jest-jsdom-environment to project ([3a2a13a](https://github.com/NickDJM/accessible-menu/commit/3a2a13a68ab9781b7261e252284fb998fb93e4db))


### Build System

* bump @commitlint/cli from 15.0.0 to 16.0.1 ([692a10b](https://github.com/NickDJM/accessible-menu/commit/692a10b60bdf7091615dd0cf7a2161ba9bff326b))
* bump @commitlint/cli from 16.3.0 to 17.0.0 ([f6aa717](https://github.com/NickDJM/accessible-menu/commit/f6aa717e1b261fb907d0c7f55c19f3ba466de033))
* bump @commitlint/config-conventional from 15.0.0 to 16.0.0 ([9aeca1f](https://github.com/NickDJM/accessible-menu/commit/9aeca1ff3b63eee65ba22d1d5bd721b30d083c90))
* bump @commitlint/config-conventional from 16.2.4 to 17.0.0 ([b8c93e2](https://github.com/NickDJM/accessible-menu/commit/b8c93e2edaa51b690835f2b30cadd01edd50c5ec))
* bump @rollup/plugin-babel from 5.3.1 to 6.0.0 ([447f1af](https://github.com/NickDJM/accessible-menu/commit/447f1af7bf9255dbb1279b75dea1618b56347e1b))
* bump docdash from 1.2.0 to 2.0.0 ([7346b0f](https://github.com/NickDJM/accessible-menu/commit/7346b0f50173dff2d7acb4ede1ca2fd30d5c168d))
* bump eslint-plugin-jsdoc from 37.9.7 to 38.0.3 ([3d7666c](https://github.com/NickDJM/accessible-menu/commit/3d7666c0435aed0f2e200a4204bcbc28159c3b22))
* bump eslint-plugin-jsdoc from 38.1.6 to 39.1.0 ([f5ef611](https://github.com/NickDJM/accessible-menu/commit/f5ef6113747f73638fe972525fd48ce995b674c6))
* bump husky from 7.0.4 to 8.0.1 ([40ac409](https://github.com/NickDJM/accessible-menu/commit/40ac40966641e6f1b3e5d8c1d5b6aa22dc225865))
* bump jest from 27.5.1 to 28.0.2 ([de25db8](https://github.com/NickDJM/accessible-menu/commit/de25db8885369a21945d0805ff21116e84828068))
* bump jest from 28.1.3 to 29.0.0 ([9fae69c](https://github.com/NickDJM/accessible-menu/commit/9fae69cc8178995484292232137d4fb42673c8fb))
* bump jest-environment-jsdom from 28.1.3 to 29.0.0 ([ad06a1f](https://github.com/NickDJM/accessible-menu/commit/ad06a1fce988b8907c87c0295fe2bea3e4341fa5))
* bump jest-extended from 1.2.1 to 2.0.0 ([66491a2](https://github.com/NickDJM/accessible-menu/commit/66491a2dd6761dfb42845e52167e304794a93282))
* bump jest-extended from 2.1.0 to 3.0.0 ([90eff49](https://github.com/NickDJM/accessible-menu/commit/90eff49ec6dd1e270ef88bcaf825d88eb5d66247))
* bump jsdoc from 3.6.11 to 4.0.0 ([83f807e](https://github.com/NickDJM/accessible-menu/commit/83f807e57858596dbdbb258f65fb81e4299ffeb7))
* bump lint-staged from 12.5.0 to 13.0.1 ([58058da](https://github.com/NickDJM/accessible-menu/commit/58058daf15543ebef2394dfcd262765a5bdd1b86))


### Documentation

* add Coldfront Labs Inc. as a sponsor ([a867085](https://github.com/NickDJM/accessible-menu/commit/a867085fe5dc935dcb21923062daf9a86b924bd7)), closes [#188](https://github.com/NickDJM/accessible-menu/issues/188)
* **badges:** update path to workflow badges ([fdf72ea](https://github.com/NickDJM/accessible-menu/commit/fdf72ea72024500414a9b0030a0c6f0bc24fd103)), closes [#190](https://github.com/NickDJM/accessible-menu/issues/190)
* correct incorrect default value for isTopLevel documentation ([a47662f](https://github.com/NickDJM/accessible-menu/commit/a47662fe227599bba29959767287a683a2038ff8))
* correct type in link to DisclosureMenu ([a20bed1](https://github.com/NickDJM/accessible-menu/commit/a20bed1ae6119b5edc87a209160c34322531594b))
* fix broken WAI ARIA example links ([853934e](https://github.com/NickDJM/accessible-menu/commit/853934e4990591754d5ec7e86436ae49f13b01fc))
* update examples links to working codepens ([6837573](https://github.com/NickDJM/accessible-menu/commit/6837573eb08c932596086c108e58fa5e99aee7f9)), closes [#191](https://github.com/NickDJM/accessible-menu/issues/191)
* update links to aria apg ([8f35759](https://github.com/NickDJM/accessible-menu/commit/8f357596066dd4b94c35d08919029af1c5dcd761))
* update readme to mention accessible-menu-bootstrap-5 ([8516528](https://github.com/NickDJM/accessible-menu/commit/8516528e80cef9d97264599b17b25fe860665f2e))

### [3.0.4](https://github.com/NickDJM/accessible-menu/compare/v3.0.3...v3.0.4) (2021-11-30)


### Bug Fixes

* **menu:** do not trigger hover events for pointer types pen or touch ([680abc5](https://github.com/NickDJM/accessible-menu/commit/680abc560052a2868b7fa14dbcf92c24f0821f29))


### Build System

* bump @commitlint/cli from 14.1.0 to 15.0.0 ([97c0335](https://github.com/NickDJM/accessible-menu/commit/97c033549cf4d826b022be4726920b31dd7e3e79))
* bump @commitlint/config-conventional from 14.1.0 to 15.0.0 ([e2db0da](https://github.com/NickDJM/accessible-menu/commit/e2db0daa5c0f81c37c8a8fd097ee8843dbb5e21d))
* bump lint-staged from 11.2.6 to 12.0.2 ([bf4f993](https://github.com/NickDJM/accessible-menu/commit/bf4f9937f211010eea4602a381b49b2acdf08edd))
* **versioning:** automatically update CDN version links in README on release ([556961b](https://github.com/NickDJM/accessible-menu/commit/556961bddec36a145037f4f1892fba7df750d35a)), closes [#145](https://github.com/NickDJM/accessible-menu/issues/145)

### [3.0.3](https://github.com/NickDJM/accessible-menu/compare/v3.0.2...v3.0.3) (2021-11-11)


### Bug Fixes

* **accessibility:** use pointer events for _handleHover() to ensure device support ([a137cb0](https://github.com/NickDJM/accessible-menu/commit/a137cb05cbb38980b4d508ad8a45cc7036f58feb))


### Build System

* bump @commitlint/cli from 13.2.1 to 14.1.0 ([4d423c0](https://github.com/NickDJM/accessible-menu/commit/4d423c0417f6d92a97e0ba3157484388d977064d))
* bump @commitlint/config-conventional from 13.2.0 to 14.1.0 ([ccf5e8e](https://github.com/NickDJM/accessible-menu/commit/ccf5e8e137229e41988f751047f6f518c8dd5880))

### [3.0.2](https://github.com/NickDJM/accessible-menu/compare/v3.0.1...v3.0.2) (2021-10-26)


### Bug Fixes

* **menubar:** ensure click events are fired on regular submenu items ([035a104](https://github.com/NickDJM/accessible-menu/commit/035a104ee9cde693138c2b55584f4ac5a6505776)), closes [#141](https://github.com/NickDJM/accessible-menu/issues/141)


### Build System

* bump eslint-plugin-jsdoc from 36.1.1 to 37.0.0 ([84f57d7](https://github.com/NickDJM/accessible-menu/commit/84f57d73aa40accb488195384de67666ef778876))


### Documentation

* **contributing:** update fork info and consistency ([2cc2c0d](https://github.com/NickDJM/accessible-menu/commit/2cc2c0d81f6e14eba1f2302282d7a2d441f3f1f0))


### Continuous Integration

* **workflow:** add build and lint workflows ([efbe3ca](https://github.com/NickDJM/accessible-menu/commit/efbe3cac03ee692ad4b6a3afd26a14fc53ec4ecf))

### [3.0.1](https://github.com/NickDJM/accessible-menu/compare/v3.0.0...v3.0.1) (2021-10-18)


### Bug Fixes

* **accessibilty:** replace click/touch events with pointer events ([e88ae5f](https://github.com/NickDJM/accessible-menu/commit/e88ae5feea540eb2c75c36a1af68ff582d53bef0))


### Documentation

* **badges:** add CodeQL badge ([fdcbfb7](https://github.com/NickDJM/accessible-menu/commit/fdcbfb76a7719fa81367a287c4a91ef538cea070))
* correct typo ([7adac86](https://github.com/NickDJM/accessible-menu/commit/7adac86b823ae8e142949ca5d7ef596f83a8a689))
* **examples:** use proper links to api in basic examples ([9c1f075](https://github.com/NickDJM/accessible-menu/commit/9c1f075098a38ca3e48296b2a35bd7d9e2892749))
* **github:** add documentation issue template ([f43cf42](https://github.com/NickDJM/accessible-menu/commit/f43cf42dee88668f71a77b1994d493826ba93352))
* **github:** add security policy ([30915b5](https://github.com/NickDJM/accessible-menu/commit/30915b5ebf3e9e93072a32f1a958803f2d5aaf92))
* **github:** update issue and pr templates ([8f7b322](https://github.com/NickDJM/accessible-menu/commit/8f7b322f805dc0ed4faa4ef61131c75e3bf59417))
* **menu:** correct documentation on handle click ([c0c9894](https://github.com/NickDJM/accessible-menu/commit/c0c98942e804fb87b881e90b3451fd49e426538b))
* **release:** update documentation to be accurate as to what happens on release ([a95f86c](https://github.com/NickDJM/accessible-menu/commit/a95f86c2eaa8871d6b79a66fdf9baff7677b8ee9))
* update contributing guidelines to reflect the current state of the project ([8fde6b8](https://github.com/NickDJM/accessible-menu/commit/8fde6b87c63c36ecf9356959344fcf1c21edf266))
* **validate:** add deprecation notice to isEventSupported() ([04c7cbd](https://github.com/NickDJM/accessible-menu/commit/04c7cbd4ce395d15f1411323a231e8c5615b59cd))


### Build System

* bump jest-extended from 0.11.5 to 1.0.0 ([85074a7](https://github.com/NickDJM/accessible-menu/commit/85074a728d578b4fcd584d67a33ba88464aa2ee0))
* **npm:** remove deprecated eslint-plugin-standard ([c50a001](https://github.com/NickDJM/accessible-menu/commit/c50a001fb439c444443a3406cc7c0be2e8dcafdb))

## [3.0.0](https://github.com/NickDJM/accessible-menu/compare/v3.0.0-alpha.3...v3.0.0) (2021-08-03)


### ⚠ BREAKING CHANGES

* **menus:** changed the name of all menu event handler methods and toggle expand/collapse
methods to begin with _
* **menu:** merging and changing the names of the DOM element generation methods will require
any code referencing the old methods to be updated

### Code Refactoring

* **menu:** clean up DOM element generating methods ([b242c9c](https://github.com/NickDJM/accessible-menu/commit/b242c9c5ac4ed02819bdfc956f5ea6daf85ef054)), closes [#127](https://github.com/NickDJM/accessible-menu/issues/127)
* **menus:** change methods to be protected where needed ([780c76b](https://github.com/NickDJM/accessible-menu/commit/780c76b5f5819e7d40a7b10ae31168551262e4a1))


### Documentation

* **examples:** link to new jsfiddles using 3.x ([4df02fe](https://github.com/NickDJM/accessible-menu/commit/4df02fea5a20bce047ee89ba14ec7e20bff2d6bc)), closes [#124](https://github.com/NickDJM/accessible-menu/issues/124)
* fix path to treeview ([92b0501](https://github.com/NickDJM/accessible-menu/commit/92b050179f757de35201d091ee111d0caf969f9f))
* properly mark fields as protected ([7d43b50](https://github.com/NickDJM/accessible-menu/commit/7d43b50eeef1bd52b2c5bac93556cf945015f63a))
* **treeview:** correct reference to treeview in toggle ([aaa4249](https://github.com/NickDJM/accessible-menu/commit/aaa42491f5ce3e73ac3f8099d24bf9f8179319bc))
* use docdash templates for api documentation ([9433ddf](https://github.com/NickDJM/accessible-menu/commit/9433ddfe9cc2f1c9f46c14c3eb60f5b87e8db649)), closes [#123](https://github.com/NickDJM/accessible-menu/issues/123)


### Build System

* **lint:** update eslint and prettier options ([c324a6a](https://github.com/NickDJM/accessible-menu/commit/c324a6ad12393ff0af921bec558a3f84be0d6560))
* **npm:** update dev dependencies to latest ([cebd3c4](https://github.com/NickDJM/accessible-menu/commit/cebd3c411edc182825440ef789d96480c043c66b))

## [3.0.0-alpha.3](https://github.com/NickDJM/accessible-menu/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2021-07-23)


### ⚠ BREAKING CHANGES

* **fields:** renamed all class fields to start with _ to mark them as protected

### Bug Fixes

* correct typo in error message during initialization ([7190697](https://github.com/NickDJM/accessible-menu/commit/71906977db3e24c202858671f733fe1d1ecea690))


### Performance Improvements

* **validation:** add custom validation for DisclosureMenus to handle _optionalSupport field ([be4f370](https://github.com/NickDJM/accessible-menu/commit/be4f370496ba71a88546f487e1287668e06baf89))


### Code Refactoring

* **fields:** rename and declare class fields outside of constructors ([d725043](https://github.com/NickDJM/accessible-menu/commit/d725043c1239e44d2b608a488929288c2be9cfe5)), closes [#114](https://github.com/NickDJM/accessible-menu/issues/114)


### Build System

* **rollup:** add cleanup plugin to remove comments from bundled code ([8f15e77](https://github.com/NickDJM/accessible-menu/commit/8f15e77ca361ef3803050799d27701bb4282698c))

## [3.0.0-alpha.2](https://github.com/NickDJM/accessible-menu/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2021-07-21)


### Bug Fixes

* **menubar:** only change the root menubar's tabIndex on init ([d993c13](https://github.com/NickDJM/accessible-menu/commit/d993c13286562999547b6a0cebc0492cca41fbe3))
* **menu:** only change focusState on click of non-root menus ([110e241](https://github.com/NickDJM/accessible-menu/commit/110e2410b1ee013f8ab81cda4741d16ceffded84))
* **menu:** only setTimout on mouseleave if hoverDelay is > 0 ([1158090](https://github.com/NickDJM/accessible-menu/commit/1158090b28baf4080f6c3056fa59f05f4b2cabad))
* **menus:** add textContent fallback to character functions ([d6224cb](https://github.com/NickDJM/accessible-menu/commit/d6224cbad3b628463569a34fbe6151e0dce8b959))
* **treeview:** fix up and down arrow navigation when going through multiple menu levels ([2caf071](https://github.com/NickDJM/accessible-menu/commit/2caf0710b18dbca7b6448755dd58cee9dc18aa7b))
* **treeview:** handle escape key if the root menu can collapse ([43d09bf](https://github.com/NickDJM/accessible-menu/commit/43d09bfedf95a8907edc9a87d8143c0771a5b6ae))
* **treeview:** only trigger character event if no modifier is pressed ([51b43a8](https://github.com/NickDJM/accessible-menu/commit/51b43a8dd142f57eaf259802a2e8efca07276631))


### Reverts

* click should still alter the focusState of menus ([c56de2f](https://github.com/NickDJM/accessible-menu/commit/c56de2fc13f3c6072cd88ae3643e3d40038dacc4))


### Code Refactoring

* **focus:** set parent/child menu focus when setting menu's own focus ([ae3b663](https://github.com/NickDJM/accessible-menu/commit/ae3b663f01a1301e2affadf4dd63a930649edc4f))


### Build System

* **github:** add action for running tests ([9cc2de3](https://github.com/NickDJM/accessible-menu/commit/9cc2de383a3935e43c9c28c6c6b18f5054458997))
* remove unused test directory and dependencies ([a5e2e4b](https://github.com/NickDJM/accessible-menu/commit/a5e2e4beaaaf723907b0149568e7606fbea8505d))


### Documentation

* add upgrade guide from v2 to v3 ([c3ae67a](https://github.com/NickDJM/accessible-menu/commit/c3ae67a038c991b876c68289ea1f806a24ec9f4f)), closes [#107](https://github.com/NickDJM/accessible-menu/issues/107)
* **menubar:** update docs to reflect tabIndex fix ([480406f](https://github.com/NickDJM/accessible-menu/commit/480406f3ee8e38fa92f560698c86817c15e6df34))
* **README:** add build status badge ([00fabf3](https://github.com/NickDJM/accessible-menu/commit/00fabf3d2a4c17c6877c36e6ffba12cb5188234a))
* use jsdoc to generate api documentation ([a524ef8](https://github.com/NickDJM/accessible-menu/commit/a524ef8358d1468a9cfd7f24f0ba5bb46e6590af))

## [3.0.0-alpha.1](https://github.com/NickDJM/accessible-menu/compare/v3.0.0-alpha.0...v3.0.0-alpha.1) (2021-06-23)


### Bug Fixes

* **toggle:** remove immediate initialization from _baseMenuToggle ([d3fae61](https://github.com/NickDJM/accessible-menu/commit/d3fae61cb68b9d47d6c27bde69133234548ce3b4))


### Performance Improvements

* **toggle:** simplify adding and removing of classes ([5d21677](https://github.com/NickDJM/accessible-menu/commit/5d2167706b6543fd8a97ebbd88a1bc0fe476e647)), closes [#113](https://github.com/NickDJM/accessible-menu/issues/113)

## [3.0.0-alpha.0](https://github.com/NickDJM/accessible-menu/compare/v2.2.0...v3.0.0-alpha.0) (2021-06-18)


### ⚠ BREAKING CHANGES

* **disclosuremenu:** Users expecting the default handling of the option keys will now need to set
optionalKeySupport to true
* **validation:** merge isHTMLELement, isEvent, isKeyboardEvent, isMenu, and isMenuToggle into
isValidInstance and merge isBoolean, isString, and isNumber into isValidType
* **focus:** custom menus extending BaseMenu and relying on the menubar's focus functionality
will need to extend Menubar.
* **dist:** Removing all polyfills and reference to IE in the compiler will break all menus
when displayed in IE
* **menus:** if any existing implementation relies on sub-menus and toggles to _not_ inherit the root's properties, this will cause major functionality issues.
* Changing both the file and class names for MenuItem and MenuToggle will break
anything relying on those classes.

* refactor(generation): set menu and children element classes during contruction

* feat(menus): add specific menu item and toggle classes for each menu type

* refactor(imports): add .js extention to ensure browser module support

* test(functional): add browser module testing for available menu types

* chore: add compiled code

* test: update tests for hovering and events

### Features

* **disclosure:** add getter/setter for optionalKeySupport ([f6ef2d4](https://github.com/NickDJM/accessible-menu/commit/f6ef2d4b58a11d319eeef3c54755d4f070b868d6))
* **disclosuremenu:** add the ability to toggle optional keyboard support ([18c0fa7](https://github.com/NickDJM/accessible-menu/commit/18c0fa7be7a4b2162e86e4bbb4ce6bd4cd53787d)), closes [#104](https://github.com/NickDJM/accessible-menu/issues/104)
* **dist:** add full esm support and kill IE support ([8610728](https://github.com/NickDJM/accessible-menu/commit/86107282e3d2c109c35dc93ba5e46d3a9768dc1a))
* **hover:** change isHoverable to hoverType to handle dynamic hovers ([2cf40aa](https://github.com/NickDJM/accessible-menu/commit/2cf40aae3acf15e31f0b91a7e9b13e3c1f920250)), closes [#100](https://github.com/NickDJM/accessible-menu/issues/100)
* **initialization:** add a flag to allow/disallow auto initialization for subclass menus ([0fc701f](https://github.com/NickDJM/accessible-menu/commit/0fc701ff950699037b0f555f9188484e19fa6b29))
* **menu:** add new method to focus a child of a given index ([cea3352](https://github.com/NickDJM/accessible-menu/commit/cea3352089b8372929d37a527eb723b44f883921))
* **menu:** add shoudlFocus getter to control moving focus in the DOM ([68ca8a6](https://github.com/NickDJM/accessible-menu/commit/68ca8a620cf62390ae462c6213e823b191831d41))
* **menu:** have focus follow hover when hover is set to dynamic ([a2e7e1a](https://github.com/NickDJM/accessible-menu/commit/a2e7e1aa7dd4735a67e16f9e56d24bcf1d1b7afa)), closes [#100](https://github.com/NickDJM/accessible-menu/issues/100)
* **subclass:** add Treeview subclass ([e25c93f](https://github.com/NickDJM/accessible-menu/commit/e25c93f5442bb514ebf7a46d281793f245c904c2)), closes [#105](https://github.com/NickDJM/accessible-menu/issues/105)
* **toggle:** allow expand and collapse methods to be silent ([8282e93](https://github.com/NickDJM/accessible-menu/commit/8282e93e914de811c336b770895cb58d45980ade))
* implement browser module support ([0bab26c](https://github.com/NickDJM/accessible-menu/commit/0bab26c8a24fb36c1228cacb547d58a95fd0643b))


### Bug Fixes

* **event:** make sure key is not a number before using .match() ([d8b0f02](https://github.com/NickDJM/accessible-menu/commit/d8b0f021d098796cd70a60f7327bbb9ae4cefef9))
* **menu:** add basic error prevention when setting the currentChild ([ce1b431](https://github.com/NickDJM/accessible-menu/commit/ce1b4315c4b5011c6e0d9f77a2f29a757810010c))
* **menu:** add blurSiblings method to menu items to fix click issues ([5b1f7f2](https://github.com/NickDJM/accessible-menu/commit/5b1f7f2f8d3b7a38285e5e0e787f15b18e356308))
* **menu:** ensure proper event type is set for menus ([a4f7505](https://github.com/NickDJM/accessible-menu/commit/a4f7505ac14cf80f01221343f89dc545ddd9232d))
* **menu:** manually trigger click action on space/enter ([559afc8](https://github.com/NickDJM/accessible-menu/commit/559afc8941bdfcbe600ef209dc516a3880eac8a2))
* **module:** resolve circular dependencies ([5278b1e](https://github.com/NickDJM/accessible-menu/commit/5278b1ed1d3432bb2833279c5104f57a7962bfc3)), closes [#95](https://github.com/NickDJM/accessible-menu/issues/95)
* **treeview:** correct toggle class name ([e96ffaa](https://github.com/NickDJM/accessible-menu/commit/e96ffaab3e1760eaf2311e73fe7b073cb1bcb19a))
* **validation:** ensure error message only use constructor's name ([80ccdcc](https://github.com/NickDJM/accessible-menu/commit/80ccdcce8f317b7b04298b64b95ec89d2add748f))
* **validation:** fail isCSSSelector is null is passed ([15c34a3](https://github.com/NickDJM/accessible-menu/commit/15c34a38c57dcb927bb4957f576f9cd5d2771cf0))
* **validation:** make isEventSupported return false if either checks fail ([ecd9f88](https://github.com/NickDJM/accessible-menu/commit/ecd9f884a847aa334faa0521ef6b330bd6b780f7))
* **validation:** make isValidClassList fail if array is passed instead of object ([c401b70](https://github.com/NickDJM/accessible-menu/commit/c401b704f1fa3975cbe67d3719ae07fe61302325))


### Performance Improvements

* **menu:** clean up handeClick for all menus ([6bdfdd0](https://github.com/NickDJM/accessible-menu/commit/6bdfdd0811ba37df0680f066133a85ccdda2a924))
* **validation:** reduce validation functions into instance or type validation ([42bf94e](https://github.com/NickDJM/accessible-menu/commit/42bf94ec8fe00732c31dbd164c8c28ce4d0125fc))


### Build System

* **lint:** pass ignore file to prettier during lint-staged ([1cdfbd8](https://github.com/NickDJM/accessible-menu/commit/1cdfbd8bcaab44ad7f1de400fd736b80d2f6e8a4))
* **npm:** package entire src directory ([02bca65](https://github.com/NickDJM/accessible-menu/commit/02bca656d55e5dcf159cb6524699f1808f6bb5b0))
* use specific rollup file to allow multiple exports on index ([82a3f48](https://github.com/NickDJM/accessible-menu/commit/82a3f4840a0e570afea169e700bd3f5ebd927df5))
* **editor:** add specific editor config ([fd44608](https://github.com/NickDJM/accessible-menu/commit/fd4460827bc5b5dfd0beb953f06dbfb0b9c8bbf7))
* **lint:** use prettier as a stand-alone formatter ([aedffb1](https://github.com/NickDJM/accessible-menu/commit/aedffb1ab6652c4916cebb5a4607fc84a6739662))
* **npm:** add lint-staged for faster commits ([1874fb3](https://github.com/NickDJM/accessible-menu/commit/1874fb306e6c3c36831e9bedf3c45d6132abdfa3))
* **npm:** add new files to packaged files ([135d7b2](https://github.com/NickDJM/accessible-menu/commit/135d7b2900909f5b644ee6260b2726ebccb905e9))
* **npm:** cleanup package and add files ([9ec6ca6](https://github.com/NickDJM/accessible-menu/commit/9ec6ca6157e1e2e46a4dd9ad0f53fc01263799e3))
* **npm:** rename test build command ([8bd9706](https://github.com/NickDJM/accessible-menu/commit/8bd9706b3cac11958462023c09ae22d073103320))
* **npm:** upgrade husky to 6.0 ([ab7579a](https://github.com/NickDJM/accessible-menu/commit/ab7579ab0416ef2366a823e011275ff66fefaf72))
* **prettier:** specifically set the prettier options that are cared about ([4f7c5af](https://github.com/NickDJM/accessible-menu/commit/4f7c5af5195daeac4ad6ee2bd778590df3c5622d))


### Documentation

* **classes:** correct error in focus state for closing toggles ([93cc9ca](https://github.com/NickDJM/accessible-menu/commit/93cc9caf99c9ce9d18c21bcf0c6c740a690d00a3))
* add information about dist directory and what is provided ([0865987](https://github.com/NickDJM/accessible-menu/commit/086598757fa3e87031e8f987cfc62b795569be26))
* minor corrections to comments ([9964af8](https://github.com/NickDJM/accessible-menu/commit/9964af8a9c7e942c5965f7cbbe6ce72368a22157))
* remove reference to open/close classes for menu toggles ([247dff2](https://github.com/NickDJM/accessible-menu/commit/247dff2a3de007cbd8698a3d84b46e53828e0744))
* **basics:** update basic exmaples to reflect changes ([3a01856](https://github.com/NickDJM/accessible-menu/commit/3a018561506df22976e8e889015559ac690b027b))
* **classes:** update all class documentation to reflect changes made ([b5f06d4](https://github.com/NickDJM/accessible-menu/commit/b5f06d4b0bf9cb4dcc79ed8fbd4eed1fcdf7c584))
* **readme:** update general information ([ef079f1](https://github.com/NickDJM/accessible-menu/commit/ef079f13901fbfeb189c5a9ed440104b8913eee8))


### Code Refactoring

* **focus:** move focus methods for menubar into the menubar subclass ([38230a8](https://github.com/NickDJM/accessible-menu/commit/38230a8f14f52d01b8e321c1d8cf85960d36b058))
* **menu:** make sure all parameters are valid before initialization ([ae694c7](https://github.com/NickDJM/accessible-menu/commit/ae694c7604fca9bd5c8cc6fe9bd92ab7c2af867e))
* **menus:** use root props for sub-menus and toggles ([4aea368](https://github.com/NickDJM/accessible-menu/commit/4aea3687d38cd549a3a32aab2037e675a86ffe43)), closes [#86](https://github.com/NickDJM/accessible-menu/issues/86)
* **toggle:** rearrange actions in open, preview, and close to make more sense ([f26e120](https://github.com/NickDJM/accessible-menu/commit/f26e120df0b51088da8f60c332209381875d28f1))
* **validation:** make classlist validation more useful ([f8edd77](https://github.com/NickDJM/accessible-menu/commit/f8edd7778273ac24cd98f3c82f155bc7a9b2dfdd))
* **validation:** rework validation to be more descriptive and helpful ([7456490](https://github.com/NickDJM/accessible-menu/commit/7456490057009ab15fef6dd94fa89fd127a6fd16))
* **validation:** use proper name for open/close class validation ([6d5073c](https://github.com/NickDJM/accessible-menu/commit/6d5073c8a52e08358fdac4f804432d3c248e71d2))

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
