## [5.0.0-beta.6](https://github.com/NickDJM/accessible-menu/compare/v5.0.0-beta.5...v5.0.0-beta.6) (2026-10-22)

### Features

* **responsiveness:** automatically regenerate media queries when updated ([226a7ac](https://github.com/NickDJM/accessible-menu/commit/226a7acbcf5427aad6930d4c061db3be4c99fbf8))
* **treeview:** add ability to have nested trigger toggles ([2f80dc1](https://github.com/NickDJM/accessible-menu/commit/2f80dc195ba7c4b48d8e73c41117bd9157af2903)), references [#341](https://github.com/NickDJM/accessible-menu/issues/341)

### Bug Fixes

* **demo:** correct styling of toggle ([f5c5137](https://github.com/NickDJM/accessible-menu/commit/f5c5137632326b4b2f0f822983b4061b90e1411b))
* **hover:** do not trigger hasExpanded through mediaMatch ([dd9100e](https://github.com/NickDJM/accessible-menu/commit/dd9100e11fa8a7e5bdb4db29b39a4f5723a6573b))

### Performance Improvements

* simplify click handling and add test coverage ([8383f41](https://github.com/NickDJM/accessible-menu/commit/8383f41b9fa590d320aeca9dc83909650b32b68d))

### Documentation

* add clarification on storage manager ([6d2c1e1](https://github.com/NickDJM/accessible-menu/commit/6d2c1e1da36d1e46c2d9111bdd2fd680e1a43bd1))
* add demo to documentation site ([b25254c](https://github.com/NickDJM/accessible-menu/commit/b25254cb8923179de6ce76edae816c907a8616b4))
* add instructions on how to handle separators ([f3917fa](https://github.com/NickDJM/accessible-menu/commit/f3917fa784f6fb794b2d89ffc1d3c32f6798121f)), references [#437](https://github.com/NickDJM/accessible-menu/issues/437)
* add instructions on updating submenuSubtoggleSelectors ([e9ddd6e](https://github.com/NickDJM/accessible-menu/commit/e9ddd6ec68dcdac2e464b5f917dab591f85026e7)), references [#301](https://github.com/NickDJM/accessible-menu/issues/301)
* **api:** clean up focus documentation ([dd304c2](https://github.com/NickDJM/accessible-menu/commit/dd304c2e5871128b0f4b224f6558d1e66c8802e8))
* clarifications and corrections ([b497c37](https://github.com/NickDJM/accessible-menu/commit/b497c374170bfc7327a14fd68657d0d771d4d47b))
* clarify hover features ([7ee4c3d](https://github.com/NickDJM/accessible-menu/commit/7ee4c3d5c104811c0c6d409c4ba8978518f47d9d))
* cleanup collapse and expand wording, fix spacing, and correct typos ([c6b0391](https://github.com/NickDJM/accessible-menu/commit/c6b03914b942c8bbe19674db9a929a298e76c20b))
* correct validation information ([4d704e0](https://github.com/NickDJM/accessible-menu/commit/4d704e0f66c9c17656009205c076fdc635642fbb))
* correct wording around expanding and collapsing ([974c799](https://github.com/NickDJM/accessible-menu/commit/974c799a6706c8cca56187bd6d07d392ad16b7ea))
* **demo:** update demo to show new options ([d89ee66](https://github.com/NickDJM/accessible-menu/commit/d89ee664a69ed687d68110b879795205cced40e5))
* **inheritance:** flag fields, getters, setters, and methods as inherited where applicable ([21057b9](https://github.com/NickDJM/accessible-menu/commit/21057b9518e88ef8fad95ffa92d209edc37fbc05))
* minor link fixes ([b08126a](https://github.com/NickDJM/accessible-menu/commit/b08126a6a93ee42eac93e0b9764fbc5e92030e88))
* **release:** update to reflect automatic releases ([df5fdb0](https://github.com/NickDJM/accessible-menu/commit/df5fdb090ee8fe30eacbc44f41a0dc1f2476444d))
* **security:** update dependecies to reflect core ([a311479](https://github.com/NickDJM/accessible-menu/commit/a311479e51542cedd81c0602766797670ef0d20a))
* specifiy accessible menu's lack of aria-current control ([7e59ca4](https://github.com/NickDJM/accessible-menu/commit/7e59ca40a33f6e32914cc5532bb82690addcedef))
* update changelog and contrib links ([676158f](https://github.com/NickDJM/accessible-menu/commit/676158fcaa65758b4b5eeff4f112ee3d85896f51))
* update contribution information ([5c694e9](https://github.com/NickDJM/accessible-menu/commit/5c694e92c8929b9fbe90eee551aa89f5c680d734))
* update focus/blur behavior in upgrade guide ([20389a3](https://github.com/NickDJM/accessible-menu/commit/20389a3d0bdb8e560116cdf25a06a86adeb912b7))
* update with notes ([97d10ee](https://github.com/NickDJM/accessible-menu/commit/97d10ee81b824c5a78074372b56da0785dd43cbe))

### Build System

* add lockfile for more consistent testing ([9e3e66d](https://github.com/NickDJM/accessible-menu/commit/9e3e66d534c03f3aa11beb41423ddaa82afcd0cc))
* **docker:** update node version to match workflows ([82cddad](https://github.com/NickDJM/accessible-menu/commit/82cddada9e91a9fe47f4d250791039828fbedc1f))
* **npm:** simplify exports ([f94620a](https://github.com/NickDJM/accessible-menu/commit/f94620ae6965cc53e9b5e9b8c5082efbb0cc2c9b))
* **npm:** update accessible ecosystem ([635a675](https://github.com/NickDJM/accessible-menu/commit/635a675d2f29143b0e7ead15c7bc75d414ff8cf0))
* **npm:** update dependencies ([fb7ce94](https://github.com/NickDJM/accessible-menu/commit/fb7ce943e3ad2dc3a0d4c11319c1d73b4c0ab2b1))
* **npm:** update dependencies ([3d587ca](https://github.com/NickDJM/accessible-menu/commit/3d587ca17b03f8989dc3ffea940f460f8c81577e))
* replace pure vite build with rolldown ([7d57ca7](https://github.com/NickDJM/accessible-menu/commit/7d57ca74a587b0ed2187c59358d3fb8c5a0d965e))
* **vite:** clear out dist on build ([e66ceb9](https://github.com/NickDJM/accessible-menu/commit/e66ceb9d7799ca1d39006912f69de097e23d4984))

### Continuous Integration

* **pages:** only build on default branch ([1aa78bb](https://github.com/NickDJM/accessible-menu/commit/1aa78bba920ced332148bac07a4a67d160937b78))
* update workflows to use latest actions ([98b484e](https://github.com/NickDJM/accessible-menu/commit/98b484eb75b7490138614e394173d93ac329dff2))
