import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

import type { Colors, Typography } from "./src/types/tailwind";
import { generateSafelist } from "./src/utils/tailwind";

const colors: Colors = {
  background: {
    0: "var(--color-background-0)",
    50: "var(--color-background-50)",
    100: "var(--color-background-100)"
  },
  primary: {
    50: "var(--color-primary-50)",
    100: "var(--color-primary-100)",
    DEFAULT: "var(--color-primary)"
  },
  secondary: {
    50: "var(--color-secondary-50)",
    100: "var(--color-secondary-100)",
    200: "var(--color-secondary-200)",
    300: "var(--color-secondary-300)",
    400: "var(--color-secondary-400)",
    500: "var(--color-secondary-500)",
    600: "var(--color-secondary-600)",
    DEFAULT: "var(--color-secondary)"
  },
  tertiary: {
    5: "var(--color-tertiary-5)",
    10: "var(--color-tertiary-10)",
    15: "var(--color-tertiary-15)",
    20: "var(--color-tertiary-20)",
    25: "var(--color-tertiary-25)",
    30: "var(--color-tertiary-30)"
  },
  stroke: {
    DEFAULT: "var(--color-stroke)"
  },
  // Base colors
  white: "var(--color-white)",
  "primary-blue": "var(--color-primary-blue)",
  disabled: "var(--color-disabled)",
  danger: "var(--color-danger)",
  overlay: "var(--color-overlay)",
  sidebarOverlay: "var(--color-sidebar-overlay)",
  border: "var(--color-border)"
};

