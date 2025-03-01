import type { Colors, Typography } from "../types/tailwind";

// Generate safelist patterns for all color utilities so you can use any theme color variable in your code
export const generateSafelist = (colors: Colors, typography: Typography) => {
  const colorNames = Object.keys(colors) as (keyof Colors)[];
  const utilities = ["bg", "text", "border", "ring", "divide", "outline"];
  const variants = ["hover:", "focus:", "active:", "disabled:"];
  const breakpoints = ["sm", "md", "lg", "xl", "2xl"];
  const sizes = ["24", "42", "48", "64", "72"]; // Add all the sizes you need

  const safelist: (string | { pattern: RegExp; variants: string[] })[] = [];

  colorNames.forEach((colorName) => {
    if (typeof colors[colorName] === "object") {
      // Handle nested color objects (with number keys)
      Object.keys(colors[colorName]).forEach((shade) => {
        utilities.forEach((utility) => {
          // Base utility
          safelist.push(`${utility}-${colorName}-${shade}`);

          // Variant utilities
          variants.forEach((variant) => {
            safelist.push(`${variant}${utility}-${colorName}-${shade}`);
          });
        });
      });
    } else {
      // Handle direct color values
      utilities.forEach((utility) => {
        safelist.push(`${utility}-${colorName}`);

        variants.forEach((variant) => {
          safelist.push(`${variant}${utility}-${colorName}`);
        });
      });
    }
  });

  // Generate typography classes
  Object.entries(typography).forEach(([family, sizes]) => {
    Object.keys(sizes).forEach((size) => {
      // Base typography classes
      safelist.push(`text-${family}-${size}`);

      // Add variants
      variants.forEach((variant) => {
        safelist.push(`${variant}text-${family}-${size}`);
      });
    });
  });

  const typographyClasses = Object.entries(typography).flatMap(
    ([category, sizes]) =>
      Object.keys(sizes).map((size) => `text-${category}-${size}`)
  );

  // Generate responsive variants
  const responsiveTypographyClasses = typographyClasses.flatMap((className) =>
    breakpoints.map((breakpoint) => `${breakpoint}:${className}`)
  );

  // Generate size classes with responsive variants
  const sizeClasses = sizes.flatMap((size) => [
    `h-[${size}px]`,
    `w-[${size}px]`,
    ...breakpoints.flatMap((bp) => [
      `${bp}:h-[${size}px]`,
      `${bp}:w-[${size}px]`
    ])
  ]);

  return [...typographyClasses, ...responsiveTypographyClasses, ...sizeClasses];
};

export const focusRingStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100";
export const focusRingWithinStyles =
  "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-100";
export const focusRingStylesCoerced = "ring-2 ring-primary-100";
