module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
    "next/core-web-vitals"
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  settings: {
    'react': {
      'version': 'detect'
    }
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    // 'import/order': [
    //   'error',
    //   {
    //     'newlines-between': 'always',
    //     groups: [
    //       'builtin',
    //       'external',
    //       'internal',
    //       'sibling',
    //       'parent',
    //       'index',
    //     ],				
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //   },
    // ],
    'no-return-assign': 0,
    "no-unused-vars": 1,
    
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    // Stylistic
    'array-bracket-spacing': [
      2,
      'never',
      {
        singleValue: true,
        objectsInArrays: true,
        arraysInArrays: true,
      },
    ],
    'newline-after-var': [1, 'always'],
    'brace-style': [2, '1tbs'],
    'camelcase': [2, { properties: 'always' }],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'computed-property-spacing': [2, 'never'],
    'eol-last': 2,
    'func-names': 1,
    'func-style': [
      'error',
      'declaration',
      { allowArrowFunctions: true },
    ],
    'indent': [2, 2, { SwitchCase: 1 }],
    'jsx-quotes': [2, 'prefer-single'],
    'linebreak-style': [2, 'unix'],
    'max-len': [
      2,
      128,
      4,
      {
        ignoreUrls: true,
        ignoreComments: false,
      },
    ],
    'max-nested-callbacks': [2, 4],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0 }],
    'no-nested-ternary': 2,
    'no-new-object': 2,
    'no-spaced-func': 2,
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, 'never'],
    'padded-blocks': [2, 'never'],
    'quotes': [1, 'single', 'avoid-escape'],
    'semi-spacing': [2, { before: false, after: true }],
    'semi': [2, 'always'],
    'keyword-spacing': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': [
      2,
      { anonymous: 'always', named: 'never' },
    ],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, { words: true, nonwords: false }],
    'spaced-comment': [
      2,
      'always',
      {
        exceptions: ['-', '+'],
        markers: ['=', '!'],
      },
    ],

    // React
    'react/jsx-boolean-value': 2,
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-handler-names': 0,
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'react/jsx-key': 2,
    'react/jsx-max-props-per-line': [2, { maximum: 3 }],
    'react/jsx-no-bind': [
      2,
      {
        ignoreRefs: true,
        allowBind: true,
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 0,
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 2,
    'react/no-danger': 2,
    'react/no-deprecated': 2,
    'react/no-multi-comp': 2,
    'react/no-string-refs': 2,
    'react/no-unknown-property': 2,
    'react/prefer-es6-class': 2,
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 2,
    'react/jsx-wrap-multilines': 2,
  },
  ignorePatterns: ['/*', '!/src'],
};