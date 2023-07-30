import ts from 'typescript';

import { LoggingVisitor } from './logging-transform';

type MacroFunction = (context: ts.TransformationContext, callSite: ts.Node) => ts.Node;

class MacroTransformer {
	private _context: ts.TransformationContext;
	private _tsInstance: typeof ts;
	private _macros: Record<string, MacroFunction> = {
		$logInfo: LoggingVisitor,
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
			const result = this.visit(s) as Array<ts.Statement> | ts.Statement | undefined;
			if (result) {
				statements.push(...(Array.isArray(result) ? result : [result]));
			}
		}

		return ts.factory.updateSourceFile(node, statements);
	}

	visit(node: ts.Node): ts.VisitResult<ts.Node|undefined> {
		if (!ts.isFunctionDeclaration(node)
		|| !node.name
		|| !node.name.getText().startsWith('$')) {
			return node;
		}

		const macro = this._macros[node.name.getText()];
		if (typeof macro === 'undefined') {
			return node;
		}

		return macro(this._context, node);
	}
}

export { MacroTransformer };
