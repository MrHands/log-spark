import ts from 'typescript';

function ConditionalTransform(name: string, enabled: boolean) {
	return (context: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
		const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
			if (ts.isCallExpression(node) && node.pos >= 0) {
				const func = node;

				if (func.expression.getText() === name) {
					const fn = func.arguments[0] as ts.ArrowFunction;

					const { factory } = context;

					if (!enabled) {
						return factory.createNotEmittedStatement(node);
					}

					if (ts.isBlock(fn.body)) {
						return factory.createImmediatelyInvokedArrowFunction(
							fn.body.statements,
						);
					}

					return fn.body;
				}
			}

			return ts.visitEachChild(node, visitor, context);
		};

		return ts.visitNode(sourceFile, visitor);
	};
}

export default ConditionalTransform;
