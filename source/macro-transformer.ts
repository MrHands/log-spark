import ts from 'typescript';

import { LoggingVisitor } from './logging-transform';
import { type MacroFunction } from './types';

class MacroTransformer {
	private _context: ts.TransformationContext;
	private _tsInstance: typeof ts;
	private _macros: Record<string, MacroFunction> = {
		$logInfo: LoggingVisitor,
	};
	private _visitor = (node: ts.Node): ts.VisitResult<ts.Node|undefined> => {
		if (node.pos >= 0 && this._tsInstance.isCallExpression(node)) {
			const func: ts.CallExpression = node;

			const macro = this._macros[func.expression.getText()];
			if (typeof macro !== 'undefined') {
				return macro(func, this._context);
			}
		}

		return this._tsInstance.visitEachChild(node, this._visitor, this._context);
	};

	constructor(
		context: ts.TransformationContext,
		tsInstance: typeof ts
	) {
		this._context = context;
		this._tsInstance = tsInstance;
	}

	run(node: ts.SourceFile): ts.Node {
		if (node.isDeclarationFile) {
			return node;
		}

		const statements: Array<ts.Statement> = [];
		for (const s of node.statements) {
			const result = this._tsInstance.visitNode(s, this._visitor) as
				Array<ts.Statement> | ts.Statement | undefined;

			if (result) {
				statements.push(...(Array.isArray(result) ? result : [result]));
			}
		}

		return this._tsInstance.factory.updateSourceFile(node, statements);
	}
}

export { MacroTransformer };
