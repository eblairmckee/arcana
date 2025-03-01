import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  minify: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
  loader: {
    ".svg": "file"
  },
  esbuildOptions(options, context) {
    options.target = "es2020";

    if (context.format === "cjs") {
      options.platform = "node";
    } else {
      options.platform = "neutral";
    }
  }
});
