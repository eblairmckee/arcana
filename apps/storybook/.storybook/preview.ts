import "@blairwitch/arcana-ui/styles/styles.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";
import "../src/index.css";

const CUSTOM_VIEWPORTS = {
  desktop: {
    name: "UltraWideDesktop",
    styles: {
      width: "1440px",
      height: "800px"
    }
  },
  mediumDesktop: {
    name: "MediumDesktop",
    styles: {
      width: "1297px",
      height: "800px"
    }
  },
  smallDesktop: {
    name: "SmallDesktop",
    styles: {
      width: "998px",
      height: "800px"
    }
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "834px",
      height: "1024px"
    }
  },
  ...INITIAL_VIEWPORTS
};

const preview: Preview = {
  parameters: {
    layout: "padded",
    viewport: {
      viewports: CUSTOM_VIEWPORTS,
      defaultViewport: "SmallDesktop"
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    reactOptions: {
      strictMode: true
    },
    backgrounds: {
      disable: true,
      grid: {
        disable: true
      }
    }
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark"
      },
      defaultTheme: "auto",
      attributeName: "data-color-scheme"
    })
  ]
};

export default preview;
