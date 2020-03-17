// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 禁止tab出现（关闭）
        'no-tabs': 0,
        // 禁止多余的空格（关闭）
        "no-multi-spaces": 0,
        // 强制缩进为4个空格 case忽略
        'indent': ['error', 4, { SwitchCase: 1 }],
        // 禁止混用空格和tab（关闭）
        "no-mixed-spaces-and-tabs": [0, false],
        // 禁止分号
        "semi": [0, "always"],
        // iview标签大写错误（关闭）
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        // key后空格检查（关闭）
        "key-spacing": 0,
        // 最后一行空行（关闭）
        "eol-last": 0
    }
}
