/* eslint-disable no-console */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { parse } from "node-html-parser";
import { format } from "prettier";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

const ASSETS_DIR = path.join(DIRNAME, "../src/assets/icons");
const TYPES_OUTPUT = path.join(DIRNAME, "../src/types/icon-names.ts");
const ICONMAP_OUTPUT = path.join(DIRNAME, "../src/utils/iconmap.ts");

// Add new constant for components directory
const COMPONENTS_DIR = path.join(DIRNAME, "../src/components");

// Ensure components directory exists
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

const convertSvgToJsx = async (svgContent: string): Promise<string> => {
  // Remove XML declaration and doctype
  svgContent = svgContent.replace(/<\?xml.*?\?>/g, "");
  svgContent = svgContent.replace(/<!DOCTYPE.*?>/g, "");

  const root = parse(svgContent);
  const svg = root.querySelector("svg");

  if (!svg) {
    throw new Error("No SVG element found");
  }

  // Get the original viewBox or default to "0 0 24 24"
  const viewBox = svg.getAttribute("viewBox") || "0 0 24 24";

  // Remove any existing class names
  svg.removeAttribute("class");

  // Convert kebab-case attributes to camelCase and handle special cases
  const attrs = svg.attributes;

  // Convert attributes on the root svg element
  Object.keys(attrs).forEach((attr) => {
    if (attr.includes("-")) {
      const camelCase = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      svg.setAttribute(camelCase, attrs[attr]);
      svg.removeAttribute(attr);
    }
  });

  // Handle filled icons differently
  const isFilled = svg.parentNode.toString().includes("-filled");

  svg.querySelectorAll("*").forEach((el) => {
    const elementAttrs = el.attributes;
    Object.keys(elementAttrs).forEach((attr) => {
      if (attr.includes("-")) {
        const camelCase = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        el.setAttribute(camelCase, elementAttrs[attr]);
        el.removeAttribute(attr);
      }
    });

    // Only convert colors to CSS variables if it's not a filled icon
    if (!isFilled) {
      if (el.getAttribute("stroke")) {
        el.setAttribute("stroke", "var(--icon-stroke)");
      }
      if (el.getAttribute("fill") && el.getAttribute("fill") !== "none") {
        el.setAttribute("fill", "var(--icon-stroke)");
      }
    }
  });

  // Create the React component with the preserved viewBox
  const jsx = `
    import React, { forwardRef, type SVGProps } from "react";

    const Icon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
      <svg
        width="100%"
        height="100%"
        viewBox="${viewBox}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        ${svg.innerHTML}
      </svg>
    ));

    Icon.displayName = "Icon";
    
    export default Icon;
  `;

  // Format the code
  return format(jsx, { parser: "typescript" });
};

// Utility function to clean the filename
const cleanFileName = (str: string) =>
  str
    // Remove file extension
    .replace(".svg", "")
    // Replace & with 'and'
    .replace(/&/g, "and")
    // Remove any punctuation or special characters except hyphens and underscores
    .replace(/[^a-zA-Z0-9-_]/g, "");

// Utility function to convert to PascalCase with number handling
const toPascalCase = (str: string) => {
  // Check if string starts with a number
  const startsWithNumber = /^\d/.test(str);

  const pascal = str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  // If the original string started with a number, prefix with "Icon"
  return startsWithNumber ? `Icon${pascal}` : pascal;
};

// Read all SVG files from the assets directory
const iconFiles = fs
  .readdirSync(ASSETS_DIR)
  .filter((file) => file.endsWith(".svg"));

// Create mapping of original names to PascalCase names
const iconMap = iconFiles.map((file) => {
  const originalName = file.replace(".svg", "");
  const cleanName = cleanFileName(originalName);
  const startsWithNumber = /^\d/.test(cleanName);

  // Track if the name was modified
  const wasModified = originalName !== cleanName;

  return {
    original: originalName,
    clean: cleanName,
    pascal: toPascalCase(cleanName),
    needsPrefix: startsWithNumber,
    wasModified
  };
});

