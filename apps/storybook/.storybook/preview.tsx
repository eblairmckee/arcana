import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

import "@ui/src/styles/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      disable: true,
      grid: {
        disable: true
      }
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark"
      },
      defaultTheme: "light"
    })
  ]
};

export default preview;
