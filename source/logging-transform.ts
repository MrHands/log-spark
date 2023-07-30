import ts from 'typescript';

import { MacroFunction } from './types';

function CreateLoggingTransform(levelPrefix: string, consoleMethod: string) {
	return (factory: ts.NodeFactory, func: ts.CallExpression) => {
		if (func.arguments.length < 2) {
			const source = func.getSourceFile();
			throw new Error(
				`(${
					source.fileName
				}) Not enough arguments for "${func.expression.getText()}" macro!`
			);
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

const Logging: Record<
	string,
	(factory: ts.NodeFactory, func: ts.CallExpression) => ts.CallExpression
> = {
	$logTrace: CreateLoggingTransform('[TRACE] ', 'log'),
	$logInfo: CreateLoggingTransform('', 'log'),
	$logWarn: CreateLoggingTransform('', 'warn'),
	$logError: CreateLoggingTransform('', 'error'),
	$logFatal: CreateLoggingTransform('[FATAL] ', 'error'),
};

const LoggingVisitor: MacroFunction = (
	func: ts.CallExpression,
	context: ts.TransformationContext
) => {
	const resolve = Logging[func.expression.getText()];
	if (typeof resolve !== 'undefined') {
		return resolve(context.factory, func);
	}

	return undefined;
};

const LoggingTransform = (context: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
	const visitor = (node: ts.Node): ts.Node => {
		if (ts.isCallExpression(node) && node.pos >= 0) {
			const func = node;

			const resolve = Logging[func.expression.getText()];
			if (typeof resolve !== 'undefined') {
				return resolve(ts.factory, func);
			}
		}

		return ts.visitEachChild(node, visitor, context);
	};

	return ts.visitNode(sourceFile, visitor);
};

export {
	CreateLoggingTransform,
	LoggingTransform,
	LoggingVisitor,
};
