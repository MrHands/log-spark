/* eslint-env node */

const preferenceRules = {
	// Enforce consistent brace style for blocks
	'brace-style': ['error', '1tbs'],

	// Require or disallow spacing between function identifiers and their invocations
	'func-call-spacing': ['error', 'never'],

	// Enforce consistent indentation
	indent: [
		'error',
		'tab',
		{
			SwitchCase: 1,
		},
	],

	// Enforce consistent linebreak style
	'linebreak-style': ['error', 'windows'],

	// Disallow multiple spaces
	'no-multi-spaces': [
		'error',
		{
			ignoreEOLComments: true,
		},
	],

	// Enforce consistent use of trailing commas in object and array literals
	'comma-dangle': ['error', {
		arrays: 'always-multiline',
		objects: 'always-multiline',
		imports: 'always-multiline',
		exports: 'always-multiline',
		functions: 'never',
	}],

	// Enforce consistent line breaks after opening and before closing braces
	'object-curly-newline': [
		'error',
		{
			ExportDeclaration: {
				multiline: true,
				minProperties: 2,
				consistent: true,
			},
			ImportDeclaration: {
				multiline: true,
				minProperties: 2,
				consistent: true,
			},
			ObjectExpression: {
				multiline: true,
				minProperties: 3,
				consistent: true,
			},
			ObjectPattern: {
				multiline: true,
				minProperties: 3,
				consistent: true,
			},
		},
	],

	// Enforce consistent spacing inside braces
	'object-curly-spacing': ['error', 'always'],

	// Enforce the consistent use of either backticks, double, or single quotes
	quotes: ['error', 'single'],

	// Require or disallow semicolons instead of ASI
	semi: ['error', 'always'],

	// Require or disallow strict mode directives
	strict: ['warn', 'global'],

	// Enforce a maximum number of classes per file
	'max-classes-per-file': 'off',

	// Require or disallow an empty line between class members
	'lines-between-class-members': 'off',

	// Enforce that class methods utilize `this`
	'class-methods-use-this': [
		'error',
		{
			exceptMethods: ['classNames', 'getContext', 'template', 'toString'],
		},
	],

	// Require or disallow logical assignment logical operator shorthand
	'logical-assignment-operators': 'warn',

	// Disallow `continue` statements
	'no-continue': 'off',

	// Disallow empty static blocks
	'no-empty-static-block': 'error',

	// Disallow assignments to native objects or read-only global variables
	'no-global-assign': 'error',

	// Alow tabs
	'no-tabs': 'off',

	// Disallow negating the left operand of relational operators
	'no-unsafe-negation': 'error',

	// Disallow specified global variables
	'no-restricted-globals': [
		'error',
		{
			name: 'event',
			message: 'Use a local parameter instead',
		},
	],

	// Disallow expressions where the operation doesn't affect the value
	'no-constant-binary-expression': 'error',

	// Disallow new operators with global non-constructor functions
	'no-new-native-nonconstructor': 'error',

	// Disallow reassigning `function` parameters
	'no-param-reassign': [
		'error',
		{
			props: false,
		},
	],

	// Disallow specified syntax
	'no-restricted-syntax': 'off',

	// Disallow dangling underscores in identifiers
	'no-underscore-dangle': [
		'error',
		{
			allowAfterThis: true,
		},
	],

	// Disallow use of Object.prototype.hasOwnProperty.call() and prefer use of Object.hasOwn()
	'prefer-object-has-own': 'error',
};

// https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/

const importsRules = {
	// mark an import as a type-only import by adding a "kind" marker to the import
	'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

	// Report if there is no default export in the imported module if one is requested
	'import/default': 'error',

	// Reports funny business with exports, like repeated exports of names or defaults
	'import/export': 'error',

	// Enforce that all exports are declared at the bottom of the file
	'import/exports-last': 'error',

	// Ensure consistent use of file extension within the import path
	'import/extensions': [
		'error',
		{
			css: 'always',
			js: 'never',
			json: 'always',
			scss: 'always',
			ts: 'never',
		},
	],

	// Report any imports that come after non-import statements
	'import/first': 'error',

	// Reports when named exports are not grouped together in a single export declaration
	'import/group-exports': 'error',

	// Enforces having one or more empty lines after the last top-level import statement
	'import/newline-after-import': ['error', { count: 1 }],

	// Forbid import of modules using absolute paths
	'import/no-absolute-path': 'error',

	// Disallow AMD require/define
	'import/no-amd': 'error',

	// Disallow require()
	'import/no-commonjs': 'off',

	// Forbid require() calls with expressions
	'import/no-dynamic-require': 'error',

	// Reports the use of empty named import blocks
	'import/no-empty-named-blocks': 'error',

	// No Node.js builtin modules
	'import/no-nodejs-modules': 'off',

	// Ensures an imported module can be resolved to a module on the local filesystem
	'import/no-unresolved': ['error'],

	// Forbid Webpack loader syntax in imports
	'import/no-webpack-loader-syntax': 'error',

	// Enforce a convention in module import order
	'import/order': 'off',

	// When there is only a single export from a module, prefer using default export over named
	// export
	'import/prefer-default-export': 'off',

	// Enforce sorted import declarations within modules
	'sort-imports': 'off',

	// Easy autofixable import sorting
	'simple-import-sort/imports': 'error',
	'simple-import-sort/exports': 'error',
};

module.exports = {
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	ignorePatterns: [
		'build/**',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		project: './tsconfig.json',
		requireConfigFile: false,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'simple-import-sort',
	],
	rules: {
		...preferenceRules,
		...importsRules,
	},
	root: true,
};
