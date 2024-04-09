# Last Successful Commit Hash Action

[![GitHub Super-Linter](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/linter.yml/badge.svg)](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/linter.yml)
[![CI](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/ci.yml/badge.svg)](https://github.com/tylermilner/last-successful-commit-hash-action/actions/workflows/ci.yml)

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

**Optional** Whether to enable debug logging. Default: `false`.

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
    id: last_successful_commit
    uses: tylermilner/last-successful-commit-hash-action@v1
    with:
      github-token: ${{ github.token }}
      workflow-id: ci.yml
      branch: main
  - name: Use last successful commit
    run:
      echo "The last successful commit was ${{steps.last_successful_commit.outputs.commit-hash }}"
```
<!-- prettier-ignore-end -->

This produces the following output:

```console
The last successful commit was a96d433b7e953bd8199eaf261b1dbd618ac05240
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more information about how this action
is setup and how to contribute.

## License

[MIT](LICENSE)
