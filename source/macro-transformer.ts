/**
 * MIT License
 *
 * Copyright (c) 2023 Mr. Hands
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type ts from 'typescript';

import {
	$devOnly,
	$prodOnly,
} from './conditional-transform';
import {
	LogSparkConfig,
	type LogSparkPluginConfig,
} from './config';
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
	private readonly _pluginConfig: LogSparkPluginConfig;
	private readonly _config = new LogSparkConfig();
	private readonly _tsInstance: typeof ts;
	private readonly _macros: Record<string, TMacroFunction> = {
		$logTrace,
		$logInfo,
		$logWarn,
		$logError,
		$logFatal,
		$devOnly,
		$prodOnly,
	};

	constructor(
		context: ts.TransformationContext,
		pluginConfig: LogSparkPluginConfig,
		tsInstance: typeof ts
	) {
		this._context = context;
		this._pluginConfig = pluginConfig;
		this._tsInstance = tsInstance;

		this._config.logSeverityMinimum = pluginConfig.logSeverityMinimum
			?? this._config.logSeverityMinimum;
		this._config.logSeverityMaximum = pluginConfig.logSeverityMaximum
			?? this._config.logSeverityMaximum;
		this._config.throwExceptionMinimum = pluginConfig.throwExceptionMinimum
			?? this._config.throwExceptionMinimum;
		this._config.throwExceptionMaximum = pluginConfig.throwExceptionMaximum
			?? this._config.throwExceptionMaximum;
		this._config.isProduction = pluginConfig.isProduction
			?? this._config.isProduction;
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
