module.exports = {
    extends: '../../.eslintrc.js',
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        // OneKey.Features are came-case
        '@typescript-eslint/naming-convention': 'off',
    },
};