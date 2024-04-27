# Last Successful Commit Hash Action

[![GitHub Super-Linter](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/linter.yml/badge.svg)](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/linter.yml)
[![CI](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/ci.yml/badge.svg)](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/ci.yml)
![coverage badge](./badges/coverage.svg)

This action returns the commit hash of the last successful run for the given
workflow and branch.

## Inputs

### `github-token`

**Required** The GitHub token (e.g. `${{ github.token }}` or
`${{ secrets.GITHUB_TOKEN }}` to use the built-in values).

### `workflow-id`

**Required** The workflow ID or workflow filename (e.g `test.yml`) to determine
the last successful run from.

### `branch`

**Required** The branch to use for determining the last successful run.

### `debug`

**Optional** Whether to enable debug logging (alternative to setting
`ACTIONS_STEP_DEBUG` to
[enable debug logging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging#enabling-step-debug-logging)).
Default: `false`.

## Outputs

### `commit-hash`

The commit hash of the last successful run for the given workflow and branch.

## Example usage

See the following for an example of how to use this action to get the last
successful commit hash and then use it in a subsequent step within a job:

<!-- prettier-ignore-start -->
```yaml
steps:
  - name: Get last successful commit
    id: last-successful-commit
    uses: tylermilner/last-successful-commit-hash-action@v1
    with:
      workflow-id: ci.yml
      branch: main
  - name: Use last successful commit
    run:
      echo "The last successful commit was ${{steps.last-successful-commit.outputs.commit-hash }}"
```
<!-- prettier-ignore-end -->

This produces the following output:

```console
The last successful commit was a96d433b7e953bd8199eaf261b1dbd618ac05240
```

If no successful workflow runs are found, the action will fail.

## Why?

As part of the CI pipeline for one of my projects, I wanted to generate a list
of commit messages since the last successful workflow run. In order to do this,
I needed a way to determine the last successful run of a workflow, which is only
possible by using the GitHub API.

Since I typically like to minimize my reliance on external dependencies, I
initially created this action as a local action in the project repository that
needed it. When it came time to implement a similar workflow in another project,
I decided to move this action to its own public repo for reusability.

Creating this action also gave me a chance to practice implementing, testing,
and publishing a JavaScript-based GitHub Action. It was definitely a bit more
work than I had initially anticipated, but I had fun learning the process and am
happy with the result.

When I initially created the local version of this action, I don't recall there
being many other actions that provided this functionality. Since then, it does
seem like there are some alternatives that are worth considering, such as:

- [nrwl/last-successful-commit-action](https://github.com/nrwl/last-successful-commit-action)
  (now deprecated in favor of
  [nx-set-shas](https://github.com/nrwl/nx-set-shas))
- [PatrikValkovic/last-successful-commit-action](https://github.com/PatrikValkovic/last-successful-commit-action)
  (fork of the original `nrwl/last-successful-commit-action`)
- [jmoll-hn/last-green-commit-action](https://github.com/jmoll-hn/last-green-commit-action)
- [dharun-sahaj/last-successful-commit](https://github.com/dharun-sahaj/last-successful-commit)
- [nickderobertis/last-successful-commit-action](https://github.com/nickderobertis/last-successful-commit-action)

## Contributing

See [Contributing](CONTRIBUTING.md) for more information about how this action
is setup and how to contribute.

## License

[MIT](LICENSE)
