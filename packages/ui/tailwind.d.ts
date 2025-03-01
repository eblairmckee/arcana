import type tailwindConfig from "./tailwind.config";

type Theme = (typeof tailwindConfig.theme)["extend"];

declare module "tailwindcss/types/generated/default-theme" {
  export interface DefaultTheme extends Theme {}
}
