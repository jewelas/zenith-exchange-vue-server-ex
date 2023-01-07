module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint-config-egg",
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "class-methods-use-this": "off",
    'linebreak-style': [0,'error', 'windows'],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'accumulator', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
        'state',
        'require',
        'export_json_to_excel',
      ]
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      alias: true,
    }
  },
};