// Create the type definition using clean names
const typeDefinition = `// This file is auto-generated. Do not edit manually
export type IconName =
${iconMap.map(({ clean }) => `  | "${clean}"`).join("\n")};
`;

// First, convert all SVGs to React components
for (const { original, pascal } of iconMap) {
  const svgPath = path.join(ASSETS_DIR, `${original}.svg`);
  const componentPath = path.join(COMPONENTS_DIR, `${pascal}Icon.tsx`);

  const svgContent = fs.readFileSync(svgPath, "utf8");
  const jsxContent = await convertSvgToJsx(svgContent);

  fs.writeFileSync(componentPath, jsxContent);
  console.log(`✓ Generated component: ${pascal}Icon`);
}

// Then update the icon map content to import from component files
const iconMapContent = `// This file is auto-generated. Do not edit manually
import type { FC, SVGProps } from "react";
import type { IconName } from "../types/icon-names";

${iconMap
  .map(
    ({ pascal }) => `import ${pascal}Icon from "../components/${pascal}Icon";`
  )
  .join("\n")}

type IconComponent = FC<SVGProps<SVGSVGElement>>;

export const IconMap: Record<IconName, IconComponent> = {
${iconMap.map(({ clean, pascal }) => `  "${clean}": ${pascal}Icon,`).join("\n")}
} as const;

// Name transformations applied:
${iconMap
  .filter(({ wasModified }) => wasModified)
  .map(({ original, clean }) => `// - "${original}" → "${clean}"`)
  .join("\n")}
`;

// Ensure the utils directory exists
const utilsDir = path.dirname(ICONMAP_OUTPUT);
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

// Write the files
fs.writeFileSync(TYPES_OUTPUT, typeDefinition);
fs.writeFileSync(ICONMAP_OUTPUT, iconMapContent);

// Log results
console.log(`✓ Generated type definitions for ${iconMap.length} icons`);
console.log(`✓ Generated icon map with ${iconMap.length} icons`);

// Log transformations
const modifiedIcons = iconMap.filter(({ wasModified }) => wasModified);
if (modifiedIcons.length > 0) {
  console.log("\nℹ️  Cleaned filenames:");
  modifiedIcons.forEach(({ original, clean }) => {
    console.log(`  ${original}.svg → ${clean}`);
  });
}

// Function to run prettier and eslint on generated files
const formatGeneratedFiles = (filePaths: string[]) => {
  try {
    console.log("\n🎨 Formatting generated files...");

    // First format iconmap.ts specifically to ensure it's handled
    const iconmapPath = path.join(DIRNAME, "../src/utils/iconmap.ts");
    if (fs.existsSync(iconmapPath)) {
      console.log("✓ Formatting iconmap.ts...");
      execSync(`bun prettier --write ${iconmapPath}`, {
        stdio: "inherit"
      });
      execSync(`bun eslint --fix ${iconmapPath}`, {
        stdio: "inherit"
      });
    }

    // Then format all other generated files
    execSync(`bun prettier --write ${filePaths.join(" ")}`, {
      stdio: "inherit"
    });
    console.log("✓ Prettier formatting complete");

    execSync(`bun eslint --fix ${filePaths.join(" ")}`, {
      stdio: "inherit"
    });
    console.log("✓ ESLint fixes complete");
  } catch (error) {
    console.error("⚠️  Error formatting files:", error);
  }
};

// After generating all files, collect their paths
const generatedFiles: string[] = [
  TYPES_OUTPUT,
  ICONMAP_OUTPUT,
  ...iconMap.map(({ pascal }) => path.join(COMPONENTS_DIR, `${pascal}Icon.tsx`))
];

// Format all generated files
formatGeneratedFiles(generatedFiles);

console.log("\n✨ Icon generation complete!");
