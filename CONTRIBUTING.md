# Contributing

[fork]: https://github.com/tylermilner/last-successful-commit-hash-action/fork
[pr]: https://github.com/tylermilner/last-successful-commit-hash-action/compare
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your
help is essential for keeping it great.

Contributions to this project are
[released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license)
to the public under the [project's open source license](LICENSE).

Please note that this project is released with a
[Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this
project you agree to abide by its terms.

## Source Code Overview

This project was generated from the
[default GitHub Actions `javascript-action` template](https://github.com/actions/javascript-action).

The following files make up this action:

- `action.yml` - action metadata.
- `src/index.js` - main action entry point. Calls `main.js` to run the action.
- `src/main.js` - main action logic. Changes to the action's functionality
  should be made here.
- `package.json` / `package-lock.json` - defines the JavaScript dependencies
  that the action needs to run.
- `dist/*` - the compiled version of the action with all of its dependencies.
  These files are automatically generated and should **NOT** be modified
  directly.

## Making Code Changes

First, `cd` into the action folder and install the project dependencies via
[npm](https://www.npmjs.com):

```Shell
npm install
```

In order to avoid the need to check in the `node_modules` folder, this action
utilizes [@vercel/ncc](https://github.com/vercel/ncc) to compile the action code
and its dependencies into a single JavaScript file that can be used for
distribution.

⚠️ **Important!** - After making code changes to this action, you will need to
recompile the action before committing your changes:

```Shell
npm run all
```

This will run all of the formatters, tests, and compile the action into the
`dist` folder. Make sure to include any updated files in your commit.

## Submitting a pull request

1. [Fork][fork] and clone the repository
2. Configure and install the dependencies: `npm i`
3. Make sure the tests pass on your machine: `npm test`
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your change, add tests, and make sure the tests still pass
6. Do one final check to ensure all tests, linter, and compilation steps pass:
   `npm run all`
7. Push to your fork and [submit a pull request][pr]
8. Pat your self on the back and wait for your pull request to be reviewed and
   merged.

Here are a few things you can do that will increase the likelihood of your pull
request being accepted:

- Follow the style guide style by running the linter `npm run lint`.
- Write tests.
- Keep your change as focused as possible. If there are multiple changes you
  would like to make that are not dependent upon each other, consider submitting
  them as separate pull requests.
- Write a
  [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Creating a Release

When it comes time to create a new release, repository maintainers should follow
the steps below to create and publish a new release.

### Versioning

For versioning, we are following the
[recommended versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
available in GitHub's [actions/toolkit](https://github.com/actions/toolkit)
repository.

### Automated Release

_TBD_

### Manual Release

Perform the following steps to create a manual release:

1. Make sure all desired changes have been pushed to the `main` branch.
2. Create a `release/*` branch off of `main` (e.g. `release/v1.0.1`).
3. Update the `version` in `package.json` to the desired version.
4. Create a pull request from the `release/*` branch to `main`.
5. Once the pull request is merged, create a new release targeted on `main` in
   the GitHub UI. Make sure to set it to create the corresponding tag on publish
   (e.g. `v1.0.1`) and keep the "Publish this Action to the GitHub Marketplace"
   option checked.
6. Once the release has been published on GitHub, switch back to the `main`
   branch and pull down any changes.
7. Update the major version tag to point the latest release, which should look
   something like the following (replacing "v1" if publishing a different major
   version tag):

```Shell
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
- [Creating a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [Action Versioning](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md)
- [Releasing and maintaining actions](https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions)
- [`javascript-action` template repository](https://github.com/actions/javascript-action)
- [`javascript-action` example](https://github.com/github-developer/javascript-action)
