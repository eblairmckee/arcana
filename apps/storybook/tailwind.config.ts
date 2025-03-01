import { tailwindConfig } from "@theblairwitch/arcana-ui";
import type { Config } from "tailwindcss";

export default {
  presets: [tailwindConfig],
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"]
} satisfies Config;
