# Security policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 5.x     | Yes       |
| 4.x     | Yes       |
| 3.x     | No        |
| 2.x     | No        |
| 1.x     | No        |

## Report a vulnerability

To report a vulnerability in Accessible Menu, [open an issue](https://github.com/NickDJM/accessible-menu/issues/new) with the `security` label.

Maintainers check issues at least two or three times a week. You can expect a response within a few days.

If you submit a pull request with a fix, maintainers will review it within the same time frame. Otherwise, the time needed to develop a fix depends on the severity of the vulnerability.

## Vulnerabilities in dependencies

Accessible Menu uses `@accessible-ecosystem/core` as a production dependency. Report vulnerabilities in Core through the process above so maintainers can review their impact on Accessible Menu.

Maintainers will update vulnerable development dependencies when possible. Maintainers may not publish an Accessible Menu release immediately after these updates.

Maintainers prioritize vulnerabilities in tools that compile project code, including [Rolldown](https://github.com/rolldown/rolldown), [Vite](https://github.com/vitejs/vite) and its plugins. When a vulnerability in one of these dependencies is resolved, maintainers will publish a new Accessible Menu release.

## Attribution

This policy is based on [Accessible Ecosystem Core](https://github.com/Accessible-Ecosystem/core/blob/1.x/.github/SECURITY.md).
