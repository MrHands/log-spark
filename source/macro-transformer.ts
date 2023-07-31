import type ts from 'typescript';

import { type Config } from './config';
import {
	$logError,
	$logFatal,
	$logInfo,
	$logTrace,
	$logWarn,
} from './logging-transform';
import { type TMacroFunction } from './types';

class MacroTransformer {
	private readonly _context: ts.TransformationContext;
	private readonly _config: Config;
	private readonly _tsInstance: typeof ts;
	private readonly _macros: Record<string, TMacroFunction> = {
		$logTrace: (
			func: ts.CallExpression,
			context: ts.TransformationContext,
			config: Config
		) => $logTrace(context.factory, func, config),
		$logInfo: (
			func: ts.CallExpression,
			context: ts.TransformationContext,
			config: Config
		) => $logInfo(context.factory, func, config),
		$logWarn: (
			func: ts.CallExpression,
			context: ts.TransformationContext,
			config: Config
		) => $logWarn(context.factory, func, config),
		$logError: (
			func: ts.CallExpression,
			context: ts.TransformationContext,
			config: Config
		) => $logError(context.factory, func, config),
		$logFatal: (
			func: ts.CallExpression,
			context: ts.TransformationContext,
			config: Config
		) => $logFatal(context.factory, func, config),
	};

	constructor(
		context: ts.TransformationContext,
		config: Config,
		tsInstance: typeof ts
	) {
		this._context = context;
		this._config = config;
		this._tsInstance = tsInstance;
	}

	run(node: ts.SourceFile): ts.Node {
		if (node.isDeclarationFile) {
			return node;
		}

		const statements: ts.Statement[] = [];
		for (const s of node.statements) {
			const result = this._tsInstance.visitNode(s, this._visitor) as
				ts.Statement | ts.Statement[] | undefined;

			if (result) {
				statements.push(...(Array.isArray(result) ? result : [result]));
			}
		}

		return this._tsInstance.factory.updateSourceFile(node, statements);
	}

	private readonly _visitor = (node: ts.Node): ts.VisitResult<ts.Node|undefined> => {
		if (node.pos >= 0 && this._tsInstance.isCallExpression(node)) {
			const func: ts.CallExpression = node;

			const macro = this._macros[func.expression.getText()];
			if (typeof macro !== 'undefined') {
				return macro(func, this._context, this._config);
			}
		}

		return this._tsInstance.visitEachChild(node, this._visitor, this._context);
	};
}

export { MacroTransformer };
