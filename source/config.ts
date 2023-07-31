import { type PluginConfig } from 'ts-patch';

import { ELogSeverity } from './log-severity';

class LogSparkPluginConfig implements PluginConfig {
	/**
	 * Language Server TypeScript Plugin name
	 */
	name?: string;

	/**
	 * Path to transformer or transformer module name
	 */
	transform?: string;

	/**
	 * Resolve Path Aliases?
 	*/
	resolvePathAliases?: boolean;

	/**
	 * tsconfig.json file (for transformer)
	 */
	tsConfig?: string;

	/**
	 * The optional name of the exported transform plugin in the transform module.
	 */
	import?: string;

	/**
	 * Is the transformer an ES Module
	 */
	isEsm?: boolean;

	/**
	 * Plugin entry point format type, default is program
	 */
	type?: 'checker' | 'compilerOptions' | 'config' | 'ls' | 'program' | 'raw';

	/**
	 * Apply transformer after internal TypeScript transformers
	 */
	after?: boolean;

	/**
	 * Apply transformer on d.ts files
	 */
	afterDeclarations?: boolean;

	/**
	 * Transform *Program* instance (alters during createProgram()) (`type`, `after`, &
	 * `afterDeclarations` settings will not apply) Entry point must be (program: Program,
	 * host?: CompilerHost) => Program
	 */
	transformProgram?: boolean;

	/**
	 * Minimum log severity that will be translated to log statements. Setting this to
	 * ELogSeverity.Maximum will disable all logging macros.
	 */
	logSeverityMinimum?: ELogSeverity;

	/**
	 * Maximum log severity that will be translated to log statements.
	 */
	logSeverityMaximum?: ELogSeverity;

	/**
	 * Minimum log severity that throw an exception. Setting this to ELogSeverity.Maximum will
	 * disable logging macros throwing exceptions.
	 */
	throwExceptionMinimum?: ELogSeverity;

	/**
	 * Maximum log severity that throw an exception.
	 */
	throwExceptionMaximum?: ELogSeverity;

	/**
	 * Compiling for production (true) or development (false).
	 */
	isProduction?: boolean;
}

class LogSparkConfig {
	logSeverityMinimum: ELogSeverity = ELogSeverity.Trace;
	logSeverityMaximum: ELogSeverity = ELogSeverity.Fatal;
	throwExceptionMinimum: ELogSeverity = ELogSeverity.Fatal;
	throwExceptionMaximum: ELogSeverity = ELogSeverity.Fatal;
	isProduction = false;
}

export {
	LogSparkConfig,
	LogSparkPluginConfig,
};
