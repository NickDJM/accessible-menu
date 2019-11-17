# accessible-menu

A JavaScript library to help you generate WAI-ARIA accessible menus in the DOM.

## Committing

This project uses the conventional commit standard, which means your commits should follow a basic template of:

    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]

For more detailed information about available types, scopes, breaking changes, etc. please see the [official documentation](https://www.conventionalcommits.org/en/v1.0.0/).

This project also provides a command to assist you in formatting  commit messages using [commitizen](https://commitizen.github.io/cz-cli/):

```
npm run commit
```

## Versioning

This project uses Semantic Versioning 2.0.0 to keep track of releases.

    Given a version number MAJOR.MINOR.PATCH, increment the:

    1. MAJOR version when you make incompatible API changes,
    2. MINOR version when you add functionality in a backward compatible manner, and
    3. PATCH version when you make backwards compatible bug fixes.

    Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

When making a release, you should use the provided command:

```
npm run release
```

This command uses [standard-version](https://github.com/conventional-changelog/standard-version) to parse through your commits, decide what kind of release will be created, and automatically generates a CHANGELOG.md file for your project. These changes are then commited using the message `chore(release): <version number>`.

Once that is done, you can simply run `git push --follow-tags origin` to have your release pushed up to the repository.

## Coding standards

This project follows a set of coding standards combining [StandardJS](https://standardjs.com/), [Prettier](https://prettier.io/), and [JSDoc](https://jsdoc.app/).

To check your code, you can use [ESLint](https://eslint.org/) with the provided script:

```
npm run lint
```

You can also fix some violations automatically using:

```
npm run fix
```
