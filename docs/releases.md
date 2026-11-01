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

This command uses [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) to read your commits and decide what kind of release will be created. It updates CHANGELOG.md and creates a release commit and version tag. The latest changelog entry is also copied to CURRENT_RELEASE.md for the GitHub release notes. The release commit uses the message `chore(release): <version number>`.

A pre-release script will run `lint`, `build`, and `test:run` scripts to ensure all code meets the coding standards, all changes to the source code are captured in the bundled version, and all code continues to function as expected. If any of these scripts fail, a release will not be created.

Once the script has succeeded, you can run `git push --follow-tags origin` to have your release pushed up to the repository.

Pushing the version tag starts the release workflow. After the tests pass, it creates a GitHub release and publishes the package to npm. Prereleases use their prerelease label, such as `beta`, as the npm tag. Regular releases use the default `latest` tag.
