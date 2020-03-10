module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/typescript/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    "no-extra-semi": "off",
    semi: [2, "always"],
    "space-before-function-paren": ["error", "never"]
  }
};
