module.exports = [
  {
    files: ["packages/*/src/**/*.js","eslint.config.js","packages/*/src/**/*.ts"],
    rules: {
      "semi": "error",
      "editorconfig/charset": "error",
      "editorconfig/eol-last": "error",
      "editorconfig/indent": ["error", { "SwitchCase": 1 }],
      "editorconfig/linebreak-style": "error",
      "editorconfig/no-trailing-spaces": "error",
    },
    plugins: {
      editorconfig: require('eslint-plugin-editorconfig'),
    }
  }
];
