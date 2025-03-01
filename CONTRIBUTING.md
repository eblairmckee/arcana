# Contributing to arcana

## Prerequisites

- [bun](https://bun.sh/docs/installation)
- [Node.js](https://nodejs.org/en/download/)

You'll also need to request secret keys from the project maintainers to publish packages to npm and deploy to Chromatic.

## Code Quality Tools

We use ESLint for linting and Prettier for code formatting. To ensure your code meets our standards:

1. Configure your editor:

   - Install ESLint and Prettier extensions for your editor
   - Enable "Format on Save" in your editor settings
   - Set Prettier as the default formatter

2. Run linting locally:

   ```bash
   bun run lint        # check for linting issues
   bun run lint:fix    # automatically fix linting issues
   ```

3. Run formatting:
   ```bash
   bun run format        # format all files
   bun run format:check  # check if files are formatted correctly
   ```

It's recommended to run these checks locally before creating a pull request, as they are required to pass in CI.

## how to get up and running

1. install dependencies (at root of repo)

```bash
bun install
```

If you don't have bun installed you can install it [here](https://bun.sh/docs/installation).

### storybook

if you just want to run the storybook app, you can do so (from the root of the repo) with:

```bash
bun run build:ui
bun run storybook
```

### development

for development you'll want to run

```bash
bun run dev
```

Sometimes when you run `bun run dev` for the first time or after running `bun run clean` you'll need to run `bun run build:packages` first, before running `bun run dev`.

## Publishing packages

Whenever you want to publish a change to npm, you'll first need to update the version of the package(s) and generate a changelog entry by running `bun run changeset` and follow the CLI instructions. You can then push your changes directly to main, which will automatically update changelogs and package versions in a pull request using the GitHub Actions `release` workflow. After merged, it will publish the packages to npm and deploy the storybook app to Chromatic.

Alternatively, you can run `bun run changeset version` and `bun run changeset publish` manually to publish the packages to npm and `bun run chromatic` to deploy the storybook app to Chromatic.

Note: changes will not be published unless you've generated changesets for your changes.

Packages are deployed to [npm](https://www.npmjs.com/settings/blairwitch/packages).

## Development

### Generating the index file

All components must be exported from the `index.ts` file in the `src` directory. The `generate:index` script will generate the `index.ts` file in the `src` directory. This script will read all the component files in the `src/components` directory and generate the `index.ts` file.

Every component must have:

1. a named export that matches the file name
2. a `type` export that matches the file name, suffixed with `Props`

### Adding icons

Icons are stored in the `packages/icons` directory. To add a new icon, add a new svg file to the `packages/icons/src/assets` directory. Then, run `bun run generate:icons` to generate the new icon component.
