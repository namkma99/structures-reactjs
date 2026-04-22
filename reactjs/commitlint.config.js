export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /**
     * Valid scopes — extend as your project grows.
     * Usage: feat(auth): add login page
     */
    'scope-enum': [
      2,
      'always',
      [
        'auth', // authentication / authorization
        'ui', // UI component changes
        'api', // API layer changes
        'feat', // new feature modules
        'infra', // infra, build, CI/CD
        'config', // app configuration
        'deps', // dependency updates
        'hooks', // custom hooks
        'store', // state management
        'styles', // styling changes
        'types', // TypeScript types
        'test', // test-related changes
        'docs', // documentation
      ],
    ],
    'scope-empty': [1, 'never'], // warn (not error) if scope missing
  },
};
