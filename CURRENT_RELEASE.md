## [5.0.0-beta.0](https://github.com/NickDJM/accessible-menu/compare/v4.4.0...v5.0.0-beta.0) (2026-01-13)


### ⚠ BREAKING CHANGES

* **options:** all customized selector options will need to be updated to reflect new plural naming convension

### Features

* add ability to auto open and close menus based on screen size ([407a479](https://github.com/NickDJM/accessible-menu/commit/407a479d53a502e81461fc3d4ae7c411047ac568)), closes [#482](https://github.com/NickDJM/accessible-menu/issues/482)
* add dispose method ([d1a2cb7](https://github.com/NickDJM/accessible-menu/commit/d1a2cb7e7750db1ede6b7eabd3e8c56162d774f0)), closes [#479](https://github.com/NickDJM/accessible-menu/issues/479)
* add the ability to track multiple timeouts throughout menus ([68b37ef](https://github.com/NickDJM/accessible-menu/commit/68b37efb724bb56387e170506f8e3a1b128a6083)), closes [#476](https://github.com/NickDJM/accessible-menu/issues/476)
* **fields:** merge classes into single object ([d61ba55](https://github.com/NickDJM/accessible-menu/commit/d61ba551e9632cdfbbd6208d031e5285e98ffe04)), closes [#472](https://github.com/NickDJM/accessible-menu/issues/472)
* **fields:** merge classes into single object ([17b0275](https://github.com/NickDJM/accessible-menu/commit/17b0275fe8bf2dd7ee01b50f46e3278a9fd654e4)), closes [#472](https://github.com/NickDJM/accessible-menu/issues/472)
* **fields:** merge durations and delays into single object ([16b46d0](https://github.com/NickDJM/accessible-menu/commit/16b46d0b1e47d5729459611cf9d1f3ee784c4d1e)), closes [#473](https://github.com/NickDJM/accessible-menu/issues/473)
* **fields:** merge durations and delays into single object ([f17d8d5](https://github.com/NickDJM/accessible-menu/commit/f17d8d5f098031c029c3e37d4cbce49aafe7a99d)), closes [#473](https://github.com/NickDJM/accessible-menu/issues/473)
* **fields:** merge menu toggle custom events into single field ([87fb388](https://github.com/NickDJM/accessible-menu/commit/87fb388dcc795f3dbb3358648fcf761429797b70)), closes [#477](https://github.com/NickDJM/accessible-menu/issues/477)
* imlement updated validation methods and functionality ([50dd8ac](https://github.com/NickDJM/accessible-menu/commit/50dd8acc5305cef1c35efed27f4055b51ccd256a)), closes [#481](https://github.com/NickDJM/accessible-menu/issues/481)
* implement storage system overhaul ([0afc38f](https://github.com/NickDJM/accessible-menu/commit/0afc38ffd931b774f162ad97cb5f52ef1227d934)), closes [#478](https://github.com/NickDJM/accessible-menu/issues/478)
* track all event listeners within the menu ([7af1cec](https://github.com/NickDJM/accessible-menu/commit/7af1cecf09e46e72d728a6bc669dfd6a1b66d0c3)), closes [#475](https://github.com/NickDJM/accessible-menu/issues/475)
* update dom setup methods ([88a33a2](https://github.com/NickDJM/accessible-menu/commit/88a33a2ff7c420368e7dcb7472e00343086b7a74)), closes [#480](https://github.com/NickDJM/accessible-menu/issues/480)


### Documentation

* add missing getter docs for classes and durations ([2f50560](https://github.com/NickDJM/accessible-menu/commit/2f50560c37c090bc662bcd92225915d56292afff))
* add upgrade guide info about timeouts ([424e4b2](https://github.com/NickDJM/accessible-menu/commit/424e4b29d91e94b17ffa391410b396ea5536a4da))
* correct information about two-level menus in quickstart ([c46d971](https://github.com/NickDJM/accessible-menu/commit/c46d971008f338987d36873b7f56f3e446775eff)), closes [#498](https://github.com/NickDJM/accessible-menu/issues/498)
* correct type of _errors ([e3538ca](https://github.com/NickDJM/accessible-menu/commit/e3538caeb775995aeb7eb28aabd7f50324143180))
* document new id and add storage changes to upgrade guide ([9655c0e](https://github.com/NickDJM/accessible-menu/commit/9655c0ea569fceff03634d2ba9b5e79fd20d47d1))
* fix documentation for global storage to reflect new StorageManager ([2a568c3](https://github.com/NickDJM/accessible-menu/commit/2a568c32ecff34b1e34b7d39fb536b2972f7d611))
* update information about option and validation changes ([7323567](https://github.com/NickDJM/accessible-menu/commit/7323567933f3f042ab5d7b930650e8276824353e))
* **upgrade guide:** update guide to account for v5 ([73523b8](https://github.com/NickDJM/accessible-menu/commit/73523b8eb2240b2a623d17136431a57337f9313f))
* **upgrade guide:** update guide to account for v5 ([f2e260d](https://github.com/NickDJM/accessible-menu/commit/f2e260dc2e0789d7ce13b4d9eaff33126ebfc6ce))


### Code Refactoring

* **options:** change all selector option names to be plural ([6ca2185](https://github.com/NickDJM/accessible-menu/commit/6ca2185e58c2eac1e0f7371eca789af42ab1d1e6)), closes [#481](https://github.com/NickDJM/accessible-menu/issues/481)
* rename accessible menu storage to avoid import conflicts ([149feb8](https://github.com/NickDJM/accessible-menu/commit/149feb8ff2b94302597302a66cd430a48fb100b4))


### Continuous Integration

* add dispatch and call triggers to test action ([c228db2](https://github.com/NickDJM/accessible-menu/commit/c228db2699d8deb9ceba9b8076af2b8bd288fe6a))
