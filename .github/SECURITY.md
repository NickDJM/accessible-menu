# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.x     | ✔                  |
| 2.x     | :x:                |
| 1.x     | :x:                |

## Reporting a Vulnerability

If you discover a vulnerability within this project, please [open an issue](https://github.com/NickDJM/accessible-menu/issues/new) and label it with the `security` tag. The issue board is checked at least 2-3 times a week, so you should expect a response to your issue within a few days.

If a PR is submitted along with the issue to resolve the vulnerability, you can expect it to be reviewed within the same time frame as issue responses. If a PR is not submitted, the time it takes to develop a fix will differ depending on the severity of the vulnerability.

## Vulnerabilities in dependencies

Given that accessible-menu does not have any production dependencies, any vulnerable dev dependencies will be updated when/if possible- though a new release of accessible-menu may not be pushed out right away.

A higher priority will be given to dev dependencies that are directly responsible for compiling the project:

- [babel](https://github.com/babel/babel),
- [rollup](https://github.com/rollup/rollup),
- [terser](https://github.com/terser/terser), and
- all related plugins

If a vulnerability is found and resolved within one of these dependencies, a new release will be made.
