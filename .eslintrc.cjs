module.exports = {
  env: {
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  extends: ["@blastorg/eslint-config-blast/ts-config"],
  plugins: [],
  settings: {},
  ignorePatterns: ["node_modules/", "lib/", "jest.config.ts", ".eslintrc.cjs", "protobufs/generated/"],
  overrides: [],
  rules: {},
};
