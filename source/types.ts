import type ts from 'typescript';

type TMacroResult = ts.VisitResult<ts.Node | undefined>;

type TMacroFunction = (func: ts.CallExpression, context: ts.TransformationContext) => TMacroResult;

export type {
	TMacroFunction,
	TMacroResult,
};
