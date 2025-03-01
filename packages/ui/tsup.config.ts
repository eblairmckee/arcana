import { exec } from "child_process";
import { promisify } from "util";

import { defineConfig } from "tsup";

const execAsync = promisify(exec);

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/styles/fonts.css",
    "src/styles/styles.css",
    "src/components/*.tsx"
  ],
  format: ["cjs", "esm"],
  dts: {
    resolve: true
  },
  splitting: false,
  minify: true,
  treeshake: {
    preset: "recommended",
    moduleSideEffects: false
  },
  sourcemap: true,
  external: ["react", "react-dom", "next", "next/font", "@deckai/icons"],
  injectStyle: false,
  loader: {
    ".ttf": "file",
    ".css": "css",
    ".svg": "dataurl"
  },
  esbuildOptions(options, context) {
    options.loader = {
      ".svg": "jsx",
      ".css": "css",
      ".ttf": "file"
    };
    options.assetNames = "fonts/[name]";
    options.target = "es2020";

    if (context.format === "cjs") {
      options.platform = "node";
    } else {
      options.platform = "neutral";
    }
  },
  async onSuccess() {
    try {
      const { stdout, stderr } = await execAsync(
        "tailwindcss -i ./src/styles/styles.css -o ./dist/styles/styles.css --minify"
      );
      if (stdout) console.info(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error("Error building CSS:", error);
    }
  }
});
