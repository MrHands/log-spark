/* eslint-disable @typescript-eslint/naming-convention -- Can't enable on this file */

/** @type {require('@eslint/types')} */
module.exports = {
	extends: ['../.eslintrc.js'],
	parserOptions: {
		project: './tsconfig.json',
	},
	root: true,
};

/* eslint-enable @typescript-eslint/naming-convention */
