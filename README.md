# Last Successful Commit Action

[![GitHub Super-Linter](https://github.com/tylermilner/last-successful-commit-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/tylermilner/last-successful-commit-action/actions/workflows/ci.yml/badge.svg)

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

<!-- prettier-ignore-start -->
```yaml
steps:
  - name: Get last successful commit
    id: last_successful_commit
    uses: tylermilner/last-successful-commit-action@v1
    with:
      github-token: ${{ github.token }}
      workflow-id: ci.yml
      branch: main
  - name: Use last successful commit
    run:
      echo "The last successful commit was ${{steps.last_successful_commit.outputs.commit-hash }}"
```
<!-- prettier-ignore-end -->

## Contributing

### Source Code Overview

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

### Making Code Changes

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

## License

[MIT](LICENSE)
