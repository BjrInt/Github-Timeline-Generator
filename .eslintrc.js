module.exports = {
    extends: [
      // By extending from a plugin config, we can get recommended rules without having to add them manually.
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-prettier',
    ],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {},
  };