const reactPlugin = require("eslint-plugin-react");
const tseslint = require("typescript-eslint");

module.exports = [
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "eslint.config.js"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        createDefaultProgram: true,
      },
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "warn",
    },
  },
];