/* eslint-disable @typescript-eslint/naming-convention -- Can't enable on this file */
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

// https://typescript-eslint.io/rules

const typescriptRules = {
	// Require consistently using either T[] or Array<T> for arrays
	'@typescript-eslint/array-type': 'error',

	// Disallow awaiting a value that is not a Thenable
	'@typescript-eslint/await-thenable': 'error',

	// Disallow @ts-<directive> comments or require descriptions after directives.
	'@typescript-eslint/ban-ts-comment': [
		'error',
		{
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': false,
			'ts-nocheck': true,
			'ts-check': false,
			minimumDescriptionLength: 3,
		},
	],

	// Disallow // tslint:<rule-flag> comments
	'@typescript-eslint/ban-tslint-comment': 'error',

	// Disallow or enforce spaces inside of blocks after opening block and before closing block
	'@typescript-eslint/block-spacing': 'off',
	'block-spacing': 'off',

	// Enforce that literals on classes are exposed in a consistent style
	'@typescript-eslint/class-literal-property-style': ['error', 'fields'],

	// Enforce specifying generic type arguments on type annotation or constructor name of a
	// constructor call
	'@typescript-eslint/consistent-generic-constructors': 'error',

	// Require or disallow the Record type
	'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

	// Enforce consistent usage of type assertions
	'@typescript-eslint/consistent-type-assertions': [
		'error',
		{
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'allow',
		},
	],

	// Enforce type definitions to consistently use either interface or type
	'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

	// Enforce consistent usage of type exports
	'@typescript-eslint/consistent-type-exports': [
		'error',
		{
			fixMixedExportsWithInlineTypeSpecifier: true,
		},
	],

	// Enforce consistent usage of type imports
	'@typescript-eslint/consistent-type-imports': [
		'warn',
		{
			prefer: 'type-imports',
			disallowTypeAnnotations: true,
			fixStyle: 'inline-type-imports',
		},
	],

	// Enforce default parameters to be last
	'@typescript-eslint/default-param-last': 'error',

	// Enforce dot notation whenever possible
	'@typescript-eslint/dot-notation': [
		'error',
		{
			allowKeywords: false,
		},
	],
	'dot-notation': 'off',

	// Require explicit return types on functions and class methods
	'@typescript-eslint/explicit-function-return-type': 'off',

	// Require explicit accessibility modifiers on class properties and methods
	'@typescript-eslint/explicit-member-accessibility': [
		'error',
		{
			accessibility: 'no-public',
		},
	],

	// Require explicit return and argument types on exported functions' and classes' public class
	// methods
	'@typescript-eslint/explicit-module-boundary-types': 'off',

	// Require or disallow initialization in variable declarations
	'@typescript-eslint/init-declarations': 'warn',
	'init-declarations': 'off',

	// Require or disallow an empty line between class members
	'@typescript-eslint/lines-between-class-members': 'off',
	'lines-between-class-members': 'off',

	// Enforce consistent spacing between property names and type annotations in types and
	// interfaces
	'@typescript-eslint/key-spacing': 'off',
	'key-spacing': 'off',

	// Enforce consistent spacing before and after keywords
	'@typescript-eslint/keyword-spacing': 'off',
	'keyword-spacing': 'off',

	// Require empty lines around comments
	'@typescript-eslint/lines-around-comment': 'off',
	'lines-around-comment': 'off',

	// Standardize the way classes, interfaces, and type literals are structured and ordered
	'@typescript-eslint/member-ordering': [
		'warn',
		{
			classes: [
				'field',
				'constructor',
				['static-get', 'get', 'set'],
				'method',
			],
		},
	],

	// Enforce using a particular method signature syntax
	'@typescript-eslint/method-signature-style': ['error', 'method'],

	// Enforce naming conventions for everything across a codebase,
	'@typescript-eslint/naming-convention': [
		'error',

		// interface must be in PascalCase and start with I
		{
			selector: 'interface',
			prefix: ['I'],
			format: ['StrictPascalCase'],
		},

		// enums must be in PascalCase and start with E
		{
			selector: 'enum',
			prefix: ['E'],
			format: ['StrictPascalCase'],
		},

		// enum members must be in PascalCase
		{
			selector: 'enumMember',
			format: ['StrictPascalCase'],
		},

		// type aliases and parameters must be in PascalCase and start with T
		{
			selector: ['typeAlias', 'typeParameter'],
			format: ['StrictPascalCase'],
			prefix: ['T'],
		},

		// object literal properties must be camelCase (except for CSS variables)
		{
			selector: ['objectLiteralProperty'],
			format: ['camelCase'],
			filter: {
				regex: '^--[a-z-]+',
				match: false,
			},
			leadingUnderscore: 'allowSingleOrDouble',
		},

		// match CSS variable properties
		{
			selector: ['objectLiteralProperty'],
			format: null,
			// css variables
			custom: {
				regex: '^--[a-z-]+',
				match: true,
			},
		},

		// global const variables must be in ENUM_CASE
		{
			selector: ['variable'],
			modifiers: ['const', 'global'],
			format: ['UPPER_CASE', 'StrictPascalCase'],
			leadingUnderscore: 'forbid',
			trailingUnderscore: 'forbid',
		},

		// variables must be in snake_case or camelCase
		{
			selector: ['typeProperty', 'classProperty'],
			format: ['snake_case', 'camelCase', 'StrictPascalCase'],
			leadingUnderscore: 'allowSingleOrDouble',
			trailingUnderscore: 'allow',
		},

		// functions and types must be in PascalCase
		{
			selector: ['function', 'typeLike'],
			format: ['StrictPascalCase'],
		},

		// camelCase by default
		{
			selector: 'default',
			format: ['camelCase'],
			leadingUnderscore: 'allow',
			trailingUnderscore: 'allow',
		},
	],

	// Require .toString() to only be called on objects which provide useful information when
	// stringified
	'@typescript-eslint/no-base-to-string': 'warn',

	// Disallow non-null assertion in locations that may be confusing
	'@typescript-eslint/no-confusing-non-null-assertion': 'error',

	// Require expressions of type void to appear in statement position
	'@typescript-eslint/no-confusing-void-expression': [
		'error',
		{
			ignoreArrowShorthand: true,
		},
	],

	// Disallow duplicate class members
	'@typescript-eslint/no-dupe-class-members': 'error',
	'no-dupe-class-members': 'off',

	// Disallow duplicate enum member values
	'@typescript-eslint/no-duplicate-enum-values': 'error',

	// Disallow duplicate constituents of union or intersection types
	'@typescript-eslint/no-duplicate-type-constituents': 'error',

	// Disallow using the delete operator on computed key expressions
	'@typescript-eslint/no-dynamic-delete': 'error',

	// Disallow the any type
	'@typescript-eslint/no-explicit-any': [
		'warn',
		{
			ignoreRestArgs: true,
		},
	],

	// Disallow classes used as namespaces
	'@typescript-eslint/no-extraneous-class': [
		'warn',
		{
			allowEmpty: true,
			allowStaticOnly: true,
		},
	],

	// Require Promise-like statements to be handled appropriately
	'@typescript-eslint/no-floating-promises': [
		'error',
		{
			ignoreVoid: true,
			ignoreIIFE: true,
		},
	],

	// Disallow iterating over an array in a for loop
	'@typescript-eslint/no-for-in-array': 'error',

	// Disallow the use of eval()-like methods
	'@typescript-eslint/no-implied-eval': 'error',
	'no-implied-eval': 'off',

	// Enforce the use of top-level import type qualifier when an import only has specifiers with
	// inline type qualifiers
	'@typescript-eslint/no-import-type-side-effects': 'off',

	// Disallow explicit type declarations for variables or parameters initialized to a number,
	// string, or boolean
	'@typescript-eslint/no-inferrable-types': 'off',

	// Disallow this keywords outside of classes or class-like objects
	'@typescript-eslint/no-invalid-this': 'warn',
	'no-invalid-this': 'off',

	// Disallow void type outside of generic or return types
	'@typescript-eslint/no-invalid-void-type': [
		'warn',
		{
			allowInGenericTypeArguments: true,
			allowAsThisParameter: false,
		},
	],

	// Disallow function declarations that contain unsafe references inside loop statements
	'@typescript-eslint/no-loop-func': 'warn',
	'no-loop-func': 'off',

	// Disallow magic numbers
	'@typescript-eslint/no-magic-numbers': [
		'warn',
		{
			ignore: [-1, 0, 1, 2],
			ignoreArrayIndexes: true,
			ignoreClassFieldInitialValues: true,
			ignoreDefaultValues: true,
			ignoreEnums: true,
			ignoreReadonlyClassProperties: true,
		},
	],
	'no-magic-numbers': 'off',

	// Disallow the void operator except when used to discard a value
	'@typescript-eslint/no-meaningless-void-operator': 'warn',

	// Disallow Promises in places not designed to handle them
	'@typescript-eslint/no-misused-promises': 'error',

	// Disallow enums from having both number and string members
	'@typescript-eslint/no-mixed-enums': 'error',

	// Disallow non-null assertions in the left operand of a nullish coalescing operator
	'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',

	// Disallow non-null assertions using the ! postfix operator
	'@typescript-eslint/no-non-null-assertion': 'off',

	// Disallow variable redeclaration
	'@typescript-eslint/no-redeclare': 'warn',
	'no-redeclare': 'off',

	// Disallow members of unions and intersections that do nothing or override type information
	'@typescript-eslint/no-redundant-type-constituents': 'warn',

	// Disallow invocation of require()
	'@typescript-eslint/no-require-imports': 'warn',

	// Disallow specified modules when loaded by import
	'@typescript-eslint/no-restricted-imports': 'warn',
	'no-restricted-imports': 'off',

	// Disallow variable declarations from shadowing variables declared in the outer scope
	'@typescript-eslint/no-shadow': ['error'],
	'no-shadow': 'off',

	// Disallow throwing literals as exceptions
	'@typescript-eslint/no-throw-literal': 'warn',
	'no-throw-literal': 'off',

	// Disallow type aliases
	'@typescript-eslint/no-type-alias': [
		'warn',
		{
			allowAliases: 'in-unions',
			allowCallbacks: 'always',
			allowConstructors: 'always',
			allowGenerics: 'always',
		},
	],

	// Disallow unnecessary equality comparisons against boolean literals
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',

	// Disallow conditionals where the type is always truthy or always falsy
	'@typescript-eslint/no-unnecessary-condition': 'warn',

	// Disallow unnecessary namespace qualifiers
	'@typescript-eslint/no-unnecessary-qualifier': 'warn',

	// Disallow type arguments that are equal to the default
	'@typescript-eslint/no-unnecessary-type-arguments': 'warn',

	// Disallow type assertions that do not change the type of an expression
	'@typescript-eslint/no-unnecessary-type-assertion': 'error',

	// Disallow calling a function with a value with type any
	'@typescript-eslint/no-unsafe-argument': 'error',

	// Disallow assigning a value with type any to variables and properties
	'@typescript-eslint/no-unsafe-assignment': 'error',

	// Disallow calling a value with type any
	'@typescript-eslint/no-unsafe-call': 'error',

	// Disallow unsafe declaration merging
	'@typescript-eslint/no-unsafe-declaration-merging': 'warn',

	// Disallow comparing an enum value with a non-enum value
	'@typescript-eslint/no-unsafe-enum-comparison': 'error',

	// Disallow member access on a value with type any
	'@typescript-eslint/no-unsafe-member-access': 'error',

	// Disallow returning a value with type any from a function
	'@typescript-eslint/no-unsafe-return': 'error',

	// Disallow unused expressions
	'@typescript-eslint/no-unused-expressions': 'warn',
	'no-unused-expressions': 'off',

	// Disallow unnecessary constructors
	'@typescript-eslint/no-useless-constructor': 'warn',
	'no-useless-constructor': 'off',

	// Disallow empty exports that don't change anything in a module file
	'@typescript-eslint/no-useless-empty-export': 'warn',

	// Enforce non-null assertions over explicit type casts
	'@typescript-eslint/non-nullable-type-assertion-style': 'warn',

	// Disallow unused variables
	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
		},
	],
	'no-unused-vars': 'off',

	// Disallow the use of variables before they are defined
	'@typescript-eslint/no-use-before-define': ['error'],
	'no-use-before-define': 'off',

	// Require or disallow padding lines between statements.
	'@typescript-eslint/padding-line-between-statements': 'off',
	'padding-line-between-statements': 'off',

	// Require or disallow parameter properties in class constructors
	'@typescript-eslint/parameter-properties': [
		'warn',
		{
			allow: ['public', 'readonly'],
		},
	],

	// Require each enum member value to be explicitly initialized
	'@typescript-eslint/prefer-enum-initializers': 'off',

	// Enforce the use of for-of loop over the standard for loop where possible
	'@typescript-eslint/prefer-for-of': 'warn',

	// Enforce using function types instead of interfaces with call signatures
	'@typescript-eslint/prefer-function-type': 'warn',

	// Enforce includes method over indexOf method
	'@typescript-eslint/prefer-includes': 'warn',

	// Require all enum members to be literal values
	'@typescript-eslint/prefer-literal-enum-member': 'warn',

	// Enforce using the nullish coalescing operator instead of logical chaining
	'@typescript-eslint/prefer-nullish-coalescing': 'warn',

	// Enforce using concise optional chain expressions instead of chained logical ands, negated
	// logical ors, or empty objects
	'@typescript-eslint/prefer-optional-chain': 'warn',

	// Require private members to be marked as readonly if they're never modified outside of the
	// constructor
	'@typescript-eslint/prefer-readonly': 'warn',

	// Require function parameters to be typed as readonly to prevent accidental mutation of inputs
	// NOTE: Could not figure out how to make work with existing codebase
	'@typescript-eslint/prefer-readonly-parameter-types': 'off',

	// Enforce using type parameter when calling Array#reduce instead of casting
	'@typescript-eslint/prefer-reduce-type-parameter': 'warn',

	// Enforce RegExp#exec over String#match if no global flag is provided
	'@typescript-eslint/prefer-regexp-exec': 'warn',

	// Enforce that this is used when only this type is returned
	'@typescript-eslint/prefer-return-this-type': 'warn',

	// Enforce using String#startsWith and String#endsWith over other equivalent methods of checking
	// substrings
	'@typescript-eslint/prefer-string-starts-ends-with': 'warn',

	// Enforce using @ts-expect-error over @ts-ignore
	'@typescript-eslint/prefer-ts-expect-error': 'warn',

	// Require any function or method that returns a Promise to be marked async
	'@typescript-eslint/promise-function-async': 'warn',

	// Require Array#sort calls to always provide a compareFunction
	'@typescript-eslint/require-array-sort-compare': [
		'warn',
		{
			ignoreStringArrays: true,
		},
	],

	// Disallow async functions which have no await expression
	'@typescript-eslint/require-await': 'error',
	'require-await': 'off',

	// Require both operands of addition to be the same type and be bigint, number, or string
	'@typescript-eslint/restrict-plus-operands': 'error',

	// Enforce template literal expressions to be of string type
	'@typescript-eslint/restrict-template-expressions': [
		'error',
		{
			allowBoolean: true,
			allowNumber: true,
		},
	],

	// Enforce consistent returning of awaited values
	'@typescript-eslint/return-await': 'warn',
	'no-return-await': 'off',

	// Enforce constituents of a type union/intersection to be sorted alphabetically
	'@typescript-eslint/sort-type-constituents': 'warn',

	// Disallow certain types in boolean expressions
	'@typescript-eslint/strict-boolean-expressions': 'warn',

	// Require switch-case statements to be exhaustive with union type
	'@typescript-eslint/switch-exhaustiveness-check': 'warn',

	// Require type annotations in certain places
	'@typescript-eslint/typedef': 'warn',

	// Enforce unbound methods are called with their expected scope
	'@typescript-eslint/unbound-method': 'error',

	// Disallow two overloads that could be unified into one with a union or an optional/rest
	// parameter
	'@typescript-eslint/unified-signatures': 'warn',

	// Disallow import declarations which import non-existent modules
	'node/no-missing-import': 'off',

	// Disallow import declarations which import private modules
	'node/no-unpublished-import': 'off',

	// Report unsupported ECMAScript syntax on the configured Node.js version as errors
	'node/no-unsupported-features/es-syntax': 'off',

	// Disallow the use of undeclared variables unless mentioned in /* global */ comments
	'no-undef': 'off',
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
		'tests/**',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		project: './tsconfig.eslint.json',
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
		...typescriptRules,
	},
};
