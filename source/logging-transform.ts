import ts from 'typescript';

import { type Config } from './config';
import { ELogSeverity } from './log-severity';

function CreateLoggingTransform(
	severity: ELogSeverity,
	levelPrefix: string,
	consoleMethod: string
) {
	return (factory: ts.NodeFactory, func: ts.CallExpression, config: Config) => {
		if (func.arguments.length < 2) {
			const source = func.getSourceFile();
			throw new Error(
				`(${
					source.fileName
				}) Not enough arguments for "${func.expression.getText()}" macro!`
			);
		}

		if (severity < config.logSeverityMinimum
			|| severity > config.logSeverityMaximum) {
			return factory.createNotEmittedStatement(func);
		}

		const domain = func.arguments[0];
		const message = func.arguments[1];

		const logArguments: ts.Expression[] = [];

		let textMessage = '';
		if (
			!ts.isTemplateExpression(message)
			&& !ts.isCallExpression(message)
		) {
			textMessage = ` ${(message as ts.StringLiteral).text}`;
		}

		if (ts.isStringLiteral(domain)) {
			const textDomain = domain.text;

			logArguments.push(
				factory.createStringLiteral(
					`${levelPrefix}(${textDomain})${textMessage}`
				)
			);
		} else {
			logArguments.push(
				factory.createBinaryExpression(
					factory.createBinaryExpression(
						factory.createStringLiteral(`${levelPrefix}(`),
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
