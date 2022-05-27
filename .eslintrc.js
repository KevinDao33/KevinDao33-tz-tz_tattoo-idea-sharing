module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "import"],
  globals: {
    process: "readonly",
  },

  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/no-useless-path-segments": 2,
    "import/no-unused-modules": 2,
    "import/first": 2,
    "import/exports-last": 2,
    "import/order": 2,
    "import/newline-after-import": 2,
  },
};
