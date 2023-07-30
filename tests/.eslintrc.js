/* eslint-disable @typescript-eslint/naming-convention -- Can't enable on this file */

/** @type {require('@eslint/types')} */
module.exports = {
	extends: ['../.eslintrc.js'],
	rules: {
		'import/no-extraneous-dependencies': 'off',
		'@typescript-eslint/no-var-requires': 'off',
	},
	ignorePatterns: [
		'**/webpack.config.ts',
	],
	parserOptions: {
		project: './tsconfig.json',
	},
	root: true,
};

/* eslint-enable @typescript-eslint/naming-convention */
