export default {
  "src/**/*.ts": [
    "eslint --max-warnings=0",
    "jest --bail --passWithNoTests --findRelatedTests",
    "prettier",
    "tsc-files --noEmit", // A tiny tool to run tsc on specific files without ignoring tsconfig.json
  ],
};
