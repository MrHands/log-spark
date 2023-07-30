import ts from 'typescript';

import { MacroTransformer } from './macro-transformer';

export * from './conditional-transform';
export * from './dev-only-transform';
export * from './logging-transform';
export * from './prod-only-transform';

export declare function $logInfo(domain: object | string, message: string): void;

export default (program: ts.Program): ts.TransformerFactory<ts.Node> => (ctx) => {
	const typeChecker = program.getTypeChecker();
	const transformer = new MacroTransformer(ctx, typeChecker);
	return (firstNode) => transformer.run(firstNode as ts.SourceFile);
};
