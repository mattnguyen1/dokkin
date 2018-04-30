var path = require("path");

module.exports = {
  extends: ["airbnb", "prettier"],
  settings: {
    "import/resolver": {
      alias: [["dokkin", path.resolve(__dirname, "src")]]
    }
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["import-order-autofix"],
  rules: {
    camelcase: 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": 0,
    "react/no-typos": 0,
    "import/order": ["error", { "newlines-between": "never" }],
    "no-restricted-globals": 0,
    "no-case-declarations": 0
  }
};
