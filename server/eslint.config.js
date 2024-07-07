import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: ["prettier"],
    extends: ["plugin:prettier/recommended", "airbnb-base"],
    rules: {
      "prettier/prettier": "error",
      indent: ["error", 2],
      "one-var": 0,
      "one-var-declaration-per-line": 0,
      "new-cap": 0,
      "consistent-return": 0,
      "no-param-reassign": 0,
      "comma-dangle": 0,
      curly: ["error", "multi-line"],
      "import/no-unresolved": [2, { commonjs: true }],
      "no-shadow": ["error", { allow: ["req", "res", "err"] }],
      "valid-jsdoc": [
        "error",
        {
          requireReturn: true,
          requireReturnType: true,
          requireParamDescription: false,
          requireReturnDescription: true,
        },
      ],
      "require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
  },
  pluginJs.configs.recommended,
];
