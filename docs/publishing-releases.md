# Publishing Releases

This document describes the process of publishing a new release of this action.

## Versioning

For versioning, we are following the [recommended versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) available in GitHub's [actions/toolkit](https://github.com/actions/toolkit) repository.

## Automated Release

_TBD_

## Manual Release

Perform the following steps to create a manual release:

1. Make sure all desired changes have been pushed to the `main` branch.
2. Create a `release/*` branch off of `main` (e.g. `release/v1.0.1`).
3. Update the `version` in `package.json` to the desired version.
4. Create a pull request from the `release/*` branch to `main`.
5. Once the pull request is merged, create a new release targeted on `main` in the GitHub UI. Make sure to set it to create the corresponding tag on publish (e.g. `v1.0.1`) and keep the "Publish this Action to the GitHub Marketplace" option checked.
6. Once the release has been published on GitHub, switch back to the `main` branch and pull down any changes.
7. Update the major version tag to point the latest release, which should look something like the following (replacing "v1" if necessary):

```Shell
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```
