import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";

export default {
  files: ["**/*.{js,jsx,ts,tsx}"],
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    "**/.next/**",
    "**/.turbo/**",
    "**/.cache/**",
    "**/apps/storybook/tsconfig.app.json",
    "**/storybook-static/**"
  ],
  plugins: {
    "@typescript-eslint": tseslint,
    react: reactPlugin,
    import: importPlugin,
    prettier: prettierPlugin
  },
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: [
          "./tsconfig.json",
          "./packages/*/tsconfig.json",
          "./apps/*/tsconfig.json"
        ]
      }
    }
  },
  rules: {
    // TypeScript - Critical rules as errors, style as warnings
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-throw-literal": "off",

    // React - Keep essential rules, relax others
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "react/function-component-definition": "off", // Removing strict component style
    "react/hook-use-state": "warn",

    // Import - Keep organization rules as warnings
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index"
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" }
      }
    ],
    "import/no-extraneous-dependencies": [
      "warn",
      {
        devDependencies: [
          "**/*.test.{ts,tsx}",
          "**/*.spec.{ts,tsx}",
          "**/*.stories.{ts,tsx}",
          "**/scripts/**",
          "**/*.config.{js,ts}",
          "**/*.setup.{js,ts}"
        ]
      }
    ],

    // General - Relaxed rules
    "no-console": "warn",
    indent: "off", // Let Prettier handle this
    quotes: "off", // Let Prettier handle this
    "no-nested-ternary": "off",

    // Prettier - Keep as error to ensure consistent formatting
    ...prettierConfig.rules,
    "prettier/prettier": [
      "warn", // Changed from error to warn
      {
        trailingComma: "none",
        singleQuote: false,
        jsxSingleQuote: false,
        semi: true,
        printWidth: 80,
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: "always"
      }
    ]
  }
};