const typography: Typography = {
  heading: {
    xl: {
      fontSize: "var(--font-heading-xl-size)",
      letterSpacing: "var(--font-heading-xl-spacing)",
      fontWeight: "var(--font-heading-xl-weight)"
    },
    lg: {
      fontSize: "var(--font-heading-lg-size)",
      letterSpacing: "var(--font-heading-lg-spacing)",
      fontWeight: "var(--font-heading-lg-weight)"
    },
    md: {
      fontSize: "var(--font-heading-md-size)",
      letterSpacing: "var(--font-heading-md-spacing)",
      fontWeight: "var(--font-heading-md-weight)"
    },
    sm: {
      fontSize: "var(--font-heading-sm-size)",
      letterSpacing: "var(--font-heading-sm-spacing)",
      fontWeight: "var(--font-heading-sm-weight)"
    },
    xs: {
      fontSize: "var(--font-heading-xs-size)",
      letterSpacing: "var(--font-heading-xs-spacing)",
      fontWeight: "var(--font-heading-xs-weight)"
    }
  },
  body: {
    lg: {
      fontSize: "var(--font-body-lg-size)",
      letterSpacing: "var(--font-body-lg-spacing)",
      fontWeight: "var(--font-body-lg-weight)",
      lineHeight: "var(--font-body-lg-line-height)"
    },
    "lg-semibold": {
      fontSize: "var(--font-body-lg-semibold-size)",
      letterSpacing: "var(--font-body-lg-semibold-spacing)",
      fontWeight: "var(--font-body-lg-semibold-weight)",
      lineHeight: "var(--font-body-lg-semibold-line-height)"
    },
    md: {
      fontSize: "var(--font-body-md-size)",
      letterSpacing: "var(--font-body-md-spacing)",
      fontWeight: "var(--font-body-md-weight)"
    },
    default: {
      fontSize: "var(--font-body-default-size)",
      letterSpacing: "var(--font-body-default-spacing)",
      fontWeight: "var(--font-body-default-weight)",
      lineHeight: "var(--font-body-default-line-height)"
    },
    "default-medium": {
      fontSize: "var(--font-body-default-medium-size)",
      letterSpacing: "var(--font-body-default-medium-spacing)",
      fontWeight: "var(--font-body-default-medium-weight)"
    },
    "default-semibold": {
      fontSize: "var(--font-body-default-semibold-size)",
      letterSpacing: "var(--font-body-default-semibold-spacing)",
      fontWeight: "var(--font-body-default-semibold-weight)"
    },
    "default-bold": {
      fontSize: "var(--font-body-default-bold-size)",
      letterSpacing: "var(--font-body-default-bold-spacing)",
      fontWeight: "var(--font-body-default-bold-weight)"
    },
    xs: {
      fontSize: "var(--font-body-xs-size)",
      letterSpacing: "var(--font-body-xs-spacing)",
      fontWeight: "var(--font-body-xs-weight)"
    },
    "xs-medium": {
      fontSize: "var(--font-body-xs-medium-size)",
      letterSpacing: "var(--font-body-xs-medium-spacing)",
      fontWeight: "var(--font-body-xs-medium-weight)"
    },
    "xs-bold": {
      fontSize: "var(--font-body-xs-bold-size)",
      letterSpacing: "var(--font-body-xs-bold-spacing)",
      fontWeight: "var(--font-body-xs-bold-weight)"
    },
    xxs: {
      fontSize: "var(--font-body-xxs-size)",
      letterSpacing: "var(--font-body-xxs-spacing)",
      fontWeight: "var(--font-body-xxs-weight)"
    },
    "xxs-medium": {
      fontSize: "var(--font-body-xxs-medium-size)",
      letterSpacing: "var(--font-body-xxs-medium-spacing)",
      fontWeight: "var(--font-body-xxs-medium-weight)"
    },
    "xxs-semibold": {
      fontSize: "var(--font-body-xxs-semibold-size)",
      letterSpacing: "var(--font-body-xxs-semibold-spacing)",
      fontWeight: "var(--font-body-xxs-semibold-weight)"
    },
    "xxs-bold": {
      fontSize: "var(--font-body-xxs-bold-size)",
      letterSpacing: "var(--font-body-xxs-bold-spacing)",
      fontWeight: "var(--font-body-xxs-bold-weight)"
    }
  },
  label: {
    default: {
      fontSize: "var(--font-label-default-size)",
      lineHeight: "var(--font-label-default-line-height)",
      letterSpacing: "var(--font-label-default-spacing)",
      fontWeight: "var(--font-label-default-weight)",
      textTransform: "uppercase"
    }
  }
};

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontSize: {
        // Convert typography config to Tailwind's fontSize format
        ...Object.entries(typography).reduce(
          (acc, [family, sizes]) => {
            Object.entries(sizes).forEach(([size, typeConfig]) => {
              acc[`${family}-${size}`] = [
                typeConfig.fontSize,
                {
                  lineHeight: typeConfig.lineHeight || "normal",
                  letterSpacing: typeConfig.letterSpacing || "normal",
                  fontWeight: typeConfig.fontWeight
                }
              ];
            });
            return acc;
          },
          {} as Record<string, [string, object]>
        )
      },
      fontFamily: {
        sans: ["Gilroy", "sans-serif"]
      },
      fontWeight: {
        light: "400",
        regular: "500",
        normal: "500",
        semibold: "600",
        bold: "700"
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        "overlay-show": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "overlay-hide": {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" }
        }
      },
      animation: {
        spin: "spin 1s linear infinite",
        "slide-in-from-right":
          "slide-in-from-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-right": "slide-out-to-right 0.2s ease-out",
        "slide-in-from-left":
          "slide-in-from-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-left": "slide-out-to-left 0.2s ease-out",
        "fade-in": "fade-in 200ms ease-out",
        "fade-out": "fade-out 150ms ease-in",
        "overlay-show": "overlay-show 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "overlay-hide": "overlay-hide 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      borderWidth: {
        "3": "3px"
      },
      ringWidth: {
        DEFAULT: "2px"
      },
      ringOffsetWidth: {
        DEFAULT: "0px"
      },
      ringColor: {
        DEFAULT: colors.primary[100]
      }
    }
  },
  plugins: [tailwindAnimate],
  safelist: [
    ...generateSafelist(colors, typography),
    // Add text color classes explicitly
    "text-primary",
    "text-secondary",
    "text-white",
    "text-primary-blue",
    "text-disabled",
    "text-danger",
    "text-inherit"
  ]
} satisfies Config;

export default config;
