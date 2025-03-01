/* eslint-disable no-console */
import { execSync } from "child_process";
import { readdir, writeFile } from "fs/promises";
import { join } from "path";

async function formatGeneratedFile(filePath: string) {
  try {
    console.log("\n🎨 Formatting generated index file...");

    execSync(`bun prettier --write ${filePath}`, {
      stdio: "inherit"
    });
    console.log("✓ Prettier formatting complete");

    execSync(`bun eslint --fix ${filePath}`, {
      stdio: "inherit"
    });
    console.log("✓ ESLint fixes complete");
  } catch (error) {
    console.error("⚠️  Error formatting file:", error);
  }
}

async function generateIndex() {
  const componentsDir = join(__dirname, "../src/components");
  const indexPath = join(__dirname, "../src/index.ts");

  // Read all files in components directory
  const files = await readdir(componentsDir);
  const componentFiles = files.filter(
    (file) =>
      file.endsWith(".tsx") &&
      !file.includes(".test.") &&
      !file.includes(".stories.")
  );

  // Generate imports and exports
  const imports = componentFiles
    .map((file) => {
      const componentName = file.replace(".tsx", "");
      return `import { ${componentName} } from "./components/${file.replace(".tsx", "")}";
import type { ${componentName}Props } from "./components/${file.replace(".tsx", "")}";`;
    })
    .join("\n");

  const exports = `\nexport {\n  ${componentFiles
    .map((file) => {
      const componentName = file.replace(".tsx", "");
      return `${componentName},\n  type ${componentName}Props`;
    })
    .join(",\n  ")}\n};`;

  const content = `// Auto-generated index file
${imports}
${exports}
export { default as tailwindConfig } from "../tailwind.config";
export * from "./hooks";
`;

  // Write the index.ts file
  await writeFile(indexPath, content);
  console.log("✓ Generated index.ts");

  // Format the generated file
  await formatGeneratedFile(indexPath);

  console.log("\n✨ Index generation complete!");
}

generateIndex().catch(console.error);
