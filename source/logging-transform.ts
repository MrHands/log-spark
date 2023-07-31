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

import ts from 'typescript';

import { type LogSparkConfig } from './config';
import { ELogSeverity } from './log-severity';
import { type TMacroFunction } from './types';

function CreateLoggingTransform(
	severity: ELogSeverity,
	levelPrefix: string,
	consoleMethod: string
): TMacroFunction {
	return (func: ts.CallExpression, context: ts.TransformationContext, config: LogSparkConfig) => {
		if (func.arguments.length < 2) {
			const source = func.getSourceFile();
			throw new Error(
				`(${
					source.fileName
				}) Not enough arguments for "${func.expression.getText()}" macro!`
			);
		}

		const { factory } = context;

		if (severity < config.logSeverityMinimum
			|| severity > config.logSeverityMaximum) {
			return factory.createNotEmittedStatement(func);
		}

		const domain = func.arguments[0];
		const message = func.arguments[1];

		let textMessage = '';
		if (!ts.isTemplateExpression(message)
			&& !ts.isCallExpression(message)
		) {
			textMessage = ` ${(message as ts.StringLiteral).text}`;
		}

		const isException = (
			severity >= config.throwExceptionMinimum
			&& severity <= config.throwExceptionMaximum
		);
		const prefix = isException ? '' : levelPrefix;

		const logArguments: ts.Expression[] = [];

		if (ts.isStringLiteral(domain)) {
			logArguments.push(
				factory.createStringLiteral(
					`${prefix}(${domain.text})${textMessage}`
				)
			);
		} else {
			logArguments.push(
				factory.createBinaryExpression(
					factory.createBinaryExpression(
						factory.createStringLiteral(`${prefix}(`),
						factory.createToken(ts.SyntaxKind.PlusToken),
						factory.createCallExpression(
							factory.createPropertyAccessExpression(
								domain,
								factory.createIdentifier('toString')
							),
							undefined,
							[]
						)
					),
					factory.createToken(ts.SyntaxKind.PlusToken),
					factory.createStringLiteral(`)${textMessage}`)
				)
			);
		}

		if (textMessage === '') {
			logArguments.push(message);
		}

		if (isException) {
			const joinedMessage = logArguments.length > 1
				? [factory.createCallExpression(
					factory.createPropertyAccessExpression(
						factory.createArrayLiteralExpression(
							logArguments
						),
						factory.createIdentifier('join')
					),
					undefined,
					[factory.createStringLiteral(' ')]
				)] : logArguments;

			return factory.createImmediatelyInvokedArrowFunction([
				factory.createThrowStatement(
					factory.createNewExpression(
						factory.createIdentifier('Error'),
						undefined,
						joinedMessage
					)
				),
			]);
		}

		return factory.createCallExpression(
			factory.createPropertyAccessExpression(
				factory.createIdentifier('console'),
				factory.createIdentifier(consoleMethod)
			),
			undefined,
			logArguments
		);
	};
}

const $logTrace = CreateLoggingTransform(ELogSeverity.Trace, '[TRACE] ', 'log');
const $logInfo = CreateLoggingTransform(ELogSeverity.Info, '', 'log');
const $logWarn = CreateLoggingTransform(ELogSeverity.Warn, '', 'warn');
const $logError = CreateLoggingTransform(ELogSeverity.Error, '', 'error');
const $logFatal = CreateLoggingTransform(ELogSeverity.Fatal, '[FATAL] ', 'error');

export {
	$logError,
	$logFatal,
	$logInfo,
	$logTrace,
	$logWarn,
	CreateLoggingTransform,
};
