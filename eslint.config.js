import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
];
