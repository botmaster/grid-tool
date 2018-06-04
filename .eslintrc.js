// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: [
        "eslint:recommended",
        /*"eslint-config-airbnb-base",*/
        'plugin:vue/strongly-recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": [2, 4],
        /*"semi": ["warn", "always"],*/
        "quotes": ["error", 'single'],

        // Vue.js rules
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/max-attributes-per-line": [2, {
            "singleline": 5,
            "multiline": {
                "max": 5,
                "allowFirstLine": true
            }
        }]
    }
};
