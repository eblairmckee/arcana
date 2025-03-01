import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "",
  plugins: [react()],
  assetsInclude: ["**/*.png"],
  resolve: {
    alias: [
      {
        find: "ui",
        replacement: resolve(__dirname, "../../packages/ui/src")
      }
    ]
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});
