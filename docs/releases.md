# Releases

This project uses Semantic Versioning 2.0.0 to keep track of releases.

    Given a version number MAJOR.MINOR.PATCH, increment the:

    1. MAJOR version when you make incompatible API changes,
    2. MINOR version when you add functionality in a backward compatible manner, and
    3. PATCH version when you make backwards compatible bug fixes.

    Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

For more detailed information about SemVer, please see the [official documentation](https://semver.org/).

## Making a release

When making a release use the provided command:

```bash
npm run release
```

This command uses [standard-version](https://github.com/conventional-changelog/standard-version) to parse through your commits, decide what kind of release will be created, and automatically generates a CHANGELOG.md file for your project. These changes are then commited using the message `chore(release): <version number>`.

A pre-release script will run  `lint`, `build`, and `test` scripts to ensure all code meets the coding standards, all changes to the source code are captured in the bundled version, and all code continues to function as expected. If any of theses scripts fail, a release will not be created.

Once the script has succeeded, you can run `git push --follow-tags origin` to have your release pushed up to the repository.

Standard-version will also tell you what command to run to publish to NPM- be that a regular release, alpha, beta, etc.
