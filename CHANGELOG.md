# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Set default value for `github-token` input so that it doesn't need to be set
  manually.
  ([#28](https://github.com/tylermilner/last-successful-commit-hash-action/pull/28))

## [1.0.3] - 2024-04-13

### Fixed

- Fixed debug logging.
  ([#25](https://github.com/tylermilner/last-successful-commit-hash-action/pull/25))

## [1.0.2] - 2024-04-10

### Added

- Added unit tests.
  ([#20](https://github.com/tylermilner/last-successful-commit-hash-action/pull/20))

### Changed

- Improved debug logging. Use GHA built-in debug logging rather than
  `console.log()`.
  ([#21](https://github.com/tylermilner/last-successful-commit-hash-action/pull/21))
- Bump `@actions/github` from 5.1.1 to 6.0.0.
  ([#14](https://github.com/tylermilner/last-successful-commit-hash-action/pull/14))
- Bump `eslint-plugin-jest` dependency from 27.9.0 to 28.2.0.
  ([#13](https://github.com/tylermilner/last-successful-commit-hash-action/pull/13))

## [1.0.1] - 2024-04-08

### Added

- Added comments for `main.js`.
  ([#16](https://github.com/tylermilner/last-successful-commit-hash-action/pull/16)).
- Added GitHub health community files.
  ([#12](https://github.com/tylermilner/last-successful-commit-hash-action/pull/12)).

### Fixed

- Fixed ESLint warnings.
  ([#15](https://github.com/tylermilner/last-successful-commit-hash-action/pull/15)).

## [1.0.0] - 2024-04-07

### Added

- Initial release.

[unreleased]:
  https://github.com/tylermilner/last-successful-commit-hash-action/compare/v1.0.3...HEAD
[1.0.3]:
  https://github.com/tylermilner/last-successful-commit-hash-action/compare/v1.0.2...v1.0.3
[1.0.2]:
  https://github.com/tylermilner/last-successful-commit-hash-action/compare/v1.0.1...v1.0.2
[1.0.1]:
  https://github.com/tylermilner/last-successful-commit-hash-action/compare/v1.0.0...v1.0.1
[1.0.0]:
  https://github.com/tylermilner/last-successful-commit-hash-action/releases/tag/v1.0.0

<!-- Allow duplicate sub-header names between each release header -->
<!-- https://github.com/markdownlint/markdownlint/issues/175 -->
<!-- markdownlint-configure-file
{
  "no-duplicate-heading": {
    "siblings_only": true
  }
}
-->
