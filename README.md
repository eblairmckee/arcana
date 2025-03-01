# arcana monorepo

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on how to contribute to this project.

## how this repo is structured

<!-- markdown table with 2 columns -->

| directory                         | what it does                                                                                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components` | presentational UI components (atoms) built with [tailwindcss](https://tailwindcss.com/) (styling) and [radix-ui](https://www.radix-ui.com/primitives/docs/overview/getting-started) a headless ui library |
| `apps/storybook`                  | documentation for `@theblairwitch/arcana-ui` and dev environment using [storybookjs](https://storybook.js.org/docs)                                                                                                        |
| `apps/storybook/src/examples`     | common component compositions                                                                                                                                                                             |
| `packages/icons`                  | Package that converts svg assets into react components that are used in Icon component in `@theblairwitch/arcana-ui`                                                                                               |
