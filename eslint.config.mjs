// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	{
		rules: {
			'semi': ['error', 'always'],
			'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'eqeqeq': ['error', 'always'],
			'no-undef': 'warn',
			'no-trailing-spaces': 'error',
			'no-debugger': 'error',
		},
	},
);
