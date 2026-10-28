# Commit guidelines

Write commit messages using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). For example:

```text
fix: cancel pending callbacks when disposing a component
```

The format is:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

See the specification for commit types, optional scopes, and how to describe breaking changes.

You can use [Commitizen](https://commitizen.github.io/cz-cli/) to write a commit message through guided prompts:

```shell
npm run commit
```

Read the [contribution guidelines](CONTRIBUTING.md) for the full submission process.

## Attribution

This document is based on [Accessible Ecosystem Core](https://github.com/Accessible-Ecosystem/core), adapted from its [corresponding document](https://github.com/Accessible-Ecosystem/core/blob/1.x/.github/COMMIT_CONVENTION.md).
