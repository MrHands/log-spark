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
