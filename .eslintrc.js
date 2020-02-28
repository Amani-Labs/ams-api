module.exports = {
  extends: ["airbnb", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  ignorePatterns: ["dist/", "node_modules/"],
  rules: {
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: ["**/test.tsx", "**/test.ts"] }
    ],
    "@typescript-eslint/indent": [2, 2],
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off"
  },
  "env": {
    "jest": true
}
};
