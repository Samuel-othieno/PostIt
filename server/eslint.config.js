import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  js.configs.recommended,
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  
];