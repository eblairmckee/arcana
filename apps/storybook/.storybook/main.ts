import { resolve } from "path";

import type { StorybookConfig } from "@storybook/react-vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-viewport",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [tailwindcss, autoprefixer]
        }
      },
      resolve: {
        preserveSymlinks: true,
        dedupe: ["react", "react-dom"],
        alias: [
          {
            find: "@theblairwitch/arcana-ui",
            replacement: resolve(__dirname, "../../../packages/ui/src")
          },
          {
            find: "@theblairwitch/arcana-icons",
            replacement: resolve(__dirname, "../../../packages/icons/src")
          }
        ]
      },
      optimizeDeps: {
        include: ["react", "react-dom"],
        exclude: ["@theblairwitch/arcana-ui", "@theblairwitch/arcana-icons"],
        force: true,
        entries: ["../../packages/*/src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"]
      },
      server: {
        watch: {
          ignored: ["!**/node_modules/@theblairwitch/**"]
        }
      }
    });
  }
};

export default config;
