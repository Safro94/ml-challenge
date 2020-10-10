module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		'linebreak-style': 0,
		'arrow-parens': ['error', 'as-needed'],
		'consistent-return': 0,
		'implicit-arrow-linebreak': 0,
	},
};
